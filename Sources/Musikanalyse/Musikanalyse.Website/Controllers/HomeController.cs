using System.Web.Mvc;

namespace Musikanalyse.Website.Controllers
{
    using System;
    using System.Web;

    using Musikanalyse.Services;
    using Musikanalyse.Services.Contracts;

    public class HomeController : Controller
    {
        public ActionResult Index(string url)
        {
            IPageService pageService = new PageService();

            try
            {
                ContentPage contentPage = pageService.GetPage(url);
                return View(contentPage);
            }
            catch (Exception e)
            {
                 throw new HttpException(404, "Page not found.");
            }
        }
    }
}
