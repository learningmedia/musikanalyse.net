/// <reference path="CalculationHelper.ts" />
/// <reference path="Scripts/typings/underscore/underscore-typed.d.ts" />
/// <reference path="Interfaces/INoteSet.d.ts" />
var NoteLex;
(function (NoteLex) {
    var NoteSet = (function () {
        function NoteSet(values) {
            var _this = this;
            if (!values) {
                this.base = NaN;
                this.intervals = [];
            } else if (values.length === 0) {
                this.base = NaN;
                this.intervals = values;
            } else {
                values = _.sortBy(values, function (x) {
                    return x;
                });
                values = _.map(values, function (x) {
                    return NoteLex.CalculationHelper.mod(x, 12);
                });
                values = _.unique(values);
                this.base = values[0];
                this.intervals = _.sortBy(_.map(values, function (x) {
                    return NoteLex.CalculationHelper.mod(x - _this.base, 12);
                }), function (x) {
                    return x;
                });
            }
        }
        return NoteSet;
    })();
    NoteLex.NoteSet = NoteSet;
})(NoteLex || (NoteLex = {}));
