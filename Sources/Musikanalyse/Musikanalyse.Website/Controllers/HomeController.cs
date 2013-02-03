using System.Web.Mvc;

namespace Musikanalyse.Website.Controllers
{
    using Musikanalyse.Services;
    using Musikanalyse.Services.Contracts;

    public class HomeController : Controller
    {
        public ActionResult Index(int id)
        {
            IContentService service = new ContentService();

            return View(service.GetContent(id));
        }

    }
}
