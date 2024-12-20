using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.Enums;

namespace backend.Models
{
    public class Request
    {
        public int Id { get; set;}
        public int UserId { get; set; } 
        [JsonIgnore]
        public UserModel User { get; set; } = null!;
        public int EmpolyeeId { get; set; } 
        public string Goal { get; set; }  = string.Empty;
        public DateTime Date { get; set; }
        public RequestStatus RequestStatus { get; set; }
    }
}