using System;
using System.Collections.Generic;
using System.Linq;
namespace DAL
{
    public class UserDAL
    {
        public static List<Users_tbl> GetAll()
        {

            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {

                    List<Users_tbl> UserList = db.Users_tbl.Select(x => x).ToList();
                    return UserList;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }

        }



        public static Users_tbl Exist(Users_tbl u)
        {
            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {

                    Users_tbl User = db.Users_tbl.Where(x => x.UserPassword == u.UserPassword && x.UserName==u.UserName).FirstOrDefault();
                    return User;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public static Users_tbl NewUser(Users_tbl udal)
        {
            try
            {
                using (projectDBEntities5 db = new projectDBEntities5())
                {



                    Users_tbl newUser = new Users_tbl
                    {
                        UserName = udal.UserName,
                        UserLastName = udal.UserLastName,
                        UserMail = udal.UserMail,
                        UserPassword = udal.UserPassword,
                        UserType = udal.UserType
                    };
                    db.Users_tbl.Add(newUser);
                    db.SaveChanges();
                    return newUser;
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
