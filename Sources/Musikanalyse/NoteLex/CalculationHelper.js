define([], function () {

    function mod(x1, x2) {
        return ((x1 % x2) + x2) % x2;
    }

    return {
        mod: mod
    };

});
