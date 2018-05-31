import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { DefaultComponent } from './../pages/default.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from './navigation/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ModalComponent } from "./confirm/confirm-modal.component";

@NgModule({
    declarations: [
        LayoutComponent,
        DefaultComponent,
        NavComponent,
        FooterComponent,
        ConfirmComponent,
        ModalComponent
    ],
    exports: [
        LayoutComponent,
        DefaultComponent,
        NavComponent,
        FooterComponent,
        ConfirmComponent,
        ModalComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    entryComponents: [
        ConfirmComponent,
        ModalComponent
    ]
})
export class LayoutModule {
}