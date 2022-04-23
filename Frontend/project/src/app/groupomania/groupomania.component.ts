import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-groupomania',
  templateUrl: './groupomania.component.html',
  styleUrls: ['./groupomania.component.scss']
})
export class GroupomaniaComponent implements OnInit {

  private urlDeleteProduct = "http://localHost:3000/api/product/"
  private urlModifyProduct = "http://localHost:3000/api/product/"
  private urlDeleteComment = "http://localHost:3000/api/comment/"

  postUrl: string = ''

  image: string = "false"
  deleteImage = "false"

  file: any;

  posts : any;

  product : any;
  products : any;

  modifyMessage: string = '';
  modifyTitle: string = '';

  comments: any;
  next: {} = "";

  userId: string = '';
  
  constructor(private route: ActivatedRoute, private httpService: HttpService, private http: HttpClient) { }

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
      (response) => { this.products = response.body},
      (error) => { console.log(error);});
  }

  ngOnDelete(product: any) {
    if (product.userId = this.userId) {
      this.httpService.getDeleteProduct(this.urlDeleteProduct + product.productId).subscribe(
        (response) => { this.posts = response},
        (error) => { console.log(error)}
      );
      this.httpService.getDeleteComment(this.urlDeleteComment + product.productId).subscribe(
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

  onFileSelected(event: any) {
		this.file = event.target.files[0];
    this.image = "true"
  }

  onDeleteImage(values:any) {
    if (values.currentTarget.checked === true) {
      this.deleteImage = "true"
      
    } if (values.currentTarget.checked === false) {
      this.deleteImage = "false"
      
    }
    console.log(this.deleteImage)
  }

  ngOnPostModify(product: any) {
    if (this.modifyTitle === '') {
      this.modifyTitle = product.title
    }
    if (this.modifyMessage === '') {
      this.modifyMessage = product.message
    }
    if (this.deleteImage === "true" && this.image === "true") {
      alert("You can't select an image and check to delete the image.")
      location.reload();
    }
    if (product.imageUrl === null) {
      this.deleteImage = "null"
    }
    const formData = new FormData();
    if (product.imageUrl != null) {
      formData.append('imageUrl', product.imageUrl );
    }
    if (this.image === "true") {
      formData.append('image', this.file, this.file.name );
    }
    formData.append('userId', this.userId );
    formData.append('title', this.modifyTitle );
    formData.append('message', this.modifyMessage );
    formData.append('name', product.name );
    formData.append('lastName', product.lastName );
    formData.append('date', product.date );
    formData.append('deleteImage', this.deleteImage );
    
    this.http.put(this.urlModifyProduct + product.productId, formData, {observe: 'response'} ).subscribe((response) => { this.posts = response;
      if (this.posts.status == 200) {
        location.reload();
    }},
    (error) => { console.log(error) })
  
  }
}