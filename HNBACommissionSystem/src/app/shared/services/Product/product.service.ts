
import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';


import { USER } from '../../config/user';


@Injectable()
export class ProductService {

  constructor(private http: Http) { }
  
    getProducts() {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', USER.USER_AUTH_TOKEN);
      let options = new RequestOptions({ headers: headers });
      return this.http.get(URL_CONST.URL_PREFIX + 'api/Product/Get', options)
        .map((response: Response) => response.json());
  
    }
  
    //getSingleRecord
    getProductsByID(id) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', USER.USER_AUTH_TOKEN);
      let options = new RequestOptions({ headers: headers });
      return this.http.get(URL_CONST.URL_PREFIX + 'api/Product/Get/' + id, options)
        .map((response: Response) => response.json())
        .timeout(60000)
        .catch((error: any) => {
          //this.handleError; 
          return Observable.throw(new Error(error.status))
        });
    }
  
  
    //post
    saveProduct(params) {
      let body = params;
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', USER.USER_AUTH_TOKEN);
      let postoptions = new RequestOptions({ headers: headers });
      return this.http.post(URL_CONST.URL_PREFIX + 'api/Product/Saveproduct', body, postoptions)
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
  