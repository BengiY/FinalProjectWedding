using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace DTO
{
    public  class BusinessDTO
    {
        public int BusinessCode { get; set; }
        public string BusinessName { get; set; }
        public Nullable<int> CategoryCode { get; set; }
        public string BusinessOwnerCode { get; set; }
        public string FullAddress { get; set; }
        public string Fhone { get; set; }
        public string BusinessDescription { get; set; }

        public static List<BusinessDTO> ListToDTO(List<Business_tbl> businessListDal)
        {
            List<BusinessDTO> List = new List<BusinessDTO>();
            foreach (Business_tbl b in businessListDal)
            {
                BusinessDTO bussiness = new BusinessDTO(b);
                List.Add(bussiness);
            }
            return List;
        }



        public BusinessDTO()
        {

        }

        public BusinessDTO(DAL.Business_tbl business)
        {
            this.BusinessCode = business.BusinessCode;
            this.BusinessName = business.BusinessName;
            this.CategoryCode = business.CategoryCode;
            this.BusinessOwnerCode = business.BusinessOwnerCode;
            this.FullAddress = business.FullAddress;
            this.Fhone = business.Fhone;
            this.BusinessDescription = business.BusinessDescription;
        }
        public static Business_tbl ToDAL(BusinessDTO b)
        {
            return new Business_tbl
            {
            BusinessCode = b.BusinessCode,
            BusinessName = b.BusinessName,
            CategoryCode = b.CategoryCode,
            BusinessOwnerCode = b.BusinessOwnerCode,
            FullAddress = b.FullAddress,
            Fhone = b.Fhone,
            BusinessDescription = b.BusinessDescription,
        };
        }
    }
}
