import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
const routes: Routes = [


]

@NgModule({

    imports: [

        RouterModule.forRoot(routes, {

            scrollPositionRestoration: 'disabled',

            preloadingStrategy: PreloadAllModules,

        })],

    exports: [RouterModule],
})

export class AppRoutingModule {

    constructor() { }

}