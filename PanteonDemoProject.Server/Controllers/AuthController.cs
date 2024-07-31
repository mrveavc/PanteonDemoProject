using Microsoft.AspNetCore.Mvc;
using PanteonDemoProject.Server.Contexts;
using PanteonDemoProject.Server.Entity;
using System.Linq;

namespace PanteonDemoProject.Server.Controllers
{
  

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            if (_context.Users.Any(u => u.Username == user.Username || u.Email == user.Email))
            {
                return BadRequest("Username or Email already exists.");
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Registration successful.");
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {

            var user = _context.Users.SingleOrDefault(u => u.Username == request.Username && u.Password == request.Password);

            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            // JWT Token generation logic here (not implemented)

            return Ok("Login successful.");
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

}
