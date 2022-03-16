import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private urlDeleteProfile = "http://localHost:3000/api/profile/"
  private urlExistProfile = "http://localHost:3000/api/profile/exist/";
  private urlProfile = "http://localHost:3000/api/profile/";

  posts : any;

  next: number = 0;
  userId: string = '';
  created: number = 0;
  click: number = 0;
  exist: boolean = false;
  connected: boolean = false;

  formName: string = '';
  formLastName: string = '';
  formAge: number = 0;

  modifyName: string = '';
  modifyLastName: string = '';
  modifyAge: number = 0;

  name: string = '';
  lastName: string = '';
  age: number = 0;
  
  constructor(private route: ActivatedRoute, private httpService: HttpService) {}

  ngOnInit() {
    this.ngGetUserId(),
    this.ngGetExistProfile(),
    this.ngGetProfile()
  }

  ngGetUserId() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId']
    });
    if (this.userId != "undefined") {
      this.connected = true
    }
  }
  
  ngGetExistProfile() {
    this.httpService.getExistProfile(this.urlExistProfile + this.userId).subscribe(
      (response) => { this.posts = response; this.exist = response.exist},
      (error) => { console.log(error);});
  }

  ngOnPost() {
    this.httpService.getCreateProfile(this.userId, this.formName, this.formLastName, this.formAge).subscribe(
      (response) => { this.posts = response; 
        if (this.posts.status == 201) {
        this.created = 1;
        location.reload();
      }},
      (error) => { console.log(error); });
  }

  ngGetProfile() {
    this.httpService.getProfile(this.urlProfile + this.userId).subscribe(
      (response) => {
        this.posts = response; 
        this.name = response.name;
        this.lastName = response.lastName;
        this.age = response.age;
      },
      (error) => { console.log(error);});
  }

  ngOnDelete() {
    this.httpService.getDeleteProfile(this.urlDeleteProfile+ this.userId).subscribe(
      (response) => { this.posts = response;
        if (this.posts.status == 200) {
          location.reload();
        }
      },
      (error) => { console.log(error)}
    )
  }

  ngOnNext() {
    this.next = 1
  }

  ngOnModify() {
    this.httpService.getModifyProfile(this.urlDeleteProfile+ this.userId, this.userId, this.modifyName, this.modifyLastName, this.modifyAge).subscribe(
      (response) => { this.posts = response;
        if (this.posts.status == 200) {
          location.reload();
        }
      },
      (error) => { console.log(error)}
    )
  }
}