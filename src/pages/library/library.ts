import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';

@IonicPage({
  name: 'library',
  priority: 'high',
  segment: 'library'
})
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage {

  guidelines: any[];
  guidelinesLoading: boolean = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wp: WpProvider,
  ) {
    this.loadGuideline();
  }

  loadGuideline() {
    this.guidelinesLoading = true;
    this.wp.getGuideline().subscribe((data) => {
      this.guidelinesLoading = false;
      this.guidelines = data;
    })
  }

  openGuideline(guideline) {
    this.navCtrl.push('guidelines', { guideline, slug: guideline.slug });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecialtiesPage');
  }

}
