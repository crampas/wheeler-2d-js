


export class Vector {
    public x: number;
    public y: number;

    public constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public add(rhs: Vector): Vector {
        return new Vector(this.x + rhs.x, this.y + rhs.y);
    }

    public mul(rhs: number): Vector {
        return new Vector(this.x * rhs, this.y * rhs);
    }

    public normalize(): Vector {
        let length = Math.sqrt(this.x * this.x + this.y * this.y);
        return this.mul(1.0 / length);
    }
}

export class Angle {
    public static fromRad(angle: number): Vector {
        return new Vector(Math.cos(angle), Math.sin(angle));
    }

    public static fromDegre(angle: number) {
        return this.fromRad(angle / 180 * Math.PI);
    }

    public static getRad(direction: Vector): number {
        return Math.asin(direction.y);
    }
}


export class Vehicle {
    public position: Vector;
    public direction: Vector;

    constructor(position: Vector = new Vector(0, 0), rotation: number = 0) {
        this.position = position;
        this.direction = Angle.fromRad(rotation);
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

    constructor(position: Vector = new Vector(0, 0), rotation: number = 0) {
        super(position, rotation);
    }

    public pull(d: Vector): void {
        this.position = this.position.add(d);
        let axis = this.direction.mul(-this.axis);
        this.direction = axis.add(d).normalize();
    }
}

