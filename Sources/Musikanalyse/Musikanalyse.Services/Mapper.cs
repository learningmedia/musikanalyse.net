namespace Musikanalyse.Services
{
    using Musikanalyse.DataAccess;
    using Musikanalyse.Services.Contracts;

    public static class Mapper
    {
        public static Content MapToContent(ContentPage page)
        {
            return new Content
                       {
                           Id = page.ContentId,
                           LastModifiedDate = page.LastModifiedDate,
                           CreationDate = page.CreationDate,
                           Value = page.Value
                       };
        }

        public static Page MapToPage(ContentPage page)
        {
            return new Page
                       {
                           Id = page.PageId,
                           ContentId = page.ContentId,
                           Url = page.Url
                       };
        }

        public static ContentPage MapToContentPage(Page pageEntity, Content contentEntity)
        {
            return new ContentPage
                       {
                           CreationDate = contentEntity.CreationDate,
                           ContentId = contentEntity.Id,
                           LastModifiedDate = contentEntity.LastModifiedDate,
                           Url = pageEntity.Url,
                           PageId = pageEntity.Id,
                           Value = contentEntity.Value
                       };
        }
    }
}