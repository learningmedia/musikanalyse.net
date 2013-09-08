namespace PcSetTableGenerator
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using PcSetTableGenerator.Combinatorics;

    public static class PcSetHelper
    {
        public static IEnumerable<PcSet> GetAllNormalOrders(PcSet set)
        {
            if (set.Count == 0)
            {
                return new[] { new PcSet(new int[0]) };
            }

            if (set.Count == 1)
            {
                return new[] { new PcSet(new[] { 0 }) };
            }

            if (set.Count == 12)
            {
                return new[] { new PcSet(new[] { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 }) };
            }

            ILookup<int, PcSet> lookup = set
                .Select((x, i) => set.Shift(i))
                .ToLookup(x => x.Count != 0 ? x.Last() : 0);

            List<PcSet> setsWithSmallestRange = lookup[lookup.Min(x => x.Key)].ToList();
            return setsWithSmallestRange.Concat(setsWithSmallestRange.Select(x => x.Invert()));
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

        public static IEnumerable<PcSet> GetAllPossibleSets(int minValue, int maxValue, int length)
        {
            if (minValue > maxValue)
            {
                throw new ArgumentException("minValue has to be less or equal than maxvalue", "minValue");
            }

            if (length > (maxValue - minValue + 1))
            {
                throw new ArgumentException("length has to be less or equal than (maxvalue - minValue + 1)", "length");
            }

            List<int> values = Enumerable.Range(minValue, maxValue - minValue + 1).ToList();
            Combinations<int> combinations = new Combinations<int>(values, length, GenerateOption.WithoutRepetition);
            return combinations.Select(x => new PcSet(x.OrderBy(y => y)));
        }

        public static bool ArraysAreEqual<T>(T[] set1, T[] set2)
        {
            if (set1.Length != set2.Length)
            {
                return false;
            }

            return !set1.Where((t, i) => !t.Equals(set2[i])).Any();
        }
    }
}