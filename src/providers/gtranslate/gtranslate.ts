import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as Config from '../../app/app.config';
import { ModelFactory, Model } from 'ngx-model';

@Injectable()
export class GtranslateProvider {

  private model: Model<number>;
  last$: Observable<number>;


  translates: any = {
    /*'en': this.defaultTranslates.reduce((acc, text) => {
      acc[text] = text
      return acc;
    }, {})*/
  };
  needsTranslation: string[] = [];
  request: Observable<any> | boolean = false;
  languages: any[] = [];

  get lang(): any {
    return Config.lang;
  }
  set lang(value: any) {
    Config.setLang(value);
  }

  get last(): number {
    return Config.last;
  }
  set last(value: number) {
    this.model.set(value);
    Config.setLast(value);
  }

  constructor(
    private http: Http,
    private modelFactory: ModelFactory<number>
  ) {

    this.model = this.modelFactory.create(0);
    this.last$ = this.model.data$;
  }

  getTranslate(term: string, last: number) {
    if(this.lang.code === 'en'){
      return term;
    }
    if (this.translates[this.lang.code] === undefined) {
      this.translates[this.lang.code] = {};
    }
    const langTranslates = this.translates[this.lang.code][term];
    if (term === null) {
      return '';
    }
    return (langTranslates !== undefined) ? langTranslates : this.findTranslate(term);
  }

  findTranslate(term: string) {
    if (this.needsTranslation.indexOf(term) < 0 && term !== null && term !== undefined) {
      this.needsTranslation.push(term);
    }
    this._debounce(this.fetchTranslates, 500, false);
    return term;
  }

  debounceTimeout: any;

  private _debounce(func, wait, immediate) {
    const context = this;
    const later = () => {
      this.debounceTimeout = null;
      if (!immediate) func.apply(context);
    };
    const callNow = immediate && !this.debounceTimeout;
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(later, wait);
    if (callNow) func.apply(context);
  };

  fetchTranslates() {
    if (this.request !== false || this.needsTranslation.length < 1) {
      return;
    }
    const lang = this.lang.code;
    this.request = this.http.post(Config.GTRANSLATE_REST_API_BASE + 'translate.php', {
      lang: lang,
      texts: this.needsTranslation
    }, {
        responseType: ResponseContentType.Json
      }).map(res => res.json());
    this.request.toPromise().then(res => {
      this.last = Date.now();
      Object.keys(res).map(term => {
        this.translates[lang][term] = res[term];
      })
      this.request = false;
      this.needsTranslation = [];
    });
    return this.request;
  }

  getLanguages(fetch?: boolean) {
    if (this.languages.length < 1 || fetch === true) {
      return this.http.post(Config.GTRANSLATE_REST_API_BASE + 'languages.php', {
        lang: this.lang.code,
      }, {
          responseType: ResponseContentType.Json
        }).map(res => res.json()).toPromise();
    }
    return Promise.resolve(this.languages);
  }

}
