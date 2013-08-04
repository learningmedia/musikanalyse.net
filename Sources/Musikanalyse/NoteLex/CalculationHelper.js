var NoteLex;
(function (NoteLex) {
    (function (CalculationHelper) {
        function mod(x1, x2) {
            return ((x1 % x2) + x2) % x2;
        }
        CalculationHelper.mod = mod;
    })(NoteLex.CalculationHelper || (NoteLex.CalculationHelper = {}));
    var CalculationHelper = NoteLex.CalculationHelper;
})(NoteLex || (NoteLex = {}));
//@ sourceMappingURL=CalculationHelper.js.map
