using Microsoft.Extensions.Options;
using MongoDB.Driver;


namespace PanteonDemoProject.Server
{
   

    public class ConfigurationService
    {
        private readonly IMongoCollection<Configuration> _configurations;

        public ConfigurationService(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _configurations = database.GetCollection<Configuration>(settings.Value.CollectionName);
        }

        public List<Configuration> GetAll() => _configurations.Find(config => true).ToList();
        public Configuration Get(string id) => _configurations.Find(config => config.Id == id).FirstOrDefault();
        public Configuration Create(Configuration config)
        {
            _configurations.InsertOne(config);
            return config;
        }
        public void Update(string id, Configuration configIn) => _configurations.ReplaceOne(config => config.Id == id, configIn);
        public void Remove(Configuration configIn) => _configurations.DeleteOne(config => config.Id == configIn.Id);
        public void Remove(string id) => _configurations.DeleteOne(config => config.Id == id);
    }

}
