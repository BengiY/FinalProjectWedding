using System;
using System.Collections.Generic;
using DAL;

namespace DTO
{
    public class ScheduleDTO
    {
        public int ScheduleCode { get; set; }
        public Nullable<int> EventCode { get; set; }
        public Nullable<int> BusinessCode { get; set; }
        public Nullable<System.DateTime> EventDate { get; set; }
        public Nullable<int> Duration { get; set; }
        public Nullable<bool> Done { get; set; }
        public Nullable<int> Cost { get; set; }
        public Nullable<System.TimeSpan> Hour { get; set; }
        public string Description { get; set; }
        public string Subject { get; set; }
        public string ScheduleId { get; set; }


        public static List<ScheduleDTO> ListToDTO(List<Schedule_tbl> scheduleListDal)
        {
            List<ScheduleDTO> List = new List<ScheduleDTO>();
            foreach (Schedule_tbl s in scheduleListDal)
            {
                ScheduleDTO schedule = new ScheduleDTO(s);
                List.Add(schedule);
            }
            return List;
        }

        public ScheduleDTO()
        {

        }
        public ScheduleDTO(DAL.Schedule_tbl s)
        {
            this.ScheduleCode = s.ScheduleCode;
            this.ScheduleId = s.ScheduleId;
            this.EventCode = s.EventCode;
            this.BusinessCode = s.BusinessCode;
            this.EventDate = s.EventDate;
            this.Duration = s.Duration;
            this.Done = s.Done;
            this.Cost = s.Cost;
            this.Hour = s.Hour;
            this.Description = s.Description;
            this.Subject = s.Subject;
        }


        public static Schedule_tbl ToDAL(ScheduleDTO s)
        {
            return new Schedule_tbl
            {
                ScheduleCode=s.ScheduleCode,
                ScheduleId =s.ScheduleId,
                EventCode = s.EventCode,
                BusinessCode = s.BusinessCode,
                EventDate = s.EventDate,
                Duration = s.Duration,
                Done = s.Done,
                Cost = s.Cost,
                Hour = s.Hour,
                Description = s.Description,
                Subject = s.Subject,
        };

        }
    }
}