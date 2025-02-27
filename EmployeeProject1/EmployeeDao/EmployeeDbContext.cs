using EmployeeProject1.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeProject1.EmployeeDao
{
    public class EmployeeDbContext :DbContext
    {
        public EmployeeDbContext(DbContextOptions options) : base(options)
        {
        }

        protected EmployeeDbContext()
        {
        }
        public DbSet<Employee> Employees { get; set; }
    }
}
