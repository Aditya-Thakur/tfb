import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MyCart } from 'src/app/models/my-cart';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';
import { FetchDetailsService } from 'src/app/services/fetch-details.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // tslint:disable: no-input-rename
  pid: number;
  subid: number;
  pSearch: string;
  @Input('myCart') myCart: MyCart;
  subscription: Subscription;
  products: Product[];
  error = false;
  constructor(
    private messageService: MessageService,
    private fetchDetails: FetchDetailsService,
    private route: ActivatedRoute,
    private shoppingCart: ShoppingCartService) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.myCart = message.text; });
  }

  async ngOnInit() {
    await this.route.queryParams.subscribe(async queryParams => {
      this.error = false;
      // tslint:disable: no-string-literal
      this.pid = Number(queryParams['pid']);
      this.pSearch = queryParams['pSearch'];
      this.subid = queryParams['subid'];
      this.products = [];
      this.myCart = this.shoppingCart.getCart();
      if (this.pid) {
        this.products = await this.fetchDetails.getProductsByCategoryId(this.pid);
      } else if (this.pSearch) {
        this.products = await this.fetchDetails.getProductsBySearch(this.pSearch);
      } else {
        this.products = await this.fetchDetails.getProductsBySubcategoryId(this.subid);
      }
      if (this.products.length === 0) {
        this.error = true;
      }
    });

  }

}
