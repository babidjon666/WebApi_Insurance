using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Enums;
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

        public async Task EditRequestStatusAtDB(int requestId, RequestStatus status)
        {
            var request = await _context.Requests
                .FirstOrDefaultAsync(r => r.Id == requestId);
            
            if (request == null)
            {
                throw new Exception("Заявка не найдена в бд");
            }

            request.RequestStatus = status;
            await Save();
        }

        public async Task<IEnumerable<Request>> GetAllWaitingRequestsFromDB()
        {
            var requests = await _context.Requests
                .Where(r => r.RequestStatus == Enums.RequestStatus.InProcess)
                .ToListAsync();
            
            return requests;
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