//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class BusinessOpeningHours_tbl
    {
        public int BusinessOpeningHourCode { get; set; }
        public Nullable<int> BusinessCode { get; set; }
        public Nullable<System.TimeSpan> StartHour { get; set; }
        public string DayInWeek { get; set; }
        public Nullable<System.TimeSpan> EndHour { get; set; }
    
        public virtual Business_tbl Business_tbl { get; set; }
    }
}
