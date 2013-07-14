/// <reference path="Scripts/typings/underscore/underscore-typed.d.ts" />
/// <reference path="Interfaces/INoteScript.d.ts" />

module NoteLex {
    export class NoteSet implements INoteSet {

        constructor(public base: number, public intervals: number[]) {

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
            if (_.some(intervals, x => x !== parseInt(x))) {
                throw new Error("Some of the intervals value is not an integer.");
            }
            if (_.some(intervals, x => x < 0 || x > 11)) {
                throw new Error("Some of the interval values are out of range.");
            }

            this.intervals = intervals;
        }

        static fromMidiValues(midiValues: number[]): INoteSet {
            midiValues = normalize(midiValues);
            var base = midiValues.length == 0 ? 0 : midiValues[0];
            return new NoteSet(base, midiValues);
        }
    }

    function normalize(values: number[]): number[]{
        values = _.sortBy(values, x => x);
        values = _.map(values, x => x % 12);
        values = _.unique(values);
        return values;
    }
}