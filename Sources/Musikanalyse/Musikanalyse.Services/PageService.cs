namespace Musikanalyse.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Musikanalyse.DataAccess;
    using Musikanalyse.Services.Contracts;

    public class PageService : IPageService
    {
        public void CreatePage(ContentPage page)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                Content contentEntity = Mapper.MapToContent(page);
                context.Contents.Add(contentEntity);
                context.SaveChanges();
                page.ContentId = contentEntity.Id;

                Page pageEntity = Mapper.MapToPage(page);
                context.Pages.Add(pageEntity);
                context.SaveChanges();
                page.PageId = pageEntity.Id;
            }
        }

        public void UpdatePage(ContentPage page)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                Content entity = context.Contents.First(x => x.Id == page.ContentId);
                if (entity.CreationDate != page.CreationDate)
                {
                    throw new InvalidOperationException("CreationDate must not be modified.");
                }

                entity.LastModifiedDate = page.LastModifiedDate;
                entity.Value = page.Value;

                Page pageEntity = context.Pages.First(x => x.Id == page.PageId);
                pageEntity.Url = page.Url;

                context.SaveChanges();
            }
        }

        public IList<ContentPage> GetAll()
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                List<Content> contentEntities = context.Contents.ToList();
                List<Page> pageEntities = context.Pages.ToList();
                List<ContentPage> contentPages = new List<ContentPage>();

                foreach (Content contentEntity in contentEntities)
                {
                    ContentPage page = new ContentPage
                                           {
                                               ContentId = contentEntity.Id,
                                               CreationDate = contentEntity.CreationDate,
                                               LastModifiedDate = contentEntity.LastModifiedDate,
                                               Value = contentEntity.Value
                                           };
                    Page pageEntity = pageEntities.Single(x => x.ContentId == contentEntity.Id);
                    page.Url = pageEntity.Url;
                    page.PageId = pageEntity.Id;
                    contentPages.Add(page);
                }

                return contentPages;
            }
        }

        public void DeletePage(int pageId)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                Page pageEntity = context.Pages.First(x => x.Id == pageId);
                Content contentEntity = context.Contents.First(x => x.Id == pageEntity.ContentId);
                context.Pages.Remove(pageEntity);
                context.Contents.Remove(contentEntity);
                context.SaveChanges();
            }
        }

        public ContentPage GetPage(string url)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                Page pageEntity = context.Pages.First(x => x.Url == url);
                Content contentEntity = context.Contents.First(x => x.Id == pageEntity.ContentId);
                return Mapper.MapToContentPage(pageEntity, contentEntity);
            }
        }

        public ContentPage GetPage(int pageId)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                Page pageEntity = context.Pages.First(x => x.Id == pageId);
                Content contentEntity = context.Contents.First(x => x.Id == pageEntity.ContentId);
                return Mapper.MapToContentPage(pageEntity, contentEntity);
            }
        }
    }
}