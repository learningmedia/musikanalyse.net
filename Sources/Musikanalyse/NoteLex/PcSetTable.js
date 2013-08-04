var NoteLex;
(function (NoteLex) {
    (function (PcSetTable) {
        function getPcSet(noteSet) {
            var length = noteSet.intervals.length;
            var intervallArr = [];
            intervallArr[0] = noteSet.intervals;

            for (var i = 1; i < length; i++) {
                intervallArr[i] = GetNextNormalOrder(noteSet.intervals);
            }

            var minInterval = GetMinInterval(intervallArr);
            var selection = GetMinRange(intervallArr, minInterval);
            return GetPrimeForm(selection);
        }
        PcSetTable.getPcSet = getPcSet;

        function GetNextNormalOrder(intervals) {
            var first = intervals[0];
            var originalLength = intervals.length;
            intervals = intervals.slice(1);
            for (var i = 0; i < intervals.length; i++) {
                var n = intervals[0];
                intervals[0] = n - first;
            }
            intervals[originalLength] = first;
            intervals = _.map(intervals, function (x) {
                return NoteLex.CalculationHelper.mod(x, 12);
            });
            return intervals;
        }

        function GetMinInterval(intervalArrCol) {
            var minInterval = 12;
            for (var i = 0; i < intervalArrCol.length; i++) {
                var interval = intervalArrCol[i][intervalArrCol[i].length - 1];
                if (minInterval > interval) {
                    minInterval = interval;
                }
            }
            return minInterval;
        }

        function GetMinRange(selection, minRange) {
            var minRangeIntervals = [];
            var counter = 0;

            for (var i = 0; i < selection.length; i++) {
                if (selection[i][selection[i].length - 1] === minRange) {
                    minRangeIntervals[counter] = selection[i];
                    counter += 1;
                }
            }
            return minRangeIntervals;
        }

        function GetPrimeForm(selection) {
            var helperArr = [];
            for (var i = 0; i < selection.length; i++) {
                helperArr[i] = _.map(selection[i], function (x) {
                    return x < 10 ? "0" + x : "" + x;
                }).toString();
            }
            var s = helperArr.sort()[0];
            return _.map(s.split(','), function (x) {
                return parseInt(x);
            });
        }
    })(NoteLex.PcSetTable || (NoteLex.PcSetTable = {}));
    var PcSetTable = NoteLex.PcSetTable;
})(NoteLex || (NoteLex = {}));
//@ sourceMappingURL=PcSetTable.js.map
