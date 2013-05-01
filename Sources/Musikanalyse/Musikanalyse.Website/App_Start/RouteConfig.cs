namespace Musikanalyse.Website
{
    using System.Web.Mvc;
    using System.Web.Routing;

    public static class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute("Home", string.Empty, new { controller = "Default", action = "Index" });
            routes.MapRoute("Login", "login", new { controller = "Default", action = "Login" });
            routes.MapRoute("Logout", "logout", new { controller = "Default", action = "Logout" });
            routes.MapRoute("TutorialIndex", "tutorials", new { controller = "Default", action = "TutorialIndex" });
            routes.MapRoute("TutorialPage", "tutorials/{urlKey}", new { controller = "Default", action = "TutorialPage" });
            routes.MapRoute("ContentPage", "{*url}", new { controller = "Default", action = "ContentPage" });
        }
    }
}
