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
  on(actions.loadingPosts, (state, { posts }: any) => postsAdapter.setAll(posts, state)),
);

const usersAdapter = createEntityAdapter<IUser>();

export const allUsers = createReducer(
  usersAdapter.getInitialState(),
  on(actions.addUser, (state, { user }) => usersAdapter.addOne(user, state)),
  on(actions.changeDataUser, (state, { update }: any) => usersAdapter.updateOne(update, state)),
  on(actions.loadingUsers, (state, { users }: any) => usersAdapter.setAll(users, state)),
  on(actions.removeComment, actions.removePost,
    (state, { userId }: any) => usersAdapter.removeOne(userId, state)),
);

const commentsAdapter = createEntityAdapter<IComment>();

export const allComments = createReducer(
  commentsAdapter.getInitialState({
    idCommentEdit: 0,
  }),
  on(actions.loadingComments, (state, { comments }: any) => (
    commentsAdapter.setAll(comments, state))),
  on(actions.addComment, (state, { comment }) => commentsAdapter.addOne(comment, state)),
  on(actions.removeComment, (state, { id }: any) => commentsAdapter.removeOne(id, state)),
  on(actions.changeDataComment, (state, { update }) => commentsAdapter.updateOne(update, state)),
  on(actions.setCommentOnEdit, (state, { id }) => ({
    ...state,
    idCommentEdit: id,
  })),
);
export const reducer = combineReducers({
  allPosts,
  allUsers,
  allComments,
});
