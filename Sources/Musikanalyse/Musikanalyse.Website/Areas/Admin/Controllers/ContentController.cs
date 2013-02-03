using System.Data;
using System.Web.Mvc;
using Musikanalyse.Services.Contracts;

namespace Musikanalyse.Website.Areas.Admin.Controllers
{
    using System;
    using System.Collections.Generic;

    using Musikanalyse.Services;

    public class ContentController : Controller
    {
        private readonly IContentService contentService;

        public ContentController()
        {
            this.contentService = new ContentService();
        }

        public ActionResult Index()
        {
            IList<Content> contents = contentService.GetAll();
            return View(contents);
        }

        public ActionResult Details(int id)
        {
            try
            {
                Content content = contentService.GetContent(id);
                return View(content);
            }
            catch (Exception e)
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
        public ActionResult Create(Content content)
        {
            content.CreationDate = DateTime.UtcNow;
            content.LastModifiedDate = content.CreationDate;

            if (ModelState.IsValid)
            {
                contentService.CreateContent(content);
                return RedirectToAction("Index");
            }

            return View(content);
        }

        public ActionResult Edit(int id)
        {
            try
            {
                Content content = contentService.GetContent(id);
                return View(content);
            }
            catch (Exception e)
            {
                return HttpNotFound();
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(Content content)
        {
            if (ModelState.IsValid)
            {
                Content originalContent = contentService.GetContent(content.Id);
                originalContent.Value = content.Value;
                originalContent.LastModifiedDate = DateTime.UtcNow;
                contentService.UpdateContent(originalContent);

                return RedirectToAction("Index");
            }
            return View(content);
        }

        public ActionResult Delete(int id)
        {
            try
            {
                Content content = contentService.GetContent(id);
                return View(content);
            }
            catch (Exception e)
            {
                return HttpNotFound();
            }
        }

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            contentService.Delete(id);
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}