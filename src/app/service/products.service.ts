import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CreateProductDTO, Product } from '../Reglaprod/prod.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl='https://young-sands-07814.herokuapp.com/api/products';
  constructor(
    private http:HttpClient
  ) { }
  // PARA HACER UN LLAMADO A UNA API DEBEMOS HABILITAR EN APP.MODULE
  // ponemos return para que luego con un suscrib nuestro componente tenga la informacion
  getAllProducts(){
    return this.http.get<Product[]>(this.apiUrl)
  }
  getProduct(id:string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }
  create(dto:CreateProductDTO){
    return this.http.post<Product>(this.apiUrl,dto);
  }
  update(id:string, dto:any){
    return this.http.put<Product>(`${this.apiUrl}/${id}`,dto)
  }
  delete(id:string){
    return this.http.get<boolean>(`${this.apiUrl}/${id}`)
  }
}
// vamos hacer un request (peticion) para que nos devuelva todos los productos

