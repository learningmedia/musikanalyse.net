namespace PcSetTableGenerator
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using System.Text;
    using System.Xml.Linq;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    public static class Program
    {
        public static void Main()
        {
            string fileName = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "Files\\Forte Pc-Set-Table.csv");
            Dictionary<string, string> forteNamesFromCsv = ImportForteNamesFromCsv(fileName);
            List<PcSet> allSets = new List<PcSet>();

            for (int length = 0; length <= 12; length++)
            {
                allSets.AddRange(FilterDuplicates(PcSetHelper.GetAllPossibleSets(0, 11, length).Where(x => x.Count == 0 || x.First() == 0)));
            }

            ILookup<int, DestinationStructure> table = allSets.ToLookup(
                x => x.Count,
                x => new DestinationStructure
                               {
                                   Cardinality = x.Count,
                                   IntervalVector = SerializationHelper.SerializeHex(x.IntervalVector),
                                   ForteName = x.Count > 2 && x.Count < 10 ? forteNamesFromCsv[x.FortePrimeForm.ToString()] : null,
                                   RahnPrimeForm = x.RahnPrimeForm.ToString(),
                                   SubSets = GetSubSetIds(x, allSets),
                                   SuperSets = GetSuperSetIds(x, allSets),
                                   FortePrimeForm = x.FortePrimeForm.ToString()
                               });

            for (int length = 0; length <= 12; length++)
            {
                foreach (DestinationStructure element in table[length])
                {
                    DestinationStructure zMate = table.SelectMany(x => x).FirstOrDefault(x => !x.Equals(element) && x.IntervalVector.Equals(element.IntervalVector));
                    if (zMate != null)
                    {
                        element.ZMate = zMate.FortePrimeForm;
                    }

                    element.SubSets = GetSubSetIds(
                        allSets.Single(x => element.FortePrimeForm.Equals(x.FortePrimeForm.ToString())),
                        allSets);

                    element.SuperSets = GetSuperSetIds(
                        allSets.Single(x => element.FortePrimeForm.Equals(x.FortePrimeForm.ToString())),
                        allSets);
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
                JsonConvert.SerializeObject(table.SelectMany(x => x).ToDictionary(x => x.FortePrimeForm, x => x), serializerSettings),
                Encoding.UTF8);

            ShowHtml(table);
        }

        private static List<PcSet> FilterDuplicates(IEnumerable<PcSet> allPossibleSets)
        {
            List<PcSet> withoutDuplicates = new List<PcSet>();
            foreach (PcSet possibleSet in allPossibleSets)
            {
                if (!withoutDuplicates.Any(x => x.FortePrimeForm.Equals(possibleSet.FortePrimeForm)))
                {
                    withoutDuplicates.Add(possibleSet);
                }
            }

            return withoutDuplicates;
        }

        private static Dictionary<string, string> ImportForteNamesFromCsv(string fileName)
        {
            IEnumerable<string> lines = File.ReadLines(fileName);
            return lines.Select(line => line.Split(';')).ToDictionary(x => x[1], x => x[0]);
        }

        private static void ShowHtml(ILookup<int, DestinationStructure> table)
        {
            string tempFileName = Path.Combine(Path.GetTempPath(), string.Format("{0}.html", Guid.NewGuid()));
            new XElement("html", new XElement("table", CreateRows(table))).Save(tempFileName);
            Process.Start(tempFileName);
        }

        private static IEnumerable<XElement> CreateRows(ILookup<int, DestinationStructure> table)
        {
            yield return new XElement(
                "tr",
                new XElement("th", "Forte Name"),
                new XElement("th", "Forte Prime"),
                new XElement("th", "Rahn Prime"),
                new XElement("th", "Interval Vector"),
                new XElement("th", "Z-Mate"));

            foreach (DestinationStructure result in table.SelectMany(x => x))
            {
                yield return new XElement(
                    "tr",
                    new XElement("td", result.ForteName),
                    new XElement("td", result.FortePrimeForm),
                    new XElement("td", result.RahnPrimeForm),
                    new XElement("td", result.IntervalVector),
                    new XElement("td", result.ZMate));
            }
        }

        private static string[] GetSubSetIds(PcSet pcSet, IEnumerable<PcSet> allSets)
        {
            return allSets
                .Where(x => !Equals(x, pcSet) && x.FortePrimeForm.IsSubsetOf(pcSet.FortePrimeForm))
                .Select(x => x.ToString())
                .ToArray();
        }

        private static string[] GetSuperSetIds(PcSet pcSet, IEnumerable<PcSet> allSets)
        {
            return allSets
                .Where(x => !Equals(x, pcSet) && x.FortePrimeForm.IsSupersetOf(pcSet.FortePrimeForm))
                .Select(x => x.ToString())
                .ToArray();
        }
    }
}
