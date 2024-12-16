using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Enums;

namespace backend.Models.DTO.Request
{
    public class RequestDTO
    {
        public int UserId { get; set; } 
        public string Goal { get; set; }  = string.Empty;
        public DateTime Date { get; set; }
        public RequestStatus RequestStatus { get; set; }
    }
}