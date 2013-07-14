/// <reference path="../Scripts/typings/qunit/qunit.d.ts" />
/// <reference path="../NoteSet.ts" />
QUnit.module("NoteSetTests");

test("Constructor should throw if base is less than 0.", function () {
    throws(function () {
        return new NoteLex.NoteSet(-1, [0, 1, 2]);
    });
});

test("Constructor should throw if any interval value is less than 0.", function () {
    throws(function () {
        return new NoteLex.NoteSet(3, [0, -1, 2]);
    });
});

test("Constructor should throw if interval values do not contain 0.", function () {
    throws(function () {
        return new NoteLex.NoteSet(3, [1, 2, 3]);
    });
});

test("Constructor should not throw if intervals is an empty array.", function () {
    var noteSet = new NoteLex.NoteSet(0, []);
    deepEqual(noteSet.intervals, []);
});

test("Constructor should order interval values that are not in ascending order.", function () {
    var noteSet = new NoteLex.NoteSet(3, [3, 0, 1]);
    deepEqual(noteSet.intervals, [0, 1, 3]);
});

test("Constructor should discard reduntant interval values.", function () {
    var noteSet = new NoteLex.NoteSet(3, [0, 1, 3, 4, 3, 5]);
    deepEqual(noteSet.intervals, [0, 1, 3, 4, 5]);
});
//@ sourceMappingURL=NoteSetTests.js.map
