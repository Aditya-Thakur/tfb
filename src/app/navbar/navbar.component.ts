import { Component, OnInit, Inject } from '@angular/core';
import { Global } from '../global';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Subscription } from 'rxjs';
import { MessageService } from '../services/message.service';
import { MyCart } from '../models/my-cart';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { FetchDetailsService } from '../services/fetch-details.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public data: any = [];
  globalVariable = Global;
  myCart: MyCart;
  shouldShow = false;
  subscription: Subscription;
  searchForm;
  results: Product[] = [];
  queryField: FormControl = new FormControl();

  constructor(
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private messageService: MessageService,
    private router: Router,
    private fetchDetails: FetchDetailsService,
    private shoppingCart: ShoppingCartService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.myCart = message.text;
      }
    );
    this.searchForm = new FormGroup({
      search: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
    this.shouldShow = false;
    this.searchForm.reset();
    this.myCart = this.shoppingCart.getCart();
    this.getFromLocal('loggedInUser');
    // tslint:disable-next-line: no-string-literal
    this.globalVariable.loggedInUser = this.data['loggedInUser'];
    if (this.globalVariable.loggedInUser != null) {
      this.globalVariable.loggedIn = true;
    }
    this.queryField.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap((query) => this.fetchDetails.getProductsBySearch2(query))
      .subscribe(res => {
        this.results = res;
      });
  }

  logout(): void {
    this.globalVariable.loggedIn = false;
    localStorage.clear();
  }

  clearCart(): void {
    this.globalVariable.myCart = null;
    this.shoppingCart.clearCart();
    this.shouldShow = false;
  }
  getFromLocal(key): void {
    this.data[key] = this.storage.get(key);
  }

  checkout() {
    this.shouldShow = !false;
    this.router.navigate(['cart-details']);
  }

  async search(): Promise<void> {
    this.router.navigate(['products'], { queryParams: { pSearch: this.searchForm.value.search } });
  }

}
