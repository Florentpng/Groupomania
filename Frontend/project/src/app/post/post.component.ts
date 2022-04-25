import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  private urlExistProfile = "http://localHost:3000/api/profile/exist/";
  private urlProfile = "http://localHost:3000/api/profile/";
  private urlCreateProduct = "http://localHost:3000/api/product/create";
  
  posts : any;

  image: string = "false"

  profileUrl: string = ''

  file: any;

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

  constructor(private route: ActivatedRoute, private httpService: HttpService, private http: HttpClient) {}

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

  onFileSelected(event: any) {
		this.file = event.target.files[0];
    this.image = "true"
  }
  ngOnPost() {
    if (this.formTitle === '' || this.formMessage === '') {
      alert("All posts must have a title and a message.")
      location.reload();
    } else {
      var date = (new Date(this.date)).toUTCString();

    const formData = new FormData();
    if (this.image === "true") {
      formData.append('multimedia', this.file, this.file.name );
    }
    formData.append('userId', this.userId );
    formData.append('title', this.formTitle );
    formData.append('message', this.formMessage );
    formData.append('name', this.name );
    formData.append('lastName', this.lastName );
    formData.append('date', date );
    
    this.http.post(this.urlCreateProduct, formData, {observe: 'response'} ).subscribe((response) => { this.posts = response;
      if (this.posts.status == 201) {
        window.location.href='../groupomania?userId='+ this.userId +'';
    }},
    (error) => { console.log(error) })
    }
    
  }

  ngSetUrl() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'],
      this.profileUrl = '../profile?userId='+ this.userId +''
    });
  }
}