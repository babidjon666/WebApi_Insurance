using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces.Auth
{
    public interface IAuthService
    {
        Task RegisterService(UserModel user);
        Task<UserModel> LoginService(string login, string password);
    }
}