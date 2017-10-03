import {Vector} from "./vector"


export class Vehicle {
    public position: Vector;
    public direction: Vector;

    constructor(position: Vector = new Vector(0, 0), direction: Vector = new Vector(1, 0)) {
        this.position = position;
        this.direction = direction;
    }

    public getRelative(p: Vector) : Vector {
        let dx = p.x - this.position.x;
        let dy = p.y - this.position.y;

        let x =  dx * this.direction.x + dy * this.direction.y;
        let y = -dx * this.direction.y + dy * this.direction.x;

        return new Vector(x, y);
    }

    public pull(d: Vector): void {
        this.position = this.position.add(d);
    }
}

export class Car extends Vehicle {
    public velocity: number;
    public axis: number;

    constructor(position: Vector = new Vector(0, 0), direction: Vector = new Vector(1, 0)) {
        super(position, direction);
    }

    public pull(d: Vector): void {
        this.position = this.position.add(d);
        let axis = this.direction.mul(-this.axis);
        this.direction = axis.add(d).normalize();
    }
}

