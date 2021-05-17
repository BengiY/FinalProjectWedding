using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace DTO
{
    public class UserDTO
    {
        public int UserCode { get; set; }
        public string UserName { get; set; }
        public string UserLastName { get; set; }
        public string UserMail { get; set; }
        public string UserPassword { get; set; }
        public Nullable<bool> UserType { get; set; }

        public static List<UserDTO> ListToDTO(List<Users_tbl> userListDal)
        {
            List<UserDTO> List = new List<UserDTO>();
            foreach (Users_tbl u in userListDal)
            {
                UserDTO user = new UserDTO(u);
                List.Add(user);
            }
            return List;
        }



        public UserDTO()
        {

        }

        public UserDTO(DAL.Users_tbl user)
        {
            this.UserCode = user.UserCode;
            this.UserLastName = user.UserLastName;
            this.UserName = user.UserName;
            this.UserMail = user.UserMail;
            this.UserPassword = user.UserPassword;
            this.UserType = user.UserType;

        }
        public static Users_tbl ToDAL(UserDTO u)
        {
            return new Users_tbl
            {
                UserCode=u.UserCode,
                UserLastName = u.UserLastName,
                UserName = u.UserName,
                UserMail = u.UserMail,
                UserPassword = u.UserPassword,
                UserType = u.UserType

            };
        }
    }
}



