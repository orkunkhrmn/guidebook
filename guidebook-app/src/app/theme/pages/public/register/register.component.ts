import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from "ng2-bootstrap-modal";
import { FormGroup, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Helpers } from "./../../../../helpers";
import { ScriptLoaderService } from './../../../../_services/script-loader.service';
import { LoginService } from './../../../../_http-services/login.service';
import { LoginInfo } from '../../../../_models/login.info';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {

    loginInfo: LoginInfo = { fullname: '', username: '', password: '', allowPassword: '' };

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _script: ScriptLoaderService,
        private spinnerService: Ng4LoadingSpinnerService,
        private loginService: LoginService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        Helpers.bodyClass("bg-dark");
    }

    register(myForm: NgForm): void {
        this.spinnerService.show();
        if (myForm.valid) {
            console.log(this.loginInfo);
            this.loginService.register(this.loginInfo).subscribe(
                data => {
                    if (data.success == true) {

                        this.toastr.success('Sign upped.', 'Success!');
                        this._router.navigate(['/login']);
                    }
                    else {
                        this.toastr.warning(data.message, 'Error!');
                    }

                    this.spinnerService.hide();
                },
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                        console.log("Client-side error occured.");
                        this.toastr.error('Sign not upped.', 'Error!');
                    } else {
                        console.log("Server-side error occured.");
                        this.toastr.error('Sign not upped.', 'Error!');
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