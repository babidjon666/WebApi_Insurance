using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Enums;

namespace backend.Models.DTO.RequestHelp
{
    public class EditRequestDTO
    {
        public int RequestId {get; set;}
        public RequestStatus RequestStatus {get; set;}
    }
}