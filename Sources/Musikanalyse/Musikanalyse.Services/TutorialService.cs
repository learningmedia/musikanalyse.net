namespace Musikanalyse.Services
{
    using System;
    using System.Configuration;
    using System.Data;
    using System.Data.SqlClient;

    using Musikanalyse.Entities;
    using Musikanalyse.Interfaces;

    public class TutorialService : ITutorialService 
    {
        private const string selectScopeIdentity = "SELECT CAST(SCOPE_IDENTITY() AS INT) AS [Id]";

        public void WriteTutorialRevision(TutorialRevision revision)
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["MusikanalyseDb"].ConnectionString))
            {
                connection.Open();
                const string sql = "INSERT INTO [TutorialRevisions] ([Title], [ThumbnailUrl], [Description], [Date], [Version], [References], [Text], [VideoId]) VALUES (@p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7); " + selectScopeIdentity;
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@p0", revision.Title);
                    command.Parameters.AddWithValue("@p1", DBNull.Value);
                    command.Parameters.AddWithValue("@p2", revision.Description);
                    command.Parameters.AddWithValue("@p3", DateTime.UtcNow);
                    command.Parameters.AddWithValue("@p4", 0);
                    command.Parameters.AddWithValue("@p5", (object)revision.References ?? DBNull.Value);
                    command.Parameters.AddWithValue("@p6", (object)revision.Text ?? DBNull.Value);
                    command.Parameters.AddWithValue("@p7", DBNull.Value);
                    command.ExecuteNonQuery();
                    revision.Id = (int) command.ExecuteScalar();
                }
            }
        }

        public TutorialRevision ReadTutorialRevision(int id)
        {
            throw new NotImplementedException();
        }

        public void CreateTutorial(Tutorial tutorial)
        {
            using (SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["MusikanalyseDb"].ConnectionString))
            {
                connection.Open();
                const string sql = "INSERT INTO [Tutorials] ([IsPublic]) VALUES (@p0); " + selectScopeIdentity;
                using (SqlCommand command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@p0", tutorial.IsPublic);
                    tutorial.Id = (int) command.ExecuteScalar();
                }
            }
        }
    }
}
