import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { delay } from 'rxjs/operators';
import { IAppState, IUser } from '../Global_Interface';
import * as actions from '../../reducers/actions';
import post from '../../styles/List/post.scss';

@Component({
  selector: 'post-item',
  template: `<div (click)="setPostOnEdit(id)">
   <div class=${post.dataPost}>
     <span>{{user | isUser}}</span>
     <span>{{thema}}</span>
   </div>
    <p class=${post.text}>{{text}}</p>
    <button class=${post.btnRemove} (click)="removePost(id)" type="button"></button>
    <button class=${post.btnAddComment} (click)="showFormAddComment($event)" type="button">Добавить комментарий</button>
    <button *ngIf="comments.length !== 0" class=${post.btnAddComment} (click)="showAllComments($event)" type="button">Посмотреть комментарии</button>
    <div *ngIf="isShowAllComments">
      <p *ngFor="let comment of comments">
        <span>{{comment.text}}</span>
      </p>
    </div>
    <comment-form
    [commentsIds]="commentsIds"
    [postId]="id"
    *ngIf="isShowFormComment"
    ></comment-form>
  <div>`,
  styles: [`:host {
    width: 790px;
    display: block;
    background-color: #4082bc;
    border: 6px solid #fff;
    border-radius: 18px;
    position: relative;
    font-size: 39px;
    color: seashell;
  }
  :host:hover {
    background-color: #18446a;
    cursor: pointer;
  }`],
})

export class PostItem {
  @Input() id: number;

  @Input() commentsIds: number[];

  comments: any = [];

  @Input() userId: number;

  user: IUser;

  @Input() thema: string = '';

  @Input() text: string = '';

  isShowFormComment: boolean = false;

  isShowAllComments: boolean = false;

  constructor(private store: Store<{ state: IAppState }>) {
    store.pipe(delay(5), select((allState) => allState.state))
      .subscribe(({ allUsers, allPosts, allComments }) => {
        this.user = allUsers.entities[this.userId];
        const currentPostComments = allPosts.entities[this.id].comments;
        this.comments = currentPostComments.map((idComm) => allComments.entities[idComm]);
        console.log('COMMENTS', this.comments);
      });
  }

  showFormAddComment(event: MouseEvent) {
    event.stopPropagation();
    this.isShowAllComments = false;
    this.isShowFormComment = !this.isShowFormComment;
  }

  showAllComments(event: MouseEvent) {
    event.stopPropagation();
    this.isShowFormComment = false;
    this.isShowAllComments = !this.isShowAllComments;
  }

  setPostOnEdit(id: number) {
    this.store.dispatch(actions.setPostOnEdit({ id }));
  }

  removePost(id: number) {
    this.store.dispatch(actions.removePost({ id }));
  }
}
