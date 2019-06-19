import { HomePage } from './../home/home';
import { DataService } from './../../services/data.service';
import { CartService } from './../../services/cart.service';
import { Component } from '@angular/core';
import { CheckOutPage } from '../check-out/check-out';
import { IonicPage, NavController, NavParams, Events, App } from 'ionic-angular';
import _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})

export class ShoppingCartPage{
  tot: any;
  dFee: number;
  finalTotal: any;
  deliveries: any;
  key: any;
  total: any;
  tax: any;

  items;
  resDetails;
  resCusines = [];
  foodItems = [];  
  cartEmpty = true;
  base;
  foodDetails = [];
  subtotal;

  itemsFlag;
  delivery:boolean=true;

  ROOT_URL_RES = 'http://foodcrave.s3.amazonaws.com/Restaurant/';
  imgUrlRes;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private cartService: CartService,
              public events: Events,
              private dataService: DataService,
              private app: App) 
   {
     this.items = [];
   } 



        addQuantity(item,i)
        {

          console.log("Index "+i)

          this.cartService.increaseQuantity(this.resDetails.id, i);
          this.items = this.cartService.loadItems();
          this.extractCartItems();

          
        }

        subtractQuantity(item, i)
        {
          
          this.cartService.decreaseQuantity(this.resDetails.id, i);
          this.items = this.cartService.loadItems();
          this.extractCartItems();
  
        }


        removeDish(item , i)
        {

          console.log("Size of obj "+ _.size(this.foodItems) )

           this.dataService.removeItemFromCart(this.resDetails.id, i).subscribe((res) => {
            // this.items = res
            this.cartService.updateCartItems(res);
            this.items = this.cartService.loadItems();
            if(_.size(this.foodItems) > 1)
            {
              this.extractCartItems();
            }
            else
            {   
                this.navCtrl.setRoot(HomePage);      
            }
            this.events.publish('itemRemoved');
           
        });

         

          // console.log("Itmes up "+ JSON.stringify(this.items));
        }


        checkDelivery(value){

          if(value == 1)
          {
            this.delivery = true;
          }
          else if(value == 2){
             this.delivery = false;
          }

          if(this.deliveries.delivery_fee != null)
              {
                this.dFee = parseFloat(this.deliveries.delivery_fee);
                this.tot = parseFloat(this.items.total);
                this.finalTotal = this.dFee + this.tot;
                this.finalTotal = this.round(this.finalTotal);
              }
              else{
                this.finalTotal = this.total;
                this.finalTotal = this.round(this.finalTotal);
              }

        }

        round(number)
        {
          return Math.round(number * 100) / 100;
        }

        calculateTotal()
        {
          this.total = this.subtotal + this.tax;
          this.total = this.round(this.total);
        }

        onCheckOut(cost)
        {
          console.log("TOtal cost from cart "+JSON.stringify(cost));
          this.navCtrl.push(CheckOutPage, 
            {
                resName: this.resDetails.name,
                resId: this.key,
                deliveryFlag: this.delivery,
                total: cost,
                subtotal: this.items.subtotal,
                tax: this.items.tax
              });
        }

        extractCartItems()
        {
           
           if(_.values(this.items).some(x => x !== undefined))
            {   
              this.cartEmpty = false;
              this.key = this.items.key;
              this.foodItems = this.items[this.key];
              this.deliveries = this.items.third_party_deliveries.ThirdPartyDeliveries;
              this.resDetails = this.items.restaurant_details.Restaurant;
              this.resCusines = this.items.restaurant_details.Restaurant_cuisines;

              this.imgUrlRes = `${this.ROOT_URL_RES}${this.resDetails.id}/${this.resDetails.img}_medium_thumb.${this.resDetails.img_ext}`;
              
            }
            else{
              this.cartEmpty = true;
            }

            console.log("Res detials "+ JSON.stringify(this.resDetails));
        }



        ionViewWillEnter(){

          this.items = this.cartService.loadItems();  
          this.extractCartItems();
          this.checkDelivery(1);
             
        }
     

}
