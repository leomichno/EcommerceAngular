import { Component, Input } from '@angular/core';
import {CreateProductDTO, Product} from '../../Reglaprod/prod.component';
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
  productChosen:Product={
    id:'',
    title:'',
    price:0,
    images:[],
    description:'',
    category:{
      id:'',
      name:'',
    },
  }
 
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
    .subscribe((data: any): void => { 
      this.toggleProductdetail();
      this.productChosen=data })
  }
  createNewProduct(){
    const product:CreateProductDTO = {
      title:'Nuevo producto',
      price:150,
      images:['https://www.uba.ar/internacionales/archivos/TEST.jpg'],
      description:'nuevo producto de prueba',
      categoryId:1,
    }
    this.productsService.create(product).subscribe(data =>{this.products.unshift(data)})

  }
}
