import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menebar',
  templateUrl: './menebar.component.html',
  styleUrls: ['./menebar.component.css']
})
export class MenebarComponent implements OnInit {

  showIt = false;
  constructor() { }

  ngOnInit() {
    this.showIt = true;
    console.log(this.showIt);
  }


}
