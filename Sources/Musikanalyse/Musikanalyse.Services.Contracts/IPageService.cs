namespace Musikanalyse.Services.Contracts
{
    using System.Collections.Generic;

    public interface IPageService
    {
        Page GetPage(int pageId);

        void CreatePage<T>(T page) where T : Page;

        void UpdatePage<T>(T page) where T : Page;

        IList<Page> GetAll();

        void DeletePage(int pageId);

        ContentPage GetContentPage(string url);

        TutorialPage GetTutorialPage(string urlKey);
    }
}
