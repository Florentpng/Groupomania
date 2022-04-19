import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  posts : any;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    
  }

  ngOnPost() {
    this.httpService.getPostsLogin(this.email, this.password).subscribe(
      (response) => { this.posts = response;
        if (this.posts.status == 200) {
        window.location.href='../groupomania?userId='+ this.posts.body.userId +'';
      }},
    (error) => { console.log(error); });
  }
}
