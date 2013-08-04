QUnit.module("PcSetTests");

test("getPcSet should calculate 0,3,7 for a d major chord.", function () {
    var noteSet = new NoteLex.NoteSet([2, 6, 9]);
    var pcSet = NoteLex.PcSetTable.getPcSet(noteSet);
    strictEqual(pcSet[0], 0);
    strictEqual(pcSet[1], 3);
    strictEqual(pcSet[2], 7);
});
//@ sourceMappingURL=PcSetTests.js.map
