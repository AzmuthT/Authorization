using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace StockMicroservice.Controller
{
    [Route("api/[controller]")]
    public class TokenController : Microsoft.AspNetCore.Mvc.Controller
    {
        private IConfiguration _config;

        private List<string> _tokens = new List<string>();

        public TokenController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateToken([FromBody] LoginModel login)
        {
            IActionResult response = Unauthorized();
            var user = Authenticate(login);

            if (user != null)
            {
                var tokenString = BuildToken();
                _tokens.Add(tokenString);
                response = Ok(new {token = tokenString});
            }

            return response;
        }

        private string BuildToken()
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserModel Authenticate(LoginModel login)
        {
            UserModel user = null;

            if (login.Username == "mario" && login.Password == "secret")
            {
                user = new UserModel {Name = "Mario Rossi", Email = "mario.rossi@domain.com"};
            }

            return user;
        }

        [Authorize]
        [HttpPost]
        public void RefreshToken()
        {
            string oldToken = Request.Headers["Authorize"].FirstOrDefault();
            if (!string.IsNullOrEmpty(oldToken))
            {
                _tokens.Remove(oldToken);
                var newToken = BuildToken();
                _tokens.Add(newToken);
            }
        }

        public class LoginModel
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        private class UserModel
        {
            public string Name { get; set; }
            public string Email { get; set; }
            public DateTime Birthdate { get; set; }
        }
    }
}