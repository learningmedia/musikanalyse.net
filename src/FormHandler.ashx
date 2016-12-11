<%@ WebHandler Language="C#" Class="FormHandler" %>

using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;

public class FormHandler : IHttpHandler
{
    const string success = "Vielen Dank für Ihre Anfrage, Sie erhalten von uns in Kürze eine Antwort.";
    const string error = "Der Versand der Anfrage ist leider fehlgeschlagen. Bitte informieren Sie den Administrator über die im Impressum angegeben Kontakt-Möglichkeiten.";

    public void ProcessRequest(HttpContext context)
    {
        var keys = context.Request.Form.AllKeys;
        StringBuilder sb = new StringBuilder();
        string doubleLine = Environment.NewLine + Environment.NewLine;
        string line = Environment.NewLine;
        int first;
        int second;
        int result;
        bool isValid;

        foreach (string key in keys)
        {
            string value = context.Request.Form[key];
            switch (key)
            {
                case "name":
                    sb.Append(string.Concat("Name: ", value));
                    sb.Append(line);
                    break;
                case "email":
                    sb.Append(string.Concat("E-Mail: ", value));
                    sb.Append(line);
                    break;
                case "message":
                    sb.Append("_______________________________________");
                    sb.Append(doubleLine);
                    sb.Append(string.Concat("E-Mail: ", value));
                    break;
                default:
                    break;
            }
        }

        if(Int32.TryParse(context.Request.Form["first"], out first) &&
            Int32.TryParse(context.Request.Form["second"], out second) &&
            Int32.TryParse(context.Request.Form["result"], out result) &&
            (first + second) == result) {
            string errorMessage;
            bool isSuccess = this.SendMessage(sb.ToString(), out errorMessage);
            context.Response.Write(isSuccess ? success : error);
            context.Response.End();
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

    /// <summary>
    /// Versendet eine E-Mail.
    /// </summary>
    /// <param name="message">Die Instanz von <see cref="System.String"/>, die ?.</param>
    /// <param name="errorMessage">Die Instanz von <see cref="System.String"/>, die ?.</param>
    /// <returns><c>true</c>, wenn die Nachricht erfolgreich versendet wurde, andernfalls <c>false</c>.</returns>
    public bool SendMessage(string message, out string errorMessage)
    {
        using (SmtpClient smtpClient = new SmtpClient())
        {
            try
            {
                MailMessage mm = new MailMessage(new MailAddress("formular@musikanalyse.net"), new MailAddress("formular@musikanalyse.net"))
                {
                    Subject = "Formularnachricht musikanalyse.net",
                    Body = message
                };
                smtpClient.Send(mm);
                errorMessage = string.Empty;
                return true;
            }
            catch (Exception ex)
            {
                errorMessage = string.Concat("Nachricht: ", ex.Message, " ", "InnerException: ", ex.InnerException);
                return false;
            }
        }
    }
}
