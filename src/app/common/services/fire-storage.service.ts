import { Injectable } from '@angular/core';
import { inject} from '@angular/core';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(
    private storage: Storage
  ) { }

  uploadImage(file: any, path: string, nameImg: string): Promise<string>{
    return new Promise( 
      resolve => {
        const docRef = ref(this.storage, `${path}/${nameImg}`);
        const uploadTask  = uploadBytesResumable(docRef, file);

        uploadTask.on('state_changed', 
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // console.log('File available at', downloadURL);
              resolve(downloadURL);
              return;
            });
          }
        );

     },
     
    )
  }
  
}
