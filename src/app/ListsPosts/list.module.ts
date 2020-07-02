import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list.component';
import { PostItem } from './post.component';
import { UserPipe } from './post.pipe';
import { CommentForm } from './commentForm.component';
import { CommentItem } from './commentItem.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [ListComponent, PostItem, UserPipe, CommentForm, CommentItem],
  exports: [ListComponent],
})
export class ListModule { }
