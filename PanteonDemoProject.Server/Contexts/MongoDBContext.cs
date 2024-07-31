using MongoDB.Driver;

namespace PanteonDemoProject.Server.Contexts
{
    public class MongoDBContext
    {
        //private readonly IMongoDatabase _database;
        private readonly IConfiguration _config;
        private readonly IMongoDatabase? _database;

        public MongoDBContext(IConfiguration config)
        {
            _config = config;
            var connectionString = _config.GetConnectionString("MongoDB");
            var mongoUrl = MongoUrl.Create(connectionString);
            var mongoClient = new MongoClient(mongoUrl);
            _database = mongoClient.GetDatabase(mongoUrl.DatabaseName);
            //    var connectionString = config["MongoDB:ConnectionString"];
            //    var databaseName = config["MongoDB:DatabaseName"];

            //    if (string.IsNullOrEmpty(connectionString))
            //    {
            //        throw new ArgumentNullException(nameof(connectionString), "MongoDB connection string is null or empty.");
            //    }

            //    if (string.IsNullOrEmpty(databaseName))
            //    {
            //        throw new ArgumentNullException(nameof(databaseName), "MongoDB database name is null or empty.");
            //    }

            //    var client = new MongoClient(connectionString);
            //    _database = client.GetDatabase(databaseName);
            //}

            //public IMongoCollection<Building> Buildings => _database.GetCollection<Building>("Buildings");
        }
        public IMongoDatabase? Database => _database;
    }
}
