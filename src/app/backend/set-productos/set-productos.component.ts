import { Component, inject, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IProduct } from 'src/app/common/models/products.model';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { FireStorageService } from 'src/app/common/services/fire-storage.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { resolve } from 'path';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent  implements OnInit {
  newProduct: IProduct = {
    id: '',
    name: '',
    price: null,
    priceReduce: null,
    image: '',
    date: new Date
  }
  loading: any;
  products: IProduct[] = [];
  toggleNewProduct: boolean = false;
  isToastOpen = false;
  newProductImage: any = "";
  newFile: any = "";

  constructor(
    public menuController: MenuController, 
    private firestoreService: FirestoreService,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private fireStorageService: FireStorageService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  loadNewProduct(){
    this.newProduct = {
      id: '',
      name: '',
      price: null,
      priceReduce: null,
      image: '',
      date: new Date
    }
  }

  openMenu(){
    this.menuController.toggle('mainMenu');
  }

  openCamera(){
    console.log("Elegir imagen")
  }

  getAllProducts(){
    this.firestoreService.getCollectionChanges<IProduct>(`Products`).subscribe(
      response => {
        this.products = response;
      }
    )
  }

  async saveProduct(){
    if(this.newProduct.id.length <=0) this.newProduct.id = this.firestoreService.createIdDoc();


    this.showLoading("Guardando producto");
    const name = this.newProduct.name;
    const image = await this.fireStorageService.uploadImage(this.newFile, "Products", name);
    this.newProduct.image = image;


    await this.firestoreService.createDocument(this.newProduct, `Products/${this.newProduct.id}`)
    .then(
      response => {
        this.loading.dismiss();
        this.presentToast("middle", "Producto guardado");
      }
    )
    .catch(
      (error)=>{
        this.presentToast("middle", "Ha ocurrido un error al guardar producto");
      }
    );
    //await this.firestoreService.addDocument(this.newProduct, `Products`);
    this.loadNewProduct();
  }


  async deleteProduct(product: IProduct){
    const alert = await this.alertController.create({
      header: "Adverencia",
      message: `¿Vas a eliminar este Producto? ${product.name}`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.presentToast("middle", "Cancelaste la eliminación");
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.firestoreService.deleteDocumentID('Products', product.id)
            .then(response => this.presentToast("middle", "Has eliminado el producto"));
          },
        },
      ],
    });

    await alert.present();
  }

  formNewProduct(){
    this.toggleNewProduct = true;
    this.loadNewProduct();
  }

  async showLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message: message
    });
    this.loading.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      cssClass: 'normal'
    });

    await toast.present();
  }

  async upLoadImage(event: any){
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // Lee el archivo como una URL de datos
      reader.onloadend = (e) => {
        if(e.target !== null)
          this.newProduct.image = e.target['result'] as string; // Establece la URL en la variable
      };
    }
  }

}
