using System;
using System.Collections.Generic;
using System.Linq;
namespace DAL
{
    public class BusinessOpeningHoursDAL
    {
        public static List<BusinessOpeningHours_tbl> GetHoursByBusinessCode(int businessCode)
        {
            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {

                    List<BusinessOpeningHours_tbl> hourList = db.BusinessOpeningHours_tbl.Where(x=>x.BusinessCode == businessCode).Select(x => x).ToList();
                    return hourList;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public static List<BusinessOpeningHours_tbl> NewHours(List<BusinessOpeningHours_tbl> hdal)
        {
            foreach(var h in hdal)
            { 
                try
                {
                    using (projectDBEntities5 db = new projectDBEntities5())
                    {
                        BusinessOpeningHours_tbl newHour = new BusinessOpeningHours_tbl
                        {
                            BusinessCode = h.BusinessCode,
                            StartHour = h.StartHour,
                            EndHour = h.EndHour,
                            DayInWeek = h.DayInWeek,
                        };
                        db.BusinessOpeningHours_tbl.Add(newHour);
                        db.SaveChanges();
                    }

                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return null;
                }
            }
            return hdal;
        }
    }
}
    
