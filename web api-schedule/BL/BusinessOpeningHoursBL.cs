using DTO;
using System;
using System.Collections.Generic;
using DAL;
namespace BL
{
    public class BusinessOpeningHoursBL
    {
        public static List<BusinessOpeningHoursDTO> GetHoursByBusinessCode(int businessCode)
        {
            List<BusinessOpeningHours_tbl> hourListDal = DAL.BusinessOpeningHoursDAL.GetHoursByBusinessCode(businessCode);
            List<BusinessOpeningHoursDTO> hourDTOs = BusinessOpeningHoursDTO.ListToDTO(hourListDal);
            return hourDTOs;
        }

        public static List<BusinessOpeningHoursDTO> NewHours(List<BusinessOpeningHoursDTO> hoursList)
        {
            List<BusinessOpeningHours_tbl> hdal = BusinessOpeningHoursDTO.ListToDAL(hoursList);
            List<BusinessOpeningHours_tbl> results = DAL.BusinessOpeningHoursDAL.NewHours(hdal);
            List<BusinessOpeningHoursDTO> hoursDTO = BusinessOpeningHoursDTO.ListToDTO(results);
            return hoursDTO;
        }
    }
}