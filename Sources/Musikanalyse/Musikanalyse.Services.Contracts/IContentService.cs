namespace Musikanalyse.Services.Contracts
{
    using System.Collections.Generic;

    public interface IContentService
    {
        Content GetContent(int id);

        void CreateContent(Content content);

        void UpdateContent(Content content);

        IList<Content> GetAll();

        void Delete(int id);
    }
}
