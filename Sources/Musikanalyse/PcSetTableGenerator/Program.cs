namespace PcSetTableGenerator
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using System.Text;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    public static class Program
    {
        private static readonly string csvFilePath = Path.Combine(
            Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location),
            "PCSetTabelle.csv");

        private static readonly string outputFilename = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.Desktop),
            "pcsettable.json");

        public static void Main()
        {
            List<PcSet> sourceDictionary = LoadSets().ToList();
            Dictionary<string, DestinationStructure> destinationDictionary = sourceDictionary.ToDictionary(x => SerializationHelper.SerializeHex(x.RahnPrimeForm), x => CreateDestinationStructure(x, sourceDictionary));

            JsonSerializerSettings serializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver(),
                    DateFormatHandling = DateFormatHandling.IsoDateFormat,
                    NullValueHandling = NullValueHandling.Include,
                    Formatting = Formatting.Indented
                };

            File.WriteAllText(outputFilename, JsonConvert.SerializeObject(destinationDictionary, serializerSettings), Encoding.UTF8);
        }

        private static DestinationStructure CreateDestinationStructure(PcSet pcSet, IList<PcSet> allSets)
        {
            return new DestinationStructure
                   {
                       Id = pcSet.ToString(),
                       Cardinality = pcSet.RahnPrimeForm.Count,
                       ForteName = pcSet.ForteName,
                       FortePrimeForm = GetFortePrimeFormFromRahnPrimeForm(pcSet.RahnPrimeForm).ToArray(),
                       RahnPrimeForm = pcSet.RahnPrimeForm.ToArray(),
                       IntervalVector = pcSet.IntervalVector,
                       SubSets = GetSubSetIds(pcSet, allSets),
                       SuperSets = GetSuperSetIds(pcSet, allSets),
                       ZMate = GetZMateId(pcSet, allSets)
                   };
        }

        private static string[] GetSubSetIds(PcSet pcSet, IEnumerable<PcSet> allSets)
        {
            return allSets
                .Where(x => x != pcSet && x.RahnPrimeForm.IsSubsetOf(pcSet.RahnPrimeForm))
                .Select(x => x.ToString())
                .ToArray();
        }

        private static string[] GetSuperSetIds(PcSet pcSet, IEnumerable<PcSet> allSets)
        {
            return allSets
                .Where(x => x != pcSet && x.RahnPrimeForm.IsSupersetOf(pcSet.RahnPrimeForm))
                .Select(x => x.ToString())
                .ToArray();
        }

        private static string GetZMateId(PcSet pcSet, IEnumerable<PcSet> allSets)
        {
            return pcSet.ForteName != null && pcSet.ForteName.Contains("Z")
                ? allSets.First(x => AreZMates(x, pcSet)).ToString()
                : null;
        }

        private static bool AreZMates(PcSet set1, PcSet set2)
        {
            if (set1 == set2 || set1.RahnPrimeForm.Count != set2.RahnPrimeForm.Count)
            {
                return false;
            }

            if (set1.ForteName == null || set2.ForteName == null)
            {
                return false;
            }

            if (!set1.ForteName.Contains("Z") || !set2.ForteName.Contains("Z"))
            {
                return false;
            }

            string iv1 = SerializationHelper.SerializeHex(set1.IntervalVector);
            string iv2 = SerializationHelper.SerializeHex(set2.IntervalVector);
            return iv1.Equals(iv2, StringComparison.Ordinal);
        }

        private static IEnumerable<PcSet> LoadSets()
        {
            using (CsvReader reader = new CsvReader(csvFilePath, ';'))
            {
                while (!reader.EndOfStream)
                {
                    string[] record = reader.ReadRecord();
                    if (record != null && record.Length == 3)
                    {
                        int[] rahnPrimeForm = ParseRahnPrimeForm(record[0]);
                        int[] intervalVector = ParseIntervalVector(record[2]);
                        string forteName = record[1];
                        yield return new PcSet
                            {
                                RahnPrimeForm = new HashSet<int>(rahnPrimeForm),
                                ForteName = !string.IsNullOrEmpty(forteName) ? forteName : null,
                                IntervalVector = intervalVector
                            };
                    }
                }
            }
        }

        private static HashSet<int> GetFortePrimeFormFromRahnPrimeForm(HashSet<int> rahnPrimeForm)
        {
            string serializedRahnPrimeForm = SerializationHelper.SerializeHex(rahnPrimeForm);
            switch (serializedRahnPrimeForm)
            {
                case "01378":
                    return new HashSet<int>(new[] { 0, 1, 5, 6, 8 });
                case "013689":
                    return new HashSet<int>(new[] { 0, 2, 3, 6, 7, 9 });
                case "013589":
                    return new HashSet<int>(new[] { 0, 1, 4, 5, 7, 9 });
                case "0124789":
                    return new HashSet<int>(new[] { 0, 1, 2, 5, 6, 7, 9 });
                case "0124579A":
                    return new HashSet<int>(new[] { 0, 1, 3, 4, 5, 7, 8, 10 });
                default:
                    return new HashSet<int>(rahnPrimeForm);
            }
        }

        private static int[] ParseRahnPrimeForm(string s)
        {
            return s.Trim('(', ')')
                    .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                    .Select(x => int.Parse(x, NumberStyles.AllowHexSpecifier))
                    .ToArray();
        }

        private static int[] ParseIntervalVector(string s)
        {
            return s.Trim('[', ']')
                    .Select(x => int.Parse(x.ToString(CultureInfo.InvariantCulture), NumberStyles.AllowHexSpecifier))
                    .ToArray();
        }
    }
}
