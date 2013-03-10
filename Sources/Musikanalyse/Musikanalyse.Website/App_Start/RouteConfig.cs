namespace Musikanalyse.Website.App_Start
{
    using System.Web.Mvc;
    using System.Web.Routing;

    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute("Home", string.Empty, new { controller = "Home", action = "Index" });
            routes.MapRoute("TutorialPage", "tutorials/{urlKey}", new { controller = "Home", action = "TutorialPage" });
            routes.MapRoute("ContentPage", "{*url}", new { controller = "Home", action = "ContentPage" });
        }
    }
}