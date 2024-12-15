using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces.Profile;
using backend.Models;
using backend.Models.Documents;
using backend.Models.DTO.Profile;

namespace backend.Services
{
    public class ProfileService: IProfileService
    {
        private readonly IProfileRepository profileRepository;

        public ProfileService(IProfileRepository profileRepository)
        {
            this.profileRepository = profileRepository;
        }

        public async Task EditEmploymentContractService(EmploymentContractDTO employmentContract)
        {
            if (employmentContract.userId < 0)
            {
                throw new Exception("userId  не может быть отрицательным");
            }

            var newEmploymentContract = new EmploymentContract{
                NumberOfContract = employmentContract.NumberOfContract,
                Date = employmentContract.Date,
                INN = employmentContract.INN,
                KPP = employmentContract.KPP
            };

            await profileRepository.EditEmploymentContractAtDB(newEmploymentContract, employmentContract.userId);
        }

        public async Task EditPassportService(PassportDTO passport)
        {
            if (passport.UserId < 0)
            {
                throw new Exception("userId  не может быть отрицательным");
            }

            var newPassport = new Passport{
                DocumentNumber = passport.DocumentNumber,
                Serie = passport.Serie,
                Sex = passport.Sex,
                PlaceOfBirthday = passport.PlaceOfBirthday,
                CodeOfState = passport.CodeOfState,
                Nationality = passport.Nationality,
                IssuingAuthority = passport.IssuingAuthority,
                PlaceOfResidence = passport.PlaceOfResidence,
                DateOfBirth = passport.DateOfBirth,
                DateOfIssue = passport.DateOfIssue,
                DateOfExpiry = passport.DateOfExpiry
            };

            await profileRepository.EditPassportAtDB(newPassport, passport.UserId);
        }

        public async Task<UserModel> GetUserProfileService(int userId)
        {
            if (userId < 0)
            {
                throw new Exception("userId не может быть отрицательным");
            }

            return await profileRepository.GetProfileFromDB(userId);
        }
    }
}