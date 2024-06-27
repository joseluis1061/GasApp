import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IProduct } from 'src/app/common/models/products.model';
import { FirestoreService } from 'src/app/common/services/firestore.service';

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

  constructor(
    public menuController: MenuController, 
    private firestoreService: FirestoreService

  ) { }

  ngOnInit() {}

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

  async saveProduct(){
    this.newProduct.id = this.firestoreService.createIdDoc();
    
    await this.firestoreService.addDocument(this.newProduct, `Products/${this.newProduct.id}`);
    this.loadNewProduct();
  }

}
