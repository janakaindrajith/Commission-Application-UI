import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { URL_CONST } from '../../config/url.constants';
import { USER } from '../../config/user';

@Injectable()
export class AuthenticationService {
    public token: string;
    constructor(private http: Http) {
        var currentCOMUser = JSON.parse(localStorage.getItem('currentCOMUser'));
        // this.token = currentMRPUser && currentMRPUser.token;
    }

    logout(): void {
        console.log('logout');
        // clear token remove user from local storage to log user out
        this.token = null;

        console.log('before'+localStorage.getItem('currentCOMUser'));

        localStorage.removeItem('currentCOMUser');

        console.log('after'+localStorage.getItem('currentCOMUser'));

    }

    GetWindowsUserName() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(URL_CONST.URL_PREFIX + 'api/UserAccount/GetWindowsUserName', options)
            .map(res => res)
            .timeout(60000)
            .catch((error: any) => {
                return Observable.throw(new Error(error.status))
            });
    }


    CheckAndLoadUser(userName, password) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        /*  headers.append('Authorization', USER.USER_AUTH_TOKEN);*/
        let options = new RequestOptions({ headers: headers });

        return this.http.get(URL_CONST.URL_PREFIX + 'api/UserAccount/checkAndLoadUser?userName=' + userName + '&password=' + password, options)
            .map((response: Response) => response.json())
            .timeout(60000)
            .catch((error: any) => {
                return Observable.throw(new Error(error.status))
            });
    }


    checkAndLoadWindowsUser(userName) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        /*  headers.append('Authorization', USER.USER_AUTH_TOKEN);*/
        let options = new RequestOptions({ headers: headers });

        return this.http.get(URL_CONST.URL_PREFIX + 'api/UserAccount/checkAndLoadWindowsUser?userName=' + userName, options)
            .map((response: Response) => response.json())
            .timeout(60000)
            .catch((error: any) => {
                return Observable.throw(new Error(error.status))
            });
    }




}