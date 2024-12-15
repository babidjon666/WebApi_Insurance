using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Models.Documents;
using backend.Models.DTO.Profile;

namespace backend.Interfaces.Profile
{
    public interface IProfileService
    {
        Task<UserModel> GetUserProfileService(int userId);
        Task EditPassportService(PassportDTO passport);
        Task EditEmploymentContractService(EmploymentContractDTO employmentContract);
    }
}