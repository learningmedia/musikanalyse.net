namespace MusiktheorieAktuell
{
    using System.Web;
    using System.Web.Routing;

    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            RouteCollection routes = RouteTable.Routes;
            routes.RedirectRoutePermanent("tutorials.aspx", "http://musikanalyse.net/tutorials");
            routes.RedirectRoutePermanent("tutorials/primeundoktave.aspx", "http://musikanalyse.net/tutorials/prime-und-oktave");
            routes.RedirectRoutePermanent("tutorials/quinte.aspx", "http://musikanalyse.net/tutorials/quinte");
            routes.RedirectRoutePermanent("tutorials/quarte.aspx", "http://musikanalyse.net/tutorials/quarte");
            routes.RedirectRoutePermanent("tutorials/terzen.aspx", "http://musikanalyse.net/tutorials/terzen");
            routes.RedirectRoutePermanent("tutorials/sexten.aspx", "http://musikanalyse.net/tutorials/sexten");
            routes.RedirectRoutePermanent("tutorials/sekunden.aspx", "http://musikanalyse.net/tutorials/sekunden");
            routes.RedirectRoutePermanent("tutorials/septimen.aspx", "http://musikanalyse.net/tutorials/septimen");
            routes.RedirectRoutePermanent("tutorials/tritonus.aspx", "http://musikanalyse.net/tutorials/tritonus");
            routes.RedirectRoutePermanent("tutorials/kadenz.aspx", "http://musikanalyse.net/tutorials/kadenz");
            routes.RedirectRoutePermanent("tutorials/lamentobass.aspx", "http://musikanalyse.net/tutorials/lamentobass");
            routes.RedirectRoutePermanent("tutorials/motivodicadenza.aspx", "http://musikanalyse.net/tutorials/motivo-di-cadenza");
            routes.RedirectRoutePermanent("tutorials/neapolitaner.aspx", "http://musikanalyse.net/tutorials/neapolitaner");
            routes.RedirectRoutePermanent("tutorials/fragetopos.aspx", "http://musikanalyse.net/tutorials/phrygische-wendung");
            routes.RedirectRoutePermanent("tutorials/quintfall76.aspx", "http://musikanalyse.net/tutorials/quintfall-mit-synkopenkette");
            routes.RedirectRoutePermanent("tutorials/quintfall.aspx", "http://musikanalyse.net/tutorials/quintfallsequenz");
            routes.RedirectRoutePermanent("tutorials/regola.aspx", "http://musikanalyse.net/tutorials/regola");
            routes.RedirectRoutePermanent("tutorials/parallelismus.aspx", "http://musikanalyse.net/tutorials/parallelismus");
            routes.RedirectRoutePermanent("tutorials/septakkordediat.aspx", "http://musikanalyse.net/tutorials/septakkorde");
            routes.RedirectRoutePermanent("tutorials/tonsystem.aspx", "http://musikanalyse.net/tutorials/tonsystem");
            routes.RedirectRoutePermanent("tutorials/funktionstheorie2.aspx", "http://musikanalyse.net/tutorials/funktionstheorie-chopin");
            routes.RedirectRoutePermanent("tutorials/methoden.aspx", "http://musikanalyse.net/tutorials/methoden-der-musikalischen-analyse");
            routes.RedirectRoutePermanent("tutorials/funktionstheorie.aspx", "http://musikanalyse.net/tutorials/funktionstheorie");
            routes.RedirectRoutePermanent("tutorials/funktionsequenz.aspx", "http://musikanalyse.net/tutorials/funktion-und-sequenz");
            routes.RedirectRoutePermanent("tutorials/pitchclasssettheory.aspx", "http://musikanalyse.net/tutorials/pc-set-theory");
            routes.RedirectRoutePermanent("tutorials/popformeln.aspx", "http://musikanalyse.net/tutorials/popformeln");
            routes.RedirectRoutePermanent("{*catchall}", "http://musikanalyse.net");
        }
    }
}
