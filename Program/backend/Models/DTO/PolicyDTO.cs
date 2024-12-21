using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Enums;

namespace backend.Models.DTO
{
    public class PolicyDTO
    {
        public int UserID { get; set; }
        public PolicyType PolicyType { get; set; }
        public DateTime Date { get; set; }
    }
}