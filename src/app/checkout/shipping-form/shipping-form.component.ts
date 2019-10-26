import { Component, OnInit, Inject, Input, AfterViewChecked } from '@angular/core';
import { Global } from 'src/app/global';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { LoginService } from 'src/app/services/login.service';
import { MyCart } from 'src/app/models/my-cart';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ScrollHelper } from 'src/app/scroll-helper';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, AfterViewChecked {

  private scrollHelper: ScrollHelper = new ScrollHelper();
  // tslint:disable: no-input-rename
  @Input('myCart') myCart: MyCart;
  globalVariable = Global;
  user: User;
  error;
  order: Order = {
    id: 0,
    userId: 0,
    cart: new MyCart({
      myCartItems: [{
        productId: 0,
        productName: '',
        productImage1: '',
        productPrice: 0,
        productPriceBeforeDiscount: 0,
        quantity: 0,
      }],
      getTotalCartPrice: () => 0,
      getQuantity: (product: Product) => 0,
      getTotalItemCount: () => 0,
      getTotalDiscountPrice: () => 0
    }),
    orderDate: '',
    paymentMethod: '',
    shippingAddress: '',
    landMark: '',
    shippingState: '',
    shippingCity: '',
    shippingPincode: 0,
    contactno: 0
  };
  shippingForm; placeOrderForm;
  updateShippingAddress = false;
  showOrderSummary = false;

  constructor(
    private loginservice: LoginService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private router: Router,
    private cartService: ShoppingCartService) {
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
        Validators.pattern('7216+[0-9]{2}')
      ])
    });
    this.placeOrderForm = new FormGroup({
      paymentMethod: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
    if (this.globalVariable.loggedIn) {
      this.user = this.globalVariable.loggedInUser;
    }
    this.scrollHelper.scrollToFirst('previousAddress');
  }

  async triggerUpdateAddressTab() {
    this.updateShippingAddress = await this.updateShippingAddress ? false : true;
    this.showOrderSummary = false;
    this.scrollHelper.scrollToFirst('shippingAddressForm');
  }

  ngAfterViewChecked() {
    this.scrollHelper.doScroll();
  }
  update() {
    this.loginservice.updateAddress(this.shippingForm.value).subscribe(
      (res: User) => {
        this.user = res;
        if (this.user.message == null) {
          Global.loggedInUser = this.user;
          this.saveInLocal('loggedInUser', this.user);
          this.updateShippingAddress = false;
        }
      },
      (err) => {
        this.error = err;
      }
    );
  }

  continue() {
    this.showOrderSummary = true;
    this.updateShippingAddress = false;
    this.scrollHelper.scrollToFirst('orderSummary');
  }

  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }

  async placeOrder() {
    if (this.user.shippingAddress !== '') {
      if (this.user.shippingCity !== '') {
        if (this.user.shippingState !== '') {
          this.order.userId = this.globalVariable.loggedInUser.id;
          this.order.paymentMethod = this.placeOrderForm.value.paymentMethod;
          this.order.cart = this.myCart;
          this.order.contactno = this.globalVariable.loggedInUser.contactno;
          this.order.landMark = this.globalVariable.loggedInUser.landMark;
          this.order.shippingAddress = this.globalVariable.loggedInUser.shippingAddress;
          this.order.shippingCity = this.globalVariable.loggedInUser.shippingCity;
          this.order.shippingPincode = this.globalVariable.loggedInUser.shippingPincode;
          this.order.shippingState = this.globalVariable.loggedInUser.shippingState;
          const orderMsg: string = await this.loginservice.placeOrder(this.order);
          console.log(orderMsg);
          await this.cartService.clearCart();
          this.router.navigate(['myAccount']);
        } else {
          this.error = 'Shipping State must be filled';
        }

      } else {
        this.error = 'Shipping City must be filled';
      }
    } else {
      this.error = 'Shipping address must be filled';
    }
  }
}
