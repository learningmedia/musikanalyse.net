using System.Web.Mvc;
using Musikanalyse.Services.Contracts;

namespace Musikanalyse.Website.Areas.Admin.Controllers
{
    using System;
    using System.Collections.Generic;

    using Musikanalyse.Services;

    public class PagesController : Controller
    {
        private readonly IPageService pageService;

        public PagesController()
        {
            this.pageService = new PageService();
        }

        public ActionResult Index()
        {
            IList<ContentPage> contents = this.pageService.GetAll();
            return View(contents);
        }

        public ActionResult Details(int id)
        {
            try
            {
                ContentPage page = this.pageService.GetPage(id);
                return View(page);
            }
            catch (Exception)
            {
                return HttpNotFound();
            }
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(ContentPage page)
        {
            page.CreationDate = DateTime.UtcNow;
            page.LastModifiedDate = page.CreationDate;

            if (ModelState.IsValid)
            {
                this.pageService.CreatePage(page);
                return RedirectToAction("Index");
            }

            return View(page);
        }

        public ActionResult Edit(int id)
        {
            try
            {
                ContentPage page = this.pageService.GetPage(id);
                return View(page);
            }
            catch (Exception)
            {
                return HttpNotFound();
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(ContentPage page)
        {
            if (ModelState.IsValid)
            {
                ContentPage originalPage = this.pageService.GetPage(page.PageId);
                originalPage.Value = page.Value;
                originalPage.LastModifiedDate = DateTime.UtcNow;
                this.pageService.UpdatePage(originalPage);

                return RedirectToAction("Index");
            }
            return View(page);
        }

        public ActionResult Delete(int id)
        {
            try
            {
                ContentPage page = this.pageService.GetPage(id);
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