import { MenuDetailsPage } from './../menu-details/menu-details';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-res-landing',
  templateUrl: 'res-landing.html',
})
export class ResLandingPage implements OnInit{
  detailMenu: boolean;

  category: string;
  restaurantId;
  restaurantName;
  lat;
  lng;
  resMenus = [];
  resDetails = [];
  resTimings:any = [];
  ROOT_URL_RES = 'http://foodcrave.s3.amazonaws.com/Restaurant/';

  menus;
  data = [];
  showDetails: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataService: DataService) {

                this.category = "Menu";
                this.showDetails = false;
  }

  isRealValue(obj)
  {
      return obj && obj !== 'null' && obj !== 'undefined';
  }

  onSlectMenu(menu){
    if(menu != null)
    {
     this.navCtrl.push(MenuDetailsPage, menu);
    }
    
  }

   toggleDetails(menu, name) {
    //  debugger;
    if (this.showDetails) {
        this.showDetails = false;
        // data.icon = 'ios-add-circle-outline';

    } else {
        this.menus = menu;
        this.showDetails = true;
        // data.icon = 'ios-remove-circle-outline';
    }
    
  }

  

  tConvert (time) {
      var ts = time;
      var H = +ts.substr(0, 2);
      var h:any = (H % 12) || 12;
      h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
      var ampm = H < 12 ? " AM" : " PM";
      ts = h + ts.substr(2, 3) + ampm;
      return ts;
  }

  getImgUrl(hotel)
  {
    let resUrl;
    resUrl = `${this.ROOT_URL_RES}${hotel.id}/${hotel.img}_medium_thumb.${hotel.img_ext}`;
    return resUrl;
  }

  ngOnInit(){
    this.restaurantId = this.navParams.get('id');
    this.restaurantName = this.navParams.get('name');

    this.dataService.getResDetails(this.restaurantId).subscribe((res) => {
    this.resMenus = res.restaurant_categoreis;
    this.resDetails = res.restaurant.Restaurant;
    this.resTimings = res.restaurant.Restaurant_timings;
    this.lat = Number(res.restaurant.Restaurant.latitude)
    this.lng = Number(res.restaurant.Restaurant.longitude)
    });
  }

}
