import { Injectable, inject } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FireauthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  user$ = user(this.auth);
  userSubscription!: Subscription;

  constructor() {}

  login(email:string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  registerUser(email: string, password: string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  stateAuth(){
    onAuthStateChanged(this.auth, (user) => {
      return user; //user.uid;
    })     
  }

  async getUid(){
    const user = await this.auth.currentUser;
    if(user === null) {
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
*/