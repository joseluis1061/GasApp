import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, setDoc, updateDoc, deleteDoc, DocumentReference, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore = inject(Firestore)

  constructor() { }

  // Traer elemento sin suscribirme a los cambios
  getDocument<tipo>(path: string){
    const document = doc(this.firestore, path) as DocumentReference<tipo, any>;
    return getDoc<tipo, any>(document);
  }

  // Traer elemento sin suscribirme a los cambios
  getDocumentChanges<tipo>(path: string){
    const document = doc(this.firestore, path);
    return docData(document) as Observable<tipo[]>;
  }


  getCollectionChanges<tipo>(path: string){
    const itemCollection = collection(this.firestore, path);
    return collectionData(itemCollection) as Observable<tipo[]>;
  }

  // Crear documento con id del documento automatico
  createDocument(data: any, path: string){
    const document = doc(this.firestore, path);
    return setDoc(document, data);
  }
  // Crear documento con id del documento manual
  createDocumentID(data: any, path: string, idDoc: string){
    const document = doc(this.firestore, `${path}/${idDoc}`);
    return setDoc(document, data);
  }

  async updateDocumentID(data:any, path:string, idDoc:string){
    const document = doc(this.firestore, `${path}/${idDoc}`);
    return updateDoc(document, data);
  }

  deleteDocumentID(path: string, idDoc: string){
    const document = doc(this.firestore, `${path}/${idDoc}`);
    return deleteDoc(document);
  }

  deleteDocFromRef(ref: any){
    return deleteDoc(ref);
  }

  createIdDoc(){
    const { v4: uuidv4 } = require('uuid');
    return uuidv4();
  }
}
