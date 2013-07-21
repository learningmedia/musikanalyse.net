/// <reference path="Scripts/typings/underscore/underscore-typed.d.ts" />
/// <reference path="Interfaces/INoteScript.d.ts" />

module NoteLex {
    export class NoteSet implements INoteSet {

        base: number;
        intervals: number[];

        constructor(values?: number[]) {
            
            if (!values) {
                this.intervals = [];
                this.base = NaN;
            }
            else {
                this.intervals = normalize(values);
                this.base = this.intervals.length === 0 ? NaN : this.intervals[0];
            }        
        }
    }

    function normalize(values: number[]): number[]{
        values = _.sortBy(values, x => x);
        values = _.map(values, x => x % 12);
        values = _.unique(values);
        return values;
    }
}