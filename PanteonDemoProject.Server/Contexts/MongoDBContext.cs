using MongoDB.Driver;

namespace PanteonDemoProject.Server.Contexts
{
    public class MongoDBContext
    {
        private readonly IConfiguration _config;
        private readonly IMongoDatabase? _database;

        public MongoDBContext(IConfiguration config)
        {
            _config = config;
            var connectionString = _config.GetConnectionString("MongoDB");
            var mongoUrl = MongoUrl.Create(connectionString);
            var mongoClient = new MongoClient(mongoUrl);
            _database = mongoClient.GetDatabase(mongoUrl.DatabaseName);
           
        }
        public IMongoDatabase? Database => _database;
    }
}
