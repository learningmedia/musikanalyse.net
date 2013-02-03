namespace Musikanalyse.Services.Contracts
{
    public interface IContentService
    {
        Content GetContent(int id);

        void CreateContent(Content content);
    }
}
