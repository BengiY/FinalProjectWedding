using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Cors;


namespace WebApplication1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/mail")]
    public class MailController : ApiController
    {
        bool itOk=false;
        public class MailObject
        {
            public string toMail { get; set; }
            public string subject { get; set; }
            public string message { get; set; }
        }
        public Boolean SendMailF(MailObject data) {
            string myMail = "weddingschedule012@gmail.com‏";
            string myPassoword = "wedding012";
            try
            {
                SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
                client.EnableSsl = true;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(myMail, myPassoword);
                MailMessage mm = new MailMessage(myMail, data.toMail, data.subject, data.message);
                client.Send(mm);
                this.itOk = true;
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception caught in CreateTestMessage2(): {0}",
                    ex.ToString());
                return false;
            }
        }
        [HttpPost]
        [Route("sendMail")]
        public Boolean SendMail(MailObject data)
        {
            ThreadStart threadStart = delegate () { SendMailF(data); };
            Thread thread = new Thread(threadStart);
            thread.Start();
            if (this.itOk)
            {
                return true;
            }
            else
                return false;
     
        }
    }
}
