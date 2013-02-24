namespace Musikanalyse.Website
{
    using System.Data.Entity;
    using System.Web;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;

    using Musikanalyse.DataAccess;

    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            // TODO: DO NOT COPY TO PRODUCTION SERVER :-)
            Database.SetInitializer(new DevelopmentDatabaseInitializer());

            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}