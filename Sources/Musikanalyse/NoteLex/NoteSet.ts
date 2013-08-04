/// <reference path="CalculationHelper.ts" />
/// <reference path="Scripts/typings/underscore/underscore-typed.d.ts" />
/// <reference path="Interfaces/INoteSet.d.ts" />

module NoteLex {
    export class NoteSet implements INoteSet {

        base: number;
        intervals: number[];

        constructor(values?: number[]) {
            
            if (!values) {
                this.base = NaN;
                this.intervals = [];
            }
            else if (values.length === 0)
            {
                this.base = NaN;
                this.intervals = values;                
            }
            else {
                values = _.sortBy(values, x => x);
                values = _.map(values, x => NoteLex.CalculationHelper.mod(x, 12));
                values = _.unique(values);
                this.base = values[0];
                this.intervals =_.map(values, x => x - this.base);  
            }        
        }
    }
}