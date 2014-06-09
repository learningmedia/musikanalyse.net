namespace Musikanalyse.Services.Contracts
{
    public class TutorialInfo
    {
        public string Title { get; set; }

        public string Abstract { get; set; }

        public string UrlKey { get; set; }

        public string ThumbnailUrl { get; set; }

        public int? CategoryId { get; set; }

        public Category Category { get; set; }
    }
}
