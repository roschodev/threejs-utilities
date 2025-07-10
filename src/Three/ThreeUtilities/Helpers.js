import * as THREE from "three";

export function enableGlobalAxesHelper(scene, enabled) {
    const existingGlobalAxes = scene.children.find(child => child instanceof THREE.AxesHelper && child.name === 'global-axes-helper') ;
    if (enabled) {
        if (!existingGlobalAxes) {
            const axesHelper = new THREE.AxesHelper(1000);
            axesHelper.name = 'global-axes-helper'; // Tag it with a unique name
            scene.add(axesHelper);
            return axesHelper;
        }
    } else {
        if (existingGlobalAxes) {
            scene.remove(existingGlobalAxes);
            return null
        }
    }
}

export function enableGridHelper(scene, enabled, size, divisions) {
    const existingGrid = scene.children.find(child => child instanceof THREE.GridHelper);
    if (enabled) {
        if (!existingGrid) {
            const newGrid = new THREE.GridHelper(size, divisions);
            scene.add(newGrid);
            return newGrid;
        } else {
            scene.remove(existingGrid);
            const newGrid = new THREE.GridHelper(size, divisions);
            scene.add(newGrid);
            return newGrid;
        }
    } else {
        if (existingGrid) {
            scene.remove(existingGrid);
            return null;
        }
        return null;
    }
}