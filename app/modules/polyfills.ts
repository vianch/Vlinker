// polyfills
import "ie-shim"; // Internet Explorer
import "es6-shim";
import "es6-promise";
import "es7-reflect-metadata";
require("zone.js/dist/zone");
require("zone.js/dist/long-stack-trace-zone");
// angular 2
import "angular2/platform/browser";
import "angular2/platform/common_dom";
import "angular2/core";
import "angular2/common";
import "angular2/http";
import "angular2/router";

// rxJS
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
// other vendors for example jQuery or Lodash

import "socket.io-client";
