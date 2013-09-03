namespace PcSetTableGenerator
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;

    public sealed class PcSet : IEnumerable<int>
    {
        private readonly HashSet<int> set;

        public PcSet(IEnumerable<int> collection)
        {
            this.set = new HashSet<int>(collection.Select(x => MathHelper.Mod(x, 12)).Distinct().OrderBy(x => x));
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

            if (amount == 0)
            {
                return new PcSet(this.set);
            }

            int[] original = this.ToArray();
            int firstOriginalValue = original.Length != 0 ? original.First() : 0;
            return new PcSet(original.Skip(amount).Select(x => x - firstOriginalValue).Concat(original.Take(amount).Select(x => x - firstOriginalValue)));
        }

        public int Count
        {
            get
            {
                return this.set.Count;
            }
        }

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

        public override string ToString()
        {
            return SerializationHelper.SerializeHex(this);
        }
    }
}
