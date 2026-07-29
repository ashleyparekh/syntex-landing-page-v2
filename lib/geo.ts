import * as THREE from "three";

export function latLngToVector3(
  lat: number,
  lng: number,
  radius: number
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** Great-circle arc with mid-point altitude lift */
export function createArcPoints(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  radius: number,
  altitude: number,
  segments = 64
): THREE.Vector3[] {
  const start = latLngToVector3(startLat, startLng, 1).normalize();
  const end = latLngToVector3(endLat, endLng, 1).normalize();
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = new THREE.Vector3().copy(start).lerp(end, t).normalize();
    // Prefer spherical interpolation for longer routes
    const angle = start.angleTo(end);
    if (angle > 0.001) {
      const axis = new THREE.Vector3().crossVectors(start, end).normalize();
      p.copy(start).applyAxisAngle(axis, angle * t);
    }
    const lift = altitude * Math.sin(Math.PI * t);
    points.push(p.multiplyScalar(radius + lift));
  }

  return points;
}
