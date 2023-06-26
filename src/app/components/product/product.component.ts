import { Component, Input,Output,EventEmitter } from '@angular/core';
import{Product} from '../../Reglaprod/prod.component'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input()  producto:Product ={
    id:'',
    title:'',
    price:0,
    images:[],
    description:'',
    categoty:{
      id:'',
      name:'',
    },
  }

  @Output() addedProduct=new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();
  onAddToCart(){
    this.addedProduct.emit(this.producto);
  }
  onShowDetail(){
   this.showProduct.emit(this.producto.id)
 }
}
