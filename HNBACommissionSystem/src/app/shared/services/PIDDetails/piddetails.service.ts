import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';

import { USER } from '../../config/user';

@Injectable()
export class PIDDetailsService {

  constructor(private http: Http) { }


  //getAllRecords
getPIDDetailss() { 
  let headers = new Headers({ 'Content-Type': 'application/json' }); 
  headers.append('Authorization', USER.USER_AUTH_TOKEN); 
  let options = new RequestOptions({ headers: headers }); 
  return this.http.get(URL_CONST.URL_PREFIX + 'api/PIDDetails/get', options) 
  .map((response: Response) => response.json()) 
  .timeout(60000) 
  .catch((error: any) => { 
   //this.handleError; 
  return Observable.throw(new Error(error.status)) 
  }); 
  } 
  
  //getSingleRecord
  getPIDDetails(id) { 

  let headers = new Headers({ 'Content-Type': 'application/json' }); 
  headers.append('Authorization', USER.USER_AUTH_TOKEN); 
  let options = new RequestOptions({ headers: headers }); 

  return this.http.get(URL_CONST.URL_PREFIX + 'api/PID/Get/' + id, options)

  .map((response: Response) => response.json()) 
  .timeout(60000) 
  .catch((error: any) => { 
   //this.handleError; 
  return Observable.throw(new Error(error.status)) 
  }); 
  } 
  
}
