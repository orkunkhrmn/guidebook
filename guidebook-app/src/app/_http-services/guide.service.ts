import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

import { ResultInfo } from './../_models/result.info';
import { CurrentUser } from './../_services/current.user';
import { Guide } from './../_models/guide.info';
import { GuideSearchInfo } from './../_models/guide-search.info';
import { Helper } from './helper';

@Injectable()
export class GuideService {

    private helper = new Helper();
    private _postUrl = this.helper.BaseURL + "guide";

    constructor(
        private http: HttpClient,
        private user: CurrentUser
    ) { }

    cur = this.user.getUserLoggedIn();


    header = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': '', 'token': this.cur.token });

    insertGuide(guide: Guide): Observable<ResultInfo> {
        return this.http.post<ResultInfo>(this._postUrl, guide, {
            headers: this.header
        });
    };

    putGuide(_id: string, guide: Guide): Observable<ResultInfo> {
        return this.http.put<ResultInfo>(this._postUrl + "/" + _id, guide, { headers: this.header });
    }

    getUsersGuides(guideSearchInfo: GuideSearchInfo): Observable<ResultInfo> {
        /*let Params = new HttpParams();
        Params = Params.append("kullanici_id", kullaniciId.toString());*/

        let Params: HttpParams = new HttpParams();
        Params = this.toHttpParams(guideSearchInfo);

        return this.http.get<ResultInfo>(this._postUrl, { params: Params });
    };

    getUsersGuidesForPaging(guideSearchInfo: GuideSearchInfo): Observable<ResultInfo> {
        /*let Params = new HttpParams();
        Params = Params.append("kullanici_id", kullaniciId.toString());*/

        let Params: HttpParams = new HttpParams();
        Params = this.toHttpParams(guideSearchInfo);

        return this.http.get<ResultInfo>(this._postUrl, { params: Params });
    };

    getGuideById(guideId: string): Observable<ResultInfo> {
        return this.http.get<ResultInfo>(this._postUrl + "/" + guideId);
    };


    deleteGuideById(guideId: string): Observable<ResultInfo> {

        return this.http.delete<ResultInfo>(this._postUrl + "/" + guideId, { headers: this.header });
    }

    toHttpParams(params: any): HttpParams {
        return Object.getOwnPropertyNames(params)
            .reduce((p, key) => p.set(key, params[key]), new HttpParams());
    }
}