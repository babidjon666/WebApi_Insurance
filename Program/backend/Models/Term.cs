using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Term
    {
        public int Id { get; set; }
        public string Desc { get; set; } = string.Empty;
        public DateTime DateTime { get; set; }
    }
}