using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces.Auth;
using backend.Models;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Auth
{
    public class AuthRepository : BaseRepository, IAuthRepository
    {
        public AuthRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AddUserToDataBase(UserModel user)
        {
            _context.Users.Add(user);
            await Save();
        }

        public async Task<bool> CheckName(string cheackedLogin)
        {
            return await _context.Users
                .AnyAsync(u => u.Login == cheackedLogin);
        }

        public async Task<UserModel> GetUserFromDataBase(string login, string hashedPassword)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Login == login && u.HashedPassword == hashedPassword);

            if (user == null)
            {
                throw new Exception("Пользователь не найден!");
            }

            return user;
        }
    }
}