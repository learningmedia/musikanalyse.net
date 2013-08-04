namespace PcSetTableGenerator
{
    using System;
    using System.IO;
    using System.Linq;

    public sealed class CsvReader : IDisposable
    {
        private readonly StreamReader streamReader;

        private readonly char separator;

        public CsvReader(string path, char separator) : this(new StreamReader(path), separator)
        {
        }

        public CsvReader(StreamReader streamReader, char separator)
        {
            if (streamReader == null)
            {
                throw new ArgumentNullException("streamReader");
            }

            this.streamReader = streamReader;
            this.separator = separator;
        }

        public string[] ReadRecord()
        {
            string line = this.streamReader.ReadLine();
            return line != null ? line.Split(this.separator).Select(x => x.Trim()).ToArray() : new string[0];
        }

        public bool EndOfStream
        {
            get
            {
                return this.streamReader.EndOfStream;
            }
        }

        public void Dispose()
        {
            this.Dispose(true);
        }

        private void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.streamReader.Dispose();
            }
        }
    }
}
