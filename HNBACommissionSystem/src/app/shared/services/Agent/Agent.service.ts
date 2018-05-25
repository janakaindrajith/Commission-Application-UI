import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';

import { USER } from '../../config/user';



@Injectable()
export class AgentService {


  constructor(private http: Http) { }

  getAgent() {
    return this.http.get(URL_CONST.URL_PREFIX + 'api/Agent/get')
      .map((response: Response) => response.json());

  }


  checkTCSAuth(params) {
    //return this.http.post('http://192.168.10.31:7001/HNBWrapperServices_V0/HNBController/authuser', params)
    return this.http.post(URL_CONST.HOSTED_URL_TCS +'/HNBWrapperServices_V0/HNBController/authuser', params)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        //this.handleError;
        return Observable.throw(new Error(error.status))
      });

  }


  SaveAgentTCS(params) {
    return this.http.post(URL_CONST.HOSTED_URL_TCS +'/HNBWrapperServices_V0/HNBController/party', params)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        //this.handleError;
        return Observable.throw(new Error(error.status))
      });

  }


  GetAgentTCS(params) {
    return this.http.post(URL_CONST.HOSTED_URL_TCS +'/HNBWrapperServices_V0/HNBController/party', params)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        //this.handleError;
        return Observable.throw(new Error(error.status))
      });

  }



  SaveAgent(params) {

    try {
      let body = params;
      let headers = new Headers({ 'Content-Type': 'application/json' });
      headers.append('Authorization', USER.USER_AUTH_TOKEN);
      let postoptions = new RequestOptions({ headers: headers });

      return this.http.post(URL_CONST.URL_PREFIX + 'api/Agent/AddAgent', body, postoptions)
        .map((response: Response) => JSON.stringify(response.json()))
        .timeout(60000)
        .catch((error: any) => {
          //this.handleError;
          return Observable.throw(new Error(error.status))
        });

    } catch (error) {

    }

  }


  GetAgentSearchDetails(params) {

    let body = params;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let postoptions = new RequestOptions({ headers: headers });

    console.log(JSON.stringify(body));

    return this.http.post(URL_CONST.URL_PREFIX + 'api/AgentSearch/SearchAgents', body, postoptions)
      .map((response: Response) => (response.json()))
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError;
        return Observable.throw(new Error(error.status))
      });
  }



  getAgentBySeqId(SeqId) {
    console.log('seq id  ' + SeqId);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    console.log('let options = new RequestOptions({ headers: headers });');

    return this.http.get(URL_CONST.URL_PREFIX + 'api/Agent/GetAgentByID/' + SeqId, options)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        //this.handleError;
        console.log(error);

        console.log(Observable.throw(new Error(error.status)));

        return Observable.throw(new Error(error.status))
      });

  }

}
