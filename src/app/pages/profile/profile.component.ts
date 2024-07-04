import { Component, OnInit, inject } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IClient } from 'src/app/common/models/client.model';
import { FireauthService } from 'src/app/common/services/fireauth.service';
import { FireStorageService } from 'src/app/common/services/fire-storage.service';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { user } from '@angular/fire/auth';
import { error } from 'console';
import { unsubscribe } from 'diagnostics_channel';
import { Subscription } from 'rxjs';

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
  currentUserUid: string | undefined = undefined;
  userInfoSuscibe!: Subscription;

  toggleUpdateClient = false;
  toggleLoginRegister = false;
  constructor() { }

  ngOnInit() {
    this.initClient();
    this.loadCurrentUserUid();
    this.userState();    
    //console.log("OnInit Cliente: ", this.cliente)
  }

  userState(){
    this.fireauthService.currentUserState$.subscribe(user => {
      this.currentUserUid = user?.uid;
      if(this.currentUserUid !== undefined && this.currentUserUid?.length > 0){
        this.getCurrentClient();
        console.log("UserState: ", this.currentUserUid);
      }else{
        this.initClient();
      }
    })
  }

  loadCurrentUserUid(){
    this.fireauthService.getUid().then(
      response => {
        console.log("Current user uid: ", response);
        return response;
      }
    )
    .catch(error => {return error});
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
    if(this.cliente.email.length>0 && this.cliente.password !== undefined && this.cliente?.password?.length > 0 ){
      console.log(`Email: ${this.cliente.email} password: ${this.cliente.password}`);
      const response = await this.fireauthService.registerUser(this.cliente.email, this.cliente?.password )
      if(response.user.uid){
        this.cliente.uid = response.user.uid;
        this.saveClient();
      }
    }
  }

  async saveClient(){
    if(this.currentUserUid){
      const path = "Clients";
      this.cliente.password= "";
      if(this.newFile !== undefined && this.newFile.length > 0){
        const urlImage = await this.fireStorageService.uploadImage(this.newFile, `${path}/${this.cliente.uid}`, `${this.cliente.name}`); //Cambiar a 
        this.cliente.image = urlImage;
      }
  
      await this.firestoreService.createDocumentID(this.cliente, path, this.cliente.uid)
      .then(() => {
        this.initClient();
      })
      .catch(e => console.log("Error data: ", e));
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

  loginClient(){
    const email = this.cliente.email;
    const password = this.cliente.password;
    if(email.length > 0 && password !== undefined && password?.length > 0){
      this.fireauthService.login(email, password)
      .then(
        () => console.log("Usuario logeado")
      )
      .catch(error => {
        console.log("Error de login: ", error);
      })
    }
  }

  logoutClient(){
    this.fireauthService.logout();
    this.userInfoSuscibe.unsubscribe();
    this.toggleUpdateClient = false;
    this.initClient();
  }

  getCurrentClient(){
    if(this.currentUserUid !== undefined){
      this.userInfoSuscibe = this.firestoreService.getDocumentChanges<IClient>(`Clients/${this.currentUserUid}`).subscribe(
        data => {
          this.cliente = data;
          this.toggleUpdateClient = true;
          // console.log("Observer Cliente: ", this.cliente)
        }
      )
    }
  }



}
