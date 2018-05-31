import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from './../../../layouts/layouts.module';
import { DefaultComponent } from './../../default.component';
import { GuideListComponent } from './guide-list.component';
import { GuideService } from './../../../../_http-services/guide.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
    {
        'path': '',
        'component': DefaultComponent,
        'children': [
            {
                'path': '',
                'component': GuideListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, NgbModule
    ], exports: [
        RouterModule,
    ], declarations: [
        GuideListComponent
    ],
    providers: [GuideService]
})
export class GuideListModule {
}