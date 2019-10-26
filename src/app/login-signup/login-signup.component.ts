import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { Global } from '../global';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  bla = 'password';
  blaActive = false;
  showLoginForm = true;
  showSignupForm = false;
  error;
  loginForm; signupForm;
  user: User = {
    id: 0,
    name: '',
    email: '',
    contactno: 0,
    password: '',
    shippingAddress: '',
    landMark: '',
    shippingState: '',
    shippingCity: '',
    shippingPincode: 0,
    billingAddress: '',
    billingState: '',
    billingCity: '',
    billingPincode: 0,
    regDate: '',
    updationDate: '',
    ip: '',
    message: ''
  };


  constructor(
    private socialAuthService: AuthService,
    private loginservice: LoginService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.loginForm = new FormGroup({
      email: new FormControl('',
      [
        Validators.required,
        Validators.pattern('[a-z0-9._]+@[a-z]+.com|.co.in')
      ]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9!@#$%^&*()-=_+]{6,20}')
      ])
    });
    this.signupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z ]+')
      ]),
      email: new FormControl('',  [
        Validators.required,
        Validators.pattern('[a-z0-9._]+@[a-z]+.com|.co.in')
      ]),
      contactNo: new FormControl('', [
        Validators.required,
        Validators.pattern('[6-9][0-9]{9}')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9!@#$%^&*()-=_+]{6,20}')
      ])
    });
  }
  changebla() {
    if (this.bla === 'text') {
      this.bla = 'password';
      this.blaActive = true;
    } else {
      this.blaActive = false;
      this.bla = 'text';
  }
  }
  signUpClicked(): void {
    this.showSignupForm = this.showSignupForm ? false : true;
    this.showLoginForm = this.showLoginForm ? false : true;
  }

  login(): void {
    this.loginservice.login(this.loginForm.value).subscribe(
      (res: User) => {
        this.user = res;
        if (this.user.message == null) {
        Global.loggedIn = true;
        Global.loggedInUser = this.user;
        this.saveInLocal('loggedInUser', this.user);
        this.router.navigate(['']);
      }
      },
      (err) => {
        this.error = err;
      }
    );
  }

  signup(): void {
    this.loginservice.signup(this.signupForm.value).subscribe(
      (res: User) => {
        this.user = res;
        if (this.user.message == null) {
        Global.loggedIn = true;
        Global.loggedInUser = this.user;
        this.router.navigate(['']);
      }
      },
      (err) => {
        this.error = err;
      }
    );
  }

  ngOnInit() {
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
   }

   public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ' , userData);
        // Now sign-in with userData
        // ...

      }
    );
  }

}
