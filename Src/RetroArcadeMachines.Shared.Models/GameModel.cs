using Amazon.DynamoDBv2.DataModel;
using System;
using System.Collections.Generic;

namespace RetroArcadeMachines.Shared.Models
{
    [DynamoDBTable("Games")] // todo: how to stop duplicating the table name in here in repository
    public class GameModel : ICacheableModel
    {
        [DynamoDBHashKey]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int? ReleaseYear { get; set; }
        public int? MaxPlayers { get; set; }
        public string ThumbnailUrl { get; set; }
        public string VideoClipUrl { get; set; }
        public string Description { get; set; }

        public List<string> ImageUrlList { get; set; }
        public List<string> DeveloperList { get; set; }
        public List<string> GenreList { get; set; }
        public List<int> RatingList { get; set; }
    }
}
