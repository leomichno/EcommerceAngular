import { Component ,OnInit} from '@angular/core';
import {StoreService} from '../../service/store.service'
import{AuthService} from '../../service/auth.service'
import{UsersService} from '../../service/users.service'
import { User } from 'src/app/Models/user.models';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  profile: User | null = null;
  constructor(
    private storeService:StoreService,
    private usersService:UsersService,
    private authService:AuthService
  ){

  }
  activeMenu=false;
  counter=0
  ngOnInit(): void {
    this.storeService.myCart$
      .subscribe( product =>{this.counter = product.length}
      );
  }
 

  toggleMenu(){
    this.activeMenu=!this.activeMenu;
  }

  createUser(){
    this.usersService.create({
      name:'leitomxd',
      email:'leitomxd@gmail.com',
      password:'yegua',
    })
    .subscribe(rta=>{
      console.log(rta);
    });
  }
  login(){
    this.authService.loginAndGet('leitomxd@gmail.com','yegua')
    .subscribe(user=> {
      this.profile=user;
    });
  }


}
