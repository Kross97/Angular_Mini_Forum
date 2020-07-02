using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ServerApp.Filters
{
    public class AddCookieVisit : Attribute, IResourceFilter
    {
        public void OnResourceExecuted(ResourceExecutedContext context)
        {

        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            context.HttpContext.Response.Cookies.Append("LastVisit", DateTime.Now.ToString());
            context.HttpContext.Response.Cookies.Append("Kross97", "https://github.com/Kross97");
            context.HttpContext.Response.Headers.Add("ReactJS", "ASP.NET CORE");
        }
    }
}
