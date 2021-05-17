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
    [RoutePrefix("api/schedule")]
    public class ScheduleController : ApiController
    {
        public static List<MustList> mustCategoryGroom { get; set; }
        public static List<MustList> mustCategoryBride { get; set; }
        //public class MustList
        //{
        //    public string id { get; set; }
        //    public string name { get; set; }
        //}
        [HttpGet]
        [Route("getAllScheduleByEventCode")]
        public IHttpActionResult GetAllScheduleByEventCode(int eventCode)
        {

            List<ScheduleDTO> scheduleList = BL.ScheduleBL.GetAllByEventCode(eventCode);
            if (scheduleList.Count() > 0)
                return Ok(scheduleList);
            return null;
        }
        [Route("newSchedule")]
        [HttpPost]
        public IHttpActionResult NewSchedule(ScheduleDTO s)
        {
            ScheduleDTO schedule = BL.ScheduleBL.NewSchedule(s);
            if (schedule != null)
                return Ok(schedule);
            return BadRequest();
        }
        [Route("getLastScheduleId")]
        [HttpGet]
        public IHttpActionResult GetLastScheduleId()
        {
            string lastScheduleId = BL.ScheduleBL.GetLastScheduleId();
            if (lastScheduleId != null)
                return Ok(lastScheduleId);
            return BadRequest();
        }
        [Route("removeSchedule")]
        [HttpGet]
        public IHttpActionResult RemoveSchedule(string id)
        {
            int effected = BL.ScheduleBL.RemoveSchedule(id);
            if (effected >= 1)
                return Ok(effected);
            return BadRequest();
        }
        [Route("getmustList")]
        [HttpGet]
        public IHttpActionResult GetMustList(EventDTO eventObject)
        {
            mustCategoryGroom = new List<MustList>()
                {
                  new MustList(){id=219,name="מגבעות"},
                  new MustList(){id=220,name="חליפות והלבשה"},
                  new MustList(){id=221,name="הנעלה"},
                };
            mustCategoryBride = new List<MustList>()
            {
              new MustList(){id=213,name="תסרוקות"},
              new MustList(){id=214,name="איפור"},
              new MustList(){id=217,name="הדרכת כלות"},
            };
            List<string> categoryNameList = new List<string>();
            List<int> categoryOfUser = BL.ScheduleBL.GetMustList(eventObject.EventCode);
            if (eventObject.GroomOrBride==false)
            {
                foreach(var c in mustCategoryGroom)
                {
                    foreach(var cU in categoryOfUser)
                    {
                        if(c.id==cU)
                        {
                            categoryNameList.Add(c.name);
                        }
                    }
                }

                return Ok(categoryNameList);
            }
            else
            {
                foreach (var c in mustCategoryBride)
                {
                    foreach (var cU in categoryOfUser)
                    {
                        if (c.id == cU)
                        {
                            categoryNameList.Add(c.name);
                        }
                    }
                }

                return Ok(categoryNameList);
            }
        }



    }


}

