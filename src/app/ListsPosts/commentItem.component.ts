import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { delay } from 'rxjs/operators';
import { IAppState, IUser, IComment } from '../Global_Interface';
import comment from '../../styles/List/comment.scss';
import * as actions from '../../reducers/actions';
import { PostsHttpService } from '../postHttp.service';

@Component({
  selector: 'comment-item',
  template: `<div class=${comment.container} (click)="setCommentEdit($event)">
   <span>{{ commentUser | isUser }}</span>
   <span>{{ comment.text }}</span>
   <button (click)="removeComment()" type="button"></button>
  </div>`,
  styles: [`:host {
    height: 140px;
    display: block;
    border: 2px solid antiquewhite;
    margin: 12px;
    border-radius: 10px;
    padding: 11px 0 0 30px;
    box-sizing: border-box;
    position: relative;
  }
  :host:hover {
    background-color: #4082bc;
    cursor: pointer;
  }
  `],
})
export class CommentItem {
  @Input() comment: IComment;

  @Input() commentsIds: number[];

  @Input() postId: number;

  commentUser: IUser;

  constructor(private store: Store<{ state: IAppState }>, private postService: PostsHttpService) {
    store.pipe(delay(5), select((allState) => allState.state.allUsers))
      .subscribe(({ entities }) => {
        this.commentUser = entities[this.comment.user];
      });
  }

  removeComment() {
    this.postService.removeComment(this.comment, this.commentsIds, this.postId);
  }

  setCommentEdit(event: MouseEvent) {
    event.stopPropagation();
    this.store.dispatch(actions.setCommentOnEdit({ id: this.comment.id }));
  }
}
