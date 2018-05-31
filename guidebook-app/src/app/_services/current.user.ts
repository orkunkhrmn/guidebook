import { Injectable } from '@angular/core';
import { UserInfo } from './../_models/user.info';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CurrentUser {

    private userInfo: UserInfo = (localStorage.getItem('currentUser') != null && localStorage.getItem('currentUser') != undefined) ? JSON.parse(localStorage.getItem('currentUser')) as UserInfo : {
        _id: '',
        fullname: '',
        username: '',
        token: 'test'
    };

    private displayUserInfo = new BehaviorSubject<UserInfo>(this.userInfo);
    currentUser = this.displayUserInfo.asObservable();

    changeUser(user: UserInfo) {
        this.displayUserInfo.next(user);
    }

    constructor() {
    }

    setUserLoggedIn(user: UserInfo) {
        this.userInfo = user;
        localStorage.setItem('currentUser', JSON.stringify(this.userInfo));
    };

    getUserLoggedIn() {
        this.userInfo = JSON.parse(localStorage.getItem('currentUser')) as UserInfo;
        if (null != this.userInfo) {
            return this.userInfo;
        }
        else {
            return this.userInfo = {
                _id: '',
                fullname: '',
                username: '',
                token: 'test'
            }
        }
    };

    setUserLogOut() {
        this.userInfo = {
            _id: '',
            fullname: '',
            username: '',
            token: 'test'
        };

        localStorage.removeItem('currentUser');
    }
}
