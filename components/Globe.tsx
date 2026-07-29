"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import earcut from "earcut";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry, Position } from "geojson";
import { COUNTRY_INFO, CORRIDORS, type CountryInfo } from "@/lib/countries";
import { createArcPoints, latLngToVector3 } from "@/lib/geo";

const GLOBE_RADIUS = 1.5;
const CAMERA_DISTANCE = GLOBE_RADIUS * 3.15;
const CAMERA_FOV = 48;
const ROTATE_SPEED = 0.0012285;
const STAR_COUNT = 1000;
const DRAG_DAMPING = 0.95;
const DRAG_SENSITIVITY = 0.005;

type TooltipState = {
  info: CountryInfo;
  x: number;
  y: number;
} | null;

type CountryMeshUserData = {
  countryId: string;
  info: CountryInfo;
  kind: "fill" | "hit";
};

type Props = {
  docked?: boolean;
};

function easeOut(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - c, 3);
}

function triangulateRing(ring: Position[]): THREE.BufferGeometry | null {
  if (ring.length < 3) return null;
  const flat: number[] = [];
  const sphereVerts: THREE.Vector3[] = [];
  const pts =
    ring.length > 1 &&
    ring[0][0] === ring[ring.length - 1][0] &&
    ring[0][1] === ring[ring.length - 1][1]
      ? ring.slice(0, -1)
      : ring;
  if (pts.length < 3) return null;
  pts.forEach(([lng, lat]) => {
    flat.push(lng, lat);
    sphereVerts.push(latLngToVector3(lat, lng, GLOBE_RADIUS + 0.006));
  });
  let indices: number[];
  try {
    indices = earcut(flat, undefined, 2);
  } catch {
    return null;
  }
  if (!indices.length) return null;
  const positions = new Float32Array(sphereVerts.length * 3);
  sphereVerts.forEach((v, i) => {
    positions[i * 3] = v.x;
    positions[i * 3 + 1] = v.y;
    positions[i * 3 + 2] = v.z;
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export default function Globe({ docked = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dockedRef = useRef(docked);
  const tooltipRef = useRef<TooltipState>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const [ready, setReady] = useState(false);

  dockedRef.current = docked;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let frameId = 0;
    let hoveredCountryId: string | null = null;
    let isDragging = false;
    let lastPointerX = 0;
    let velocityY = ROTATE_SPEED; // yaw — blends toward ROTATE_SPEED after drag

    const scene = new THREE.Scene();
    const getSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(Math.floor(rect.width || container.clientWidth || 1), 1);
      const h = Math.max(Math.floor(rect.height || container.clientHeight || 1), 1);
      return { w, h };
    };

    let { w: width, h: height } = getSize();
    const camera = new THREE.PerspectiveCamera(
      CAMERA_FOV,
      width / height,
      0.1,
      200
    );
    camera.position.set(0, 0, CAMERA_DISTANCE);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "none";
    container.appendChild(renderer.domElement);
    container.style.cursor = "grab";
    renderer.domElement.style.cursor = "grab";

    const setCursor = (cursor: string) => {
      container.style.cursor = cursor;
      renderer.domElement.style.cursor = cursor;
    };

    scene.add(new THREE.AmbientLight(0x8a9aac, 0.45));
    const key = new THREE.DirectionalLight(0xd0d8e0, 0.7);
    key.position.set(4, 2.2, 3);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x3a5070, 0.25);
    fill.position.set(-3, -1, -2);
    scene.add(fill);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.y = -0.85;
    globeGroup.rotation.x = 0.28;
    scene.add(globeGroup);

    // Ocean — #0a1628 with soft right-third highlight (#1a3a6e)
    const oceanUniforms = {
      uDayColor: { value: new THREE.Color(0x1a3a6e) },
      uNightColor: { value: new THREE.Color(0x0a1628) },
    };
    const ocean = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS, 96, 96),
      new THREE.ShaderMaterial({
        uniforms: oceanUniforms,
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uDayColor;
          uniform vec3 uNightColor;
          varying vec3 vNormal;
          void main() {
            vec3 n = normalize(vNormal);
            // Wide soft sunlight from the right — covers ~right third of the disk
            vec3 lightDir = normalize(vec3(1.0, 0.05, 0.35));
            float wrap = dot(n, lightDir) * 0.5 + 0.5;
            float highlight = smoothstep(0.28, 0.88, wrap);
            highlight = pow(highlight, 0.95);
            vec3 col = mix(uNightColor, uDayColor, highlight);
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      })
    );
    globeGroup.add(ocean);

    // Subtle soft blue diffusion just beyond the sphere edge (~10–15px feel)
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 1.035, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        uniforms: {
          glowColor: { value: new THREE.Color(0x4a7ab0) },
          uOpacity: { value: 0.09 },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform vec3 glowColor;
          uniform float uOpacity;
          void main() {
            float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
            intensity = clamp(intensity, 0.0, 1.0);
            gl_FragColor = vec4(glowColor, intensity * uOpacity);
          }
        `,
      })
    );
    scene.add(atmosphere);

    // Star field — steady, slow drift
    const starPositions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.cos(phi);
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.028,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    type ArcTraveler = {
      mesh: THREE.Mesh;
      trail: THREE.Mesh[];
      points: THREE.Vector3[];
      speed: number;
      offset: number;
      toCountryId: string;
      lastProgress: number;
    };
    type SonarPing = { ring: THREE.Mesh; base: THREE.Mesh; phase: number };

    const travelers: ArcTraveler[] = [];
    const sonarPings: SonarPing[] = [];

    CORRIDORS.forEach((corridor, idx) => {
      const points = createArcPoints(
        corridor.from[0],
        corridor.from[1],
        corridor.to[0],
        corridor.to[1],
        GLOBE_RADIUS,
        0.28 + idx * 0.035,
        100
      );
      const curve = new THREE.CatmullRomCurve3(points);

      // Thin signal arc — ~1–1.5px, soft white
      globeGroup.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(curve, 100, 0.0016, 5, false),
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.7,
            depthWrite: false,
          })
        )
      );

      [corridor.from, corridor.to].forEach(([lat, lng], endIdx) => {
        const pos = latLngToVector3(lat, lng, GLOBE_RADIUS + 0.014);
        const base = new THREE.Mesh(
          new THREE.SphereGeometry(0.018, 14, 14),
          new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        base.position.copy(pos);
        globeGroup.add(base);

        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.03, 0.038, 32),
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide,
            depthWrite: false,
          })
        );
        ring.position.copy(pos);
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        ring.rotateY(Math.PI);
        globeGroup.add(ring);
        sonarPings.push({ ring, base, phase: idx * 0.55 + endIdx * 0.3 });
      });

      for (let t = 0; t < 2; t++) {
        const head = new THREE.Mesh(
          new THREE.SphereGeometry(0.022, 12, 12),
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 1,
          })
        );
        globeGroup.add(head);
        const trail: THREE.Mesh[] = [];
        for (let s = 0; s < 5; s++) {
          const seg = new THREE.Mesh(
            new THREE.SphereGeometry(0.014 - s * 0.0018, 8, 8),
            new THREE.MeshBasicMaterial({
              color: 0xd0e4ff,
              transparent: true,
              opacity: 0,
              depthWrite: false,
            })
          );
          globeGroup.add(seg);
          trail.push(seg);
        }
        travelers.push({
          mesh: head,
          trail,
          points,
          speed: 0.18 + idx * 0.015,
          offset: t * 0.5 + idx * 0.12,
          toCountryId: corridor.toCountryId,
          lastProgress: 0,
        });
      }
    });

    type CountryPoly = {
      id: string;
      info: CountryInfo;
      polygons: Position[][][];
    };
    const interactiveMeshes: THREE.Mesh[] = [];
    const fillByCountry = new Map<string, THREE.Mesh[]>();
    const countryPolys: CountryPoly[] = [];
    const flashUntil = new Map<string, number>();
    const raycaster = new THREE.Raycaster();

    const idleFillMat = new THREE.MeshBasicMaterial({
      color: 0x0e1a28,
      transparent: true,
      opacity: 0.02,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const hoverFillMat = new THREE.MeshBasicMaterial({
      color: 0xd8e8ff,
      transparent: true,
      opacity: 0.78,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const flashFillMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const borderMat = new THREE.LineBasicMaterial({
      color: 0xc8c8c8,
      transparent: true,
      opacity: 0.72,
    });
    const interactiveBorderMat = new THREE.LineBasicMaterial({
      color: 0xd8d8d8,
      transparent: true,
      opacity: 0.88,
    });

    function ringToSphereLine(
      ring: Position[],
      radius: number,
      material: THREE.LineBasicMaterial
    ): THREE.Line | null {
      const ptsIn =
        ring.length > 1 &&
        ring[0][0] === ring[ring.length - 1][0] &&
        ring[0][1] === ring[ring.length - 1][1]
          ? ring.slice(0, -1)
          : ring;
      if (ptsIn.length < 2) return null;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i < ptsIn.length; i++) {
        const [lng, lat] = ptsIn[i];
        const [nlng, nlat] = ptsIn[(i + 1) % ptsIn.length];
        const start = latLngToVector3(lat, lng, 1).normalize();
        const end = latLngToVector3(nlat, nlng, 1).normalize();
        const angle = start.angleTo(end);
        const steps = Math.max(1, Math.ceil(angle * 18));
        for (let s = 0; s < steps; s++) {
          const tt = s / steps;
          const p = start.clone();
          if (angle > 0.0001) {
            const axis = new THREE.Vector3().crossVectors(start, end);
            if (axis.lengthSq() > 1e-8) {
              p.applyAxisAngle(axis.normalize(), angle * tt);
            } else {
              p.lerp(end, tt).normalize();
            }
          }
          pts.push(p.multiplyScalar(radius));
        }
      }
      if (pts.length > 0) pts.push(pts[0].clone());
      if (pts.length < 2) return null;
      return new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        material
      );
    }

    function pointInRing(lng: number, lat: number, ring: Position[]): boolean {
      let inside = false;
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const xi = ring[i][0];
        const yi = ring[i][1];
        const xj = ring[j][0];
        const yj = ring[j][1];
        const intersect =
          yi > lat !== yj > lat &&
          lng < ((xj - xi) * (lat - yi)) / (yj - yi + Number.EPSILON) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    }

    function pointInCountry(
      lng: number,
      lat: number,
      polygons: Position[][][]
    ): boolean {
      for (const rings of polygons) {
        if (!rings.length) continue;
        if (!pointInRing(lng, lat, rings[0])) continue;
        let inHole = false;
        for (let h = 1; h < rings.length; h++) {
          if (pointInRing(lng, lat, rings[h])) {
            inHole = true;
            break;
          }
        }
        if (!inHole) return true;
      }
      return false;
    }

    async function loadCountries() {
      try {
        const res = await fetch(
          "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"
        );
        const topology = (await res.json()) as Topology<{
          countries: GeometryCollection;
        }>;
        if (disposed) return;
        const countries = feature(
          topology,
          topology.objects.countries
        ) as FeatureCollection<Geometry, { name?: string }>;

        countries.features.forEach((feat) => {
          const id = String(Number(feat.id));
          const info = COUNTRY_INFO[id];
          const geometries =
            feat.geometry.type === "Polygon"
              ? [feat.geometry.coordinates]
              : feat.geometry.type === "MultiPolygon"
                ? feat.geometry.coordinates
                : [];

          if (info) {
            const existing = countryPolys.find((c) => c.id === id);
            if (existing) existing.polygons.push(...(geometries as Position[][][]));
            else
              countryPolys.push({
                id,
                info,
                polygons: geometries as Position[][][],
              });
          }

          geometries.forEach((polygon) => {
            polygon.forEach((ring, ringIdx) => {
              const border = ringToSphereLine(
                ring,
                GLOBE_RADIUS + 0.006,
                info ? interactiveBorderMat : borderMat
              );
              if (border) globeGroup.add(border);

              if (info && ringIdx === 0) {
                const geo = triangulateRing(ring);
                if (geo) {
                  const mesh = new THREE.Mesh(geo, idleFillMat.clone());
                  mesh.userData = {
                    countryId: id,
                    info,
                    kind: "fill",
                  } satisfies CountryMeshUserData;
                  globeGroup.add(mesh);
                  interactiveMeshes.push(mesh);
                  const list = fillByCountry.get(id) ?? [];
                  list.push(mesh);
                  fillByCountry.set(id, list);
                }
              }
            });
          });
        });
        if (!disposed) setReady(true);
      } catch {
        if (!disposed) setReady(true);
      }
    }
    loadCountries();

    function applyCountryVisuals(now: number) {
      fillByCountry.forEach((meshes, id) => {
        const flashEnd = flashUntil.get(id) ?? 0;
        const flashing = now < flashEnd;
        const flashT = flashing ? 1 - (flashEnd - now) / 750 : 1;
        const flashStrength = flashing ? Math.max(0, 1 - easeOut(flashT)) : 0;
        const hovered = id === hoveredCountryId;

        meshes.forEach((m) => {
          const mat = m.material as THREE.MeshBasicMaterial;
          if (flashStrength > 0.02) {
            mat.color.copy(flashFillMat.color);
            mat.opacity =
              idleFillMat.opacity +
              (flashFillMat.opacity - idleFillMat.opacity) * flashStrength;
          } else if (hovered) {
            mat.color.copy(hoverFillMat.color);
            mat.opacity = hoverFillMat.opacity;
          } else {
            mat.color.copy(idleFillMat.color);
            mat.opacity = idleFillMat.opacity;
          }
        });
      });
    }

    function vector3ToLatLng(v: THREE.Vector3): { lat: number; lng: number } {
      const n = v.clone().normalize();
      const lat =
        90 - (Math.acos(Math.min(1, Math.max(-1, n.y))) * 180) / Math.PI;
      let lng = (Math.atan2(n.z, -n.x) * 180) / Math.PI - 180;
      if (lng > 180) lng -= 360;
      if (lng < -180) lng += 360;
      return { lat, lng };
    }

    function findCountryAt(
      lat: number,
      lng: number
    ): { id: string; info: CountryInfo } | null {
      for (const country of countryPolys) {
        if (pointInCountry(lng, lat, country.polygons)) {
          return { id: country.id, info: country.info };
        }
      }
      return null;
    }

    function clearHover() {
      hoveredCountryId = null;
      if (tooltipRef.current) {
        tooltipRef.current = null;
        setTooltip(null);
      }
      if (!isDragging) setCursor("grab");
    }

    function clientXY(event: MouseEvent | TouchEvent): { x: number; y: number } {
      if ("touches" in event && event.touches.length > 0) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }
      if ("changedTouches" in event && event.changedTouches.length > 0) {
        return {
          x: event.changedTouches[0].clientX,
          y: event.changedTouches[0].clientY,
        };
      }
      const me = event as MouseEvent;
      return { x: me.clientX, y: me.clientY };
    }

    function updateHover(clientX: number, clientY: number) {
      if (!container || dockedRef.current || isDragging) return;
      const rect = container.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      const pointer = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(pointer, camera);

      let countryId: string | null = null;
      let info: CountryInfo | null = null;

      globeGroup.updateMatrixWorld(true);
      const oceanHits = raycaster.intersectObject(ocean, false);
      if (oceanHits.length > 0) {
        const inv = new THREE.Matrix4().copy(globeGroup.matrixWorld).invert();
        const local = oceanHits[0].point.clone().applyMatrix4(inv);
        const { lat, lng } = vector3ToLatLng(local);
        const match = findCountryAt(lat, lng);
        if (match) {
          countryId = match.id;
          info = match.info;
        }
      }

      if (!countryId && interactiveMeshes.length > 0) {
        const meshHits = raycaster.intersectObjects(interactiveMeshes, false);
        if (meshHits.length > 0) {
          const data = meshHits[0].object.userData as CountryMeshUserData;
          countryId = data.countryId;
          info = data.info;
        }
      }

      if (countryId && info) {
        hoveredCountryId = countryId;
        setCursor("pointer");
        const next: TooltipState = {
          info,
          x: clientX - rect.left,
          y: clientY - rect.top,
        };
        tooltipRef.current = next;
        setTooltip(next);
      } else {
        clearHover();
      }
    }

    function onDragStart(event: MouseEvent | TouchEvent) {
      if (dockedRef.current) return;
      isDragging = true;
      velocityY = 0;
      const { x } = clientXY(event);
      lastPointerX = x;
      clearHover();
      setCursor("grabbing");
      if ("preventDefault" in event) event.preventDefault();
    }

    function onDragMove(event: MouseEvent | TouchEvent) {
      if (!isDragging || dockedRef.current) return;
      const { x } = clientXY(event);
      const dx = x - lastPointerX;
      lastPointerX = x;

      // Horizontal drag only — X axis stays locked
      const dYaw = dx * DRAG_SENSITIVITY;
      globeGroup.rotation.y += dYaw;
      velocityY = dYaw;
      if ("preventDefault" in event) event.preventDefault();
    }

    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      // If release had near-zero motion, resume at default auto-rotate speed
      if (Math.abs(velocityY) < 1e-6) velocityY = ROTATE_SPEED;
      setCursor(hoveredCountryId ? "pointer" : "grab");
    }

    function onMouseDown(event: MouseEvent) {
      if (event.button !== 0) return;
      onDragStart(event);
    }

    function onMouseMove(event: MouseEvent) {
      if (isDragging) onDragMove(event);
      else updateHover(event.clientX, event.clientY);
    }

    function onMouseUp() {
      onDragEnd();
    }

    function onMouseLeave() {
      if (!isDragging) clearHover();
    }

    function onTouchStart(event: TouchEvent) {
      if (event.touches.length !== 1) return;
      onDragStart(event);
    }

    function onTouchMove(event: TouchEvent) {
      if (!isDragging) return;
      onDragMove(event);
    }

    function onTouchEnd() {
      onDragEnd();
    }

    function onResize() {
      if (!container) return;
      const { w, h } = getSize();
      if (w < 2 || h < 2) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
    }

    const resizeObserver = new ResizeObserver(() => onResize());
    resizeObserver.observe(container);
    const el = renderer.domElement;
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => onResize());

    const clock = new THREE.Clock();

    function animate() {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const now = performance.now();

      // Y-axis only: auto-rotate, or inertia easing back to auto-rotate after drag
      if (!isDragging) {
        const targetSpeed = dockedRef.current
          ? ROTATE_SPEED * 0.65
          : ROTATE_SPEED;
        globeGroup.rotation.y += velocityY;
        velocityY =
          velocityY * DRAG_DAMPING + targetSpeed * (1 - DRAG_DAMPING);
      }

      stars.rotation.y += 0.00035;
      stars.rotation.x += 0.00012;

      sonarPings.forEach((ping) => {
        const cycle = ((t * 0.55 + ping.phase) % 1.6) / 1.6;
        ping.ring.scale.setScalar(1 + cycle * 2.8);
        (ping.ring.material as THREE.MeshBasicMaterial).opacity = Math.max(
          0,
          0.75 * (1 - cycle)
        );
        ping.base.scale.setScalar(1 + Math.sin(t * 2.2 + ping.phase) * 0.12);
      });

      travelers.forEach((traveler) => {
        const progress = (t * traveler.speed + traveler.offset) % 1;
        const sample = (p: number) => {
          const clamped = ((p % 1) + 1) % 1;
          const f = clamped * (traveler.points.length - 1);
          const i0 = Math.floor(f);
          const i1 = Math.min(i0 + 1, traveler.points.length - 1);
          return new THREE.Vector3().lerpVectors(
            traveler.points[i0],
            traveler.points[i1],
            f - i0
          );
        };

        traveler.mesh.position.copy(sample(progress));
        const brightness = 0.65 + Math.sin(progress * Math.PI) * 0.35;
        traveler.mesh.scale.setScalar(0.9 + brightness * 0.35);
        (traveler.mesh.material as THREE.MeshBasicMaterial).opacity = brightness;

        traveler.trail.forEach((seg, s) => {
          seg.position.copy(sample(progress - (s + 1) * 0.012));
          (seg.material as THREE.MeshBasicMaterial).opacity = Math.max(
            0,
            brightness * (0.45 - s * 0.08)
          );
        });

        if (traveler.lastProgress > 0.92 && progress < 0.08) {
          flashUntil.set(traveler.toCountryId, now + 750);
        }
        traveler.lastProgress = progress;
      });

      applyCountryVisuals(now);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if (
          obj instanceof THREE.Mesh ||
          obj instanceof THREE.Line ||
          obj instanceof THREE.Points
        ) {
          obj.geometry.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        className="absolute inset-0"
        aria-label="Interactive globe showing Syntex payment corridors"
      />
      {!ready && !docked && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="font-display text-sm text-fog">Loading globe…</span>
        </div>
      )}
      {tooltip && !docked && (
        <div
          className="pointer-events-none absolute z-20 w-60 border border-white/25 bg-black/95 px-4 py-3.5 backdrop-blur-sm"
          style={{
            left: Math.min(
              tooltip.x + 18,
              (containerRef.current?.clientWidth ?? 300) - 252
            ),
            top: Math.max(tooltip.y - 110, 10),
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="font-display text-base tracking-tight text-white">
              {tooltip.info.name}
            </p>
            {tooltip.info.corridor ? (
              <span className="shrink-0 border border-white/15 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-neutral-500">
                Example corridor
              </span>
            ) : (
              <span className="shrink-0 border border-white/15 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-neutral-500">
                Coming soon
              </span>
            )}
          </div>
          <div className="mt-3 space-y-2.5 border-t border-white/10 pt-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                National ID
              </p>
              <p className="mt-0.5 text-[13px] text-neutral-300">
                {tooltip.info.idType}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                Payment regulator
              </p>
              <p className="mt-0.5 text-[13px] text-neutral-300">
                {tooltip.info.regulator}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
