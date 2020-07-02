using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;
using System.Diagnostics;
using System.Text.Json;
using System.Dynamic;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using ServerApp.Filters;

namespace ServerApp.Controllers
{
    [AddCookieVisit]
    public class PostsController : Controller
    {
        private PostsContext db;

        private ILogger<PostsController> logger;
        public PostsController(PostsContext context, ILogger<PostsController> logger)
        {
            this.logger = logger;
            db = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            logger.LogInformation($"Method GET / path: {Request.Path} / status: {Response.StatusCode}");
            return await db.Posts.ToListAsync();
        }

        [HttpPost]
        public async Task CreatePost([FromBody]Post post)
        {
           if(post != null)
            {
                db.Posts.Add(post);
                await db.SaveChangesAsync();
            }
            logger.LogInformation($"Method POST / path: {Request.Path} / status: {Response.StatusCode}");
        }

        [HttpPost]
        public async Task CreateComment(int id, [FromBody]Comment comment)
        {
            Post currentPost = db.Posts.Find(id);
            if (currentPost != null && comment != null)
            {
                currentPost.comments.Add(comment);
                db.Entry(currentPost).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
            logger.LogInformation($"Method POST / path: {Request.Path} / status: {Response.StatusCode}");
        }

        [HttpPatch]
        public async Task PatchPost(int id,[FromBody]Post post)
        {
            Post currentPost = db.Posts.Find(id);
            if (currentPost != null)
            {
                logger.LogInformation($"Entity Post ID:{currentPost.id} changes \n " +
                     $"\t property text: {currentPost.text} ---> {post.text} \n" +
                     $"\t property thema: {currentPost.thema} ---> {post.thema} \n" +
                     $"\t property userName: {currentPost.user.name} ---> {post.user.name} \n");
                currentPost.text = post.text;
                currentPost.thema = post.thema;
                currentPost.user.name = post.user.name;
                db.Entry(currentPost).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
            logger.LogInformation($"Method PATCH / path: {Request.Path} / status: {Response.StatusCode}");
        }

        [HttpPatch]
        public async Task PatchComment(int id,[FromBody]Comment comment)
        {
            Comment currentComment = db.Comments.Find(id);
            if (currentComment != null)
            {
                logger.LogInformation($"Entity Comment ID:{currentComment.id} changes \n " +
                 $"\t property text: {currentComment.text} ---> {comment.text} \n" +
                 $"\t property userName: {currentComment.user.name} ---> {comment.user.name} \n");
                currentComment.text = comment.text;
                currentComment.user.name = comment.user.name;
                db.Entry(currentComment).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
            logger.LogInformation($"Method PATCH / path: {Request.Path} / status: {Response.StatusCode}");
        }

        [HttpDelete]
        public async Task DeletePost(int id)
        {
            Post currentPost = db.Posts.Find(id);
            if(currentPost != null)
            { 
                db.Users.RemoveRange(currentPost.comments.Select(comment => comment.user));
                db.Comments.RemoveRange(currentPost.comments);
                db.Users.Remove(currentPost.user);
                db.Posts.Remove(currentPost);
                await db.SaveChangesAsync();
            }

            logger.LogInformation($"Method DELETE / path: {Request.Path} / status: {Response.StatusCode}");
        }
        
        [HttpDelete]
        public async Task DeleteComment(int id)
        {
            Comment currentComment = db.Comments.Find(id);
            if(currentComment != null)
            {
                db.Users.Remove(currentComment.user);
                db.Comments.Remove(currentComment);
                await db.SaveChangesAsync();
            }
            logger.LogInformation($"Method DELETE / path: {Request.Path} / status: {Response.StatusCode}");
        }

    }
}
