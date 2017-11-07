/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "static/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
throw new Error("Cannot find module \"Vue\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Favlist_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Favlist_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Favlist_vue__);


__WEBPACK_IMPORTED_MODULE_0_Vue___default.a.config.debug = true; //开启错误提示
window.onload = function () {
  new __WEBPACK_IMPORTED_MODULE_0_Vue___default.a({
    el: '#app',
    components: {
      'my-component': __WEBPACK_IMPORTED_MODULE_1__components_Favlist_vue__["default"]
    }
  });
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Cannot find module 'vue-template-compiler'\n    at Function.Module._resolveFilename (module.js:489:15)\n    at Function.Module._load (module.js:439:25)\n    at Module.require (module.js:517:17)\n    at require (internal/module.js:11:18)\n    at Object.<anonymous> (/Users/chengfei/Desktop/ZWWorkSapce/NodeDemo/webpack/vue-hot-demo/node_modules/vue-loader/lib/parser.js:1:80)\n    at Module._compile (module.js:573:30)\n    at Object.Module._extensions..js (module.js:584:10)\n    at Module.load (module.js:507:32)\n    at tryModuleLoad (module.js:470:12)\n    at Function.Module._load (module.js:462:3)\n    at Module.require (module.js:517:17)\n    at require (internal/module.js:11:18)\n    at Object.<anonymous> (/Users/chengfei/Desktop/ZWWorkSapce/NodeDemo/webpack/vue-hot-demo/node_modules/vue-loader/lib/loader.js:3:15)\n    at Module._compile (module.js:573:30)\n    at Object.Module._extensions..js (module.js:584:10)\n    at Module.load (module.js:507:32)\n    at tryModuleLoad (module.js:470:12)\n    at Function.Module._load (module.js:462:3)\n    at Module.require (module.js:517:17)\n    at require (internal/module.js:11:18)\n    at Object.<anonymous> (/Users/chengfei/Desktop/ZWWorkSapce/NodeDemo/webpack/vue-hot-demo/node_modules/vue-loader/index.js:1:80)\n    at Module._compile (module.js:573:30)\n    at Object.Module._extensions..js (module.js:584:10)\n    at Module.load (module.js:507:32)\n    at tryModuleLoad (module.js:470:12)\n    at Function.Module._load (module.js:462:3)\n    at Module.require (module.js:517:17)\n    at require (internal/module.js:11:18)\n    at loadLoader (/Users/chengfei/Desktop/ZWWorkSapce/NodeDemo/webpack/vue-hot-demo/node_modules/loader-runner/lib/loadLoader.js:13:17)\n    at iteratePitchingLoaders (/Users/chengfei/Desktop/ZWWorkSapce/NodeDemo/webpack/vue-hot-demo/node_modules/loader-runner/lib/LoaderRunner.js:169:2)");

/***/ })
/******/ ]);