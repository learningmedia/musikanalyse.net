namespace Musikanalyse.DataAccess
{
    using System.Data.Entity;

    public class MusikanalyseDataContext : DbContext
    {
        public DbSet<Page> Pages { get; set; }

        public MusikanalyseDataContext() : base("MusikanalyseDb")
        {
        }
    }
}
