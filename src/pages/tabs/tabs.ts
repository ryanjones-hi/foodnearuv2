import { CartService } from './../../services/cart.service';
import { UserAccountPage } from './../user-account/user-account';
import { ShoppingCartPage } from './../shopping-cart/shopping-cart';
import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ShoppingCartPage;
  tab3Root = UserAccountPage;
  

  cartItems;
  cartNotEmpty: boolean = false;
  tab1BadgeCount : number = 0; // default 0

  constructor(private cartService:CartService,
              public events: Events) {
    // this.cartItems = this.cartService.loadItems()
    // this.num = this.cartItems.length;
    // console.log("num is "+ this.num);

    events.subscribe('itemAdded', (res) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.tab1BadgeCount++;
      this.cartNotEmpty = true
     
    });

    events.subscribe('itemRemoved', (res) => {
     
      if(this.tab1BadgeCount >= 1)
      {
        
        this.tab1BadgeCount--;
      }
      if(this.tab1BadgeCount < 1)
      {
        
        this.cartNotEmpty = false;
      }
      
    });

  }


}
