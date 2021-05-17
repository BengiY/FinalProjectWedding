using DTO;
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
    [RoutePrefix("api/hours")]
    public class BusinessOpeningHourController : ApiController
    {
        [Route("getHoursByBusinessCode")]
        [HttpGet] 
        public IHttpActionResult GetHoursByBusinessCode(int businessCode)
        {
            List<BusinessOpeningHoursDTO> hoursList = BL.BusinessOpeningHoursBL.GetHoursByBusinessCode(businessCode);
            if (hoursList.Count() > 0)
                return Ok(hoursList);
            return BadRequest();
        }
        [Route("newHours")]
        [HttpPost]
        public IHttpActionResult NewHours(List<BusinessOpeningHoursDTO> hoursList)
        {
            List<BusinessOpeningHoursDTO> hours = BL.BusinessOpeningHoursBL.NewHours(hoursList);
            if (hours != null)
                return Ok(hours);
            return BadRequest();
        }
    }
}
