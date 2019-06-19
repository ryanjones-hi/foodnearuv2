import { CartService } from './../../services/cart.service';
import { TrackMyOrderPage } from './../track-my-order/track-my-order';
import { DataService } from './../../services/data.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';




import _ from 'lodash';

@IonicPage()
@Component({ 
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  invalidGiftCard: boolean;
  giftCardErrMsg: any;
  promoDisable: boolean = false;
  couponValue: any;
  couponRes: any;
  promoCode: boolean;
  invalidCoupon: boolean;
  errMsg: any;
  cartItems: any;
  calculatedTip = 0;
  newTotal: number;
  cardFlag: boolean;
  paymentMethod;
  couponCode = 0;
  giftCardValue = 0;
  userData;
  formData;
  combinedObj;
  tip = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataService: DataService,
              private cartService: CartService,
              private storage: Storage,
              private alertController: AlertController) {

    this.userData = this.navParams.data.serverRes;
    this.formData = this.navParams.data.formObject;
    this.newTotal = this.userData.total;
    console.log("User data "+ JSON.stringify(this.userData));
    console.log("Form data "+ JSON.stringify(this.formData));

    this.combinedObj = _.assign(this.userData, this.formData);
    console.log("Combined Obj "+ JSON.stringify(this.combinedObj));

  }

  calculateTip()
  {  
    this.newTotal = _.round(this.userData.total + ((this.tip/100) * this.userData.total), 2);
    this.calculatedTip = _.round((this.tip/100) * this.userData.total,2);

  }

  payment() 
  {
    if(this.paymentMethod == "Credit")
    {
      this.cardFlag = true;
    }
    else
    {
      this.cardFlag = false;
    }
  }

  onSubmitPromo(form)
  {
    form.email = this.userData.email;
    form.phone = this.userData.phone;
    console.log(JSON.stringify(form));

    this.dataService.validateCoupon(form).subscribe(
      (res) => {
        if(res.is_valid == false)
        {
          this.invalidCoupon = true;
          this.errMsg = res.error;
        }
        else if(res.is_valid == true)
        {
          this.invalidCoupon = false;
          this.promoCode = false;
          this.promoDisable = true;
          this.couponRes = res.order_coupon;
          this.couponValue = this.couponRes.value
          this.newTotal = this.newTotal - this.couponValue;
          this.newTotal = _.round(this.newTotal, 2);
          this.errMsg = "Coupon has been applied"
        }
        (err) =>{
          console.log(err);
        }
    });
  }

  onSubmitGift(form)
  {
    this.dataService.validate_gift_card(form).subscribe(
      (res) => {
        if(res.is_valid == false)
        {
          this.invalidGiftCard = true;
          this.giftCardErrMsg = res.error;
        }
      }
    )
  }


  onCompleteOrder(formObj)
  {

    const alert = this.alertController.create({
      title: 'Place Order',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to place the order?',
      buttons: [{
        text: 'Yes',
        handler: () =>{
        
              var month, year;
              function split(str){
              var arr = str.split('/');
              month = arr[0];
              year = arr[1];
            }

          if(formObj.payment == "Credit")
          {
            split(formObj.exp);
          }
          
          formObj.addressEditable = true;
          formObj.pre_total = this.userData.total;
          formObj.order_track = "FoodNearUMobileSite";
          formObj.OrderType = formObj.order;
          formObj.have_gift_card = false;         
          let locObj = this.cartService.getLocation();

          formObj.location = locObj;

          if(this.calculatedTip != 0)
          {
            this.userData.total = this.newTotal;
          }
          const payload = _.assign({}, formObj, this.combinedObj);

          console.log("Month and year "+month+" "+year)
          payload.delcharge = payload.distance;
          
          if(payload.payment == "Credit")
            {
              payload.month = month;
              payload.year = year;
            }
          
          payload.pre_total = payload.subtotal +  payload.tax;

        //  var result = _.omit(payload, ['preorder_time','preorder_date']);

          this.dataService.postUserPaymentDetails(payload).subscribe((res) => {
              this.cartItems = res;
              this.storage.set('orderId', this.cartItems.orderid);
              this.navCtrl.push(TrackMyOrderPage, this.cartItems)
          });
        }
      },
      {
          text: 'No',
          handler: () =>{
          
        }  
      }]
    })

    alert.present(); 
  }
  

}
