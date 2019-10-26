import { Component, OnInit } from '@angular/core';
import { MyCart } from 'src/app/models/my-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { Global } from 'src/app/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  myCart: MyCart;
  globalVariable = Global;
  showShippingForm = false;
  subscription: Subscription;
  constructor(
               private messageService: MessageService,
               private router: Router,
               private cartService: ShoppingCartService) {
                this.subscription = this.messageService.getMessage().subscribe(
                  message => {
                    this.myCart = message.text;
                  });
  }

  ngOnInit() {
   this.myCart = this.cartService.getCart();
  }

  triggerShippingForm() {
    this.showShippingForm = true;
  }
  clearCart(): void {
    this.globalVariable.myCart = null;
    this.cartService.clearCart();
  }
  async showDetails(id) {
    this.router.navigate(['product-details'], { queryParams: { pId: id } });
  }

}
