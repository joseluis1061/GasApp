import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent  implements OnInit {

  constructor(
    public menuController: MenuController
  ) { }

  ngOnInit() {}

  openMenu(){
    this.menuController.toggle('menuprincipal');
  }

  openCamera(){
    console.log("Elegir imagen")
  }

  save(){
    console.log("Save")
  }

}
