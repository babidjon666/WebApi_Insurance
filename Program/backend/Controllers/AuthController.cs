using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces.Auth;
using backend.Models;
using backend.Models.Documents;
using backend.Models.DTO;
using backend.Models.DTO.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthService authService;
        private readonly JWTSettings jwtService;

        public AuthController(IAuthService authService, JWTSettings jwtService)
        {
            this.authService = authService;
            this.jwtService = jwtService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerRequest)
        {
            var newUser = new UserModel {
                Name = registerRequest.Name,
                Surname = registerRequest.Surname,
                Login = registerRequest.Login,
                HashedPassword = registerRequest.Password,
                Role = Enums.Role.Client,
                Profile = new Profile{
                    Passport = new Passport(),  
                    EmploymentContract = new EmploymentContract(),    
                    ResidentCard = new ResidentCard(),
                    TemporaryResidencePermit = new TemporaryResidencePermit(),
                }
            };

            try
            {
                await authService.RegisterService(newUser);
                return Ok("Пользователь успешно зарегестрирован");
            }
            catch (Exception ex)
            {
                return BadRequest($"Ошибка регистрации: {ex.Message}");
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody]LoginDTO loginRequest)
        {
            try
            {
                var user = await authService.LoginService(loginRequest.Login, loginRequest.Password);

                var token = jwtService.GenerateJwtToken(user); 
                return Ok(new { Token = token, UserId = user.Id, Role = user.Role });
            }
            catch (Exception ex)
            {
                return BadRequest($"Ошибка логина: {ex.Message}");
            }
        }
    }
}