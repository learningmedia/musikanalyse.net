using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Musikanalyse.Website.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index( )
        {
            ViewBag.Message = "Ändern Sie diese Vorlage als Schnelleinstieg in Ihre ASP.NET MVC-Anwendung.";

            return View();
        }

        public ActionResult About( )
        {
            ViewBag.Message = "Ihre App-Beschreibungsseite.";

            return View();
        }

        public ActionResult Contact( )
        {
            ViewBag.Message = "Ihre Kontaktseite.";

            return View();
        }
    }
}
