// Provides an Encapsulation for pitch class sets.
declare module NoteLex {
    export interface IPcSet {
        rahnPrimeForm: number[];
        fortePrimeForm: number[];
        intervalVector: number[];
        forteName: string;
        cardinality: number;
        zMate: IPcSet;
        superSets: IPcSet[];
        subSets: IPcSet[];
    }
}