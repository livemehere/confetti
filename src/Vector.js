export default class Vector {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    static mult(v, n) {
        return new Vector(v.x * n, v.y * n);
    }

    static div(v, n) {
        return new Vector(v.x / n, v.y / n);
    }

    static distance(v1, v2) {
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    static angle(v1, v2) {
        return Math.atan2(v2.y - v1.y, v2.x - v1.x);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mult(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    div(n) {
        this.x /= n;
        this.y /= n;
        return this;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

}
