import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  uri = "http://127.0.0.1:3000/products";

  constructor(private http: HttpClient) { }

  addProduct(ProductName, ProductDescription, ProductPrice) {
    const obj = {
      ProductName, ProductDescription, ProductPrice
    };

    console.log(obj);

    this.http.post(`${this.uri}/add`, obj)
      .subscribe(resp => console.log("Done"));
  }

  getProducts() {
    return this.http.get(`${this.uri}`);
  }
}
