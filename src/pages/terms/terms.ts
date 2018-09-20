import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';

@IonicPage({
  name: 'terms',
  priority: 'high',
  segment: 'terms-of-use'
})
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {

  terms: any[];
  termsLoading: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wp: WpProvider,
    public gtp: GtranslateProvider,
  ) {
    this.loadTerms();
  }

  loadTerms() {
    this.termsLoading = true;
    this.wp.getPage('terms-of-use').subscribe((data) => {
      this.termsLoading = false;
      this.terms = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
  }

}
