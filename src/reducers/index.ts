/* eslint-disable no-param-reassign */
import { combineReducers, createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import * as actions from './actions';
import { IPost, IUser, IComment } from '../app/Global_Interface';

const postsAdapter = createEntityAdapter<IPost>();

export const allPosts = createReducer(
  postsAdapter.getInitialState({
    idPostEdit: 0,
  }),
  on(actions.addPost, (state, { post }: any) => postsAdapter.addOne(post, state)),
  on(actions.removePost, (state, { id }: any) => postsAdapter.removeOne(id, state)),
  on(actions.setPostOnEdit, (state, { id }: any) => ({
    ...state,
    idPostEdit: id,
  })),
  on(actions.changeDataPost, (state, { update }: any) => postsAdapter.updateOne(update, state)),
);

const usersAdapter = createEntityAdapter<IUser>();

export const allUsers = createReducer(
  usersAdapter.getInitialState(),
  on(actions.addUser, (state, { user }) => usersAdapter.addOne(user, state)),
  on(actions.changeDataUser, (state, { update }: any) => usersAdapter.updateOne(update, state)),
);

const commentsAdapter = createEntityAdapter<IComment>();

export const allComments = createReducer(
  commentsAdapter.getInitialState(),
  on(actions.addComment, (state, { comment }) => commentsAdapter.addOne(comment, state)),
);
export const reducer = combineReducers({
  allPosts,
  allUsers,
  allComments,
});
