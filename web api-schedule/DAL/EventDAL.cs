using System;
using System.Linq;

namespace DAL
{
    public class EventDAL
    {
        public static Events_tbl GetEventByUserCode(int userCode)
        {
            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {

                    Events_tbl getEvent = db.Events_tbl.Where(x => x.UserCode==userCode).Select(x => x).FirstOrDefault();
                    return getEvent;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }



        public static Events_tbl AddNewEvent(Events_tbl edal)
        {

            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {

                    
                    Events_tbl newEvent = new Events_tbl
                    {
                        EventCode = edal.EventCode,
                        UserCode = edal.UserCode,
                        EventDate = edal.EventDate,
                        GroomOrBride = edal.GroomOrBride
                    };
                    db.Events_tbl.Add(newEvent);
                    db.SaveChanges();
                    return newEvent;
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