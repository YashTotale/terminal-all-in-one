module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/extension.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/lodash.debounce/index.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash.debounce/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;


/***/ }),

/***/ "./src/commands/changeFontSize.js":
/*!****************************************!*\
  !*** ./src/commands/changeFontSize.js ***!
  \****************************************/
/*! exports provided: changeFontSize, decreaseFontSize, increaseFontSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeFontSize", function() { return changeFontSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decreaseFontSize", function() { return decreaseFontSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "increaseFontSize", function() { return increaseFontSize; });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vscode */ "vscode");
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash.debounce */ "./node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../messages */ "./src/messages.js");
/* harmony import */ var _helpers_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/config */ "./src/helpers/config.js");
/* harmony import */ var _helpers_config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_helpers_config__WEBPACK_IMPORTED_MODULE_3__);






const FONT_SIZE_CONFIG = "terminal.integrated.fontSize";

const getFontSizeConfig = function () {
  return Object(_helpers_config__WEBPACK_IMPORTED_MODULE_3__["getConfig"])({ section: FONT_SIZE_CONFIG });
};

const updateFontSizeConfig = async function (newSize) {
  await Object(_helpers_config__WEBPACK_IMPORTED_MODULE_3__["updateConfig"])({ section: FONT_SIZE_CONFIG, value: newSize });
  clearTerminal();
};

const clearTerminal = function () {
  return vscode__WEBPACK_IMPORTED_MODULE_0___default.a.commands.executeCommand("terminalAllInOne.clearTerminal");
};

const decreaseFontSizeHandler = function () {
  const currentSize = getFontSizeConfig();
  updateFontSizeConfig(currentSize - 1);
};

const increaseFontSizeHandler = function () {
  const currentSize = getFontSizeConfig();
  updateFontSizeConfig(currentSize + 1);
};

const createFontSizes = function (currentSize) {
  let fontSizes = [];
  for (let i = 8; i < 27; i++) {
    fontSizes.push({
      label: `${i}-pt`,
      description: currentSize === i ? "current" : null,
    });
  }
  return fontSizes;
};

const getTrueSize = function (fontSizeObject) {
  return parseInt(fontSizeObject.label.slice(0, -3));
};

const changeFontSizeHandler = async function () {
  const currentSize = getFontSizeConfig();
  const fontSizes = createFontSizes(currentSize);
  Object(_messages__WEBPACK_IMPORTED_MODULE_2__["default"])("fontSizeQuickPickOpened");
  const selectedSize = await vscode__WEBPACK_IMPORTED_MODULE_0___default.a.window.showQuickPick(fontSizes, {
    placeHolder: "Change the Font Size",
    canPickMany: false,
    onDidSelectItem: lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(async function (fontSize) {
      const trueSize = getTrueSize(fontSize);
      return updateFontSizeConfig(trueSize);
    }, 300),
  });
  if (!selectedSize) {
    return updateFontSizeConfig(currentSize);
  }
  Object(_messages__WEBPACK_IMPORTED_MODULE_2__["default"])("fontSizeSelected", selectedSize.label);
};

// export default [
//
//   ,
//   {
//     name: "changeFontSize",
//     handler: changeFontSize,
//   },
// ];

const changeFontSize = {
  name: "changeFontSize",
  handler: changeFontSizeHandler,
};

const decreaseFontSize = {
  name: "decreaseFontSize",
  handler: decreaseFontSizeHandler,
};

const increaseFontSize = {
  name: "increaseFontSize",
  handler: increaseFontSizeHandler,
};


/***/ }),

/***/ "./src/commands/chooseTerminalTheme.js":
/*!*********************************************!*\
  !*** ./src/commands/chooseTerminalTheme.js ***!
  \*********************************************/
/*! exports provided: chooseTerminalTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chooseTerminalTheme", function() { return chooseTerminalTheme; });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vscode */ "vscode");
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash.debounce */ "./node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../messages */ "./src/messages.js");
/* harmony import */ var _helpers_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/config */ "./src/helpers/config.js");
/* harmony import */ var _helpers_config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_helpers_config__WEBPACK_IMPORTED_MODULE_3__);






const COLORS_CONFIG = "workbench.colorCustomizations";
const TERMINAL_THEME_CONFIG = "terminalAllInOne.terminalTheme";

const themes = __webpack_require__(/*! ../themes.json */ "./src/themes.json");
const themeSchemes = themes.map((theme) => theme.colors);

function getNonTerminalStyles(allStyles) {
  return Object.keys(allStyles).reduce((nonTerminalStyles, currentStyle) => {
    if (!currentStyle.includes("terminal")) {
      nonTerminalStyles[currentStyle] = allStyles[currentStyle];
    }
    return nonTerminalStyles;
  }, {});
}

function updateThemeConfig(theme) {
  return Object(_helpers_config__WEBPACK_IMPORTED_MODULE_3__["updateConfig"])({ section: TERMINAL_THEME_CONFIG, value: theme });
}

function getThemeConfig() {
  return Object(_helpers_config__WEBPACK_IMPORTED_MODULE_3__["getConfig"])({ section: TERMINAL_THEME_CONFIG });
}

function updateColorsConfig(colors) {
  return Object(_helpers_config__WEBPACK_IMPORTED_MODULE_3__["updateConfig"])({ section: COLORS_CONFIG, value: colors });
}

function getColorsConfig() {
  return Object(_helpers_config__WEBPACK_IMPORTED_MODULE_3__["getConfig"])({ section: COLORS_CONFIG });
}

async function updateTerminalTheme(themeName, themeNames) {
  //Check if theme exists and set the index of it
  let themeIndex = 0;
  const themeExists = themeNames.some(({ label }, i) => {
    if (label === themeName) {
      themeIndex = i;
      return true;
    }
    return false;
  });
  if (!themeExists) {
    //If the theme doesn't exist, show an error message
    return Object(_messages__WEBPACK_IMPORTED_MODULE_2__["default"])("themeDoesNotExist");
  }
  const currentColors = getColorsConfig();
  if (themeName === "None") {
    //Remove all the terminal styles
    return updateColorsConfig(getNonTerminalStyles(currentColors));
  }
  //If the theme does exist and is not None, set the new colors
  const themeScheme = { ...currentColors, ...themeSchemes[themeIndex] };
  return updateColorsConfig(themeScheme);
}

async function chooseTerminalThemeHandler() {
  const currentColors = getColorsConfig();
  const themeNames = themes.map(({ name }) => ({
    label: name,
    description: getThemeConfig() === name ? "current" : null,
  }));
  Object(_messages__WEBPACK_IMPORTED_MODULE_2__["default"])("themeQuickPickOpened");
  //Wait for the user to select a theme or exit the quick pick
  const selectedTheme = await vscode__WEBPACK_IMPORTED_MODULE_0___default.a.window.showQuickPick(themeNames, {
    placeHolder: "Choose a Terminal Theme",
    canPickMany: false,
    onDidSelectItem: lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(async (theme) => {
      updateTerminalTheme(theme.label, themeNames);
    }, 300),
  });
  if (!selectedTheme) {
    //If no theme was selected, revert to the old config
    return updateColorsConfig(currentColors);
  }
  //If a theme was selected, show a message and update the TERMINAL_THEME_CONFIG
  Object(_messages__WEBPACK_IMPORTED_MODULE_2__["default"])("themeSelected", selectedTheme.label);
  return updateThemeConfig(selectedTheme.label);
}

function onTerminalThemeConfigChange(event) {
  if (event.affectsConfiguration(TERMINAL_THEME_CONFIG)) {
    return updateTerminalTheme(getThemeConfig());
  }
}

const chooseTerminalTheme = {
  name: "chooseTerminalTheme",
  handler: chooseTerminalThemeHandler,
  config: onTerminalThemeConfigChange,
};


/***/ }),

/***/ "./src/commands/clearTerminal.js":
/*!***************************************!*\
  !*** ./src/commands/clearTerminal.js ***!
  \***************************************/
/*! exports provided: clearTerminal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearTerminal", function() { return clearTerminal; });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vscode */ "vscode");
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);


const clearTerminalHandler = function () {
  return vscode__WEBPACK_IMPORTED_MODULE_0___default.a.commands.executeCommand(
    "workbench.action.terminal.sendSequence",
    {
      text: "\u0003 clear \u000D",
    }
  );
};

const clearTerminal = {
  name: "clearTerminal",
  handler: clearTerminalHandler,
};


/***/ }),

/***/ "./src/commands/index.js":
/*!*******************************!*\
  !*** ./src/commands/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _changeFontSize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./changeFontSize */ "./src/commands/changeFontSize.js");
/* harmony import */ var _chooseTerminalTheme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chooseTerminalTheme */ "./src/commands/chooseTerminalTheme.js");
/* harmony import */ var _clearTerminal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clearTerminal */ "./src/commands/clearTerminal.js");
/* harmony import */ var _runScript__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./runScript */ "./src/commands/runScript.js");
/* harmony import */ var _toggleMaxTerm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toggleMaxTerm */ "./src/commands/toggleMaxTerm.js");
// const files = fs.readdirSync(__dirname);
// vscode.window.showInformationMessage(JSON.stringify(files));

// module.exports = files.reduce((imports, currentFile) => {
//   if (currentFile.includes(".command.js")) {
//     const command = require(`./${currentFile}`);
//     if (Array.isArray(command)) {
//       command.forEach((c) => imports.push(c));
//     } else {
//       imports.push(command);
//     }
//   }
//   return imports;
// }, []);







/* harmony default export */ __webpack_exports__["default"] = ([
  _chooseTerminalTheme__WEBPACK_IMPORTED_MODULE_1__["chooseTerminalTheme"],
  _clearTerminal__WEBPACK_IMPORTED_MODULE_2__["clearTerminal"],
  _runScript__WEBPACK_IMPORTED_MODULE_3__["runScript"],
  _toggleMaxTerm__WEBPACK_IMPORTED_MODULE_4__["toggleMaxTerm"],
  _changeFontSize__WEBPACK_IMPORTED_MODULE_0__["changeFontSize"],
  _changeFontSize__WEBPACK_IMPORTED_MODULE_0__["increaseFontSize"],
  _changeFontSize__WEBPACK_IMPORTED_MODULE_0__["decreaseFontSize"],
]);


/***/ }),

/***/ "./src/commands/runScript.js":
/*!***********************************!*\
  !*** ./src/commands/runScript.js ***!
  \***********************************/
/*! exports provided: runScript */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runScript", function() { return runScript; });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vscode */ "vscode");
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/config */ "./src/helpers/config.js");
/* harmony import */ var _helpers_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_helpers_config__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../messages */ "./src/messages.js");




const getScriptsConfig = function () {
  return Object(_helpers_config__WEBPACK_IMPORTED_MODULE_1__["getConfig"])({ section: "terminalAllInOne.scripts" });
};

const shouldDisableDescription = function () {
  return Object(_helpers_config__WEBPACK_IMPORTED_MODULE_1__["getConfig"])({ section: "terminalAllInOne.script.disableDescription" });
};

const disableDescription = function () {
  return Object(_helpers_config__WEBPACK_IMPORTED_MODULE_1__["updateConfig"])({
    section: "terminalAllInOne.script.disableDescription",
    value: true,
  });
};

const runInTerminal = async function (command) {
  return vscode__WEBPACK_IMPORTED_MODULE_0___default.a.commands.executeCommand(
    "workbench.action.terminal.sendSequence",
    {
      text: command,
    }
  );
};

const createDescription = function ({ name, script }) {
  function echoCmd(cmd, num) {
    return `echo -e "\\t ${num}. ${cmd}"; `;
  }
  const controlC = "\u0003";
  const emptyLine = 'echo "";';
  const ignoreAbove =
    "echo '^ Ignore the above command (it tells the terminal to display the script info) ^';";
  const running = `echo -e "Running script: \\033[1m${name}\\033[0m";`;
  const enter = "\u000D";
  let cmds = "";
  if (typeof script === "string") {
    cmds = echoCmd(script, 1);
  } else {
    script.forEach((s, i) => {
      cmds += echoCmd(s, i + 1);
    });
  }
  return `${controlC} ${emptyLine} ${ignoreAbove} ${emptyLine} ${running} ${emptyLine} ${cmds}${emptyLine} ${enter}`;
};

const createCommands = function (script) {
  if (typeof script === "string") {
    return script;
  }
  let jointScript = "";
  script.forEach((s, i) => {
    jointScript += i ? ` && ${s}` : s;
  });
  return jointScript;
};

const execute = async function ({ name, script }) {
  const cmds = createCommands(script);
  await vscode__WEBPACK_IMPORTED_MODULE_0___default.a.commands.executeCommand("workbench.action.terminal.focus");
  if (!shouldDisableDescription()) {
    await runInTerminal(createDescription({ name, script }));
    Object(_messages__WEBPACK_IMPORTED_MODULE_2__["default"])("disableScriptDescription", disableDescription);
  }
  await runInTerminal(`${cmds} \u000D`);
};

const runScriptHandler = async function (index) {
  const scripts = getScriptsConfig();
  if (typeof index === "number") {
    if (index < scripts.length) {
      return execute(scripts[index]);
    }
    return Object(_messages__WEBPACK_IMPORTED_MODULE_2__["default"])("noScripts", index);
  }
  if (!scripts.length) {
    return Object(_messages__WEBPACK_IMPORTED_MODULE_2__["default"])("noScripts");
  }
  const options = scripts.map(({ name, script }, i) => ({
    label: name,
    description: Array.isArray(script) ? script.join(" -> ") : script,
    index: i,
  }));
  const selectedScript = await vscode__WEBPACK_IMPORTED_MODULE_0___default.a.window.showQuickPick(options, {
    placeHolder: "Run a Script",
    canPickMany: false,
  });
  if (selectedScript) {
    return execute(scripts[selectedScript.index]);
  }
};

const runScript = {
  name: "runScript",
  handler: runScriptHandler,
};


/***/ }),

/***/ "./src/commands/toggleMaxTerm.js":
/*!***************************************!*\
  !*** ./src/commands/toggleMaxTerm.js ***!
  \***************************************/
/*! exports provided: toggleMaxTerm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleMaxTerm", function() { return toggleMaxTerm; });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vscode */ "vscode");
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);


const toggleMaxTermHandler = function () {
  vscode__WEBPACK_IMPORTED_MODULE_0___default.a.commands.executeCommand("workbench.action.terminal.focus");
  vscode__WEBPACK_IMPORTED_MODULE_0___default.a.commands.executeCommand("workbench.action.toggleMaximizedPanel");
};

const toggleMaxTerm = {
  name: "toggleMaxTerm",
  handler: toggleMaxTermHandler,
};


/***/ }),

/***/ "./src/extension.js":
/*!**************************!*\
  !*** ./src/extension.js ***!
  \**************************/
/*! exports provided: activate, deactivate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activate", function() { return activate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deactivate", function() { return deactivate; });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vscode */ "vscode");
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./messages */ "./src/messages.js");
/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commands */ "./src/commands/index.js");





function createCommandName(name) {
  return `terminalAllInOne.${name}`;
}

function registerCommand({ commandName, handler, context }) {
  return context.subscriptions.push(
    vscode__WEBPACK_IMPORTED_MODULE_0___default.a.commands.registerCommand(commandName, handler)
  );
}

function createCommands(context) {
  _commands__WEBPACK_IMPORTED_MODULE_2__["default"].forEach((command) => {
    const { name, handler, config } = command;
    const commandName = createCommandName(name);
    registerCommand({ commandName, handler, context });
    vscode__WEBPACK_IMPORTED_MODULE_0___default.a.workspace.onDidChangeConfiguration(config);
  });
}

function activate(context) {
  const o = vscode__WEBPACK_IMPORTED_MODULE_0___default.a.window.createOutputChannel("ee");
  _commands__WEBPACK_IMPORTED_MODULE_2__["default"].forEach((cmd) => {
    o.appendLine(JSON.stringify(cmd));
  });
  Object(_messages__WEBPACK_IMPORTED_MODULE_1__["default"])("onstart", context);
  createCommands(context);
}

function deactivate() {}


/***/ }),

/***/ "./src/helpers/config.js":
/*!*******************************!*\
  !*** ./src/helpers/config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const vscode = __webpack_require__(/*! vscode */ "vscode");
const messages = __webpack_require__(/*! ../messages */ "./src/messages.js");

const configuration = function (section) {
  return vscode.workspace.getConfiguration(section);
};

const getConfig = function ({ config, section }) {
  return configuration(config).get(section);
};

const updateConfig = function ({ config, section, value }) {
  try {
    return config
      ? config.update(section, value, true)
      : configuration().update(section, value, true);
  } catch ({ message }) {
    messages.showMessage("error", message);
  }
};

module.exports = { config: configuration, getConfig, updateConfig };


/***/ }),

/***/ "./src/messages.js":
/*!*************************!*\
  !*** ./src/messages.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vscode */ "vscode");
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/config */ "./src/helpers/config.js");
/* harmony import */ var _helpers_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_helpers_config__WEBPACK_IMPORTED_MODULE_1__);



const EXTENSION_NAME = "terminalAllInOne";
const EXTENSION_NAME_W_PUBLISHER = "yasht.terminal-all-in-one";
const READABLE_EXTENSION_NAME = "Terminal All In One";

const TERMINAL_MESSAGES_CONFIG = `${EXTENSION_NAME}.messages`;

const DONT_SHOW = "Don't Show Again";

function getMessagesConfig(key) {
  return Object(_helpers_config__WEBPACK_IMPORTED_MODULE_1__["getConfig"])({ config: TERMINAL_MESSAGES_CONFIG, section: key });
}

async function infoWithDisableOption(configProperty, info) {
  if (getMessagesConfig(configProperty)) {
    const selection = await vscode__WEBPACK_IMPORTED_MODULE_0___default.a.window.showInformationMessage(
      info,
      DONT_SHOW
    );
    if (selection === DONT_SHOW) {
      await updateMessagesConfig(configProperty, false);
    }
  }
}

async function updateMessagesConfig(key, value) {
  Object(_helpers_config__WEBPACK_IMPORTED_MODULE_1__["updateConfig"])({
    section: TERMINAL_MESSAGES_CONFIG,
    value: {
      ...Object(_helpers_config__WEBPACK_IMPORTED_MODULE_1__["getConfig"])({ section: TERMINAL_MESSAGES_CONFIG }),
      [key]: value,
    },
  });
}

const messages = {
  // Message on start
  onstart: async (context) => {
    const STATE_PROPERTY = "shouldNotShowOnStartMessage";
    if (!context.globalState.get(STATE_PROPERTY)) {
      const selection = await vscode__WEBPACK_IMPORTED_MODULE_0___default.a.window.showInformationMessage(
        `Thanks for installing ${READABLE_EXTENSION_NAME}. Check out our README for more information on the extension.`,
        "README"
      );
      context.globalState.update(STATE_PROPERTY, true);
      if (selection === "README") {
        vscode__WEBPACK_IMPORTED_MODULE_0___default.a.commands.executeCommand(
          "extension.open",
          EXTENSION_NAME_W_PUBLISHER
        );
      }
    }
  },
  //Message when the theme quick pick is opened
  themeQuickPickOpened: async () => {
    await infoWithDisableOption(
      "shouldShowThemeQuickPickMessage",
      "Open the terminal to see a live preview"
    );
  },
  //Message when a theme that does not exist is chosen
  themeDoesNotExist: async () => {
    const selection = await vscode__WEBPACK_IMPORTED_MODULE_0___default.a.window.showErrorMessage(
      "That theme doesn't seem to exist. Please open a new issue in the github repository if this theme does exist.",
      "Issues Page"
    );
    if (selection === "Issues Page") {
      vscode__WEBPACK_IMPORTED_MODULE_0___default.a.env.openExternal(
        "https://github.com/YashTotale/terminal-all-in-one/issues"
      );
    }
  },
  //Message when a theme is selected
  themeSelected: async (selectedTheme) => {
    infoWithDisableOption(
      "shouldShowSelectedThemeMessage",
      `"${selectedTheme}" has been applied`
    );
  },
  //Message when the font size quick pick is opened
  fontSizeQuickPickOpened: async () => {
    infoWithDisableOption(
      "shouldShowFontSizeQuickPickMessage",
      "Open the terminal for a live preview. If a terminal was already open and you cannot see your previous commands, scroll up in the terminal."
    );
  },
  fontSizeSelected: async (selectedSize) => {
    infoWithDisableOption(
      "shouldShowSelectedFontSizeMessage",
      `Font Size "${selectedSize}" has been applied`
    );
  },
  noScripts: async (index) => {
    const message =
      typeof index === "number"
        ? "No script has been defined for that index"
        : "No scripts have been defined";
    const selection = await vscode__WEBPACK_IMPORTED_MODULE_0___default.a.window.showWarningMessage(
      message,
      "Settings",
      "Scripts Explained"
    );
    if (selection === "Settings") {
      return vscode__WEBPACK_IMPORTED_MODULE_0___default.a.commands.executeCommand(
        "workbench.action.openSettingsJson"
      );
    }
    if (selection === "Scripts Explained") {
      return vscode__WEBPACK_IMPORTED_MODULE_0___default.a.env.openExternal(
        "https://marketplace.visualstudio.com/items?itemName=yasht.terminal-all-in-one#scripts"
      );
    }
  },
  disableScriptDescription: async (disable) => {
    const CONFIG_PROPERTY = "shouldShowDisableScriptDescriptionMessage";
    const DISABLE = "Disable";
    if (getMessagesConfig(CONFIG_PROPERTY)) {
      const selection = await vscode__WEBPACK_IMPORTED_MODULE_0___default.a.window.showInformationMessage(
        "You can disable the script description",
        DONT_SHOW,
        DISABLE
      );
      if (selection === DONT_SHOW) {
        await updateMessagesConfig(CONFIG_PROPERTY, false);
      }
      if (selection === DISABLE) {
        return disable();
      }
    }
  },
  error: (message) => {
    vscode__WEBPACK_IMPORTED_MODULE_0___default.a.window.showErrorMessage(message);
  },
};

const showMessage = function (id, params) {
  const shouldShow = !Object(_helpers_config__WEBPACK_IMPORTED_MODULE_1__["getConfig"])({
    section: `${EXTENSION_NAME}.disableAllMessages`,
  });
  if (shouldShow) {
    return messages[id](params);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (showMessage);


/***/ }),

/***/ "./src/themes.json":
/*!*************************!*\
  !*** ./src/themes.json ***!
  \*************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"name\":\"3024\",\"colors\":{\"terminal.background\":\"#090300\",\"terminal.foreground\":\"#A5A2A2\",\"terminalCursor.background\":\"#A5A2A2\",\"terminalCursor.foreground\":\"#A5A2A2\",\"terminal.ansiBlack\":\"#090300\",\"terminal.ansiBlue\":\"#01A0E4\",\"terminal.ansiBrightBlack\":\"#5C5855\",\"terminal.ansiBrightBlue\":\"#01A0E4\",\"terminal.ansiBrightCyan\":\"#B5E4F4\",\"terminal.ansiBrightGreen\":\"#01A252\",\"terminal.ansiBrightMagenta\":\"#A16A94\",\"terminal.ansiBrightRed\":\"#DB2D20\",\"terminal.ansiBrightWhite\":\"#F7F7F7\",\"terminal.ansiBrightYellow\":\"#FDED02\",\"terminal.ansiCyan\":\"#B5E4F4\",\"terminal.ansiGreen\":\"#01A252\",\"terminal.ansiMagenta\":\"#A16A94\",\"terminal.ansiRed\":\"#DB2D20\",\"terminal.ansiWhite\":\"#A5A2A2\",\"terminal.ansiYellow\":\"#FDED02\"}},{\"name\":\"Apathy\",\"colors\":{\"terminal.background\":\"#031A16\",\"terminal.foreground\":\"#81B5AC\",\"terminalCursor.background\":\"#81B5AC\",\"terminalCursor.foreground\":\"#81B5AC\",\"terminal.ansiBlack\":\"#031A16\",\"terminal.ansiBlue\":\"#96883E\",\"terminal.ansiBrightBlack\":\"#2B685E\",\"terminal.ansiBrightBlue\":\"#96883E\",\"terminal.ansiBrightCyan\":\"#963E4C\",\"terminal.ansiBrightGreen\":\"#883E96\",\"terminal.ansiBrightMagenta\":\"#4C963E\",\"terminal.ansiBrightRed\":\"#3E9688\",\"terminal.ansiBrightWhite\":\"#D2E7E4\",\"terminal.ansiBrightYellow\":\"#3E4C96\",\"terminal.ansiCyan\":\"#963E4C\",\"terminal.ansiGreen\":\"#883E96\",\"terminal.ansiMagenta\":\"#4C963E\",\"terminal.ansiRed\":\"#3E9688\",\"terminal.ansiWhite\":\"#81B5AC\",\"terminal.ansiYellow\":\"#3E4C96\"}},{\"name\":\"Ashes\",\"colors\":{\"terminal.background\":\"#1C2023\",\"terminal.foreground\":\"#C7CCD1\",\"terminalCursor.background\":\"#C7CCD1\",\"terminalCursor.foreground\":\"#C7CCD1\",\"terminal.ansiBlack\":\"#1C2023\",\"terminal.ansiBlue\":\"#AE95C7\",\"terminal.ansiBrightBlack\":\"#747C84\",\"terminal.ansiBrightBlue\":\"#AE95C7\",\"terminal.ansiBrightCyan\":\"#95AEC7\",\"terminal.ansiBrightGreen\":\"#95C7AE\",\"terminal.ansiBrightMagenta\":\"#C795AE\",\"terminal.ansiBrightRed\":\"#C7AE95\",\"terminal.ansiBrightWhite\":\"#F3F4F5\",\"terminal.ansiBrightYellow\":\"#AEC795\",\"terminal.ansiCyan\":\"#95AEC7\",\"terminal.ansiGreen\":\"#95C7AE\",\"terminal.ansiMagenta\":\"#C795AE\",\"terminal.ansiRed\":\"#C7AE95\",\"terminal.ansiWhite\":\"#C7CCD1\",\"terminal.ansiYellow\":\"#AEC795\"}},{\"name\":\"Atelier Cave Light\",\"colors\":{\"terminal.background\":\"#EFECF4\",\"terminal.foreground\":\"#585260\",\"terminalCursor.background\":\"#585260\",\"terminalCursor.foreground\":\"#585260\",\"terminal.ansiBlack\":\"#EFECF4\",\"terminal.ansiBlue\":\"#576DDB\",\"terminal.ansiBrightBlack\":\"#7E7887\",\"terminal.ansiBrightBlue\":\"#576DDB\",\"terminal.ansiBrightCyan\":\"#398BC6\",\"terminal.ansiBrightGreen\":\"#2A9292\",\"terminal.ansiBrightMagenta\":\"#955AE7\",\"terminal.ansiBrightRed\":\"#BE4678\",\"terminal.ansiBrightWhite\":\"#19171C\",\"terminal.ansiBrightYellow\":\"#A06E3B\",\"terminal.ansiCyan\":\"#398BC6\",\"terminal.ansiGreen\":\"#2A9292\",\"terminal.ansiMagenta\":\"#955AE7\",\"terminal.ansiRed\":\"#BE4678\",\"terminal.ansiWhite\":\"#585260\",\"terminal.ansiYellow\":\"#A06E3B\"}},{\"name\":\"Atelier Cave\",\"colors\":{\"terminal.background\":\"#19171C\",\"terminal.foreground\":\"#8B8792\",\"terminalCursor.background\":\"#8B8792\",\"terminalCursor.foreground\":\"#8B8792\",\"terminal.ansiBlack\":\"#19171C\",\"terminal.ansiBlue\":\"#576DDB\",\"terminal.ansiBrightBlack\":\"#655F6D\",\"terminal.ansiBrightBlue\":\"#576DDB\",\"terminal.ansiBrightCyan\":\"#398BC6\",\"terminal.ansiBrightGreen\":\"#2A9292\",\"terminal.ansiBrightMagenta\":\"#955AE7\",\"terminal.ansiBrightRed\":\"#BE4678\",\"terminal.ansiBrightWhite\":\"#EFECF4\",\"terminal.ansiBrightYellow\":\"#A06E3B\",\"terminal.ansiCyan\":\"#398BC6\",\"terminal.ansiGreen\":\"#2A9292\",\"terminal.ansiMagenta\":\"#955AE7\",\"terminal.ansiRed\":\"#BE4678\",\"terminal.ansiWhite\":\"#8B8792\",\"terminal.ansiYellow\":\"#A06E3B\"}},{\"name\":\"Atelier Dune Light\",\"colors\":{\"terminal.background\":\"#FEFBEC\",\"terminal.foreground\":\"#6E6B5E\",\"terminalCursor.background\":\"#6E6B5E\",\"terminalCursor.foreground\":\"#6E6B5E\",\"terminal.ansiBlack\":\"#FEFBEC\",\"terminal.ansiBlue\":\"#6684E1\",\"terminal.ansiBrightBlack\":\"#999580\",\"terminal.ansiBrightBlue\":\"#6684E1\",\"terminal.ansiBrightCyan\":\"#1FAD83\",\"terminal.ansiBrightGreen\":\"#60AC39\",\"terminal.ansiBrightMagenta\":\"#B854D4\",\"terminal.ansiBrightRed\":\"#D73737\",\"terminal.ansiBrightWhite\":\"#20201D\",\"terminal.ansiBrightYellow\":\"#AE9513\",\"terminal.ansiCyan\":\"#1FAD83\",\"terminal.ansiGreen\":\"#60AC39\",\"terminal.ansiMagenta\":\"#B854D4\",\"terminal.ansiRed\":\"#D73737\",\"terminal.ansiWhite\":\"#6E6B5E\",\"terminal.ansiYellow\":\"#AE9513\"}},{\"name\":\"Atelier Dune\",\"colors\":{\"terminal.background\":\"#20201D\",\"terminal.foreground\":\"#A6A28C\",\"terminalCursor.background\":\"#A6A28C\",\"terminalCursor.foreground\":\"#A6A28C\",\"terminal.ansiBlack\":\"#20201D\",\"terminal.ansiBlue\":\"#6684E1\",\"terminal.ansiBrightBlack\":\"#7D7A68\",\"terminal.ansiBrightBlue\":\"#6684E1\",\"terminal.ansiBrightCyan\":\"#1FAD83\",\"terminal.ansiBrightGreen\":\"#60AC39\",\"terminal.ansiBrightMagenta\":\"#B854D4\",\"terminal.ansiBrightRed\":\"#D73737\",\"terminal.ansiBrightWhite\":\"#FEFBEC\",\"terminal.ansiBrightYellow\":\"#AE9513\",\"terminal.ansiCyan\":\"#1FAD83\",\"terminal.ansiGreen\":\"#60AC39\",\"terminal.ansiMagenta\":\"#B854D4\",\"terminal.ansiRed\":\"#D73737\",\"terminal.ansiWhite\":\"#A6A28C\",\"terminal.ansiYellow\":\"#AE9513\"}},{\"name\":\"Atelier Estuary Light\",\"colors\":{\"terminal.background\":\"#F4F3EC\",\"terminal.foreground\":\"#5F5E4E\",\"terminalCursor.background\":\"#5F5E4E\",\"terminalCursor.foreground\":\"#5F5E4E\",\"terminal.ansiBlack\":\"#F4F3EC\",\"terminal.ansiBlue\":\"#36A166\",\"terminal.ansiBrightBlack\":\"#878573\",\"terminal.ansiBrightBlue\":\"#36A166\",\"terminal.ansiBrightCyan\":\"#5B9D48\",\"terminal.ansiBrightGreen\":\"#7D9726\",\"terminal.ansiBrightMagenta\":\"#5F9182\",\"terminal.ansiBrightRed\":\"#BA6236\",\"terminal.ansiBrightWhite\":\"#22221B\",\"terminal.ansiBrightYellow\":\"#A5980D\",\"terminal.ansiCyan\":\"#5B9D48\",\"terminal.ansiGreen\":\"#7D9726\",\"terminal.ansiMagenta\":\"#5F9182\",\"terminal.ansiRed\":\"#BA6236\",\"terminal.ansiWhite\":\"#5F5E4E\",\"terminal.ansiYellow\":\"#A5980D\"}},{\"name\":\"Atelier Estuary\",\"colors\":{\"terminal.background\":\"#22221B\",\"terminal.foreground\":\"#929181\",\"terminalCursor.background\":\"#929181\",\"terminalCursor.foreground\":\"#929181\",\"terminal.ansiBlack\":\"#22221B\",\"terminal.ansiBlue\":\"#36A166\",\"terminal.ansiBrightBlack\":\"#6C6B5A\",\"terminal.ansiBrightBlue\":\"#36A166\",\"terminal.ansiBrightCyan\":\"#5B9D48\",\"terminal.ansiBrightGreen\":\"#7D9726\",\"terminal.ansiBrightMagenta\":\"#5F9182\",\"terminal.ansiBrightRed\":\"#BA6236\",\"terminal.ansiBrightWhite\":\"#F4F3EC\",\"terminal.ansiBrightYellow\":\"#A5980D\",\"terminal.ansiCyan\":\"#5B9D48\",\"terminal.ansiGreen\":\"#7D9726\",\"terminal.ansiMagenta\":\"#5F9182\",\"terminal.ansiRed\":\"#BA6236\",\"terminal.ansiWhite\":\"#929181\",\"terminal.ansiYellow\":\"#A5980D\"}},{\"name\":\"Atelier Forest Light\",\"colors\":{\"terminal.background\":\"#F1EFEE\",\"terminal.foreground\":\"#68615E\",\"terminalCursor.background\":\"#68615E\",\"terminalCursor.foreground\":\"#68615E\",\"terminal.ansiBlack\":\"#F1EFEE\",\"terminal.ansiBlue\":\"#407EE7\",\"terminal.ansiBrightBlack\":\"#9C9491\",\"terminal.ansiBrightBlue\":\"#407EE7\",\"terminal.ansiBrightCyan\":\"#3D97B8\",\"terminal.ansiBrightGreen\":\"#7B9726\",\"terminal.ansiBrightMagenta\":\"#6666EA\",\"terminal.ansiBrightRed\":\"#F22C40\",\"terminal.ansiBrightWhite\":\"#1B1918\",\"terminal.ansiBrightYellow\":\"#C38418\",\"terminal.ansiCyan\":\"#3D97B8\",\"terminal.ansiGreen\":\"#7B9726\",\"terminal.ansiMagenta\":\"#6666EA\",\"terminal.ansiRed\":\"#F22C40\",\"terminal.ansiWhite\":\"#68615E\",\"terminal.ansiYellow\":\"#C38418\"}},{\"name\":\"Atelier Forest\",\"colors\":{\"terminal.background\":\"#1B1918\",\"terminal.foreground\":\"#A8A19F\",\"terminalCursor.background\":\"#A8A19F\",\"terminalCursor.foreground\":\"#A8A19F\",\"terminal.ansiBlack\":\"#1B1918\",\"terminal.ansiBlue\":\"#407EE7\",\"terminal.ansiBrightBlack\":\"#766E6B\",\"terminal.ansiBrightBlue\":\"#407EE7\",\"terminal.ansiBrightCyan\":\"#3D97B8\",\"terminal.ansiBrightGreen\":\"#7B9726\",\"terminal.ansiBrightMagenta\":\"#6666EA\",\"terminal.ansiBrightRed\":\"#F22C40\",\"terminal.ansiBrightWhite\":\"#F1EFEE\",\"terminal.ansiBrightYellow\":\"#C38418\",\"terminal.ansiCyan\":\"#3D97B8\",\"terminal.ansiGreen\":\"#7B9726\",\"terminal.ansiMagenta\":\"#6666EA\",\"terminal.ansiRed\":\"#F22C40\",\"terminal.ansiWhite\":\"#A8A19F\",\"terminal.ansiYellow\":\"#C38418\"}},{\"name\":\"Atelier Heath Light\",\"colors\":{\"terminal.background\":\"#F7F3F7\",\"terminal.foreground\":\"#695D69\",\"terminalCursor.background\":\"#695D69\",\"terminalCursor.foreground\":\"#695D69\",\"terminal.ansiBlack\":\"#F7F3F7\",\"terminal.ansiBlue\":\"#516AEC\",\"terminal.ansiBrightBlack\":\"#9E8F9E\",\"terminal.ansiBrightBlue\":\"#516AEC\",\"terminal.ansiBrightCyan\":\"#159393\",\"terminal.ansiBrightGreen\":\"#918B3B\",\"terminal.ansiBrightMagenta\":\"#7B59C0\",\"terminal.ansiBrightRed\":\"#CA402B\",\"terminal.ansiBrightWhite\":\"#1B181B\",\"terminal.ansiBrightYellow\":\"#BB8A35\",\"terminal.ansiCyan\":\"#159393\",\"terminal.ansiGreen\":\"#918B3B\",\"terminal.ansiMagenta\":\"#7B59C0\",\"terminal.ansiRed\":\"#CA402B\",\"terminal.ansiWhite\":\"#695D69\",\"terminal.ansiYellow\":\"#BB8A35\"}},{\"name\":\"Atelier Heath\",\"colors\":{\"terminal.background\":\"#1B181B\",\"terminal.foreground\":\"#AB9BAB\",\"terminalCursor.background\":\"#AB9BAB\",\"terminalCursor.foreground\":\"#AB9BAB\",\"terminal.ansiBlack\":\"#1B181B\",\"terminal.ansiBlue\":\"#516AEC\",\"terminal.ansiBrightBlack\":\"#776977\",\"terminal.ansiBrightBlue\":\"#516AEC\",\"terminal.ansiBrightCyan\":\"#159393\",\"terminal.ansiBrightGreen\":\"#918B3B\",\"terminal.ansiBrightMagenta\":\"#7B59C0\",\"terminal.ansiBrightRed\":\"#CA402B\",\"terminal.ansiBrightWhite\":\"#F7F3F7\",\"terminal.ansiBrightYellow\":\"#BB8A35\",\"terminal.ansiCyan\":\"#159393\",\"terminal.ansiGreen\":\"#918B3B\",\"terminal.ansiMagenta\":\"#7B59C0\",\"terminal.ansiRed\":\"#CA402B\",\"terminal.ansiWhite\":\"#AB9BAB\",\"terminal.ansiYellow\":\"#BB8A35\"}},{\"name\":\"Atelier Lakeside Light\",\"colors\":{\"terminal.background\":\"#EBF8FF\",\"terminal.foreground\":\"#516D7B\",\"terminalCursor.background\":\"#516D7B\",\"terminalCursor.foreground\":\"#516D7B\",\"terminal.ansiBlack\":\"#EBF8FF\",\"terminal.ansiBlue\":\"#257FAD\",\"terminal.ansiBrightBlack\":\"#7195A8\",\"terminal.ansiBrightBlue\":\"#257FAD\",\"terminal.ansiBrightCyan\":\"#2D8F6F\",\"terminal.ansiBrightGreen\":\"#568C3B\",\"terminal.ansiBrightMagenta\":\"#6B6BB8\",\"terminal.ansiBrightRed\":\"#D22D72\",\"terminal.ansiBrightWhite\":\"#161B1D\",\"terminal.ansiBrightYellow\":\"#8A8A0F\",\"terminal.ansiCyan\":\"#2D8F6F\",\"terminal.ansiGreen\":\"#568C3B\",\"terminal.ansiMagenta\":\"#6B6BB8\",\"terminal.ansiRed\":\"#D22D72\",\"terminal.ansiWhite\":\"#516D7B\",\"terminal.ansiYellow\":\"#8A8A0F\"}},{\"name\":\"Atelier Lakeside\",\"colors\":{\"terminal.background\":\"#161B1D\",\"terminal.foreground\":\"#7EA2B4\",\"terminalCursor.background\":\"#7EA2B4\",\"terminalCursor.foreground\":\"#7EA2B4\",\"terminal.ansiBlack\":\"#161B1D\",\"terminal.ansiBlue\":\"#257FAD\",\"terminal.ansiBrightBlack\":\"#5A7B8C\",\"terminal.ansiBrightBlue\":\"#257FAD\",\"terminal.ansiBrightCyan\":\"#2D8F6F\",\"terminal.ansiBrightGreen\":\"#568C3B\",\"terminal.ansiBrightMagenta\":\"#6B6BB8\",\"terminal.ansiBrightRed\":\"#D22D72\",\"terminal.ansiBrightWhite\":\"#EBF8FF\",\"terminal.ansiBrightYellow\":\"#8A8A0F\",\"terminal.ansiCyan\":\"#2D8F6F\",\"terminal.ansiGreen\":\"#568C3B\",\"terminal.ansiMagenta\":\"#6B6BB8\",\"terminal.ansiRed\":\"#D22D72\",\"terminal.ansiWhite\":\"#7EA2B4\",\"terminal.ansiYellow\":\"#8A8A0F\"}},{\"name\":\"Atelier Plateau Light\",\"colors\":{\"terminal.background\":\"#F4ECEC\",\"terminal.foreground\":\"#585050\",\"terminalCursor.background\":\"#585050\",\"terminalCursor.foreground\":\"#585050\",\"terminal.ansiBlack\":\"#F4ECEC\",\"terminal.ansiBlue\":\"#7272CA\",\"terminal.ansiBrightBlack\":\"#7E7777\",\"terminal.ansiBrightBlue\":\"#7272CA\",\"terminal.ansiBrightCyan\":\"#5485B6\",\"terminal.ansiBrightGreen\":\"#4B8B8B\",\"terminal.ansiBrightMagenta\":\"#8464C4\",\"terminal.ansiBrightRed\":\"#CA4949\",\"terminal.ansiBrightWhite\":\"#1B1818\",\"terminal.ansiBrightYellow\":\"#A06E3B\",\"terminal.ansiCyan\":\"#5485B6\",\"terminal.ansiGreen\":\"#4B8B8B\",\"terminal.ansiMagenta\":\"#8464C4\",\"terminal.ansiRed\":\"#CA4949\",\"terminal.ansiWhite\":\"#585050\",\"terminal.ansiYellow\":\"#A06E3B\"}},{\"name\":\"Atelier Plateau\",\"colors\":{\"terminal.background\":\"#1B1818\",\"terminal.foreground\":\"#8A8585\",\"terminalCursor.background\":\"#8A8585\",\"terminalCursor.foreground\":\"#8A8585\",\"terminal.ansiBlack\":\"#1B1818\",\"terminal.ansiBlue\":\"#7272CA\",\"terminal.ansiBrightBlack\":\"#655D5D\",\"terminal.ansiBrightBlue\":\"#7272CA\",\"terminal.ansiBrightCyan\":\"#5485B6\",\"terminal.ansiBrightGreen\":\"#4B8B8B\",\"terminal.ansiBrightMagenta\":\"#8464C4\",\"terminal.ansiBrightRed\":\"#CA4949\",\"terminal.ansiBrightWhite\":\"#F4ECEC\",\"terminal.ansiBrightYellow\":\"#A06E3B\",\"terminal.ansiCyan\":\"#5485B6\",\"terminal.ansiGreen\":\"#4B8B8B\",\"terminal.ansiMagenta\":\"#8464C4\",\"terminal.ansiRed\":\"#CA4949\",\"terminal.ansiWhite\":\"#8A8585\",\"terminal.ansiYellow\":\"#A06E3B\"}},{\"name\":\"Atelier Savanna Light\",\"colors\":{\"terminal.background\":\"#ECF4EE\",\"terminal.foreground\":\"#526057\",\"terminalCursor.background\":\"#526057\",\"terminalCursor.foreground\":\"#526057\",\"terminal.ansiBlack\":\"#ECF4EE\",\"terminal.ansiBlue\":\"#478C90\",\"terminal.ansiBrightBlack\":\"#78877D\",\"terminal.ansiBrightBlue\":\"#478C90\",\"terminal.ansiBrightCyan\":\"#1C9AA0\",\"terminal.ansiBrightGreen\":\"#489963\",\"terminal.ansiBrightMagenta\":\"#55859B\",\"terminal.ansiBrightRed\":\"#B16139\",\"terminal.ansiBrightWhite\":\"#171C19\",\"terminal.ansiBrightYellow\":\"#A07E3B\",\"terminal.ansiCyan\":\"#1C9AA0\",\"terminal.ansiGreen\":\"#489963\",\"terminal.ansiMagenta\":\"#55859B\",\"terminal.ansiRed\":\"#B16139\",\"terminal.ansiWhite\":\"#526057\",\"terminal.ansiYellow\":\"#A07E3B\"}},{\"name\":\"Atelier Savanna\",\"colors\":{\"terminal.background\":\"#171C19\",\"terminal.foreground\":\"#87928A\",\"terminalCursor.background\":\"#87928A\",\"terminalCursor.foreground\":\"#87928A\",\"terminal.ansiBlack\":\"#171C19\",\"terminal.ansiBlue\":\"#478C90\",\"terminal.ansiBrightBlack\":\"#5F6D64\",\"terminal.ansiBrightBlue\":\"#478C90\",\"terminal.ansiBrightCyan\":\"#1C9AA0\",\"terminal.ansiBrightGreen\":\"#489963\",\"terminal.ansiBrightMagenta\":\"#55859B\",\"terminal.ansiBrightRed\":\"#B16139\",\"terminal.ansiBrightWhite\":\"#ECF4EE\",\"terminal.ansiBrightYellow\":\"#A07E3B\",\"terminal.ansiCyan\":\"#1C9AA0\",\"terminal.ansiGreen\":\"#489963\",\"terminal.ansiMagenta\":\"#55859B\",\"terminal.ansiRed\":\"#B16139\",\"terminal.ansiWhite\":\"#87928A\",\"terminal.ansiYellow\":\"#A07E3B\"}},{\"name\":\"Atelier Seaside Light\",\"colors\":{\"terminal.background\":\"#F4FBF4\",\"terminal.foreground\":\"#5E6E5E\",\"terminalCursor.background\":\"#5E6E5E\",\"terminalCursor.foreground\":\"#5E6E5E\",\"terminal.ansiBlack\":\"#F4FBF4\",\"terminal.ansiBlue\":\"#3D62F5\",\"terminal.ansiBrightBlack\":\"#809980\",\"terminal.ansiBrightBlue\":\"#3D62F5\",\"terminal.ansiBrightCyan\":\"#1999B3\",\"terminal.ansiBrightGreen\":\"#29A329\",\"terminal.ansiBrightMagenta\":\"#AD2BEE\",\"terminal.ansiBrightRed\":\"#E6193C\",\"terminal.ansiBrightWhite\":\"#131513\",\"terminal.ansiBrightYellow\":\"#98981B\",\"terminal.ansiCyan\":\"#1999B3\",\"terminal.ansiGreen\":\"#29A329\",\"terminal.ansiMagenta\":\"#AD2BEE\",\"terminal.ansiRed\":\"#E6193C\",\"terminal.ansiWhite\":\"#5E6E5E\",\"terminal.ansiYellow\":\"#98981B\"}},{\"name\":\"Atelier Seaside\",\"colors\":{\"terminal.background\":\"#131513\",\"terminal.foreground\":\"#8CA68C\",\"terminalCursor.background\":\"#8CA68C\",\"terminalCursor.foreground\":\"#8CA68C\",\"terminal.ansiBlack\":\"#131513\",\"terminal.ansiBlue\":\"#3D62F5\",\"terminal.ansiBrightBlack\":\"#687D68\",\"terminal.ansiBrightBlue\":\"#3D62F5\",\"terminal.ansiBrightCyan\":\"#1999B3\",\"terminal.ansiBrightGreen\":\"#29A329\",\"terminal.ansiBrightMagenta\":\"#AD2BEE\",\"terminal.ansiBrightRed\":\"#E6193C\",\"terminal.ansiBrightWhite\":\"#F4FBF4\",\"terminal.ansiBrightYellow\":\"#98981B\",\"terminal.ansiCyan\":\"#1999B3\",\"terminal.ansiGreen\":\"#29A329\",\"terminal.ansiMagenta\":\"#AD2BEE\",\"terminal.ansiRed\":\"#E6193C\",\"terminal.ansiWhite\":\"#8CA68C\",\"terminal.ansiYellow\":\"#98981B\"}},{\"name\":\"Atelier Sulphurpool Light\",\"colors\":{\"terminal.background\":\"#F5F7FF\",\"terminal.foreground\":\"#5E6687\",\"terminalCursor.background\":\"#5E6687\",\"terminalCursor.foreground\":\"#5E6687\",\"terminal.ansiBlack\":\"#F5F7FF\",\"terminal.ansiBlue\":\"#3D8FD1\",\"terminal.ansiBrightBlack\":\"#898EA4\",\"terminal.ansiBrightBlue\":\"#3D8FD1\",\"terminal.ansiBrightCyan\":\"#22A2C9\",\"terminal.ansiBrightGreen\":\"#AC9739\",\"terminal.ansiBrightMagenta\":\"#6679CC\",\"terminal.ansiBrightRed\":\"#C94922\",\"terminal.ansiBrightWhite\":\"#202746\",\"terminal.ansiBrightYellow\":\"#C08B30\",\"terminal.ansiCyan\":\"#22A2C9\",\"terminal.ansiGreen\":\"#AC9739\",\"terminal.ansiMagenta\":\"#6679CC\",\"terminal.ansiRed\":\"#C94922\",\"terminal.ansiWhite\":\"#5E6687\",\"terminal.ansiYellow\":\"#C08B30\"}},{\"name\":\"Atelier Sulphurpool\",\"colors\":{\"terminal.background\":\"#202746\",\"terminal.foreground\":\"#979DB4\",\"terminalCursor.background\":\"#979DB4\",\"terminalCursor.foreground\":\"#979DB4\",\"terminal.ansiBlack\":\"#202746\",\"terminal.ansiBlue\":\"#3D8FD1\",\"terminal.ansiBrightBlack\":\"#6B7394\",\"terminal.ansiBrightBlue\":\"#3D8FD1\",\"terminal.ansiBrightCyan\":\"#22A2C9\",\"terminal.ansiBrightGreen\":\"#AC9739\",\"terminal.ansiBrightMagenta\":\"#6679CC\",\"terminal.ansiBrightRed\":\"#C94922\",\"terminal.ansiBrightWhite\":\"#F5F7FF\",\"terminal.ansiBrightYellow\":\"#C08B30\",\"terminal.ansiCyan\":\"#22A2C9\",\"terminal.ansiGreen\":\"#AC9739\",\"terminal.ansiMagenta\":\"#6679CC\",\"terminal.ansiRed\":\"#C94922\",\"terminal.ansiWhite\":\"#979DB4\",\"terminal.ansiYellow\":\"#C08B30\"}},{\"name\":\"Bespin\",\"colors\":{\"terminal.background\":\"#28211C\",\"terminal.foreground\":\"#8A8986\",\"terminalCursor.background\":\"#8A8986\",\"terminalCursor.foreground\":\"#8A8986\",\"terminal.ansiBlack\":\"#28211C\",\"terminal.ansiBlue\":\"#5EA6EA\",\"terminal.ansiBrightBlack\":\"#666666\",\"terminal.ansiBrightBlue\":\"#5EA6EA\",\"terminal.ansiBrightCyan\":\"#AFC4DB\",\"terminal.ansiBrightGreen\":\"#54BE0D\",\"terminal.ansiBrightMagenta\":\"#9B859D\",\"terminal.ansiBrightRed\":\"#CF6A4C\",\"terminal.ansiBrightWhite\":\"#BAAE9E\",\"terminal.ansiBrightYellow\":\"#F9EE98\",\"terminal.ansiCyan\":\"#AFC4DB\",\"terminal.ansiGreen\":\"#54BE0D\",\"terminal.ansiMagenta\":\"#9B859D\",\"terminal.ansiRed\":\"#CF6A4C\",\"terminal.ansiWhite\":\"#8A8986\",\"terminal.ansiYellow\":\"#F9EE98\"}},{\"name\":\"Brewer\",\"colors\":{\"terminal.background\":\"#0C0D0E\",\"terminal.foreground\":\"#B7B8B9\",\"terminalCursor.background\":\"#B7B8B9\",\"terminalCursor.foreground\":\"#B7B8B9\",\"terminal.ansiBlack\":\"#0C0D0E\",\"terminal.ansiBlue\":\"#3182BD\",\"terminal.ansiBrightBlack\":\"#737475\",\"terminal.ansiBrightBlue\":\"#3182BD\",\"terminal.ansiBrightCyan\":\"#80B1D3\",\"terminal.ansiBrightGreen\":\"#31A354\",\"terminal.ansiBrightMagenta\":\"#756BB1\",\"terminal.ansiBrightRed\":\"#E31A1C\",\"terminal.ansiBrightWhite\":\"#FCFDFE\",\"terminal.ansiBrightYellow\":\"#DCA060\",\"terminal.ansiCyan\":\"#80B1D3\",\"terminal.ansiGreen\":\"#31A354\",\"terminal.ansiMagenta\":\"#756BB1\",\"terminal.ansiRed\":\"#E31A1C\",\"terminal.ansiWhite\":\"#B7B8B9\",\"terminal.ansiYellow\":\"#DCA060\"}},{\"name\":\"Bright\",\"colors\":{\"terminal.background\":\"#000000\",\"terminal.foreground\":\"#E0E0E0\",\"terminalCursor.background\":\"#E0E0E0\",\"terminalCursor.foreground\":\"#E0E0E0\",\"terminal.ansiBlack\":\"#000000\",\"terminal.ansiBlue\":\"#6FB3D2\",\"terminal.ansiBrightBlack\":\"#B0B0B0\",\"terminal.ansiBrightBlue\":\"#6FB3D2\",\"terminal.ansiBrightCyan\":\"#76C7B7\",\"terminal.ansiBrightGreen\":\"#A1C659\",\"terminal.ansiBrightMagenta\":\"#D381C3\",\"terminal.ansiBrightRed\":\"#FB0120\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#FDA331\",\"terminal.ansiCyan\":\"#76C7B7\",\"terminal.ansiGreen\":\"#A1C659\",\"terminal.ansiMagenta\":\"#D381C3\",\"terminal.ansiRed\":\"#FB0120\",\"terminal.ansiWhite\":\"#E0E0E0\",\"terminal.ansiYellow\":\"#FDA331\"}},{\"name\":\"Brushtrees Dark\",\"colors\":{\"terminal.background\":\"#485867\",\"terminal.foreground\":\"#B0C5C8\",\"terminalCursor.background\":\"#B0C5C8\",\"terminalCursor.foreground\":\"#B0C5C8\",\"terminal.ansiBlack\":\"#485867\",\"terminal.ansiBlue\":\"#868CB3\",\"terminal.ansiBrightBlack\":\"#8299A1\",\"terminal.ansiBrightBlue\":\"#868CB3\",\"terminal.ansiBrightCyan\":\"#86B3B3\",\"terminal.ansiBrightGreen\":\"#87B386\",\"terminal.ansiBrightMagenta\":\"#B386B2\",\"terminal.ansiBrightRed\":\"#B38686\",\"terminal.ansiBrightWhite\":\"#E3EFEF\",\"terminal.ansiBrightYellow\":\"#AAB386\",\"terminal.ansiCyan\":\"#86B3B3\",\"terminal.ansiGreen\":\"#87B386\",\"terminal.ansiMagenta\":\"#B386B2\",\"terminal.ansiRed\":\"#B38686\",\"terminal.ansiWhite\":\"#B0C5C8\",\"terminal.ansiYellow\":\"#AAB386\"}},{\"name\":\"Brushtrees\",\"colors\":{\"terminal.background\":\"#E3EFEF\",\"terminal.foreground\":\"#6D828E\",\"terminalCursor.background\":\"#6D828E\",\"terminalCursor.foreground\":\"#6D828E\",\"terminal.ansiBlack\":\"#E3EFEF\",\"terminal.ansiBlue\":\"#868CB3\",\"terminal.ansiBrightBlack\":\"#98AFB5\",\"terminal.ansiBrightBlue\":\"#868CB3\",\"terminal.ansiBrightCyan\":\"#86B3B3\",\"terminal.ansiBrightGreen\":\"#87B386\",\"terminal.ansiBrightMagenta\":\"#B386B2\",\"terminal.ansiBrightRed\":\"#B38686\",\"terminal.ansiBrightWhite\":\"#485867\",\"terminal.ansiBrightYellow\":\"#AAB386\",\"terminal.ansiCyan\":\"#86B3B3\",\"terminal.ansiGreen\":\"#87B386\",\"terminal.ansiMagenta\":\"#B386B2\",\"terminal.ansiRed\":\"#B38686\",\"terminal.ansiWhite\":\"#6D828E\",\"terminal.ansiYellow\":\"#AAB386\"}},{\"name\":\"Chalk\",\"colors\":{\"terminal.background\":\"#151515\",\"terminal.foreground\":\"#D0D0D0\",\"terminalCursor.background\":\"#D0D0D0\",\"terminalCursor.foreground\":\"#D0D0D0\",\"terminal.ansiBlack\":\"#151515\",\"terminal.ansiBlue\":\"#6FC2EF\",\"terminal.ansiBrightBlack\":\"#505050\",\"terminal.ansiBrightBlue\":\"#6FC2EF\",\"terminal.ansiBrightCyan\":\"#12CFC0\",\"terminal.ansiBrightGreen\":\"#ACC267\",\"terminal.ansiBrightMagenta\":\"#E1A3EE\",\"terminal.ansiBrightRed\":\"#FB9FB1\",\"terminal.ansiBrightWhite\":\"#F5F5F5\",\"terminal.ansiBrightYellow\":\"#DDB26F\",\"terminal.ansiCyan\":\"#12CFC0\",\"terminal.ansiGreen\":\"#ACC267\",\"terminal.ansiMagenta\":\"#E1A3EE\",\"terminal.ansiRed\":\"#FB9FB1\",\"terminal.ansiWhite\":\"#D0D0D0\",\"terminal.ansiYellow\":\"#DDB26F\"}},{\"name\":\"Circus\",\"colors\":{\"terminal.background\":\"#191919\",\"terminal.foreground\":\"#A7A7A7\",\"terminalCursor.background\":\"#A7A7A7\",\"terminalCursor.foreground\":\"#A7A7A7\",\"terminal.ansiBlack\":\"#191919\",\"terminal.ansiBlue\":\"#639EE4\",\"terminal.ansiBrightBlack\":\"#5F5A60\",\"terminal.ansiBrightBlue\":\"#639EE4\",\"terminal.ansiBrightCyan\":\"#4BB1A7\",\"terminal.ansiBrightGreen\":\"#84B97C\",\"terminal.ansiBrightMagenta\":\"#B888E2\",\"terminal.ansiBrightRed\":\"#DC657D\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#C3BA63\",\"terminal.ansiCyan\":\"#4BB1A7\",\"terminal.ansiGreen\":\"#84B97C\",\"terminal.ansiMagenta\":\"#B888E2\",\"terminal.ansiRed\":\"#DC657D\",\"terminal.ansiWhite\":\"#A7A7A7\",\"terminal.ansiYellow\":\"#C3BA63\"}},{\"name\":\"Classic Dark\",\"colors\":{\"terminal.background\":\"#151515\",\"terminal.foreground\":\"#D0D0D0\",\"terminalCursor.background\":\"#D0D0D0\",\"terminalCursor.foreground\":\"#D0D0D0\",\"terminal.ansiBlack\":\"#151515\",\"terminal.ansiBlue\":\"#6A9FB5\",\"terminal.ansiBrightBlack\":\"#505050\",\"terminal.ansiBrightBlue\":\"#6A9FB5\",\"terminal.ansiBrightCyan\":\"#75B5AA\",\"terminal.ansiBrightGreen\":\"#90A959\",\"terminal.ansiBrightMagenta\":\"#AA759F\",\"terminal.ansiBrightRed\":\"#AC4142\",\"terminal.ansiBrightWhite\":\"#F5F5F5\",\"terminal.ansiBrightYellow\":\"#F4BF75\",\"terminal.ansiCyan\":\"#75B5AA\",\"terminal.ansiGreen\":\"#90A959\",\"terminal.ansiMagenta\":\"#AA759F\",\"terminal.ansiRed\":\"#AC4142\",\"terminal.ansiWhite\":\"#D0D0D0\",\"terminal.ansiYellow\":\"#F4BF75\"}},{\"name\":\"Classic Light\",\"colors\":{\"terminal.background\":\"#F5F5F5\",\"terminal.foreground\":\"#303030\",\"terminalCursor.background\":\"#303030\",\"terminalCursor.foreground\":\"#303030\",\"terminal.ansiBlack\":\"#F5F5F5\",\"terminal.ansiBlue\":\"#6A9FB5\",\"terminal.ansiBrightBlack\":\"#B0B0B0\",\"terminal.ansiBrightBlue\":\"#6A9FB5\",\"terminal.ansiBrightCyan\":\"#75B5AA\",\"terminal.ansiBrightGreen\":\"#90A959\",\"terminal.ansiBrightMagenta\":\"#AA759F\",\"terminal.ansiBrightRed\":\"#AC4142\",\"terminal.ansiBrightWhite\":\"#151515\",\"terminal.ansiBrightYellow\":\"#F4BF75\",\"terminal.ansiCyan\":\"#75B5AA\",\"terminal.ansiGreen\":\"#90A959\",\"terminal.ansiMagenta\":\"#AA759F\",\"terminal.ansiRed\":\"#AC4142\",\"terminal.ansiWhite\":\"#303030\",\"terminal.ansiYellow\":\"#F4BF75\"}},{\"name\":\"Codeschool\",\"colors\":{\"terminal.background\":\"#232C31\",\"terminal.foreground\":\"#9EA7A6\",\"terminalCursor.background\":\"#9EA7A6\",\"terminalCursor.foreground\":\"#9EA7A6\",\"terminal.ansiBlack\":\"#232C31\",\"terminal.ansiBlue\":\"#484D79\",\"terminal.ansiBrightBlack\":\"#3F4944\",\"terminal.ansiBrightBlue\":\"#484D79\",\"terminal.ansiBrightCyan\":\"#B02F30\",\"terminal.ansiBrightGreen\":\"#237986\",\"terminal.ansiBrightMagenta\":\"#C59820\",\"terminal.ansiBrightRed\":\"#2A5491\",\"terminal.ansiBrightWhite\":\"#B5D8F6\",\"terminal.ansiBrightYellow\":\"#A03B1E\",\"terminal.ansiCyan\":\"#B02F30\",\"terminal.ansiGreen\":\"#237986\",\"terminal.ansiMagenta\":\"#C59820\",\"terminal.ansiRed\":\"#2A5491\",\"terminal.ansiWhite\":\"#9EA7A6\",\"terminal.ansiYellow\":\"#A03B1E\"}},{\"name\":\"Cupcake\",\"colors\":{\"terminal.background\":\"#FBF1F2\",\"terminal.foreground\":\"#8B8198\",\"terminalCursor.background\":\"#8B8198\",\"terminalCursor.foreground\":\"#8B8198\",\"terminal.ansiBlack\":\"#FBF1F2\",\"terminal.ansiBlue\":\"#7297B9\",\"terminal.ansiBrightBlack\":\"#BFB9C6\",\"terminal.ansiBrightBlue\":\"#7297B9\",\"terminal.ansiBrightCyan\":\"#69A9A7\",\"terminal.ansiBrightGreen\":\"#A3B367\",\"terminal.ansiBrightMagenta\":\"#BB99B4\",\"terminal.ansiBrightRed\":\"#D57E85\",\"terminal.ansiBrightWhite\":\"#585062\",\"terminal.ansiBrightYellow\":\"#DCB16C\",\"terminal.ansiCyan\":\"#69A9A7\",\"terminal.ansiGreen\":\"#A3B367\",\"terminal.ansiMagenta\":\"#BB99B4\",\"terminal.ansiRed\":\"#D57E85\",\"terminal.ansiWhite\":\"#8B8198\",\"terminal.ansiYellow\":\"#DCB16C\"}},{\"name\":\"Cupertino\",\"colors\":{\"terminal.background\":\"#FFFFFF\",\"terminal.foreground\":\"#404040\",\"terminalCursor.background\":\"#404040\",\"terminalCursor.foreground\":\"#404040\",\"terminal.ansiBlack\":\"#FFFFFF\",\"terminal.ansiBlue\":\"#0000FF\",\"terminal.ansiBrightBlack\":\"#808080\",\"terminal.ansiBrightBlue\":\"#0000FF\",\"terminal.ansiBrightCyan\":\"#318495\",\"terminal.ansiBrightGreen\":\"#007400\",\"terminal.ansiBrightMagenta\":\"#A90D91\",\"terminal.ansiBrightRed\":\"#C41A15\",\"terminal.ansiBrightWhite\":\"#5E5E5E\",\"terminal.ansiBrightYellow\":\"#826B28\",\"terminal.ansiCyan\":\"#318495\",\"terminal.ansiGreen\":\"#007400\",\"terminal.ansiMagenta\":\"#A90D91\",\"terminal.ansiRed\":\"#C41A15\",\"terminal.ansiWhite\":\"#404040\",\"terminal.ansiYellow\":\"#826B28\"}},{\"name\":\"Darktooth\",\"colors\":{\"terminal.background\":\"#1D2021\",\"terminal.foreground\":\"#A89984\",\"terminalCursor.background\":\"#A89984\",\"terminalCursor.foreground\":\"#A89984\",\"terminal.ansiBlack\":\"#1D2021\",\"terminal.ansiBlue\":\"#0D6678\",\"terminal.ansiBrightBlack\":\"#665C54\",\"terminal.ansiBrightBlue\":\"#0D6678\",\"terminal.ansiBrightCyan\":\"#8BA59B\",\"terminal.ansiBrightGreen\":\"#95C085\",\"terminal.ansiBrightMagenta\":\"#8F4673\",\"terminal.ansiBrightRed\":\"#FB543F\",\"terminal.ansiBrightWhite\":\"#FDF4C1\",\"terminal.ansiBrightYellow\":\"#FAC03B\",\"terminal.ansiCyan\":\"#8BA59B\",\"terminal.ansiGreen\":\"#95C085\",\"terminal.ansiMagenta\":\"#8F4673\",\"terminal.ansiRed\":\"#FB543F\",\"terminal.ansiWhite\":\"#A89984\",\"terminal.ansiYellow\":\"#FAC03B\"}},{\"name\":\"Default Dark\",\"colors\":{\"terminal.background\":\"#181818\",\"terminal.foreground\":\"#D8D8D8\",\"terminalCursor.background\":\"#D8D8D8\",\"terminalCursor.foreground\":\"#D8D8D8\",\"terminal.ansiBlack\":\"#181818\",\"terminal.ansiBlue\":\"#7CAFC2\",\"terminal.ansiBrightBlack\":\"#585858\",\"terminal.ansiBrightBlue\":\"#7CAFC2\",\"terminal.ansiBrightCyan\":\"#86C1B9\",\"terminal.ansiBrightGreen\":\"#A1B56C\",\"terminal.ansiBrightMagenta\":\"#BA8BAF\",\"terminal.ansiBrightRed\":\"#AB4642\",\"terminal.ansiBrightWhite\":\"#F8F8F8\",\"terminal.ansiBrightYellow\":\"#F7CA88\",\"terminal.ansiCyan\":\"#86C1B9\",\"terminal.ansiGreen\":\"#A1B56C\",\"terminal.ansiMagenta\":\"#BA8BAF\",\"terminal.ansiRed\":\"#AB4642\",\"terminal.ansiWhite\":\"#D8D8D8\",\"terminal.ansiYellow\":\"#F7CA88\"}},{\"name\":\"Default Light\",\"colors\":{\"terminal.background\":\"#F8F8F8\",\"terminal.foreground\":\"#383838\",\"terminalCursor.background\":\"#383838\",\"terminalCursor.foreground\":\"#383838\",\"terminal.ansiBlack\":\"#F8F8F8\",\"terminal.ansiBlue\":\"#7CAFC2\",\"terminal.ansiBrightBlack\":\"#B8B8B8\",\"terminal.ansiBrightBlue\":\"#7CAFC2\",\"terminal.ansiBrightCyan\":\"#86C1B9\",\"terminal.ansiBrightGreen\":\"#A1B56C\",\"terminal.ansiBrightMagenta\":\"#BA8BAF\",\"terminal.ansiBrightRed\":\"#AB4642\",\"terminal.ansiBrightWhite\":\"#181818\",\"terminal.ansiBrightYellow\":\"#F7CA88\",\"terminal.ansiCyan\":\"#86C1B9\",\"terminal.ansiGreen\":\"#A1B56C\",\"terminal.ansiMagenta\":\"#BA8BAF\",\"terminal.ansiRed\":\"#AB4642\",\"terminal.ansiWhite\":\"#383838\",\"terminal.ansiYellow\":\"#F7CA88\"}},{\"name\":\"Dracula\",\"colors\":{\"terminal.background\":\"#282936\",\"terminal.foreground\":\"#E9E9F4\",\"terminalCursor.background\":\"#E9E9F4\",\"terminalCursor.foreground\":\"#E9E9F4\",\"terminal.ansiBlack\":\"#282936\",\"terminal.ansiBlue\":\"#62D6E8\",\"terminal.ansiBrightBlack\":\"#626483\",\"terminal.ansiBrightBlue\":\"#62D6E8\",\"terminal.ansiBrightCyan\":\"#A1EFE4\",\"terminal.ansiBrightGreen\":\"#EBFF87\",\"terminal.ansiBrightMagenta\":\"#B45BCF\",\"terminal.ansiBrightRed\":\"#EA51B2\",\"terminal.ansiBrightWhite\":\"#F7F7FB\",\"terminal.ansiBrightYellow\":\"#00F769\",\"terminal.ansiCyan\":\"#A1EFE4\",\"terminal.ansiGreen\":\"#EBFF87\",\"terminal.ansiMagenta\":\"#B45BCF\",\"terminal.ansiRed\":\"#EA51B2\",\"terminal.ansiWhite\":\"#E9E9F4\",\"terminal.ansiYellow\":\"#00F769\"}},{\"name\":\"Eighties\",\"colors\":{\"terminal.background\":\"#2D2D2D\",\"terminal.foreground\":\"#D3D0C8\",\"terminalCursor.background\":\"#D3D0C8\",\"terminalCursor.foreground\":\"#D3D0C8\",\"terminal.ansiBlack\":\"#2D2D2D\",\"terminal.ansiBlue\":\"#6699CC\",\"terminal.ansiBrightBlack\":\"#747369\",\"terminal.ansiBrightBlue\":\"#6699CC\",\"terminal.ansiBrightCyan\":\"#66CCCC\",\"terminal.ansiBrightGreen\":\"#99CC99\",\"terminal.ansiBrightMagenta\":\"#CC99CC\",\"terminal.ansiBrightRed\":\"#F2777A\",\"terminal.ansiBrightWhite\":\"#F2F0EC\",\"terminal.ansiBrightYellow\":\"#FFCC66\",\"terminal.ansiCyan\":\"#66CCCC\",\"terminal.ansiGreen\":\"#99CC99\",\"terminal.ansiMagenta\":\"#CC99CC\",\"terminal.ansiRed\":\"#F2777A\",\"terminal.ansiWhite\":\"#D3D0C8\",\"terminal.ansiYellow\":\"#FFCC66\"}},{\"name\":\"Embers\",\"colors\":{\"terminal.background\":\"#16130F\",\"terminal.foreground\":\"#A39A90\",\"terminalCursor.background\":\"#A39A90\",\"terminalCursor.foreground\":\"#A39A90\",\"terminal.ansiBlack\":\"#16130F\",\"terminal.ansiBlue\":\"#6D5782\",\"terminal.ansiBrightBlack\":\"#5A5047\",\"terminal.ansiBrightBlue\":\"#6D5782\",\"terminal.ansiBrightCyan\":\"#576D82\",\"terminal.ansiBrightGreen\":\"#57826D\",\"terminal.ansiBrightMagenta\":\"#82576D\",\"terminal.ansiBrightRed\":\"#826D57\",\"terminal.ansiBrightWhite\":\"#DBD6D1\",\"terminal.ansiBrightYellow\":\"#6D8257\",\"terminal.ansiCyan\":\"#576D82\",\"terminal.ansiGreen\":\"#57826D\",\"terminal.ansiMagenta\":\"#82576D\",\"terminal.ansiRed\":\"#826D57\",\"terminal.ansiWhite\":\"#A39A90\",\"terminal.ansiYellow\":\"#6D8257\"}},{\"name\":\"Flat\",\"colors\":{\"terminal.background\":\"#2C3E50\",\"terminal.foreground\":\"#E0E0E0\",\"terminalCursor.background\":\"#E0E0E0\",\"terminalCursor.foreground\":\"#E0E0E0\",\"terminal.ansiBlack\":\"#2C3E50\",\"terminal.ansiBlue\":\"#3498DB\",\"terminal.ansiBrightBlack\":\"#95A5A6\",\"terminal.ansiBrightBlue\":\"#3498DB\",\"terminal.ansiBrightCyan\":\"#1ABC9C\",\"terminal.ansiBrightGreen\":\"#2ECC71\",\"terminal.ansiBrightMagenta\":\"#9B59B6\",\"terminal.ansiBrightRed\":\"#E74C3C\",\"terminal.ansiBrightWhite\":\"#ECF0F1\",\"terminal.ansiBrightYellow\":\"#F1C40F\",\"terminal.ansiCyan\":\"#1ABC9C\",\"terminal.ansiGreen\":\"#2ECC71\",\"terminal.ansiMagenta\":\"#9B59B6\",\"terminal.ansiRed\":\"#E74C3C\",\"terminal.ansiWhite\":\"#E0E0E0\",\"terminal.ansiYellow\":\"#F1C40F\"}},{\"name\":\"Github\",\"colors\":{\"terminal.background\":\"#FFFFFF\",\"terminal.foreground\":\"#333333\",\"terminalCursor.background\":\"#333333\",\"terminalCursor.foreground\":\"#333333\",\"terminal.ansiBlack\":\"#FFFFFF\",\"terminal.ansiBlue\":\"#795DA3\",\"terminal.ansiBrightBlack\":\"#969896\",\"terminal.ansiBrightBlue\":\"#795DA3\",\"terminal.ansiBrightCyan\":\"#183691\",\"terminal.ansiBrightGreen\":\"#183691\",\"terminal.ansiBrightMagenta\":\"#A71D5D\",\"terminal.ansiBrightRed\":\"#ED6A43\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#795DA3\",\"terminal.ansiCyan\":\"#183691\",\"terminal.ansiGreen\":\"#183691\",\"terminal.ansiMagenta\":\"#A71D5D\",\"terminal.ansiRed\":\"#ED6A43\",\"terminal.ansiWhite\":\"#333333\",\"terminal.ansiYellow\":\"#795DA3\"}},{\"name\":\"Google Dark\",\"colors\":{\"terminal.background\":\"#1D1F21\",\"terminal.foreground\":\"#C5C8C6\",\"terminalCursor.background\":\"#C5C8C6\",\"terminalCursor.foreground\":\"#C5C8C6\",\"terminal.ansiBlack\":\"#1D1F21\",\"terminal.ansiBlue\":\"#3971ED\",\"terminal.ansiBrightBlack\":\"#969896\",\"terminal.ansiBrightBlue\":\"#3971ED\",\"terminal.ansiBrightCyan\":\"#3971ED\",\"terminal.ansiBrightGreen\":\"#198844\",\"terminal.ansiBrightMagenta\":\"#A36AC7\",\"terminal.ansiBrightRed\":\"#CC342B\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#FBA922\",\"terminal.ansiCyan\":\"#3971ED\",\"terminal.ansiGreen\":\"#198844\",\"terminal.ansiMagenta\":\"#A36AC7\",\"terminal.ansiRed\":\"#CC342B\",\"terminal.ansiWhite\":\"#C5C8C6\",\"terminal.ansiYellow\":\"#FBA922\"}},{\"name\":\"Google Light\",\"colors\":{\"terminal.background\":\"#FFFFFF\",\"terminal.foreground\":\"#373B41\",\"terminalCursor.background\":\"#373B41\",\"terminalCursor.foreground\":\"#373B41\",\"terminal.ansiBlack\":\"#FFFFFF\",\"terminal.ansiBlue\":\"#3971ED\",\"terminal.ansiBrightBlack\":\"#B4B7B4\",\"terminal.ansiBrightBlue\":\"#3971ED\",\"terminal.ansiBrightCyan\":\"#3971ED\",\"terminal.ansiBrightGreen\":\"#198844\",\"terminal.ansiBrightMagenta\":\"#A36AC7\",\"terminal.ansiBrightRed\":\"#CC342B\",\"terminal.ansiBrightWhite\":\"#1D1F21\",\"terminal.ansiBrightYellow\":\"#FBA922\",\"terminal.ansiCyan\":\"#3971ED\",\"terminal.ansiGreen\":\"#198844\",\"terminal.ansiMagenta\":\"#A36AC7\",\"terminal.ansiRed\":\"#CC342B\",\"terminal.ansiWhite\":\"#373B41\",\"terminal.ansiYellow\":\"#FBA922\"}},{\"name\":\"Grayscale Dark\",\"colors\":{\"terminal.background\":\"#101010\",\"terminal.foreground\":\"#B9B9B9\",\"terminalCursor.background\":\"#B9B9B9\",\"terminalCursor.foreground\":\"#B9B9B9\",\"terminal.ansiBlack\":\"#101010\",\"terminal.ansiBlue\":\"#686868\",\"terminal.ansiBrightBlack\":\"#525252\",\"terminal.ansiBrightBlue\":\"#686868\",\"terminal.ansiBrightCyan\":\"#868686\",\"terminal.ansiBrightGreen\":\"#8E8E8E\",\"terminal.ansiBrightMagenta\":\"#747474\",\"terminal.ansiBrightRed\":\"#7C7C7C\",\"terminal.ansiBrightWhite\":\"#F7F7F7\",\"terminal.ansiBrightYellow\":\"#A0A0A0\",\"terminal.ansiCyan\":\"#868686\",\"terminal.ansiGreen\":\"#8E8E8E\",\"terminal.ansiMagenta\":\"#747474\",\"terminal.ansiRed\":\"#7C7C7C\",\"terminal.ansiWhite\":\"#B9B9B9\",\"terminal.ansiYellow\":\"#A0A0A0\"}},{\"name\":\"Grayscale Light\",\"colors\":{\"terminal.background\":\"#F7F7F7\",\"terminal.foreground\":\"#464646\",\"terminalCursor.background\":\"#464646\",\"terminalCursor.foreground\":\"#464646\",\"terminal.ansiBlack\":\"#F7F7F7\",\"terminal.ansiBlue\":\"#686868\",\"terminal.ansiBrightBlack\":\"#ABABAB\",\"terminal.ansiBrightBlue\":\"#686868\",\"terminal.ansiBrightCyan\":\"#868686\",\"terminal.ansiBrightGreen\":\"#8E8E8E\",\"terminal.ansiBrightMagenta\":\"#747474\",\"terminal.ansiBrightRed\":\"#7C7C7C\",\"terminal.ansiBrightWhite\":\"#101010\",\"terminal.ansiBrightYellow\":\"#A0A0A0\",\"terminal.ansiCyan\":\"#868686\",\"terminal.ansiGreen\":\"#8E8E8E\",\"terminal.ansiMagenta\":\"#747474\",\"terminal.ansiRed\":\"#7C7C7C\",\"terminal.ansiWhite\":\"#464646\",\"terminal.ansiYellow\":\"#A0A0A0\"}},{\"name\":\"Greenscreen\",\"colors\":{\"terminal.background\":\"#001100\",\"terminal.foreground\":\"#00BB00\",\"terminalCursor.background\":\"#00BB00\",\"terminalCursor.foreground\":\"#00BB00\",\"terminal.ansiBlack\":\"#001100\",\"terminal.ansiBlue\":\"#009900\",\"terminal.ansiBrightBlack\":\"#007700\",\"terminal.ansiBrightBlue\":\"#009900\",\"terminal.ansiBrightCyan\":\"#005500\",\"terminal.ansiBrightGreen\":\"#00BB00\",\"terminal.ansiBrightMagenta\":\"#00BB00\",\"terminal.ansiBrightRed\":\"#007700\",\"terminal.ansiBrightWhite\":\"#00FF00\",\"terminal.ansiBrightYellow\":\"#007700\",\"terminal.ansiCyan\":\"#005500\",\"terminal.ansiGreen\":\"#00BB00\",\"terminal.ansiMagenta\":\"#00BB00\",\"terminal.ansiRed\":\"#007700\",\"terminal.ansiWhite\":\"#00BB00\",\"terminal.ansiYellow\":\"#007700\"}},{\"name\":\"Gruvbox Dark Hard\",\"colors\":{\"terminal.background\":\"#1D2021\",\"terminal.foreground\":\"#D5C4A1\",\"terminalCursor.background\":\"#D5C4A1\",\"terminalCursor.foreground\":\"#D5C4A1\",\"terminal.ansiBlack\":\"#1D2021\",\"terminal.ansiBlue\":\"#83A598\",\"terminal.ansiBrightBlack\":\"#665C54\",\"terminal.ansiBrightBlue\":\"#83A598\",\"terminal.ansiBrightCyan\":\"#8EC07C\",\"terminal.ansiBrightGreen\":\"#B8BB26\",\"terminal.ansiBrightMagenta\":\"#D3869B\",\"terminal.ansiBrightRed\":\"#FB4934\",\"terminal.ansiBrightWhite\":\"#FBF1C7\",\"terminal.ansiBrightYellow\":\"#FABD2F\",\"terminal.ansiCyan\":\"#8EC07C\",\"terminal.ansiGreen\":\"#B8BB26\",\"terminal.ansiMagenta\":\"#D3869B\",\"terminal.ansiRed\":\"#FB4934\",\"terminal.ansiWhite\":\"#D5C4A1\",\"terminal.ansiYellow\":\"#FABD2F\"}},{\"name\":\"Gruvbox Dark Medium\",\"colors\":{\"terminal.background\":\"#282828\",\"terminal.foreground\":\"#D5C4A1\",\"terminalCursor.background\":\"#D5C4A1\",\"terminalCursor.foreground\":\"#D5C4A1\",\"terminal.ansiBlack\":\"#282828\",\"terminal.ansiBlue\":\"#83A598\",\"terminal.ansiBrightBlack\":\"#665C54\",\"terminal.ansiBrightBlue\":\"#83A598\",\"terminal.ansiBrightCyan\":\"#8EC07C\",\"terminal.ansiBrightGreen\":\"#B8BB26\",\"terminal.ansiBrightMagenta\":\"#D3869B\",\"terminal.ansiBrightRed\":\"#FB4934\",\"terminal.ansiBrightWhite\":\"#FBF1C7\",\"terminal.ansiBrightYellow\":\"#FABD2F\",\"terminal.ansiCyan\":\"#8EC07C\",\"terminal.ansiGreen\":\"#B8BB26\",\"terminal.ansiMagenta\":\"#D3869B\",\"terminal.ansiRed\":\"#FB4934\",\"terminal.ansiWhite\":\"#D5C4A1\",\"terminal.ansiYellow\":\"#FABD2F\"}},{\"name\":\"Gruvbox Dark Pale\",\"colors\":{\"terminal.background\":\"#262626\",\"terminal.foreground\":\"#DAB997\",\"terminalCursor.background\":\"#DAB997\",\"terminalCursor.foreground\":\"#DAB997\",\"terminal.ansiBlack\":\"#262626\",\"terminal.ansiBlue\":\"#83ADAD\",\"terminal.ansiBrightBlack\":\"#8A8A8A\",\"terminal.ansiBrightBlue\":\"#83ADAD\",\"terminal.ansiBrightCyan\":\"#85AD85\",\"terminal.ansiBrightGreen\":\"#AFAF00\",\"terminal.ansiBrightMagenta\":\"#D485AD\",\"terminal.ansiBrightRed\":\"#D75F5F\",\"terminal.ansiBrightWhite\":\"#EBDBB2\",\"terminal.ansiBrightYellow\":\"#FFAF00\",\"terminal.ansiCyan\":\"#85AD85\",\"terminal.ansiGreen\":\"#AFAF00\",\"terminal.ansiMagenta\":\"#D485AD\",\"terminal.ansiRed\":\"#D75F5F\",\"terminal.ansiWhite\":\"#DAB997\",\"terminal.ansiYellow\":\"#FFAF00\"}},{\"name\":\"Gruvbox Dark Soft\",\"colors\":{\"terminal.background\":\"#32302F\",\"terminal.foreground\":\"#D5C4A1\",\"terminalCursor.background\":\"#D5C4A1\",\"terminalCursor.foreground\":\"#D5C4A1\",\"terminal.ansiBlack\":\"#32302F\",\"terminal.ansiBlue\":\"#83A598\",\"terminal.ansiBrightBlack\":\"#665C54\",\"terminal.ansiBrightBlue\":\"#83A598\",\"terminal.ansiBrightCyan\":\"#8EC07C\",\"terminal.ansiBrightGreen\":\"#B8BB26\",\"terminal.ansiBrightMagenta\":\"#D3869B\",\"terminal.ansiBrightRed\":\"#FB4934\",\"terminal.ansiBrightWhite\":\"#FBF1C7\",\"terminal.ansiBrightYellow\":\"#FABD2F\",\"terminal.ansiCyan\":\"#8EC07C\",\"terminal.ansiGreen\":\"#B8BB26\",\"terminal.ansiMagenta\":\"#D3869B\",\"terminal.ansiRed\":\"#FB4934\",\"terminal.ansiWhite\":\"#D5C4A1\",\"terminal.ansiYellow\":\"#FABD2F\"}},{\"name\":\"Gruvbox Light Hard\",\"colors\":{\"terminal.background\":\"#F9F5D7\",\"terminal.foreground\":\"#504945\",\"terminalCursor.background\":\"#504945\",\"terminalCursor.foreground\":\"#504945\",\"terminal.ansiBlack\":\"#F9F5D7\",\"terminal.ansiBlue\":\"#076678\",\"terminal.ansiBrightBlack\":\"#BDAE93\",\"terminal.ansiBrightBlue\":\"#076678\",\"terminal.ansiBrightCyan\":\"#427B58\",\"terminal.ansiBrightGreen\":\"#79740E\",\"terminal.ansiBrightMagenta\":\"#8F3F71\",\"terminal.ansiBrightRed\":\"#9D0006\",\"terminal.ansiBrightWhite\":\"#282828\",\"terminal.ansiBrightYellow\":\"#B57614\",\"terminal.ansiCyan\":\"#427B58\",\"terminal.ansiGreen\":\"#79740E\",\"terminal.ansiMagenta\":\"#8F3F71\",\"terminal.ansiRed\":\"#9D0006\",\"terminal.ansiWhite\":\"#504945\",\"terminal.ansiYellow\":\"#B57614\"}},{\"name\":\"Gruvbox Light Medium\",\"colors\":{\"terminal.background\":\"#FBF1C7\",\"terminal.foreground\":\"#504945\",\"terminalCursor.background\":\"#504945\",\"terminalCursor.foreground\":\"#504945\",\"terminal.ansiBlack\":\"#FBF1C7\",\"terminal.ansiBlue\":\"#076678\",\"terminal.ansiBrightBlack\":\"#BDAE93\",\"terminal.ansiBrightBlue\":\"#076678\",\"terminal.ansiBrightCyan\":\"#427B58\",\"terminal.ansiBrightGreen\":\"#79740E\",\"terminal.ansiBrightMagenta\":\"#8F3F71\",\"terminal.ansiBrightRed\":\"#9D0006\",\"terminal.ansiBrightWhite\":\"#282828\",\"terminal.ansiBrightYellow\":\"#B57614\",\"terminal.ansiCyan\":\"#427B58\",\"terminal.ansiGreen\":\"#79740E\",\"terminal.ansiMagenta\":\"#8F3F71\",\"terminal.ansiRed\":\"#9D0006\",\"terminal.ansiWhite\":\"#504945\",\"terminal.ansiYellow\":\"#B57614\"}},{\"name\":\"Gruvbox Light Soft\",\"colors\":{\"terminal.background\":\"#F2E5BC\",\"terminal.foreground\":\"#504945\",\"terminalCursor.background\":\"#504945\",\"terminalCursor.foreground\":\"#504945\",\"terminal.ansiBlack\":\"#F2E5BC\",\"terminal.ansiBlue\":\"#076678\",\"terminal.ansiBrightBlack\":\"#BDAE93\",\"terminal.ansiBrightBlue\":\"#076678\",\"terminal.ansiBrightCyan\":\"#427B58\",\"terminal.ansiBrightGreen\":\"#79740E\",\"terminal.ansiBrightMagenta\":\"#8F3F71\",\"terminal.ansiBrightRed\":\"#9D0006\",\"terminal.ansiBrightWhite\":\"#282828\",\"terminal.ansiBrightYellow\":\"#B57614\",\"terminal.ansiCyan\":\"#427B58\",\"terminal.ansiGreen\":\"#79740E\",\"terminal.ansiMagenta\":\"#8F3F71\",\"terminal.ansiRed\":\"#9D0006\",\"terminal.ansiWhite\":\"#504945\",\"terminal.ansiYellow\":\"#B57614\"}},{\"name\":\"Harmonic Dark\",\"colors\":{\"terminal.background\":\"#0B1C2C\",\"terminal.foreground\":\"#CBD6E2\",\"terminalCursor.background\":\"#CBD6E2\",\"terminalCursor.foreground\":\"#CBD6E2\",\"terminal.ansiBlack\":\"#0B1C2C\",\"terminal.ansiBlue\":\"#8B56BF\",\"terminal.ansiBrightBlack\":\"#627E99\",\"terminal.ansiBrightBlue\":\"#8B56BF\",\"terminal.ansiBrightCyan\":\"#568BBF\",\"terminal.ansiBrightGreen\":\"#56BF8B\",\"terminal.ansiBrightMagenta\":\"#BF568B\",\"terminal.ansiBrightRed\":\"#BF8B56\",\"terminal.ansiBrightWhite\":\"#F7F9FB\",\"terminal.ansiBrightYellow\":\"#8BBF56\",\"terminal.ansiCyan\":\"#568BBF\",\"terminal.ansiGreen\":\"#56BF8B\",\"terminal.ansiMagenta\":\"#BF568B\",\"terminal.ansiRed\":\"#BF8B56\",\"terminal.ansiWhite\":\"#CBD6E2\",\"terminal.ansiYellow\":\"#8BBF56\"}},{\"name\":\"Harmonic Light\",\"colors\":{\"terminal.background\":\"#F7F9FB\",\"terminal.foreground\":\"#405C79\",\"terminalCursor.background\":\"#405C79\",\"terminalCursor.foreground\":\"#405C79\",\"terminal.ansiBlack\":\"#F7F9FB\",\"terminal.ansiBlue\":\"#8B56BF\",\"terminal.ansiBrightBlack\":\"#AABCCE\",\"terminal.ansiBrightBlue\":\"#8B56BF\",\"terminal.ansiBrightCyan\":\"#568BBF\",\"terminal.ansiBrightGreen\":\"#56BF8B\",\"terminal.ansiBrightMagenta\":\"#BF568B\",\"terminal.ansiBrightRed\":\"#BF8B56\",\"terminal.ansiBrightWhite\":\"#0B1C2C\",\"terminal.ansiBrightYellow\":\"#8BBF56\",\"terminal.ansiCyan\":\"#568BBF\",\"terminal.ansiGreen\":\"#56BF8B\",\"terminal.ansiMagenta\":\"#BF568B\",\"terminal.ansiRed\":\"#BF8B56\",\"terminal.ansiWhite\":\"#405C79\",\"terminal.ansiYellow\":\"#8BBF56\"}},{\"name\":\"Hopscotch\",\"colors\":{\"terminal.background\":\"#322931\",\"terminal.foreground\":\"#B9B5B8\",\"terminalCursor.background\":\"#B9B5B8\",\"terminalCursor.foreground\":\"#B9B5B8\",\"terminal.ansiBlack\":\"#322931\",\"terminal.ansiBlue\":\"#1290BF\",\"terminal.ansiBrightBlack\":\"#797379\",\"terminal.ansiBrightBlue\":\"#1290BF\",\"terminal.ansiBrightCyan\":\"#149B93\",\"terminal.ansiBrightGreen\":\"#8FC13E\",\"terminal.ansiBrightMagenta\":\"#C85E7C\",\"terminal.ansiBrightRed\":\"#DD464C\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#FDCC59\",\"terminal.ansiCyan\":\"#149B93\",\"terminal.ansiGreen\":\"#8FC13E\",\"terminal.ansiMagenta\":\"#C85E7C\",\"terminal.ansiRed\":\"#DD464C\",\"terminal.ansiWhite\":\"#B9B5B8\",\"terminal.ansiYellow\":\"#FDCC59\"}},{\"name\":\"Icy\",\"colors\":{\"terminal.background\":\"#222222\",\"terminal.foreground\":\"#BDBDBD\",\"terminalCursor.background\":\"#BDBDBD\",\"terminalCursor.foreground\":\"#BDBDBD\",\"terminal.ansiBlack\":\"#222222\",\"terminal.ansiBlue\":\"#80DEEA\",\"terminal.ansiBrightBlack\":\"#757575\",\"terminal.ansiBrightBlue\":\"#80DEEA\",\"terminal.ansiBrightCyan\":\"#4DD0E1\",\"terminal.ansiBrightGreen\":\"#26C6DA\",\"terminal.ansiBrightMagenta\":\"#B3EBF2\",\"terminal.ansiBrightRed\":\"#0097A7\",\"terminal.ansiBrightWhite\":\"#EEEEEE\",\"terminal.ansiBrightYellow\":\"#00BCD4\",\"terminal.ansiCyan\":\"#4DD0E1\",\"terminal.ansiGreen\":\"#26C6DA\",\"terminal.ansiMagenta\":\"#B3EBF2\",\"terminal.ansiRed\":\"#0097A7\",\"terminal.ansiWhite\":\"#BDBDBD\",\"terminal.ansiYellow\":\"#00BCD4\"}},{\"name\":\"Irblack\",\"colors\":{\"terminal.background\":\"#000000\",\"terminal.foreground\":\"#B5B3AA\",\"terminalCursor.background\":\"#B5B3AA\",\"terminalCursor.foreground\":\"#B5B3AA\",\"terminal.ansiBlack\":\"#000000\",\"terminal.ansiBlue\":\"#96CBFE\",\"terminal.ansiBrightBlack\":\"#6C6C66\",\"terminal.ansiBrightBlue\":\"#96CBFE\",\"terminal.ansiBrightCyan\":\"#C6C5FE\",\"terminal.ansiBrightGreen\":\"#A8FF60\",\"terminal.ansiBrightMagenta\":\"#FF73FD\",\"terminal.ansiBrightRed\":\"#FF6C60\",\"terminal.ansiBrightWhite\":\"#FDFBEE\",\"terminal.ansiBrightYellow\":\"#FFFFB6\",\"terminal.ansiCyan\":\"#C6C5FE\",\"terminal.ansiGreen\":\"#A8FF60\",\"terminal.ansiMagenta\":\"#FF73FD\",\"terminal.ansiRed\":\"#FF6C60\",\"terminal.ansiWhite\":\"#B5B3AA\",\"terminal.ansiYellow\":\"#FFFFB6\"}},{\"name\":\"Isotope\",\"colors\":{\"terminal.background\":\"#000000\",\"terminal.foreground\":\"#D0D0D0\",\"terminalCursor.background\":\"#D0D0D0\",\"terminalCursor.foreground\":\"#D0D0D0\",\"terminal.ansiBlack\":\"#000000\",\"terminal.ansiBlue\":\"#0066FF\",\"terminal.ansiBrightBlack\":\"#808080\",\"terminal.ansiBrightBlue\":\"#0066FF\",\"terminal.ansiBrightCyan\":\"#00FFFF\",\"terminal.ansiBrightGreen\":\"#33FF00\",\"terminal.ansiBrightMagenta\":\"#CC00FF\",\"terminal.ansiBrightRed\":\"#FF0000\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#FF0099\",\"terminal.ansiCyan\":\"#00FFFF\",\"terminal.ansiGreen\":\"#33FF00\",\"terminal.ansiMagenta\":\"#CC00FF\",\"terminal.ansiRed\":\"#FF0000\",\"terminal.ansiWhite\":\"#D0D0D0\",\"terminal.ansiYellow\":\"#FF0099\"}},{\"name\":\"Macintosh\",\"colors\":{\"terminal.background\":\"#000000\",\"terminal.foreground\":\"#C0C0C0\",\"terminalCursor.background\":\"#C0C0C0\",\"terminalCursor.foreground\":\"#C0C0C0\",\"terminal.ansiBlack\":\"#000000\",\"terminal.ansiBlue\":\"#0000D3\",\"terminal.ansiBrightBlack\":\"#808080\",\"terminal.ansiBrightBlue\":\"#0000D3\",\"terminal.ansiBrightCyan\":\"#02ABEA\",\"terminal.ansiBrightGreen\":\"#1FB714\",\"terminal.ansiBrightMagenta\":\"#4700A5\",\"terminal.ansiBrightRed\":\"#DD0907\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#FBF305\",\"terminal.ansiCyan\":\"#02ABEA\",\"terminal.ansiGreen\":\"#1FB714\",\"terminal.ansiMagenta\":\"#4700A5\",\"terminal.ansiRed\":\"#DD0907\",\"terminal.ansiWhite\":\"#C0C0C0\",\"terminal.ansiYellow\":\"#FBF305\"}},{\"name\":\"Marrakesh\",\"colors\":{\"terminal.background\":\"#201602\",\"terminal.foreground\":\"#948E48\",\"terminalCursor.background\":\"#948E48\",\"terminalCursor.foreground\":\"#948E48\",\"terminal.ansiBlack\":\"#201602\",\"terminal.ansiBlue\":\"#477CA1\",\"terminal.ansiBrightBlack\":\"#6C6823\",\"terminal.ansiBrightBlue\":\"#477CA1\",\"terminal.ansiBrightCyan\":\"#75A738\",\"terminal.ansiBrightGreen\":\"#18974E\",\"terminal.ansiBrightMagenta\":\"#8868B3\",\"terminal.ansiBrightRed\":\"#C35359\",\"terminal.ansiBrightWhite\":\"#FAF0A5\",\"terminal.ansiBrightYellow\":\"#A88339\",\"terminal.ansiCyan\":\"#75A738\",\"terminal.ansiGreen\":\"#18974E\",\"terminal.ansiMagenta\":\"#8868B3\",\"terminal.ansiRed\":\"#C35359\",\"terminal.ansiWhite\":\"#948E48\",\"terminal.ansiYellow\":\"#A88339\"}},{\"name\":\"Materia\",\"colors\":{\"terminal.background\":\"#263238\",\"terminal.foreground\":\"#CDD3DE\",\"terminalCursor.background\":\"#CDD3DE\",\"terminalCursor.foreground\":\"#CDD3DE\",\"terminal.ansiBlack\":\"#263238\",\"terminal.ansiBlue\":\"#89DDFF\",\"terminal.ansiBrightBlack\":\"#707880\",\"terminal.ansiBrightBlue\":\"#89DDFF\",\"terminal.ansiBrightCyan\":\"#80CBC4\",\"terminal.ansiBrightGreen\":\"#8BD649\",\"terminal.ansiBrightMagenta\":\"#82AAFF\",\"terminal.ansiBrightRed\":\"#EC5F67\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#FFCC00\",\"terminal.ansiCyan\":\"#80CBC4\",\"terminal.ansiGreen\":\"#8BD649\",\"terminal.ansiMagenta\":\"#82AAFF\",\"terminal.ansiRed\":\"#EC5F67\",\"terminal.ansiWhite\":\"#CDD3DE\",\"terminal.ansiYellow\":\"#FFCC00\"}},{\"name\":\"Material Darker\",\"colors\":{\"terminal.background\":\"#212121\",\"terminal.foreground\":\"#EEFFFF\",\"terminalCursor.background\":\"#EEFFFF\",\"terminalCursor.foreground\":\"#EEFFFF\",\"terminal.ansiBlack\":\"#212121\",\"terminal.ansiBlue\":\"#82AAFF\",\"terminal.ansiBrightBlack\":\"#4A4A4A\",\"terminal.ansiBrightBlue\":\"#82AAFF\",\"terminal.ansiBrightCyan\":\"#89DDFF\",\"terminal.ansiBrightGreen\":\"#C3E88D\",\"terminal.ansiBrightMagenta\":\"#C792EA\",\"terminal.ansiBrightRed\":\"#F07178\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#FFCB6B\",\"terminal.ansiCyan\":\"#89DDFF\",\"terminal.ansiGreen\":\"#C3E88D\",\"terminal.ansiMagenta\":\"#C792EA\",\"terminal.ansiRed\":\"#F07178\",\"terminal.ansiWhite\":\"#EEFFFF\",\"terminal.ansiYellow\":\"#FFCB6B\"}},{\"name\":\"Material Lighter\",\"colors\":{\"terminal.background\":\"#FAFAFA\",\"terminal.foreground\":\"#80CBC4\",\"terminalCursor.background\":\"#80CBC4\",\"terminalCursor.foreground\":\"#80CBC4\",\"terminal.ansiBlack\":\"#FAFAFA\",\"terminal.ansiBlue\":\"#6182B8\",\"terminal.ansiBrightBlack\":\"#CCD7DA\",\"terminal.ansiBrightBlue\":\"#6182B8\",\"terminal.ansiBrightCyan\":\"#39ADB5\",\"terminal.ansiBrightGreen\":\"#91B859\",\"terminal.ansiBrightMagenta\":\"#7C4DFF\",\"terminal.ansiBrightRed\":\"#FF5370\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#FFB62C\",\"terminal.ansiCyan\":\"#39ADB5\",\"terminal.ansiGreen\":\"#91B859\",\"terminal.ansiMagenta\":\"#7C4DFF\",\"terminal.ansiRed\":\"#FF5370\",\"terminal.ansiWhite\":\"#80CBC4\",\"terminal.ansiYellow\":\"#FFB62C\"}},{\"name\":\"Material Palenight\",\"colors\":{\"terminal.background\":\"#292D3E\",\"terminal.foreground\":\"#959DCB\",\"terminalCursor.background\":\"#959DCB\",\"terminalCursor.foreground\":\"#959DCB\",\"terminal.ansiBlack\":\"#292D3E\",\"terminal.ansiBlue\":\"#82AAFF\",\"terminal.ansiBrightBlack\":\"#676E95\",\"terminal.ansiBrightBlue\":\"#82AAFF\",\"terminal.ansiBrightCyan\":\"#89DDFF\",\"terminal.ansiBrightGreen\":\"#C3E88D\",\"terminal.ansiBrightMagenta\":\"#C792EA\",\"terminal.ansiBrightRed\":\"#F07178\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#FFCB6B\",\"terminal.ansiCyan\":\"#89DDFF\",\"terminal.ansiGreen\":\"#C3E88D\",\"terminal.ansiMagenta\":\"#C792EA\",\"terminal.ansiRed\":\"#F07178\",\"terminal.ansiWhite\":\"#959DCB\",\"terminal.ansiYellow\":\"#FFCB6B\"}},{\"name\":\"Material\",\"colors\":{\"terminal.background\":\"#263238\",\"terminal.foreground\":\"#EEFFFF\",\"terminalCursor.background\":\"#EEFFFF\",\"terminalCursor.foreground\":\"#EEFFFF\",\"terminal.ansiBlack\":\"#263238\",\"terminal.ansiBlue\":\"#82AAFF\",\"terminal.ansiBrightBlack\":\"#546E7A\",\"terminal.ansiBrightBlue\":\"#82AAFF\",\"terminal.ansiBrightCyan\":\"#89DDFF\",\"terminal.ansiBrightGreen\":\"#C3E88D\",\"terminal.ansiBrightMagenta\":\"#C792EA\",\"terminal.ansiBrightRed\":\"#F07178\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#FFCB6B\",\"terminal.ansiCyan\":\"#89DDFF\",\"terminal.ansiGreen\":\"#C3E88D\",\"terminal.ansiMagenta\":\"#C792EA\",\"terminal.ansiRed\":\"#F07178\",\"terminal.ansiWhite\":\"#EEFFFF\",\"terminal.ansiYellow\":\"#FFCB6B\"}},{\"name\":\"Mellow Purple\",\"colors\":{\"terminal.background\":\"#1E0528\",\"terminal.foreground\":\"#FFEEFF\",\"terminalCursor.background\":\"#FFEEFF\",\"terminalCursor.foreground\":\"#FFEEFF\",\"terminal.ansiBlack\":\"#1E0528\",\"terminal.ansiBlue\":\"#550068\",\"terminal.ansiBrightBlack\":\"#320F55\",\"terminal.ansiBrightBlue\":\"#550068\",\"terminal.ansiBrightCyan\":\"#B900B1\",\"terminal.ansiBrightGreen\":\"#05CB0D\",\"terminal.ansiBrightMagenta\":\"#8991BB\",\"terminal.ansiBrightRed\":\"#00D9E9\",\"terminal.ansiBrightWhite\":\"#F8C0FF\",\"terminal.ansiBrightYellow\":\"#955AE7\",\"terminal.ansiCyan\":\"#B900B1\",\"terminal.ansiGreen\":\"#05CB0D\",\"terminal.ansiMagenta\":\"#8991BB\",\"terminal.ansiRed\":\"#00D9E9\",\"terminal.ansiWhite\":\"#FFEEFF\",\"terminal.ansiYellow\":\"#955AE7\"}},{\"name\":\"Mexico Light\",\"colors\":{\"terminal.background\":\"#F8F8F8\",\"terminal.foreground\":\"#383838\",\"terminalCursor.background\":\"#383838\",\"terminalCursor.foreground\":\"#383838\",\"terminal.ansiBlack\":\"#F8F8F8\",\"terminal.ansiBlue\":\"#7CAFC2\",\"terminal.ansiBrightBlack\":\"#B8B8B8\",\"terminal.ansiBrightBlue\":\"#7CAFC2\",\"terminal.ansiBrightCyan\":\"#4B8093\",\"terminal.ansiBrightGreen\":\"#538947\",\"terminal.ansiBrightMagenta\":\"#96609E\",\"terminal.ansiBrightRed\":\"#AB4642\",\"terminal.ansiBrightWhite\":\"#181818\",\"terminal.ansiBrightYellow\":\"#F79A0E\",\"terminal.ansiCyan\":\"#4B8093\",\"terminal.ansiGreen\":\"#538947\",\"terminal.ansiMagenta\":\"#96609E\",\"terminal.ansiRed\":\"#AB4642\",\"terminal.ansiWhite\":\"#383838\",\"terminal.ansiYellow\":\"#F79A0E\"}},{\"name\":\"Mocha\",\"colors\":{\"terminal.background\":\"#3B3228\",\"terminal.foreground\":\"#D0C8C6\",\"terminalCursor.background\":\"#D0C8C6\",\"terminalCursor.foreground\":\"#D0C8C6\",\"terminal.ansiBlack\":\"#3B3228\",\"terminal.ansiBlue\":\"#8AB3B5\",\"terminal.ansiBrightBlack\":\"#7E705A\",\"terminal.ansiBrightBlue\":\"#8AB3B5\",\"terminal.ansiBrightCyan\":\"#7BBDA4\",\"terminal.ansiBrightGreen\":\"#BEB55B\",\"terminal.ansiBrightMagenta\":\"#A89BB9\",\"terminal.ansiBrightRed\":\"#CB6077\",\"terminal.ansiBrightWhite\":\"#F5EEEB\",\"terminal.ansiBrightYellow\":\"#F4BC87\",\"terminal.ansiCyan\":\"#7BBDA4\",\"terminal.ansiGreen\":\"#BEB55B\",\"terminal.ansiMagenta\":\"#A89BB9\",\"terminal.ansiRed\":\"#CB6077\",\"terminal.ansiWhite\":\"#D0C8C6\",\"terminal.ansiYellow\":\"#F4BC87\"}},{\"name\":\"Monokai\",\"colors\":{\"terminal.background\":\"#272822\",\"terminal.foreground\":\"#F8F8F2\",\"terminalCursor.background\":\"#F8F8F2\",\"terminalCursor.foreground\":\"#F8F8F2\",\"terminal.ansiBlack\":\"#272822\",\"terminal.ansiBlue\":\"#66D9EF\",\"terminal.ansiBrightBlack\":\"#75715E\",\"terminal.ansiBrightBlue\":\"#66D9EF\",\"terminal.ansiBrightCyan\":\"#A1EFE4\",\"terminal.ansiBrightGreen\":\"#A6E22E\",\"terminal.ansiBrightMagenta\":\"#AE81FF\",\"terminal.ansiBrightRed\":\"#F92672\",\"terminal.ansiBrightWhite\":\"#F9F8F5\",\"terminal.ansiBrightYellow\":\"#F4BF75\",\"terminal.ansiCyan\":\"#A1EFE4\",\"terminal.ansiGreen\":\"#A6E22E\",\"terminal.ansiMagenta\":\"#AE81FF\",\"terminal.ansiRed\":\"#F92672\",\"terminal.ansiWhite\":\"#F8F8F2\",\"terminal.ansiYellow\":\"#F4BF75\"}},{\"name\":\"Nord\",\"colors\":{\"terminal.background\":\"#2E3440\",\"terminal.foreground\":\"#E5E9F0\",\"terminalCursor.background\":\"#E5E9F0\",\"terminalCursor.foreground\":\"#E5E9F0\",\"terminal.ansiBlack\":\"#2E3440\",\"terminal.ansiBlue\":\"#EBCB8B\",\"terminal.ansiBrightBlack\":\"#4C566A\",\"terminal.ansiBrightBlue\":\"#EBCB8B\",\"terminal.ansiBrightCyan\":\"#D08770\",\"terminal.ansiBrightGreen\":\"#BF616A\",\"terminal.ansiBrightMagenta\":\"#A3BE8C\",\"terminal.ansiBrightRed\":\"#88C0D0\",\"terminal.ansiBrightWhite\":\"#8FBCBB\",\"terminal.ansiBrightYellow\":\"#5E81AC\",\"terminal.ansiCyan\":\"#D08770\",\"terminal.ansiGreen\":\"#BF616A\",\"terminal.ansiMagenta\":\"#A3BE8C\",\"terminal.ansiRed\":\"#88C0D0\",\"terminal.ansiWhite\":\"#E5E9F0\",\"terminal.ansiYellow\":\"#5E81AC\"}},{\"name\":\"Ocean\",\"colors\":{\"terminal.background\":\"#2B303B\",\"terminal.foreground\":\"#C0C5CE\",\"terminalCursor.background\":\"#C0C5CE\",\"terminalCursor.foreground\":\"#C0C5CE\",\"terminal.ansiBlack\":\"#2B303B\",\"terminal.ansiBlue\":\"#8FA1B3\",\"terminal.ansiBrightBlack\":\"#65737E\",\"terminal.ansiBrightBlue\":\"#8FA1B3\",\"terminal.ansiBrightCyan\":\"#96B5B4\",\"terminal.ansiBrightGreen\":\"#A3BE8C\",\"terminal.ansiBrightMagenta\":\"#B48EAD\",\"terminal.ansiBrightRed\":\"#BF616A\",\"terminal.ansiBrightWhite\":\"#EFF1F5\",\"terminal.ansiBrightYellow\":\"#EBCB8B\",\"terminal.ansiCyan\":\"#96B5B4\",\"terminal.ansiGreen\":\"#A3BE8C\",\"terminal.ansiMagenta\":\"#B48EAD\",\"terminal.ansiRed\":\"#BF616A\",\"terminal.ansiWhite\":\"#C0C5CE\",\"terminal.ansiYellow\":\"#EBCB8B\"}},{\"name\":\"Oceanicnext\",\"colors\":{\"terminal.background\":\"#1B2B34\",\"terminal.foreground\":\"#C0C5CE\",\"terminalCursor.background\":\"#C0C5CE\",\"terminalCursor.foreground\":\"#C0C5CE\",\"terminal.ansiBlack\":\"#1B2B34\",\"terminal.ansiBlue\":\"#6699CC\",\"terminal.ansiBrightBlack\":\"#65737E\",\"terminal.ansiBrightBlue\":\"#6699CC\",\"terminal.ansiBrightCyan\":\"#5FB3B3\",\"terminal.ansiBrightGreen\":\"#99C794\",\"terminal.ansiBrightMagenta\":\"#C594C5\",\"terminal.ansiBrightRed\":\"#EC5F67\",\"terminal.ansiBrightWhite\":\"#D8DEE9\",\"terminal.ansiBrightYellow\":\"#FAC863\",\"terminal.ansiCyan\":\"#5FB3B3\",\"terminal.ansiGreen\":\"#99C794\",\"terminal.ansiMagenta\":\"#C594C5\",\"terminal.ansiRed\":\"#EC5F67\",\"terminal.ansiWhite\":\"#C0C5CE\",\"terminal.ansiYellow\":\"#FAC863\"}},{\"name\":\"One Light\",\"colors\":{\"terminal.background\":\"#FAFAFA\",\"terminal.foreground\":\"#383A42\",\"terminalCursor.background\":\"#383A42\",\"terminalCursor.foreground\":\"#383A42\",\"terminal.ansiBlack\":\"#FAFAFA\",\"terminal.ansiBlue\":\"#4078F2\",\"terminal.ansiBrightBlack\":\"#A0A1A7\",\"terminal.ansiBrightBlue\":\"#4078F2\",\"terminal.ansiBrightCyan\":\"#0184BC\",\"terminal.ansiBrightGreen\":\"#50A14F\",\"terminal.ansiBrightMagenta\":\"#A626A4\",\"terminal.ansiBrightRed\":\"#CA1243\",\"terminal.ansiBrightWhite\":\"#090A0B\",\"terminal.ansiBrightYellow\":\"#C18401\",\"terminal.ansiCyan\":\"#0184BC\",\"terminal.ansiGreen\":\"#50A14F\",\"terminal.ansiMagenta\":\"#A626A4\",\"terminal.ansiRed\":\"#CA1243\",\"terminal.ansiWhite\":\"#383A42\",\"terminal.ansiYellow\":\"#C18401\"}},{\"name\":\"Onedark\",\"colors\":{\"terminal.background\":\"#282C34\",\"terminal.foreground\":\"#ABB2BF\",\"terminalCursor.background\":\"#ABB2BF\",\"terminalCursor.foreground\":\"#ABB2BF\",\"terminal.ansiBlack\":\"#282C34\",\"terminal.ansiBlue\":\"#61AFEF\",\"terminal.ansiBrightBlack\":\"#545862\",\"terminal.ansiBrightBlue\":\"#61AFEF\",\"terminal.ansiBrightCyan\":\"#56B6C2\",\"terminal.ansiBrightGreen\":\"#98C379\",\"terminal.ansiBrightMagenta\":\"#C678DD\",\"terminal.ansiBrightRed\":\"#E06C75\",\"terminal.ansiBrightWhite\":\"#C8CCD4\",\"terminal.ansiBrightYellow\":\"#E5C07B\",\"terminal.ansiCyan\":\"#56B6C2\",\"terminal.ansiGreen\":\"#98C379\",\"terminal.ansiMagenta\":\"#C678DD\",\"terminal.ansiRed\":\"#E06C75\",\"terminal.ansiWhite\":\"#ABB2BF\",\"terminal.ansiYellow\":\"#E5C07B\"}},{\"name\":\"Paraiso\",\"colors\":{\"terminal.background\":\"#2F1E2E\",\"terminal.foreground\":\"#A39E9B\",\"terminalCursor.background\":\"#A39E9B\",\"terminalCursor.foreground\":\"#A39E9B\",\"terminal.ansiBlack\":\"#2F1E2E\",\"terminal.ansiBlue\":\"#06B6EF\",\"terminal.ansiBrightBlack\":\"#776E71\",\"terminal.ansiBrightBlue\":\"#06B6EF\",\"terminal.ansiBrightCyan\":\"#5BC4BF\",\"terminal.ansiBrightGreen\":\"#48B685\",\"terminal.ansiBrightMagenta\":\"#815BA4\",\"terminal.ansiBrightRed\":\"#EF6155\",\"terminal.ansiBrightWhite\":\"#E7E9DB\",\"terminal.ansiBrightYellow\":\"#FEC418\",\"terminal.ansiCyan\":\"#5BC4BF\",\"terminal.ansiGreen\":\"#48B685\",\"terminal.ansiMagenta\":\"#815BA4\",\"terminal.ansiRed\":\"#EF6155\",\"terminal.ansiWhite\":\"#A39E9B\",\"terminal.ansiYellow\":\"#FEC418\"}},{\"name\":\"Phd\",\"colors\":{\"terminal.background\":\"#061229\",\"terminal.foreground\":\"#B8BBC2\",\"terminalCursor.background\":\"#B8BBC2\",\"terminalCursor.foreground\":\"#B8BBC2\",\"terminal.ansiBlack\":\"#061229\",\"terminal.ansiBlue\":\"#5299BF\",\"terminal.ansiBrightBlack\":\"#717885\",\"terminal.ansiBrightBlue\":\"#5299BF\",\"terminal.ansiBrightCyan\":\"#72B9BF\",\"terminal.ansiBrightGreen\":\"#99BF52\",\"terminal.ansiBrightMagenta\":\"#9989CC\",\"terminal.ansiBrightRed\":\"#D07346\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#FBD461\",\"terminal.ansiCyan\":\"#72B9BF\",\"terminal.ansiGreen\":\"#99BF52\",\"terminal.ansiMagenta\":\"#9989CC\",\"terminal.ansiRed\":\"#D07346\",\"terminal.ansiWhite\":\"#B8BBC2\",\"terminal.ansiYellow\":\"#FBD461\"}},{\"name\":\"Pico\",\"colors\":{\"terminal.background\":\"#000000\",\"terminal.foreground\":\"#5F574F\",\"terminalCursor.background\":\"#5F574F\",\"terminalCursor.foreground\":\"#5F574F\",\"terminal.ansiBlack\":\"#000000\",\"terminal.ansiBlue\":\"#83769C\",\"terminal.ansiBrightBlack\":\"#008751\",\"terminal.ansiBrightBlue\":\"#83769C\",\"terminal.ansiBrightCyan\":\"#29ADFF\",\"terminal.ansiBrightGreen\":\"#00E756\",\"terminal.ansiBrightMagenta\":\"#FF77A8\",\"terminal.ansiBrightRed\":\"#FF004D\",\"terminal.ansiBrightWhite\":\"#FFF1E8\",\"terminal.ansiBrightYellow\":\"#FFF024\",\"terminal.ansiCyan\":\"#29ADFF\",\"terminal.ansiGreen\":\"#00E756\",\"terminal.ansiMagenta\":\"#FF77A8\",\"terminal.ansiRed\":\"#FF004D\",\"terminal.ansiWhite\":\"#5F574F\",\"terminal.ansiYellow\":\"#FFF024\"}},{\"name\":\"Pop\",\"colors\":{\"terminal.background\":\"#000000\",\"terminal.foreground\":\"#D0D0D0\",\"terminalCursor.background\":\"#D0D0D0\",\"terminalCursor.foreground\":\"#D0D0D0\",\"terminal.ansiBlack\":\"#000000\",\"terminal.ansiBlue\":\"#0E5A94\",\"terminal.ansiBrightBlack\":\"#505050\",\"terminal.ansiBrightBlue\":\"#0E5A94\",\"terminal.ansiBrightCyan\":\"#00AABB\",\"terminal.ansiBrightGreen\":\"#37B349\",\"terminal.ansiBrightMagenta\":\"#B31E8D\",\"terminal.ansiBrightRed\":\"#EB008A\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#F8CA12\",\"terminal.ansiCyan\":\"#00AABB\",\"terminal.ansiGreen\":\"#37B349\",\"terminal.ansiMagenta\":\"#B31E8D\",\"terminal.ansiRed\":\"#EB008A\",\"terminal.ansiWhite\":\"#D0D0D0\",\"terminal.ansiYellow\":\"#F8CA12\"}},{\"name\":\"Porple\",\"colors\":{\"terminal.background\":\"#292C36\",\"terminal.foreground\":\"#D8D8D8\",\"terminalCursor.background\":\"#D8D8D8\",\"terminalCursor.foreground\":\"#D8D8D8\",\"terminal.ansiBlack\":\"#292C36\",\"terminal.ansiBlue\":\"#8485CE\",\"terminal.ansiBrightBlack\":\"#65568A\",\"terminal.ansiBrightBlue\":\"#8485CE\",\"terminal.ansiBrightCyan\":\"#64878F\",\"terminal.ansiBrightGreen\":\"#95C76F\",\"terminal.ansiBrightMagenta\":\"#B74989\",\"terminal.ansiBrightRed\":\"#F84547\",\"terminal.ansiBrightWhite\":\"#F8F8F8\",\"terminal.ansiBrightYellow\":\"#EFA16B\",\"terminal.ansiCyan\":\"#64878F\",\"terminal.ansiGreen\":\"#95C76F\",\"terminal.ansiMagenta\":\"#B74989\",\"terminal.ansiRed\":\"#F84547\",\"terminal.ansiWhite\":\"#D8D8D8\",\"terminal.ansiYellow\":\"#EFA16B\"}},{\"name\":\"Railscasts\",\"colors\":{\"terminal.background\":\"#2B2B2B\",\"terminal.foreground\":\"#E6E1DC\",\"terminalCursor.background\":\"#E6E1DC\",\"terminalCursor.foreground\":\"#E6E1DC\",\"terminal.ansiBlack\":\"#2B2B2B\",\"terminal.ansiBlue\":\"#6D9CBE\",\"terminal.ansiBrightBlack\":\"#5A647E\",\"terminal.ansiBrightBlue\":\"#6D9CBE\",\"terminal.ansiBrightCyan\":\"#519F50\",\"terminal.ansiBrightGreen\":\"#A5C261\",\"terminal.ansiBrightMagenta\":\"#B6B3EB\",\"terminal.ansiBrightRed\":\"#DA4939\",\"terminal.ansiBrightWhite\":\"#F9F7F3\",\"terminal.ansiBrightYellow\":\"#FFC66D\",\"terminal.ansiCyan\":\"#519F50\",\"terminal.ansiGreen\":\"#A5C261\",\"terminal.ansiMagenta\":\"#B6B3EB\",\"terminal.ansiRed\":\"#DA4939\",\"terminal.ansiWhite\":\"#E6E1DC\",\"terminal.ansiYellow\":\"#FFC66D\"}},{\"name\":\"Rebecca\",\"colors\":{\"terminal.background\":\"#292A44\",\"terminal.foreground\":\"#F1EFF8\",\"terminalCursor.background\":\"#F1EFF8\",\"terminalCursor.foreground\":\"#F1EFF8\",\"terminal.ansiBlack\":\"#292A44\",\"terminal.ansiBlue\":\"#2DE0A7\",\"terminal.ansiBrightBlack\":\"#666699\",\"terminal.ansiBrightBlue\":\"#2DE0A7\",\"terminal.ansiBrightCyan\":\"#8EAEE0\",\"terminal.ansiBrightGreen\":\"#6DFEDF\",\"terminal.ansiBrightMagenta\":\"#7AA5FF\",\"terminal.ansiBrightRed\":\"#A0A0C5\",\"terminal.ansiBrightWhite\":\"#53495D\",\"terminal.ansiBrightYellow\":\"#AE81FF\",\"terminal.ansiCyan\":\"#8EAEE0\",\"terminal.ansiGreen\":\"#6DFEDF\",\"terminal.ansiMagenta\":\"#7AA5FF\",\"terminal.ansiRed\":\"#A0A0C5\",\"terminal.ansiWhite\":\"#F1EFF8\",\"terminal.ansiYellow\":\"#AE81FF\"}},{\"name\":\"Seti\",\"colors\":{\"terminal.background\":\"#151718\",\"terminal.foreground\":\"#D6D6D6\",\"terminalCursor.background\":\"#D6D6D6\",\"terminalCursor.foreground\":\"#D6D6D6\",\"terminal.ansiBlack\":\"#151718\",\"terminal.ansiBlue\":\"#55B5DB\",\"terminal.ansiBrightBlack\":\"#41535B\",\"terminal.ansiBrightBlue\":\"#55B5DB\",\"terminal.ansiBrightCyan\":\"#55DBBE\",\"terminal.ansiBrightGreen\":\"#9FCA56\",\"terminal.ansiBrightMagenta\":\"#A074C4\",\"terminal.ansiBrightRed\":\"#CD3F45\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#E6CD69\",\"terminal.ansiCyan\":\"#55DBBE\",\"terminal.ansiGreen\":\"#9FCA56\",\"terminal.ansiMagenta\":\"#A074C4\",\"terminal.ansiRed\":\"#CD3F45\",\"terminal.ansiWhite\":\"#D6D6D6\",\"terminal.ansiYellow\":\"#E6CD69\"}},{\"name\":\"Shapeshifter\",\"colors\":{\"terminal.background\":\"#F9F9F9\",\"terminal.foreground\":\"#102015\",\"terminalCursor.background\":\"#102015\",\"terminalCursor.foreground\":\"#102015\",\"terminal.ansiBlack\":\"#F9F9F9\",\"terminal.ansiBlue\":\"#3B48E3\",\"terminal.ansiBrightBlack\":\"#555555\",\"terminal.ansiBrightBlue\":\"#3B48E3\",\"terminal.ansiBrightCyan\":\"#23EDDA\",\"terminal.ansiBrightGreen\":\"#0ED839\",\"terminal.ansiBrightMagenta\":\"#F996E2\",\"terminal.ansiBrightRed\":\"#E92F2F\",\"terminal.ansiBrightWhite\":\"#000000\",\"terminal.ansiBrightYellow\":\"#DDDD13\",\"terminal.ansiCyan\":\"#23EDDA\",\"terminal.ansiGreen\":\"#0ED839\",\"terminal.ansiMagenta\":\"#F996E2\",\"terminal.ansiRed\":\"#E92F2F\",\"terminal.ansiWhite\":\"#102015\",\"terminal.ansiYellow\":\"#DDDD13\"}},{\"name\":\"Solarflare\",\"colors\":{\"terminal.background\":\"#18262F\",\"terminal.foreground\":\"#A6AFB8\",\"terminalCursor.background\":\"#A6AFB8\",\"terminalCursor.foreground\":\"#A6AFB8\",\"terminal.ansiBlack\":\"#18262F\",\"terminal.ansiBlue\":\"#33B5E1\",\"terminal.ansiBrightBlack\":\"#667581\",\"terminal.ansiBrightBlue\":\"#33B5E1\",\"terminal.ansiBrightCyan\":\"#52CBB0\",\"terminal.ansiBrightGreen\":\"#7CC844\",\"terminal.ansiBrightMagenta\":\"#A363D5\",\"terminal.ansiBrightRed\":\"#EF5253\",\"terminal.ansiBrightWhite\":\"#F5F7FA\",\"terminal.ansiBrightYellow\":\"#E4B51C\",\"terminal.ansiCyan\":\"#52CBB0\",\"terminal.ansiGreen\":\"#7CC844\",\"terminal.ansiMagenta\":\"#A363D5\",\"terminal.ansiRed\":\"#EF5253\",\"terminal.ansiWhite\":\"#A6AFB8\",\"terminal.ansiYellow\":\"#E4B51C\"}},{\"name\":\"Solarized Dark\",\"colors\":{\"terminal.background\":\"#002B36\",\"terminal.foreground\":\"#93A1A1\",\"terminalCursor.background\":\"#93A1A1\",\"terminalCursor.foreground\":\"#93A1A1\",\"terminal.ansiBlack\":\"#002B36\",\"terminal.ansiBlue\":\"#268BD2\",\"terminal.ansiBrightBlack\":\"#657B83\",\"terminal.ansiBrightBlue\":\"#268BD2\",\"terminal.ansiBrightCyan\":\"#2AA198\",\"terminal.ansiBrightGreen\":\"#859900\",\"terminal.ansiBrightMagenta\":\"#6C71C4\",\"terminal.ansiBrightRed\":\"#DC322F\",\"terminal.ansiBrightWhite\":\"#FDF6E3\",\"terminal.ansiBrightYellow\":\"#B58900\",\"terminal.ansiCyan\":\"#2AA198\",\"terminal.ansiGreen\":\"#859900\",\"terminal.ansiMagenta\":\"#6C71C4\",\"terminal.ansiRed\":\"#DC322F\",\"terminal.ansiWhite\":\"#93A1A1\",\"terminal.ansiYellow\":\"#B58900\"}},{\"name\":\"Solarized Light\",\"colors\":{\"terminal.background\":\"#FDF6E3\",\"terminal.foreground\":\"#586E75\",\"terminalCursor.background\":\"#586E75\",\"terminalCursor.foreground\":\"#586E75\",\"terminal.ansiBlack\":\"#FDF6E3\",\"terminal.ansiBlue\":\"#268BD2\",\"terminal.ansiBrightBlack\":\"#839496\",\"terminal.ansiBrightBlue\":\"#268BD2\",\"terminal.ansiBrightCyan\":\"#2AA198\",\"terminal.ansiBrightGreen\":\"#859900\",\"terminal.ansiBrightMagenta\":\"#6C71C4\",\"terminal.ansiBrightRed\":\"#DC322F\",\"terminal.ansiBrightWhite\":\"#002B36\",\"terminal.ansiBrightYellow\":\"#B58900\",\"terminal.ansiCyan\":\"#2AA198\",\"terminal.ansiGreen\":\"#859900\",\"terminal.ansiMagenta\":\"#6C71C4\",\"terminal.ansiRed\":\"#DC322F\",\"terminal.ansiWhite\":\"#586E75\",\"terminal.ansiYellow\":\"#B58900\"}},{\"name\":\"Spacemacs\",\"colors\":{\"terminal.background\":\"#1F2022\",\"terminal.foreground\":\"#A3A3A3\",\"terminalCursor.background\":\"#A3A3A3\",\"terminalCursor.foreground\":\"#A3A3A3\",\"terminal.ansiBlack\":\"#1F2022\",\"terminal.ansiBlue\":\"#4F97D7\",\"terminal.ansiBrightBlack\":\"#585858\",\"terminal.ansiBrightBlue\":\"#4F97D7\",\"terminal.ansiBrightCyan\":\"#2D9574\",\"terminal.ansiBrightGreen\":\"#67B11D\",\"terminal.ansiBrightMagenta\":\"#A31DB1\",\"terminal.ansiBrightRed\":\"#F2241F\",\"terminal.ansiBrightWhite\":\"#F8F8F8\",\"terminal.ansiBrightYellow\":\"#B1951D\",\"terminal.ansiCyan\":\"#2D9574\",\"terminal.ansiGreen\":\"#67B11D\",\"terminal.ansiMagenta\":\"#A31DB1\",\"terminal.ansiRed\":\"#F2241F\",\"terminal.ansiWhite\":\"#A3A3A3\",\"terminal.ansiYellow\":\"#B1951D\"}},{\"name\":\"Summerfruit Dark\",\"colors\":{\"terminal.background\":\"#151515\",\"terminal.foreground\":\"#D0D0D0\",\"terminalCursor.background\":\"#D0D0D0\",\"terminalCursor.foreground\":\"#D0D0D0\",\"terminal.ansiBlack\":\"#151515\",\"terminal.ansiBlue\":\"#3777E6\",\"terminal.ansiBrightBlack\":\"#505050\",\"terminal.ansiBrightBlue\":\"#3777E6\",\"terminal.ansiBrightCyan\":\"#1FAAAA\",\"terminal.ansiBrightGreen\":\"#00C918\",\"terminal.ansiBrightMagenta\":\"#AD00A1\",\"terminal.ansiBrightRed\":\"#FF0086\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#ABA800\",\"terminal.ansiCyan\":\"#1FAAAA\",\"terminal.ansiGreen\":\"#00C918\",\"terminal.ansiMagenta\":\"#AD00A1\",\"terminal.ansiRed\":\"#FF0086\",\"terminal.ansiWhite\":\"#D0D0D0\",\"terminal.ansiYellow\":\"#ABA800\"}},{\"name\":\"Summerfruit Light\",\"colors\":{\"terminal.background\":\"#FFFFFF\",\"terminal.foreground\":\"#101010\",\"terminalCursor.background\":\"#101010\",\"terminalCursor.foreground\":\"#101010\",\"terminal.ansiBlack\":\"#FFFFFF\",\"terminal.ansiBlue\":\"#3777E6\",\"terminal.ansiBrightBlack\":\"#B0B0B0\",\"terminal.ansiBrightBlue\":\"#3777E6\",\"terminal.ansiBrightCyan\":\"#1FAAAA\",\"terminal.ansiBrightGreen\":\"#00C918\",\"terminal.ansiBrightMagenta\":\"#AD00A1\",\"terminal.ansiBrightRed\":\"#FF0086\",\"terminal.ansiBrightWhite\":\"#202020\",\"terminal.ansiBrightYellow\":\"#ABA800\",\"terminal.ansiCyan\":\"#1FAAAA\",\"terminal.ansiGreen\":\"#00C918\",\"terminal.ansiMagenta\":\"#AD00A1\",\"terminal.ansiRed\":\"#FF0086\",\"terminal.ansiWhite\":\"#101010\",\"terminal.ansiYellow\":\"#ABA800\"}},{\"name\":\"Tomorrow Night\",\"colors\":{\"terminal.background\":\"#1D1F21\",\"terminal.foreground\":\"#C5C8C6\",\"terminalCursor.background\":\"#C5C8C6\",\"terminalCursor.foreground\":\"#C5C8C6\",\"terminal.ansiBlack\":\"#1D1F21\",\"terminal.ansiBlue\":\"#81A2BE\",\"terminal.ansiBrightBlack\":\"#969896\",\"terminal.ansiBrightBlue\":\"#81A2BE\",\"terminal.ansiBrightCyan\":\"#8ABEB7\",\"terminal.ansiBrightGreen\":\"#B5BD68\",\"terminal.ansiBrightMagenta\":\"#B294BB\",\"terminal.ansiBrightRed\":\"#CC6666\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#F0C674\",\"terminal.ansiCyan\":\"#8ABEB7\",\"terminal.ansiGreen\":\"#B5BD68\",\"terminal.ansiMagenta\":\"#B294BB\",\"terminal.ansiRed\":\"#CC6666\",\"terminal.ansiWhite\":\"#C5C8C6\",\"terminal.ansiYellow\":\"#F0C674\"}},{\"name\":\"Tomorrow\",\"colors\":{\"terminal.background\":\"#FFFFFF\",\"terminal.foreground\":\"#4D4D4C\",\"terminalCursor.background\":\"#4D4D4C\",\"terminalCursor.foreground\":\"#4D4D4C\",\"terminal.ansiBlack\":\"#FFFFFF\",\"terminal.ansiBlue\":\"#4271AE\",\"terminal.ansiBrightBlack\":\"#8E908C\",\"terminal.ansiBrightBlue\":\"#4271AE\",\"terminal.ansiBrightCyan\":\"#3E999F\",\"terminal.ansiBrightGreen\":\"#718C00\",\"terminal.ansiBrightMagenta\":\"#8959A8\",\"terminal.ansiBrightRed\":\"#C82829\",\"terminal.ansiBrightWhite\":\"#1D1F21\",\"terminal.ansiBrightYellow\":\"#EAB700\",\"terminal.ansiCyan\":\"#3E999F\",\"terminal.ansiGreen\":\"#718C00\",\"terminal.ansiMagenta\":\"#8959A8\",\"terminal.ansiRed\":\"#C82829\",\"terminal.ansiWhite\":\"#4D4D4C\",\"terminal.ansiYellow\":\"#EAB700\"}},{\"name\":\"Tube\",\"colors\":{\"terminal.background\":\"#231F20\",\"terminal.foreground\":\"#D9D8D8\",\"terminalCursor.background\":\"#D9D8D8\",\"terminalCursor.foreground\":\"#D9D8D8\",\"terminal.ansiBlack\":\"#231F20\",\"terminal.ansiBlue\":\"#009DDC\",\"terminal.ansiBrightBlack\":\"#737171\",\"terminal.ansiBrightBlue\":\"#009DDC\",\"terminal.ansiBrightCyan\":\"#85CEBC\",\"terminal.ansiBrightGreen\":\"#00853E\",\"terminal.ansiBrightMagenta\":\"#98005D\",\"terminal.ansiBrightRed\":\"#EE2E24\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#FFD204\",\"terminal.ansiCyan\":\"#85CEBC\",\"terminal.ansiGreen\":\"#00853E\",\"terminal.ansiMagenta\":\"#98005D\",\"terminal.ansiRed\":\"#EE2E24\",\"terminal.ansiWhite\":\"#D9D8D8\",\"terminal.ansiYellow\":\"#FFD204\"}},{\"name\":\"Twilight\",\"colors\":{\"terminal.background\":\"#1E1E1E\",\"terminal.foreground\":\"#A7A7A7\",\"terminalCursor.background\":\"#A7A7A7\",\"terminalCursor.foreground\":\"#A7A7A7\",\"terminal.ansiBlack\":\"#1E1E1E\",\"terminal.ansiBlue\":\"#7587A6\",\"terminal.ansiBrightBlack\":\"#5F5A60\",\"terminal.ansiBrightBlue\":\"#7587A6\",\"terminal.ansiBrightCyan\":\"#AFC4DB\",\"terminal.ansiBrightGreen\":\"#8F9D6A\",\"terminal.ansiBrightMagenta\":\"#9B859D\",\"terminal.ansiBrightRed\":\"#CF6A4C\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#F9EE98\",\"terminal.ansiCyan\":\"#AFC4DB\",\"terminal.ansiGreen\":\"#8F9D6A\",\"terminal.ansiMagenta\":\"#9B859D\",\"terminal.ansiRed\":\"#CF6A4C\",\"terminal.ansiWhite\":\"#A7A7A7\",\"terminal.ansiYellow\":\"#F9EE98\"}},{\"name\":\"Unikitty Dark\",\"colors\":{\"terminal.background\":\"#2E2A31\",\"terminal.foreground\":\"#BCBABE\",\"terminalCursor.background\":\"#BCBABE\",\"terminalCursor.foreground\":\"#BCBABE\",\"terminal.ansiBlack\":\"#2E2A31\",\"terminal.ansiBlue\":\"#796AF5\",\"terminal.ansiBrightBlack\":\"#838085\",\"terminal.ansiBrightBlue\":\"#796AF5\",\"terminal.ansiBrightCyan\":\"#149BDA\",\"terminal.ansiBrightGreen\":\"#17AD98\",\"terminal.ansiBrightMagenta\":\"#BB60EA\",\"terminal.ansiBrightRed\":\"#D8137F\",\"terminal.ansiBrightWhite\":\"#F5F4F7\",\"terminal.ansiBrightYellow\":\"#DC8A0E\",\"terminal.ansiCyan\":\"#149BDA\",\"terminal.ansiGreen\":\"#17AD98\",\"terminal.ansiMagenta\":\"#BB60EA\",\"terminal.ansiRed\":\"#D8137F\",\"terminal.ansiWhite\":\"#BCBABE\",\"terminal.ansiYellow\":\"#DC8A0E\"}},{\"name\":\"Unikitty Light\",\"colors\":{\"terminal.background\":\"#FFFFFF\",\"terminal.foreground\":\"#6C696E\",\"terminalCursor.background\":\"#6C696E\",\"terminalCursor.foreground\":\"#6C696E\",\"terminal.ansiBlack\":\"#FFFFFF\",\"terminal.ansiBlue\":\"#775DFF\",\"terminal.ansiBrightBlack\":\"#A7A5A8\",\"terminal.ansiBrightBlue\":\"#775DFF\",\"terminal.ansiBrightCyan\":\"#149BDA\",\"terminal.ansiBrightGreen\":\"#17AD98\",\"terminal.ansiBrightMagenta\":\"#AA17E6\",\"terminal.ansiBrightRed\":\"#D8137F\",\"terminal.ansiBrightWhite\":\"#322D34\",\"terminal.ansiBrightYellow\":\"#DC8A0E\",\"terminal.ansiCyan\":\"#149BDA\",\"terminal.ansiGreen\":\"#17AD98\",\"terminal.ansiMagenta\":\"#AA17E6\",\"terminal.ansiRed\":\"#D8137F\",\"terminal.ansiWhite\":\"#6C696E\",\"terminal.ansiYellow\":\"#DC8A0E\"}},{\"name\":\"Woodland\",\"colors\":{\"terminal.background\":\"#231E18\",\"terminal.foreground\":\"#CABCB1\",\"terminalCursor.background\":\"#CABCB1\",\"terminalCursor.foreground\":\"#CABCB1\",\"terminal.ansiBlack\":\"#231E18\",\"terminal.ansiBlue\":\"#88A4D3\",\"terminal.ansiBrightBlack\":\"#9D8B70\",\"terminal.ansiBrightBlue\":\"#88A4D3\",\"terminal.ansiBrightCyan\":\"#6EB958\",\"terminal.ansiBrightGreen\":\"#B7BA53\",\"terminal.ansiBrightMagenta\":\"#BB90E2\",\"terminal.ansiBrightRed\":\"#D35C5C\",\"terminal.ansiBrightWhite\":\"#E4D4C8\",\"terminal.ansiBrightYellow\":\"#E0AC16\",\"terminal.ansiCyan\":\"#6EB958\",\"terminal.ansiGreen\":\"#B7BA53\",\"terminal.ansiMagenta\":\"#BB90E2\",\"terminal.ansiRed\":\"#D35C5C\",\"terminal.ansiWhite\":\"#CABCB1\",\"terminal.ansiYellow\":\"#E0AC16\"}},{\"name\":\"Xcode Dusk\",\"colors\":{\"terminal.background\":\"#282B35\",\"terminal.foreground\":\"#939599\",\"terminalCursor.background\":\"#939599\",\"terminalCursor.foreground\":\"#939599\",\"terminal.ansiBlack\":\"#282B35\",\"terminal.ansiBlue\":\"#790EAD\",\"terminal.ansiBrightBlack\":\"#686A71\",\"terminal.ansiBrightBlue\":\"#790EAD\",\"terminal.ansiBrightCyan\":\"#00A0BE\",\"terminal.ansiBrightGreen\":\"#DF0002\",\"terminal.ansiBrightMagenta\":\"#B21889\",\"terminal.ansiBrightRed\":\"#B21889\",\"terminal.ansiBrightWhite\":\"#BEBFC2\",\"terminal.ansiBrightYellow\":\"#438288\",\"terminal.ansiCyan\":\"#00A0BE\",\"terminal.ansiGreen\":\"#DF0002\",\"terminal.ansiMagenta\":\"#B21889\",\"terminal.ansiRed\":\"#B21889\",\"terminal.ansiWhite\":\"#939599\",\"terminal.ansiYellow\":\"#438288\"}},{\"name\":\"Zenburn\",\"colors\":{\"terminal.background\":\"#3F3F3F\",\"terminal.foreground\":\"#DCDCCC\",\"terminalCursor.background\":\"#DCDCCC\",\"terminalCursor.foreground\":\"#DCDCCC\",\"terminal.ansiBlack\":\"#3F3F3F\",\"terminal.ansiBlue\":\"#7CB8BB\",\"terminal.ansiBrightBlack\":\"#4F4F4F\",\"terminal.ansiBrightBlue\":\"#7CB8BB\",\"terminal.ansiBrightCyan\":\"#93E0E3\",\"terminal.ansiBrightGreen\":\"#5F7F5F\",\"terminal.ansiBrightMagenta\":\"#DC8CC3\",\"terminal.ansiBrightRed\":\"#DCA3A3\",\"terminal.ansiBrightWhite\":\"#FFFFFF\",\"terminal.ansiBrightYellow\":\"#E0CF9F\",\"terminal.ansiCyan\":\"#93E0E3\",\"terminal.ansiGreen\":\"#5F7F5F\",\"terminal.ansiMagenta\":\"#DC8CC3\",\"terminal.ansiRed\":\"#DCA3A3\",\"terminal.ansiWhite\":\"#DCDCCC\",\"terminal.ansiYellow\":\"#E0CF9F\"}},{\"name\":\"None\",\"colors\":{}}]");

/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vscode");

/***/ })

/******/ });
//# sourceMappingURL=extension.js.map