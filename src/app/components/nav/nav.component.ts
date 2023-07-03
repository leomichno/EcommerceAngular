import { Component ,OnInit} from '@angular/core';
import {StoreService} from '../../service/store.service'
import { AuthService } from 'src/app/service/auth.service';
import {Subscription} from 'rxjs';
import {Product} from '../../Models/prod.models';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  myShoppingCart: Product[] = [];

  seeItemscart:boolean=false;

  usuario:string="";  

  total:number=0;

  activeMenu=false;
  
  counter=0

  private subscription :Subscription=new Subscription ;

  // profile: User | null = null;
  constructor(private storeService:StoreService,private authService:AuthService){}

  
  ngOnInit(): void {
    this.storeService.myCart$.subscribe( product =>{this.counter = product.length});
    this.subscription = this.authService.getUsuiaro().subscribe(email=>this.usuario=email);
    this.subscription = this.storeService.myCart$.subscribe(product => {
      this.myShoppingCart = product;
      this.counter = product.length;
      this.total = this.storeService.getTotal();
    });
    }


  ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }


  onItemsCart():void{
    this.seeItemscart = true;
  }


  offItemsCart():void{
    this.seeItemscart = false;
  }
  

  toggleMenu(): void{
    this.activeMenu=!this.activeMenu;
  }


  // createUser(){
  //   this.usersService.create({
  //     name:"leo",
  //     email:"leo_michno@hotmail.com",
  //     password:"123456",
  //   })
  //   .subscribe(rta=>{
  //     console.log(rta);
  //   });
  // }
  // login() {
  //   this.authService.loginAndGet("leo_michno@hotmail.com","123456").subscribe(user => {
  //     this.profile = user;
  //     console.log(this.profile);
  //   });
  // }
}
