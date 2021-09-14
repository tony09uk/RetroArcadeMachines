using System.Threading.Tasks;

namespace RetroArcadeMachines.Services.Write
{
    public interface ICloudQueue<T>
    {
        Task Add(T item, string directoryPath);
    }
}
