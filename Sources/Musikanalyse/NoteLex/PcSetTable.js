var NoteLex;
(function (NoteLex) {
    /// <reference path="Interfaces/INoteSet.d.ts" />
    /// <reference path="Interfaces/IPcSet.d.ts" />
    (function (PcSetTable) {
        function getPcSet(noteSet) {
            throw new Error("Not implemented.");
        }
        PcSetTable.getPcSet = getPcSet;
    })(NoteLex.PcSetTable || (NoteLex.PcSetTable = {}));
    var PcSetTable = NoteLex.PcSetTable;
})(NoteLex || (NoteLex = {}));
//@ sourceMappingURL=PcSetTable.js.map
