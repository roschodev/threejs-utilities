import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";

export default class OrbitControlsExtended extends OrbitControls {
    constructor(camera, domElement) {
        super(camera, domElement);
        this.clock = new THREE.Clock();
        this.idleTime = 0;
        this.idleThreshold = 1; // Time in seconds after which the idle mechanic is triggered
        this.isRotating = false;
        this.rotationSpeed = 0.05;
        this.enablePan = false; // Add a flag to enable or disable panning
        // Disable panning if 'enablePan' is false
        this.enablePan = false
        this.deltatime = 0
        // Start listening for input events
        this.addInputListeners();
    }

    addInputListeners() {
        // Reset idle time on user interaction
        window.addEventListener("keydown", this.resetIdleTime.bind(this), false);
        window.addEventListener("mousedown", this.resetIdleTime.bind(this), false);
        window.addEventListener("touchstart", this.resetIdleTime.bind(this), false);
    }

    resetIdleTime() {
        this.idleTime = 0;
        if (this.isRotating) {
            this.stopRotation();
        }
    }

    startRotation() {
        if (!this.isRotating) {
            this.isRotating = true;

            // Save starting position relative to origin (0,0,0)
            const pos = this.object.position;
            this._rotationRadius = Math.sqrt(pos.x * pos.x + pos.z * pos.z);
            this._baseAngle = Math.atan2(pos.z, pos.x); // angle in XZ plane
            this._rotationTime = 0; // reset timer for oscillation
        }
    }


    stopRotation() {
        this.isRotating = false;
    }

    updateIdleTime(deltaTime) {
        this.idleTime += deltaTime;

        if (this.idleTime >= this.idleThreshold && !this.isRotating) {
            this.startRotation();
        }

        if (this.isRotating) {
            this.rotateCameraAroundCenter(deltaTime); // Pass deltaTime for smoother and more consistent rotation
        }
    }

    rotateCameraAroundCenter(deltaTime) {
        this._rotationTime += deltaTime;

        const frequency = this.rotationSpeed; // How fast it swings left/right
        const amplitude = Math.PI / 8;        // Max swing angle (you can make this a variable too)

        const offsetAngle = Math.sin(this._rotationTime * frequency) * amplitude;
        const angle = this._baseAngle + offsetAngle;

        const x = this._rotationRadius * Math.cos(angle);
        const z = this._rotationRadius * Math.sin(angle);

        this.object.position.set(x, this.object.position.y, z);
        this.object.lookAt(0, 0, 0);
    }





    update() {
        // Call the base update method of OrbitControls
        super.update();
    }
}
