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

  ngOnDelete() {
    this.httpService.getDeleteProduct(this.urlDeleteProduct+ this.userId).subscribe(
      (response) => { this.posts = response;
        if (this.posts.status == 200) {
          location.reload();
        }
      },
      (error) => { console.log(error)}
    )
  }

  ngSetUrl() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'],
      this.postUrl = '../post?userId='+ this.userId +''
    });
  }
}