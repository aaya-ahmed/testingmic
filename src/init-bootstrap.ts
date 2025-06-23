import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";



export function bootstrapAngularApp() {

    platformBrowserDynamic().bootstrapModule(AppModule)

        .catch(err => console.error(err));
}