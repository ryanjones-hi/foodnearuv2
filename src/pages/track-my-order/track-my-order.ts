import { DataService } from './../../services/data.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  ProgressBar  from 'progressbar.js';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-track-my-order',
  templateUrl: 'track-my-order.html',
})
export class TrackMyOrderPage implements OnInit{
  myVar: number;
  bar: any;
  num=0.2;
  driverDetails:boolean;
  orderSatus;
  refreshId;


  deliveryStatus;
  newOrderStatus;
  trackingStatus;
  status:boolean = false;

  cartItems;

  orderNum;

  @ViewChild('target') target;
  @ViewChild('target2') target2;



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataService: DataService,
              private storage: Storage) {

                this.cartItems = this.navParams.data;
                this.orderNum = this.cartItems.orderid;
                console.log("Data "+ JSON.stringify(this.cartItems));
              }

  doRefresh(refresher)
  {
    //  console.log('Begin async operation', refresher);

     if(this.orderNum !== undefined)
      {
        this.getDetails();
      }

      setTimeout(() => {
        console.log('Async operation has ended')
        this.driverDetails = true;
        refresher.complete();
      }, 2000);
    }

    // trackOrder(form)
    // {
      

    
    // }


    

    getOrderStatus()
    {
      this.dataService.getOrderStatus(this.orderNum).subscribe((res) => {
            this.trackingStatus = res;
            this.status = true

            if(this.trackingStatus.name !== "")
            {
              this.driverDetails = true;
            }

            if(this.trackingStatus.order_delivery_status === "Not Accepted")
              {
                this.trackingStatus.order_delivery_status = "Confirming your order with the Restaurant."
                this.bar.animate(0.2);
              }
              if(this.trackingStatus.order_delivery_status === "Accepted")
              {
                this.trackingStatus.order_delivery_status = "Your food is being prepared and will be delivered by"
                this.bar.animate(0.4);
                this.driverDetails = true;
              }
              else if(this.trackingStatus.order_delivery_status === "Confirmed")
              {
                this.trackingStatus.order_delivery_status = "Order Confirmed"
                this.bar.animate(0.6);
              }
              else if(this.trackingStatus.order_delivery_status === "Picked Up")
              {
                this.trackingStatus.order_delivery_status = "Your food is out for delivery!"
                this.bar.animate(0.8);
              }
              else if(this.trackingStatus.order_delivery_status === "Delivered")
              {
                this.bar.animate(1);
                this.trackingStatus.order_delivery_status = "Order Delivered."
                 clearInterval(this.refreshId);
              }
          });
    }

    getDetails()
    {

      this.dataService.getInvoice(this.orderNum).subscribe((res) =>
        {
          console.log("Invoice"+ JSON.stringify(res.order));
          this.deliveryStatus = res.order;
          this.getOrderStatus();
        });

    }

    removeId()
    {
      this.storage.remove('orderId').then((val) => {
      console.log("Id removed");
      });
    }

  
  ionViewDidLoad(){

        var elem = document.getElementById("bar");   
        this.bar = new ProgressBar.Line(elem, {
        strokeWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'},
        from: {color: '#FFEA82'},
        to: {color: '#4ee711'},
        step: (state, bar) => {
          bar.path.setAttribute('stroke', state.color);
        }
      });

  }

  ngOnInit()
  { 
  
    if(this.orderNum !== undefined)
    {
      this.getDetails();
    }

    this.storage.get('orderId').then((val) => {
    console.log('Your id is', val);
    if(val)
    {
      this.orderNum = val;
      this.getDetails();
      this.refreshId = setInterval(() => {
        this.getOrderStatus();
      }, 5000);
    }
  });
    
}

ionViewCanLeave()
{
  clearInterval(this.refreshId);
}


  

}
