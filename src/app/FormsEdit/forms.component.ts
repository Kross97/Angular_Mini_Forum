import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import {
  IAppState,
  IPost,
  IUser,
  IComment,
} from '../Global_Interface';
import { PostsHttpService } from '../postHttp.service';
import forms from '../../styles/Forms/forms.scss';

@Component({
  selector: 'forms-edit',
  template: `<div class=${forms.container}>
   <form class=${forms.formItem} [formGroup]="formEditPost" (submit)="changeDataPost()" novalidate>
    <p>Форма редактирования поста</p>
    <label>Имя пользователя:
      <input type="text" formControlName="userName" />
    </label>
    <label>Тема:
      <input type="text" formControlName="thema" />
    </label>
    <label>Текст поста:
      <input type="text" formControlName="text" />
    </label>
    <button type="reset">Сбросить</button>
    <button type="submit">Изменить</button>
   </form>
   <form class=${forms.formItem} [formGroup]="formEditComment"  (submit)="changeDataComment()" novalidate>
    <p>Форма редактирования комментария</p>
    <label>Имя пользователя:
      <input type="text" formControlName="userName" />
    </label>
    <label>Текст комментария:
      <input type="text" formControlName="text" />
    </label>
    <button type="submit">Изменить</button>
   </form>
  </div>`,
})

export class FormsEditComponent {
  formEditPost: FormGroup;

  formEditComment: FormGroup;

  private postData: IPost = null;

  private userPostData: IUser = null;

  private commentData: IComment = null;

  private userCommentData: IUser = null;

  constructor(store: Store<{ state: IAppState }>, private postsService: PostsHttpService) {
    store.pipe(select((allState) => allState.state)).subscribe(({ allPosts, allUsers }) => {
      if (allPosts.idPostEdit !== 0) {
        this.postData = allPosts.entities[allPosts.idPostEdit];
        this.userPostData = allUsers.entities[this.postData.user];
        this.initFormEditPost(this.userPostData.name, this.postData.thema, this.postData.text);
      } else {
        this.initFormEditPost('', '', '');
      }
    });

    store.pipe(select((allState) => allState.state)).subscribe(({ allComments, allUsers }) => {
      if (allComments.idCommentEdit !== 0) {
        this.commentData = allComments.entities[allComments.idCommentEdit];
        this.userCommentData = allUsers.entities[this.commentData.user];
        this.initFormEditComment(this.userCommentData.name, this.commentData.text);
      } else {
        this.initFormEditComment('', '');
      }
    });
  }

  changeDataPost() {
    const { userName, thema, text } = this.formEditPost.value;
    this.postsService.changeDataPost(
      this.postData.id,
      this.userPostData.id, {
        userName,
        thema,
        text,
      },
    );
    this.initFormEditPost('', '', '');
  }

  changeDataComment() {
    const { userName, text } = this.formEditComment.value;
    this.postsService.changeDataComment(
      this.commentData.id,
      this.userCommentData.id, {
        text,
        userName,
      },
    );
    this.initFormEditComment('', '');
  }

  private initFormEditPost(userName: string, thema: string, text: string) {
    this.formEditPost = new FormGroup({
      userName: new FormControl(userName, [Validators.required, Validators.maxLength(11)]),
      thema: new FormControl(thema, [Validators.required, Validators.maxLength(11)]),
      text: new FormControl(text, Validators.required),
    });
  }

  private initFormEditComment(userName: string, text: string) {
    this.formEditComment = new FormGroup({
      userName: new FormControl(userName, [Validators.required, Validators.maxLength(11)]),
      text: new FormControl(text, Validators.required),
    });
  }
}
