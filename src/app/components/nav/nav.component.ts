import { Component ,OnInit} from '@angular/core';
import {StoreService} from '../../service/store.service'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor(
    private storeService:StoreService,
 
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

}
