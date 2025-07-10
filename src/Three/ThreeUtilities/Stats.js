export class FPSCounter {
    constructor(position = 'top-left', smoothing = 30) {
        this.smoothing = smoothing; // number of frames to average over
        this.frameTimes = [];
        this.lastTime = performance.now();
        this.isRunning = true;

        this.fpsElement = document.createElement('div');
        this.fpsElement.style.position = 'absolute';
        this.fpsElement.style.zIndex = '1000';
        this.fpsElement.style.color = 'white';
        this.fpsElement.style.fontFamily = 'monospace';
        this.fpsElement.style.fontSize = '16px';
        this.fpsElement.style.background = 'rgba(0, 0, 0, 0.5)';
        this.fpsElement.style.padding = '4px 8px';
        this.fpsElement.style.borderRadius = '6px';

        const positions = {
            'top-left': ['10px', 'auto', 'auto', '10px'],
            'top-right': ['10px', '10px', 'auto', 'auto'],
            'bottom-left': ['auto', 'auto', '10px', '10px'],
            'bottom-right': ['auto', '10px', '10px', 'auto'],
        };
        const [top, right, bottom, left] = positions[position] || positions['top-left'];
        Object.assign(this.fpsElement.style, { top, right, bottom, left });

        document.body.appendChild(this.fpsElement);

        this._loop = this._loop.bind(this);
        this._loop();
    }

    _loop() {
        if (!this.isRunning) return;

        const now = performance.now();
        const delta = (now - this.lastTime) / 1000;
        this.lastTime = now;

        this.frameTimes.push(delta);
        if (this.frameTimes.length > this.smoothing) {
            this.frameTimes.shift(); // remove oldest
        }

        const averageDelta = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
        const fps = Math.round(1 / averageDelta);

        this.fpsElement.textContent = `FPS: ${fps}`;

        requestAnimationFrame(this._loop);
    }

    remove() {
        this.isRunning = false;
        if (this.fpsElement && this.fpsElement.parentElement) {
            this.fpsElement.parentElement.removeChild(this.fpsElement);
        }
    }
}
