import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';


import { USER } from '../../config/user';

@Injectable()
export class DesignationService {

  constructor(private http: Http) { }


  //getAllRecords
  getdesignations() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/designation/get', options)
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError; 
        return Observable.throw(new Error(error.status))
      });
  }

  //getSingleRecord
  getdesignation(id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/Designation/Get/' + id, options)
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError; 
        return Observable.throw(new Error(error.status))
      });

  }



  //post
  saveDesignation(params) {
    console.log('janaka');
    let body = params;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let postoptions = new RequestOptions({ headers: headers });
    return this.http.post(URL_CONST.URL_PREFIX + 'api/Designation/SaveDesignation', body, postoptions)
      .map((response: Response) => {
        return response;
      })
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }



}
