import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';

import { USER } from '../../config/user';

@Injectable()
export class PIDSearchService {

  constructor(private http: Http) { }

  
  GetPIDDetails(params) {

        console.log('GetPIDDetails');

        let body = params;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', USER.USER_AUTH_TOKEN);
        let postoptions = new RequestOptions({ headers: headers });
    
        console.log(JSON.stringify(body));

        console.log('C');
    
        return this.http.post(URL_CONST.URL_PREFIX + 'api/PIDSearch/SearchPID', body, postoptions)
          .map((response: Response) => (response.json()))
          .timeout(60000)
          .catch((error: any) => {
            //this.handleError;
            return Observable.throw(new Error(error.status))
          });
      }


      GetPIDDetailsForRefund(params) {
        
                console.log('GetPIDDetails');
        
                let body = params;
                let headers = new Headers({ 'Content-Type': 'application/json' });
                headers.append('Authorization', USER.USER_AUTH_TOKEN);
                let postoptions = new RequestOptions({ headers: headers });
            
                console.log(JSON.stringify(body));
        
                console.log('C');
            
                return this.http.post(URL_CONST.URL_PREFIX + 'api/PIDSearch/SearchPIDByProposalNo', body, postoptions)
                  .map((response: Response) => (response.json()))
                  .timeout(60000)
                  .catch((error: any) => {
                    //this.handleError;
                    return Observable.throw(new Error(error.status))
                  });
              }

}
