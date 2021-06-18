using Amazon.DynamoDBv2.DataModel;
using RetroArcadeMachines.Data.Read.AWS;
using System;
using System.Collections.Generic;

namespace RetroArcadeMachines.Data.Read.Models
{
    [DynamoDBTable(DynamoDbGamesRepository.TableName)]
    public class GameModel
    {
        [DynamoDBHashKey]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int ReleaseYear { get; set; }
        public int MaxPlayers { get; set; }
        public string ThumbnailUrl { get; set; }
        public string VideoClipUrl { get; set; }
        public string Description { get; set; }

        public IEnumerable<string> ImageUrlList { get; set; }
        public IEnumerable<Guid> DeveloperList { get; set; }
        public IEnumerable<Guid> GenreList { get; set; }
        public IEnumerable<int> RatingList { get; set; }
    }
}
