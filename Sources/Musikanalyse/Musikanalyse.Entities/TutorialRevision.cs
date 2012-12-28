namespace Musikanalyse.Entities
{
    public class TutorialRevision
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Text { get; set; }
        public string References { get; set; }
        public int TutorialId { get; set; }
    }
}