using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces.Terms
{
    public interface ITermService
    {
        Task CreateTermService(Term term );
        Task<IEnumerable<Term>> GetTermsService();
        Task DeleteTermService(int termId);
    }
}