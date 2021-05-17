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
    [RoutePrefix("api/category")]
    public class CategoryController : ApiController
    {
        
           [HttpGet]
        [Route("getAllCategory")]
        public IHttpActionResult GetAllCategory()
            {
                List<CategoryDTO> categoryList = BL.CategoryBL.GetAllCategory();
                if (categoryList.Count() > 0)
                    return Ok(categoryList);
                return BadRequest();
            }
        
    }
}
