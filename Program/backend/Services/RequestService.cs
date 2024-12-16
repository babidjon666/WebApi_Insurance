using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces.RequestInterfaces;
using backend.Models;
using backend.Models.DTO.Request;

namespace backend.Services
{
    public class RequestService: IRequestService
    {
        private readonly IRequestRepository requestRepository;

        public RequestService(IRequestRepository requestRepository)
        {
            this.requestRepository = requestRepository;
        }

        public async Task CreateRequest(RequestDTO requestDTO)
        {
            if (requestDTO.UserId < 0)
            {
                throw new Exception("userId не может быть отрицательным");
            }

            var newRequest = new Request{
                UserId = requestDTO.UserId,
                Goal = requestDTO.Goal,
                Date = requestDTO.Date,
                RequestStatus = requestDTO.RequestStatus
            };

            await requestRepository.CreateRequestAtDB(newRequest);
        }

        public async Task<IEnumerable<Request>> GetUsersRequests(int userId)
        {
            if (userId < 0)
            {
                throw new Exception("userId не может быть отрицательным");
            }

            var requests = await requestRepository.GetUsersRequestsAtDB(userId);

            return requests;
        }
    }
}