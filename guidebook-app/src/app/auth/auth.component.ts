import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { FormGroup, NgForm } from '@angular/forms';
import { Helpers } from "./../helpers";
import { LoginService } from './../_http-services/login.service';

import { LoginInfo } from './../_models/login.info';
import { UserInfo } from './../_models/user.info';
import { CurrentUser } from './../_services/current.user';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './template/login.html',
    encapsulation: ViewEncapsulation.None,
})

export class AuthComponent implements OnInit {
    returnUrl: string;

    loginInfo: LoginInfo = { fullname: '', username: '', password: '', allowPassword: '' };

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private cfr: ComponentFactoryResolver,
        private loginService: LoginService,
        private user: CurrentUser,
        private spinnerService: Ng4LoadingSpinnerService,
        private toastr: ToastrService) {
    }

    ngOnInit() {
        this._router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                Helpers.bodyClass("bg-dark");
            }
            if (route instanceof NavigationEnd) {
            }
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this._router.navigate([this.returnUrl]);

        this.user.setUserLogOut();

    }

    login(myForm: NgForm): void {
        this.spinnerService.show();
        if (myForm.valid) {
            console.log(this.loginInfo);
            this.loginService.setLogin(this.loginInfo).subscribe(
                data => {
                    if (data.success == true) {
                        console.log(data.data.fullname);
                        let userInfo: UserInfo = { fullname: data.data.fullname, username: data.data.username, _id: data.data._id, token: data.data._id };

                        this.user.setUserLoggedIn(userInfo);

                        this.user.changeUser(userInfo);

                        this.toastr.success('Logged in.', 'Success!');
                        this._router.navigate([this.returnUrl]);
                    }
                    else {
                        this.toastr.error(data.message, 'Error!');
                    }

                    this.spinnerService.hide();
                },
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                        console.log("Client-side error occured.");
                        this.toastr.error('Logged not in.', 'Error!');
                    } else {
                        console.log("Server-side error occured.");
                        this.toastr.error('Logged not in.', 'Error!');
                    }
                }
            );
            this.spinnerService.hide();
        }
        else {
            console.log('invalid');
            this.spinnerService.hide();
        }
    }
}