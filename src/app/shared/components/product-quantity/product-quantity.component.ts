import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Product } from 'src/app/models/product';
import { Global } from 'src/app/global';
import { MyCart } from 'src/app/models/my-cart';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  globalVariable = Global;
  productQuantity: number;
  // tslint:disable: no-input-rename
  @Input('product') product: Product;
  @Input('myCart') myCart: MyCart;

  constructor(private cartService: ShoppingCartService) { }

  async addToCart() {
    const productNewPrice = 0;
    await this.cartService.addToCart(this.product, productNewPrice, '');
  }

  async removeFromCart() {
   await this.cartService.removeFromCart(this.product);
  }

  ngOnInit() {
  }

}
