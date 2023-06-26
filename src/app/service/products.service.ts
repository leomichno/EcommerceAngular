import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from '../Reglaprod/prod.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl='https://young-sands-07814.herokuapp.com/api/products?limit=10&offset=1';
  constructor(
    private http:HttpClient
  ) { }
  // PARA HACER UN LLAMADO A UNA API DEBEMOS HABILITAR EN APP.MODULE
  getAllProducts(){
    return this.http.get<Product[]>(this.apiUrl)
  }
  getProduct(id:string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }
}
// vamos hacer un request (peticion) para que nos devuelva todos los productos
