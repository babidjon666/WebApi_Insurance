using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces.RequestInterfaces;
using backend.Models;
using backend.Models.DTO.Request;
using backend.Models.DTO.RequestHelp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService requestService;
        public RequestController(IRequestService requestService)
        {
            this.requestService = requestService;
        }

        [Authorize(Roles = "Client")]
        [HttpPost("CreateRequest")]
        public async Task<IActionResult> CreateRequest([FromBody] RequestDTO requestDTO)
        {
            try
            {
                await requestService.CreateRequest(requestDTO);

                return Ok("Request успешно создано");
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }

        [Authorize(Roles = "Client")]
        [HttpGet("GetUsersRequests")]
        public async Task<ActionResult<IEnumerable<Request>>> GetUsersRequests(int userId)
        {
            try
            {
                var requests = await requestService.GetUsersRequests(userId);

                return Ok(requests);
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("EditRequestStatus")]
        public async Task<IActionResult> EditRequestStatus([FromBody] EditRequestDTO requestDTO )
        {
            try
            {
                await requestService.EditRequestStatusService(requestDTO.RequestId, requestDTO.RequestStatus);

                if(requestDTO.RequestStatus == Enums.RequestStatus.Ready)
                {
                    return Ok("Заявка успешно принята");
                }

                return Ok("Заявка успешно отклонена");
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("GetAllWaitingRequests")]
        public async Task<ActionResult<IEnumerable<Request>>> GetAllWaitingRequests()
        {
            try
            {
                var requests = await requestService.GetAllWaitingRequestsService();

                return Ok(requests);
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }
    }
}