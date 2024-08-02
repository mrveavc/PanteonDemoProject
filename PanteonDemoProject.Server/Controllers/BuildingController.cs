using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using PanteonDemoProject.Server.Contexts;
using PanteonDemoProject.Server.Entity;

namespace PanteonDemoProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    
    public class BuildingController : ControllerBase
    {
        private readonly IMongoCollection<Building> _buildings;
        private readonly MongoDBContext dbContext;

        public BuildingController(MongoDBContext dbContext)
        {
            _buildings = dbContext.Database?.GetCollection<Building>("Buildings");
        }

        [HttpGet("types")]
        public async Task<IActionResult> GetBuildingTypes()
        {
            var distinctBuildingTypes = await _buildings.Distinct<string>("BuildingType", new BsonDocument()).ToListAsync();

            if (distinctBuildingTypes == null)
            {
                return Ok(new List<string>());
            }

            return Ok(distinctBuildingTypes);
        }
        [HttpGet]
        public async Task<IEnumerable<Building>> Get()
        {
            return await _buildings.Find(FilterDefinition<Building>.Empty).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Building?>> GetById(string id)
        {
            var filter = Builders<Building>.Filter.Eq(x => x.Id, id);
            var building= _buildings.Find(filter).FirstOrDefault();
            return building is not null ? Ok(building) : NotFound();    
        }



        [HttpPost]
        public async Task<IActionResult> Create(Building building)
        {
            var existingBuilding = await _buildings.Find(b => b.BuildingType == building.BuildingType).FirstOrDefaultAsync();
            if (existingBuilding != null)
            {
                return Conflict(new { message = $"A building with type '{building.BuildingType}' already exists." });
            }
           
            if (building.BuildingCost <= 0)
            {
                return Conflict(new { message = "BuildingCost must be greater than zero." });
            }
            if (building.ConstructionTime < 30 || building.ConstructionTime > 1800)
            {
                return Conflict(new { message =  "ConstructionTime must be between 30 and 1800 seconds." });
            }
            await _buildings.InsertOneAsync(building);
            return Ok(new { message = "Building created successfully" });

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var filter = Builders<Building>.Filter.Eq(b => b.Id, id);
            var result = await _buildings.DeleteOneAsync(filter);

            if (result.DeletedCount == 0)
            {
                return NotFound();
            }

            return Ok(new { message = "Building deleted successfully" });
        }




    }
}
