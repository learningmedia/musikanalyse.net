module NoteLex.CalculationHelper {

    // Modulo that transposes negative values into positive range:
    export function mod(x1: number, x2: number) {
        return ((x1 % x2) + x2) % x2;
    }

}