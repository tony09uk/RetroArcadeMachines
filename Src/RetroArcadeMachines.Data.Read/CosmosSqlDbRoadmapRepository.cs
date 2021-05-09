using RetroArcadeMachines.Data.Read.Models;
using System;
using System.Net;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;

namespace RetroArcadeMachines.Data.Read
{
    public class CosmosSqlDbRoadmapRepository : IRoadmapRepository
    {
        private CosmosClient _cosmosClient;
        private Database _database;
        private Container _container;
        private string _databaseName = "RetroArcadeMachinesDatabase";
        private string _containerName = "RetroArcadeMachinesContainer";

        public CosmosSqlDbRoadmapRepository(CosmosClient cosmosClient)
        {
            _cosmosClient = cosmosClient;
            Task.WaitAll(Init());
        }
        
        public async Task<IEnumerable<RoadmapItemModel>> Get()
        {
            return await QueryItems("SELECT * FROM c");
        }

        public async Task<bool> Add(RoadmapItemModel roadMapItem)
        {
            return await this.AddItemsToContainer(roadMapItem);
        }

        private async Task Init()
        {
            await CreateDatabase();
            await CreateContainer();
        }

        private async Task CreateDatabase()
        {
            _database = await _cosmosClient.CreateDatabaseIfNotExistsAsync(_databaseName);
            Console.WriteLine("Created Database: {0}\n", this._database.Id);
        }

        private async Task CreateContainer()
        {
            _container = await _database.CreateContainerIfNotExistsAsync(_containerName, $"/{nameof(RoadmapItemModel.PercentageCompleted)}");
            Console.WriteLine("Created Container: {0}\n", this._container.Id);
        }

        private async Task<bool> AddItemsToContainer(RoadmapItemModel roadMapItem)
        {
            try
            {
                ItemResponse<RoadmapItemModel> response = await this._container.CreateItemAsync<RoadmapItemModel>(roadMapItem, new PartitionKey(roadMapItem.PercentageCompleted));
                return response.StatusCode == HttpStatusCode.OK;//todo: return more data in this response
            }
            catch (CosmosException ex) when (ex.StatusCode == HttpStatusCode.Conflict)
            {
                //todo: log this problem
                Console.WriteLine("Item in database with id: {0} already exists\n", roadMapItem.Id);
                return false;
            }
        }

        private async Task<List<RoadmapItemModel>> QueryItems(string sqlQueryText)
        {
            QueryDefinition queryDefinition = new QueryDefinition(sqlQueryText);
            FeedIterator<RoadmapItemModel> queryResultSetIterator = _container.GetItemQueryIterator<RoadmapItemModel>(queryDefinition);

            List<RoadmapItemModel> roadmapList = new List<RoadmapItemModel>();

            while (queryResultSetIterator.HasMoreResults)
            {
                FeedResponse<RoadmapItemModel> currentResultSet = await queryResultSetIterator.ReadNextAsync();
                foreach (RoadmapItemModel roadmap in currentResultSet)
                {
                    roadmapList.Add(roadmap);
                }
            }
            return roadmapList;
        }
    }
}
