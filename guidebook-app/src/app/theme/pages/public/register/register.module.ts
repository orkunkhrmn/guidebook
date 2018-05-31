import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

const routes: Routes = [
    {
        'path': '',
        'component': RegisterComponent
    },
];

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes),  NgbModule,FormsModule
    ], exports: [
        RouterModule,
    ], declarations: [
        RegisterComponent
    ],
    providers: []
})
export class RegisterModule {
}