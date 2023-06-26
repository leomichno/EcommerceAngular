import { Component, Input } from '@angular/core';
import {Product} from '../../Reglaprod/prod.component';
import {StoreService} from '../../service/store.service';
import {ProductsService} from '../../service/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  myShoppingCart: Product[] = [];
  total=0;
  showProductdetail = false;
 
  products: Product[] = []
  constructor(
    private storeService:StoreService,
    private productsService: ProductsService )
      {
      this.myShoppingCart=this.storeService.getmyShoppingCart()
  }

  ngOnInit(){
    this.productsService.getAllProducts()
    .subscribe(data => { this.products=data});
  }

  onAddtoShoppingCart(product:Product): void{
    this.storeService.addProduct(product);
    this.total=this.storeService.getTotal();
  }

  toggleProductdetail(){
    this.showProductdetail =!this.showProductdetail
  }
  onShowDetail(id:string){
    this.productsService.getProduct(id)
    .subscribe((data: any): void => { console.log('Product', data); })
  }

}
