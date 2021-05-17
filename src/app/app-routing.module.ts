import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AuthenticationGuard } from "./authentication.guard";
import {AppComponent} from "./app.component";


const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [AuthenticationGuard]},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
