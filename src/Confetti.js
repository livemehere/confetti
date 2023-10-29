import Paper from "./Paper.js";
import {degToRad, radToDeg, rand} from "./utils.js";
import Vector from "./Vector.js";

export default class Confetti {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.resize();
        window.addEventListener('resize', this.resize.bind(this), false);

        this.fps = 60;
        this.interval = 1000 / this.fps;
        this.prev = Date.now();

        this.mouse = {
            vector: undefined,
            isDown: false,
            downPos:undefined,
            releasePos:undefined,
            length:0
        }

        this.canvas.addEventListener('mousedown', this.onDown.bind(this), false);
        this.canvas.addEventListener('mousemove', this.onMove.bind(this), false);
        this.canvas.addEventListener('mouseup', this.onUp.bind(this), false);

        this.papers = [];
        this.animate();
    }

    onDown(e){
        this.mouse.releasePos = undefined;
        this.mouse.isDown = true;
        const rect = this.canvas.getBoundingClientRect();
        if(!this.mouse.downPos) this.mouse.downPos = new Vector(e.clientX - rect.left, e.clientY - rect.top);
        this.mouse.downPos.x = e.clientX - rect.left;
        this.mouse.downPos.y = e.clientY - rect.top;
    }

    onMove(e){
        const rect = this.canvas.getBoundingClientRect();
        if(!this.mouse.vector) this.mouse.vector = new Vector(e.clientX - rect.left, e.clientY - rect.top);
        this.mouse.vector.x = e.clientX - rect.left;
        this.mouse.vector.y = e.clientY - rect.top;

        if(this.mouse.isDown){
            this.mouse.length  = Vector.distance(this.mouse.downPos, this.mouse.vector);
        }
    }

    onUp(e){
        this.mouse.isDown = false;
        const rect = this.canvas.getBoundingClientRect();
        if(!this.mouse.releasePos) this.mouse.releasePos = new Vector(e.clientX - rect.left, e.clientY - rect.top);
        this.mouse.releasePos.x = e.clientX - rect.left;
        this.mouse.releasePos.y = e.clientY - rect.top;

        const deg = radToDeg(Vector.angle(this.mouse.releasePos, this.mouse.downPos))

        this.createPaper(this.mouse.downPos.x, this.mouse.downPos.y, 300,deg, this.mouse.length  * 0.3)

        this.mouse.downPos = undefined;
        this.mouse.vector = undefined;
        this.mouse.length = 0;
        this.mouse.releasePos = undefined;
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
        this.drawPapers();
        this.drawMouse();
    }

    drawBg(){
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    createPaper(x,y,n,deg,power = 20){
        for(let i=0; i<n;i++){
            const w = 2;
            const h = 2;
            const radian = degToRad(deg)
            const vx = Math.cos(radian) * rand(power*0.5, power);
            const vy = Math.sin(radian) * rand(power*0.5, power);

            const color = `hsl(${rand(0,360)}, 100%, 50%)`;
            const paper = new Paper({x,y,w,h,vx,vy,color});
            this.papers.push(paper);
        }
    }

    drawPapers(){
        if(!this.papers?.length) return;
        for(let i=0; i<this.papers.length;i++){
            const paper = this.papers[i];
            paper.update();
            paper.draw(this.ctx);
            if(paper.vector.y > this.height){
                this.papers.splice(i,1);
            }
        }
    }

    drawMouse(){
        if(this.mouse?.downPos){
            this.ctx.strokeStyle = 'rgba(255,255,255,0.24)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(this.mouse.downPos.x, this.mouse.downPos.y, this.mouse.length * 0.3, 0, Math.PI * 2);
            this.ctx.stroke();

            if(this.mouse.isDown){
                this.ctx.beginPath();
                this.ctx.moveTo(this.mouse.downPos.x, this.mouse.downPos.y);
                this.ctx.lineTo(this.mouse.vector.x, this.mouse.vector.y);
                this.ctx.stroke();
            }
        }

        if(this.mouse?.releasePos){
            this.ctx.beginPath();
            this.ctx.arc(this.mouse.releasePos.x, this.mouse.releasePos.y, 5, 0, Math.PI * 2);
            this.ctx.fill();
        }

        if(this.mouse?.downPos && this.mouse?.releasePos){
            this.ctx.beginPath();
            this.ctx.moveTo(this.mouse.downPos.x, this.mouse.downPos.y);
            this.ctx.lineTo(this.mouse.releasePos.x, this.mouse.releasePos.y);
            this.ctx.stroke();
        }
    }
}
