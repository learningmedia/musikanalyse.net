var NoteLex;
(function (NoteLex) {
    (function (PcSetTable) {
        function getPcSet(noteSet) {
            debugger;

            var intervallArr = getAllNormalOrders(noteSet.intervals);

            var allLastValues = _.map(intervallArr, function (x) {
                return _.last(x);
            });
            var minInterval = _.min(allLastValues);

            var selection = _.filter(intervallArr, function (x) {
                return _.last(x) === minInterval;
            });

            var selectionInclInversions = selection.concat(_.map(selection, function (x) {
                return createInversion(x);
            }));

            return getBestNormalOrder(selectionInclInversions);
        }
        PcSetTable.getPcSet = getPcSet;

        function getAllNormalOrders(orderedSet) {
            var length = orderedSet.length;
            var result = [orderedSet];
            for (var i = 1; i < length; i++) {
                var first = _.first(orderedSet);
                var rest = _.rest(orderedSet);
                var newInitialValue = _.first(rest);
                var nextPermutation = _.map(rest, function (x) {
                    return x - newInitialValue;
                }).concat(first - newInitialValue + 12);
                result.push(nextPermutation);
                orderedSet = nextPermutation;
            }

            return result;
        }

        function createInversion(orderedSet) {
            var biggestValue = _.last(orderedSet);
            return _.map(orderedSet.reverse(), function (x) {
                return biggestValue - x;
            });
        }

        function getBestNormalOrder(selection) {
            var valuesToCompare = [];
            for (var i = 0; i < selection.length; i++) {
                valuesToCompare.push(_.map(selection[i], function (x) {
                    return x < 10 ? "0" + x : "" + x;
                }).toString());
            }

            debugger;
            var best = valuesToCompare.sort()[0];
            console.log(best);
            return _.map(best.split(","), function (x) {
                return parseInt(x);
            });
        }
    })(NoteLex.PcSetTable || (NoteLex.PcSetTable = {}));
    var PcSetTable = NoteLex.PcSetTable;
})(NoteLex || (NoteLex = {}));
//@ sourceMappingURL=PcSetTable.js.map
