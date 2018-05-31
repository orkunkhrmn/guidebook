import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class NotFoundComponent implements OnInit {

    constructor(private _router: Router,) {
    }

    ngOnInit() {
    }
}