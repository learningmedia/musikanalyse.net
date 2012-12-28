namespace Musikanalyse.Interfaces
{
    using Musikanalyse.Entities;

    public interface ITutorialService
    {
        void WriteTutorialRevision(TutorialRevision revision);

        TutorialRevision ReadTutorialRevision(int id);

        void CreateTutorial(Tutorial tutorial);
    }
}
