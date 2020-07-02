import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { HeaderModule } from './HeaderComponent/header.module';
import { ListModule } from './ListsPosts/list.module';
import { FormsEditModule } from './FormsEdit/forms.module';
import { AddPost } from './AddPost/addPost.component';
import { reducer } from '../reducers';
import { PostsHttpService } from './postHttp.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HeaderModule,
    ListModule,
    ReactiveFormsModule,
    FormsEditModule,
    HttpClientModule,
    StoreModule.forRoot({ state: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      features: {
        pause: false,
        lock: true,
        persist: true,
      },
    }),
  ],
  providers: [PostsHttpService],
  declarations: [AppComponent, AddPost],
  bootstrap: [AppComponent],
})
export class AppModule {}
