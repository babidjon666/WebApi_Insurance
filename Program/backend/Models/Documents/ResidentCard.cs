using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models.Documents
{
    public class ResidentCard
    {
        public int Id { get; set; }
        public string DocumentNumber { get; set; } = string.Empty;
        public string DocumentSerie { get; set; } = string.Empty;
        public DateTime DateOfIssue { get; set; }
        public DateTime DateOfExpiry { get; set; }
        public string IssuingAuthority { get; set; } = string.Empty;
    }
}