using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;

namespace BL
{
    public class BusniessBL
    {
        public static List<BusinessDTO> GetAllGetAllBusniess()
        {
            List<Business_tbl> busniessListDal = DAL.BusinessDAL.GetAllBusniess();
            List<BusinessDTO> busniessDTOs = BusinessDTO.ListToDTO(busniessListDal);
            return busniessDTOs;
        }

        public static List<BusinessDTO> GetBusniessByCategoryCode(int code)
        {
            List<Business_tbl> busniessListDal = DAL.BusinessDAL.GetBusniessByCategoryCode(code);
            List<BusinessDTO> busniessDTOs = BusinessDTO.ListToDTO(busniessListDal);
            return busniessDTOs;
        }

        public static BusinessDTO NewBusniess(BusinessDTO b)
        {
            Business_tbl budal = BusinessDTO.ToDAL(b);
            Business_tbl btbl = DAL.BusinessDAL.NewBusniess(budal);
            return new BusinessDTO(btbl);
        }

        public static List<BusinessDTO> GetBussinessByOwnerCode(string code)
        {
            List<Business_tbl> busniessListDal = DAL.BusinessDAL.GetBussinessByOwnerCode(code);
            List<BusinessDTO> busniessDTOs = BusinessDTO.ListToDTO(busniessListDal);
            return busniessDTOs;
        }

        public static int GetCategoryCodeByBusinessCode(int code)
        {
            int categoryCode = DAL.BusinessDAL.GetCategoryCodeByBusinessCode(code);
            return categoryCode;
        }
    }
}
