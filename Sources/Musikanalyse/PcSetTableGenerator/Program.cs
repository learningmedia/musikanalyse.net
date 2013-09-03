namespace PcSetTableGenerator
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    public static class Program
    {
        public static void Main()
        {
            Dictionary<int, List<DestinationStructure>> table = new Dictionary<int, List<DestinationStructure>>();

            IEnumerable<int> allSetLengths = Enumerable.Range(0, 13);
            foreach (int length in allSetLengths)
            {
                List<DestinationStructure> list = new List<DestinationStructure>();
                table[length] = list;

                IEnumerable<PcSet> allPossibleSets = CombinationHelper.GetAllPossibleCombinations(0, 11, length).Where(x => x.Count == 0 || x.First() == 0);
                foreach (PcSet possibleSet in allPossibleSets)
                {
                    List<PcSet> allNormalOrders = PcSetHelper.GetAllNormalOrders(possibleSet).ToList();
                    PcSet fortePrimeForm = PcSetHelper.FindFortePrimeForm(allNormalOrders);
                    PcSet rahnPrimeForm = PcSetHelper.FindRahnPrimeForm(allNormalOrders);
                    int[] intervalVector = PcSetHelper.GetIntervalVector(fortePrimeForm);

                    list.Add(
                        new DestinationStructure
                        {
                            Cardinality = length,
                            IntervalVector = intervalVector,
                            RahnPrimeForm = rahnPrimeForm.ToArray(),
                            FortePrimeForm = fortePrimeForm.ToArray()
                        });

                    Console.WriteLine(
                        "Set with length: {0}: Forte: {1} Rahn: {2} IV: {3}",
                        length,
                        fortePrimeForm,
                        rahnPrimeForm,
                        SerializationHelper.SerializeHex(intervalVector));
                }
            }

            JsonSerializerSettings serializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver(),
                    DateFormatHandling = DateFormatHandling.IsoDateFormat,
                    NullValueHandling = NullValueHandling.Include,
                    Formatting = Formatting.Indented
                };

            File.WriteAllText(
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "pcsettable.json"),
                JsonConvert.SerializeObject(table, serializerSettings),
                Encoding.UTF8);


            Console.WriteLine("Press any key to exit...");
            Console.ReadKey(true);
        }


        //private static string[] GetSubSetIds(PcSet pcSet, IEnumerable<PcSet> allSets)
        //{
        //    return allSets
        //        .Where(x => x != pcSet && x.RahnPrimeForm.IsSubsetOf(pcSet.RahnPrimeForm))
        //        .Select(x => x.ToString())
        //        .ToArray();
        //}

        //private static string[] GetSuperSetIds(PcSet pcSet, IEnumerable<PcSet> allSets)
        //{
        //    return allSets
        //        .Where(x => x != pcSet && x.RahnPrimeForm.IsSupersetOf(pcSet.RahnPrimeForm))
        //        .Select(x => x.ToString())
        //        .ToArray();
        //}

        //private static string GetZMateId(PcSet pcSet, IEnumerable<PcSet> allSets)
        //{
        //    return pcSet.ForteName != null && pcSet.ForteName.Contains("Z")
        //        ? allSets.First(x => AreZMates(x, pcSet)).ToString()
        //        : null;
        //}

        //private static bool AreZMates(PcSet set1, PcSet set2)
        //{
        //    if (set1 == set2 || set1.RahnPrimeForm.Count != set2.RahnPrimeForm.Count)
        //    {
        //        return false;
        //    }

        //    if (set1.ForteName == null || set2.ForteName == null)
        //    {
        //        return false;
        //    }

        //    if (!set1.ForteName.Contains("Z") || !set2.ForteName.Contains("Z"))
        //    {
        //        return false;
        //    }

        //    string iv1 = SerializationHelper.SerializeHex(set1.IntervalVector);
        //    string iv2 = SerializationHelper.SerializeHex(set2.IntervalVector);
        //    return iv1.Equals(iv2, StringComparison.Ordinal);
        //}
    }
}
