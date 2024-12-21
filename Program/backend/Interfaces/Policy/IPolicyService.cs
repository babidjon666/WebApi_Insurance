using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Enums;

namespace backend.Interfaces.Policy
{
    public interface IPolicyService
    {
        Task CreatePolicyService(int userId, PolicyType policyType, DateTime dateTime);
        Task<IEnumerable<Models.Policy>> GetUsersPoliciesService(int userId);
        Task<byte[]> GeneratePDFService(int certificateId, int userId);
    }
}