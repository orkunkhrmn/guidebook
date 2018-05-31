import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { CurrentUser } from './../../_services/current.user';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class LogoutComponent implements OnInit {

    constructor(private _router: Router,
       private _user: CurrentUser
    ) {
    }

    ngOnInit(): void {
       
        this._user.setUserLogOut();

        this._router.navigate(['/login']);
    }
}