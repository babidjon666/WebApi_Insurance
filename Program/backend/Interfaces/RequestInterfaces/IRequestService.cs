using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Enums;
using backend.Models;
using backend.Models.DTO.Request;

namespace backend.Interfaces.RequestInterfaces
{
    public interface IRequestService
    {
        Task<IEnumerable<Request>> GetUsersRequests(int userId);
        Task CreateRequest(RequestDTO requestDTO);
        Task EditRequestStatusService(int requestId, RequestStatus status);
        Task<IEnumerable<Request>> GetAllWaitingRequestsService();
    }
}