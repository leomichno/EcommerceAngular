import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import { CreateProductDTO, Product } from '../Models/prod.models';
import {retry,catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl=`${environment.API_URL}/api/products`;
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
    .pipe(
      catchError((error: HttpErrorResponse)=>{
        // error de conflicto es el 409
        if (error.status === HttpStatusCode.NotFound){
          return throwError('Algo esta fallando en el server');
        }
        return throwError('Ups algo salio mal');
      })
    )
  }
  create(dto:CreateProductDTO){
    return this.http.post<Product>(this.apiUrl,dto);
  }
  update(id:string, dto:any){
    return this.http.put<Product>(`${this.apiUrl}/${id}`,dto)
  }
  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }
  getProductsByPage(limit:number,offset:number){
     return this.http.get<Product[]>(`${this.apiUrl}`,{params:{limit,offset}})
  }

}
// vamos hacer un request (peticion) para que nos devuelva todos los productos

