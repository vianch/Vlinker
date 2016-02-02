// polyfills
import "es6-shim";
import "es6-promise";
// these modules are what is in "angular2/bundles/angular2-polyfills" so don"t use that here
import "es7-reflect-metadata/dist/browser";
// in Production you may want to remove this module

// angular 2
import "angular2/platform/browser";
import "angular2/platform/common_dom";
import "angular2/core";
import "angular2/router";
import "angular2/http";

// rxJS
import "rxjs";
// other vendors for example jQuery or Lodash
// 
import "socket.io-client";
