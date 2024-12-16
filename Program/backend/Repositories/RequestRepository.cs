using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces.RequestInterfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class RequestRepository : BaseRepository, IRequestRepository
    {
        public RequestRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task CreateRequestAtDB(Request request)
        {
            var checkUserId = await IsUserInDataBase(request.UserId);

            if (!checkUserId)
            {
                throw new Exception("Пользователь не найден в бд");
            }

            _context.Requests.Add(request);
            await Save();
        }

        public async Task<IEnumerable<Request>> GetUsersRequestsAtDB(int userId)
        {
            var checkUserId = await IsUserInDataBase(userId);

            if (!checkUserId)
            {
                throw new Exception("Пользователь не найден в бд");
            }

            var requests = await _context.Requests
                .Where(r => r.UserId == userId)
                .ToListAsync();
            
            return requests;
        }
    }
}