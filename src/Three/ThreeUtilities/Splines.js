import * as THREE from "three";

export function createMarkersOnSplinePoints(spline,mesh) {
    const pointMarkers = new THREE.Group();
    spline.points.forEach(p => {
        const marker = mesh.clone();
        marker.position.copy(p);
        pointMarkers.add(marker);
    });
    return pointMarkers;
}

