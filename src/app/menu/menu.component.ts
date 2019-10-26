import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  async openShop(id: number) {
    this.router.navigate(['/products'], {queryParams : {subid: id}});
  }
  async openShop2(id: number) {
    this.router.navigate(['/products'], {queryParams : {pid: id}});
  }

}
