using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models.Documents
{
    public class EmploymentContract
    {
        public int Id { get; set; }
        public int NumberOfContract { get; set; }
        public DateTime Date { get; set; }
        public string INN { get; set; } = string.Empty;
        public string KPP { get; set; } = string.Empty;
    }
}