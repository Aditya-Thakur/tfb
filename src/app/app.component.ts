import { Component, Inject, OnInit } from '@angular/core';
import { MyCart } from './models/my-cart';
import { Subscription } from 'rxjs';
import { Global } from 'src/app/global';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { MessageService } from './services/message.service';
import { ShoppingCartService } from './services/shopping-cart.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public data: any = [];
  globalVariable = Global;
  myCart: MyCart;
  shouldShow = false;
  subscription: Subscription;
  title = 'The Flying Basket';
  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private messageService: MessageService,
    private shoppingCart: ShoppingCartService
  ) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.myCart = message.text; });
   }

  ngOnInit() {
    this.myCart = this.shoppingCart.getCart();
    this.getFromLocal('loggedInUser');
    // tslint:disable-next-line: no-string-literal
    this.globalVariable.loggedInUser = this.data['loggedInUser'];
    if (this.globalVariable.loggedInUser != null) {
      this.globalVariable.loggedIn = true;
    }
  }

  getFromLocal(key): void {
    this.data[key] = this.storage.get(key);
  }
}
