import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private urlRegister = "http://localHost:3000/api/auth/register";
  private urlLogin = "http://localHost:3000/api/auth/login";

  private urlCreateProfile = "http://localHost:3000/api/profile/create";

  private urlAllProduct = "http://localHost:3000/api/product";
  private urlCreateProduct = "http://localHost:3000/api/product/create";
  
  constructor(private http: HttpClient) { }

  getPostsRegister(email: string, password: string, ) {
    return this.http.post(this.urlRegister, {email, password}, {observe: 'response'});
  }
  getPostsLogin(email: string, password: string) {
    return this.http.post(this.urlLogin, {email, password}, {observe: 'response'});
  }

  getExistProfile(urlExistProfile: string) {
    return this.http.get<any>(urlExistProfile);
  }
  getCreateProfile(userId: string, name: string, lastName: string, age: number) {
    return this.http.post(this.urlCreateProfile, {userId, name, lastName, age}, {observe: 'response'});
  }
  getProfile(urlProfile: string) {
    return this.http.get<any>(urlProfile);
  }
  getDeleteProfile(urlDeleteProfile: string) {
    return this.http.delete(urlDeleteProfile, {observe: 'response'});
  }
  getModifyProfile(urlModifyProfile: string, userId: string, name: string, lastName: string, age: number) {
    return this.http.put(urlModifyProfile, {userId, name, lastName, age}, {observe: 'response'});
  }

  getAllProduct() {
    return this.http.get<any>(this.urlAllProduct, {observe: 'response'});
  }
  getCreateProduct(userId: string, title: string, message: string, imageUrl: string, date: Date, name: string, lastName: string) {
    return this.http.post(this.urlCreateProduct, {userId, title, message, date, imageUrl, name, lastName}, {observe: 'response'});
  }
  getDeleteProduct(urlDeleteProduct: string) {
    return this.http.delete(urlDeleteProduct, {observe: 'response'});
  }
  getModifyProduct(urlModifyProduct: string) {
    return this.http.put(urlModifyProduct, {observe: 'response'});
  }
}