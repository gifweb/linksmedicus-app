import { Component } from '@angular/core';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';

@Component({
  selector: 'open-access',
  templateUrl: 'open-access.html'
})
export class OpenAccessComponent {

  constructor(
    public gtp: GtranslateProvider,
  ) {
  }

}
