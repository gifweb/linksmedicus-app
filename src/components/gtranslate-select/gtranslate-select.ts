import { Component } from '@angular/core';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';

@Component({
  selector: 'gtranslate-select',
  templateUrl: 'gtranslate-select.html'
})
export class GtranslateSelectComponent {

  languages: any[] = [];

  constructor(
    public gtp: GtranslateProvider,
  ) {
    this.gtp.getLanguages().then((languages) => {
      this.languages = languages;
    })

  }

}
