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
    [RoutePrefix("api/statistics")]
    public class StatisticsController : ApiController
    {
        [Route("GetTimeAvgByCategory")]
        [HttpGet]
        public IHttpActionResult GetTimeAvgByCategory(int userCode)
        {
            return Ok(BL.StatisticsBL.GetTimeAvgByCategory(userCode));
        }
    }
}
