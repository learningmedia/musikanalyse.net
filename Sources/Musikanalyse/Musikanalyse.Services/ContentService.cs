namespace Musikanalyse.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using Musikanalyse.DataAccess;
    using Musikanalyse.Services.Contracts;

    public class ContentService : IContentService
    {
        static ContentService()
        {
            Mapper.CreateMap<DataAccess.Content, Contracts.Content>();
            Mapper.CreateMap<Contracts.Content, DataAccess.Content>();
        }

        public void CreateContent(Contracts.Content content)
        {
            DataAccess.Content entity = Mapper.Map<DataAccess.Content>(content);
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                context.Contents.Add(entity);
                context.SaveChanges();
            }
        }

        public void UpdateContent(Contracts.Content content)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                DataAccess.Content entity = context.Contents.First(x => x.Id == content.Id);
                if (entity.CreationDate != content.CreationDate)
                {
                    throw new InvalidOperationException("CreationDate must not be modified.");
                }

                entity.LastModifiedDate = content.LastModifiedDate;
                entity.Value = content.Value;
                context.SaveChanges();
            }
        }

        public IList<Contracts.Content> GetAll()
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                List<DataAccess.Content> entities = context.Contents.ToList();
                return entities.Select(Mapper.Map<Contracts.Content>).ToList();
            }
        }

        public void Delete(int id)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                DataAccess.Content entity = context.Contents.First(x => x.Id == id);
                context.Contents.Remove(entity);
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