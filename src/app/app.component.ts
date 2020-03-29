import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http'
import { environment } from '../environments/environment';
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

  onGenerateClickFullToTiny(){
    const fullURL = {fullURL: this.inputURL}
    if (isUrl(this.inputURL) || isUrl("http://"+this.inputURL) || isUrl("https://"+this.inputURL)){
      this.http.post<any>(`${environment.server}/url/new`, fullURL, {headers:this.headers}).subscribe((response) => {
        this.tinyURL = response.tinyURL;
      });
    } else { 
        alert("Please enter valid URL");
    }
  }

  onGenerateClickTinyToFull(){
    console.log(this.tinyURL);
    if (this.tinyURL.startsWith(environment.server)){
      const pathArray = this.tinyURL.split(environment.server+"/");
      const shortid = pathArray[pathArray.length-1];
      this.http.get<any>(`${environment.server}/url/${shortid}`, {headers:this.headers}).subscribe((response) => {
        this.inputURL = response.fullURL;
      });
    } else {
        alert(`TinyURL path should start with: ${environment.server}/{Tiny Url PATH}
              for example: ${environment.server}/Ab45lZ`);
    }
  }


  onBrowse(url: string){
    if (isUrl(url)){
      window.open(`${url}`, '_blank')
    } else if (isUrl("http://"+url) || isUrl("https://"+url)) {
      window.open(`//${url}`, '_blank')
    } else {
      alert("Please enter valid URL");
    }
  }

  onCopy(id: string){

    if (id==="full")
      return this.inputURL;
    if (id==="tiny")
      return this.tinyURL;
  } 

  onChangeGenerate(URL: string, id: string){
    if (id==="full")
      this.inputURL=URL;
    if (id==="tiny")
      this.tinyURL=URL;
  }


}
