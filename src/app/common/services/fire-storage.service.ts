import { Injectable } from '@angular/core';
import { inject} from '@angular/core';
import { Storage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class FireStorageService {

  constructor(
    private storage: Storage
  ) { }
}
