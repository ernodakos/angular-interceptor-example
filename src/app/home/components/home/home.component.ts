import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public homeBasket = 'A basket of nice red apples';
  constructor() { }

  ngOnInit() {
  }

  public changeBasket(){
    this.homeBasket = 'A basket of rotten red apples';
  }
}
