using System;
using DTO;
using DAL;
using System.Collections.Generic;
namespace BL
{
    public class CategoryBL
    {
        public static List<CategoryDTO> GetAllCategory()
        {
            List<Category_tbl> categoryListDal = DAL.CategoryDAL.GetAllCategory();
            List<CategoryDTO> categoryDTOs = CategoryDTO.ListToDTO(categoryListDal);
            return categoryDTOs;
        }
    }
}