/// <reference path="Scripts/typings/underscore/underscore-typed.d.ts" />
/// <reference path="Interfaces/INoteScript.d.ts" />

module NoteLex {
    export class NoteSet implements INoteSet {

        constructor(public base: number, public intervals: number[]) {
            var result = base / base;
            if (result != base) {
                throw new Error("Base value is not a integer.");
            }
            var isValidArr = _.all(intervals, x => {
                var test = x / x;
                return x == test;
            })
            if (!isValidArr) {
                throw new Error("Some of the intervals value is not a integer.");
            }
            if (base < 0 || base > 11) {
                throw new Error("Base value is out of range.");
            }
            if (_.some(intervals, x => x < 0 || x > 11)) {
                throw new Error("Some of the interval values are out of range.");
            }
        }

        static fromMidiValues(midiValues: number[]): INoteSet {
            midiValues = _.sortBy(midiValues, x => x); 
            midiValues = _.map(midiValues, x => x % 12);
            midiValues = _.unique(midiValues);
            var base = midiValues.length == 0 ? 0 : midiValues[0];
            return new NoteSet(base, midiValues);
        }
    }
}