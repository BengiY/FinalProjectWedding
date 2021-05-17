using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class BusinessDAL
    {
        public static List<Business_tbl> GetAllBusniess()
        {

            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {

                    List<Business_tbl> BusniessList = db.Business_tbl.Select(x => x).ToList();
                    return BusniessList;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }

        public static List<Business_tbl> GetBusniessByCategoryCode(int code)
        {
            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {
                    List<Business_tbl> BusniessList = db.Business_tbl.Where(x => x.CategoryCode==code).ToList();
                    return BusniessList;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public static List<Business_tbl> GetBussinessByOwnerCode(string code)
        {
            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {
                    List<Business_tbl> BusniessList = db.Business_tbl.Where(x => x.BusinessOwnerCode == code).ToList();
                    return BusniessList;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }

        public static int GetCategoryCodeByBusinessCode(int code)
        {
            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {
                    var categoryCode = db.Business_tbl.Where(x => x.BusinessCode == code).Select(y=>y.CategoryCode);
                    return Convert.ToInt32(categoryCode);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return -1;
            }
        }

        public static Business_tbl NewBusniess(Business_tbl budal)
        {
            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {



                    Business_tbl newBusiness = new Business_tbl
                    {
                        BusinessCode = budal.BusinessCode,
                        BusinessName = budal.BusinessName,
                        CategoryCode = budal.CategoryCode,
                        BusinessOwnerCode = budal.BusinessOwnerCode,
                        FullAddress = budal.FullAddress,
                        Fhone = budal.Fhone,
                        BusinessDescription = budal.BusinessDescription,
                    };
                    db.Business_tbl.Add(newBusiness);
                    db.SaveChanges();
                    return newBusiness;
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}
