using System.Collections.Generic;

namespace RetroArcadeMachines.AWS.DynamoDB.Generator
{
    interface ISeedTable<T>
    {
        List<T> Data();
    }
}