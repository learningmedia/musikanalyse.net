using System.Web.Mvc;

namespace Musikanalyse.Website.Controllers
{
    using System;
    using System.Web;

    using Musikanalyse.Services;
    using Musikanalyse.Services.Contracts;
    using Musikanalyse.Website.ViewModels;

    public class HomeController : Controller
    {
        private readonly IPageService pageService;

        public HomeController() : this(new PageService())
        {
        }

        public HomeController(IPageService pageService)
        {
            this.pageService = pageService;
        }

        public ActionResult Index()
        {
            HomeViewModel model = new HomeViewModel();
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
            catch (Exception e)
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
