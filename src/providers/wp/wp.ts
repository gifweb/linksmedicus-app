import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
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
    return this.http.get(Config.WORDPRESS_REST_API_URL + "categories?include=45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64&orderby=name&per_page=100")
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

  getNews(specialtie, page?: number) {
    if (page === undefined) {
      page = 1;
    }
    return this.http.get(
      Config.WORDPRESS_REST_API_URL +
      "news?per_page=5" +
      "&specialties=" +
      specialtie +
      "&page=" +
      page
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

  getLinks(category, page?: number) {
    if (page === undefined) {
      page = 1;
    }
    return this.http.get(
      Config.WORDPRESS_REST_API_URL +
      "posts?per_page=5" +
      "&categories=" +
      category +
      "&orderby=date" +
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