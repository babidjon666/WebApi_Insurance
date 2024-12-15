using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces.Auth;
using backend.Models;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository authRepository;

        public AuthService(IAuthRepository authRepository)
        {
            this.authRepository = authRepository;
        }

        public async Task<UserModel> LoginService(string login, string password)
        {
            var hashedPassword = HashPassword.GetHash(password);
            var dbUser = await authRepository.GetUserFromDataBase(login, hashedPassword);

            return dbUser;
        }

        public async Task RegisterService(UserModel user)
        {
            if (await authRepository.CheckName(user.Login))
            {
                throw new Exception("Логин занят");
            }

            var hashedPassword = HashPassword.GetHash(user.HashedPassword);
            user.HashedPassword = hashedPassword;
            
            await authRepository.AddUserToDataBase(user);
        }
    }
}