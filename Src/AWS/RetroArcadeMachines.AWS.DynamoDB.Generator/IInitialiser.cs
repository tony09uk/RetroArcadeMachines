using System.Threading.Tasks;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    interface IInitialiser
    {
        Task Run();
    }
}