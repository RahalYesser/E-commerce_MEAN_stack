import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private REST_API : String ="http://localhost:5000/products";

  // Http Header
  httpHeaders = new HttpHeaders( { 'Content-Type': 'application/json'} );

  constructor(private httpClient: HttpClient) { }

  // Add
  addProduct(product: Product): Observable<any> {
    let API_URL = `${this.REST_API}/add`;
    return this.httpClient.post<Product>(API_URL, product)
  }

  getProducts():Observable<any> {
    return this.httpClient.get<Product>(`${this.REST_API}/list`);
  }
  getOneProduct(id:any):Observable<any> {
    return this.httpClient.get<Product>(`${this.REST_API}/get/${id}`);
  }


  deleteProduct(product: any): Observable<any> {
    console.log(product)
    let API_URL = `${this.REST_API}/delete/${product._id}`;
    return this.httpClient
      .delete(API_URL,product)
      
  }
  updateProduct(id:any,data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update/${id}`;
    return this.httpClient
     .put(API_URL, data, { headers: this.httpHeaders })  
   }

    
}
