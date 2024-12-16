using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces.Terms;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class TermRepository : BaseRepository, ITermsRepository
    {
        public TermRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task CreateTermInDB(Term term)
        {
            _context.Terms.Add(term);
            await Save(); 
        }

        public async Task DeleteTermFromDB(int termId)
        {
            var term = await _context.Terms
                .FirstOrDefaultAsync(t => t.Id == termId);

            if (term == null)
            {
                throw new Exception("Term не найдена в бд");
            }

            _context.Terms.Remove(term);
            await Save();
        }

        public async Task<IEnumerable<Term>> GetTermsFromDB()
        {
            var terms = await _context.Terms
                .ToListAsync();

            return terms;
        }
    }
}