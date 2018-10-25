import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';

@IonicPage({
  name: 'archive',
  priority: 'high',
  segment: 'archive'
})
@Component({
  selector: 'page-archive',
  templateUrl: 'archive.html',
})
export class ArchivePage {

  archives: any[];
  archivesLoading: boolean = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wp: WpProvider,
  ) {
    this.loadArchives();
  }

  loadArchives() {
    this.archivesLoading = true;
    this.wp.getArchives().subscribe((data) => {
      this.archivesLoading = false;
      this.archives = data;
    })
  }

  openArchive(archive) {
    this.navCtrl.push('news', { archive });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecialtiesPage');
  }

  openNews(evt) {
    console.log(evt);
    this.navCtrl.push('news', { specialtie: evt })
  }

}
