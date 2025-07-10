import * as THREE from "three";

/**
 *
 * @param threeObject
 * @param x
 * @param y
 * @returns {{distance: number, distanceToRay: number, point: Vector3, face: Object, faceIndex: number, object: Object3D, uv: Vector2, uv1: Vector3, instanceId: number}|null}
 */

export function getObjectsUnderMouse(threeObject, x, y) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (x / threeObject.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(y / threeObject.renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, threeObject.camera);

    // Collect Meshes, Lines, and Points
    const validObjects = [];
    threeObject.scene.traverse(obj => {
        if (obj.isMesh || obj.isLine || obj.isPoints) {
            validObjects.push(obj);
        }
    });

    const intersects = raycaster.intersectObjects(validObjects, false);

    return intersects.length > 0 ? intersects[0] : null; // full intersection object
}


/**
 * Outputs the mouse position on the screen in 2D coordinates relative to the Three.js renderer.
 *
 * @param {{ renderer: THREE.WebGLRenderer }} renderer - An object containing the Three.js renderer.
 * @returns {{
 *   getMousePosition: () => { x: number, y: number },
 *   stop: () => void
 * }} Object with methods to get the last mouse position and stop the tracking.
 */

export function getMouseLocation2D(renderer) {
    let lastMousePosition = { x: 0, y: 0 };

    const updateMousePosition = (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        lastMousePosition.x = event.clientX - rect.left;
        lastMousePosition.y = event.clientY - rect.top;
    };

    window.addEventListener('mousemove', updateMousePosition);

    // Return controls
    return {
        getMousePosition: () => ({ ...lastMousePosition }),
        stop: () => {
            window.removeEventListener('mousemove', updateMousePosition);
        }
    };
}

export function getMouseLocationOnFloor(){

}