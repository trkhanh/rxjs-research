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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/spaceship.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/enemy_1.js":
/*!************************!*\
  !*** ./src/enemy_1.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ENEMY_FREQ = 1500;
var Enemies = Rx.Observable.interval(ENEMY_FREQ)
    .scan(function (enemyArray) {
        var enemy = {
            x: parseInt(Math.random() * canvas.width),
            y: -30,
        };
        enemyArray.push(enemy);
        return enemyArray;
    }, []);

// Helper function to get a random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function paintEnemies(enemies) {
    enemies.forEach(function (enemy) {
        enemy.y += 5;
        enemy.x += getRandomInt(-15, 15);
        drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down');
    });
}

var Game = Rx.Observable
    .combineLatest(
        StarStream, SpaceShip, Enemies,
        function (stars, spaceship, enemies) {
            return {
                stars: stars,
                spaceship: spaceship,
                enemies: enemies
            };
        });
Game.subscribe(renderScene);

/***/ }),

/***/ "./src/hero_1.js":
/*!***********************!*\
  !*** ./src/hero_1.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

var HERO_Y = canvas.height - 30;
var mouseMove = Rx.Observable.fromEvent(canvas, 'mousemove');
var SpaceShip = mouseMove
    .map(function (event) {
        return {
            x: event.clientX,
            y: HERO_Y
        };
    })
    .startWith({
        x: canvas.width / 2,
        y: HERO_Y
    });

function drawTriangle(x, y, width, color, direction) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - width, y);
    ctx.lineTo(x, direction === 'up' ? y - width : y + width);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x - width, y);
    ctx.fill();
}

function paintSpaceShip(x, y) {
    drawTriangle(x, y, 20, '#ff0000', 'up');
}

function paintSpaceShip(x, y) {
    drawTriangle(x, y, 20, '#ff0000', 'up');
}

function renderScene(actors) {
    paintStars(actors.stars);
    paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
}

var Game = Rx.Observable
    .combineLatest(
        StarStream, SpaceShip,
        function (stars, spaceship) {
            return {
                stars: stars,
                spaceship: spaceship
            };
        });

Game.subscribe(renderScene);

/***/ }),

/***/ "./src/spaceship.js":
/*!**************************!*\
  !*** ./src/spaceship.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enemy_1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy_1 */ "./src/enemy_1.js");
/* harmony import */ var _enemy_1__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_enemy_1__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hero_1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hero_1 */ "./src/hero_1.js");
/* harmony import */ var _hero_1__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hero_1__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _starfield_1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./starfield_1 */ "./src/starfield_1.js");
/* harmony import */ var _starfield_1__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_starfield_1__WEBPACK_IMPORTED_MODULE_2__);




/***/ }),

/***/ "./src/starfield_1.js":
/*!****************************!*\
  !*** ./src/starfield_1.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

let canvas = document.createElement('canvas');
let ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


function paintStars(stars) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    stars.forEach(function (star) {
        ctx.fillRect(star.x, star.y, star.size, star.size);
    });
}

let SPEED = 40;
let STAR_NUMBER = 250;
let StarStream = Rx.Observable.range(1, STAR_NUMBER)
    .map(function () {
        return {
            x: parseInt(Math.random() * canvas.width),
            y: parseInt(Math.random() * canvas.height),
            size: Math.random() * 3 + 1
        };
    })
    .toArray()
    .flatMap(startArray => {
        return Rx.Observable.interval(SPEED).map(() => {
            startArray.forEach(start => {
                if (start.y >= canvas.height) {
                    start.y = 0; //reset start to top of the screen
                }
                start.y += 3 // move start
            })
        })
    });

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZW15XzEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlcm9fMS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3BhY2VzaGlwLmpzIiwid2VicGFjazovLy8uL3NyYy9zdGFyZmllbGRfMS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw0Qjs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVULDRCOzs7Ozs7Ozs7Ozs7QUMvQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBbUM7QUFDRjs7Ozs7Ozs7Ozs7O0FDRGpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLLEUiLCJmaWxlIjoic3BhY2VzaGlwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvc3BhY2VzaGlwLmpzXCIpO1xuIiwidmFyIEVORU1ZX0ZSRVEgPSAxNTAwO1xyXG52YXIgRW5lbWllcyA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoRU5FTVlfRlJFUSlcclxuICAgIC5zY2FuKGZ1bmN0aW9uIChlbmVteUFycmF5KSB7XHJcbiAgICAgICAgdmFyIGVuZW15ID0ge1xyXG4gICAgICAgICAgICB4OiBwYXJzZUludChNYXRoLnJhbmRvbSgpICogY2FudmFzLndpZHRoKSxcclxuICAgICAgICAgICAgeTogLTMwLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZW5lbXlBcnJheS5wdXNoKGVuZW15KTtcclxuICAgICAgICByZXR1cm4gZW5lbXlBcnJheTtcclxuICAgIH0sIFtdKTtcclxuXHJcbi8vIEhlbHBlciBmdW5jdGlvbiB0byBnZXQgYSByYW5kb20gaW50ZWdlclxyXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYWludEVuZW1pZXMoZW5lbWllcykge1xyXG4gICAgZW5lbWllcy5mb3JFYWNoKGZ1bmN0aW9uIChlbmVteSkge1xyXG4gICAgICAgIGVuZW15LnkgKz0gNTtcclxuICAgICAgICBlbmVteS54ICs9IGdldFJhbmRvbUludCgtMTUsIDE1KTtcclxuICAgICAgICBkcmF3VHJpYW5nbGUoZW5lbXkueCwgZW5lbXkueSwgMjAsICcjMDBmZjAwJywgJ2Rvd24nKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG52YXIgR2FtZSA9IFJ4Lk9ic2VydmFibGVcclxuICAgIC5jb21iaW5lTGF0ZXN0KFxyXG4gICAgICAgIFN0YXJTdHJlYW0sIFNwYWNlU2hpcCwgRW5lbWllcyxcclxuICAgICAgICBmdW5jdGlvbiAoc3RhcnMsIHNwYWNlc2hpcCwgZW5lbWllcykge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhcnM6IHN0YXJzLFxyXG4gICAgICAgICAgICAgICAgc3BhY2VzaGlwOiBzcGFjZXNoaXAsXHJcbiAgICAgICAgICAgICAgICBlbmVtaWVzOiBlbmVtaWVzXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbkdhbWUuc3Vic2NyaWJlKHJlbmRlclNjZW5lKTsiLCJ2YXIgSEVST19ZID0gY2FudmFzLmhlaWdodCAtIDMwO1xyXG52YXIgbW91c2VNb3ZlID0gUnguT2JzZXJ2YWJsZS5mcm9tRXZlbnQoY2FudmFzLCAnbW91c2Vtb3ZlJyk7XHJcbnZhciBTcGFjZVNoaXAgPSBtb3VzZU1vdmVcclxuICAgIC5tYXAoZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogZXZlbnQuY2xpZW50WCxcclxuICAgICAgICAgICAgeTogSEVST19ZXHJcbiAgICAgICAgfTtcclxuICAgIH0pXHJcbiAgICAuc3RhcnRXaXRoKHtcclxuICAgICAgICB4OiBjYW52YXMud2lkdGggLyAyLFxyXG4gICAgICAgIHk6IEhFUk9fWVxyXG4gICAgfSk7XHJcblxyXG5mdW5jdGlvbiBkcmF3VHJpYW5nbGUoeCwgeSwgd2lkdGgsIGNvbG9yLCBkaXJlY3Rpb24pIHtcclxuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5tb3ZlVG8oeCAtIHdpZHRoLCB5KTtcclxuICAgIGN0eC5saW5lVG8oeCwgZGlyZWN0aW9uID09PSAndXAnID8geSAtIHdpZHRoIDogeSArIHdpZHRoKTtcclxuICAgIGN0eC5saW5lVG8oeCArIHdpZHRoLCB5KTtcclxuICAgIGN0eC5saW5lVG8oeCAtIHdpZHRoLCB5KTtcclxuICAgIGN0eC5maWxsKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhaW50U3BhY2VTaGlwKHgsIHkpIHtcclxuICAgIGRyYXdUcmlhbmdsZSh4LCB5LCAyMCwgJyNmZjAwMDAnLCAndXAnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFpbnRTcGFjZVNoaXAoeCwgeSkge1xyXG4gICAgZHJhd1RyaWFuZ2xlKHgsIHksIDIwLCAnI2ZmMDAwMCcsICd1cCcpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJTY2VuZShhY3RvcnMpIHtcclxuICAgIHBhaW50U3RhcnMoYWN0b3JzLnN0YXJzKTtcclxuICAgIHBhaW50U3BhY2VTaGlwKGFjdG9ycy5zcGFjZXNoaXAueCwgYWN0b3JzLnNwYWNlc2hpcC55KTtcclxufVxyXG5cclxudmFyIEdhbWUgPSBSeC5PYnNlcnZhYmxlXHJcbiAgICAuY29tYmluZUxhdGVzdChcclxuICAgICAgICBTdGFyU3RyZWFtLCBTcGFjZVNoaXAsXHJcbiAgICAgICAgZnVuY3Rpb24gKHN0YXJzLCBzcGFjZXNoaXApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXJzOiBzdGFycyxcclxuICAgICAgICAgICAgICAgIHNwYWNlc2hpcDogc3BhY2VzaGlwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG5HYW1lLnN1YnNjcmliZShyZW5kZXJTY2VuZSk7IiwiaW1wb3J0ICogYXMgZW5lbXkgZnJvbSAnLi9lbmVteV8xJztcclxuaW1wb3J0ICogYXMgaGVybyBmcm9tICcuL2hlcm9fMSc7XHJcbmltcG9ydCAqIGFzIHN0YXJ0RmllbGQgZnJvbSAnLi9zdGFyZmllbGRfMSc7IiwibGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcblxyXG5mdW5jdGlvbiBwYWludFN0YXJzKHN0YXJzKSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xyXG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xyXG4gICAgc3RhcnMuZm9yRWFjaChmdW5jdGlvbiAoc3Rhcikge1xyXG4gICAgICAgIGN0eC5maWxsUmVjdChzdGFyLngsIHN0YXIueSwgc3Rhci5zaXplLCBzdGFyLnNpemUpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmxldCBTUEVFRCA9IDQwO1xyXG5sZXQgU1RBUl9OVU1CRVIgPSAyNTA7XHJcbmxldCBTdGFyU3RyZWFtID0gUnguT2JzZXJ2YWJsZS5yYW5nZSgxLCBTVEFSX05VTUJFUilcclxuICAgIC5tYXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiBjYW52YXMud2lkdGgpLFxyXG4gICAgICAgICAgICB5OiBwYXJzZUludChNYXRoLnJhbmRvbSgpICogY2FudmFzLmhlaWdodCksXHJcbiAgICAgICAgICAgIHNpemU6IE1hdGgucmFuZG9tKCkgKiAzICsgMVxyXG4gICAgICAgIH07XHJcbiAgICB9KVxyXG4gICAgLnRvQXJyYXkoKVxyXG4gICAgLmZsYXRNYXAoc3RhcnRBcnJheSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoU1BFRUQpLm1hcCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHN0YXJ0QXJyYXkuZm9yRWFjaChzdGFydCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnQueSA+PSBjYW52YXMuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQueSA9IDA7IC8vcmVzZXQgc3RhcnQgdG8gdG9wIG9mIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0YXJ0LnkgKz0gMyAvLyBtb3ZlIHN0YXJ0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0pOyJdLCJzb3VyY2VSb290IjoiIn0=