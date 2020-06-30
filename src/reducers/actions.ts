import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IPost, IUser } from '../app/Global_Interface';

// POSTS
export const addPost = createAction('addPost', props<{ post: { id: number, user: number, thema: string, text: string } }>());

export const removePost = createAction('removePost', props<{ id: number }>());

export const setPostOnEdit = createAction('setPostOnEdit', props<{ id: number }>());

export const changeDataPost = createAction('changeDataPost', props<{ update: Update<IPost>}>());

// USERS
export const addUser = createAction('addUser', props<{ user: { id: number, name: string }}>());

export const changeDataUser = createAction('changeDataUser', props<{ update: Update<IUser>}>());

// Comments

export const addComment = createAction('addComment', props<{ comment: { id: number, user: number, text: string }}>());
