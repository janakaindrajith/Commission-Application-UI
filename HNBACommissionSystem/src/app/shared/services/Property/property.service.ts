import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';
import { USER } from '../../config/user';

@Injectable()
export class PropertyService {

  constructor(private http: Http) { }

  

  getpropertyByType(Type) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/Property/Get?Type=' + Type, options)
      .map((response: Response) => response.json());

  }


  getpropertyByTypeold(Type) {


    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    alert(URL_CONST.URL_PREFIX + 'api/Property/Get?Type=' + Type);

    return this.http.get(URL_CONST.URL_PREFIX + 'api/Property/Get?Type=' + Type, options)
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError; 
        return Observable.throw(new Error(error.status))
      });

  }


//post
saveCommissionRateChart(params){ 
  let body = params;
 let headers = new Headers({ 'Content-Type': 'application/json' });
 headers.append('Authorization', USER.USER_AUTH_TOKEN);
 let postoptions = new RequestOptions({ headers: headers });
 return this.http.post(URL_CONST.URL_PREFIX + 'api/CommissionRateChart/SaveCommissionRateChart', body, postoptions)
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
