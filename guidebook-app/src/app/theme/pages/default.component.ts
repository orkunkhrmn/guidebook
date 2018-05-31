import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from './../../helpers';
import { ScriptLoaderService } from './../../_services/script-loader.service';
@Component({
    selector: "app-default",
    templateUrl: "./default.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {


    constructor(private _router: Router, private _script: ScriptLoaderService) {

    }
    ngOnInit() {
        this._router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                Helpers.bodyClass("fixed-nav sticky-footer bg-dark");
            }
            if (route instanceof NavigationEnd) {

            }
        });

        this._script.load('body', 'assets/js/sb-admin.min.js')
        .then(() => {
          //Helpers.setLoading(false);
          //LoginCustom.init();
        });
    }

}