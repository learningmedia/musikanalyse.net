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
    }
}