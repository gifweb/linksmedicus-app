import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';

@IonicPage({
  name: 'specialties'
})
@Component({
  selector: 'page-specialties',
  templateUrl: 'specialties.html',
})
export class SpecialtiesPage {

  specialties: any[];
  specialtiesLoading: boolean = false;

  generalTopics: any[];
  generalTopicsLoading: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wp: WpProvider,
  ) {
    this.loadSpecialties();
    this.loadGeneralTopics();
  }

  loadSpecialties() {
    this.specialtiesLoading = true;
    this.wp.getSpecialtiesCategories().subscribe((data) => {
      this.specialtiesLoading = false;
      this.specialties = data;
    })
  }


  loadGeneralTopics() {

    this.generalTopicsLoading = true;
    this.wp.getGeneralTopicsCategories().subscribe((data) => {
      this.generalTopicsLoading = false;
      this.generalTopics = data;
    })


  }

  openLinks(category) {
    this.navCtrl.push('links', { category, slug: category.slug });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecialtiesPage');
  }


  openNews(evt) {
    console.log(evt);
    this.navCtrl.push('news', { specialtie: evt })
  }

}
