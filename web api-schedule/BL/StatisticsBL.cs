using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
  public  class StatisticsBL
    {
        public static List<StaticsData> GetTimeAvgByCategory(int userCode)
        {
            List<StaticsData> staticsDatas = new List<StaticsData>();
            List<Category_tbl> categories = CategoryDAL.GetAllCategory();


            Dictionary<string, List<Schedule_tbl>> pairs = categories.Distinct().Select(c =>
             new KeyValuePair<string, List<Schedule_tbl>>(
                 c.CategoryName,
                  c.Business_tbl.SelectMany(b => b.Schedule_tbl).Where(s => s.Events_tbl?.UserCode == userCode&&s.Duration!=null).ToList()
                  )).ToDictionary(kv=>kv.Key,kv=>kv.Value);

            foreach (var item in pairs)
            {
                if(item.Value.Count>0)
                {
                    staticsDatas.Add(new StaticsData {CategoryName=item.Key,Data=(int)item.Value.Average(s=>s.Duration) });
                }
            }
           
            return staticsDatas;
        }
    }
}
