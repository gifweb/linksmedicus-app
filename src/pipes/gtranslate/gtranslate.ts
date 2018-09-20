import { Pipe, PipeTransform } from '@angular/core';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';

@Pipe({
  name: 'gtranslate',
})
export class GtranslatePipe implements PipeTransform {

  constructor(private gtranslateProvider: GtranslateProvider) { }

  transform(value: string, ...args) {
    if(value === null){
      return '';
    }
    return this.gtranslateProvider.getTranslate(value, args[0]);
  }

}
