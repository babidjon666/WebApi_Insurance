using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.Enums;

namespace backend.Models
{
    public class Policy
    {
        public int Id { get; set; }
        public PolicyType PolicyType { get; set; }
        public DateTime Date { get; set; }
        public int UserId { get; set; } 
        [JsonIgnore]
        public UserModel User { get; set; } = null!;
    }
}