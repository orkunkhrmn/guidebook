import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ScriptLoaderService } from './_services/script-loader.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private _router: Router, private _script: ScriptLoaderService, ) {
  }

  ngOnInit() {

    this._script.load('body', 'assets/vendor/jquery/jquery.min.js', 'assets/vendor/bootstrap/js/bootstrap.bundle.min.js', 'assets/vendor/jquery-easing/jquery.easing.min.js')
      .then(() => {
        //Helpers.setLoading(false);
        //LoginCustom.init();
      });

    this._router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
        //sayfa yükleniyor
      }
      if (route instanceof NavigationEnd) {
        //sayfa yükleniyor
      }
    });
  }
}
