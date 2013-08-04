/// <reference path="CalculationHelper.ts" />
/// <reference path="Scripts/typings/underscore/underscore-typed.d.ts" />
/// <reference path="Interfaces/INoteSet.d.ts" />
/// <reference path="Interfaces/IPcSet.d.ts" />

module NoteLex.PcSetTable {

    export function getPcSet(noteSet: INoteSet):number[] {
        var length = noteSet.intervals.length;
        var intervallArr: number[][] = [];
        intervallArr[0] = noteSet.intervals;

        for (var i = 1; i < length; i++) {
            intervallArr[i] = GetNextNormalOrder(noteSet.intervals);
        }

        var minInterval: number = GetMinInterval(intervallArr);
        var selection: number[][] = GetMinRange(intervallArr, minInterval);
        return GetPrimeForm(selection);        
    }

    function GetNextNormalOrder(intervals: number[]): number[] {
        var first: number = intervals[0];
        var originalLength: number = intervals.length;
        intervals = intervals.slice(1);
        for (var i = 0; i < intervals.length; i++) {
            var n = intervals[0];
            intervals[0] = n - first;
        }
        intervals[originalLength] = first;
        intervals = _.map(intervals, x => NoteLex.CalculationHelper.mod(x, 12));
        return intervals;
    }

    function GetMinInterval(intervalArrCol: number[][]): number{
        var minInterval: number = 12;
        for (var i = 0; i < intervalArrCol.length; i++) {
            var interval = intervalArrCol[i][intervalArrCol[i].length - 1];
            if (minInterval > interval) {
                minInterval = interval;
            }
        }
        return minInterval;
    }

    function GetMinRange(selection: number[][], minRange: number): number[][]{
        var minRangeIntervals: number[][] = [];
        var counter: number = 0;

        for (var i = 0; i < selection.length; i++) {
            if (selection[i][selection[i].length - 1] === minRange) {
                minRangeIntervals[counter] = selection[i];
                counter += 1;
            }
        }
        return minRangeIntervals;
    }

    function GetPrimeForm(selection: number[][]): number[]{
        var helperArr: string[] = [];
        for (var i = 0; i < selection.length; i++) {
            helperArr[i] = _.map(selection[i], x => x < 10 ? "0" + x : "" + x).toString();
        }
        var s = helperArr.sort()[0];
        return _.map(s.split(','), x => parseInt(x));
    }
}