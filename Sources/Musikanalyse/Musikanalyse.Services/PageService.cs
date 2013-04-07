namespace Musikanalyse.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Musikanalyse.DataAccess;
    using Musikanalyse.Services.Contracts;

    public class PageService : IPageService
    {
        public void CreatePage<T>(T page) where T : Contracts.Page
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                DataAccess.Page entity = Mapper.MapToEntity(page);
                context.Pages.Add(entity);
                context.SaveChanges();
                page.Id = entity.Id;
            }
        }

        public void UpdatePage<T>(T page) where T : Contracts.Page
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                DataAccess.Page entity = context.Pages.Single(x => x.Id == page.Id);
                Mapper.MapToExistingEntity(page, entity);
                context.SaveChanges();
            }
        }

        public IList<Contracts.Page> GetAll()
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                return context.Pages.ToList().Select(Mapper.MapToContract).ToList();
            }
        }

        public IList<TutorialInfo> GetAllTutorialInfos()
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                return context
                    .Pages
                    .OfType<DataAccess.TutorialPage>()
                    .Select(x => new TutorialInfo { Abstract = x.Abstract, Title = x.Title, UrlKey = x.UrlKey, ThumbnailUrl = x.ThumbnailUrl})
                    .ToList();
            }
        }

        public IList<TutorialInfo> GetRandomTutorials(int maxCount)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                List<int> randomIds = context
                    .Pages
                    .OfType<DataAccess.TutorialPage>()
                    .Select(x => x.Id)
                    .ToList()
                    .TakeAny(4)
                    .ToList();

                return context
                    .Pages
                    .OfType<DataAccess.TutorialPage>()
                    .Where(x => randomIds.Contains(x.Id))
                    .Select(x => new TutorialInfo { Abstract = x.Abstract, Title = x.Title, UrlKey = x.UrlKey, ThumbnailUrl = x.ThumbnailUrl })
                    .ToList();
            }
        }

        public void DeletePage(int pageId)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                DataAccess.Page pageEntity = context.Pages.First(x => x.Id == pageId);
                context.Pages.Remove(pageEntity);
                context.SaveChanges();
            }
        }

        public Contracts.ContentPage GetContentPage(string url)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                DataAccess.ContentPage pageEntity = context.Pages.OfType<DataAccess.ContentPage>().Single(x => x.Url == url);
                return Mapper.MapToContract(pageEntity);
            }
        }

        public Contracts.Page GetPage(int pageId)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                DataAccess.Page pageEntity = context.Pages.First(x => x.Id == pageId);
                return Mapper.MapToContract(pageEntity);
            }
        }

        public Contracts.TutorialPage GetTutorialPage(string urlKey)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                DataAccess.TutorialPage pageEntity = context.Pages.OfType<DataAccess.TutorialPage>().Single(x => x.UrlKey == urlKey);
                return Mapper.MapToContract(pageEntity);
            }
        }
    }
}