import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GuideService } from './../../../../_http-services/guide.service';
import { UserInfo } from './../../../../_models/user.info';
import { CurrentUser } from './../../../../_services/current.user';
import { HttpErrorResponse } from '@angular/common/http';
import { Guide } from './../../../../_models/guide.info';
import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmComponent } from './../../../layouts/confirm/confirm.component';
import { FormGroup, NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-address-insert',
    templateUrl: './guide-insert.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class GuideInsertComponent implements OnInit {
    guideInfo: Guide = { _id: '', fullname: '', address: '', user_id: '' };
    currentUser: UserInfo;

    constructor(
        private activeRoute: ActivatedRoute,
        private spinnerService: Ng4LoadingSpinnerService,
        private _guideService: GuideService,
        private userService: CurrentUser,
        private location: Location,
        private _router: Router,
        private toastr: ToastrService
    ) {
        this.currentUser = this.userService.getUserLoggedIn();
        this.guideInfo.user_id = this.currentUser._id;
    }

    ngOnInit() {
        const id = this.activeRoute.snapshot.paramMap.get('id');
        if (id != '0') {
            this.getGuideById(id);
        }
    }

    getGuideById(guideId: string): void {
        this.spinnerService.show();
        this._guideService.getGuideById(guideId).subscribe(
            data => {
                this.guideInfo = data.data;
                console.log(JSON.stringify(this.guideInfo));
                this.spinnerService.hide();
            },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log("Client-side error occured.");
                    this.toastr.error("Client-side error occured.", "Error!");
                } else {
                    console.log("Server-side error occured.");
                    this.toastr.error("Server-side error occured.", "Error!");
                }

                this.spinnerService.hide();
            }
        );
    }

    setGuide(myForm: NgForm): void {
        if (this.guideInfo._id == '') {
            this.guideInsert(myForm);
        }
        else {
            this.guideUpdate(myForm);
        }
    }

    guideInsert(myForm: NgForm): void {
        this.spinnerService.show();
        if (myForm.valid) {

            this._guideService.insertGuide(this.guideInfo).subscribe(
                data => {
                    if (data.success == true) {
                        this.toastr.success('Insert successfull!', 'Success!');
                        this._router.navigate(['guide/list']);
                    }
                    else {
                        this.toastr.warning(data.message, 'Error!');
                    }
                    this.spinnerService.hide();
                },
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                        console.log("Client-side error occured.");
                        this.toastr.error('Client-side error occured.', 'Error!');
                    } else {
                        console.log("Server-side error occured.");
                        this.toastr.error('Server-side error occured.', 'Error!');
                    }
                    this.spinnerService.hide();
                }
            );
        }
        else {
            console.log('invalid');
            this.spinnerService.hide();
        }
    }

    guideUpdate(myForm: NgForm): void {
        this.spinnerService.show();
        if (myForm.valid) {

            this._guideService.putGuide(this.guideInfo._id, this.guideInfo).subscribe(
                data => {
                    if (data.success == true) {
                        this.toastr.success('Update successfull!', 'Success!');
                        this._router.navigate(['guide/list']);
                    }
                    else {
                        this.toastr.warning(data.message, 'Error!');
                    }
                    this.spinnerService.hide();
                },
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                        console.log("Client-side error occured.");
                        this.toastr.error('Client-side error occured.', 'Error!');
                    } else {
                        console.log("Server-side error occured.");
                        this.toastr.error('Server-side error occured.', 'Error!');
                    }
                    this.spinnerService.hide();
                }
            );
        }
        else {
            console.log('invalid');
            this.spinnerService.hide();
        }
    }

    spinnertest(): void {
        this.spinnerService.show();

        setTimeout(() => {
            this.spinnerService.hide();
        }, 3000);

    };

    goBack(): void {
        this.location.back();
    }

}