using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces.RequestInterfaces;
using backend.Models;
using backend.Models.DTO.Request;
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
    }
}