import { Component } from '@angular/core';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';
import { OpenUrlProvider } from '../../providers/open-url/open-url';

@Component({
  selector: 'open-access',
  templateUrl: 'open-access.html'
})
export class OpenAccessComponent {

  constructor(
    public gtp: GtranslateProvider,
    private url: OpenUrlProvider
  ) {

  }

  openUrl(url: string) {
    this.url.open(url);
  }

}
