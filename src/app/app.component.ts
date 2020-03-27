import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http'
import isUrl from 'is-url'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  inputURL: string
  tinyURL: string;
  id: string;
  headers: any;
  

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.tinyURL = "";
    this.inputURL = "";
    this.id = this.route.snapshot.paramMap.get('id');
    this.headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
  }

  onGenerateClick(){
    if (isUrl(this.inputURL) || isUrl("http://"+this.inputURL) || isUrl("https://"+this.inputURL)){
      const params = new HttpParams().set('fullURL',this.inputURL);
      this.http.post<any>('https://tinyurl3.herokuapp.com/new', null, {params: params, headers:this.headers}).subscribe((response) => {
        this.tinyURL = response.tinyURL;
      });
    } else {
      alert("Please enter valid URL");
    }
  }


  onBrowse(url){
    if (isUrl(url)){
      window.open(`${url}`, '_blank')
    } else if (isUrl("http://"+url) || isUrl("https://"+url)) {
      window.open(`//${url}`, '_blank')
    } else {
      alert("Please enter valid URL");
    }
  }

  onCopy(){
    return this.tinyURL;
  } 

  onChangeGenerate(inputURL: string){
    this.inputURL=inputURL;
  }


}
