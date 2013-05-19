namespace Musikanalyse.Services.Contracts
{
    public class Level
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Thumbnail { get; set; }
        public dynamic Config { get; set; }
    }
}