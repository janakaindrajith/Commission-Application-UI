import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';


import { USER } from '../../config/user';

@Injectable()
export class CommissionORDRateChartService {

  constructor(private http: Http) { }


  //getAllRecords
  getCommissionORDRateCharts() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/CommissionORDRateChart/get', options)
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError; 
        return Observable.throw(new Error(error.status))
      });
  }

  //getSingleRecord
  getCommissionORDRateChart(id) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });
    //return this.http.get(URL_CONST.URL_PREFIX + 'api/CommissionORDRateChart/get/id', options)
    return this.http.get(URL_CONST.URL_PREFIX + 'api/CommissionORDRateChart/Get/' + id, options)
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError; 
        return Observable.throw(new Error(error.status))
      });
  }


  //   //post
  saveCommissionORDRateChart(params) {
    let body = params;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let postoptions = new RequestOptions({ headers: headers });
    return this.http.post(URL_CONST.URL_PREFIX + 'api/CommissionORDRateChart/SaveCommissionORDRateChart', body, postoptions)
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
