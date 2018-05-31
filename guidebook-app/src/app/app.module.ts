import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'; // url de #için 

import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layouts.module'
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.routing';
import { AppComponent } from './app.component';
import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { AuthModule } from "./auth/auth.module";

import { ScriptLoaderService } from './_services/script-loader.service';
import { CurrentUser } from './_services/current.user';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';// paging
import { BootstrapModalModule } from 'ng2-bootstrap-modal';//modal

import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';//https://github.com/scttcper/ngx-toastr


@NgModule({
  declarations: [
    ThemeComponent,
    AppComponent,
  ],
  imports: [
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeRoutingModule,
    AuthModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgbModule.forRoot(),
    BootstrapModalModule.forRoot({ container: document.body }),
    ModalModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [ScriptLoaderService, CurrentUser, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
