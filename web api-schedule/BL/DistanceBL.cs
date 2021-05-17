using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Security;
using System.Xml;

namespace BL
{
    public class DistanceBL
    {
        public static int CalcDistance(string origin, string destination)
        {

            string key = ConfigurationManager.AppSettings["GoogleKey"];
            string uri = "https://maps.googleapis.com/maps/api/distancematrix/xml?key="+key+"&origins="
                          + origin + "&destinations=" + destination + "&mode=driving&units=imperial&sensor=false";
            WebClient wc = new WebClient();
            try
            {
                string geoCodeInfo = wc.DownloadString(uri);
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.LoadXml(geoCodeInfo);

                string duration = xmlDoc.DocumentElement.SelectSingleNode("/DistanceMatrixResponse/row/element/duration/value").InnerText;
                return Convert.ToInt32(duration) / 60;
            }
            catch (Exception)
            {
                return -1;
            }
        }
    }
}
