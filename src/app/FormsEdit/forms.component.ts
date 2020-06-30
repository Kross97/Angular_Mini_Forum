import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IAppState, IPost, IUser } from '../Global_Interface';
import * as actions from '../../reducers/actions';
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
   <form class=${forms.formItem} [formGroup]="formEditComment" novalidate>
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

  private userData: IUser = null;

  constructor(private store: Store<{ state: IAppState }>) {
    store.pipe(select((allState) => allState.state)).subscribe(({ allPosts, allUsers }) => {
      if (allPosts.idPostEdit !== 0) {
        this.postData = allPosts.entities[allPosts.idPostEdit];
        this.userData = allUsers.entities[this.postData.user];
        this.initFormEditPost(this.userData.name, this.postData.thema, this.postData.text);
      } else {
        this.initFormEditPost('', '', '');
      }
      this.initFormEditComment();
    });
  }

  changeDataPost() {
    const { userName, thema, text } = this.formEditPost.value;
    this.store.dispatch(actions.changeDataPost({
      update: {
        id: this.postData.id,
        changes: { thema, text },
      },
    }));

    this.store.dispatch(actions.changeDataUser({
      update: {
        id: this.userData.id,
        changes: { name: userName },
      },
    }));
    this.initFormEditPost('', '', '');
  }

  private initFormEditPost(userName: string, thema: string, text: string) {
    this.formEditPost = new FormGroup({
      userName: new FormControl(userName, [Validators.required, Validators.maxLength(11)]),
      thema: new FormControl(thema, [Validators.required, Validators.maxLength(11)]),
      text: new FormControl(text, Validators.required),
    });
  }

  private initFormEditComment() {
    this.formEditComment = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      text: new FormControl('', Validators.required),
    });
  }
}
