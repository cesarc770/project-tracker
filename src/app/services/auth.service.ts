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

  signupUser(email: string, password: string, fname: string, lname: string) {
    const full_name = fname + " " + lname;
    console.log(full_name);
    this.firebaseAuth
    .auth.createUserWithEmailAndPassword(email, password)
    .then( value => {
      console.log('Success', value);

      this.firebaseAuth.auth.currentUser.updateProfile({ displayName: full_name, photoURL: 'https://image.flaticon.com/icons/svg/21/21104.svg'});
      this.login(email, password);
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

  getCurrentUserInfo () {
    const userName = this.firebaseAuth.auth.currentUser.displayName;
    const userPhoto = this.firebaseAuth.auth.currentUser.photoURL;
    const userId = this.firebaseAuth.auth.currentUser.uid

    return {userId, userName, userPhoto};
    
  }


  isAuthenticated(): boolean {
    return this.authState != null;
  }
}
