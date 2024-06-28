import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, setDoc, updateDoc, deleteDoc, DocumentReference, getDoc, addDoc } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore = inject(Firestore)

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

  // Crear documento con id incluido en el path
  createDocument(data: any, path: string){
    const document = doc(this.firestore, `${path}`);
    return setDoc(document, data);
  }
  // Crear documento con id del documento manual
  createDocumentID(data: any, path: string, idDoc: string){
    const document = doc(this.firestore, `${path}/${idDoc}`);
    return setDoc(document, data);
  }
  
  // Crear documento con id del documento automatico
  async addDocument(data: any, path: string){
    const collectionRef = collection(this.firestore, path);
    await addDoc(collectionRef, data);
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
    return uuidv4();
  }
}
