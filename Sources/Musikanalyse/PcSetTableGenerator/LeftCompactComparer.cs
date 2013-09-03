namespace PcSetTableGenerator
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class LeftCompactComparer : IComparer<PcSet>
    {
        public int Compare(PcSet x, PcSet y)
        {
            if (x.Count != y.Count)
            {
                throw new InvalidOperationException("The set lengths have to match.");
            }

            if (x.Count == 0)
            {
                return 0;
            }

            if (x.First() != y.First())
            {
                throw new InvalidOperationException("The sets have to start with the same value.");
            }

            if (x.Last() != y.Last())
            {
                return x.Last().CompareTo(y.Last());
            }

            for (int i = 0; i < x.Count; i++)
            {
                if (x[i] != y[i])
                {
                    return x[i].CompareTo(y[i]);
                }
            }

            return 0;
        }
    }
}