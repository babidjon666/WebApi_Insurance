using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Enums;

namespace backend.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Login { get; set; } = string.Empty;
        public string HashedPassword { get; set; } = string.Empty;
        public Profile? Profile { get; set; } 
        public Role Role { get; set; }
        public List<Request> Requests { get; set; } = new List<Request>();
    }
}