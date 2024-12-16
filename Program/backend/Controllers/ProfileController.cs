using backend.Interfaces.Profile;
using backend.Models;
using backend.Models.Documents;
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
        public async Task<IActionResult> EditPassport([FromBody] Passport passportRequest)
        {
            try
            {
                await profileService.EditPassportService(passportRequest);

                return Ok("Passport изменен");
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }
        
        [Authorize(Roles = "Client")]
        [HttpPost("EditemploymentContract")]
         public async Task<IActionResult> EditemploymentContract([FromBody] EmploymentContract employmentContractRequest)
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

        [Authorize(Roles = "Client")]
        [HttpPost("EditResidentCard")]
        public async Task<IActionResult> EditResidentCard([FromBody] ResidentCard residentCardRequest)
        {
            try
            {
                await profileService.EditResidentCardService(residentCardRequest);

                return Ok("ResidentCard изменен!");
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }

        [HttpPost("EditTemporaryResidencePermit")]
        public async Task<IActionResult> EditTemporaryResidencePermit([FromBody] TemporaryResidencePermit temporaryResidencePermit)
        {
            try
            {
                await profileService.EditTemporaryResidencePermitService(temporaryResidencePermit);

                return Ok("TemporaryResidencePermit изменен!");
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }
    }
}