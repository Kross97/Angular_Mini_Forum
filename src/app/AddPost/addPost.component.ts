import {
  Component,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import now from 'lodash/now';
import addPost from '../../styles/AddPost/addPosts.scss';
import { ServiceAddPost } from './addPost.service';
// import { IPost } from '../Global_Interface';

@Component({
  selector: 'add-post',
  template: `<div (click)="changeStateShowForm()" class=${addPost.background}></div>
  <form [formGroup]="myForm" novalidate (submit)="submitPost()" class=${addPost.container}>
    <input class=${addPost.inputAdd} name="userName" type="text" placeholder="Введите имя пользователя" formControlName="userName" />
    <span *ngIf="myForm.controls['userName'].invalid && myForm.controls['userName'].touched">Имя неккоректно!</span>
    <input class=${addPost.inputAdd} name="thema" type="text" placeholder="Введите тему" formControlName="thema" />
    <span *ngIf="myForm.controls['thema'].invalid && myForm.controls['thema'].touched">Тема неккоректна!</span>
    <textarea class=${addPost.textAdd} name="text"  placeholder="Введите текст" formControlName="text"></textarea>
    <span *ngIf="myForm.controls['text'].invalid && myForm.controls['text'].touched">Текст неккоректен!</span>
    <button class=${addPost.btnReset} type="reset">Сбросить</button>
    <button [disabled]="myForm.invalid" [ngClass]="{ ${addPost.btnAdd}: true, ${addPost.btnDisabled}: myForm.invalid}" type="submit">Добавить</button>
  </form>`,
  styles: [`
    input.ng-touched.ng-invalid, textarea.ng-touched.ng-invalid {border:solid red 2px;}
    input.ng-touched.ng-valid, textarea.ng-touched.ng-valid {border:solid green 2px;}
`],
  providers: [ServiceAddPost],
})

export class AddPost {
  private myForm: FormGroup;

  constructor(private dataService: ServiceAddPost) {
    this.myForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      thema: new FormControl('', [Validators.required, Validators.maxLength(11)]),
      text: new FormControl('', Validators.required),
    });
  }

  @Output() onChangeStateShowForm = new EventEmitter();

  public changeStateShowForm() {
    this.onChangeStateShowForm.emit();
  }

  public submitPost() {
    const post: any = {
      id: now(),
      thema: this.myForm.value.thema,
      text: this.myForm.value.text,
      user: {
        id: now(),
        name: this.myForm.value.userName,
      },
      comments: [],
    };

    this.dataService.addPost(post);
    this.onChangeStateShowForm.emit();
  }
}
