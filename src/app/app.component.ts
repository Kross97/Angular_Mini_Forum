import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<nav-header (onChangeStateShowForm)="changeStateShowForm()"></nav-header>
  <list-posts></list-posts>
  <forms-edit></forms-edit>
  <add-post (onChangeStateShowForm)="changeStateShowForm()" *ngIf="isShowFormAdd"></add-post>
  `,
  styles: [`:host {
      width: 100%;
      display: inline-block;
      height: 937px;
      background-color: #17212b;
      position: relative;
  }`],
})

export class AppComponent {
  public isShowFormAdd: boolean = false;

  public changeStateShowForm() {
    this.isShowFormAdd = !this.isShowFormAdd;
  }
}
