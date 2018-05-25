import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';
import { USER } from '../../config/user';

@Injectable()
export class CommonService {

  constructor(private http: Http) { }

  getRefundsByReceiptNo(ReceiptNo) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/Common/GetRefundsByReceiptNo?ReceiptNo=' + ReceiptNo, options)
      .map((response: Response) => response.json());

  }

  getCommissionByReceiptNo(ReceiptNo) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/Common/GetCommissionByReceiptNo?ReceiptNo=' + ReceiptNo, options)
      .map((response: Response) => response.json());

  }

  getCommissionRefundByReceiptNo(ReceiptNo) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/Common/GetCommissionRefundByReceiptNo?ReceiptNo=' + ReceiptNo, options)
      .map((response: Response) => response.json());

  }

  getPermissionPagesByUser(UserName) {
    
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', USER.USER_AUTH_TOKEN);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(URL_CONST.URL_PREFIX + 'api/Common/getPermissionPagesByUser?UserName=' + UserName, options)
          .map((response: Response) => response.json());
    
      }

}
