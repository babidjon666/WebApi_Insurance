using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Enums;
using backend.Interfaces.Policy;
using backend.Interfaces.Profile;
using backend.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace backend.Services
{
    public class PolicyService: IPolicyService
    {
        private readonly IPolicyRepository policyRepository;
        private readonly IProfileRepository profileRepository;

        public PolicyService(IPolicyRepository policyRepository, IProfileRepository profileRepository)
        {
            this.policyRepository = policyRepository;
            this.profileRepository = profileRepository;
        }

        public async Task CreatePolicyService(int userId, PolicyType policyType, DateTime dateTime)
        {
            if (userId < 0)
            {
                throw new Exception("userId не может быть отрицательным");
            }

            var policy = new Policy{
                UserId = userId,
                PolicyType = policyType,
                Date = dateTime
            };

            await policyRepository.CreatePolicyAtDB(policy);
        }

        public async Task<byte[]> GeneratePDFService(int policyId, int userId)
        {
            if (policyId < 0 )
            {
                throw new Exception("policyId не может быть отрицательным");
            }

            var policy = await policyRepository.GetPolicyFromDB(policyId);
            var user = await profileRepository.GetProfileFromDB(userId);

            var pdf = GeneratePDF(user, policy);
            return pdf;
        }

        public async Task<IEnumerable<Policy>> GetUsersPoliciesService(int userId)
        {
            if (userId < 0)
            {
                throw new Exception("userId не может быть отрицательным");
            }

            var policies = await policyRepository.GetUsersPoliciesFromDB(userId);

            return policies;
        }

        private byte[] GeneratePDF(UserModel client, Policy policy)
        {
            return Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);
                    page.DefaultTextStyle(x => x.FontSize(14));

                    // Header
                    page.Header()
                        .AlignCenter()
                        .Text($"Policy {policy.PolicyType.ToString()}")
                        .SemiBold().FontSize(24).FontColor(Colors.Blue.Medium);

                    // Content
                    page.Content()
                        .PaddingVertical(1, Unit.Centimetre)
                        .Column(col =>
                        {
                            col.Item()
                                .Table(table =>
                                {
                                    table.ColumnsDefinition(columns =>
                                    {
                                        columns.RelativeColumn();
                                        columns.RelativeColumn();
                                    });

                                    table.Cell().Row(1).Column(1).Element(CellStyle).Text("Client:");
                                    table.Cell().Row(1).Column(2).Element(CellStyle).Text($"{client.Name} {client.Surname}");

                                    table.Cell().Row(3).Column(1).Element(CellStyle).Text("Date of issue:");
                                    table.Cell().Row(3).Column(2).Element(CellStyle).Text($"{policy.Date:dd.MM.yyyy}");
                                });
                        });
                });
            })
            .GeneratePdf();
        }

        static IContainer CellStyle(IContainer container)
        {
            return container.BorderBottom(1).BorderColor(Colors.Grey.Lighten2).PaddingVertical(5);
        }
    }
}