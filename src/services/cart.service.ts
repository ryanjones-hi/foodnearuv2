import { DataService } from './data.service';
import {Injectable} from '@angular/core';



@Injectable()
export class CartService{

    private items = [];
    locationObj;

    constructor(private dataService: DataService){
        this.items = [];
    }

    addItem(itemDetails){

        this.items = itemDetails;

    }

    loadItems(){
        return this.items;
    }

    removeItem(resId, index)
    {   
        
        this.dataService.removeItemFromCart(resId, index).subscribe((res) => {
            this.items = res
            this.updateCartItems(this.items);
        });
    }


    increaseQuantity(resId, index)
    {
        this.dataService.increaseQuantity(resId, index).subscribe((res) => {
            this.items = res
        });
    }

    decreaseQuantity(resId, index)
    {
        this.dataService.decreaseQuantity(resId, index).subscribe((res) => {
            this.items = res
        });
    }

    updateCartItems(item){
       
        this.items = item;
    }

    setLocation(item){
        this.locationObj = item;
    }

    getLocation(){
        return this.locationObj;
    }

    ionViewWillUnload()
    {
        this.items = [];
        console.log("View unload called--items are",this.items);
    }


}