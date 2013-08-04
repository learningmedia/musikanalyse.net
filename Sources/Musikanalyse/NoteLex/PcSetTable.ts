/// <reference path="CalculationHelper.ts" />
/// <reference path="Scripts/typings/underscore/underscore-typed.d.ts" />
/// <reference path="Interfaces/INoteSet.d.ts" />
/// <reference path="Interfaces/IPcSet.d.ts" />

module NoteLex.PcSetTable {

    export function getPcSet(noteSet: INoteSet): number[] {

        debugger;

        // get all permutations of the input array:
        var intervallArr: number[][] = getAllNormalOrders(noteSet.intervals);

        // from all last items in each permutation: the smallest number:
        var allLastValues = _.map(intervallArr, x => _.last(x));
        var minInterval: number = _.min(allLastValues);

        // all permutations where the last item equals 'minInterval' (= most compact form):
        var selection: number[][] = _.filter(intervallArr, x => _.last(x) === minInterval);

        // all most compact forms and their inversions:
        var selectionInclInversions = selection.concat(_.map(selection, x => createInversion(x)));

        // the best one (= smallest intervals at the left side == PRIME FORM):
        return getBestNormalOrder(selectionInclInversions);
    }

    function getAllNormalOrders(orderedSet: number[]): number[][] {
        var length = orderedSet.length;
        var result: number[][] = [orderedSet];
        for (var i = 1; i < length; i++) {
            var first = _.first(orderedSet);
            var rest = _.rest(orderedSet);
            var newInitialValue = _.first(rest);
            var nextPermutation = _.map(rest, x => x - newInitialValue).concat(first - newInitialValue + 12);
            result.push(nextPermutation);
            orderedSet = nextPermutation;
        }

        return result;
    }

    function createInversion(orderedSet: number[]): number[] {
        var biggestValue = _.last(orderedSet);
        return _.map(orderedSet.reverse(), x => biggestValue - x);
    }

    function getBestNormalOrder(selection: number[][]): number[] {
        var valuesToCompare: string[] = [];
        for (var i = 0; i < selection.length; i++) {
            valuesToCompare.push(_.map(selection[i], x => x < 10 ? "0" + x : "" + x).toString());
        }

        debugger;
        var best = valuesToCompare.sort()[0];
        console.log(best);
        return _.map(best.split(","), x => parseInt(x));
    }
}