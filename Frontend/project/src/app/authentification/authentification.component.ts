import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  email: string = '';
  password: string = '';

  posts : any;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    
  }

  ngOnPost() {
    if (this.email.includes("@")) {
      this.httpService.getPostsRegister(this.email, this.password).subscribe(
          (response) => { this.posts = response;
            if (this.posts.status == 201) {
            window.location.href="../login"
            }
            
          },
          (error) => { if (error.status == 400) {
            alert("This email is already taken !")
          }});
    }
    else {
      alert("This email isn't correct. exemple: exemple@gmail.com")
    }
  }
}
