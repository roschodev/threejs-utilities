import {TransformControls} from "three/addons/controls/TransformControls.js";

export class ThreeTransformGizmo{
    constructor(mesh, sceneObject) {
        this.controller = new TransformControls(sceneObject.camera, sceneObject.renderer.domElement);
        this.controller.attach(mesh)

        const gizmo = this.controller.getHelper()
        sceneObject.scene.add(gizmo)

        this.controller.addEventListener('dragging-changed', function (event) {
            sceneObject.controls.enabled = !event.value;
        });
    }

    enableScaleMode(){
        this.controller.setMode('scale');
    }

    enableRotateMode(){
        this.controller.setMode('rotate');
    }
}