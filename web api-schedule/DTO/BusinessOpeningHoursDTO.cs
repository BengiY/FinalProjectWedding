using System;
using System.Collections.Generic;
using DAL;

namespace DTO
{
    public class BusinessOpeningHoursDTO
    {
        public Nullable<int> BusinessCode { get; set; }
        public Nullable<System.TimeSpan> StartHour { get; set; }
        public Nullable<System.TimeSpan> EndHour { get; set; }
        public string DayInWeek { get; set; }


        public static List<BusinessOpeningHoursDTO> ListToDTO(List<BusinessOpeningHours_tbl> hourListDal)
        {
            List<BusinessOpeningHoursDTO> List = new List<BusinessOpeningHoursDTO>();
            foreach (BusinessOpeningHours_tbl h in hourListDal)
            {
                BusinessOpeningHoursDTO hour = new BusinessOpeningHoursDTO(h);
                List.Add(hour);
            }
            return List;
        }
        public static List<BusinessOpeningHours_tbl> ListToDAL(List<BusinessOpeningHoursDTO> hourListDTO)
        {
            List<BusinessOpeningHours_tbl> ListTodal= new List<BusinessOpeningHours_tbl>();
            foreach (BusinessOpeningHoursDTO h in hourListDTO)
            {
                BusinessOpeningHours_tbl hour = ToDAL(h);
                ListTodal.Add(hour);
            }
            return ListTodal;
        }
        public BusinessOpeningHoursDTO()
        {

        }
        public BusinessOpeningHoursDTO(DAL.BusinessOpeningHours_tbl hour)
        {
            this.BusinessCode = hour.BusinessCode;
            this.StartHour = hour.StartHour;
            this.EndHour = hour.EndHour;
            this.DayInWeek = hour.DayInWeek;
        }
        public static BusinessOpeningHours_tbl ToDAL(BusinessOpeningHoursDTO h)
        {
            return new BusinessOpeningHours_tbl
            {
                BusinessCode = h.BusinessCode,
                StartHour = h.StartHour,
                EndHour = h.EndHour,
                DayInWeek = h.DayInWeek,

            };
        }
    }
}