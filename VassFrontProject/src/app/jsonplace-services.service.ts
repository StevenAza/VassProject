import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JsonplaceServicesService {

  constructor(private http: HttpClient) { 
  
  }
  getM(queryS:string) {
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
    });
    const url = `https://jsonplaceholder.typicode.com/${queryS}`;
    return this.http.get(url, {headers});
  }
  postM(pathS:string, objP: any) {
    const url = `https://jsonplaceholder.typicode.com/${pathS}`;
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
    });
    return this.http.post(url, objP, { headers });
  }
  deleteM(pathD:string) {
    const url = `https://jsonplaceholder.typicode.com/${pathD}`;
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Accept': '*/*'
    });
    return this.http.delete(url);
  }
  putM(pathS:string, objP: any) {
    const url = `https://jsonplaceholder.typicode.com/${pathS}`;
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
    });
    return this.http.put(url, objP, { headers });
  }
  getAllUsers() {
    return this.getM('users');
  }
  getUser(id) {
    return this.getM(`users/${id}`)
  }
  addPost(objPost) {
    return this.postM('posts/', objPost);
  }
  getPostUser(idUser) {
    return this.getM(`users/${idUser}/posts`)
  }
  deteleUser(idPost) {
    return this.deleteM(`posts/${idPost}`);
  }
  updatePost(idPost, objUpd) {
    return this.putM(`posts/${idPost}`, objUpd);
  }
  getPost(idPost) {
    return this.getM(`posts/${idPost}`);
  }
}