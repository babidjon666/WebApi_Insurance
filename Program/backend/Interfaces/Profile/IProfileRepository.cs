using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Models.Documents;

namespace backend.Interfaces.Profile
{
    public interface IProfileRepository
    {
        Task<UserModel> GetProfileFromDB(int userId);
        Task EditPassportAtDB(Passport passport, int userId);
        Task EditEmploymentContractAtDB(EmploymentContract employmentContract, int userId);
        Task EditResidentCardAtDB(ResidentCard residentCard, int userId);
        Task EditTemporaryResidencePermitAtDB(TemporaryResidencePermit temporaryResidencePermit, int userId);
    }
}