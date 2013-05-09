namespace MusiktheorieAktuell
{
    using System.Web;

    /// <summary>
    /// Stellt eine Implementierung von <see cref="IHttpHandler" /> bereit, die permanent an einen URL umleitet.
    /// </summary>
    public class RedirectHttpHandler : IHttpHandler
    {
        /// <summary>
        /// Der URL, zu dem umgeleitet werden soll.
        /// </summary>
        private readonly string redirectUrl;

        /// <summary>
        /// Initialisiert eine neue Instanz der <see cref="RedirectHttpHandler" />-Klasse.
        /// </summary>
        /// <param name="redirectUrl">Der URL, zu dem umgeleitet werden soll.</param>
        public RedirectHttpHandler(string redirectUrl)
        {
            this.redirectUrl = redirectUrl;
        }

        /// <summary>
        /// Ruft einen Wert ab, der angibt, ob eine weitere Anforderung die <see cref="IHttpHandler" />-Instanz verwenden kann.
        /// </summary>
        /// <value>
        /// <c>true</c>, wenn die <see cref="IHttpHandler" />-Instanz wiederverwendet werden kann, andernfalls <c>false</c>.
        /// </value>
        public bool IsReusable
        {
            get
            {
                return true;
            }
        }

        /// <summary>
        /// Ermöglicht die Verarbeitung von HTTP-Webanforderungen durch einen benutzerdefinierten HttpHandler, der die <see cref="IHttpHandler" />-Schnittstelle implementiert.
        /// </summary>
        /// <param name="context">
        /// Ein <see cref="HttpContext" />-Objekt, das Verweise auf die systeminternen Serverobjekte bereitstellt (z. B. Request, Response, Session und Server), die für die Bearbeitung von HTTP-Anforderungen verwendet werden.
        /// </param>
        public void ProcessRequest(HttpContext context)
        {
            context.Response.Status = "301 Moved Permanently";
            context.Response.StatusCode = 301;
            context.Response.AppendHeader("Location", this.redirectUrl);
        }
    }
}
