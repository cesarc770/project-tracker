import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  token: string;
  authState;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router ) { 
    this.user = firebaseAuth.authState;
  }

  signupUser(email: string, password: string) {
    this.firebaseAuth
    .auth.createUserWithEmailAndPassword(email, password)
    .then( value => {
      console.log('Success', value);
    })
    .catch( err => {
      console.log('something went wrong: ', err.message);
    });
  }

  login(email: string, password: string) {
    this.firebaseAuth
    .auth.signInWithEmailAndPassword(email, password)
    .then(value => {
      this.authState = this.firebaseAuth.authState;
    //redirect
    this.router.navigate([`/`]);
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.authState = null;
         //redirect
    this.router.navigate([`/login`]);
  }


  isAuthenticated(): boolean {
    return this.authState != null;
  }
}
