namespace PcSetTableGenerator
{
    using System.Collections.Generic;
    using System.Linq;

    public static class PcSetHelper
    {
        public static IEnumerable<PcSet> GetAllNormalOrders(PcSet set)
        {
            // TODO: Implement:
            return Enumerable.Empty<PcSet>();
        }

        public static PcSet FindFortePrimeForm(IEnumerable<PcSet> allNormalOrders)
        {
            return allNormalOrders.OrderBy(x => x, new LeftCompactComparer()).First();
        }

        public static PcSet FindRahnPrimeForm(IEnumerable<PcSet> allNormalOrders)
        {
            return allNormalOrders.OrderBy(x => x, new RightCompactComparer()).First();
        }

        public static int[] GetIntervalVector(PcSet primeForm)
        {
            // TODO: Implement:
            return new int[0];
        }
    }
}