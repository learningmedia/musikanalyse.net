using System.Web.Mvc;

namespace Musikanalyse.Website.Controllers
{
    using System;
    using System.Web;

    using Musikanalyse.Services;
    using Musikanalyse.Services.Contracts;
    using Musikanalyse.Website.ViewModels;

    public class DefaultController : Controller
    {
        private readonly IPageService pageService;

        public DefaultController() : this(new PageService())
        {
        }

        public DefaultController(IPageService pageService)
        {
            this.pageService = pageService;
        }

        public ActionResult Index()
        {
            TutorialsViewModel model = new TutorialsViewModel();
            model.TutorialInfos = this.pageService.GetRandomTutorials(4);

            return this.View(model);
        }

        public ActionResult TutorialPage(string urlKey)
        {
            try
            {
                TutorialPage tutorialPage = this.pageService.GetTutorialPage(urlKey);
                return View(tutorialPage);
            }
            catch (Exception)
            {
                throw new HttpException(404, "Page not found.");
            }
        }

        public ActionResult TutorialIndex()
        {
            try
            {
                TutorialsViewModel model = new TutorialsViewModel();
                model.TutorialInfos = this.pageService.GetAllTutorialInfos();

                return this.View(model);
            }
            catch (Exception)
            {
                throw new HttpException(404, "Page not found.");
            }
        }

        public ActionResult ContentPage(string url)
        {
            try
            {
                ContentPage contentPage = this.pageService.GetContentPage(url);
                return View(contentPage);
            }
            catch (Exception e)
            {
                throw new HttpException(404, "Page not found.");
            }
        }
    }
}
