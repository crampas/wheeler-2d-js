import {Vehicle, Point} from "./vehicle"
import assert = require('assert');

function assertRange(actual: number, expected: number, interval: number) {
    assert(Math.abs(expected - actual) < interval, `actual ${actual} expected ${expected}`);
}

function assertPoint(actual: Point, expected: Point, interval: number) {
    assertRange(actual.x, expected.x, interval);
    assertRange(actual.y, expected.y, interval);
}



describe('Vehicle', function() {
    describe('#getRelative() with identity', function() {
        let v = new  Vehicle(new Point(0, 0), 0);
        it('for (1,0) should return (1,0)', function() {
            assertPoint(v.getRelative(new Point(1, 0)), new Point(1, 0), 0.001);
        });
        it('for (0,1) should return (0,1)', function() {
            assertPoint(v.getRelative(new Point(0, 1)), new Point(0, 1), 0.001);
        });
        it('for (1,1) should return (1,1)', function() {
            assertPoint(v.getRelative(new Point(1, 1)), new Point(1, 1), 0.001);
        });
    });

    describe('#getRelative() with identity and shift (4,5)', function() {
        let v = new  Vehicle(new Point(4, 5), 0);
        it('for (1,0) should return (-3,-5)', function() {
            assertPoint(v.getRelative(new Point(1, 0)), new Point(-3, -5), 0.001);
        });
        it('for (0,1) should return (-4,-4)', function() {
            assertPoint(v.getRelative(new Point(0, 1)), new Point(-4, -4), 0.001);
        });
        it('for (1,1) should return (-3,-4)', function() {
            assertPoint(v.getRelative(new Point(1, 1)), new Point(-3, -4), 0.001);
        });
    });

    describe('#getRelative() with 45 degree', function() {
        let v = new  Vehicle(new Point(0, 0), Math.PI / 4.0);
        it('for (1,0) should return (0.707,-0.707)', function() {
            assertPoint(v.getRelative(new Point(1, 0)), new Point(0.707, -0.707), 0.001);
        });
        it('for (0,1) should return (0.707,0.707)', function() {
            assertPoint(v.getRelative(new Point(0, 1)), new Point(0.707, 0.707), 0.001);
        });
        it('for (1,1) should return (1.414,0)', function() {
            assertPoint(v.getRelative(new Point(1, 1)), new Point(1.414, 0), 0.001);
        });
    });

    describe('#getRelative() with 90 degree', function() {
        let v = new  Vehicle(new Point(0, 0), Math.PI / 2.0);
        it('for (1,0) should return (0,-1)', function() {
            assertPoint(v.getRelative(new Point(1, 0)), new Point(0, -1), 0.001);
        });
        it('for (0,1) should return (1,0)', function() {
            assertPoint(v.getRelative(new Point(0, 1)), new Point(1, 0), 0.001);
        });
        it('for (1,1) should return (1,-1)', function() {
            assertPoint(v.getRelative(new Point(1, 1)), new Point(1, -1), 0.001);
        });
    });

    describe('#getRelative() with 90 degree and shift (4,5)', function() {
        let v = new  Vehicle(new Point(4, 5), Math.PI / 2.0);
        it('for (1,0) should return (-5,3)', function() {
            assertPoint(v.getRelative(new Point(1, 0)), new Point(-5, 3), 0.001);
        });
        it('for (0,1) should return (-4,4)', function() {
            assertPoint(v.getRelative(new Point(0, 1)), new Point(-4, 4), 0.001);
        });
        it('for (1,1) should return (-4,3)', function() {
            assertPoint(v.getRelative(new Point(1, 1)), new Point(-4, 3), 0.001);
        });
    });

    describe('#getRelative() with 180 degree', function() {
        let v = new  Vehicle(new Point(0, 0), Math.PI);
        it('for (1,0) should return (-1,0)', function() {
            assertPoint(v.getRelative(new Point(1, 0)), new Point(-1, 0), 0.001);
        });
        it('for (0,1) should return (0,-1)', function() {
            assertPoint(v.getRelative(new Point(0, 1)), new Point(0, -1), 0.001);
        });
        it('for (1,1) should return (-1,-1)', function() {
            assertPoint(v.getRelative(new Point(1, 1)), new Point(-1, -1), 0.001);
        });
    });


});

