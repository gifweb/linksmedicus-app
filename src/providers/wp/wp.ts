import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Config from '../../app/app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class WpProvider {

  constructor(
    private http: Http,
  ) {

  }

  getRecentPosts(categoryId: number, page: number = 1) {
    let category_url = categoryId ? ("&categories=" + categoryId) : "";
    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?page=' + page
      + category_url)
      .map(res => res.json());
  }

  getPostCategories(post) {
    let observableBatch = [];
    post.categories.forEach(category => {
      observableBatch.push(this.getCategory(category));
    });
    return Observable.forkJoin(observableBatch);
  }

  getCategory(category) {
    return this.http.get(Config.WORDPRESS_REST_API_URL + "categories/" + category)
      .map(res => res.json());
  }

  getPage(page) {
    return this.http.get(Config.WORDPRESS_REST_API_URL + "pages/?slug=" + page + "&per_page=1")
      .map(res => res.json())
      .map(data => data.map(item => {
        return {
          id: item.id,
          title: item.title.rendered,
          content: item.content.rendered,
          slug: item.slug,
        };
      }))
      .map(data => (data[0]) ? data[0] : data);
  }

  getSpecialtieBySlug(slug) {
    return this.http.get(Config.WORDPRESS_REST_API_URL + "categories/?slug=" + slug + "&per_page=1")
      .map(res => res.json())
      .map(data => data.map(item => {
        return {
          id: item.id,
          name: item.name,
          nomepc: item.nomepc,
          img: item.img,
          count: item.count,
          slug: item.slug,
        };
      }))
      .map(data => (data[0]) ? data[0] : data);
  }

  getSpecialtiesCategories() {
    return this.http.get(Config.WORDPRESS_REST_API_URL + "categories?include=29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,8,9,12,13,14,15,16,17,18,19,20,21,22,23&orderby=name&per_page=100")
      .map(res => res.json())
      .map(data => data.map(item => {
        return {
          id: item.id,
          name: item.name,
          nomepc: item.nomepc,
          img: item.img,
          count: item.count,
          slug: item.slug,
        };
      }));
  }

  getGeneralTopicsCategories() {
    return this.http.get(Config.WORDPRESS_REST_API_URL + "categories?include=45,46,47,48,49,50,51,52,53,54,55,56,57,58,61,62,63,64&orderby=name&per_page=100")
      .map(res => res.json())
      .map(data => data.map(item => {
        return {
          id: item.id,
          name: item.name,
          nomepc: item.nomepc,
          img: item.img,
          count: item.count,
          slug: item.slug,
        };
      }));
  }

  getSpecialties() {
    return this.http.get(Config.WORDPRESS_REST_API_URL + "specialties?per_page=100")
      .map(res => res.json())
      .map(data => data.map(item => {
        return {
          id: item.id,
          name: item.name,
          count: item.count,
          parent: item.parent,
          slug: item.slug,
        };
      }));
  }

  getSubMenuNews() {
    return this.http.get(Config.WORDPRESS_REST_API_URL + "specialties?per_page=100&exclude=184,185")
      .map(res => res.json())
      .toPromise();
  }

  getSubMenuDatabase(num: number) {
    const parent = num === 1 ? 5 : 28;
    return this.http.get(Config.WORDPRESS_REST_API_URL + "categories?post_type=post&per_page=100&parent=" + parent)
      .map(res => res.json())
      .toPromise();
  }

  getSubMenuGuidelines() {
    return this.http.get(Config.WORDPRESS_REST_API_URL + "guideline?per_page=100")
      .map(res => res.json())
      .toPromise();
  }


  getSearch() {
    return this.http.get(Config.WORDPRESS_REST_API_URL + "search?per_page=100&orderby=menu_order&order=asc")
      .map(res => res.json())
      .map(data => data.map(item => {
        return {
          id: item.id,
          title: item.title.rendered,
          url: item.url,
          slug: item.slug,
        };
      }));
  }

  search(s: string) {
    return this.http.get(Config.WORDPRESS_REST_API_BASE + "search/all?s=" + s)
      .map(res => res.json());
    /*.map(data => data.map(item => {
      return {
        id: item.id,
        title: item.title.rendered,
        url: item.url,
        slug: item.slug,
      };
    }));*/
  }

  getGuideline() {
    return this.http.get(Config.WORDPRESS_REST_API_URL + "guideline?per_page=100")
      .map(res => res.json())
      .map(data => data.map(item => {
        return {
          id: item.id,
          name: item.name.replace(/&amp;/g, '&'),
          count: item.count,
          slug: item.slug,
        };
      }));
  }

  getGuidelineBySlug(slug) {
    return this.http.get(Config.WORDPRESS_REST_API_URL + "guideline/?slug=" + slug + "&per_page=1")
      .map(res => res.json())
      .map(data => data.map(item => {
        return {
          id: item.id,
          name: item.name,
          slug: item.slug,
        };
      }))
      .map(data => (data[0]) ? data[0] : data);
  }

  getGuidelines(guideline, page?: number) {
    if (page === undefined) {
      page = 1;
    }
    return this.http.get(
      Config.WORDPRESS_REST_API_URL +
      "guidelines?per_page=100" +
      "&guideline=" + guideline +
      "&orderby=menu_order" +
      "&order=asc" +
      "&page=" +
      page
    )
      .map(res => {
        return res;
      })
      .map(res => res.json())
      .map(data => data.map(item => {
        return {
          id: item.id,
          date: item.date,
          title: item.title.rendered,
          guidelines: item.guidelines,
          slug: item.slug,
        };
      }));
  }

  getArchives() {

    return this.http.get(
      Config.WORDPRESS_REST_API_BASE + "wp-archive/v1/archive"
    )
      .map(res => {
        return res;
      })
      .map(res => res.json())
      .map(data => data.map(item => {
        return {
          text: item.text,
          date: item.date,
        };
      }));
  }

  paddinZeros(str, size) {
    var s = String(str);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
  }

  getTop10() {

    let getNewsUrl = Config.WORDPRESS_REST_API_URL + "news?per_page=10";
    const specialtie = 184;
    if (specialtie) {
      getNewsUrl += "&specialties=" + specialtie;
    }

    return this.http.get(
      getNewsUrl
    )
      .map(res => res.json())
      .map(data => data.map(item => {
        const content = (item.content.rendered).replace(/href/g, 'target="_blank" href');
        return {
          id: item.id,
          date: item.date,
          data_fixed: item.data_fixed,
          title: item.title.rendered,
          content: content,
          link: item.link,
          slug: item.slug,
          color: item.color,
          source: item.source,
        };
      }));
  }

  getLatest() {

    let getNewsUrl = Config.WORDPRESS_REST_API_URL + "news?per_page=20";
    const specialtie = 185;
    if (specialtie) {
      getNewsUrl += "&specialties=" + specialtie;
    }

    return this.http.get(
      getNewsUrl
    )
      .map(res => res.json())
      .map(data => data.map(item => {
        const content = (item.content.rendered).replace(/href/g, 'target="_blank" href');
        return {
          id: item.id,
          date: item.date,
          title: item.title.rendered,
          content: content,
          link: item.link,
          slug: item.slug,
          color: item.color,
          source: item.source,
        };
      }));
  }

  getArticle(slug: string) {

    let getNewsUrl = Config.WORDPRESS_REST_API_URL + "news?slug=" + slug;
    return this.http.get(getNewsUrl)
      .map(res => res.json())
      .map(data => data.map(item => {
        const content = (item.content.rendered).replace(/href/g, 'target="_blank" href');
        return {
          id: item.id,
          date: item.date,
          title: item.title.rendered,
          content: content,
          link: item.link,
          slug: item.slug,
        };
      }));
  }

  getNews(specialtie, page?: number, archive?: any) {
    if (page === undefined) {
      page = 1;
    }

    console.log('getNews archive:', archive);


    let getNewsUrl = Config.WORDPRESS_REST_API_URL + "news?per_page=5";


    if (archive) {
      const afterDate = archive.date[0] + '-' + this.paddinZeros(archive.date[1], 2) + '-' + this.paddinZeros(archive.date[2], 2) + 'T00:00:00'
      const beforeDate = archive.date[0] + '-' + this.paddinZeros(archive.date[1], 2) + '-' + this.paddinZeros(archive.date[2], 2) + 'T23:59:59'
      getNewsUrl += "&before=" + beforeDate + "&after=" + afterDate;
    } else {
      if (specialtie) {
        getNewsUrl += "&specialties=" + specialtie;
      }
    }

    if (page) {
      getNewsUrl += "&page=" + page;
    }

    return this.http.get(
      getNewsUrl
    )
      .map(res => res.json())
      .map(data => data.map(item => {
        const content = (item.content.rendered).replace(/href/g, 'target="_blank" href');
        return {
          id: item.id,
          date: item.date,
          title: item.title.rendered,
          content: content,
          link: item.link,
          slug: item.slug,
        };
      }));
  }

  getPosts(category, page?: number, archive?: any) {
    if (page === undefined) {
      page = 1;
    }
    console.log('getPosts archive:', archive);
    let getNewsUrl = Config.WORDPRESS_REST_API_URL + "posts?per_page=5&orderby=menu_order&order=asc";
    if (archive) {
      const afterDate = archive.date[0] + '-' + this.paddinZeros(archive.date[1], 2) + '-' + this.paddinZeros(archive.date[2], 2) + 'T00:00:00'
      const beforeDate = archive.date[0] + '-' + this.paddinZeros(archive.date[1], 2) + '-' + this.paddinZeros(archive.date[2], 2) + 'T23:59:59'
      getNewsUrl += "&before=" + beforeDate + "&after=" + afterDate;
    } else {
      if (category) {
        getNewsUrl += "&categories=" + category;
      }
    }
    if (page) {
      getNewsUrl += "&page=" + page;
    }
    return this.http.get(
      getNewsUrl
    )
      .map(res => res.json())
      .map(data => data.map(item => {
        const content = (item.content.rendered).replace(/href/g, 'target="_blank" href');
        return {
          id: item.id,
          date: item.date,
          title: item.title.rendered,
          content: content,
          desc: item.desc,
          link: item.link,
          url: item.url,
          slug: item.slug,
        };
      }));
  }

  getLinks(category, page?: number) {
    if (page === undefined) {
      page = 1;
    }
    return this.http.get(
      Config.WORDPRESS_REST_API_URL +
      "posts?per_page=5" +
      "&categories=" +
      category +
      "&orderby=menu_order" +
      "&order=asc" +
      "&page=" +
      page
    )
      .map(res => {
        return res;
      })
      .map(res => res.json())
      .map(data => data.map(item => {
        return {
          id: item.id,
          date: item.date,
          title: item.title.rendered,
          url: item.url,
          desc: item.desc,
          slug: item.slug,
        };
      }));
  }

}