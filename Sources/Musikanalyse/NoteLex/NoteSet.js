var NoteLex;
(function (NoteLex) {
    var NoteSet = (function () {
        function NoteSet(base, intervals) {
            this.base = base;
            this.intervals = intervals;
            if (base < 0 || base > 11) {
                throw new Error("Base value is out of range.");
            }

            if (_.some(intervals, function (x) {
                return x < 0 || x > 11;
            })) {
                throw new Error("Some of the interval values are out of range.");
            }
        }
        return NoteSet;
    })();
    NoteLex.NoteSet = NoteSet;
})(NoteLex || (NoteLex = {}));
//@ sourceMappingURL=NoteSet.js.map
