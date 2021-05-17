using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL
{
    public class ScheduleDAL
    {
        public static List<Schedule_tbl> GetAllByEventCode(int eventCode)
        {
            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {

                    List<Schedule_tbl> scheduleList = db.Schedule_tbl.Where(x => x.EventCode == eventCode).Select(x => x).ToList();
                    return scheduleList;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public static Schedule_tbl NewSchedule(Schedule_tbl sdal)
        {

            using (projectDBEntities5 db = new projectDBEntities5())
            {
                try
                {
                    Schedule_tbl existSchedule = db.Schedule_tbl.Where(x => x.ScheduleId == sdal.ScheduleId).Select(x => x).FirstOrDefault();
                    if (existSchedule != null)
                    {
                        existSchedule.EventCode = sdal.EventCode!=null? sdal.EventCode: existSchedule.EventCode;
                        existSchedule.BusinessCode = sdal.BusinessCode!=null ? sdal.BusinessCode: existSchedule.BusinessCode;
                        existSchedule.EventDate = sdal.EventDate!=null? sdal.EventDate: existSchedule.EventDate;
                        existSchedule.Duration = sdal.Duration!=null? sdal.Duration: existSchedule.Duration;
                        existSchedule.Done = sdal.Done != null ? sdal.Done : existSchedule.Done; 
                        existSchedule.Cost = sdal.Cost != null ? sdal.Cost : existSchedule.Cost;
                        existSchedule.Hour = sdal.Hour != null ? sdal.Hour : existSchedule.Hour;
                        existSchedule.Description = sdal.Description != null ? sdal.Description : existSchedule.Description;
                        existSchedule.Subject = sdal.Subject != null ? sdal.Subject : existSchedule.Subject;
                        db.SaveChanges();
                        return existSchedule;
                    }
                    else
                    {
                        try
                        {
                            Schedule_tbl newSchedule = new Schedule_tbl
                            {
                                EventCode = sdal.EventCode,
                                BusinessCode = sdal.BusinessCode,
                                EventDate = sdal.EventDate,
                                Duration = sdal.Duration,
                                Done = sdal.Done,
                                Cost = sdal.Cost,
                                Hour = sdal.Hour,
                                Description = sdal.Description,
                                Subject = sdal.Subject,
                                ScheduleId = sdal.ScheduleId
                            };
                            db.Schedule_tbl.Add(newSchedule);
                            db.SaveChanges();
                            return newSchedule;
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine(e);
                            return null;
                        }
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return null;
                }


            }

        }

        public static List<int> GetMustList(int eventCode)
        {
            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {
                    var CategoryList =
                                   from category in db.Category_tbl
                                   join business in db.Business_tbl on category.CategoryCode equals business.CategoryCode
                                   join schedule in db.Schedule_tbl on business.BusinessCode equals schedule.BusinessCode
                                   where schedule.EventCode == eventCode
                                   select category.CategoryCode ;
                    return CategoryList.ToList();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public static int RemoveSchedule(string id)
        {
            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {
                    Schedule_tbl row = db.Schedule_tbl.Where(x => x.ScheduleId == id).Select(x => x).FirstOrDefault();
                    Schedule_tbl count = db.Schedule_tbl.Remove(row);
                    db.SaveChanges();
                    return 1;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return 0;
            }
        }

        public static string GetLastScheduleId()
        {
            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {
                    string lastScheduleId = db.Schedule_tbl
                                      .OrderByDescending(x => x.ScheduleCode)
                                      .Take(1).Select(x => x.ScheduleId).FirstOrDefault().ToString();
                    return lastScheduleId;
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