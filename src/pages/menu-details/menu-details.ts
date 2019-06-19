import { DishDetailsPage } from './../dish-details/dish-details';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-menu-details',
  templateUrl: 'menu-details.html',
})
export class MenuDetailsPage implements OnInit{

  menuDetails;
  resId;
  menus = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}


  isRealValue(obj)
  {
      return obj && obj !== 'null' && obj !== 'undefined';
  }

  onDishSelect(menu){
    console.log("Menu "+ JSON.stringify(menu.Beverages));
    if(this.isRealValue(menu))
    {
       this.navCtrl.push(DishDetailsPage,{
      'dishId': menu.food.id,
      'resId': this.resId.restaurant_id
      });
    }
   
  }

  ngOnInit(){
    this.menuDetails = this.navParams.data;
    this.resId = this.menuDetails.restaurant_menus;
    this.menus = this.menuDetails.menu;
     console.log("Menu is "+JSON.stringify(this.resId.restaurant_id));
  }

}
