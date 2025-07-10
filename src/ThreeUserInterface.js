import * as dat from 'dat.gui';
import {TransformControls} from "three/addons/controls/TransformControls.js";

export class UI_ObjectProperties{
    constructor(object, sceneObject){
        this.object = object;
        this.sceneObject = sceneObject;

        this.objTab = dat.gui.GUI.addFolder('Cube');
        this.objTab.add(object.mesh.position, 'x', -5, 5).name('Position X');  // Control position.x
        this.objTab.add(object.mesh.position, 'y', -5, 5).name('Position Y');  // Control position.y
        this.objTab.add(object.mesh.position, 'z', -5, 5).name('Position Z');  // Control position.z
        this.objTab.add(object.mesh.rotation, 'x', 0, Math.PI * 2).name('Rotation X'); // Control rotation
        this.objTab.add(object.mesh.rotation, 'y', 0, Math.PI * 2).name('Rotation Y');
        this.objTab.add(object.mesh.rotation, 'z', 0, Math.PI * 2).name('Rotation Z');
        this.objTab.add(object.mesh.scale, 'x', 0,10).name('Scale X'); // Control rotation
        this.objTab.add(object.mesh.scale, 'y', 0,10).name('Scale Y');
        this.objTab.add(object.mesh.scale, 'z', 0,10).name('Scale Z');
        this.objTab.open();

        dat.gui.GUI.add({
            switchToScale: () => controller.setMode('scale'),
            switchToRotate: () => controller.setMode('rotate'),
            switchToTranslate: () => controller.setMode('translate')
        }, 'switchToScale').name('Scale Mode');

        dat.gui.GUI.add({
            switchToRotate: () => controller.setMode('rotate')
        }, 'switchToRotate').name('Rotate Mode');

        dat.gui.GUI.add({
            switchToTranslate: () => controller.setMode('translate')
        }, 'switchToTranslate').name('Translate Mode');

    }

    createTransformHandle() {
        this.controller = new TransformControls(this.sceneObject.camera, this.sceneObject.renderer.domElement);
        this.controller.attach(cube.mesh)

        const gizmo = controller.getHelper()
        this.sceneObject.scene.add(gizmo)

        controller.addEventListener('dragging-changed', function (event) {
            this.sceneObject.controls.enabled = !event.value;
        });
    }
}