/// <reference path="Scripts/typings/underscore/underscore-typed.d.ts" />
/// <reference path="Interfaces/INoteScript.d.ts" />
var NoteLex;
(function (NoteLex) {
    var NoteSet = (function () {
        function NoteSet(base, intervals) {
            this.base = base;
            this.intervals = intervals;
            if (base !== parseInt(base)) {
                throw new Error("Base value is not a integer.");
            }
            if (base < 0 || base > 11) {
                throw new Error("Base value is out of range.");
            }

            intervals = normalize(intervals);

            if (intervals.length !== 0 && intervals[0] !== 0) {
                throw new Error("Intervals have to contain the value 0.");
            }
            if (_.some(intervals, function (x) {
                return x !== parseInt(x);
            })) {
                throw new Error("Some of the intervals value is not an integer.");
            }
            if (_.some(intervals, function (x) {
                return x < 0 || x > 11;
            })) {
                throw new Error("Some of the interval values are out of range.");
            }

            this.intervals = intervals;
        }
        NoteSet.fromMidiValues = function (midiValues) {
            midiValues = normalize(midiValues);
            var base = midiValues.length == 0 ? 0 : midiValues[0];
            return new NoteSet(base, midiValues);
        };
        return NoteSet;
    })();
    NoteLex.NoteSet = NoteSet;

    function normalize(values) {
        values = _.sortBy(values, function (x) {
            return x;
        });
        values = _.map(values, function (x) {
            return x % 12;
        });
        values = _.unique(values);
        return values;
    }
})(NoteLex || (NoteLex = {}));
//@ sourceMappingURL=NoteSet.js.map
