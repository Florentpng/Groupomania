import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-groupomania',
  templateUrl: './groupomania.component.html',
  styleUrls: ['./groupomania.component.scss']
})
export class GroupomaniaComponent implements OnInit {

  private urlDeleteProduct = "http://localHost:3000/api/product/"

  
  postUrl: string = ''

  posts : any;

  product : any;
  products : any;

  modifyMessage: string = '';
  modifyTitle: string = '';

  comments: any;
  next: {} = "";

  userId: string = '';
  
  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit() {
    this.ngGetAllProduct(),
    this.ngSetUrl()
  }
  
  ngGetUserId() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId']
    });
  }

  ngGetAllProduct() {
    this.httpService.getAllProduct().subscribe(
      (response) => { this.products = response.body; console.log(this.products)},
      (error) => { console.log(error);});
  }

  ngOnDelete(productId: any, userId: any) {
    if (userId = this.userId) {
      this.httpService.getDeleteProduct(this.urlDeleteProduct + productId).subscribe(
        (response) => { this.posts = response;
          if (this.posts.status == 200) {
            location.reload();
          }
        },
        (error) => { console.log(error)}
      );
    }
  }

  ngSetUrl() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'],
      this.postUrl = '../post?userId='+ this.userId +''
    });
  }

  ngOnComment(productId: any) {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'],
      window.location.href='../comment?userId='+ this.userId +'&productId='+ productId +''
    });
  }

  ngOnModify(commentId: any, userId: any) {
    this.next = commentId
  }

  ngOnPostModify(product: any, productId: any) {
    if (this.modifyTitle === '') {
      this.modifyTitle = product.title
    }
    if (this.modifyMessage === '') {
      this.modifyMessage = product.message
    }
    this.httpService.getModifyProduct(this.urlDeleteProduct + productId, product, this.modifyMessage, this.modifyTitle).subscribe(
      (response) => { this.posts = response; 
        if (this.posts.status == 200) {
          location.reload();
      }},
      (error) => { console.log(error); }
    );
  }
}