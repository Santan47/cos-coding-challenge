import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
// import { text } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(public http: HttpClient, public config: ConfigService) { }

  postQuery(text){
    let promise = new Promise((resolve, reject) => {
      let apiURL = "http://localhost:4200/users";
      let obj = {"Query":text}
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
       });
      let options = { headers: headers }
      this.http.post(apiURL, obj ,options)
      .toPromise()
      .then(
        res => { // Success
          debugger
        resolve(res);
        },
        err => { // Error
          debugger
        reject(err);
        }
      );
    });
    return promise;
  }
}