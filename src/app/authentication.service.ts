import { Injectable } from '@angular/core';

import { AngularFireAuth } from "@angular/fire/auth";

import firebase from "firebase";
import User = firebase.User;
import Persistence = firebase.auth.Auth.Persistence;

import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private auth : AngularFireAuth, private cookieServ : CookieService) {}

  /*public signIn(email: string, password: string): Promise<UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password)
  }*/
  public async signIn(email: string, password: string) : Promise<string> {
    let user : User | null = null;
    let _error : string = '';
    await this.auth.signInWithEmailAndPassword(email, password)
      .then(userCredential =>
      {
        user = userCredential.user;
        this.cookieServ.set('uid', `${user?.uid}`, 0, '/', '', true);
      }).catch(error => {
        _error = error;
      });
    return new Promise<string>((resolve, reject) =>
    {
      if (_error === '') resolve('');
      else reject(_error);
    });
  }

  public reauthenticate() : boolean
  {
    if (this.cookieServ.check('uid')) {
      const uid = this.cookieServ.get('uid');
      return uid !== "";
    }
    return false;
  }

  public signOut() :void {
    this.auth.signOut().then();
  }
}
