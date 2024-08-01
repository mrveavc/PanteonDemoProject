using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace PanteonDemoProject.Server.Entity
{
    public class Building
    {
        [BsonId]
        [BsonElement("_id"),BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("building_type"), BsonRepresentation(BsonType.String)]
        public string? BuildingType { get; set; }

        [BsonElement("building_cost"), BsonRepresentation(BsonType.Int32)]
        public int? BuildingCost { get; set; }

        [BsonElement("construction_time"), BsonRepresentation(BsonType.Int32)]
        public int? ConstructionTime { get; set; }
       
    }
}