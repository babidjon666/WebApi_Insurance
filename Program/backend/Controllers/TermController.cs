using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces.Terms;
using backend.Models;
using backend.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TermController : ControllerBase
    {
        private readonly ITermService termService;
        public TermController(ITermService termService)
        {
            this.termService = termService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("CreateTerm")]
        public async Task<IActionResult> CreateTerm([FromBody] TermDTO termRequest)
        {
            try
            {
                var newTerm = new Term{
                    Desc = termRequest.Desc,
                    DateTime = termRequest.DateTime
                };
                await termService.CreateTermService(newTerm);

                return Ok("Term успешно создано!");
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }

        [Authorize(Roles = "Client,Admin")]
        [HttpGet("GetAllTerms")]
        public async Task<ActionResult<IEnumerable<Term>>> GetAllTerms()
        {
            try
            {
                var terms = await termService.GetTermsService();

                return Ok(terms);
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteTerm")]
        public async Task<IActionResult> DeleteTerm(int termId)
        {
            try
            {
                await termService.DeleteTermService(termId);

                return Ok("Term удалена");
            }
            catch (Exception ex)
            {
                return Conflict(ex.Message);
            }
        }
    }
}