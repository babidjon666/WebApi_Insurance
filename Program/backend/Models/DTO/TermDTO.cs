using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models.DTO
{
    public class TermDTO
    {
        public string Desc { get; set; } = string.Empty;
        public DateTime DateTime { get; set; }
    }
}