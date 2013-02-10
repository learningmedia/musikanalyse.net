namespace Musikanalyse.Services.Contracts
{
    using System.Collections.Generic;

    public interface IPageService
    {
        ContentPage GetPage(int pageId);

        void CreatePage(ContentPage page);

        void UpdatePage(ContentPage page);

        IList<ContentPage> GetAll();

        void DeletePage(int pageId);

        ContentPage GetPage(string url);
    }
}
