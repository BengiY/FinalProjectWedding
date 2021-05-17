using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using DTO;

namespace BL
{
    public class ScheduleBL
    {
        public static List<ScheduleDTO> GetAllByEventCode(int eventCode)
        {
            List<Schedule_tbl> scheduleListDal = DAL.ScheduleDAL.GetAllByEventCode(eventCode);
            List<ScheduleDTO> scheduleDTOs = ScheduleDTO.ListToDTO(scheduleListDal);
            return scheduleDTOs;
        }

        public static ScheduleDTO NewSchedule(ScheduleDTO s)
        {
            Schedule_tbl sdal = ScheduleDTO.ToDAL(s);
            Schedule_tbl stbl = DAL.ScheduleDAL.NewSchedule(sdal);
            return new ScheduleDTO(stbl);
        }

        public static string GetLastScheduleId()
        {
            string lastScheduleId = DAL.ScheduleDAL.GetLastScheduleId();
            return lastScheduleId;
        }

        public static int RemoveSchedule(string id)
        {
            int effected = DAL.ScheduleDAL.RemoveSchedule(id);
            return effected;
        }

        public static List<int> GetMustList(int eventCode)
        {
            return ScheduleDAL.GetMustList(eventCode);
        }
    }
}