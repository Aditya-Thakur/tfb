import { Component, OnInit, Inject } from '@angular/core';
import { Global } from '../global';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { FetchDetailsService } from '../services/fetch-details.service';
import { LoginService } from '../services/login.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Product } from '../models/product';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  globalVariable = Global;
  shippingForm; updateProfileForm; updatePasswordForm;
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
  error;
  showShippingForm = false;
  showProfileForm = false;
  showPasswordForm = false;
  constructor(
    private loginService: LoginService,
    private fetchDetails: FetchDetailsService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.shippingForm = new FormGroup({
      shippingAddress: new FormControl('', [
        Validators.required
      ]),
      landMark: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z& -]+')
      ]),
      shippingState: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z& -]+')
      ]),
      shippingCity: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z& -]+')
      ]),
      shippingPincode: new FormControl('', [
        Validators.required,
        Validators.pattern('[1-9][0-9]{5}')
      ])
    });
    this.updateProfileForm = new FormGroup({
      name: new FormControl('', [
      ]),
      email: new FormControl('',  [
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
    this.updatePasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9!@#$%^&*()-=_+]{6,20}')
      ]),
      currentPassword: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z0-9!@#$%^&*()-=_+]{6,20}')
      ])
    });
   }

  ngOnInit() {
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  update() {
    this.loginService.updateAddress(this.shippingForm.value).subscribe(
      (res: User) => {
        this.user = res;
        if (this.user.message === 'Data successfully updated') {
          Global.loggedInUser = this.user;
          this.saveInLocal('loggedInUser', this.user);
        }
      },
      (err) => {
        this.error = err;
      }
    );
  }

  updateProfile() {
    this.loginService.updateProfile(this.updateProfileForm.value).subscribe(
      (res: User) => {
        this.updateProfileForm.reset();
        this.user = res;
        if (this.user.message === 'Phone Number successfully updated') {
          Global.loggedInUser = this.user;
          this.saveInLocal('loggedInUser', this.user);
        }
      },
      (err) => {
        this.error = err;
      }
    );
  }

  updatePassword() {
    this.loginService.updatePassword(this.updatePasswordForm.value).subscribe(
      (res: User) => {
        this.updatePasswordForm.reset();
        this.user = res;
        if (this.user.message === 'Password successfully updated') {
          Global.loggedInUser = this.user;
          this.saveInLocal('loggedInUser', this.user);
        }
      },
      (err) => {
        this.error = err;
      }
    );
  }

  triggerShippingAddress() {
    this.showShippingForm = true;
    this.showPasswordForm = false;
    this.showProfileForm = false;
    this.user.message = '';
  }

  triggerProfileForm() {
    this.showShippingForm = false;
    this.showPasswordForm = false;
    this.showProfileForm = true;
    this.user.message = '';
  }

  triggerPasswordForm() {
    this.showShippingForm = false;
    this.showPasswordForm = true;
    this.showProfileForm = false;
    this.user.message = '';
  }

}
