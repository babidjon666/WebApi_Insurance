using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace backend.Interfaces.Policy
{
    public interface IPolicyRepository
    {
        Task CreatePolicyAtDB(Models.Policy policy);
        Task<IEnumerable<Models.Policy>> GetUsersPoliciesFromDB(int userId);
        Task<Models.Policy> GetPolicyFromDB(int policyId);
    }
}