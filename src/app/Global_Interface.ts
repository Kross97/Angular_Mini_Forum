import { reducer } from '../reducers';

export type IAppState = ReturnType<typeof reducer>;

export interface IUser {
  id: number,
  name: string,
}

export interface IPost {
  id: number,
  thema: string,
  text: string,
  user: number,
  comments: number[],
}

export interface IComment {
  id: number,
  user: number,
  text: string,
}
