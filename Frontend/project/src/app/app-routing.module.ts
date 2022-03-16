import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { GroupomaniaComponent } from './groupomania/groupomania.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path: 'register',
    component: AuthentificationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'groupomania',
    component: GroupomaniaComponent
  },
  {
    path: 'post',
    component: PostComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }