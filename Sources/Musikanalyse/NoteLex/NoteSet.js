/// <reference path="Scripts/typings/underscore/underscore-typed.d.ts" />
/// <reference path="Interfaces/INoteScript.d.ts" />
var NoteLex;
(function (NoteLex) {
    var NoteSet = (function () {
        function NoteSet(values) {
            if (!values) {
                this.base = NaN;
                this.intervals = [];
            } else if (values.length === 0) {
                this.base = NaN;
                this.intervals = values;
            } else {
                this.intervals = normalize(values);
            }
        }
        return NoteSet;
    })();
    NoteLex.NoteSet = NoteSet;

    function normalize(values) {
        var _this = this;
        values = _.sortBy(values, function (x) {
            return x;
        });
        values = _.map(values, function (x) {
            return x % 12;
        });
        values = _.unique(values);
        this.base = values[0];
        values = _.map(values, function (x) {
            return x - _this.base;
        });
        return values;
    }
})(NoteLex || (NoteLex = {}));
//@ sourceMappingURL=NoteSet.js.map
