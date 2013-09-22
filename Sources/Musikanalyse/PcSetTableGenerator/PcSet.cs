namespace PcSetTableGenerator
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;

    public sealed class PcSet : IEnumerable<int>, IEquatable<PcSet>
    {
        private readonly HashSet<int> set;

        private readonly Lazy<PcSet> fortePrimeForm;

        private readonly Lazy<PcSet> rahnPrimeForm;

        private readonly Lazy<int[]> intervalVector;

        public PcSet(IEnumerable<int> collection)
        {
            this.set = new HashSet<int>(collection.Select(x => MathHelper.Mod(x, 12)).Distinct().OrderBy(x => x));
            this.fortePrimeForm = new Lazy<PcSet>(() => PcSetHelper.FindFortePrimeForm(PcSetHelper.GetAllNormalOrders(this)));
            this.rahnPrimeForm = new Lazy<PcSet>(() => PcSetHelper.FindRahnPrimeForm(PcSetHelper.GetAllNormalOrders(this)));
            this.intervalVector = new Lazy<int[]>(() => PcSetHelper.GetIntervalVector(this));
        }

        public PcSet TranslateToZero()
        {
            if (this.Any())
            {
                int smallestValue = this.Min();
                return new PcSet(this.set.Select(x => x - smallestValue));
            }

            return new PcSet(Enumerable.Empty<int>());
        }

        public PcSet Invert()
        {
            if (this.Any())
            {
                int greatestValue = this.Max();
                return new PcSet(this.set.Reverse().Select(x => greatestValue - x));
            }

            return new PcSet(Enumerable.Empty<int>());
        }

        public PcSet Shift(int amount)
        {
            if (amount > this.Count)
            {
                throw new ArgumentOutOfRangeException("amount");
            }

            if (amount == 0 || this.Count == 1)
            {
                return new PcSet(this.set);
            }

            int[] originalPitches = this.ToArray();
            int delta = originalPitches[amount] - originalPitches[0];
            IEnumerable<int> firstPart = originalPitches.Skip(amount).Select(x => x - delta);
            IEnumerable<int> lastPart = originalPitches.Take(amount).Select(x => x - delta);
            List<int> allPitches = firstPart.Concat(lastPart).ToList();

            return new PcSet(allPitches);
        }

        public PcSet FortePrimeForm
        {
            get
            {
                return this.fortePrimeForm.Value;
            }
        }

        public PcSet RahnPrimeForm
        {
            get
            {
                return this.rahnPrimeForm.Value;
            }
        }

        public int[] IntervalVector
        {
            get
            {
                return this.intervalVector.Value;
            }
        }

        public int Count
        {
            get
            {
                return this.set.Count;
            }
        }

        public string ForteName { get; set; }

        public int this[int index]
        {
            get
            {
                if (index < 0 || index >= this.Count)
                {
                    throw new ArgumentOutOfRangeException("index");
                }

                return this.set.ElementAt(index);
            }
        }

        public IEnumerator<int> GetEnumerator()
        {
            return this.set.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.set.GetEnumerator();
        }

        public bool Equals(PcSet other)
        {
            return PcSetHelper.ArraysAreEqual(this.ToArray(), other.ToArray());
        }

        public override bool Equals(object obj)
        {
            if (obj == null || this.GetType() != obj.GetType())
            {
                return false;
            }

            return this.Equals((PcSet)obj);
        }

        public override int GetHashCode()
        {
            return this.set.GetHashCode();
        }

        public override string ToString()
        {
            return SerializationHelper.SerializeHex(this);
        }

        public bool IsSubsetOf(PcSet pcSet)
        {
            return this.set.IsSubsetOf(pcSet.set);
        }

        public bool IsSupersetOf(PcSet pcSet)
        {
            return this.set.IsSupersetOf(pcSet.set);
        }
    }
}
