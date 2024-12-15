using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces.Profile;
using backend.Models;
using backend.Models.DTO.Profile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService profileService;

        public ProfileController(IProfileService profileService)
        {
            this.profileService = profileService;
        }

        [Authorize(Roles = "Client")]
        [HttpGet("GetUserProfile")]
        public async Task<ActionResult<UserModel>> GetUserProfile(int userId)
        {
            try
            {
                var user = await profileService.GetUserProfileService(userId);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return Conflict($"Ошибка получения профиля {ex.Message}");
            }
        }

        [Authorize(Roles = "Client")]
        [HttpPost("EditPassport")]
        public async Task<IActionResult> EditPassport([FromBody] PassportDTO passportRequest)
        {
            try
            {
                await profileService.EditPassportService(passportRequest);

                return Ok("Паспорт изменен");
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }
        
        [Authorize(Roles = "Client")]
        [HttpPost("EditemploymentContract")]
         public async Task<IActionResult> EditemploymentContract([FromBody] EmploymentContractDTO employmentContractRequest)
         {
            try
            {
                await profileService.EditEmploymentContractService(employmentContractRequest);

                return Ok("EmpolymentContract изменен!");
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
         }
    }
}