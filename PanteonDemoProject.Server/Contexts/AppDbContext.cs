using PanteonDemoProject.Server.Entity;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;


namespace PanteonDemoProject.Server.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
