import { canPlaceShip } from "./functions.mjs";
var field;

QUnit.module("check canPlaceShip function", {
    beforeEach: ()=>{
            field = [];
            for (let i = 0; i < 10; i++){
                let line = [];
                for (let j = 0; j < 10; j++){
                    line.push(0);
                }
                field.push(line);
            }
        }
});

QUnit.test("should be able to place ship, if everything is ok. test1", function(assert){
    assert.true(canPlaceShip(field, 3, 4, true, 2));
});

QUnit.test("should be able to place ship, if everything is ok. test2", function(assert){
    assert.true(canPlaceShip(field, 5, 2, false, 3));
});

QUnit.test("should not be able to place horizontal ship that intersects field border", function(assert){
    assert.false(canPlaceShip(field, 9, 9, true, 3));
});

QUnit.test("should not be able to place vertical ship that intersects field border", function(assert){
    assert.false(canPlaceShip(field, 1, 8, false, 3));
});

QUnit.test("should not be able do place ship that intersects other ship. test1", function(assert){
    field[0][0] = 1;
    field[0][1] = 1;
    assert.false(canPlaceShip(field, 0, 0, false, 2));
});
QUnit.test("should not be able do place ship that intersects other ship. test2", function(assert){
    field[3][9] = 1;
    field[4][9] = 1;
    assert.false(canPlaceShip(field, 2, 9, true, 3));
});
QUnit.test("should not be able do place ship that is too close other ship. test1", function(assert){
    field[9][9] = 1;
    field[9][8] = 1;
    assert.false(canPlaceShip(field, 9, 6, false, 2));
});
QUnit.test("should not be able do place ship that is too close other ship. test2", function(assert){
    field[3][0] = 1;
    field[3][1] = 1;
    assert.false(canPlaceShip(field, 4, 2, false, 2));
});
QUnit.test("x and y should be from 0 to 9", function(assert){
    assert.false(canPlaceShip(field, -1, 8, false, 1));
});