using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Enums;

namespace backend.Models.DTO.Profile
{
    public class PassportDTO
    {
        public int UserId { get; set; } 
        public string DocumentNumber { get; set; } = string.Empty; // номер документа
        public string Serie { get; set; } = string.Empty; // серия документа
        public bool Sex { get; set; } // true - мужчина, false - женщина
        public string PlaceOfBirthday { get; set; } = string.Empty; // место рождения
        public string CodeOfState { get; set; } = string.Empty; // код штата
        public Nationality Nationality { get; set; } // национальность
        public string IssuingAuthority { get; set; } = string.Empty; // орган, выдавший документ
        public string PlaceOfResidence { get; set; } = string.Empty; // место жительства
        public DateTime DateOfBirth { get; set; } // дата рождения
        public DateTime DateOfIssue { get; set; } // дата выдачи
        public DateTime DateOfExpiry { get; set; } // дата выдачи
    }
}