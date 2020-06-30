import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { normalize, schema } from 'normalizr';
import { IAppState } from '../Global_Interface';
import * as actions from '../../reducers/actions';

const userSchema = new schema.Entity('users');

const postSchema = new schema.Entity('posts', {
  user: userSchema,
});

@Injectable()
export class ServiceAddPost {
  constructor(private store: Store<{ state: IAppState }>) {}

  addPost(post: any) {
    const data = normalize(post, postSchema);
    this.store.dispatch(actions.addPost({ post: data.entities.posts[post.id] }));
    this.store.dispatch(actions.addUser({ user: data.entities.users[post.user.id] }));
  }
}
