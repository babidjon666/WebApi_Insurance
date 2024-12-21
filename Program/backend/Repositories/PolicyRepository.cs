using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces.Policy;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class PolicyRepository : BaseRepository, IPolicyRepository
    {
        public PolicyRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task CreatePolicyAtDB(Policy policy)
        {
            var check = await IsUserInDataBase(policy.UserId);

            if (!check)
            {
                throw new Exception("Пользователь не найден в дб");
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == policy.UserId);

            _context.Policies.Add(policy);
            await Save();
        }

        public async Task<Policy> GetPolicyFromDB(int policyId)
        {
            var policy = await _context.Policies
                .FirstOrDefaultAsync(p => p.Id == policyId);
            
            if (policy == null)
            {
                throw new Exception($"Полис с id={policyId} не найден");
            }
            return policy;
        }

        public async Task<IEnumerable<Policy>> GetUsersPoliciesFromDB(int userId)
        {
            var check = await IsUserInDataBase(userId);

            if (!check)
            {
                throw new Exception("Пользователь не найден в дб");
            }

            var policies = await _context.Policies
                .Where(p => p.UserId == userId)
                .ToListAsync();
            
            return policies;
        }
    }
}