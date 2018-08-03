import { Http } from '@angular/http';

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { GLOBAL } from './global';



@Injectable()
export class UrlService {

  public url: string; 

  constructor(public _http: Http) {
    this.url = GLOBAL.host
  }

  getUrls(){
    console.log(this.url);
    return this._http
    .get(this.url + 'url').pipe(
      map(res => {
        return res.json();
      })
    );		
  }


  saveUrl(body) {   
    return this._http
    .post(this.url + 'url', body ).pipe(
      map(res => {
        return res.json();
      })
    ); 
  }

  deleteUrl(id) {   
    return this._http
    .delete(this.url + 'url/'+id ).pipe(
      map(res => {
        return res.json();
      })
    ); 
  }

}
