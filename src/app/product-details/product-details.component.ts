import { Component, OnInit, Input } from '@angular/core';
import { FetchDetailsService } from '../services/fetch-details.service';
import { Product } from '../models/product';
import { Global } from '../global';
import { MyCart } from '../models/my-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';
import { ProductVariety } from '../models/product-variety';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  pId: number;
  globalVariable = Global;
  productQuantity = 0;
  productVarietyAvailable = false;
  subscription: Subscription;
  otherProducts: Product[];
  myproductVariety: ProductVariety[];
  productVarietyForm;
  successMessage = '';
  // tslint:disable: no-input-rename
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('myCart') myCart: MyCart;

  constructor(private messageService: MessageService,
              private cartService: ShoppingCartService,
              private fetchDetails: FetchDetailsService,
              private route: ActivatedRoute,
              private router: Router) {
    this.subscription = this.messageService.getMessage().subscribe(
      message => {
        this.myCart = message.text;
      });
    this.productVarietyForm = new FormGroup({
        productVariety: new FormControl('')
      });
  }

  async addToWishlist() {
    this.successMessage = await this.fetchDetails.addToWishlist(this.product.id);
  }

  async getQuantity() {
    if (this.myCart) {
      this.productQuantity = await this.myCart.getQuantity(this.product);
    } else {
      this.productQuantity = 0;
    }
  }

  async ngOnInit() {
    await this.route.queryParams.subscribe(async queryParams => {
      // tslint:disable: no-string-literal
      this.pId = Number(queryParams['pId']);
      this.myCart = this.cartService.getCart();
      this.product = await this.fetchDetails.getProductByProductId(this.pId);
      this.myproductVariety = await this.fetchDetails.getProductVarietyByProductId(this.product.id);
      await this.getQuantity();
      await this.peopleAlsoBought();
      if (this.myproductVariety[0].productId !== 0) {
        this.productVarietyAvailable = true;
        this.product.priceVarietyAvailable = true;
      }
    });
  }

  async buyNow() {
    await this.addToCart();
    this.router.navigate(['cart-details']);
  }

  async addToCart() {
    let productNewPrice = 0;
    let productQuantityType = '';
    try {
      if (this.productVarietyAvailable) {
        productNewPrice = this.productVarietyForm.value.productVariety;
        productQuantityType = '1 kg';
      }
      await this.cartService.addToCart(this.product, productNewPrice, productQuantityType);
      this.globalVariable.cartActive = true;
      await this.getQuantity();
    } catch (e) {
      console.log(e);
    }
  }

  async peopleAlsoBought() {
    try {
      this.otherProducts = await this.fetchDetails.peopleAlsoBought(this.product.category);
    } catch (e) {
      console.log(e);
    }
  }
}
