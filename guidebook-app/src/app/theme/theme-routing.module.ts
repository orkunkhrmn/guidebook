import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/_guards/auth.guard";

const routes: Routes = [
    {
        "path": "",
        "component": ThemeComponent,
        "canActivate": [AuthGuard],
        "children": [
            {
                "path": "index",
                "loadChildren": ".\/pages\/guide\/guide-list\/guide-list.module#GuideListModule"
            },
            {
                "path": "guide\/list",
                "loadChildren": ".\/pages\/guide\/guide-list\/guide-list.module#GuideListModule"
            },
           /* {
                "path": "adres\/kayit\/:id",
                "loadChildren": ".\/pages\/adres\/adres-kayit\/adres-kayit.module#AdresKayitModule"
            },*/
            {
                "path": "404",
                "loadChildren": ".\/pages\/default\/not-found\/not-found.module#NotFoundModule"
            },
            {
                "path": "",
                "redirectTo": "index",
                "pathMatch": "full"
            }
        ]
    },
    {
        "path":"public",
        "component":ThemeComponent,
        "children":[
            {
                "path": "register",
                "loadChildren": ".\/pages\/public\/register\/register.module#RegisterModule"
            }
        ]
    },
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }