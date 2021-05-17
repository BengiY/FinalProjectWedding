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
    [RoutePrefix("api/user")]

    public class UserController : ApiController
    {
        [HttpGet]
        [Route("getAll")]
        public IHttpActionResult GetAll()
        {
            List<UserDTO> userList = BL.UserBL.GetAll();
            if (userList.Count() > 0)
                return Ok(userList);
            return BadRequest();
        }


        [HttpPost]
        [Route("existUser")]
        public IHttpActionResult ExistUser(UserDTO u)
        {
            UserDTO user = BL.UserBL.Exist(u);
            if (user != null)
                return Ok(user);
            return Ok(false);
        }
        [Route("newUser")]
        [HttpPost]
        public IHttpActionResult NewUser(UserDTO u)
        {
            UserDTO user = BL.UserBL.NewUser(u);
            if (user != null)
                return Ok(user);
            return BadRequest();
        }
    }

}




