namespace Musikanalyse.Services.Contracts
{
    public class TutorialPage : Page
    {
        public string UrlKey { get; set; }

        public string Abstract { get; set; }

        public string ThumbnailUrl { get; set; }

        public int? CategoryId { get; set; }
    }
}
