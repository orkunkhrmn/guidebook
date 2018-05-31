import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

import { ResultInfo } from './../_models/result.info'
import { LoginInfo } from './../_models/login.info';
import { CurrentUser } from './../_services/current.user';
import { Helper } from './helper';
import { UserInfo } from '../_models/user.info';

@Injectable()
export class LoginService {

    private helper = new Helper();

    constructor(
        private http: HttpClient,
        private user: CurrentUser
    ) { }

    cur = this.user.getUserLoggedIn();

    header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': '', 'token': this.cur.token });

    setLogin(loginInfo: LoginInfo): Observable<ResultInfo> {

        let url: string = this.helper.BaseURL + "login";

        return this.http.post<ResultInfo>(url, loginInfo, {
            headers: this.header
        });
    }

    register(userInfo: LoginInfo): Observable<ResultInfo> {

        let url: string = this.helper.BaseURL + "register";

        return this.http.post<ResultInfo>(url, userInfo, {
            headers: this.header
        })
    }
}