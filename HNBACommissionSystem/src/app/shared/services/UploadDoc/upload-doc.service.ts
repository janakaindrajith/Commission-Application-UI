import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';
import { USER } from '../../config/user';


@Injectable()
export class UploadDocService {

  constructor(private http: Http) { }



  //getAllRecords
  getUploadDocs() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/UploadDoc/get', options)
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        // this.handleError; 
        return Observable.throw(new Error(error.status))
      });
  }

  //getSingleRecord
  getUploadDoc(id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });
    return this.http.get(URL_CONST.URL_PREFIX + 'api/UploadDoc/get/id', options)
      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError; 
        return Observable.throw(new Error(error.status))
      });
  }


  getUploadDocByAgentID(AgentCode) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });
    console.log('aaaaaaaaa');
    return this.http.get(URL_CONST.URL_PREFIX + 'api/UploadDoc/getUploadDocByAgentID/' + AgentCode, options)

      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError; 
        return Observable.throw(new Error(error.status))
      });
  }


 
  getUploadDocByType(Type) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });
    console.log('aaaaaaaaa');


    return this.http.get(URL_CONST.URL_PREFIX + 'api/UploadDoc/getUploadDocByType?Type=' + Type, options)//'DPTSManualUpload'

      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError; 
        return Observable.throw(new Error(error.status))
      });
  }




  getAttachedAgentsUploadDocByAgentID(AgentCode) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });
    console.log('aaaaaaaaa');
    return this.http.get(URL_CONST.URL_PREFIX + 'api/UploadDoc/getAttachedAgentsUploadDocByAgentID/' + AgentCode, options)

      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError; 
        return Observable.throw(new Error(error.status))
      });
  }



  getProfilePicByAgentID(AgentCode) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/UploadDoc/getProfilePicByAgentID?vAGT_CODE=' + AgentCode, options)

      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError; 
        return Observable.throw(new Error(error.status))
      });
  }


  getLeader_VProfilePicByAgentID(AgentCode) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/UploadDoc/getLeader_VProfilePicByAgentID?vAGT_CODE=' + AgentCode, options)

      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError; 
        return Observable.throw(new Error(error.status))
      });
  }

    getLeader_HProfilePicByAgentID(AgentCode) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', USER.USER_AUTH_TOKEN);
    let options = new RequestOptions({ headers: headers });

    return this.http.get(URL_CONST.URL_PREFIX + 'api/UploadDoc/getLeader_HProfilePicByAgentID?vAGT_CODE=' + AgentCode, options)

      .map((response: Response) => response.json())
      .timeout(60000)
      .catch((error: any) => {
        //this.handleError; 
        return Observable.throw(new Error(error.status))
      });
  }


}
