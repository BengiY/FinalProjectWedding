using System;
using DAL;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class EventDTO
    {
        public int EventCode { get; set; }
        public Nullable<int> UserCode { get; set; }
        public Nullable<System.DateTime> EventDate { get; set; }
        public Nullable<bool> GroomOrBride { get; set; }






        public static EventDTO ObjectToDTO(Events_tbl getEvent)
        {
            EventDTO EventObj = new EventDTO(getEvent);
            return EventObj;
        }



        public EventDTO()
        {

        }

        public EventDTO(DAL.Events_tbl getEvent)
        {
            this.EventCode = getEvent.EventCode;
            this.UserCode = getEvent.UserCode;
            this.EventDate = getEvent.EventDate;
            this.GroomOrBride = getEvent.GroomOrBride;
        }

        public static Events_tbl ToDAL(EventDTO e)
        {
            return new Events_tbl
            {
                EventCode=e.EventCode,
                UserCode = e.UserCode,
                EventDate = e.EventDate,
                GroomOrBride = e.GroomOrBride
            };
        }
    }
}