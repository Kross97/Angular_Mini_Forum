using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ServerApp.Models
{
    public class PostsContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Comment> Comments { get; set; }
        

        public PostsContext(DbContextOptions<PostsContext> options) : base(options)
        {
                Database.EnsureCreated();            
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>().HasData(new User
            {
                id = 1,
                name = "Кирилл",
            }, new User
            {
                id = 2,
                name = "Владимир",
            });

            modelBuilder.Entity<Comment>().HasData(new Comment
            {
                id = 1,
                text = "Полезная информация!",
                userid = 2,
                postid = 1,
            });

            modelBuilder.Entity<Post>().HasData(new Post
            {
                id = 1,
                text = "/Информация о работе с ASP.NET CORE/",
                thema = "ASP.NET CORE",
                userid = 1,
            });
        }
    }
}
