import {bootstrap} from "angular2/platform/browser";
import * as ngCore from "angular2/core";
import App from "./home/home.component";

ngCore.enableProdMode();

bootstrap(<any>App, []).then(
	success => console.log( `Vlinker web app load success` ),
	error => console.error( error )
);
