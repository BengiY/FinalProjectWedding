using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;

namespace DAL
{
    public class CategoryDAL
    {
        public static List<Category_tbl> GetAllCategory()
        {


            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {

                    List<Category_tbl> categoryList = db.Category_tbl.
                    Include(c => c.Business_tbl).
                    Include(c => c.Business_tbl.Select(b => b.Schedule_tbl)).
                    Include(c => c.Business_tbl.Select(b => b.Schedule_tbl.Select(e => e.Events_tbl.Users_tbl)))
                   .ToList();
                    return categoryList;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }


        }

        public static List<int> GetCategoryByUserId(int userId) {

            using (projectDBEntities5 db = new projectDBEntities5())
            {
                var catList = from cat in db.Category_tbl
                              join bt in db.Business_tbl on cat.CategoryCode equals bt.CategoryCode
                              join sc in db.Schedule_tbl on bt.BusinessCode equals sc.BusinessCode
                              join et in db.Events_tbl on sc.EventCode equals et.EventCode
                              where et.UserCode == userId
                              select cat.CategoryCode;

                return catList.ToList();
            }
        }


    }
}