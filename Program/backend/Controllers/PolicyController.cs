using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces.Policy;
using backend.Models;
using backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using QuestPDF.Infrastructure;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PolicyController : ControllerBase
    {
        private readonly IPolicyService policyService;

        public PolicyController(IPolicyService policyService)
        {
            this.policyService = policyService;
        }

        [HttpPost("CreatePolicy")]
        public async Task<IActionResult> CreatePolicy([FromBody] PolicyDTO policyDTO)
        {
            try
            {
                await policyService.CreatePolicyService(policyDTO.UserID, policyDTO.PolicyType, policyDTO.Date);

                return Ok("Полис успешно создан");
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }

        [HttpGet("GetUsersPolicies")]
        public async Task<ActionResult<IEnumerable<Policy>>> GetUsersPolicies(int userId)
        {
            try
            {
                var policies = await policyService.GetUsersPoliciesService(userId);

                return Ok(policies);
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }

        [HttpGet("DownoloadPolicy")]
        public async Task<IActionResult> DownoloadPolicy(int policyId, int userId)
        {
            try
            {
                QuestPDF.Settings.License = LicenseType.Community;
                
                var pdf = await policyService.GeneratePDFService(policyId, userId);
                return File(pdf, "application/pdf", $"Policy{policyId}.pdf");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}");
            }
        }
    }
}