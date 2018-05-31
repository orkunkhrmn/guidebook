import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthRoutingModule } from './auth-routing.routing';
import { AuthComponent } from './auth.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './_guards/auth.guard';

import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './../_http-services/login.service';

@NgModule({
    declarations: [
        AuthComponent,
        LogoutComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        AuthRoutingModule,
        HttpClientModule
    ],
    providers: [
        AuthGuard,
        // api backend simulation
        MockBackend,
        BaseRequestOptions,
        LoginService
    ],
    entryComponents: [],
})

export class AuthModule {
}