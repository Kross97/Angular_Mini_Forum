import { Component, Output, EventEmitter } from '@angular/core';
import head from '../../styles/Header.scss';

@Component({
  selector: 'nav-header',
  template: `<header class=${head.container}>
    <button (click)="changeShowState()" type="button">Добавить пост</button>
    <aside></aside>
  </header>`,
})

export class HeaderComponent {
  @Output() onChangeStateShowForm = new EventEmitter();

  changeShowState() {
    this.onChangeStateShowForm.emit();
  }
}
