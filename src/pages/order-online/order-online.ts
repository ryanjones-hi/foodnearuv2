import { ResLandingPage } from './../res-landing/res-landing';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
// import { TruncatePipe } from "../../filters/truncate";



@IonicPage()
@Component({
  selector: 'page-order-online',
  templateUrl: 'order-online.html',
})
export class OrderOnlinePage  implements OnInit{
  loading;
  streetAddress: any;
  isService:boolean;
  totalHotels: any;

  ROOT_URL_RES = 'http://foodcrave.s3.amazonaws.com/Restaurant/';

  areaCode;
  lat;
  long;
  hotelsNearMe: any = [];
  hotels: any = [];
  openHotels: any = [];
  closedHotels: any = [];
  todaysOpeningTime;
  hotelIsOpen:boolean = true;
  currentHotel = [];

  resTimings = [];
  imgUrlRes;
  


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataService: DataService,
              public loadingCtrl: LoadingController) {}

  
  get_cuisines(cuisines)
  {
      var all_cuisines='';

      for(var i=0;i< cuisines.length;i++)
      {
          if(i==0)
              all_cuisines+=cuisines[i].cuisine_name;
          else
              all_cuisines+=', '+cuisines[i].cuisine_name;
      }
      return all_cuisines;
  }

  isOpen(timings)
  {
    var timeStamp = new Date().toTimeString().split(" ")[0];
    var weekDays= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var d = new Date();
    var todaysDay = weekDays[d.getDay()];

    console.log(timings);

    for(var i=0; i<timings.length; i++)
    {
      // console.log("sys time"+timeStamp);
      // console.log("hotel time"+timings[i].Restaurant_timings[i].start_time);

      if(timings[i].Restaurant_timings[i].start_time != undefined)
      {
        if(timings[i].Restaurant_timings[i].start_time >= timeStamp && timings[i].Restaurant_timings[i].days == todaysDay)
        {
          this.hotelIsOpen == true;
          console.log("open")
        }
        else
        { 
          this.hotelIsOpen == false;
          console.log("close")
        }
      }
    }
    
  }

  getImgUrl(hotel)
  {
    let resUrl;
    resUrl = `${this.ROOT_URL_RES}${hotel.Restaurant.id}/${hotel.Restaurant.img}_medium_thumb.${hotel.Restaurant.img_ext}`;
    return resUrl;
  }

  getTodaysOpeningTime(time,id){
    var weekDays= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var d = new Date();
    var todaysDay = weekDays[d.getDay()];
    
    // console.log(time);
    
    // for(var i=0; i<time.length; i++)
    // {
    //   console.log(time[i].restaurant_id)
    //   console.log(id)
    //   if(time[i].id == id)
    //   {
    //     console.log(time[i].id);
    //     console.log(time[i].days);
    //     console.log(todaysDay);
    //     console.log(time[i].start_time);
    //     console.log(timeStamp);
    //   }
      
    // }
    

    for(var i=0; i<time.length; i++)
    {
      if(time[i].restaurant_id == id && time[i].days == todaysDay)
      {
        return time[i].start_time;
      }
    }
    
  }

  onSelectRes(restaurant){
    console.log(restaurant)
    this.navCtrl.push(ResLandingPage,{
      'name':restaurant.Restaurant.name,
      'id':restaurant.Restaurant.id
    });
  }

  presentLoadingDefault() {
  this.loading = this.loadingCtrl.create({
    content: 'Getting Restaurants near you!'
  });
  }


  ngOnInit(){

    this.presentLoadingDefault();

    this.areaCode = this.navParams.get('zipCode');
    this.lat = this.navParams.get('lat');
    this.long = this.navParams.get('long');
    this.streetAddress = this.navParams.data;

    console.log("street address "+ this.streetAddress);

    if(this.areaCode !== undefined)
    {
      this.loading.present();
      this.dataService.getResNearMe(this.areaCode).subscribe((res) => 
        {
          this.hotelsNearMe = res.restaurants
          this.totalHotels = res.isset
          this.loading.dismiss();
          if(this.totalHotels == 0)
          {
            this.isService = false;
          }
          else{
            this.isService = true;
          }
        });       
    }
    else if(this.lat !== undefined && this.long !== undefined)
    {
        this.loading.present();
        this.dataService.getResByLatLon(this.lat,this.long).subscribe((res) => {
          this.hotelsNearMe = res.restaurants
          this.totalHotels = res.isset
          this.loading.dismiss();
          if(this.totalHotels == 0)
          {
            this.isService = false;
          }
          else{
            this.isService = true;
          }
        });
    }
    else{
        this.loading.present();
        this.dataService.getHotelsNearStreet(this.streetAddress).subscribe((res)=> {
        // console.log(res);
        this.loading.dismiss();
        this.hotelsNearMe = res.restaurants
        this.totalHotels = res.isset

        if(this.totalHotels == 0)
        {
          this.isService = false;
        }
        else{
          this.isService = true;
        }
        

      })
    }
    
    
    
  }

}
