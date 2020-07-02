using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ServerApp.Models
{
    public class Comment
    {
        [Key]
        public int id { get; set; }

        public string text { get; set; }

        public int userid { get; set; }
        [ForeignKey("userid")]
        public virtual User user { get; set; }

        [ForeignKey("Post")]
        public int? postid { get; set; }

    }
}
