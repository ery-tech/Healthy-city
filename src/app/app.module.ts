import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatCardModule} from '@angular/material/card';
import { AuthenticatorComponent } from './components/authenticator/authenticator.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import {MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CommentsComponent } from './components/comments/comments.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AuthenticatorComponent,
    ProfileComponent,
    ProfilesComponent,
    CreateUserComponent,
    PostsComponent,
    CreatePostComponent,
    CommentsComponent,
    PaginationComponent,
    SpinnerComponent,
    SnackBarComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
    MatCardModule,
    HttpClientModule,
    MatTooltipModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,

    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    AppRoutingModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [SnackBarComponent,{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHeadersInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  }, { provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
