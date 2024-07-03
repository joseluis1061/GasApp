import { Component, OnInit, inject } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IClient } from 'src/app/common/models/client.model';
import { FireauthService } from 'src/app/common/services/fireauth.service';
import { FireStorageService } from 'src/app/common/services/fire-storage.service';
import { FirestoreService } from 'src/app/common/services/firestore.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {

  private menuController:MenuController = inject(MenuController);
  private fireauthService:FireauthService = inject(FireauthService);
  private fireStorageService: FireStorageService = inject(FireStorageService);
  private firestoreService: FirestoreService = inject(FirestoreService);

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
      name: "",
      email: "",
      password: "",
      phone: null,
      adress: null,
      image: "", 
      referecia: ""
    }
  }

  openMenu(){
    this.menuController.toggle('mainMenu');
  }

  async registerClient(){
    if(this.cliente.email.length>0 && this.cliente.password.length > 0){
      console.log(`Email: ${this.cliente.email} password: ${this.cliente.password}`);
      const response = await this.fireauthService.registerUser(this.cliente.email, this.cliente.password)
      if(response.user.uid){
        this.cliente.uid = response.user.uid;
        this.saveClient();
      }
    }
  }

  async saveClient(){
    const path = "Clients";
    const uid = this.cliente.uid;
    if(this.cliente.image.length > 0){
      const urlImage = await this.fireStorageService.uploadImage(this.newFile, `${path}/${this.cliente.uid}`, `${this.cliente.name}`); //Cambiar a 
      this.cliente.image = urlImage;
    }

    await this.firestoreService.createDocumentID(this.cliente, path, uid)
    .catch(e => console.log("Error data: ", e));
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

  logoutClient(){
    this.fireauthService.logout();
  }

}
