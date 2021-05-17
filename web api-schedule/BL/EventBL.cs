using System;
using DAL;
using DTO;

namespace BL
{
    public class EventBL
    {
        public static EventDTO GetEventByUserCode(int userCode)
        {

            Events_tbl getEvent = DAL.EventDAL.GetEventByUserCode(userCode);
            if (getEvent == null)
                return null;
            else
            {
                EventDTO eventDTOs = EventDTO.ObjectToDTO(getEvent);
                return eventDTOs;
            }


        }

        //public static EventDTO NewEvent(EventDTO e)
        //{
        //    Events_tbl edal = EventDTO.ToDAL(e);
        //    Events_tbl etbl = DAL.EventDAL.NewEvent(edal);
        //    return new EventDTO(etbl);
        //}

        public static EventDTO AddNewEvent(EventDTO eventToAdd)
        {
            Events_tbl edal = EventDTO.ToDAL(eventToAdd);
            Events_tbl etbl = DAL.EventDAL.AddNewEvent(edal);
            return new EventDTO(etbl);
        }
    }
}