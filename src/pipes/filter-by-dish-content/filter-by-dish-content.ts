import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterByDishContentPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'filterDish',
})
export class FilterByDishContentPipe implements PipeTransform {
  
  transform(value: any, term: any) {
    if( term === undefined || value === undefined || term === null || value === null) return value;
      return value.filter((value) => {
       
        for(var i =0; i < value.menu.length; i++)
        {
          
          if(value.menu[i].food.description.toLowerCase().includes(term.toLowerCase()) || value.menu[i].food.name.toLowerCase().includes(term.toLowerCase()))
          {
            return true; 
          }
        }
    })
  }
}
