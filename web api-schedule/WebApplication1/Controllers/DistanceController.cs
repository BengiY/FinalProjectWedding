using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApplication1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/distance")]
    public class DistanceController : ApiController
    {
        public class DistanceObject
        {
            public string origin { get; set; }
            public string destination { get; set; }
        }
        [HttpPost]
        [Route("calcDistance")]
        public IHttpActionResult CalcDistance(DistanceObject distObject)
        {
            int destinationByTime = BL.DistanceBL.CalcDistance(distObject.origin, distObject.destination);
            if (destinationByTime != null)
                return Ok(destinationByTime);
            return BadRequest();
        }
    }
}
