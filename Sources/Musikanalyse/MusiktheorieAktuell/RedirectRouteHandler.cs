namespace MusiktheorieAktuell
{
    using System.Web;
    using System.Web.Routing;

    /// <summary>
    /// Stellt eine Implementierung von <see cref="T:System.Web.Routing.IRouteHandler" /> bereit, die permanent an einen URL umleitet.
    /// </summary>
    public class RedirectRouteHandler : IRouteHandler
    {
        /// <summary>
        /// Der URL, zu dem umgeleitet werden soll.
        /// </summary>
        private readonly string redirectUrl;

        /// <summary>
        /// Initialisiert eine neue Instanz der <see cref="RedirectRouteHandler" />-Klasse.
        /// </summary>
        /// <param name="redirectUrl">Der URL, zu dem umgeleitet werden soll.</param>
        public RedirectRouteHandler(string redirectUrl)
        {
            this.redirectUrl = redirectUrl;
        }

        /// <summary>
        /// Stellt das Objekt bereit, das die Anforderung verarbeitet.
        /// </summary>
        /// <param name="requestContext">Ein Objekt, das Informationen zu der Anforderung kapselt.</param>
        /// <returns>
        /// Ein Objekt, das die Anforderung verarbeitet.
        /// </returns>
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new RedirectHttpHandler(this.redirectUrl);
        }
    }
}
