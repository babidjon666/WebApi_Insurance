using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Enums;
using backend.Models;

namespace backend.Interfaces.RequestInterfaces
{
    public interface IRequestRepository
    {
        Task<IEnumerable<Request>> GetUsersRequestsAtDB(int userId);
        Task CreateRequestAtDB(Request request);
        Task EditRequestStatusAtDB(int requestId, RequestStatus status);
        Task<IEnumerable<Request>> GetAllWaitingRequestsFromDB();
    }
}