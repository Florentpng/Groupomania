import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GroupomaniaComponent } from './groupomania/groupomania.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupomaniaComponent,
    AuthentificationComponent,
    LoginComponent,
    ProfileComponent,
    PostComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
