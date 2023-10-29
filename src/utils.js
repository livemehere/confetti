export function degToRad(deg) {
    return deg * Math.PI / 180;
}

export function radToDeg(rad) {
    return rad * 180 / Math.PI;
}

export function rand(min,max) {
    return Math.random() * (max - min) + min;
}
