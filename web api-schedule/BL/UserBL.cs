using System;
using System.Collections.Generic;
using DTO;
using DAL;
namespace BL
{
    public class UserBL
    {
        public static List<UserDTO> GetAll()
        {
            List<Users_tbl> userListDal = DAL.UserDAL.GetAll();
            List<UserDTO> userDTOs = UserDTO.ListToDTO(userListDal);
            return userDTOs;
        }

        public static UserDTO Exist(UserDTO u)
        {

            Users_tbl udal = UserDTO.ToDAL(u);
            Users_tbl utbl = DAL.UserDAL.Exist(udal);
            if (utbl == null)
                return null;
            else
            return new UserDTO(utbl);
        }

        public static UserDTO NewUser(UserDTO u)
        {
            Users_tbl udal = UserDTO.ToDAL(u);
            Users_tbl utbl = DAL.UserDAL.NewUser(udal);
            return new UserDTO(utbl);
        }
    }
}