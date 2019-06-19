// import { FilterByNamePipe } from './../../filters/filterByName';
import { DataService } from './../../services/data.service';
import { OrderOnlinePage } from './../order-online/order-online';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-select-area',
  templateUrl: 'select-area.html',
})
export class SelectAreaPage implements OnInit{

searchQuery: string = '';
// locations = ['Fremont, CA - 94538','Dublin, CA - 94568','San Ramon, CA - 94582'];
// initialLocations = ['Fremont, CA - 94538','Dublin, CA - 94568','San Ramon, CA - 94582'];

cities:any = [];
initailCities: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataService: DataService) {
    
  }


  getItems(ev: any) {
    
    // Reset items back to all of the items
    this.cities.City = this.initailCities.City;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.cities.City = this.cities.City.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onSelectLoc(city){
    this.navCtrl.push(OrderOnlinePage,{
      'zipCode':city.ZIPCode
    });
  }

  ngOnInit(){
    this.dataService.getCities().subscribe((res) => this.cities = res)
  }

}
