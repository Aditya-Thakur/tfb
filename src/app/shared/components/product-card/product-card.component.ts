import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Global } from 'src/app/global';
import { Subscription } from 'rxjs';
import { MyCart } from 'src/app/models/my-cart';
import { FetchDetailsService } from 'src/app/services/fetch-details.service';
import { ProductVariety } from 'src/app/models/product-variety';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  subscription: Subscription;
  productQuantity = 0;
  productVarietyAvailable = false;
  addedToWishlist = false;
  myproductVariety: ProductVariety[];
  // tslint:disable: no-input-rename
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('myCart') myCart: MyCart;
  globalVariable = Global;
  productVarietyForm;
  constructor(
    private messageService: MessageService,
    private cartService: ShoppingCartService,
    private fetchDetails: FetchDetailsService,
    private router: Router) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.myCart = message.text; });
    this.productVarietyForm = new FormGroup({
      productVariety: new FormControl('', [
        Validators.required
      ])
    });
  }

  async ngOnInit() {
    await this.getQuantity();
    this.myproductVariety = await this.fetchDetails.getProductVarietyByProductId(this.product.id);
    if (this.myproductVariety[0].productId !== 0) {
      this.productVarietyAvailable = true;
      this.product.priceVarietyAvailable = true;
    }
  }


  async addToCart() {
    let productNewPrice = 0;
    let productQuantityType = '';
    try {
      if (this.productVarietyAvailable) {
        productNewPrice = this.productVarietyForm.value.productVariety;
        productQuantityType = '1kg';
      }
      await this.cartService.addToCart(this.product, productNewPrice, productQuantityType);
      this.globalVariable.cartActive = true;
      await this.getQuantity();
    } catch (e) {
      console.log(e);
    }
  }
  async getQuantity() {
    if (this.myCart) {
      this.productQuantity = await this.myCart.getQuantity(this.product);
    } else {
      this.productQuantity = 0;
    }
  }

  async showDetails() {
    this.router.navigate(['product-details'], { queryParams: { pId: this.product.id } });
  }

  // async addToWishlist() {
  //   await this.fetchDetails.addToWishlist(this.product.id);
  //   this.addedToWishlist = this.addedToWishlist ? false : true;
  // }

}
