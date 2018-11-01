import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { LoadingController } from 'ionic-angular';
import { InfiniteScroll } from 'ionic-angular';
import { OpenUrlProvider } from '../../providers/open-url/open-url';
import { GtranslateProvider } from '../../providers/gtranslate/gtranslate';
import { FavProvider } from '../../providers/fav/fav';

@IonicPage({
  name: 'posts',
  segment: 'posts/:specialtie/:title',
  priority: 'high'
})
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  @ViewChild(Content) content: Content;

  posts: any[];
  postsLoading: boolean = false;
  postsPage: number = 1;

  archive: any = false;
  title: string = '';

  favs: any[] = [];


  _specialtie: any;
  get specialtie(): number {
    return this._specialtie;
  }
  set specialtie(value: number) {
    console.log('set')
    this.postsPage = 1;
    this._zone.run(() => {
      this.loadPosts(value, true);
    })
    this._specialtie = value;
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private wp: WpProvider,
    private loadingCtrl: LoadingController,
    private openUrl: OpenUrlProvider,
    public gtp: GtranslateProvider,
    private fav: FavProvider,
    private _zone: NgZone,
  ) {
    //this.loadSpecialties();

    this.init();
  }

  async init() {
    this.archive = (this.navParams.get('archive')) ? this.navParams.get('archive') : false;
    this.specialtie = (this.navParams.get('specialtie')) ? this.navParams.get('specialtie') : 177;
    this.title = (this.navParams.get('title')) ? this.navParams.get('title') : '';
    console.log('init', this.specialtie)
    if (!this.navParams.get('specialtie')) {
      const slug = this.navParams.get('slug');
      if (slug) {
        console.log('specialtieBySlug 1', slug);
        const specialtieBySlug = await this.wp.getSpecialtieBySlug(slug).toPromise()
        console.log('specialtieBySlug 2', specialtieBySlug);
        this.specialtie = specialtieBySlug.id;
        this.title = specialtieBySlug.name;
      }
    }



    this.gtp.last$.subscribe((last) => {
      this.updateLinks();
    })
    this.loadFavs();

  }

  /*loadSpecialties() {
    this.specialtiesLoading = true;
    this.wp.getSpecialties().subscribe((data) => {
      this.specialtiesLoading = false;
      console.log('getSpecialties', data);
      this.specialties = data;
      this.specialtie = 177;
    })
  }*/

  openArticle(article) {
    console.log('article', article)
    this.openUrl.open(article.url);
    //this.navCtrl.push('article', { article })
  }

  loadFavs() {
    console.log('loadFavs');
    this.fav.getItems().then((data) => {
      console.log('loadFavs loaded!', data);
      this.favs = data;
    }).catch(err => {
      console.log('loadFavs err', err);
    })
  }

  isFav(link) {
    return this.favs.find(fav => fav.id === link.id)
  }

  addFav(link) {
    this.fav.addItem(link).then((res) => {
      console.log(res);
      this.loadFavs();
    })
  }

  removeFav(link) {
    this.fav.removeItem(link).then((res) => {
      console.log(res);
      this.loadFavs();
    })
  }

  loadPosts(specialtie, flush?, infiniteScroll?: InfiniteScroll) {
    console.log('loadPosts')
    if (flush) {
      this.posts = [];
    }
    this.postsLoading = true;
    this.wp.getPosts(specialtie, this.postsPage, this.archive).subscribe((data) => {
      console.log('getPosts', data);
      data.map(item => {
        this.posts.push(item);
      })
      this.postsLoading = false;
      this.updateLinks();
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    }, () => {
      this.postsLoading = false;
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    })
  }

  scrollTop() {
    console.log('scrollTop()')
    this.content.scrollToTop(500);
  }

  doInfinite(infiniteScroll) {
    this.postsPage++;
    console.log('doInfinite', this.postsPage);
    this.loadPosts(this._specialtie, false, infiniteScroll)

  }

  updateLinks() {
    //use $timeout wait for items to be rendered before looking for links
    console.log('updateLinks');

    setTimeout(() => {
      const $links = document.querySelectorAll(".posts-content .card a");
      for (var i = 0; i < $links.length; i++) {
        const $link: any = $links[i];
        const href = $link.href;
        $link.onclick = (e) => {
          e.preventDefault();
          const url = e.currentTarget.getAttribute("href");
          console.log('dynamic lynk', url);
          this.openUrl.open(url);
        }
      }
    }, 500);
  }

  changeTopic(evt) {
    this.specialtie = evt;
  }


}
