import { Component, OnInit, inject } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  private menuController:MenuController = inject(MenuController);

  constructor() { }

  ngOnInit() {}

  openMenu(){
    this.menuController.toggle('mainMenu');
  }
}
