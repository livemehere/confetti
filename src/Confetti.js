export default class Confetti {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', this.resize.bind(this), false);

        this.fps = 60;
        this.interval = 1000 / this.fps;
        this.prev = Date.now();
        this.animate();
    }

    resize(){
        this.dpr = window.devicePixelRatio;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.stageWidth = this.width * this.dpr;
        this.stageHeight = this.height * this.dpr;
        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;
        this.ctx.scale(this.dpr, this.dpr);
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.draw();
    }

    animate(){
        requestAnimationFrame(this.animate.bind(this));
        const now = Date.now();
        const delta = now - this.prev;
        if(delta < this.interval) return;
        this.prev = now - (delta % this.interval);
        this.draw();
    }

    draw(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawBg();
    }

    drawBg(){
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}
