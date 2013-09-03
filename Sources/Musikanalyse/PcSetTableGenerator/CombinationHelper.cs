namespace PcSetTableGenerator
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using PcSetTableGenerator.Combinatorics;

    public static class CombinationHelper
    {
        public static IEnumerable<PcSet> GetAllPossibleCombinations(int minValue, int maxValue, int length)
        {
            if (minValue > maxValue)
            {
                throw new ArgumentException("minValue has to be less or equal than maxvalue", "minValue");
            }

            if (length > (maxValue - minValue + 1))
            {
                throw new ArgumentException("length has to be less or equal than (maxvalue - minValue + 1)", "length");
            }

            List<int> values = Enumerable.Range(minValue, maxValue - minValue).ToList();
            return new Combinations<int>(values, length, GenerateOption.WithoutRepetition).Select(x => new PcSet(x.OrderBy(y => y)));
        }
    }
}
