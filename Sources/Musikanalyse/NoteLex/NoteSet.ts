/// <reference path="Scripts/typings/underscore/underscore-typed.d.ts" />
/// <reference path="Interfaces/INoteScript.d.ts" />

module NoteLex {
    export class NoteSet implements INoteSet {
        constructor(public base: number, public intervals: number[]) {
            if (base < 0 || base > 11) {
                throw new Error("Base value is out of range.");
            }

            if (_.some(intervals, x => x < 0 || x > 11)) {
                throw new Error("Some of the interval values are out of range.");
            }
        }
    }
}