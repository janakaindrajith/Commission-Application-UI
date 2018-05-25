import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';

import { USER } from '../../config/user';

@Injectable()
export class AgentHistoryService {

  constructor(private http: Http) { }

  //getAllRecords
  //1 = Transfer Branch History
  //2 = Stop Commission History
  //3 = Release Commission History

  if(AgentCode = null){
    alert('Please Select a Agent..');
  }

  getagentHistoryByAgentCode(AgentCode, Type) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/AgentHistory/GetAgetHistoryByCode?AGT_CODE=' + AgentCode + '&TYPE=' + Type, options)

    //return this.http.get(URL_CONST.URL_PREFIX + 'api/agentHistory/get', options)
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }

}
