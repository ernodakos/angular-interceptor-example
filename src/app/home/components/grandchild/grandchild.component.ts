import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grandchild',
  templateUrl: './grandchild.component.html',
  styleUrls: ['./grandchild.component.css']
})
export class GrandchildComponent implements OnInit {
  @Input() public grandChildBasket;
  @Output() public grandChildBasketChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public changeGrandChildBasket(){
    this.grandChildBasket = 'A basket of rotten red apples from grand-child';
    this.grandChildBasketChange.emit(this.grandChildBasket);
  }

}
