import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { normalize, schema } from 'normalizr';
import { IAppState } from '../Global_Interface';
import * as actions from '../../reducers/actions';

const userSchema = new schema.Entity('users');

const commentSchema = new schema.Entity('comments', {
  user: userSchema,
});

@Injectable()
export class ServiceCommentItem {
  constructor(private store: Store<{ state: IAppState }>) {}

  addComment(comment: any, postChanges: any) {
    const dataComment = normalize(comment, commentSchema);
    this.store.dispatch(actions.addComment({ comment: dataComment.entities.comments[comment.id] }));
    this.store.dispatch(actions.addUser({ user: dataComment.entities.users[comment.user.id] }));
    this.store.dispatch(actions.changeDataPost({ update: postChanges }));
  }
}
