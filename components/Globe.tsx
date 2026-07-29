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
/** Full sphere in frame: ~3.15× radius, FOV 48° */
const CAMERA_DISTANCE = GLOBE_RADIUS * 3.15;
const CAMERA_FOV = 48;
const ROTATE_SPEED = 0.00045;

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

function triangulateRing(ring: Position[]): THREE.BufferGeometry | null {
  if (ring.length < 3) return null;

  // Flatten lng/lat for earcut (2D), then map triangles onto the sphere
  const flat: number[] = [];
  const sphereVerts: THREE.Vector3[] = [];

  // Drop duplicate closing coordinate if present
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

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<TooltipState>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let frameId = 0;
    let autoRotate = true;
    let hoveredCountryId: string | null = null;

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
      100
    );
    camera.position.set(0, 0, CAMERA_DISTANCE);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, true);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xb8c4d8, 0.7));
    const key = new THREE.DirectionalLight(0xd0d8e8, 0.85);
    key.position.set(4, 2.5, 3);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x4a6080, 0.35);
    fill.position.set(-3, -1, -2);
    scene.add(fill);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.y = -0.85;
    globeGroup.rotation.x = 0.12;
    scene.add(globeGroup);

    // Ocean sphere — dark blue volume with clear limb shading
    const ocean = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS, 96, 96),
      new THREE.MeshPhongMaterial({
        color: 0x0a1628,
        emissive: 0x071220,
        specular: 0x3a5570,
        shininess: 28,
      })
    );
    globeGroup.add(ocean);

    // Soft atmosphere rim (kept inside camera framing)
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 1.045, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        uniforms: {
          glowColor: { value: new THREE.Color(0x8aa8c0) },
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
          void main() {
            float intensity = pow(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
            gl_FragColor = vec4(glowColor, intensity * 0.45);
          }
        `,
      })
    );
    scene.add(atmosphere);

    // Sparse ambient particles
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = GLOBE_RADIUS * (1.4 + Math.random() * 1.0);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.cos(phi);
      particlePositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: 0x8899aa,
        size: 0.014,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
        sizeAttenuation: true,
      })
    );
    scene.add(particles);

    // ——— Arcs: thin bright white signal lines ———
    type ArcTraveler = {
      mesh: THREE.Mesh;
      trail: THREE.Mesh[];
      points: THREE.Vector3[];
      speed: number;
      offset: number;
    };
    type SonarPing = {
      ring: THREE.Mesh;
      base: THREE.Mesh;
      phase: number;
    };

    const travelers: ArcTraveler[] = [];
    const sonarPings: SonarPing[] = [];

    CORRIDORS.forEach((corridor, idx) => {
      const points = createArcPoints(
        corridor.from[0],
        corridor.from[1],
        corridor.to[0],
        corridor.to[1],
        GLOBE_RADIUS,
        0.3 + idx * 0.045,
        100
      );
      const curve = new THREE.CatmullRomCurve3(points);

      // Thin bright core
      globeGroup.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(curve, 100, 0.004, 6, false),
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 1,
          })
        )
      );

      // Soft glow halo (thin — reads as light, not a fat stroke)
      globeGroup.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(curve, 100, 0.011, 6, false),
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.22,
          })
        )
      );

      // Endpoint hubs + sonar rings
      [corridor.from, corridor.to].forEach(([lat, lng], endIdx) => {
        const pos = latLngToVector3(lat, lng, GLOBE_RADIUS + 0.014);

        const base = new THREE.Mesh(
          new THREE.SphereGeometry(0.018, 14, 14),
          new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        base.position.copy(pos);
        globeGroup.add(base);

        // Ring in local tangent plane — use a thin torus aligned to surface normal
        const ringGeo = new THREE.RingGeometry(0.03, 0.038, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide,
          depthWrite: false,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(pos);
        // Orient ring to face outward from globe center
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        ring.rotateY(Math.PI);
        globeGroup.add(ring);

        sonarPings.push({
          ring,
          base,
          phase: idx * 0.7 + endIdx * 0.35,
        });
      });

      // Signal packets: sharp head + short trail
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
          speed: 0.2 + idx * 0.02,
          offset: t * 0.5 + idx * 0.15,
        });
      }
    });

    // ——— Countries ———
    type CountryPoly = {
      id: string;
      info: CountryInfo;
      /** GeoJSON polygons: each is [outerRing, ...holes], coords as [lng, lat] */
      polygons: Position[][][];
    };

    const interactiveMeshes: THREE.Mesh[] = [];
    const fillByCountry = new Map<string, THREE.Mesh[]>();
    const countryPolys: CountryPoly[] = [];
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
    const borderMat = new THREE.LineBasicMaterial({
      color: 0xc8c8c8,
      transparent: true,
      opacity: 0.85,
    });
    const interactiveBorderMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1,
    });

    /** Project a GeoJSON ring onto the sphere as a THREE.Line (curve along surface). */
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
          const t = s / steps;
          const p = start.clone();
          if (angle > 0.0001) {
            const axis = new THREE.Vector3().crossVectors(start, end);
            if (axis.lengthSq() > 1e-8) {
              p.applyAxisAngle(axis.normalize(), angle * t);
            } else {
              p.lerp(end, t).normalize();
            }
          }
          pts.push(p.multiplyScalar(radius));
        }
      }
      // Close the loop
      if (pts.length > 0) pts.push(pts[0].clone());
      if (pts.length < 2) return null;
      return new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        material
      );
    }

    /** Ray-casting point-in-ring (lng/lat plane). Handles antimeridian poorly but fine for our set. */
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
          // world-atlas zero-pads some IDs ("076"); normalize to numeric string
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
            if (existing) {
              existing.polygons.push(...(geometries as Position[][][]));
            } else {
              countryPolys.push({
                id,
                info,
                polygons: geometries as Position[][][],
              });
            }
          }

          geometries.forEach((polygon) => {
            polygon.forEach((ring, ringIdx) => {
              const border = ringToSphereLine(
                ring,
                GLOBE_RADIUS + 0.006,
                info ? interactiveBorderMat : borderMat
              );
              if (border) globeGroup.add(border);

              // Fill every outer ring of interactive countries (all MultiPolygon parts)
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

    function setCountryHover(countryId: string | null) {
      fillByCountry.forEach((meshes, id) => {
        const active = id === countryId;
        meshes.forEach((m) => {
          const mat = m.material as THREE.MeshBasicMaterial;
          if (active) {
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
      const lat = 90 - (Math.acos(Math.min(1, Math.max(-1, n.y))) * 180) / Math.PI;
      let lng = ((Math.atan2(n.z, -n.x) * 180) / Math.PI) - 180;
      // Normalize to [-180, 180]
      if (lng > 180) lng -= 360;
      if (lng < -180) lng += 360;
      return { lat, lng };
    }

    function findCountryAt(lat: number, lng: number): { id: string; info: CountryInfo } | null {
      // Shape-accurate: point-in-polygon against stored GeoJSON rings
      for (const country of countryPolys) {
        if (pointInCountry(lng, lat, country.polygons)) {
          return { id: country.id, info: country.info };
        }
      }
      return null;
    }

    function onPointerMove(event: PointerEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const pointer = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );

      raycaster.setFromCamera(pointer, camera);

      let countryId: string | null = null;
      let info: CountryInfo | null = null;

      // Hit the globe surface → lat/lng → point-in-polygon (matches country shape)
      const oceanHits = raycaster.intersectObject(ocean, false);
      if (oceanHits.length > 0) {
        globeGroup.updateMatrixWorld(true);
        const inv = new THREE.Matrix4().copy(globeGroup.matrixWorld).invert();
        const local = oceanHits[0].point.clone().applyMatrix4(inv);
        const { lat, lng } = vector3ToLatLng(local);
        const match = findCountryAt(lat, lng);
        if (match) {
          countryId = match.id;
          info = match.info;
        }
      }

      // Secondary: triangulated fill meshes (helps when PIP fails on complex rings)
      if (!countryId) {
        const meshHits = raycaster.intersectObjects(interactiveMeshes, false);
        if (meshHits.length > 0) {
          const data = meshHits[0].object.userData as CountryMeshUserData;
          countryId = data.countryId;
          info = data.info;
        }
      }

      if (countryId && info) {
        autoRotate = false;
        if (hoveredCountryId !== countryId) {
          hoveredCountryId = countryId;
          setCountryHover(countryId);
        }
        const next: TooltipState = {
          info,
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        tooltipRef.current = next;
        setTooltip(next);
      } else {
        if (hoveredCountryId) {
          hoveredCountryId = null;
          setCountryHover(null);
        }
        if (tooltipRef.current) {
          tooltipRef.current = null;
          setTooltip(null);
        }
        autoRotate = true;
      }
    }

    function onPointerLeave() {
      autoRotate = true;
      hoveredCountryId = null;
      setCountryHover(null);
      tooltipRef.current = null;
      setTooltip(null);
    }

    function onResize() {
      if (!container) return;
      const { w, h } = getSize();
      if (w < 2 || h < 2) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // Keep drawing buffer aspect locked to the square container display size
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
    }

    const resizeObserver = new ResizeObserver(() => onResize());
    resizeObserver.observe(container);

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => onResize());

    const clock = new THREE.Clock();

    function animate() {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (autoRotate) {
        globeGroup.rotation.y += ROTATE_SPEED;
      }

      atmosphere.rotation.y = globeGroup.rotation.y;
      particles.rotation.y = t * 0.015;

      // Sonar ping rings at endpoints
      sonarPings.forEach((ping) => {
        const cycle = ((t * 0.55 + ping.phase) % 1.6) / 1.6;
        const scale = 1 + cycle * 2.8;
        ping.ring.scale.setScalar(scale);
        const mat = ping.ring.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 0.75 * (1 - cycle));
        // Soft pulse on the hub itself
        const hubPulse = 1 + Math.sin(t * 2.2 + ping.phase) * 0.12;
        ping.base.scale.setScalar(hubPulse);
      });

      // Signal travelers
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
          (seg.material as THREE.MeshBasicMaterial).opacity =
            Math.max(0, brightness * (0.45 - s * 0.08));
        });
      });

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
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
    <div className="relative aspect-square w-full">
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-crosshair"
        aria-label="Interactive globe showing Syntex payment corridors"
      />
      {!ready && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="font-display text-sm text-fog">Loading globe…</span>
        </div>
      )}
      {tooltip && (
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
