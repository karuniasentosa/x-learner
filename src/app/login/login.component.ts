import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";

import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitting : boolean;
  invalidEmail : boolean;
  failLogin : boolean;

  constructor(
    private formBuilder : FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private authServ : AuthenticationService)
  {
    this.submitting = this.invalidEmail = this.failLogin = false;
  }

  loginForm = this.formBuilder.group(
    {
      email: ['', Validators.email],
      password: ['', Validators.required]
    }
  );

  private f(name: string) : any {
    return this.loginForm.controls[name].value;
  }

  ngOnInit(): void {
    if (this.authServ.reauthenticate()) {
      console.log('navigating to root');
      this.router.navigate(['/']);
    } else {
      console.log('cannot find the logged in');
    }

  }

  onSubmit() {
    this.submitting = true;
    if (this.loginForm.invalid) return;

    // console.log(this.loginForm);
    this.authServ.signIn(this.f('email'), this.f('password'))
      .then(() =>
      {
        this.router.navigate(['/']);
      }).catch((error) => {
        console.error('could not log in ' + error);
    })
  }

}
