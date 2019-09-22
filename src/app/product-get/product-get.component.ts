import { Component, OnInit } from '@angular/core';
import Product from "../Product";
import { ProductsService } from "../products.service";

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.css']
})
export class ProductGetComponent implements OnInit {
  products: Product[];
  constructor(private ps: ProductsService) { }

  ngOnInit() {
    this.ps.getProducts()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
  }

  deleteProduct(id){
    this.ps.deleteProduct(id).subscribe(resp => {
      console.log(resp);
      this.products.slice(id, 1);
    });
  }
}
