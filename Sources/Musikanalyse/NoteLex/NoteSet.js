/// <reference path="Scripts/typings/underscore/underscore-typed.d.ts" />
/// <reference path="Interfaces/INoteScript.d.ts" />
var NoteLex;
(function (NoteLex) {
    var NoteSet = (function () {
        function NoteSet(values) {
            if (!values) {
                this.intervals = [];
                this.base = NaN;
            } else {
                this.intervals = normalize(values);
                this.base = this.intervals.length === 0 ? NaN : this.intervals[0];
            }
        }
        return NoteSet;
    })();
    NoteLex.NoteSet = NoteSet;

    function normalize(values) {
        values = _.sortBy(values, function (x) {
            return x;
        });
        values = _.map(values, function (x) {
            return x % 12;
        });
        values = _.unique(values);
        return values;
    }
})(NoteLex || (NoteLex = {}));
//@ sourceMappingURL=NoteSet.js.map
