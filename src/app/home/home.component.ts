import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { FetchDetailsService } from '../services/fetch-details.service';
import { Product } from '../models/product';
import { Subcategory } from '../models/subcategory';
import { Global } from '../global';
import { Subscription } from 'rxjs';
import { MyCart } from '../models/my-cart';
import { MessageService } from '../services/message.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  showCategories = false;
  showProduct = false;
  showSubcategories = false;
  showProductDetails = false;
  isActive = false;
  categories: Category[] = [];
  subcategories: Subcategory[];
  products: Product[];
  error = '';
  globalVariable = Global;
  subscription: Subscription;
  myCart: MyCart;
  categoryDict = new Map<Category, Subcategory[]>();
  currentSubcategory: Subcategory[];
  constructor(private fetchDetails: FetchDetailsService,
              private shoppingCart: ShoppingCartService,
              private messageService: MessageService,
              private router: Router) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.myCart = message.text; });
  }


  async ngOnInit(): Promise<void> {
    try {
      this.myCart = this.shoppingCart.getCart();
      await this.getAllCategories();
      this.categories.forEach(async element => {
          const subcategories = await this.fetchDetails.getAllSubcategories(element.id);
          this.categoryDict.set(element, subcategories);
        });
      console.log(this.categoryDict);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCategories() {
    this.categories = null;
    this.showCategories = false;
    this.categories = await this.fetchDetails.getAllCategories();
    if (this.categories.length > 0) {
      this.showCategories = true;
    } else {
      this.error = 'Something bad happened in get All Subcategories';
    }
  }

  // async getAllSubcategories(categoryId): Promise<void> {
  //   this.subcategories = null;
  //   // if (this.showSubcategories === true) {
  //   //   this.showSubcategories = false;
  //   // } else {
  //   this.showProduct = false;
  //   this.subcategories = await this.fetchDetails.getAllSubcategories(categoryId);
  //   await this.makeCategoryActive(categoryId);
  //   if (this.subcategories.length > 0) {
  //       this.showSubcategories = true;
  //     } else {
  //       this.error = 'Something bad happened in getAllSubcategories';
  //     }
  //   }

  categoryClicked(key) {
    this.currentSubcategory = this.categoryDict.get(key);
    this.showSubcategories = true;
  }


makeCategoryActive(categoryId): void {
    for (const item of this.categories) {
      if (item.id === categoryId) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    }
  }

makeSubcategoryActive(subcategoryId): void {
    for (const item of this.subcategories) {
      if (item.id === subcategoryId) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    }
  }


  async getAllProducts(subcategory: Subcategory): Promise<void> {
    this.products = null;
    this.showProduct = false;
    this.error = null;
    // this.makeSubcategoryActive(subcategory.id);
    this.router.navigate(['/products'], {queryParams : {subid: subcategory.id}});
  }
}
