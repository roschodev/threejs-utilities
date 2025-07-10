import * as THREE from 'three';

export class ThreeSelectionHandler {
    constructor(sceneObject) {
        this.sceneObject = sceneObject;
        this.selectedObject = null;
        this.hoveredObject = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.clickThreshold = 5;

        this.mouseDownPos = { x: 0, y: 0 };

        const canvas = this.sceneObject.renderer.domElement;
        canvas.addEventListener('mousedown', (e) => this.onMouseDown(e), false);
        canvas.addEventListener('click', (e) => this.onMouseClick(e), false);
        canvas.addEventListener('mousemove', (e) => this.onMouseMove(e), false);
    }

    onMouseDown(event) {
        this.mouseDownPos = { x: event.clientX, y: event.clientY };
    }

    isClick(event) {
        const dx = event.clientX - this.mouseDownPos.x;
        const dy = event.clientY - this.mouseDownPos.y;
        return Math.sqrt(dx * dx + dy * dy) <= this.clickThreshold;
    }

    onMouseClick(event) {
        if (!this.isClick(event)) return;

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.sceneObject.camera);

        const intersects = this.raycaster.intersectObjects(this.sceneObject.scene.children, true);
        const selected = intersects.find(i => i.object.isMesh && i.object.material?.emissive);

        if (selected) {
            if (this.selectedObject !== selected.object) {
                this.deselectObject();
                this.selectObject(selected.object);
            } else {
                this.deselectObject();
            }
        } else {
            this.deselectObject();
        }
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.sceneObject.camera);

        const intersects = this.raycaster.intersectObjects(this.sceneObject.scene.children, true);
        const hovered = intersects.find(i => i.object.isMesh && i.object.material?.emissive)?.object;

        if (hovered !== this.hoveredObject) {
            this.unhighlightHoveredObject();
            if (hovered && hovered !== this.selectedObject) {
                this.highlightHoveredObject(hovered);
            }
        }
    }

    highlightHoveredObject(object) {
        this.hoveredObject = object;
        object.material.emissive.set(0xffff00); // yellow
    }

    unhighlightHoveredObject() {
        if (this.hoveredObject && this.hoveredObject !== this.selectedObject) {
            this.hoveredObject.material.emissive.set(0x000000);
        }
        this.hoveredObject = null;
    }

    selectObject(object) {
        this.selectedObject = object;
        object.material.emissive.set(0x00ff00); // green
    }

    deselectObject() {
        if (this.selectedObject) {
            this.selectedObject.material.emissive.set(0x000000);
        }
        this.selectedObject = null;
    }

    updateScene(scene) {
        this.sceneObject.scene = scene;
    }
}
