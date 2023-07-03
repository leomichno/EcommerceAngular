import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {
  @Input()  img : string  = "nuestro primer string";
  imgDefault="https://daytona.com.ar/pub/media/catalog/product/cache/974eda8db8bcc5c45a8b57c1327d6720/3/1/31955.jpg";
  imgError(){
    this.img=this.imgDefault;
  }
}
