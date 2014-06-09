using System.Web.Mvc;
using Musikanalyse.Services.Contracts;

namespace Musikanalyse.Website.Areas.Admin.Controllers
{
    using System;
    using System.Collections.Generic;

    using Musikanalyse.Services;
    using Musikanalyse.Website.Helpers;

    [Authorize(Roles = "Administrator")]
    public class PagesController : Controller
    {
        private readonly IPageService pageService;
        private readonly CategoryService categoryService;

        public PagesController()
        {
            this.pageService = new PageService();
            this.categoryService = new CategoryService();
        }

        public ActionResult Index()
        {
            IList<Page> contents = this.pageService.GetAll();
            return View(contents);
        }

        public ActionResult Create(PageType type)
        {
            switch (type)
            {
                case PageType.Content:
                    return this.View("CreateContent");
                case PageType.Tutoial:
                    this.ViewBag.AvailableCategories = this.categoryService.GetAll();
                    return this.View("CreateTutorial");
                default:
                    throw new InvalidOperationException("Unknown page type.");
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create([ModelBinder(typeof(PageModelBinder))] Page page, PageType type)
        {
            page.CreationDate = DateTime.UtcNow;
            page.LastModifiedDate = page.CreationDate;

            if (ModelState.IsValid)
            {
                this.pageService.CreatePage(page);
                return RedirectToAction("Index");
            }

            switch (type)
            {
                case PageType.Content:
                    return this.View("CreateContent");
                case PageType.Tutoial:
                    this.ViewBag.AvailableCategories = this.categoryService.GetAll();
                    return this.View("CreateTutorial");
                default:
                    throw new InvalidOperationException("Unknown page type.");
            }
        }

        public ActionResult Edit(int id)
        {
            try
            {
                this.ViewBag.AvailableCategories = this.categoryService.GetAll();
                Page page = this.pageService.GetPage(id);
                return View(page);
            }
            catch (Exception)
            {
                return HttpNotFound();
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit([ModelBinder(typeof(PageModelBinder))] Page page)
        {
            page.LastModifiedDate = DateTime.UtcNow;

            if (ModelState.IsValid)
            {
                this.pageService.UpdatePage(page);
                return RedirectToAction("Index");
            }

            this.ViewBag.AvailableCategories = this.categoryService.GetAll();
            return View(page);
        }

        public ActionResult Delete(int id)
        {
            try
            {
                Page page = this.pageService.GetPage(id);
                return View(page);
            }
            catch (Exception)
            {
                return HttpNotFound();
            }
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            this.pageService.DeletePage(id);
            return RedirectToAction("Index");
        }
    }
}