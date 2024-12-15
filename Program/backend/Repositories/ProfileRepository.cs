using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces.Profile;
using backend.Models;
using backend.Models.Documents;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class ProfileRepository : BaseRepository, IProfileRepository
    {
        public ProfileRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task EditEmploymentContractAtDB(EmploymentContract employmentContract, int userId)
        {
            var checkUser = await IsUserInDataBase(userId);

            if (!checkUser)
            {
                throw new Exception("Пользователь не найден в бд");
            }

            var user = await _context.Users
                .Include(u => u.Profile)
                    .ThenInclude(p => p.EmploymentContract)
                .FirstOrDefaultAsync(u => u.Id == userId);

            user.Profile.EmploymentContract.NumberOfContract = employmentContract.NumberOfContract;
            user.Profile.EmploymentContract.Date = employmentContract.Date;
            user.Profile.EmploymentContract.INN = employmentContract.INN;
            user.Profile.EmploymentContract.KPP = employmentContract.KPP;

            await Save();
        }

        public async Task EditPassportAtDB(Passport passport, int userId)
        {
            var checkUser = await IsUserInDataBase(userId);

            if (!checkUser)
            {
                throw new Exception("Пользователь не найден в бд");
            }

            var user = await _context.Users
                .Include(u => u.Profile)
                    .ThenInclude(p => p.Passport)
                .FirstOrDefaultAsync(u => u.Id == userId);
            

            user.Profile.Passport.DocumentNumber = passport.DocumentNumber; 
            user.Profile.Passport.Serie = passport.Serie; 
            user.Profile.Passport.Sex = passport.Sex; 
            user.Profile.Passport.PlaceOfBirthday = passport.PlaceOfBirthday; 
            user.Profile.Passport.CodeOfState = passport.CodeOfState; 
            user.Profile.Passport.Nationality = passport.Nationality; 
            user.Profile.Passport.IssuingAuthority = passport.IssuingAuthority; 
            user.Profile.Passport.PlaceOfResidence = passport.PlaceOfResidence; 
            user.Profile.Passport.DateOfBirth = passport.DateOfBirth; 
            user.Profile.Passport.DateOfIssue = passport.DateOfIssue; 
            user.Profile.Passport.DateOfExpiry = passport.DateOfExpiry;

            await Save();
        }

        public async Task<UserModel> GetProfileFromDB(int userId)
        {
            var user = await _context.Users
                .Include(u => u.Profile)
                    .ThenInclude(p => p.Passport)
                .Include(u => u.Profile)
                    .ThenInclude(p => p.EmploymentContract)
                .Include(u => u.Profile)
                    .ThenInclude(p => p.ResidentCard)
                .Include(u => u.Profile)
                    .ThenInclude(p => p.TemporaryResidencePermit)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new Exception("Пользователь не найден в бд!");
            }

            return user;
        }
    }
}