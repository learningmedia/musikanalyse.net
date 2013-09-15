namespace PcSetTableGenerator
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Xml.Linq;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    public static class Program
    {
        public static void Main()
        {
            Dictionary<int, List<DestinationStructure>> table = new Dictionary<int, List<DestinationStructure>>();

            for (int length = 0; length <= 12; length++)
            {
                List<DestinationStructure> list = new List<DestinationStructure>();
                table[length] = list;

                IEnumerable<PcSet> allPossibleSets = PcSetHelper.GetAllPossibleSets(0, 11, length).Where(x => x.Count == 0 || x.First() == 0);
                foreach (PcSet possibleSet in allPossibleSets)
                {
                    if (!list.Any(x => PcSetHelper.ArraysAreEqual(x.FortePrimeForm, possibleSet.FortePrimeForm.ToArray())))
                    {
                        list.Add(
                            new DestinationStructure
                            {
                                Cardinality = length,
                                IntervalVector = possibleSet.IntervalVector,
                                RahnPrimeForm = possibleSet.RahnPrimeForm.ToArray(),
                                FortePrimeForm = possibleSet.FortePrimeForm.ToArray()
                            });
                    }
                }
            }

            for (int length = 0; length <= 12; length++)
            {
                List<DestinationStructure> list = table[length].OrderByDescending(x => SerializationHelper.SerializeHex(x.IntervalVector)).ToList();
                for (int i = 0; i < list.Count; i++)
                {
                    DestinationStructure element = list[i];
                    DestinationStructure zMate = table.SelectMany(x => x.Value).FirstOrDefault(x => !x.Equals(element) && PcSetHelper.ArraysAreEqual(x.IntervalVector, element.IntervalVector));
                    if (zMate != null)
                    {
                        element.ZMate = SerializationHelper.SerializeHex(zMate.FortePrimeForm);
                    }

                    element.ForteName = string.Format("{0}-{1}{2}", length, element.ZMate != null ? "Z" : null, i + 1);
                }
            }

            string fileName = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.Desktop),
                "Forte Pc-Set-Table.csv");
            
            List<string> primeFormFromFortesTheStructureOfAtonalMusic = ImportPrimeFormFromCsv(fileName).ToList();
            List<string> primeFormFromTable =
                table.Values.SelectMany(x => x)
                    .Where(x => x.Cardinality > 2 && x.Cardinality < 10)
                    .Select(x => SerializationHelper.SerializeHex(x.FortePrimeForm).Replace(",", ""))
                    .ToList();

            
            //List<string> result1 = primeFormFromFortesTheStructureOfAtonalMusic.Except(primeFormFromTable).ToList();
            //foreach (string s in result1)
            //{
            //    Console.WriteLine(s);
            //}
            //Console.WriteLine("=======================");
            //List<string> result2 = primeFormFromTable.Except(primeFormFromFortesTheStructureOfAtonalMusic).ToList();
            //foreach (string s in result2)
            //{
            //    Console.WriteLine(s);
            //} 
            
            //Console.WriteLine("=======================");
            var testFromBook = ImportZtestFromCsv(fileName).ToList();
            var testFromTable = GenerateZtestFromTable(table).ToList();
            List<string> result3 = testFromBook.Except(testFromTable).ToList();
            foreach (string s in result3)
            {
                Console.WriteLine(s);
            } 
            Console.WriteLine("===========================");
            List<string> result4 = testFromTable.Except(testFromBook).ToList();
            foreach (string s in result4)
            {
                Console.WriteLine(s);
            }


            Console.WriteLine("===========================");
            Console.WriteLine("{0}{1}", "Forte-Primeform".PadRight(24), "Rahn-Primeform".PadRight(24));
            Console.WriteLine(new string('-', 48));

            Console.WriteLine("Forte-Primeform    Rahn-Primeform");
            foreach (DestinationStructure bla in table.Values.SelectMany(x => x).Where(x => !PcSetHelper.ArraysAreEqual(x.FortePrimeForm, x.RahnPrimeForm)))
            {
                Console.WriteLine("{0}{1}", SerializationHelper.SerializeHex(bla.FortePrimeForm).PadRight(24), SerializationHelper.SerializeHex(bla.RahnPrimeForm).PadRight(24));
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

            ExportToCsv(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "pcsettable.csv"), table);

            ShowHtml(table);

            Console.WriteLine("Press any key to exit...");
            Console.ReadKey(true);
        }

        private static IEnumerable<string> GenerateZtestFromTable(Dictionary<int, List<DestinationStructure>> table)
        {
            return table.Values.SelectMany(x => x).Where(x => x.Cardinality > 2 && x.Cardinality < 10).Select(
                value => string.Format(
                    "{0}{1}",
                    SerializationHelper.SerializeHex(value.FortePrimeForm).Replace(",", ""),
                    string.IsNullOrEmpty(value.ZMate) ? "" : "-z"));
        }

        private static IEnumerable<string> ImportPrimeFormFromCsv(string fileName)
        {
            IEnumerable<string> lines = File.ReadLines(fileName);
            return lines.Select(line => line.Split(';')).Select(parts => parts[1]);
        }

        private static void ExportToCsv(string fileName, Dictionary<int, List<DestinationStructure>> table)
        {
            using (StreamWriter streamWriter = new StreamWriter(fileName, false, Encoding.UTF8))
            {
                foreach (DestinationStructure destinationStructure in table.Values.SelectMany(x=> x))
                {
                    streamWriter.WriteLine(
                        "{0};{1};{2}",
                        (destinationStructure.ForteName?? string.Empty).Replace("Z", ""),
                        SerializationHelper.SerializeHex(destinationStructure.FortePrimeForm).Replace(",", ""),
                        string.IsNullOrEmpty(destinationStructure.ZMate) ? "" : "z");
                }
            }
        }

        private static IEnumerable<string> ImportZtestFromCsv(string fileName)
        {
            IEnumerable<string> lines = File.ReadLines(fileName);
            return lines.Select(line => line.Split(';')).Select(chars => string.Format("{0}{1}", chars[1], string.IsNullOrEmpty(chars[2]) ? "" : "-z"));
        }

        private static void ShowHtml(Dictionary<int, List<DestinationStructure>> table)
        {
            string tempFileName = Path.Combine(Path.GetTempPath(), string.Format("{0}.html", Guid.NewGuid()));
            new XElement("html", new XElement("table", CreateRows(table))).Save(tempFileName);
            Process.Start(tempFileName);
        }

        private static IEnumerable<XElement> CreateRows(Dictionary<int, List<DestinationStructure>> table)
        {
            yield return new XElement(
                "tr",
                new XElement("th", "Forte Name"),
                new XElement("th", "Forte Prime"),
                new XElement("th", "Rahn Prime"),
                new XElement("th", "Interval Vector"));

            foreach (DestinationStructure result in table.SelectMany(x => x.Value))
            {
                yield return new XElement(
                    "tr",
                    new XElement("td", result.ForteName),
                    new XElement("td", SerializationHelper.SerializeHex(result.FortePrimeForm)),
                    new XElement("td", SerializationHelper.SerializeHex(result.RahnPrimeForm)),
                    new XElement("td", SerializationHelper.SerializeHex(result.IntervalVector)));
            }
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
