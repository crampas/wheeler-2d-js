


export class Point {
    public constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public x: number;
    public y: number;
}


export class Vehicle {
    public position: Point;
    public rotation: number;

    constructor(position: Point = new Point(0, 0), rotation: number = 0) {
        this.position = position;
        this.rotation = rotation;
    }

    public getRelative(p: Point) : Point {
        let sin = Math.sin(this.rotation);
        let cos = Math.cos(this.rotation);

        let dx = p.x - this.position.x;
        let dy = p.y - this.position.y;

        let x =  dx * cos + dy * sin;
        let y = -dx * sin + dy * cos;

        return new Point(x, y);
    }
}

export class Car extends Vehicle {
    public velocity: number;
    public helm: number;
    public axis: number;
}

export class Tender extends Vehicle {
    public axis: number;

    public pull(dx: number, dy: number) {

    }
}