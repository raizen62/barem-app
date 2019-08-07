import { Pipe, PipeTransform } from '@angular/core';
import { Injury } from '../types/injury';

@Pipe({
  name: 'injuriesToString'
})
export class InjuriesToStringPipe implements PipeTransform {

  transform(injuries: Injury[]): any {
    let str = '';
    if (injuries != null) {
      for (let i = 0; i < injuries.length; i++) {
        if (i < injuries.length - 1) {
          str += injuries[i].nume + ', ';
        } else {
          str += injuries[i].nume;
        }
      }
    }
    return str;
  }

}
