namespace PcSetTableGenerator
{
    using System.Collections.Generic;

    public class PcSet
    {
        public HashSet<int> RahnPrimeForm { get; set; }
        public string ForteName { get; set; }
        public int[] IntervalVector { get; set; }

        public override string ToString()
        {
            return SerializationHelper.SerializeHex(this.RahnPrimeForm);
        }
    }
}
