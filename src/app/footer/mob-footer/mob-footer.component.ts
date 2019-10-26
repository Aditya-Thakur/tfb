import { Component, OnInit, Inject } from '@angular/core';
import { Global } from 'src/app/global';
import { MyCart } from 'src/app/models/my-cart';
import { Subscription } from 'rxjs';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { MessageService } from 'src/app/services/message.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-mob-footer',
  templateUrl: './mob-footer.component.html',
  styleUrls: ['./mob-footer.component.css']
})
export class MobFooterComponent implements OnInit {

  public data: any = [];
  globalVariable = Global;
  myCart: MyCart;
  shouldShow = false;
  subscription: Subscription;
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
