import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule} from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from "./authentication.service";
import { CookieService } from "ngx-cookie-service";

const firebaseConfig = {
  apiKey: "AIzaSyBiZQGw04jNztI9YbRq-X9JcAW_wC6vk9s",
  authDomain: "x-learner.firebaseapp.com",
  projectId: "x-learner",
  storageBucket: "x-learner.appspot.com",
  messagingSenderId: "284545377521",
  appId: "1:284545377521:web:7823615f0713dcc4b3b550"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [AuthenticationService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
