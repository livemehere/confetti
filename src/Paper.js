import {degToRad, rand} from "./utils.js";
import Vector from "./Vector.js";

export default class Paper {
    constructor({x,y,w,h,vx,vy,color}) {
        this.vector = new Vector(x,y);
        this.velocity = new Vector(vx,vy);

        this.w = w;
        this.h = h;
        this.color = color;

        this.gravity = rand(0.3, 0.7)
        this.friction = rand(0.9, 0.99)
        this.sizeRange = rand(3, 6);

        this.rotateDeg = rand(0, 360)
        this.rotateSpeed = rand(0.05,0.2)
        this.xSpeed = rand(0.05,0.2)
        this.ySpeed = rand(0.05,0.2)

        this.xDeg = 0;
        this.yDeg = 0;
    }

    update() {
        this.rotateDeg += this.rotateSpeed;
        this.xDeg += this.xSpeed
        this.yDeg += this.ySpeed;

        this.velocity.y += this.gravity;
        this.velocity.mult(this.friction);
        this.vector.add(this.velocity);
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.vector.x + this.w * 4, this.vector.y + this.h * 4);
        ctx.rotate(this.rotateDeg);
        ctx.fillRect(0, 0, this.w + Math.cos(this.xDeg) * this.sizeRange, this.h + Math.sin(this.yDeg) * this.sizeRange);
        ctx.restore();
    }
}
