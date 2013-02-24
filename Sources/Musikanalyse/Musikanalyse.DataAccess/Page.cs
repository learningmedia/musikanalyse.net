namespace Musikanalyse.DataAccess
{
    using System;

    public abstract class Page
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime LastModifiedDate { get; set; }

        public string Value { get; set; }
    }
}
