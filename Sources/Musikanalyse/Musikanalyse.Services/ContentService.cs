namespace Musikanalyse.Services
{
    using System.Linq;

    using AutoMapper;

    using Musikanalyse.DataAccess;
    using Musikanalyse.Services.Contracts;

    public class ContentService : IContentService
    {
        public void CreateContent(Contracts.Content content)
        {
            DataAccess.Content entity = Mapper.Map<DataAccess.Content>(content);
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                context.Contents.Add(entity);
                context.SaveChanges();
            }
        }

        public Contracts.Content GetContent(int id)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                DataAccess.Content entity = context.Contents.First(x => x.Id == id);
                return Mapper.Map<Contracts.Content>(entity);
            }
        }
    }
}