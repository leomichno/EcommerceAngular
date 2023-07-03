import { Component } from '@angular/core';
import {ProductsService} from '../../service/products.service';
import { Product } from 'src/app/Models/prod.models';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  products:Product[]=[];
  
  constructor(
    private productsService:ProductsService
  ){}
  ngOnInit(){
    this.productsService.getProductsByPage(10,0)
    .subscribe(data => { this.products=data});
  }
}
