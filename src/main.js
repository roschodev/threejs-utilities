import * as THREE from "three";

import { ThreeSceneObject } from "./Three/ThreeSceneObject.js";
import { CircularSplineObject, FlowExtended, ThreeBasicSplineObject, TrainTrack} from "./ThreeSplineObjects.js";

import {ThreeDebuggerObject} from "./Three/ThreeDebuggerObject.js";


//DEBUG VARIABLES================================================================================================================
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
)

// Initialize the scene========================================================================================================
const threeObject = new ThreeSceneObject();
threeObject.enableAmbientLight(true, 0xffffff, 5);
threeObject.enableWindowResizing(true);
threeObject.enableOrbitControls("Enabled", true);
threeObject.renderer.domElement.style.position = 'absolute';
threeObject.renderer.domElement.style.top = '0';
threeObject.renderer.domElement.style.left = '0';
threeObject.renderer.domElement.style.width = '100%';
threeObject.renderer.domElement.style.height = '100%';
threeObject.renderer.domElement.style.zIndex = '0';
threeObject.renderer.domElement.style.backgroundColor = '#ffffff';
threeObject.renderer.setClearColor(0xffffff);


// Initialize CircularSpline===================================================================================================
const circularSplineObject = new CircularSplineObject(threeObject.scene, 35, 50);
circularSplineObject.enablePointMarkers(true, mesh)


// Add GUI===================================================================================================
const userInterface = new ThreeDebuggerObject(threeObject)






//_________________________________________________________________________________________

// //Initializing Train____________________________________________________________________
// const loader = new ThreeMeshFileLoader();
// let cart_flatbed, cart_boxcar, cart_passenger, locomotive;
//
// function loadGLB(path) {
//     return new Promise((resolve, reject) => {
//         loader.loadGLTF(path, (mesh) => {
//             if (mesh) {
//                 resolve(mesh); // Resolve the promise with the mesh
//             } else {
//                 reject(`Failed to load ${path}`);
//             }
//         });
//     });
// }
//
// Promise.all([
//     loadGLB("models/cart_flatbed.glb"),
//     loadGLB("models/cart_boxcar.glb"),
//     loadGLB("models/cart_passenger.glb"),
//     loadGLB("models/locomotive.glb")
// ])
//     .then(([flatbed, boxcar, passenger, loco]) => {
//         // Once all the files are loaded, assign the meshes to variables
//         cart_flatbed = flatbed;
//         cart_boxcar = boxcar;
//         cart_passenger = passenger;
//         locomotive = loco;
//
//         // Now that everything is loaded, add them to the carts array
//         const carts = [
//             cart_boxcar,
//             cart_passenger,
//             cart_flatbed,
//             cart_boxcar,
//             locomotive,
//         ];
//
//         // Add each cart to the train and scene
//         carts.forEach(cart => {
//             train.addCart({ mesh: cart }); // Make sure to wrap it in an object with the mesh
//             threeObject.scene.add(cart);   // Add the mesh to the scene
//         });
//
//         // Start the train animation
//         train.animate();
//     })
//     .catch(error => {
//         console.error("Error loading models:", error);
//     });
//_________________________________________________________________________________________

//const selectionHandler = new ThreeSelectionHandler(threeObject)

//_________________________________________________________________________________________

// let intersects = []
// let hitObject = null

// threeObject.renderer.domElement.addEventListener('pointerdown', (event) => {
//     const rect = threeObject.renderer.domElement.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;
//     console.log(x, y);
//     intersects = UTIL.getObjectsUnderMouse(threeObject, x, y)
//     if(intersects){
//         if (intersects.length > 0) {
//             hitObject = intersects[0];
//             console.log("found something")
//             console.log(intersects[0]);
//         }
//         else {
//             console.log("nothing hit")
//         }
//     }
// });

// const fpsCounter = new Stats();

//
// // const train = new FlowExtended(spline, 0.25);
// const cube = new THREE.BoxGeometry(0.1, 0.1, 0.1);
// const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//
// const tubeGroup = new THREE.Group();
// const spacing = 0.1;
// const len = spline.curve.getLength();
// const numSegments = Math.ceil(len / spacing);
//
// for (let i = 0; i <= numSegments; i++) {
//     const t = i / numSegments;
//     const position = spline.curve.getPointAt(t);
//     const tangent = spline.curve.getTangentAt(t).normalize();
//
//     const mesh = new THREE.Mesh(cube, mat);
//     mesh.position.copy(position);
//
//     // Orient cube along the tangent
//     const axis = new THREE.Vector3(0, 1, 0); // Default up direction
//     const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, tangent);
//     mesh.quaternion.copy(quaternion);
//
//     tubeGroup.add(mesh);
// }

// //CREATE THE MESH
// const geometry = new THREE.BoxGeometry(1,1,1);
// const material = new THREE.MeshStandardMaterial({color: 0xffffff});
// const cube = new ThreeBasicMeshObject(geometry, material, threeObject);
// threeObject.scene.add(cube.mesh);


//Initializing TransformHandler____________________________________________________________________
// let controller = null;
// //CREATE THE TRANSFORM CONTROLLER
// function createTransformHandle(sceneObject = ThreeSceneObject) {
//     controller = new TransformControls(threeObject.camera, threeObject.renderer.domElement);
//     controller.attach(cube.mesh)
//
//     const gizmo = controller.getHelper()
//     threeObject.scene.add(gizmo)
//
//     controller.addEventListener('dragging-changed', function (event) {
//         threeObject.controls.enabled = !event.value;
//     });
// }
// createTransformHandle(threeObject)
//_________________________________________________________________________________________

// // Add a button to change TransformControls mode
// gui.add({
//     switchToScale: () => controller.setMode('scale'),
//     switchToRotate: () => controller.setMode('rotate'),
//     switchToTranslate: () => controller.setMode('translate')
// }, 'switchToScale').name('Scale Mode');
//
// gui.add({
//     switchToRotate: () => controller.setMode('rotate')
// }, 'switchToRotate').name('Rotate Mode');
//
// gui.add({
//     switchToTranslate: () => controller.setMode('translate')
// }, 'switchToTranslate').name('Translate Mode');
