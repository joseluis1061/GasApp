import { Component, OnInit, inject } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {

  private menuController:MenuController = inject(MenuController);

  constructor() { }

  ngOnInit() {}

  openMenu(){
    this.menuController.toggle('mainMenu');
  }

}
