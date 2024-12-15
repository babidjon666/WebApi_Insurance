using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces.Auth
{
    public interface IAuthRepository
    {
        Task<bool> CheckName(string cheackedLogin);
        Task AddUserToDataBase(UserModel user);
        Task<UserModel> GetUserFromDataBase(string login, string hashedPassword);
    }
}