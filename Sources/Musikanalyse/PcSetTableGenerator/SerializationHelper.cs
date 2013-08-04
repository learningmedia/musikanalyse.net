namespace PcSetTableGenerator
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;

    public static class SerializationHelper
    {
        public static string SerializeHex(IEnumerable<int> set)
        {
            return String.Concat(set.Select(x => x.ToString("X1", CultureInfo.InvariantCulture)));
        }

        public static string SerializePrimeForm(int[] set)
        {
            return string.Concat('(', string.Join(",", set.Select(x => x.ToString("X1", CultureInfo.InvariantCulture))), ')');
        }

        public static string SerializeIntervalVector(int[] set)
        {
            return string.Concat('[', string.Concat(set.Select(x => x.ToString("X1", CultureInfo.InvariantCulture))), ']');
        }
    }
}