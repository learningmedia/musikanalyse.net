namespace Musikanalyse.DataAccess
{
    using System;

    public class Content
    {
        public DateTime CreationDate { get; set; }

        public int Id { get; set; }

        public DateTime LastModifiedDate { get; set; }

        public string Value { get; set; }
    }
}