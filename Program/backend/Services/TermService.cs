using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces.Terms;
using backend.Models;

namespace backend.Services
{
    public class TermService: ITermService
    {
        private readonly ITermsRepository termsRepository;

        public TermService(ITermsRepository termsRepository)
        {
            this.termsRepository = termsRepository;
        }

        public async Task CreateTermService(Term term)
        {
            if (term == null)
            {
                throw new Exception("Term пустая");
            }

            await termsRepository.CreateTermInDB(term);
        }

        public async Task DeleteTermService(int termId)
        {
            if (termId < 0)
            {
                throw new Exception("termId не может быть меньше нуля");
            }

            await termsRepository.DeleteTermFromDB(termId);
        }

        public async Task<IEnumerable<Term>> GetTermsService()
        {
            var terms = await termsRepository.GetTermsFromDB();

            return terms;
        }
    }
}