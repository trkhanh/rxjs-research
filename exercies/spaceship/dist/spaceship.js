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



/***/ }),

/***/ "./src/game_1.js":
/*!***********************!*\
  !*** ./src/game_1.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

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



/***/ }),

/***/ "./src/spaceship.js":
/*!**************************!*\
  !*** ./src/spaceship.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _starfield_1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./starfield_1 */ "./src/starfield_1.js");
/* harmony import */ var _starfield_1__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_starfield_1__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _enemy_1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy_1 */ "./src/enemy_1.js");
/* harmony import */ var _enemy_1__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_enemy_1__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hero_1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hero_1 */ "./src/hero_1.js");
/* harmony import */ var _hero_1__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_hero_1__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _game_1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_1 */ "./src/game_1.js");
/* harmony import */ var _game_1__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_game_1__WEBPACK_IMPORTED_MODULE_3__);





/***/ }),

/***/ "./src/starfield_1.js":
/*!****************************!*\
  !*** ./src/starfield_1.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {




function paintStars(stars) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    stars.forEach(function (star) {
        ctx.fillRect(star.x, star.y, star.size, star.size);
    });
}

var SPEED = 40;
var STAR_NUMBER = 250;

var StarStream = Rx.Observable.range(1, STAR_NUMBER)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZW15XzEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWVfMS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVyb18xLmpzIiwid2VicGFjazovLy8uL3NyYy9zcGFjZXNoaXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXJmaWVsZF8xLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDRCOzs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNuQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQTRDO0FBQ1Q7QUFDRjs7Ozs7Ozs7Ozs7Ozs7O0FDQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSyxFIiwiZmlsZSI6InNwYWNlc2hpcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NwYWNlc2hpcC5qc1wiKTtcbiIsInZhciBFTkVNWV9GUkVRID0gMTUwMDtcclxudmFyIEVuZW1pZXMgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKEVORU1ZX0ZSRVEpXHJcbiAgICAuc2NhbihmdW5jdGlvbiAoZW5lbXlBcnJheSkge1xyXG4gICAgICAgIHZhciBlbmVteSA9IHtcclxuICAgICAgICAgICAgeDogcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIGNhbnZhcy53aWR0aCksXHJcbiAgICAgICAgICAgIHk6IC0zMCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGVuZW15QXJyYXkucHVzaChlbmVteSk7XHJcbiAgICAgICAgcmV0dXJuIGVuZW15QXJyYXk7XHJcbiAgICB9LCBbXSk7XHJcblxyXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IGEgcmFuZG9tIGludGVnZXJcclxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50KG1pbiwgbWF4KSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFpbnRFbmVtaWVzKGVuZW1pZXMpIHtcclxuICAgIGVuZW1pZXMuZm9yRWFjaChmdW5jdGlvbiAoZW5lbXkpIHtcclxuICAgICAgICBlbmVteS55ICs9IDU7XHJcbiAgICAgICAgZW5lbXkueCArPSBnZXRSYW5kb21JbnQoLTE1LCAxNSk7XHJcbiAgICAgICAgZHJhd1RyaWFuZ2xlKGVuZW15LngsIGVuZW15LnksIDIwLCAnIzAwZmYwMCcsICdkb3duJyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuIiwidmFyIEdhbWUgPSBSeC5PYnNlcnZhYmxlXHJcbiAgICAuY29tYmluZUxhdGVzdChcclxuICAgICAgICBTdGFyU3RyZWFtLCBTcGFjZVNoaXAsIEVuZW1pZXMsXHJcbiAgICAgICAgZnVuY3Rpb24gKHN0YXJzLCBzcGFjZXNoaXAsIGVuZW1pZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXJzOiBzdGFycyxcclxuICAgICAgICAgICAgICAgIHNwYWNlc2hpcDogc3BhY2VzaGlwLFxyXG4gICAgICAgICAgICAgICAgZW5lbWllczogZW5lbWllc1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5HYW1lLnN1YnNjcmliZShyZW5kZXJTY2VuZSk7IiwidmFyIEhFUk9fWSA9IGNhbnZhcy5oZWlnaHQgLSAzMDtcclxudmFyIG1vdXNlTW92ZSA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGNhbnZhcywgJ21vdXNlbW92ZScpO1xyXG52YXIgU3BhY2VTaGlwID0gbW91c2VNb3ZlXHJcbiAgICAubWFwKGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IGV2ZW50LmNsaWVudFgsXHJcbiAgICAgICAgICAgIHk6IEhFUk9fWVxyXG4gICAgICAgIH07XHJcbiAgICB9KVxyXG4gICAgLnN0YXJ0V2l0aCh7XHJcbiAgICAgICAgeDogY2FudmFzLndpZHRoIC8gMixcclxuICAgICAgICB5OiBIRVJPX1lcclxuICAgIH0pO1xyXG5cclxuZnVuY3Rpb24gZHJhd1RyaWFuZ2xlKHgsIHksIHdpZHRoLCBjb2xvciwgZGlyZWN0aW9uKSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHgubW92ZVRvKHggLSB3aWR0aCwgeSk7XHJcbiAgICBjdHgubGluZVRvKHgsIGRpcmVjdGlvbiA9PT0gJ3VwJyA/IHkgLSB3aWR0aCA6IHkgKyB3aWR0aCk7XHJcbiAgICBjdHgubGluZVRvKHggKyB3aWR0aCwgeSk7XHJcbiAgICBjdHgubGluZVRvKHggLSB3aWR0aCwgeSk7XHJcbiAgICBjdHguZmlsbCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYWludFNwYWNlU2hpcCh4LCB5KSB7XHJcbiAgICBkcmF3VHJpYW5nbGUoeCwgeSwgMjAsICcjZmYwMDAwJywgJ3VwJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhaW50U3BhY2VTaGlwKHgsIHkpIHtcclxuICAgIGRyYXdUcmlhbmdsZSh4LCB5LCAyMCwgJyNmZjAwMDAnLCAndXAnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyU2NlbmUoYWN0b3JzKSB7XHJcbiAgICBwYWludFN0YXJzKGFjdG9ycy5zdGFycyk7XHJcbiAgICBwYWludFNwYWNlU2hpcChhY3RvcnMuc3BhY2VzaGlwLngsIGFjdG9ycy5zcGFjZXNoaXAueSk7XHJcbn1cclxuXHJcbiIsImltcG9ydCAqIGFzIHN0YXJ0RmllbGQgZnJvbSAnLi9zdGFyZmllbGRfMSc7XHJcbmltcG9ydCAqIGFzIGVuZW15IGZyb20gJy4vZW5lbXlfMSc7XHJcbmltcG9ydCAqIGFzIGhlcm8gZnJvbSAnLi9oZXJvXzEnO1xyXG5pbXBvcnQgKiBhcyBHYW1lIGZyb20gJy4vZ2FtZV8xJzsiLCJcclxuXHJcblxyXG5mdW5jdGlvbiBwYWludFN0YXJzKHN0YXJzKSB7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xyXG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xyXG4gICAgc3RhcnMuZm9yRWFjaChmdW5jdGlvbiAoc3Rhcikge1xyXG4gICAgICAgIGN0eC5maWxsUmVjdChzdGFyLngsIHN0YXIueSwgc3Rhci5zaXplLCBzdGFyLnNpemUpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbnZhciBTUEVFRCA9IDQwO1xyXG52YXIgU1RBUl9OVU1CRVIgPSAyNTA7XHJcblxyXG52YXIgU3RhclN0cmVhbSA9IFJ4Lk9ic2VydmFibGUucmFuZ2UoMSwgU1RBUl9OVU1CRVIpXHJcbiAgICAubWFwKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiBwYXJzZUludChNYXRoLnJhbmRvbSgpICogY2FudmFzLndpZHRoKSxcclxuICAgICAgICAgICAgeTogcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIGNhbnZhcy5oZWlnaHQpLFxyXG4gICAgICAgICAgICBzaXplOiBNYXRoLnJhbmRvbSgpICogMyArIDFcclxuICAgICAgICB9O1xyXG4gICAgfSlcclxuICAgIC50b0FycmF5KClcclxuICAgIC5mbGF0TWFwKHN0YXJ0QXJyYXkgPT4ge1xyXG4gICAgICAgIHJldHVybiBSeC5PYnNlcnZhYmxlLmludGVydmFsKFNQRUVEKS5tYXAoKCkgPT4ge1xyXG4gICAgICAgICAgICBzdGFydEFycmF5LmZvckVhY2goc3RhcnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0LnkgPj0gY2FudmFzLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0LnkgPSAwOyAvL3Jlc2V0IHN0YXJ0IHRvIHRvcCBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdGFydC55ICs9IDMgLy8gbW92ZSBzdGFydFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KTsiXSwic291cmNlUm9vdCI6IiJ9