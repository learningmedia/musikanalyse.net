namespace Musikanalyse.Services.Contracts
{
    using System;

    public class ContentPage
    {
        public DateTime CreationDate { get; set; }

        public int PageId { get; set; }

        public int ContentId { get; set; }

        public DateTime LastModifiedDate { get; set; }

        public string Value { get; set; }

        public string Url { get; set; }
    }
}