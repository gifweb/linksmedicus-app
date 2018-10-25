import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { ViewChild } from '@angular/core';

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

  loaded: number = 0;

  @ViewChild('content') content: Content;

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
      this.generalTopicsCheck()
    })
  }


  loadGeneralTopics() {

    this.generalTopicsLoading = true;
    this.wp.getGeneralTopicsCategories().subscribe((data) => {
      this.generalTopicsLoading = false;
      this.generalTopics = data;
      this.generalTopicsCheck()
    })


  }

  generalTopicsCheck() {
    const isGeneralTopics = this.navParams.get('generalTopics');

    console.log('isGeneralTopics', isGeneralTopics);
    if (isGeneralTopics) {
      this.loaded++;
      if (this.loaded > 1) {
        setTimeout(() => {
          let element = document.getElementById('generalTopics');
          if(this.content){
            this.content.scrollTo(0, element.offsetTop, 0);
          }
        }, 50)

      }
    }

  }


  openLinks(category) {
    console.log('cat', category);
    this.navCtrl.push('posts', { specialtie: category.id, title: category.name });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecialtiesPage');
  }


  openNews(evt) {
    console.log(evt);
    this.navCtrl.push('news', { specialtie: evt })
  }

}
