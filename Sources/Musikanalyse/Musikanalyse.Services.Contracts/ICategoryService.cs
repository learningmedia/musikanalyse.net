namespace Musikanalyse.Services.Contracts
{
    using System.Collections.Generic;

    public interface ICategoryService
    {
        void CreateCategory(Category category);

        void UpdateCategory(Category category);

        IList<Category> GetAll();

        void DeleteCategory(int categoryId);

    }
}
