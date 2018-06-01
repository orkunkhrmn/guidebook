import { Component, OnInit, ViewEncapsulation, Input, TemplateRef } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GuideService } from './../../../../_http-services/guide.service';
import { GuideSearchInfo } from './../../../../_models/guide-search.info';
import { UserInfo } from './../../../../_models/user.info';
import { CurrentUser } from './../../../../_services/current.user';
import { HttpErrorResponse } from '@angular/common/http';
import { Guide } from './../../../../_models/guide.info';
import { ConfirmComponent } from './../../../layouts/confirm/confirm.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-guide-list',
    templateUrl: './guide-list.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class GuideListComponent implements OnInit {
    userInfo: UserInfo;
    guideSearchInfo: GuideSearchInfo = { user_id: '', page_number: 1, record_for_page: 15 };
    guides: Guide[];
    totalRecord: number;
    modalRef: BsModalRef;

    @Input()
    public page = 4;

    constructor(
        private _spinnerService: Ng4LoadingSpinnerService,
        private _guideService: GuideService,
        private _currentUser: CurrentUser,
        private _modalService: BsModalService,
        private _toastr: ToastrService) {
        this.userInfo = this._currentUser.getUserLoggedIn();
    }

    ngOnInit() {
        this.guideSearchInfo.user_id = this.userInfo._id;

        this.getGuides();
    }

    getGuides(): void {
        this._spinnerService.show();
        this._guideService.getUsersGuidesForPaging(this.guideSearchInfo).subscribe(
            data => {
                this.guides = data.data;
                this.totalRecord = data.totalRecord;
                this._spinnerService.hide();
                console.log(data.totalRecord);
            },
            (err: HttpErrorResponse) => {
                this._spinnerService.hide();
                if (err.error instanceof Error) {
                    console.log("Client-side error occured.");
                    this._toastr.error("Client-side error occured!", "Error!");
                } else {
                    console.log("Server-side error occured.");
                    this._toastr.error("Server-side error occured!", "Error!");
                }
            }
        );
    }

    onPager(event: number): void {
        console.log("Pager event Is: ", event);

        if (event != this.guideSearchInfo.page_number) {
            this.guideSearchInfo.page_number = event;
            console.log("SearchInfo Is: ", this.guideSearchInfo.page_number);
            this.getGuides();
        }
    }

    deleteGuide(guideId: string): void {
        this._spinnerService.show();
        this._guideService.deleteGuideById(guideId).subscribe(
            data => {
                if (data.success == true) {
                    this._toastr.success('Guide has removed!', 'Success!');
                    this.getGuides();
                }
                else {
                    this._toastr.warning(data.message, 'Error!');
                }
                this._spinnerService.hide();
                this.modalRef.hide();
            },
            (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                    console.log("Client-side error occured.");
                    this._toastr.error('Client-side error occured!', 'Error!');
                } else {
                    console.log("Server-side error occured.");
                    this._toastr.error('Server-side error occured!', 'Error!');
                }
                this._spinnerService.hide();
                this.modalRef.hide();
            }
        );
    };

    selectedGuideId: string;
    openModal(template: TemplateRef<any>, guideId: string) {
        this.selectedGuideId = guideId;
        this.modalRef = this._modalService.show(template); // {3}
    }

    close() {
        this.modalRef.hide();
    }
}