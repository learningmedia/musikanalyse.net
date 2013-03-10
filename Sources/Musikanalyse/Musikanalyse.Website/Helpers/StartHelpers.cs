namespace Musikanalyse.Website.Helpers
{
    using System;
    using System.Data.SqlClient;
    using System.Web.Configuration;

    public class StartHelpers
    {
        public static bool CheckAppVersion()
        {
            string appVersion = WebConfigurationManager.AppSettings["AppVersion"];
            string connectionString = WebConfigurationManager.ConnectionStrings["MusikanalyseDb"].ConnectionString;
            string appVersionFromDatabase;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT TOP 1 [Value] FROM [MusikanalyseDb].[dbo].[Settings] WHERE [Name] = N'AppVersion'";
                    appVersionFromDatabase = (string)command.ExecuteScalar();
                }
            }

            return string.Equals(appVersion, appVersionFromDatabase, StringComparison.Ordinal);
        }
    }
}