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
    [RoutePrefix("api/business")]
    public class BussinesController : ApiController
    {
        
           [HttpGet]
        [Route("getAllBusniess")]
        public IHttpActionResult GetAllBusniess()
        {
            List<BusinessDTO> BusniessList = BL.BusniessBL.GetAllGetAllBusniess();
            if (BusniessList.Count() > 0)
                return Ok(BusniessList);
            return BadRequest();
        }
        [HttpPost]
        [Route("getBusinessByCategoryCode")]
        public IHttpActionResult GetBusniessByCategoryCode(int code)
        {
            List<BusinessDTO> BusniessList = BL.BusniessBL.GetBusniessByCategoryCode(code);
            if (BusniessList.Count() > 0)
                return Ok(BusniessList);
            return BadRequest();
        }
        [Route("newBusiness")]
        [HttpPost]
        public IHttpActionResult NewBusniess(BusinessDTO b)
        {
            BusinessDTO business = BL.BusniessBL.NewBusniess(b);
            if (business != null)
                return Ok(business);
            return BadRequest();
        }
        
        [HttpGet]
        [Route("getBussinessByOwnerCode")]
        public IHttpActionResult GetBussinessByOwnerCode(string code)
        {
            List<BusinessDTO> BusniessList = BL.BusniessBL.GetBussinessByOwnerCode(code);
            if (BusniessList.Count() > 0)
                return Ok(BusniessList);
            return BadRequest();
        }
        [HttpPost]
        [Route("getCategoryCodeByBusinessCode")]
        public IHttpActionResult GetCategoryCodeByBusinessCode(int code)
        {
            int categoryCode = BL.BusniessBL.GetCategoryCodeByBusinessCode(code);
            if (categoryCode>=0)
                return Ok(categoryCode);
            return BadRequest();
        }


    }
}
