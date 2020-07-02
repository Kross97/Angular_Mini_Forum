import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { normalize, schema } from 'normalizr';
import omit from 'lodash/omit';
import { PostsHttpService } from '../postHttp.service';
import { IAppState } from '../Global_Interface';
import * as actions from '../../reducers/actions';

const userSchema = new schema.Entity('users');

const postSchema = new schema.Entity('posts', {
  user: userSchema,
});

@Injectable()
export class ServiceAddPost {
  constructor(
    private store: Store<{ state: IAppState }>,
    private postsService: PostsHttpService,
    private httpServer: HttpClient,
  ) {}

  addPost(post: any) {
    const postForServer = omit(post, ['id', 'user.id']);
    this.httpServer.post('http://localhost:44303/api/posts/createpost', postForServer).subscribe();
    const data = normalize(post, postSchema);
    this.store.dispatch(actions.addPost({ post: data.entities.posts[post.id] }));
    this.store.dispatch(actions.addUser({ user: data.entities.users[post.user.id] }));
    setTimeout(() => this.postsService.getPosts.call(this.postsService), 400);
  }
}
