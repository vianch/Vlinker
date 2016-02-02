import {bootstrap} from "angular2/platform/browser";
import App from "./home/home.component";

bootstrap(App, []).then(
	success => console.log(`Vlinker web app load success`),
	error => console.error(error)
);
