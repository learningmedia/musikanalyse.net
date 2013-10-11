/// <reference path="../Scripts/typings/qunit/qunit.d.ts" />
/// <reference path="../NoteSet.ts" />
/// <reference path="../PcSetTable.ts" />
QUnit.module("PcSetTests");

test("getPcSet should calculate 0,3,7 for a d major chord.", function () {
    var noteSet = new NoteLex.NoteSet([2, 6, 9]);
    var pcSet = NoteLex.PcSetTable.getPcSet(noteSet);
    strictEqual("037", pcSet.fortePrimeForm);
});

test("getPcSet should calculate 0,2,6 for F,G,H.", function () {
    var noteSet = new NoteLex.NoteSet([5, 7, 11]);
    var pcSet = NoteLex.PcSetTable.getPcSet(noteSet);
    strictEqual("026", pcSet.fortePrimeForm);
});

test("getPcSet should calculate 0,1,2,3,4,5,6,7,8,9,A for C-C#-D-Eb-E-F-F#-G-Ab-A-Bb.", function () {
    var noteSet = new NoteLex.NoteSet([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    var pcSet = NoteLex.PcSetTable.getPcSet(noteSet);
    strictEqual("0123456789A", pcSet.fortePrimeForm);
});
