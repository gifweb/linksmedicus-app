import { Component, ViewChild } from '@angular/core';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';
import { Select } from 'ionic-angular';

@Component({
  selector: 'gtranslate-select',
  templateUrl: 'gtranslate-select.html'
})
export class GtranslateSelectComponent {

  languages: any[] = [];

  @ViewChild('translateSelect') translateSelect: Select;

  constructor(
    public gtp: GtranslateProvider,
  ) {
    this.gtp.getLanguages().then((languages) => {
      this.languages = languages;
    })

  }

  openSelect(evt){
    this.translateSelect.open(evt)
  }

}
