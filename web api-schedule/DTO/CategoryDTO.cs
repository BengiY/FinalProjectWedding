using System;
using System.Collections.Generic;
using DAL;

namespace DTO
{
    public class CategoryDTO
    {
        public int CategoryCode { get; set; }
        public string CategoryName { get; set; }
        public Nullable<int> GroomOrBride { get; set; }
        public Nullable<int> AverageDuration { get; set; }


        public static List<CategoryDTO> ListToDTO(List<Category_tbl> categoryListDal)
        {
            List<CategoryDTO> List = new List<CategoryDTO>();
            foreach (Category_tbl c in categoryListDal)
            {
                CategoryDTO cateory = new CategoryDTO(c);
                List.Add(cateory);
            }
            return List;
        }


        public CategoryDTO()
        {

        }
        public CategoryDTO(DAL.Category_tbl category)
        {
            this.CategoryCode = category.CategoryCode;
            this.CategoryName = category.CategoryName;
            this.GroomOrBride = category.GroomOrBride;
            this.AverageDuration = category.AverageDuration;
        }

        public static Category_tbl ToDAL(CategoryDTO c)
        {
            return new Category_tbl
            {
                CategoryCode=c.CategoryCode,
                CategoryName = c.CategoryName,
                GroomOrBride = c.GroomOrBride,
                AverageDuration = c.AverageDuration
            };

        }
    }
}
