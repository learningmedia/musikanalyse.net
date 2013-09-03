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
            int count = primeForm.Count;
            if (count < 2)
            {
                return new[] { 0, 0, 0, 0, 0, 0 };
            }

            List<int> values = new List<int>();
            for (int x = 0; x < count - 1; x++)
            {
                int[] actualArr = primeForm.Skip(x).ToArray();
                for (int y = 1; y <= actualArr.Length - 1; y++)
                {
                    int value = actualArr[y] - actualArr[y - y];
                    if (value < 6)
                    {
                        values.Add(value);
                    }
                    else
                    {
                        values.Add(12 - value);
                    }
                }
            }

            int smallSecond = values.FindAll(x => x == 1).Count; 
            int greatSecund = values.FindAll(x => x == 2).Count; 
            int smallThird = values.FindAll(x => x == 3).Count; 
            int greatThird = values.FindAll(x => x == 4).Count; 
            int quart = values.FindAll(x => x == 5).Count; 
            int tritone = values.FindAll(x => x == 6).Count; 

            return new[] { smallSecond, greatSecund, smallThird, greatThird, quart, tritone };
        }
    }
}