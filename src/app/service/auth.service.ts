import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import{Auth} from '../Models/auth.models'
import{User} from '../Models/user.models'
import{TokenService} from '../service/token.service'
import { switchMap, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  getProfile(){
    return this.http.get<User>(`${this.apiUrl}/profile`,{
      // // headers:{
      // //   Authorization:`Bearer ${token}`
      // }
    });
  }

    
  loginAndGet(email:string, password:string){
    return this.login(email,password)
    .pipe(
      switchMap(() => this.getProfile()),
    )
  }

}
