import * as THREE from 'three';
import { GLTFLoader } from 'three/addons';

export class ThreeMeshFileLoader {
    constructor() {}

    loadGLTF(path, onLoadCallback) {
        this.path = path; // Path to your GLB file
        this.extension = this.path.split(".").pop().toLowerCase();

        // Only proceed if the file is a GLB
        if (this.extension === "glb") {
            this.loader = new GLTFLoader();
        } else {
            console.error("Unsupported file format. Please use `glb`.");
            return;
        }

        if (!this.loader) {
            console.error("GLTFLoader not initialized.");
            return;
        }

        // Load the GLB file
        this.loader.load(
            this.path,
            (gltf) => {
                //console.log("Model loaded successfully:", gltf);

                // Call function to extract geometry and create a mesh
                const mesh = this.createMeshFromGLTF(gltf.scene);

                // Pass the mesh to the callback function
                if (onLoadCallback) onLoadCallback(mesh);

            },
            (progress) => {
                //console.log("Loading progress:", (progress.loaded / progress.total) * 100, "%");
            },
            (error) => {
                console.error("Error loading model:", error);
            }
        );
    }

    // Function to create a mesh from the GLTF scene
    createMeshFromGLTF(scene) {
        let geometry = null;
        let material = null;

        // Traverse all child meshes in the scene
        scene.traverse((child) => {
            if (child.isMesh) {
                // If it's a mesh, get its geometry and material
                geometry = child.geometry;
                material = child.material;
            }
        });

        // Now create a new mesh with the geometry and material from the GLTF
        if (geometry && material) {
            const mesh = new THREE.Mesh(geometry, material);
            return mesh;
        } else {
            console.error("No mesh found in the GLTF model.");
            return null;
        }
    }
}
