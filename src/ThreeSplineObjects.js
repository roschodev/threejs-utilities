import * as THREE from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import {createMarkersOnSplinePoints} from "./Three/ThreeUtilities/Splines.js";


/**
 * Basic class for encapsulating a Three Spline.
 */
export class ThreeBasicSplineObject {
    constructor(points, resolution = 50, closed = false) {
        this.points = points
        this.curve = new THREE.CatmullRomCurve3(this.points, closed);
        this.curvePoints = this.curve.getPoints(resolution);
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.curvePoints);
        this.material = new THREE.LineBasicMaterial({color: 0xff0000});
        this.splineObject = new THREE.Line(this.geometry, this.material);
    }
}

/**
 * Extends the Flow class to allow multiple objects to follow along a spline.
 * @class
 */
export class FlowExtended {
    /**
     *
     * Creates a class to allow an array of objects to move along a spline at a specified speed.
     *
     * @param splineObject
     * @param speed
     * @param easingFactor
     */
    constructor(splineObject, speed = 0.75, easingFactor = 0.05) {
        this.isMoving = true;
        this.splineObject = splineObject;
        this.curve = splineObject.curve;
        this.speed = speed;
        this.targetSpeed = speed;
        this.currentSpeed = speed;
        this.easingFactor = easingFactor;
        this.t = 0;
        this.carts = [];
        this.offset = [];
        this.splinelength = this.splineObject.curve.getLength();
        this.animate = this.animate.bind(this);
    }

    addCart(cart) {
        this.carts.push(cart); // Add a cart to the train

        const bbox = new THREE.Box3().setFromObject(cart.mesh);
        const size = new THREE.Vector3();
        bbox.getSize(size);
        console.log(size)

        const length = size.z;
        const tOffset = length / this.splinelength;
        const lastOffset = this.offset.length > 0 ? this.offset[this.offset.length - 1] : 0;
        this.offset.push(lastOffset + tOffset);

    }

    updateCarts() {
        this.carts.forEach((cart, index) => {
            const offsetT = (this.t + this.offset[index]) % 1;
            const position = this.curve.getPointAt(offsetT);
            cart.mesh.position.copy(position);

            const tangent = this.curve.getTangentAt(offsetT);
            tangent.y = 0;
            tangent.normalize();

            const angle = Math.atan2(tangent.x, tangent.z);
            cart.mesh.rotation.set(0, angle, 0);
        });
    }


    // start() {
    //     this.targetSpeed = this.speed; // Set target speed to the original speed when starting
    //     this.isMoving = true;
    // }
    //
    // stop() {
    //     this.targetSpeed = 0; // Set target speed to 0 when stopping
    //     this.isMoving = false;
    // }

    animate() {
        if (this.isMoving) {
            // Gradually transition the current speed to the target speed (easing)
            this.currentSpeed += (this.targetSpeed - this.currentSpeed) * this.easingFactor;
        } else {
            // When stopping, smoothly reduce the speed to zero
            this.currentSpeed += (this.targetSpeed - this.currentSpeed) * this.easingFactor;
        }

        // Update the position based on the current speed
        if (this.curve.closed) {
            this.t = (this.t + this.currentSpeed / 1000) % 1;
        } else {
            if (this.t > 1 - ((this.carts.length - 1) * (this.offset / 100))) {
                this.t = 0;
            } else {
                this.t += this.currentSpeed / 1000;
            }
        }

        // Update the position and rotation of each cart in the train
        this.updateCarts();

        // Call animate function again for the next frame
        requestAnimationFrame(this.animate);
    }
}

export class CircularSplineObject {
    constructor(scene, radius, resolution) {
        this.radius = radius;
        this.resolution = resolution;
        this.scene = scene;

        this.createCircularSpline()
        scene.add(this.spline.splineObject)

    }

    createCircularSpline(){
        const angleStep = Math.PI / 4; // 45 degrees
        const points = [];

        for (let i = 0; i < 8; i++) {
            const angle = i * angleStep;
            const x = Math.cos(angle) * this.radius;
            const z = Math.sin(angle) * this.radius;
            points.push(new THREE.Vector3(x, 0, z));
        }

        this.spline = new ThreeBasicSplineObject(points, this.resolution, true);
    }

    enablePointMarkers(enabled, mesh){
        if (enabled) {
            this.markers = createMarkersOnSplinePoints(this.spline, mesh)
            this.scene.add(this.markers)
        } else {
            this.scene.remove(this.markers)
        }
    }
}





export class TrainTrack {
    constructor(curve, options = {}) {
        this.curve = curve;
        this.railSpacing = options.railSpacing || 0.2; // Half distance between rails
        this.numSegments = options.numSegments || 200;
        this.tieSpacing = options.tieSpacing || 0.5;
        this.tieSize = options.tieSize || { width: 0.25, height: 0.05, depth: 0.05 };
        this.railRadius = options.railRadius || 0.02;

        this.trackGroup = new THREE.Group();
    }
}

export class PlaceableSplineObject{
    constructor(options = {}) {
        //start building mode
        //Create spline with one point on mouse position do not update position of spline point 0
        //create spline point 1
        //Update spline point 1 position on mouse position
        //On left click, create another spline point and stop updating current spline point

        //on right click delete current point,
        //on right click again, delete previous point

        //click on spline point, select point
        //enable transform handle
        //move point
        //click somewhere else than point to deselect

        this.points = [];
        this.splineObject = new THREE.CatmullRomCurve3(this.points, closed);
    }
}

