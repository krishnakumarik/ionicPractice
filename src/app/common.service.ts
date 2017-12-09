import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Injectable()
export class CommonService {

  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http, public router: Router) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });

  }

  //get the token
  displayName = "";

  getAuthorizationHeader(): any {
    let headers = new Headers();
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    headers.append('Authorization', userDetails.token);
    headers.append('userName', userDetails.userName);
    return headers;

  }
  setToken(token, userName) {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userName", userName);
  }


  UserData(url,data):Observable<any>{
       return this.http.post(url, data)
      .map(response => {
        let data = response.json();
        localStorage.setItem("authToken", data.data.TOKEN);
        localStorage.setItem("authToken", data.data.ROLETYPE);
        localStorage.setItem("authToken", data.data.EMPLOYEEID);
        return data;
      })
      .catch(this.handleError);
  }

  BookingStatus(url,data):Observable<any>{
    return this.http.post(url,data)
   .map(response => {
        let data = response.json();
      //  localStorage.setItem("Booking", data);
        return data;
      })
    .catch(this.handleError);
  }

  BookingRoom(url,data):Observable<any>{
    return this.http.post(url,data)
   .map(res =>res.json())
    .catch(this.handleError);
  }



// Error Handler
  private handleError(err){

   let errMessage:string;
      if(err instanceof Response){
        let body = err.json() || '';
        let error= body.error || JSON.stringify(body);
        errMessage='${err.status} - $ {err.statusText} || ';'} ${error}';
      }
      else{
        errMessage=err.message ? err.message : err.toString();
      }
      return Observable.throw(errMessage);

}
}
