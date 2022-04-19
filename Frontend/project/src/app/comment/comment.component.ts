import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  private urlExistProfile = "http://localHost:3000/api/profile/exist/";
  private urlProfile = "http://localHost:3000/api/profile/";

  private urlProduct = "http://localHost:3000/api/product/";

  private urlAllComment = "http://localHost:3000/api/comment/";
  private urlDeleteComment = "http://localHost:3000/api/comment/"
  private urlModifyComment = "http://localHost:3000/api/comment/"

  posts : any;
  comments: any;
  product : any;

  profileUrl: string = ''

  modifyMessage: string = '';
  
  connected: boolean = false;
  exist: boolean = false;

  productId: string = '';

  next: {} = "";

  name: string = '';
  lastName: string = '';
  title: string = '';
  date: string = '';
  message: string = '';

  userId: string = '';
  CommentName: string = '';
  CommentLastName: string = '';
  CommentDate = new Date();
  formMessage: string = '';
  CommentAge: number = 0;

  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {
    this.ngGetUserId(),
    this.ngGetProductId(),
    this.ngGetExistProfile(),
    this.ngGetProfile(),
    this.ngGetAllComment(),
    this.ngSetUrl(),
    this.ngGetProduct()
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
        this.CommentName = response.name;
        this.CommentLastName = response.lastName;
        this.CommentAge = response.age;
      },
      (error) => { console.log(error);});
  }


  ngGetProductId() {
    this.route.queryParams.subscribe(params => {
      this.productId = params['productId']
    });
  }

  ngGetUserId() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId']
    });
    if (this.userId != "undefined") {
      this.connected = true
    }
  }
  
  ngGetProduct() {
    this.httpService.getProduct(this.urlProduct + this.productId).subscribe(
      (response) => {
        this.posts = response;
        this.title = response.title;
        this.lastName = response.lastName;
        this.date = response.date;
        this.message = response.message;
        this.name = response.name;
      },
      (error) => { console.log(error);});
  }

  ngSetUrl() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'],
      this.profileUrl = '../profile?userId='+ this.userId +''
    });
  }

  ngGetAllComment() {
    this.httpService.getAllComment(this.urlAllComment + this.productId).subscribe(
      (response) => { this.comments = response.body;},
      (error) => { console.log(error);});
  }

  ngOnPost() {
    if (this.formMessage === '') {
      alert("You can't send a blank message")
    }
    else {
      this.httpService.getCreateComment(this.userId, this.formMessage, this.CommentLastName, this.CommentDate, this.CommentName, this.productId).subscribe(
      (response) => { this.posts = response; 
        if (this.posts.status == 201) {
          location.reload();
      }},
      (error) => { console.log(error); });
    }
  }

  ngOnModify(commentId: any, userId: any) {
      this.next = commentId
  }

  ngOnPostModify(comment: any, commentId: any) {
    if (this.modifyMessage === '') {
      this.modifyMessage = comment.message
    }
    this.httpService.getModifyComment(this.urlModifyComment + commentId, comment, this.modifyMessage,).subscribe(
      (response) => { this.posts = response; 
        if (this.posts.status == 200) {
          location.reload();
      }},
      (error) => { console.log(error); });
  }

  ngOnDelete(commentId: any, userId: any) {
    if (userId = this.userId) {
      this.httpService.getDeleteComment(this.urlDeleteComment + commentId).subscribe(
        (response) => { this.posts = response;
          if (this.posts.status == 200) {
            location.reload();
          }
        },
        (error) => { console.log(error)}
      );
    }
  }
}
