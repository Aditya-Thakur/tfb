import { Injectable, Inject } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { MessageService } from './message.service';
import { MyCart } from '../models/my-cart';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { Global } from '../global';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public data: any = [];
  public myCart: ShoppingCartItem[] = [];
  public myCartItems: ShoppingCartItem[] = [];

  // tslint:disable: no-string-literal
  constructor(private messageService: MessageService, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.getFromLocal('myCart');
    if (this.data['myCart']) {
      this.myCart = this.data['myCart'];
      this.sendMessage(new MyCart(this.myCart));
    } else {
      this.sendMessage(Global.myCart);
    }
  }
  getFromLocal(key): void {
    this.data[key] = this.storage.get(key);
  }
  saveInLocal(key, val): void {
    this.storage.set(key, val);
  }
  sendMessage(message: any): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage(message);
  }

  clearMessage(): void {
    // clear message
    this.messageService.clearMessage();
  }

  clearCart(): void {
    this.myCart = [];
    this.sendMessage(new MyCart(this.myCart));
    localStorage.removeItem('myCart');
  }

  getCart(): MyCart {
    this.getFromLocal('myCart');
    this.myCartItems = this.data['myCart'];
    if (this.myCartItems) {
      return (new MyCart(this.myCartItems));
    } else {
      return Global.myCart;
    }
  }

  async addToCart(product: Product, productPrice: number, productQuantityType: string) {
    try {
      const index = this.myCart.findIndex(e => e.productId === product.id);
      if (index === -1) {
        const itemToAdd: ShoppingCartItem = {
          productId: 0,
          productName: '',
          productImage1: '',
          productPrice: 0,
          productPriceBeforeDiscount: 0,
          quantity: 0,
          quantityType: ''
        };
        itemToAdd.productId = product.id;
        itemToAdd.productImage1 = product.productImage1;
        itemToAdd.productName = product.productName;
        if (productPrice === 0) {
          itemToAdd.productPrice = product.productPrice;
        } else {
          itemToAdd.productPrice = productPrice;
          itemToAdd.quantityType = productQuantityType;
        }
        itemToAdd.quantity = 1;
        itemToAdd.productPriceBeforeDiscount = product.productPriceBeforeDiscount;
        this.myCart.push(itemToAdd);
      } else {
        this.myCart[index].quantity += 1;
      }
      this.sendMessage(new MyCart(this.myCart));
      this.saveInLocal('myCart', this.myCart);
    } catch (e) {
      console.log(e);
    }

  }

  async removeFromCart(product: Product) {
    const index = this.myCart.findIndex((e) => e.productId === product.id);
    const quantity = this.myCart[index].quantity -= 1;
    if (quantity === 0) {
      this.myCart.splice(index, 1);
    }
    this.sendMessage(new MyCart(this.myCart));
    this.saveInLocal('myCart', this.myCart);
  }

}
