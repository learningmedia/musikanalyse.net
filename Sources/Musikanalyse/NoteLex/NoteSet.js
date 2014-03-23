define(["lodash", "calculationHelper"], function(_, calculationHelper) {

    function NoteSet(values) {
        var that = this;
        if (!values) {
            this.base = NaN;
            this.intervals = [];
        } else if (values.length === 0) {
            this.base = NaN;
            this.intervals = values;
        } else {
            values = _.sortBy(values, function(x) {
                return x;
            });
            values = _.map(values, function(x) {
                return calculationHelper.mod(x, 12);
            });
            values = _.unique(values);
            this.base = values[0];
            this.intervals = _.sortBy(_.map(values, function(x) {
                return calculationHelper.mod(x - that.base, 12);
            }), function(x) {
                return x;
            });
        }
    }

    return NoteSet;

});
