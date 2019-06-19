import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(values: any, term: any): any {
    // Check if term is undefined
    if( term === undefined || values === undefined || term === null || values === null) return values;

      return values.filter(function(value){ 
          if(value.City.toLowerCase().includes(term.toLowerCase()))
          {
            return value.City.toLowerCase().includes(term.toLowerCase());
          }
          else if(value.ZIPCode.toLowerCase().includes(term.toLowerCase()))
          {
            return value.ZIPCode.toLowerCase().includes(term.toLowerCase());
          }
          else if(value.StateCode.toLowerCase().includes(term.toLowerCase()))
          {
            return value.StateCode.toLowerCase().includes(term.toLowerCase());
          }
    })
  }

}
