using System;
using System.Collections.Generic;

namespace Musikanalyse.Services
{
    using System.Linq;
    using Musikanalyse.DataAccess;
    using Musikanalyse.Services.Contracts;

    public class CategoryService : ICategoryService
    {
        public void CreateCategory(Contracts.Category category)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                DataAccess.Category entity = Mapper.MapToEntity(category);
                context.Categories.Add(entity);
                context.SaveChanges();
                category.Id = entity.Id;
            }
        }

        public void UpdateCategory(Contracts.Category category)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                DataAccess.Category entity = context.Categories.Single(x => x.Id == category.Id);
                Mapper.MapToExistingEntity(category, entity);
                context.SaveChanges();
            }
        }

        public IList<Contracts.Category> GetAll()
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                return context.Categories.ToList().Select(Mapper.MapToContract).ToList();
            }
        }

        public void DeleteCategory(int categoryId)
        {
            using (MusikanalyseDataContext context = new MusikanalyseDataContext())
            {
                DataAccess.Category categoryEntity = context.Categories.First(x => x.Id == categoryId);
                context.Categories.Remove(categoryEntity);
                context.SaveChanges();
            }
        }
    }
}
