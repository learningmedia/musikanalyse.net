namespace PcSetTableGenerator
{
    public class DestinationStructure
    {
        public string Id { get; set; }
        public int[] RahnPrimeForm { get; set; }
        public int[] FortePrimeForm { get; set; }
        public int[] IntervalVector { get; set; }
        public string ForteName { get; set; }
        public int Cardinality { get; set; }
        public string ZMate { get; set; }
        public string[] SuperSets { get; set; }
        public string[] SubSets { get; set; }
    }
}