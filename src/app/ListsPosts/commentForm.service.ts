import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { normalize, schema } from 'normalizr';
import omit from 'lodash/omit';
import { PostsHttpService } from '../postHttp.service';
import { IAppState } from '../Global_Interface';
import * as actions from '../../reducers/actions';

const userSchema = new schema.Entity('users');

const commentSchema = new schema.Entity('comments', {
  user: userSchema,
});

@Injectable()
export class ServiceCommentItem {
  constructor(
    private store: Store<{ state: IAppState }>,
    private httpServer: HttpClient,
    private postService: PostsHttpService,
  ) {}

  addComment(comment: any, postChanges: any) {
    const commentForServer = omit(comment, ['id', 'user.id']);
    this.httpServer.post(`http://localhost:44303/api/posts/createcomment/${postChanges.id}`, commentForServer).subscribe();
    const dataComment = normalize(comment, commentSchema);
    this.store.dispatch(actions.addComment({ comment: dataComment.entities.comments[comment.id] }));
    this.store.dispatch(actions.addUser({ user: dataComment.entities.users[comment.user.id] }));
    this.store.dispatch(actions.changeDataPost({ update: postChanges }));
    setTimeout(() => this.postService.getPosts.call(this.postService), 400);
  }
}
