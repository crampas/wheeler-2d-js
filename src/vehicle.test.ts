import {Vehicle, Vector, Car, Angle} from "./vehicle"
import assert = require('assert');
require("mocha");


function assertRange(actual: number, expected: number, interval: number) {
    assert(Math.abs(expected - actual) < interval, `actual ${actual} expected ${expected}`);
}

function assertPoint(actual: Vector, expected: Vector, interval: number) {
    assertRange(actual.x, expected.x, interval);
    assertRange(actual.y, expected.y, interval);
}



describe('Vehicle', function() {
    describe('#getRelative() with identity', function() {
        let v = new  Vehicle(new Vector(0, 0), 0);
        it('for (1,0) should return (1,0)', function() {
            assertPoint(v.getRelative(new Vector(1, 0)), new Vector(1, 0), 0.001);
        });
        it('for (0,1) should return (0,1)', function() {
            assertPoint(v.getRelative(new Vector(0, 1)), new Vector(0, 1), 0.001);
        });
        it('for (1,1) should return (1,1)', function() {
            assertPoint(v.getRelative(new Vector(1, 1)), new Vector(1, 1), 0.001);
        });
    });

    describe('#getRelative() with identity and shift (4,5)', function() {
        let v = new  Vehicle(new Vector(4, 5), 0);
        it('for (1,0) should return (-3,-5)', function() {
            assertPoint(v.getRelative(new Vector(1, 0)), new Vector(-3, -5), 0.001);
        });
        it('for (0,1) should return (-4,-4)', function() {
            assertPoint(v.getRelative(new Vector(0, 1)), new Vector(-4, -4), 0.001);
        });
        it('for (1,1) should return (-3,-4)', function() {
            assertPoint(v.getRelative(new Vector(1, 1)), new Vector(-3, -4), 0.001);
        });
    });

    describe('#getRelative() with 45 degree', function() {
        let v = new  Vehicle(new Vector(0, 0), Math.PI / 4.0);
        it('for (1,0) should return (0.707,-0.707)', function() {
            assertPoint(v.getRelative(new Vector(1, 0)), new Vector(0.707, -0.707), 0.001);
        });
        it('for (0,1) should return (0.707,0.707)', function() {
            assertPoint(v.getRelative(new Vector(0, 1)), new Vector(0.707, 0.707), 0.001);
        });
        it('for (1,1) should return (1.414,0)', function() {
            assertPoint(v.getRelative(new Vector(1, 1)), new Vector(1.414, 0), 0.001);
        });
    });

    describe('#getRelative() with 90 degree', function() {
        let v = new  Vehicle(new Vector(0, 0), Math.PI / 2.0);
        it('for (1,0) should return (0,-1)', function() {
            assertPoint(v.getRelative(new Vector(1, 0)), new Vector(0, -1), 0.001);
        });
        it('for (0,1) should return (1,0)', function() {
            assertPoint(v.getRelative(new Vector(0, 1)), new Vector(1, 0), 0.001);
        });
        it('for (1,1) should return (1,-1)', function() {
            assertPoint(v.getRelative(new Vector(1, 1)), new Vector(1, -1), 0.001);
        });
    });

    describe('#getRelative() with 90 degree and shift (4,5)', function() {
        let v = new  Vehicle(new Vector(4, 5), Math.PI / 2.0);
        it('for (1,0) should return (-5,3)', function() {
            assertPoint(v.getRelative(new Vector(1, 0)), new Vector(-5, 3), 0.001);
        });
        it('for (0,1) should return (-4,4)', function() {
            assertPoint(v.getRelative(new Vector(0, 1)), new Vector(-4, 4), 0.001);
        });
        it('for (1,1) should return (-4,3)', function() {
            assertPoint(v.getRelative(new Vector(1, 1)), new Vector(-4, 3), 0.001);
        });
    });

    describe('#getRelative() with 180 degree', function() {
        let v = new  Vehicle(new Vector(0, 0), Math.PI);
        it('for (1,0) should return (-1,0)', function() {
            assertPoint(v.getRelative(new Vector(1, 0)), new Vector(-1, 0), 0.001);
        });
        it('for (0,1) should return (0,-1)', function() {
            assertPoint(v.getRelative(new Vector(0, 1)), new Vector(0, -1), 0.001);
        });
        it('for (1,1) should return (-1,-1)', function() {
            assertPoint(v.getRelative(new Vector(1, 1)), new Vector(-1, -1), 0.001);
        });
    });


    describe('#pull()', function() {
        let v = new  Vehicle(new Vector(3, 7), 1);
        it('shoud move relative', function() {
            v.pull(new Vector(2, 3));
            assertPoint(v.position, new Vector(5, 10), 0.001);
            assert.equal(Angle.getRad(v.direction), 1);
        });
    });
});

describe('Vector', function() {
    describe('#add()', function() {
        it('should move relative', function() {
            let v1 = new Vector(14, -11);
            let v2 = v1.add(new Vector(-3, 5));
            assertPoint(v2, new Vector(11, -6), 0.001);
        });
    });
    describe('#mul()', function() {
        it('should stretch relative', function() {
            let v1 = new Vector(14, -11);
            let v2 = v1.mul(2);
            assertPoint(v2, new Vector(28, -22), 0.001);
        });
    });
});


describe('Car', function() {
    describe('#pull() in facing direction', function() {
        it('shold move forward', function() {
            let v = new  Car(new Vector(3, 7), Math.PI / 4);
            v.axis = -3;
            v.pull(new Vector(4, 4));
            assertPoint(v.position, new Vector(7, 11), 0.001);
            assertRange(Angle.getRad(v.direction), Math.PI / 4, 0.001);
        });
    });
});

describe('Angle', function() {
    describe('#fromRad()', function() {
        it('0 shold be (cos=1, sin=0)', function() {
            let direction: Vector = Angle.fromRad(0);
            assertRange(direction.x, 1, 0.001);
            assertRange(direction.y, 0, 0.001);
        });
        it('PI/2 shold be (cos=0, sin=1)', function() {
            let direction: Vector = Angle.fromRad(Math.PI / 2);
            assertRange(direction.x, 0, 0.001);
            assertRange(direction.y, 1, 0.001);
        });
    });
});
