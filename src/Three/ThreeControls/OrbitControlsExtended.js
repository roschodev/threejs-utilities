import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";

export default class OrbitControlsExtended extends OrbitControls {
    constructor(camera, domElement, enableIdleRotation = true) {
        super(camera, domElement);
        this.clock = new THREE.Clock();
        this.idleTime = 0;
        this.isRotating = false;
        this.deltatime = 0
        // this.screenSpacePanning = false;
        // this.zoomToCursor = true;
        // this.enableDamping = true;
        // this.dampingFactor = 0.01;
        // this.rotateSpeed = 0.35;

        //Accessable Variables
        this.enableIdleRotation = enableIdleRotation;
        this.speed = 0.05;
        this.amplitude = 8
        this.threshold = 1;

        // Start listening for input events
        this.addInputListeners();
    }

    setIdleRotationEnabled(enabled) {
        this.enableIdleRotation = enabled;

        if (!enabled && this.isRotating) {
            this.stopRotation();
        }
    }

    addInputListeners() {
        // Reset idle time on user interaction
        window.addEventListener("keydown", this.resetIdleTime.bind(this), false);
        window.addEventListener("mousedown", this.resetIdleTime.bind(this), false);
        window.addEventListener("touchstart", this.resetIdleTime.bind(this), false);
        window.addEventListener("wheel", this.resetIdleTime.bind(this), false);
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
        if (!this.enableIdleRotation) return; // Respect the toggle

        this.idleTime += deltaTime;

        if (this.idleTime >= this.threshold && !this.isRotating) {
            this.startRotation();
        }

        if (this.isRotating) {
            this.rotateCameraAroundCenter(deltaTime);
        }
    }


    rotateCameraAroundCenter(deltaTime) {
        this._rotationTime += deltaTime;

        const frequency = this.speed; // How fast it swings left/right
        const amplitude = Math.PI / this.amplitude;        // Max swing angle (you can make this a variable too)

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
