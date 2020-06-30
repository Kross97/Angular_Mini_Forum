import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../Global_Interface';
import list from '../../styles/List/list.scss';

@Component({
  selector: 'list-posts',
  template: `<div class=${list.container}>
  <ul [ngStyle]="{'padding': '0 0 0 3px', 'margin': '31px 0 0 0'}" *ngIf="allPosts.length !==0">
     <post-item *ngFor="let post of allPosts"
     [id]="post.id"
     [userId]="post.user"
     [thema]="post.thema"
     [text]="post.text"
     [commentsIds]="post.comments"
     >
     </post-item>
  </ul>
  </div>`,
})

export class ListComponent {
  private allPostsStore: any;

  allPosts: any;

  constructor(store: Store<{ state: IAppState}>) {
    store.pipe(select('state')).subscribe((data: IAppState) => {
      this.allPostsStore = data.allPosts;
      this.allPosts = this.allPostsStore
        ? this.allPostsStore.ids.map((id: number) => this.allPostsStore.entities[id])
        : [];
    });
  }
}
