namespace MusiktheorieAktuell
{
    using System.Web.Routing;

    /// <summary>
    /// Provides extension methods for ASP.NET MVC routing.
    /// </summary>
    public static class RouteExtensions
    {
        public static void RedirectRoutePermanent(this RouteCollection routes, string url, string redirectUrl)
        {
            routes.Add(new Route(url, new RedirectRouteHandler(redirectUrl)));
        }
    }
}
