import {bootstrap} from "angular2/platform/browser";
import * as ngCore from "angular2/core";
import App from "./home/home.component";
import {SocketEventsService} from "./core/socket.events.service";

ngCore.enableProdMode();

bootstrap(<any>App, [SocketEventsService]).then(
	success => console.log( `Vlinker web app load success` ),
	error => console.error( error )
);
