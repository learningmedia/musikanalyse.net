var NoteLex;
(function (NoteLex) {
    var NoteSet = (function () {
        function NoteSet(base, intervals) {
            this.base = base;
            this.intervals = intervals;
            var result = base / base;
            if (result != base) {
                throw new Error("Base value is not a integer.");
            }
            var isValidArr = _.all(intervals, function (x) {
                var test = x / x;
                return x == test;
            });
            if (!isValidArr) {
                throw new Error("Some of the intervals value is not a integer.");
            }
            if (base < 0 || base > 11) {
                throw new Error("Base value is out of range.");
            }
            if (_.some(intervals, function (x) {
                return x < 0 || x > 11;
            })) {
                throw new Error("Some of the interval values are out of range.");
            }
        }
        NoteSet.fromMidiValues = function (midiValues) {
            midiValues = _.sortBy(midiValues, function (x) {
                return x;
            });
            midiValues = _.map(midiValues, function (x) {
                return x % 12;
            });
            midiValues = _.unique(midiValues);
            var base = midiValues.length == 0 ? 0 : midiValues[0];
            return new NoteSet(base, midiValues);
        };
        return NoteSet;
    })();
    NoteLex.NoteSet = NoteSet;
})(NoteLex || (NoteLex = {}));
//@ sourceMappingURL=NoteSet.js.map
