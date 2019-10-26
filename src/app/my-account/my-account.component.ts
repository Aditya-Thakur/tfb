import { Component, OnInit } from '@angular/core';
import { Global } from '../global';
import { FetchDetailsService } from '../services/fetch-details.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  globalVariable = Global;
  myOrders: Order[];
  showOrders = false;
  error;
  orderStatusId = 0;
  constructor(private fetchDetails: FetchDetailsService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.getOrderByUserId();
    } catch (error) {
      console.log(error);
    }
  }

  logout(): void {
    this.globalVariable.loggedIn = false;
    localStorage.clear();
  }

  async getOrderByUserId() {
    this.myOrders = null;
    this.showOrders = false;
    this.myOrders = await this.fetchDetails.getOrderByUserId(this.globalVariable.loggedInUser.id);
    if (this.myOrders.length > 0) {
      this.showOrders = true;
    } else {
      this.error = 'Something bad happened in getOrderByUserId';
    }

  }

  getProductDetails(productId) {
    this.globalVariable.currentProductId = productId;
    this.router.navigate(['product-details']);
  }

  updateProfile() {
    this.router.navigate(['updateProfile']);
  }

  track(id) {
    this.orderStatusId = id;
  }

}
