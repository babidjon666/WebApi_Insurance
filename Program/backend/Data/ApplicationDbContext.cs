using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Models.Documents;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Passport> Passports { get; set; }
        public DbSet<EmploymentContract> EmploymentContracts { get; set; }
        public DbSet<ResidentCard> ResidentCards { get; set; }
        public DbSet<TemporaryResidencePermit> TemporaryResidencePermits { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>()
                .HasOne(u => u.Profile)
                .WithOne()
                .HasForeignKey<Profile>(p => p.Id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Profile>()
                .HasOne(p => p.Passport)
                .WithOne()
                .HasForeignKey<Passport>(ps => ps.Id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Profile>()
                .HasOne(p => p.EmploymentContract)
                .WithOne()
                .HasForeignKey<EmploymentContract>(pa => pa.Id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Profile>()
                .HasOne(p => p.ResidentCard)
                .WithOne()
                .HasForeignKey<ResidentCard>(pa => pa.Id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Profile>()
                .HasOne(p => p.TemporaryResidencePermit)
                .WithOne()
                .HasForeignKey<TemporaryResidencePermit>(pa => pa.Id)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}