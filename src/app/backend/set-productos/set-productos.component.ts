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

  products: IProduct[] = [];
  toggleNewProduct: boolean = false;

  constructor(
    public menuController: MenuController, 
    private firestoreService: FirestoreService

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
    await this.firestoreService.createDocument(this.newProduct, `Products/${this.newProduct.id}`);
    //await this.firestoreService.addDocument(this.newProduct, `Products`);
    this.loadNewProduct();
  }

  // async updateProduct(product:IProduct){
  //   await this.firestoreService.updateDocumentID(product, 'Products', product.id)
  //   .then(response => console.log('Update product: ', response));
  // }

  async deleteProduct(productId: string){
    await this.firestoreService.deleteDocumentID('Products', productId)
    .then(response => console.log("Delete product: ", response));
  }

  formNewProduct(){
    this.toggleNewProduct = true;
    this.loadNewProduct();
  }

}
