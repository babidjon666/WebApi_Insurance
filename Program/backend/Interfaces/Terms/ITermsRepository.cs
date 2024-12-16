using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces.Terms
{
    public interface ITermsRepository
    {
        Task CreateTermInDB(Term term);
        Task<IEnumerable<Term>> GetTermsFromDB();
        Task DeleteTermFromDB(int termId);
    }
}