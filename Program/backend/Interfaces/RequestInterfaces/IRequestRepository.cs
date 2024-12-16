using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces.RequestInterfaces
{
    public interface IRequestRepository
    {
        Task<IEnumerable<Request>> GetUsersRequestsAtDB(int userId);
        Task CreateRequestAtDB(Request request);
    }
}