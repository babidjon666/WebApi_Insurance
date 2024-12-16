using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Models.Documents;

namespace backend.Interfaces.Profile
{
    public interface IProfileService
    {
        Task<UserModel> GetUserProfileService(int userId);
        Task EditPassportService(Passport passport);
        Task EditEmploymentContractService(EmploymentContract employmentContract);
        Task EditResidentCardService(ResidentCard residentCard);
        Task EditTemporaryResidencePermitService(TemporaryResidencePermit temporaryResidencePermit);
    }
}