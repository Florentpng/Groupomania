import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  private urlExistProfile = "http://localHost:3000/api/profile/exist/";
  private urlProfile = "http://localHost:3000/api/profile/";

  posts : any;

  profileUrl: string = ''

  userId: string = '';
  connected: boolean = false;
  click: number = 0;
  exist: boolean = false;

  date = new Date();
  formTitle: string = '';
  formMessage: string = '';
  formImageUrl: string = '';

  name: string = '';
  lastName: string = '';

  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit() {
    this.ngGetUserId(),
    this.ngSetUrl(),
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

  ngGetProfile() {
    this.httpService.getProfile(this.urlProfile + this.userId).subscribe(
      (response) => {
        this.posts = response; 
        this.name = response.name;
        this.lastName = response.lastName;
      },
      (error) => { console.log(error);});
  }

  ngOnPost() {
    this.httpService.getCreateProduct(this.userId, this.formTitle, this.formMessage, this.formImageUrl, this.date, this.name, this.lastName).subscribe(
      (response) => { this.posts = response; 
        if (this.posts.status == 201) {
          window.location.href='../groupomania?userId='+ this.userId +'';
      }},
      (error) => { console.log(error); });
  }

  ngSetUrl() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'],
      this.profileUrl = '../profile?userId='+ this.userId +''
    });
  }
}