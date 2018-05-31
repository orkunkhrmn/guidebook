import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";

import { UserInfo } from './../../_models/user.info'
import { CurrentUser } from './../../_services/current.user';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private user: CurrentUser) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
console.log(666);
        let activeUser: UserInfo = this.user.getUserLoggedIn();
        if (activeUser._id.length > 0) {
            return true;
        }
        else {
            this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}