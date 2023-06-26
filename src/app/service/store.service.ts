import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import{Product} from '../Reglaprod/prod.component';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);
  public myCart$ = this.myCart.asObservable();
  
  addProduct(product:Product): void{
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }
  
  getmyShoppingCart(){
    return this.myShoppingCart;
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum,item)=> sum + item.price, 0);
  }
  constructor() { }
}
