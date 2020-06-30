import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import now from 'lodash/now';
import { ServiceCommentItem } from './comment.service';

@Component({
  selector: 'comment-form',
  template: `<form [formGroup]="formComment" (submit)="addComment()">
      <input type="text" formControlName="userName" placeholder="Введите имя пользователя" />
      <input type="text" formControlName="text" placeholder="Введите текст комментария" />
      <button type="submit">Добавить</button>
  </form>`,
  styles: [`:host {
    background-color: #3b61bd;
    width: 35%;
    height: 135px;
    display: block;
    margin: 0 0 0 35px;
    padding: 0 35px 0 35px;
    box-sizing: border-box;
  }`],
  providers: [ServiceCommentItem],
})

export class CommentForm {
  @Input() postId: number;

  @Input() commentsIds: number[];

  formComment: FormGroup;

  constructor(private serviceComment: ServiceCommentItem) {
    this.formComment = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      text: new FormControl('', Validators.required),
    });
  }

  addComment() {
    const { userName, text } = this.formComment.value;
    const comment = {
      id: now(),
      user: {
        id: now(),
        name: userName,
      },
      text,
    };
    const postChanges = {
      id: this.postId,
      changes: { comments: [...this.commentsIds, comment.id] },
    };
    this.serviceComment.addComment(comment, postChanges);
  }
}
