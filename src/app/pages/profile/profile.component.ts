import { Component, OnInit, inject } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IClient } from 'src/app/common/models/client.model';
import { FireauthService } from 'src/app/common/services/fireauth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {

  private menuController:MenuController = inject(MenuController);
  private fireauthService:FireauthService = inject(FireauthService);
  cliente!: IClient;
  newFile: any;

  toggleNewProduct = false;
  constructor() { }

  ngOnInit() {
    this.initClient();
  }

  initClient(){
    this.cliente = {
      uid: "",
      email: "",
      password: "",
      name: "",
      phone: null,
      adress: null,
      image: "", 
      referecia: ""
    }
  }

  openMenu(){
    this.menuController.toggle('mainMenu');
  }

  registerClient(){
    if(this.cliente.email.length>0 && this.cliente.password.length > 0){
      this.fireauthService.registerUser(this.cliente.email, this.cliente.password).then(
        user => {
          console.log(user)
        }
      )
      .catch(error => {
        console.log("Error al crear usuario: ", error);
      })
    }
  }

  async upLoadImage(event: any){
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // Lee el archivo como una URL de datos
      reader.onloadend = (e) => {
        if(e.target !== null)
          this.cliente.image = e.target['result'] as string; // Establece la URL en la variable
      };
    }
  }

}
