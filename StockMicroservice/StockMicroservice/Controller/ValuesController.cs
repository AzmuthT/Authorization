using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace StockMicroservice.Controller
{
    [Authorize]
    [Route("api/[controller]")]
    public class ValuesController : Microsoft.AspNetCore.Mvc.Controller
    {
        [HttpGet]
        public ObjectResult Get()
        {
            return Ok(1);
        }

        [HttpGet("GetObject")]
        public ObjectResult GetObject()
        {
            List<Test> tmp = new List<Test>();
            tmp.Add(new Test {X = 1, Y = 2});
            tmp.Add(new Test {X = 100, Y = 200});
            return Ok(tmp);
        }

        [HttpPost]
        public ObjectResult Post()
        {
            return Ok(1);
        }
    }

    public class Test
    {
        public int X { get; set; }
        public int Y { get; set; }
    }
}