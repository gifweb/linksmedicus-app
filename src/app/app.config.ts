export const WORDPRESS_URL = 'https://linksmedicus.com/2017/';
export const WORDPRESS_REST_API_URL = WORDPRESS_URL + 'wp-json/wp/v2/';
export const WORDPRESS_REST_API_BASE = WORDPRESS_URL + 'wp-json/';
export const GTRANSLATE_REST_API_BASE = 'http://localhost/linksmedicus/i18n/api/';

export var lang = { code: 'en', name: 'English' }; 

export var last: number = 0;

export function setLast(value: number) {
    last = value;
}

export function setLang(value: any) {
    lang = value;
    last = Date.now();
}