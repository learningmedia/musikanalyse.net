/// <reference path="../Scripts/typings/qunit/qunit.d.ts" />
/// <reference path="../NoteSet.ts" />
/// <reference path="../PcSetTable.ts" />
QUnit.module("PcSetTests");

test("getPcSet should calculate 0,3,7 for a d major chord.", function () {
    var noteSet = new NoteLex.NoteSet([2, 6, 9]);
    var pcSet = NoteLex.PcSetTable.getPcSet(noteSet);
    strictEqual("037", pcSet.fortePrimeForm);
});
