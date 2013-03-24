namespace Musikanalyse.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public static class Extensions
    {
        private static readonly Random random = new Random();

        public static IEnumerable<T> TakeAny<T>(this IEnumerable<T> sequence, int maxCount)
        {
            List<T> list = sequence.ToList();
            for (int i = 0; i < maxCount && list.Any(); i++)
            {
                int index = random.Next(list.Count);
                T item = list[index];
                list.RemoveAt(index);
                yield return item;
            }
        }
    }
}
