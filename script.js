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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/request */ "./src/js/modules/request.js");
/* harmony import */ var _modules_person__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/person */ "./src/js/modules/person.js");
/* harmony import */ var _modules_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/element */ "./src/js/modules/element.js");



window.addEventListener('DOMContentLoaded', () => {
  let result = [];
  _modules_request__WEBPACK_IMPORTED_MODULE_0__["default"].get().then(res => result = [...res]).then(() => {
    result.forEach(item => new _modules_element__WEBPACK_IMPORTED_MODULE_2__["default"](item).createElement());
  });
  _modules_person__WEBPACK_IMPORTED_MODULE_1__["default"].createPerson();
  const periods = document.querySelectorAll('.person__periods p');
  periods.forEach(item => {
    item.addEventListener('click', e => {
      periods.forEach(item => item.classList.remove('active'));

      if (e.target) {
        e.target.classList.add('active');
        const text = e.target.textContent.toLowerCase();
        new _modules_element__WEBPACK_IMPORTED_MODULE_2__["default"](item, text).changeContent();
        result.forEach(item => new _modules_element__WEBPACK_IMPORTED_MODULE_2__["default"](item, text).createElement());
      }
    });
  });
});

/***/ }),

/***/ "./src/js/modules/element.js":
/*!***********************************!*\
  !*** ./src/js/modules/element.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Element {
  constructor(data) {
    let view = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'weekly';
    this.wrapper = document.querySelector('.dashboard__wrapper');
    this.data = data;
    this.view = view;
  }

  checkForLast() {
    let last = '';

    switch (this.data) {
      case 'daily':
        last = 'day';
        break;

      case 'weekly':
        last = 'week';
        break;

      case 'monthly':
        last = 'month';
        break;

      default:
        last = 'week';
    }

    return last;
  }

  createElement() {
    const {
      title,
      timeframes
    } = this.data;
    const currentTime = timeframes[this.view].current;
    const previousTime = timeframes[this.view].previous;
    const element = document.createElement('div');
    element.innerHTML = `
            <div class="element">
                <div class="element__info">
                    <div class="element__title">${title}</div>
                    <div class="element__duration">${currentTime}hrs</div>
                    <div class="element__text">last ${this.checkForLast()} - ${previousTime}hrs</div>
                </div>
            </div>
        `;
    this.wrapper.append(element);
    document.querySelectorAll('.element').forEach(item => {
      const firstColor = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
      const secondColor = '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
      item.style.backgroundImage = `linear-gradient(to left, ${firstColor}, ${secondColor})`;
    });
  }

  changeContent() {
    document.querySelectorAll('.element').forEach(item => {
      item.parentElement.remove();
      item.remove();
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Element);

/***/ }),

/***/ "./src/js/modules/person.js":
/*!**********************************!*\
  !*** ./src/js/modules/person.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Person {
  constructor() {
    this.wrapper = document.querySelector('.dashboard__wrapper');
  }

  createPerson() {
    this.wrapper.innerHTML = `
            <div class="person">
                <div class="person__info">
                    <p class="person__subtitle">Report for</p>
                    <p class="person__title">Jeremy Robson</p>
                </div>
                <div class="person__periods">
                    <p>Daily</p>
                    <p class="active">Weekly</p>
                    <p>Monthly</p>
                </div>
            </div>
        `;
  }

}

const newPerson = new Person();
/* harmony default export */ __webpack_exports__["default"] = (newPerson);

/***/ }),

/***/ "./src/js/modules/request.js":
/*!***********************************!*\
  !*** ./src/js/modules/request.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Request {
  constructor(url) {
    this.url = url;
  }

  async get() {
    const res = await fetch(this.url);
    return await res.json();
  }

}

const req = new Request('assets/db/data.json');
/* harmony default export */ __webpack_exports__["default"] = (req);

/***/ })

/******/ });
//# sourceMappingURL=script.js.map