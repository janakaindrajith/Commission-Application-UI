import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';

import { USER } from '../../config/user';

@Injectable()
export class LeaderCodeSearchService {

  constructor(private http: Http) { }



  // getLeaderCodeByAgentCode(AgentCode, Type) {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   headers.append('Authorization', USER.USER_AUTH_TOKEN);
  //   let options = new RequestOptions({ headers: headers });

  //   return this.http.get(URL_CONST.URL_PREFIX + 'api/AgentHistory/GetAgetHistoryByCode?AGT_CODE=' + AgentCode + '&TYPE=' + Type, options)

  //     //return this.http.get(URL_CONST.URL_PREFIX + 'api/agentHistory/get', options)
  //     .map((response: Response) => response.json())
  //     .timeout(60000)
  //     .catch((error: any) => {
  //       //this.handleError;
  //       return Observable.throw(new Error(error.status))
  //     });
  // }


  GetLeaderCodeByAgentCode(AgentCode) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    console.log('xxx');

    console.log(URL_CONST.URL_PREFIX + 'api/AgentLeaderCodeByAgentCode/GetLeaderCodeByAgentCode?AgentCode=' + AgentCode);

    return this.http.get(URL_CONST.URL_PREFIX + 'api/AgentLeaderCodeByAgentCode/GetLeaderCodeByAgentCode?AgentCode=' + AgentCode, options)
      .map((response: Response) => JSON.stringify(response.json()))
      .catch((error: any) => {
        //this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }



}
