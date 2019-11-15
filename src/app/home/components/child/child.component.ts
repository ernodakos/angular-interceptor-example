import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input() public childBasket;
  @Output() public childBasketChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public changeChildBasket(){
    this.childBasket = 'A basket of rotten red apples from child';
    this.childBasketChange.emit(this.childBasket);
  }

}
