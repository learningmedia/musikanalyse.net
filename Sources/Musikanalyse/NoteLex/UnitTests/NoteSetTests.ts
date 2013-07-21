/// <reference path="../Scripts/typings/qunit/qunit.d.ts" />
/// <reference path="../NoteSet.ts" />

QUnit.module("NoteSetTests");

test("Constructor should create an empty set if no argument is supplied.", function () {
    var noteSet = new NoteLex.NoteSet();
    ok(isNaN(noteSet.base));
    strictEqual(noteSet.intervals.length, 0);
});

test("Constructor should create an empty set if an empty array is supplied as argument.", function () {
    var noteSet = new NoteLex.NoteSet([]);
    ok(isNaN(noteSet.base));
    strictEqual(noteSet.intervals.length, 0);
});

test("Constructor should keep smallest value as base value.", function () {
    var noteSet = new NoteLex.NoteSet([9, 5, 7, 17, 5]);
    strictEqual(noteSet.base, 5);
});

test("Constructor should transpose base value to a value between 0 and 11 for values greater than 11.", function () {
    var noteSet = new NoteLex.NoteSet([14, 16, 18]); // d-e-f#
    strictEqual(noteSet.base, 2);
});

test("Constructor should transpose base value to a value between 0 and 11 for values less than 0.", function () {
    var noteSet = new NoteLex.NoteSet([-3, 0, 4]); // a-c-e
    strictEqual(noteSet.base, 9);
});

test("Constructor should normalize and order all values.", function () {
    var noteSet = new NoteLex.NoteSet([9, 5, 7, 17, 5]);
    deepEqual(noteSet.intervals, [0, 2, 4]);
});
