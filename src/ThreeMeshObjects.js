import * as THREE from "three";
import {ThreeSceneObject} from "./Three/ThreeSceneObject.js";


export class ThreeBasicMeshObject{
     constructor(geometry, material, sceneObject=ThreeSceneObject) {
         this.mesh = new THREE.Mesh(geometry, material);
         this.material = material
         this.geometry = geometry
         this.transformSpace = {
             Local: 1,
             Global: 2
         }
         this.localAxesHelper = null
         this.globalAxesHelper = null
     }

    enableAxesHelper(Enable = true, object, TransformSpace = this.transformSpace.Local) {
        const existingAxesHelper = object.children.find(child => child instanceof THREE.AxesHelper);

        if (Enable) {
            if (!existingAxesHelper) {
                const axisHelper = new THREE.AxesHelper(1000);
                switch (TransformSpace) {
                    case this.transformSpace.Local:
                        object.add(axisHelper);  // Add to the object itself
                        break;
                    case this.transformSpace.Global:
                        if (object.parent) {
                            object.parent.add(axisHelper);  // Add to the object's parent
                        } else {
                            console.warn("Object has no parent for Global space");
                        }
                        break;
                }
            } else {
                console.log("AxesHelper already exists on this object");
            }
        } else {
            if (existingAxesHelper) {
                object.remove(existingAxesHelper);  // Remove the existing AxesHelper
            }
        }
    }
}

