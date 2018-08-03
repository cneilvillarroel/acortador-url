import { Component } from '@angular/core';
import { UrlService } from './url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  urls: any = [];
  url: any = {};

  errorMsg: String = '';

  constructor(private urlService: UrlService){
    this.resetUrl();
    this.getUrls();
  }

  resetUrl(){
    this.url = {shortUrl: '', prettyUrl: '', original: ''}
  }

  getUrls(){
    this.urlService.getUrls().subscribe(
      res => {
        this.urls = res.urls;
        console.log(res);
      }
    )
  }

  cutUrl(){
    this.urlService.saveUrl(this.url).subscribe(
      res => {
        this.getUrls();
        this.resetSearch();
        console.log(res);
      },
      error => {
        this.errorMsg = JSON.parse(error._body).message;
        setTimeout(() => { this.resetSearch(); }, 1800);
        console.error(error);
      }
    )
  }


  deleteUrl(id){
    this.urlService.deleteUrl(id).subscribe(
      res =>{
        this.getUrls();
      },
      error => {
        this.errorMsg = JSON.parse(error._body).message;
        console.error(error);
      }
    )
  }

  resetSearch(){
    this.url.original = '';
    this.errorMsg = '';
  }

}
