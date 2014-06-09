using System.Web.Mvc;

using Musikanalyse.Services;
using Musikanalyse.Services.Contracts;

namespace Musikanalyse.Website.Areas.Admin.Controllers
{
    public class CategoriesController : Controller
    {
        private readonly ICategoryService categoryService;

        public CategoriesController()
        {
            this.categoryService = new CategoryService();
        }

        //
        // GET: /Admin/Category/

        public ActionResult Index()
        {
            return View(this.categoryService.GetAll());
        }

        //
        // GET: /Admin/Category/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Admin/Category/Create

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Category category)
        {
            if (ModelState.IsValid)
            {
                this.categoryService.CreateCategory(category);
                return RedirectToAction("Index");
            }

            return View(category);
        }

        //
        // GET: /Admin/Category/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Category category = this.categoryService.GetCategory(id);
            if (category == null)
            {
                return HttpNotFound();
            }
            return View(category);
        }

        //
        // POST: /Admin/Category/Edit/5

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Category category)
        {
            if (ModelState.IsValid)
            {
                this.categoryService.UpdateCategory(category);
                return RedirectToAction("Index");
            }
            return View(category);
        }

        //
        // GET: /Admin/Category/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Category category = categoryService.GetCategory(id);
            if (category == null)
            {
                return HttpNotFound();
            }
            return View(category);
        }

        //
        // POST: /Admin/Category/Delete/5

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            this.categoryService.DeleteCategory(id);
            return RedirectToAction("Index");
        }
    }
}