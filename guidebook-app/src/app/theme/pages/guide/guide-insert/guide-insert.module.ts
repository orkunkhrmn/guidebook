import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from './../../../layouts/layouts.module';
import { DefaultComponent } from './../../default.component';
import { GuideInsertComponent } from './guide-insert.component';
import { GuideService } from './../../../../_http-services/guide.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

const routes: Routes = [
    {
        'path': '',
        'component': DefaultComponent,
        'children': [
            {
                'path': '',
                'component': GuideInsertComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule, NgbModule,FormsModule
    ], exports: [
        RouterModule,
    ], declarations: [
        GuideInsertComponent
    ],
    providers: [GuideService]
})
export class GuideInsertModule {
}