using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using backend.Models.Documents;

namespace backend.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public Passport? Passport { get; set; } 
        public EmploymentContract? EmploymentContract { get; set; } 
        public ResidentCard? ResidentCard { get; set; } 
        public TemporaryResidencePermit? TemporaryResidencePermit { get; set; } 
    }
}