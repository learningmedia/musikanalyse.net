namespace PcSetTableGenerator
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public static class Program
    {
        public static void Main()
        {
            IEnumerable<int> allSetLengths = Enumerable.Range(0, 13);
            foreach (int length in allSetLengths)
            {
                IEnumerable<PcSet> allPossibleSets = CombinationHelper.GetAllPossibleCombinations(0, 11, length).Where(x => !x.Any() || x.Contains(0));
                foreach (PcSet possibleSet in allPossibleSets)
                {
                    List<PcSet> allNormalOrders = PcSetHelper.GetAllNormalOrders(possibleSet).ToList();
                    PcSet fortePrimeForm = PcSetHelper.FindFortePrimeForm(allNormalOrders);
                    PcSet rahnPrimeForm = PcSetHelper.FindRahnPrimeForm(allNormalOrders);
                    int[] intervalVector = PcSetHelper.GetIntervalVector(fortePrimeForm);

                    Console.WriteLine(
                        "Set with length: {0}:{4}Forte: {1}{4}Rahn: {2}{4}IV: {3}{4}",
                        length,
                        fortePrimeForm,
                        rahnPrimeForm,
                        intervalVector,
                        Environment.NewLine);
                }
            }

            Console.ReadKey(true);
        }
    }
}
