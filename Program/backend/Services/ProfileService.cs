using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces.Profile;
using backend.Models;
using backend.Models.Documents;

namespace backend.Services
{
    public class ProfileService: IProfileService
    {
        private readonly IProfileRepository profileRepository;

        public ProfileService(IProfileRepository profileRepository)
        {
            this.profileRepository = profileRepository;
        }

        public async Task EditEmploymentContractService(EmploymentContract employmentContract)
        {
            if (employmentContract.Id < 0)
            {
                throw new Exception("id  не может быть отрицательным");
            }

            await profileRepository.EditEmploymentContractAtDB(employmentContract, employmentContract.Id);
        }

        public async Task EditPassportService(Passport passport)
        {
            if (passport.Id < 0)
            {
                throw new Exception("id  не может быть отрицательным");
            }

            await profileRepository.EditPassportAtDB(passport, passport.Id);
        }

        public async Task EditResidentCardService(ResidentCard residentCard)
        {
            if (residentCard.Id < 0)
            {
                throw new Exception("id  не может быть отрицательным");
            }

            await profileRepository.EditResidentCardAtDB(residentCard, residentCard.Id);
        }

        public async Task EditTemporaryResidencePermitService(TemporaryResidencePermit temporaryResidencePermit)
        {
            if (temporaryResidencePermit.Id < 0)
            {
                throw new Exception("id  не может быть отрицательным");
            }

            await profileRepository.EditTemporaryResidencePermitAtDB(temporaryResidencePermit, temporaryResidencePermit.Id);
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