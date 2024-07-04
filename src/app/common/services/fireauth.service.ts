import { Injectable, inject } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { Observable, Subscription, BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import { IClient } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class FireauthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  user$ = user(this.auth);
  userSubscription!: Subscription;
  currentUserState$ = new BehaviorSubject<User|null>(null); 
  private currentUserState: User|null = null;

  constructor() {
    this.getUid();
    this.stateAuth();
  }

  login(email:string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  registerUser(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  stateAuth(){
    onAuthStateChanged(this.auth, user => {
      if(user){
        this.currentUserState= user;
        this.currentUserState$.next(this.currentUserState);
        return this.currentUserState;
      }
      else{
        
        return of(null);
      }
    })
  }


  async getUid(){
    const user = await this.auth.currentUser;
    if(user === undefined) {
      return null;
    }else{
      return user?.uid;
    }
  }

  logout(){
    return signOut(this.auth);
  }

}


/*
registerUser(email: string, password: string): Promise<string> {
    return new Promise((resolve) => {
      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          return user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          return errorMessage;
        });
    });
  }

  login(email: string, password: string): Promise<string> {
    return new Promise((resolve) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    });
  }

    logout(){
    signOut(this.auth).then(() => {
      // Sign-out successful.
      this.router.navigate(['/']);
    }).catch((error) => {
      // An error happened.
      this.router.navigate(['/']);
    });
  }

  stateAuth(){
    onAuthStateChanged(this.auth, (user) => {
      return user; //user.uid;
    })     
  }

*/