namespace Musikanalyse.DataAccess
{
    using System.Data.Entity;

    public class DevelopmentDatabaseInitializer : DropCreateDatabaseIfModelChanges<MusikanalyseDataContext>
    {
        protected override void Seed(MusikanalyseDataContext context)
        {
            // TODO CREATE TEST DATA
        }
    }
}
