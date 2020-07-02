import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { normalize, schema } from 'normalizr';
import { IAppState, IComment } from './Global_Interface';
import * as actions from '../reducers/actions';

const userSchema = new schema.Entity('users');

const commentSchema = new schema.Entity('comments', {
  user: userSchema,
});

const postSchema = new schema.Entity('posts', {
  user: userSchema,
  comments: [commentSchema],
});

@Injectable()
export class PostsHttpService {
  constructor(private store: Store<{ state: IAppState }>, private httpServer: HttpClient) {}

  changeDataPost(postId: number, userId: number, { thema, text, userName }: any) {
    this.store.dispatch(actions.changeDataPost({
      update: {
        id: postId,
        changes: { thema, text },
      },
    }));

    this.store.dispatch(actions.changeDataUser({
      update: {
        id: userId,
        changes: { name: userName },
      },
    }));
    this.httpServer.patch(`http://localhost:44303/api/posts/patchpost/${postId}`, { thema, text, user: { name: userName } }).subscribe();
  }

  removePost(id: number, userId: number) {
    this.httpServer.delete(`http://localhost:44303/api/posts/deletepost/${id}`).subscribe();
    this.store.dispatch(actions.setPostOnEdit({ id: 0 }));
    this.store.dispatch(actions.removePost({ id, userId }));
  }

  changeDataComment(commentId: number, userId: number, { text, userName }: any) {
    this.store.dispatch(actions.changeDataComment({
      update: {
        id: commentId,
        changes: {
          text,
        },
      },
    }));

    this.store.dispatch(actions.changeDataUser({
      update: {
        id: userId,
        changes: {
          name: userName,
        },
      },
    }));
    this.httpServer.patch(`http://localhost:44303/api/posts/patchcomment/${commentId}`, { text, user: { name: userName } }).subscribe();
  }

  removeComment(comment: IComment, commentsIds: number[], postId: number) {
    this.httpServer.delete(`http://localhost:44303/api/posts/deletecomment/${comment.id}`).subscribe();
    this.store.dispatch(actions.setCommentOnEdit({ id: 0 }));
    this.store.dispatch(actions.changeDataPost({
      update: {
        id: postId,
        changes: {
          comments: commentsIds.filter((idComm) => idComm !== comment.id),
        },
      },
    }));
    this.store.dispatch(actions.removeComment({ id: comment.id, userId: comment.user }));
  }

  getPosts() {
    this.httpServer.get('http://localhost:44303/api/posts/getposts').subscribe((data) => {
      const stateNormalize = normalize(data, [postSchema]);
      console.log('Данные с сервера: ', stateNormalize);
      this.store.dispatch(actions.loadingPosts({
        posts: Object.values(stateNormalize.entities.posts),
      }));
      this.store.dispatch(actions.loadingUsers({
        users: Object.values(stateNormalize.entities.users),
      }));
      this.store.dispatch(actions.loadingComments({
        comments: Object.values(stateNormalize.entities.comments),
      }));
    });
  }
}
