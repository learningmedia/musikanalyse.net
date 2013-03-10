namespace Musikanalyse.Website
{
    using System;
    using System.Data.Entity;
    using System.Web;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;

    using Musikanalyse.DataAccess;
    using Musikanalyse.Website.App_Start;
    using Musikanalyse.Website.Helpers;

    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            if (!StartHelpers.CheckAppVersion())
            {
                throw new InvalidOperationException("Database version does not match the app version.");
            }

            Database.SetInitializer<MusikanalyseDataContext>(null);

            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}