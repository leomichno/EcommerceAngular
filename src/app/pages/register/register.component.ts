import { Component } from '@angular/core';
import{AuthService} from '../../service/auth.service'
import{UsersService} from '../../service/users.service'
import  {User, CreateUserDTO } from '../../Models/user.models';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  regUser:CreateUserDTO={
    name:'',
    email:'',
    password:'',
  }
  
  profile: User | null = null;
  constructor( 
    private usersService:UsersService,
    private authService:AuthService){}
    createUser(){
    this.usersService.create({
      name:this.regUser.name,
      email:this.regUser.email,
      password:this.regUser.password,
    })
    .subscribe(rta=>{
      console.log(rta);
    });
  }
  login() {
    this.authService.loginAndGet(this.regUser.email,this.regUser.password).subscribe(user => {
      this.profile = user;
      console.log(this.profile);
      this.authService.setUsuario(this.profile.email)
    });
  }
   }