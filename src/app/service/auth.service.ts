import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import{Auth} from '../Models/auth.models';
import {CreateUserDTO, User} from '../Models/user.models';
import{TokenService} from '../service/token.service';
import { Subject, switchMap, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: Subject<string> = new Subject<string>();
  private apiUrl=`${environment.API_URL}/api/auth`;
  constructor(
    private http:HttpClient,
    private tokenService:TokenService
  ) { }

  login( email:string, password:string ){
    return this.http.post<Auth>(`${this.apiUrl}/login`,{email,password})
    .pipe(
      tap(Response => this.tokenService.saveToken(Response.access_token))
    );
  }

  getProfile() {
    const token = this.tokenService.getToken(); // Obtener el token de acceso almacenado
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

    
  loginAndGet(email:string, password:string){
    return this.login(email,password)
    .pipe(
      switchMap(() => this.getProfile()),
    )
  }

  setUsuario(user:string){
    this.usuario.next(user)
    console.log(this.usuario)
  };
  getUsuiaro(){
    console.log("this.usuario");
    return this.usuario.asObservable();

  }

}
