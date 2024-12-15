﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Data;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("backend.Models.Documents.EmploymentContract", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("INN")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("KPP")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfContract")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("EmploymentContracts");
                });

            modelBuilder.Entity("backend.Models.Documents.Passport", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("CodeOfState")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateOfExpiry")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateOfIssue")
                        .HasColumnType("datetime2");

                    b.Property<string>("DocumentNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IssuingAuthority")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Nationality")
                        .HasColumnType("int");

                    b.Property<string>("PlaceOfBirthday")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlaceOfResidence")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Serie")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Sex")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Passports");
                });

            modelBuilder.Entity("backend.Models.Documents.ResidentCard", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateOfExpiry")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateOfIssue")
                        .HasColumnType("datetime2");

                    b.Property<string>("DocumentNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DocumentSerie")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IssuingAuthority")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ResidentCards");
                });

            modelBuilder.Entity("backend.Models.Documents.TemporaryResidencePermit", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<DateTime>("DacisionDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateOfExpiry")
                        .HasColumnType("datetime2");

                    b.Property<string>("DocumentNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IssuingAuthority")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("TemporaryResidencePermits");
                });

            modelBuilder.Entity("backend.Models.Profile", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("backend.Models.Request", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmpolyeeId")
                        .HasColumnType("int");

                    b.Property<string>("Goal")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RequestStatus")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Request");
                });

            modelBuilder.Entity("backend.Models.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("HashedPassword")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("backend.Models.Documents.EmploymentContract", b =>
                {
                    b.HasOne("backend.Models.Profile", null)
                        .WithOne("EmploymentContract")
                        .HasForeignKey("backend.Models.Documents.EmploymentContract", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Documents.Passport", b =>
                {
                    b.HasOne("backend.Models.Profile", null)
                        .WithOne("Passport")
                        .HasForeignKey("backend.Models.Documents.Passport", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Documents.ResidentCard", b =>
                {
                    b.HasOne("backend.Models.Profile", null)
                        .WithOne("ResidentCard")
                        .HasForeignKey("backend.Models.Documents.ResidentCard", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Documents.TemporaryResidencePermit", b =>
                {
                    b.HasOne("backend.Models.Profile", null)
                        .WithOne("TemporaryResidencePermit")
                        .HasForeignKey("backend.Models.Documents.TemporaryResidencePermit", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Profile", b =>
                {
                    b.HasOne("backend.Models.UserModel", null)
                        .WithOne("Profile")
                        .HasForeignKey("backend.Models.Profile", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Request", b =>
                {
                    b.HasOne("backend.Models.UserModel", "User")
                        .WithMany("Requests")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.Profile", b =>
                {
                    b.Navigation("EmploymentContract");

                    b.Navigation("Passport");

                    b.Navigation("ResidentCard");

                    b.Navigation("TemporaryResidencePermit");
                });

            modelBuilder.Entity("backend.Models.UserModel", b =>
                {
                    b.Navigation("Profile");

                    b.Navigation("Requests");
                });
#pragma warning restore 612, 618
        }
    }
}
