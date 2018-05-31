import { Component, OnInit, ViewEncapsulation, AfterViewInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmComponent } from './../confirm/confirm.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserInfo } from './../../../_models/user.info';
import { CurrentUser } from './../../../_services/current.user';

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class NavComponent implements OnInit {
    public modalRef: BsModalRef;
    user: UserInfo;

    constructor(private _router: Router,
        private _modalService: BsModalService,
        private _user: CurrentUser) {

    }
    ngOnInit() {
        this._user.currentUser.subscribe(user => { this.user = user; console.log(user); });
    }
    logOut(): void {
        this._router.navigate(['/logout']);
        this.modalRef.hide();
    }

    public openModal(template: TemplateRef<any>) {
        this.modalRef = this._modalService.show(template); // {3}
    }

    public close() {
        this.modalRef.hide();
    }
}