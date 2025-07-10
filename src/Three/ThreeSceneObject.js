import * as THREE from "three";
import OrbitControlsExtended from "/src/Three/ThreeControls/OrbitControlsExtended.js";
import * as dat from 'dat.gui';

export class ThreeSceneObject {
    constructor(){
        const {scene, camera, renderer} = this.init()
        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.updatables = [];

        this.controls = new OrbitControlsExtended(this.camera, this.renderer.domElement, false);
        this.controls.enabled = false
        this.controls.enablePan = false

        this.ambientLight = null

        this.animate()
    }

    init(){
        let scene, camera, renderer;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.set( 2, 2, 4 );
        camera.lookAt( scene.position);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild(renderer.domElement );
        return {scene, camera, renderer}
    }

    enableOrbitControls( mode = "Enabled", enableIdleRotation = true) {
        if (mode === "Enabled") {
            this.controls.enabled = true;
            this.controls.enableIdleRotation = enableIdleRotation;
            return this.controls;
        } else if (mode === "Disabled" && this.controls) {
            this.controls.enabled = false;
            this.controls.enableIdleRotation = false;
            return this.controls;
        } else if (mode === "Destroy" && this.controls) {
            this.controls.dispose();
            this.controls = null;
            return this.controls;
        } else {
            console.log("Invalid mode for OrbitControls. Please enter Enabled, Disabled, or Destroy.");
            return null;
        }
    }

    enableAmbientLight(Enable = true, color = 0xffffff, intensity = 0.5) {
        if(Enable){
            if(!this.ambientLight){
                this.ambientLight = new THREE.AmbientLight(color, intensity);
                this.scene.add(this.ambientLight);
            }
            else{
                console.log("AmbientLight already exists on this object");
            }

        } else {
            if (this.ambientLight) {
                this.scene.remove(this.ambientLight);
            }
        }
    }

    addUpdatable(updatable) {
        this.updatables.push(updatable);
    }

    enableWindowResizing(Enable = true) {
        if (Enable) {
            window.addEventListener('resize', this.onWindowResize.bind(this), false);
        } else {
            window.removeEventListener('resize', this.onWindowResize.bind(this), false);
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }


    animate() {
        requestAnimationFrame(this.animate.bind(this));

        if(this.controls.enableIdleRotation)
            this.controls.deltatime = this.controls.clock.getDelta();
            this.controls.updateIdleTime(this.controls.deltatime)

        this.renderer.render(this.scene, this.camera);
    }
}




