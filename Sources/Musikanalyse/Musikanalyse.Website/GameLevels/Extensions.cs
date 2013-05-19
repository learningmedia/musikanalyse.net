namespace Musikanalyse.Website.GameLevels
{
    using System.Collections.Generic;
    using System.Linq;

    public static class Extensions
    {
        public static  IEnumerable<IList<T>> Bundle<T>(this IEnumerable<T> sequence, int bundleSize)
        {
            List<T> currentBundle = new List<T>();
            IEnumerator<T> enumerator = sequence.GetEnumerator();

            while (enumerator.MoveNext())
            {
                if (currentBundle.Count == bundleSize)
                {
                    yield return currentBundle;
                    currentBundle = new List<T>();
                }

                currentBundle.Add(enumerator.Current);
            }

            if (currentBundle.Any())
            {
                yield return currentBundle;
            }
        }
    }
}