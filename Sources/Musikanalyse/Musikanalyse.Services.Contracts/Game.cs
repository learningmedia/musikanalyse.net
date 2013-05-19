namespace Musikanalyse.Services.Contracts
{
    public class Game
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Thumbnail { get; set; }
        public string ClrGameType { get; set; }
        public Level[] Levels { get; set; }
    }
}