// Provides an Encapsulation for pitch class sets.
declare module NoteLex {
    export interface IPcSet {
        rahnPrimeForm: string;
        fortePrimeForm: string;
        intervalVector: string;
        forteName: string;
        cardinality: number;
        zMate: string;
        superSets: string[];
        subSets: string[];
    }
}
