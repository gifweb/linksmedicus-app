import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, InfiniteScroll, LoadingController, PopoverController } from 'ionic-angular';
import { OpenUrlProvider } from '../../providers/open-url/open-url';
import { WpProvider } from '../../providers/wp/wp';
import { GuidelinesPopoverPage } from './guideline.popover';

@IonicPage({
  name: 'guidelines',
  priority: 'high',
  segment: 'guidelines/:slug',
  defaultHistory: ['library']
})
@Component({
  selector: 'page-guidelines',
  templateUrl: 'guidelines.html',
})
export class GuidelinesPage {

  @ViewChild(Content) content: Content;

  guidelines: any[] = [];
  topics: any[] = [];
  guidelinesLoading: boolean = false;
  guidelinesPage: number = 1;

  guideline: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wp: WpProvider,
    private loadingCtrl: LoadingController,
    private openUrl: OpenUrlProvider,
    private popoverCtrl: PopoverController,
  ) {
    this.guideline = this.navParams.get('guideline');
    if (this.guideline === undefined) {
      this.navCtrl.setPages([{ page: 'library' }], { animate: true, animation: 'back' });
      return;
    }
    this.loadGuidelines(this.guideline.id, true);
  }

  loadGuidelines(guidelineId, flush?, infiniteScroll?: InfiniteScroll) {
    if (flush) {
      this.guidelines = [];
    }
    this.guidelinesLoading = true;
    this.wp.getGuidelines(guidelineId, this.guidelinesPage).subscribe((data) => {
      console.log('getLinks', data);
      data.map(item => {
        this.guidelines.push(item);
        this.topics.push({
          id: item.id,
          title: item.guidelines['0']['002'],
        });
      })
      this.guidelinesLoading = false;
      //this.updateLinks();
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    }, () => {
      this.guidelinesLoading = false;
      infiniteScroll.complete();
    })
  }

  scrollTop() {
    console.log('scrollTop()')
    this.content.scrollToTop(500);
  }

  doInfinite(infiniteScroll) {
    this.guidelinesPage++;
    console.log('doInfinite', this.guidelinesPage);
    this.loadGuidelines(this.guideline.id, false, infiniteScroll)

  }

  openExternal(url) {
    this.openUrl.open(url);
  }

  openNews(evt) {
    console.log(evt);
    this.navCtrl.push('news', { specialtie: evt })
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(GuidelinesPopoverPage, { topics: this.topics }, { showBackdrop: true });
    popover.onDidDismiss((topicId) => {
      if(topicId !== null){
        let element = document.getElementById('topic-' + topicId);
        this.content.scrollTo(0, element.offsetTop, 500);
      }
    })
    popover.present({ev: myEvent});
  }

}
