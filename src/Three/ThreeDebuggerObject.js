import dat from "dat.gui";
import {enableGlobalAxesHelper, enableGridHelper} from "./ThreeUtilities/Helpers.js";
import {getMouseLocation2D} from "./ThreeUtilities/Raycasting.js";

export class ThreeDebuggerObject {
    constructor(threeObject) {
        this.gui = new dat.GUI();
        this.threeObject = threeObject;
        this.scene = this.threeObject.scene;
        this.renderer = this.threeObject.renderer;
        this.createFolderGeneral()
        this.createFolderCamera()

        this.mouseLoggerIntervalId = null;
        this.mouseLogger = null;
    }
    createFolderGeneral() {
        this.folderGeneral = this.gui.addFolder("General");
        let folderGrid = this.folderGeneral.addFolder("Grid");
        
        const GridSettings = {
            showGrid: false,
            divisions: 50,
            size: 100,
        }
        // Add checkbox to enable/disable grid
        folderGrid.add(GridSettings, 'showGrid').name('Enable Grid').onChange((value) => {
            this.setGlobalGrid(value, GridSettings.size, GridSettings.divisions); // Pass size and divisions as well
        });

        // Add slider to control divisions of the grid
        folderGrid.add(GridSettings, 'divisions', 1, 100, 1).name('Grid Divisions').onChange((value) => {
            this.setGlobalGrid(GridSettings.showGrid, GridSettings.size, value); // Only update the grid with the new divisions
        });

        // Add slider to control size of the grid
        folderGrid.add(GridSettings, 'size', 1, 200, 1).name('Grid Size').onChange((value) => {
            this.setGlobalGrid(GridSettings.showGrid, value, GridSettings.divisions); // Only update the grid with the new size

        });

        const showGlobalAxesButtonSettings = {
            showAxes: false,
        }
        this.folderGeneral.add(showGlobalAxesButtonSettings, 'showAxes').name('Show Global Axes').onChange((value) => {
            this.setGlobalAxes(value);
        });
        
        let folderMouse = this.folderGeneral.addFolder("Mouse");

        const state = {
            enableMouseLog: false,
            mousePosition: "x: 0, y: 0"
        };

        folderMouse.add(state, 'enableMouseLog').name('Track Mouse').onChange((enabled) => {
            this.logMousePosition(enabled, 300, state);
        });

        folderMouse.add(state, 'mousePosition').name('Mouse Pos').listen();
    }

    createFolderCamera(){
        this.folderCamera = this.gui.addFolder("Camera");
        let folderIdle = this.folderCamera.addFolder("Idle");

        const IdleSettings = {
            enable: true,
            speed: 0.5,
            threshold: 5,
            amplitude: 8,
        }
        folderIdle.add(IdleSettings, 'enable').name('Enable Idle').onChange((value) => {
            this.threeObject.controls.setIdleRotationEnabled(value)
        })
        folderIdle.add(IdleSettings, 'speed', 0.01, 1.0, 0.01).name('Speed').onChange((value) => {
            this.threeObject.controls.speed = value
        })
        folderIdle.add(IdleSettings, 'threshold', 1, 20, 0.1).name('Threshold').onChange((value) => {
            this.threeObject.controls.threshold = value
        })
        folderIdle.add(IdleSettings, 'amplitude', 0.1, 16, 0.1).name('Amplitude').onChange((value) => {
            this.threeObject.controls.amplitude = value
        })

        let folderMovement = this.folderCamera.addFolder("Movement");
        const MovementSettings = {
            enable: true,
            // yawLimitMin: 0,
            // yawLimitMax: 180,
            // pitchLimitMin: 0,
            pitchLimitMax: 85,
        };

        folderMovement.add(MovementSettings, 'enable').name('Enable Movement').onChange((value) => {
            this.threeObject.controls.enabled = value
        })

        // folderMovement.add(MovementSettings, 'yawLimitMin', -180,180,1).name('Min Yaw').onChange((value) => {
        //     this.threeObject.controls.minAzimuthAngle = value * Math.PI / 180
        // })
        // folderMovement.add(MovementSettings, 'yawLimitMax', -180,180,1).name('Max Yaw').onChange((value) => {
        //     this.threeObject.controls.maxAzimuthAngle = value * Math.PI / 180
        // })

        // folderMovement.add(MovementSettings, 'pitchLimitMin', -180,180,1).name('Min Pitch').onChange((value) => {
        //     this.threeObject.controls.minPolarAngle = value * Math.PI / 180
        // })
        folderMovement.add(MovementSettings, 'pitchLimitMax', 0,180,1).name('Max Pitch').onChange((value) => {
            this.threeObject.controls.maxPolarAngle = value * Math.PI / 180
        })

    }

    setGlobalGrid(enabled, size = 100, divisions = 100) {
        enableGridHelper(this.scene, enabled, size, divisions);
    }

    setGlobalAxes(enabled) {
        enableGlobalAxesHelper(this.scene, enabled)
    }

    logMousePosition(enabled, interval, state) {
        if (enabled && !this.mouseLoggerIntervalId) {
            // Start logging
            this.mouseLogger = getMouseLocation2D(this.renderer);
            this.mouseLoggerIntervalId = setInterval(() => {
                const pos = this.mouseLogger.getMousePosition();
                state.mousePosition = `x: ${pos.x.toFixed(0)}, y: ${pos.y.toFixed(0)}`;
            }, interval);
        } else if (!enabled && this.mouseLoggerIntervalId) {
            // Stop logging
            clearInterval(this.mouseLoggerIntervalId);
            this.mouseLoggerIntervalId = null;
            this.mouseLogger.stop();
            this.mouseLogger = null;
            state.mousePosition = "x: 0, y: 0";
        }
    }

}