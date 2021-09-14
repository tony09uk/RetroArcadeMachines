using RetroArcadeMachines.Shared.Models;
using System;
using System.Collections.Generic;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    class SeedDevelopersTable : ISeedTable<DeveloperModel>
    {
        public List<DeveloperModel> Data()
        {
            return new List<DeveloperModel>
            {
                new DeveloperModel
                {
                    Id = new Guid("9c4a0323-0c34-4ebf-aeaf-be680045ce06"),
                    Name = "Konami",
                    Country = "Japan",
                    FoundedYear = 1969,
                    Website = "https://www.konami.com/"
                },
            };
        }
    }
}
