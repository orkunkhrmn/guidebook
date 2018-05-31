import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
    //selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    selector:"app-theme",
    templateUrl: "./theme.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ThemeComponent implements OnInit {


    constructor(private _router: Router) {

    }
    ngOnInit() {
        this._router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {

            }
            if (route instanceof NavigationEnd) {

            }
        });
    }

}