window["pyro"] = window["pyro"] || {}; window["pyro"]["anomaly__streams_platform"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"anomaly__streams_platform": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "/assets";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/js-cookie/src/js.cookie.js":
/*!*************************************************!*\
  !*** ./node_modules/js-cookie/src/js.cookie.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),

/***/ "./node_modules/lz-string/libs/lz-string.js":
/*!**************************************************!*\
  !*** ./node_modules/lz-string/libs/lz-string.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.4
var LZString = (function() {

// private property
var f = String.fromCharCode;
var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
var baseReverseDic = {};

function getBaseValue(alphabet, character) {
  if (!baseReverseDic[alphabet]) {
    baseReverseDic[alphabet] = {};
    for (var i=0 ; i<alphabet.length ; i++) {
      baseReverseDic[alphabet][alphabet.charAt(i)] = i;
    }
  }
  return baseReverseDic[alphabet][character];
}

var LZString = {
  compressToBase64 : function (input) {
    if (input == null) return "";
    var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
    switch (res.length % 4) { // To produce valid Base64
    default: // When could this happen ?
    case 0 : return res;
    case 1 : return res+"===";
    case 2 : return res+"==";
    case 3 : return res+"=";
    }
  },

  decompressFromBase64 : function (input) {
    if (input == null) return "";
    if (input == "") return null;
    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
  },

  compressToUTF16 : function (input) {
    if (input == null) return "";
    return LZString._compress(input, 15, function(a){return f(a+32);}) + " ";
  },

  decompressFromUTF16: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
  },

  //compress into uint8array (UCS-2 big endian format)
  compressToUint8Array: function (uncompressed) {
    var compressed = LZString.compress(uncompressed);
    var buf=new Uint8Array(compressed.length*2); // 2 bytes per character

    for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
      var current_value = compressed.charCodeAt(i);
      buf[i*2] = current_value >>> 8;
      buf[i*2+1] = current_value % 256;
    }
    return buf;
  },

  //decompress from uint8array (UCS-2 big endian format)
  decompressFromUint8Array:function (compressed) {
    if (compressed===null || compressed===undefined){
        return LZString.decompress(compressed);
    } else {
        var buf=new Array(compressed.length/2); // 2 bytes per character
        for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
          buf[i]=compressed[i*2]*256+compressed[i*2+1];
        }

        var result = [];
        buf.forEach(function (c) {
          result.push(f(c));
        });
        return LZString.decompress(result.join(''));

    }

  },


  //compress into a string that is already URI encoded
  compressToEncodedURIComponent: function (input) {
    if (input == null) return "";
    return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
  },

  //decompress from an output of compressToEncodedURIComponent
  decompressFromEncodedURIComponent:function (input) {
    if (input == null) return "";
    if (input == "") return null;
    input = input.replace(/ /g, "+");
    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
  },

  compress: function (uncompressed) {
    return LZString._compress(uncompressed, 16, function(a){return f(a);});
  },
  _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
    if (uncompressed == null) return "";
    var i, value,
        context_dictionary= {},
        context_dictionaryToCreate= {},
        context_c="",
        context_wc="",
        context_w="",
        context_enlargeIn= 2, // Compensate for the first entry which should not count
        context_dictSize= 3,
        context_numBits= 2,
        context_data=[],
        context_data_val=0,
        context_data_position=0,
        ii;

    for (ii = 0; ii < uncompressed.length; ii += 1) {
      context_c = uncompressed.charAt(ii);
      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
        context_dictionary[context_c] = context_dictSize++;
        context_dictionaryToCreate[context_c] = true;
      }

      context_wc = context_w + context_c;
      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
        context_w = context_wc;
      } else {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
          if (context_w.charCodeAt(0)<256) {
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<8 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position ==bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<16 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }


        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        // Add wc to the dictionary.
        context_dictionary[context_wc] = context_dictSize++;
        context_w = String(context_c);
      }
    }

    // Output the code for w.
    if (context_w !== "") {
      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
        if (context_w.charCodeAt(0)<256) {
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<8 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        } else {
          value = 1;
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | value;
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = 0;
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<16 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        delete context_dictionaryToCreate[context_w];
      } else {
        value = context_dictionary[context_w];
        for (i=0 ; i<context_numBits ; i++) {
          context_data_val = (context_data_val << 1) | (value&1);
          if (context_data_position == bitsPerChar-1) {
            context_data_position = 0;
            context_data.push(getCharFromInt(context_data_val));
            context_data_val = 0;
          } else {
            context_data_position++;
          }
          value = value >> 1;
        }


      }
      context_enlargeIn--;
      if (context_enlargeIn == 0) {
        context_enlargeIn = Math.pow(2, context_numBits);
        context_numBits++;
      }
    }

    // Mark the end of the stream
    value = 2;
    for (i=0 ; i<context_numBits ; i++) {
      context_data_val = (context_data_val << 1) | (value&1);
      if (context_data_position == bitsPerChar-1) {
        context_data_position = 0;
        context_data.push(getCharFromInt(context_data_val));
        context_data_val = 0;
      } else {
        context_data_position++;
      }
      value = value >> 1;
    }

    // Flush the last char
    while (true) {
      context_data_val = (context_data_val << 1);
      if (context_data_position == bitsPerChar-1) {
        context_data.push(getCharFromInt(context_data_val));
        break;
      }
      else context_data_position++;
    }
    return context_data.join('');
  },

  decompress: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
  },

  _decompress: function (length, resetValue, getNextValue) {
    var dictionary = [],
        next,
        enlargeIn = 4,
        dictSize = 4,
        numBits = 3,
        entry = "",
        result = [],
        i,
        w,
        bits, resb, maxpower, power,
        c,
        data = {val:getNextValue(0), position:resetValue, index:1};

    for (i = 0; i < 3; i += 1) {
      dictionary[i] = i;
    }

    bits = 0;
    maxpower = Math.pow(2,2);
    power=1;
    while (power!=maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position == 0) {
        data.position = resetValue;
        data.val = getNextValue(data.index++);
      }
      bits |= (resb>0 ? 1 : 0) * power;
      power <<= 1;
    }

    switch (next = bits) {
      case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 2:
        return "";
    }
    dictionary[3] = c;
    w = c;
    result.push(c);
    while (true) {
      if (data.index > length) {
        return "";
      }

      bits = 0;
      maxpower = Math.pow(2,numBits);
      power=1;
      while (power!=maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position == 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        bits |= (resb>0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (c = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }

          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 2:
          return result.join('');
      }

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

      if (dictionary[c]) {
        entry = dictionary[c];
      } else {
        if (c === dictSize) {
          entry = w + w.charAt(0);
        } else {
          return null;
        }
      }
      result.push(entry);

      // Add w+entry[0] to the dictionary.
      dictionary[dictSize++] = w + entry.charAt(0);
      enlargeIn--;

      w = entry;

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

    }
  }
};
  return LZString;
})();

if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return LZString; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/Application.js":
/*!**********************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/Application.js ***!
  \**********************************************************************/
/*! exports provided: Application */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return Application; });
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_function_bind__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.function.bind */ "./node_modules/core-js/modules/es.function.bind.js");
/* harmony import */ var core_js_modules_es_function_bind__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_bind__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lodash/merge */ "./node_modules/lodash/merge.js");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _Dispatcher__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Dispatcher */ "./vendor/anomaly/streams-platform/resources/src/Dispatcher.js");
/* harmony import */ var _ServiceProvider__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./ServiceProvider */ "./vendor/anomaly/streams-platform/resources/src/ServiceProvider.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./Config */ "./vendor/anomaly/streams-platform/resources/src/Config.js");






















 // import {Config, IConfig, IServiceProviderClass, loadConfigDefaults, ServiceProvider} from '@pyro/platform';





var log = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('flow-theme:Application');

var getConfigDefaults = function getConfigDefaults() {
  return {
    prefix: 'py',
    debug: false,
    csrf: null,
    delimiters: ['\{\{', '}}']
  };
};

var Application =
/*#__PURE__*/
function (_Container) {
  Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_19__["default"])(Application, _Container);

  function Application() {
    var _this;

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_14__["default"])(this, Application);

    _this = Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_16__["default"])(this, Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_17__["default"])(Application).call(this, {
      autoBindInjectable: false,
      defaultScope: 'Transient',
      skipBaseClassChecks: false
    }));

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_20__["default"])(Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_18__["default"])(_this), "register",
    /*#__PURE__*/
    function () {
      var _ref = Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13__["default"])(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(Provider) {
        var provider;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                log('register', {
                  Provider: Provider
                });

                _this.events.emit('app:provider:register', Provider);

                provider = Provider;

                if (!(Provider instanceof _ServiceProvider__WEBPACK_IMPORTED_MODULE_24__["ServiceProvider"] === false)) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return _this.loadProvider(Provider);

              case 6:
                provider = _context.sent;

              case 7:
                if (!('register' in provider && Reflect.getMetadata('register', provider) !== true)) {
                  _context.next = 11;
                  break;
                }

                Reflect.defineMetadata('register', true, provider);
                _context.next = 11;
                return _this.loadAsync(new inversify__WEBPACK_IMPORTED_MODULE_22__["AsyncContainerModule"](function () {
                  return provider.register();
                }));

              case 11:
                _this.providers.push(provider);

                _this.events.emit('app:provider:registered', provider);

                return _context.abrupt("return", Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_18__["default"])(_this));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_20__["default"])(Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_18__["default"])(_this), "boot",
    /*#__PURE__*/
    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13__["default"])(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, provider;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!_this.booted) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_18__["default"])(_this));

            case 2:
              log('boot');
              _this.booted = true;

              _this.events.emit('app:boot');

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 8;
              _iterator = _this.providers[Symbol.iterator]();

            case 10:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 21;
                break;
              }

              provider = _step.value;

              if (!('boot' in provider && Reflect.getMetadata('boot', provider) !== true)) {
                _context2.next = 18;
                break;
              }

              _this.events.emit('app:provider:booting', provider);

              Reflect.defineMetadata('boot', true, provider);
              _context2.next = 17;
              return provider.boot();

            case 17:
              _this.events.emit('app:provider:booted', provider);

            case 18:
              _iteratorNormalCompletion = true;
              _context2.next = 10;
              break;

            case 21:
              _context2.next = 27;
              break;

            case 23:
              _context2.prev = 23;
              _context2.t0 = _context2["catch"](8);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 27:
              _context2.prev = 27;
              _context2.prev = 28;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 30:
              _context2.prev = 30;

              if (!_didIteratorError) {
                _context2.next = 33;
                break;
              }

              throw _iteratorError;

            case 33:
              return _context2.finish(30);

            case 34:
              return _context2.finish(27);

            case 35:
              _this.events.emit('app:booted');

              return _context2.abrupt("return", Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_18__["default"])(_this));

            case 37:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[8, 23, 27, 35], [28,, 30, 34]]);
    })));

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_20__["default"])(Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_18__["default"])(_this), "start",
    /*#__PURE__*/
    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13__["default"])(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var elementOrSelector,
          _args3 = arguments;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              elementOrSelector = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : '#app';
              log('start', {
                elementOrSelector: elementOrSelector,
                data: _this.data,
                Root: _this.Root
              });

              _this.events.emit('app:start', elementOrSelector, {});

              _this.root = new _this.Root({
                data: function data() {
                  return _this.data;
                }
              });

              _this.root.$mount(elementOrSelector);

              _this.events.emit('app:started');

              log('started', _this.root);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_20__["default"])(Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_18__["default"])(_this), "error",
    /*#__PURE__*/
    function () {
      var _ref4 = Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13__["default"])(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(error) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                log('error', {
                  error: error
                });

                _this.events.emit('app:error', error);

                throw error;

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }());

    _this.Root = vue__WEBPACK_IMPORTED_MODULE_21___default.a.extend({});
    _this.loadedProviders = {};
    _this.providers = [];
    _this.booted = false;
    _this.started = false;
    _this.shuttingDown = false;
    _this.startEnabled = true;

    _this.instance('app', Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_18__["default"])(_this));

    _this.singleton('events', _Dispatcher__WEBPACK_IMPORTED_MODULE_23__["Dispatcher"]);

    return _this;
  }

  Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_15__["default"])(Application, [{
    key: "extendRoot",
    value: function extendRoot(options) {
      this.Root = this.Root.extend(options);
      return this;
    }
    /** @return {Storage} */

  }, {
    key: "bootstrap",
    value: function () {
      var _bootstrap = Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13__["default"])(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_options) {
        var _len,
            mergeOptions,
            _key,
            options,
            _args5 = arguments;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                for (_len = _args5.length, mergeOptions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  mergeOptions[_key - 1] = _args5[_key];
                }

                options = lodash_merge__WEBPACK_IMPORTED_MODULE_11___default.a.apply(void 0, [{
                  providers: [],
                  config: {},
                  data: {}
                }, _options].concat(mergeOptions));
                log('bootstrap', {
                  options: options
                });
                this.events.emit('app:bootstrap', options); //this.hooks.bootstrap.call(options);

                this.instance('data', _Config__WEBPACK_IMPORTED_MODULE_25__["Config"].proxied(options.data));
                this.addBindingGetter('data');
                _context5.next = 8;
                return this.loadProviders(options.providers);

              case 8:
                this.configure(options.config);
                _context5.next = 11;
                return this.registerProviders(this.providers);

              case 11:
                this.events.emit('app:bootstrapped', options);
                return _context5.abrupt("return", this);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function bootstrap(_x3) {
        return _bootstrap.apply(this, arguments);
      }

      return bootstrap;
    }()
  }, {
    key: "loadProviders",
    value: function () {
      var _loadProviders = Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13__["default"])(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(Providers) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                log('loadProviders', {
                  Providers: Providers
                });
                this.events.emit('loadProviders', Providers);
                _context7.next = 4;
                return Promise.all(Providers.map(
                /*#__PURE__*/
                function () {
                  var _ref5 = Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13__["default"])(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee6(Provider) {
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            return _context6.abrupt("return", _this2.loadProvider(Provider));

                          case 1:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  }));

                  return function (_x5) {
                    return _ref5.apply(this, arguments);
                  };
                }()));

              case 4:
                this.events.emit('loadedProviders', this.providers);
                return _context7.abrupt("return", this);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function loadProviders(_x4) {
        return _loadProviders.apply(this, arguments);
      }

      return loadProviders;
    }()
  }, {
    key: "loadProvider",
    value: function () {
      var _loadProvider = Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13__["default"])(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(Provider) {
        var provider, defaults;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(Provider.name in this.loadedProviders)) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return", this.loadedProviders[Provider.name]);

              case 2:
                log('loadProvider', {
                  Provider: Provider
                });
                this.events.emit('app:provider:load', Provider);
                provider = new Provider(this);

                if (!('configure' in provider && Reflect.getMetadata('configure', provider) !== true)) {
                  _context8.next = 10;
                  break;
                }

                defaults = getConfigDefaults();
                Reflect.defineMetadata('configure', true, provider);
                _context8.next = 10;
                return provider.configure(defaults);

              case 10:
                if (!('providers' in provider && Reflect.getMetadata('providers', provider) !== true)) {
                  _context8.next = 14;
                  break;
                }

                Reflect.defineMetadata('providers', true, provider);
                _context8.next = 14;
                return this.loadProviders(provider.providers);

              case 14:
                this.loadedProviders[Provider.name] = provider;
                this.providers.push(provider);
                this.events.emit('app:provider:loaded', provider);
                return _context8.abrupt("return", provider);

              case 18:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function loadProvider(_x6) {
        return _loadProvider.apply(this, arguments);
      }

      return loadProvider;
    }()
  }, {
    key: "configure",
    value: function configure(config) {
      config = lodash_merge__WEBPACK_IMPORTED_MODULE_11___default()({}, getConfigDefaults, config);
      this.events.emit('app:configure', config);
      var instance = _Config__WEBPACK_IMPORTED_MODULE_25__["Config"].proxied(config);
      this.instance('config', instance);
      this.events.emit('app:configured', instance);
      return this;
    }
  }, {
    key: "registerProviders",
    value: function () {
      var _registerProviders = Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13__["default"])(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10() {
        var _this3 = this;

        var providers,
            _args10 = arguments;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                providers = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : this.providers;
                this.events.emit('app:registerProviders', providers);
                _context10.next = 4;
                return Promise.all(this.providers.map(
                /*#__PURE__*/
                function () {
                  var _ref6 = Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13__["default"])(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee9(Provider) {
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            return _context9.abrupt("return", _this3.register(Provider));

                          case 1:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  return function (_x7) {
                    return _ref6.apply(this, arguments);
                  };
                }()));

              case 4:
                this.events.emit('app:registeredProviders', providers);
                return _context10.abrupt("return", this);

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function registerProviders() {
        return _registerProviders.apply(this, arguments);
      }

      return registerProviders;
    }()
  }, {
    key: "addBindingGetter",
    value: function addBindingGetter(id) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      key = key || id;
      var self = this;
      Object.defineProperty(this, key, {
        get: function get() {
          return self.get(id);
        }
      });
    } //region: ioc

  }, {
    key: "alias",
    value: function alias(_abstract, _alias) {
      var singleton = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var binding = this.bind(_alias).toDynamicValue(function (ctx) {
        return ctx.container.get(_abstract);
      });

      if (singleton) {
        binding.inSingletonScope();
      }

      return this;
    }
  }, {
    key: "bindIf",
    value: function bindIf(id, override, cb) {
      if (this.isBound(id) && !override) return this;
      cb(this.isBound(id) ? this.rebind(id) : this.bind(id));
      return this;
    }
  }, {
    key: "dynamic",
    value: function dynamic(id, cb) {
      var _this4 = this;

      return this.bind(id).toDynamicValue(function (ctx) {
        var req = ctx.currentRequest;
        return cb(_this4);
      });
    }
  }, {
    key: "singleton",
    value: function singleton(id, value) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return this.bindIf(id, override, function (b) {
        return b.to(value).inSingletonScope();
      });
    }
  }, {
    key: "binding",
    value: function binding(id, value) {
      return this;
    }
  }, {
    key: "instance",
    value: function instance(id, value) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return this.bindIf(id, override, function (b) {
        return b.toConstantValue(value);
      });
    }
  }, {
    key: "ctxfactory",
    value: function ctxfactory(id, factory) {
      this.bind(id).toFactory(function (ctx) {
        return factory(ctx);
      });
      return this;
    }
  }, {
    key: "factory",
    value: function factory(id, _factory) {
      this.bind(id).toFactory(function (ctx) {
        return _factory;
      });
      return this;
    } //endregion

  }, {
    key: "storage",
    get: function get() {
      return this.get('storage');
    }
    /** @return {Cookies} */

  }, {
    key: "cookies",
    get: function get() {
      return this.get('cookies');
    }
    /** @return {Dispatcher} */

  }, {
    key: "events",
    get: function get() {
      return this.get('events');
    }
    /** @return {Config} */

  }, {
    key: "data",
    get: function get() {
      return this.get('data');
    }
  }]);

  return Application;
}(inversify__WEBPACK_IMPORTED_MODULE_22__["Container"]);

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/Config.js":
/*!*****************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/Config.js ***!
  \*****************************************************************/
/*! exports provided: Config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/merge */ "./node_modules/lodash/merge.js");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_unset__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/unset */ "./node_modules/lodash/unset.js");
/* harmony import */ var lodash_unset__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_unset__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/has */ "./node_modules/lodash/has.js");
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_has__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash/set */ "./node_modules/lodash/set.js");
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_set__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _utils_toJS__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/toJS */ "./vendor/anomaly/streams-platform/resources/src/utils/toJS.js");














var Config =
/*#__PURE__*/
function () {
  /** @var {Application} app */
  function Config() {
    var _this = this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_10__["default"])(this, Config);

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(this, "get", function (path, defaultValue) {
      return lodash_get__WEBPACK_IMPORTED_MODULE_9___default()(_this.data, path, defaultValue);
    });

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(this, "set", function (path, value) {
      return lodash_set__WEBPACK_IMPORTED_MODULE_8___default()(_this.data, path, value);
    });

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(this, "has", function (path) {
      return lodash_has__WEBPACK_IMPORTED_MODULE_7___default()(_this.data, path);
    });

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(this, "unset", function (path) {
      return lodash_unset__WEBPACK_IMPORTED_MODULE_6___default()(_this.data, path);
    });

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(this, "merge", function (value) {
      return lodash_merge__WEBPACK_IMPORTED_MODULE_5___default()(_this.data, value);
    });

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(this, "mergeAt", function (path, value) {
      return _this.set(path, lodash_merge__WEBPACK_IMPORTED_MODULE_5___default()({}, _this.get(path, {}), value));
    });

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(this, "pushTo", function (path) {
      for (var _len = arguments.length, items = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        items[_key - 1] = arguments[_key];
      }

      return _this.set(path, _this.get(path, []).concat(items));
    });

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(this, "raw", function () {
      return _this.data;
    });

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(this, "getClone", function (path) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return path ? lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4___default()(_this.get(path, defaultValue)) : lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_4___default()(_this.raw());
    });

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(this, "toJS", function (path) {
      return path ? Object(_utils_toJS__WEBPACK_IMPORTED_MODULE_13__["toJS"])(lodash_get__WEBPACK_IMPORTED_MODULE_9___default()(_this.data, path)) : Object(_utils_toJS__WEBPACK_IMPORTED_MODULE_13__["toJS"])(_this.data);
    });

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(this, "proxy", function (path) {
      var prefix = function prefix(p) {
        return path + '.' + p.toString();
      };

      return new Proxy(_this, {
        get: function get(target, p, receiver) {
          if (target.has(prefix(p))) {
            return target.get(prefix(p));
          }

          return target[p];
        },
        set: function set(target, p, value, receiver) {
          target.set(prefix(p), value);
          return true;
        },
        has: function has(target, p) {
          return target.has(prefix(p));
        }
      });
    });

    this.data = data;
  }

  Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_11__["default"])(Config, null, [{
    key: "proxied",
    value: function proxied(data) {
      return new Proxy(new Config(data), {
        get: function get(target, p, receiver) {
          if (target.has(p.toString())) {
            return target.get(p.toString());
          }

          return target[p];
        },
        set: function set(target, p, value, receiver) {
          target.set(p.toString(), value);
          return true;
        },
        has: function has(target, p) {
          return target.has(p.toString());
        }
      });
    }
  }]);

  return Config;
}();

Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_12__["default"])(Config, "app", void 0);

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/Dispatcher.js":
/*!*********************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/Dispatcher.js ***!
  \*********************************************************************/
/*! exports provided: Dispatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dispatcher", function() { return Dispatcher; });
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_4__);




var _dec, _class;



var v = new vue__WEBPACK_IMPORTED_MODULE_3___default.a();
var Dispatcher = (_dec = Object(inversify__WEBPACK_IMPORTED_MODULE_4__["injectable"])(), _dec(_class =
/*#__PURE__*/
function () {
  function Dispatcher() {
    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Dispatcher);
  }

  Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Dispatcher, [{
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      v.$emit.apply(v, [event].concat(args));
      return this;
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      v.$on(event, callback);
      return this;
    }
  }, {
    key: "once",
    value: function once(event, callback) {
      v.$once(event, callback);
      return this;
    }
  }, {
    key: "off",
    value: function off(event, callback) {
      v.$off(event, callback);
      return this;
    }
  }]);

  return Dispatcher;
}()) || _class);

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/PlatformServiceProvider.js":
/*!**********************************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/PlatformServiceProvider.js ***!
  \**********************************************************************************/
/*! exports provided: PlatformServiceProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformServiceProvider", function() { return PlatformServiceProvider; });
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _ServiceProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ServiceProvider */ "./vendor/anomaly/streams-platform/resources/src/ServiceProvider.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./vendor/anomaly/streams-platform/resources/src/utils/index.js");







var PlatformServiceProvider =
/*#__PURE__*/
function (_ServiceProvider) {
  Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(PlatformServiceProvider, _ServiceProvider);

  function PlatformServiceProvider() {
    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, PlatformServiceProvider);

    return Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(PlatformServiceProvider).apply(this, arguments));
  }

  Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(PlatformServiceProvider, [{
    key: "register",
    value: function register() {
      this.app.singleton('storage', _utils__WEBPACK_IMPORTED_MODULE_6__["Storage"]);
      this.app.singleton('cookies', _utils__WEBPACK_IMPORTED_MODULE_6__["Cookies"]);
      this.app.singleton('agent', _utils__WEBPACK_IMPORTED_MODULE_6__["Agent"]);
    }
  }]);

  return PlatformServiceProvider;
}(_ServiceProvider__WEBPACK_IMPORTED_MODULE_5__["ServiceProvider"]);

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/ServiceProvider.js":
/*!**************************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/ServiceProvider.js ***!
  \**************************************************************************/
/*! exports provided: ServiceProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceProvider", function() { return ServiceProvider; });
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Application */ "./vendor/anomaly/streams-platform/resources/src/Application.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_4__);





var ServiceProvider =
/*#__PURE__*/
function () {
  /**
   * @param {Application} app
   */
  function ServiceProvider(app) {
    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ServiceProvider);

    this.app = app;
    console.log('ServiceProvider', (this instanceof ServiceProvider ? this.constructor : void 0).name);
  }

  Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(ServiceProvider, [{
    key: "vuePlugin",
    value: function vuePlugin(plugin) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.app.events.on('app:booted', function () {
        vue__WEBPACK_IMPORTED_MODULE_4___default.a.use(plugin, options);
      });
      return this;
    }
  }]);

  return ServiceProvider;
}();

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/VuePlugin.js":
/*!********************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/VuePlugin.js ***!
  \********************************************************************/
/*! exports provided: VuePlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VuePlugin", function() { return VuePlugin; });
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app */ "./vendor/anomaly/streams-platform/resources/src/app.js");
/* harmony import */ var _utils_prefixAndRegisterComponents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/prefixAndRegisterComponents */ "./vendor/anomaly/streams-platform/resources/src/utils/prefixAndRegisterComponents.js");






var log = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('utils:registerComponents');

var VuePlugin =
/*#__PURE__*/
function () {
  function VuePlugin() {
    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, VuePlugin);
  }

  Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(VuePlugin, null, [{
    key: "install",

    /**
     * @param {VueConstructor} Vue
     * @param {any} options
     */
    value: function install(Vue) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    }
  }, {
    key: "app",
    get: function get() {
      return _app__WEBPACK_IMPORTED_MODULE_3__["app"];
    }
  }]);

  return VuePlugin;
}();

Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(VuePlugin, "installed", false);

Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(VuePlugin, "prefixAndRegisterComponents", _utils_prefixAndRegisterComponents__WEBPACK_IMPORTED_MODULE_4__["prefixAndRegisterComponents"]);

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/app.js":
/*!**************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/app.js ***!
  \**************************************************************/
/*! exports provided: app, inject, provide, buildProviderModule, fluentProvide, autoProvide, injectable, unmanaged, optional, decorate, named, tagged, postConstruct */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "app", function() { return app; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inject", function() { return inject; });
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Application */ "./vendor/anomaly/streams-platform/resources/src/Application.js");
/* harmony import */ var inversify_binding_decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! inversify-binding-decorators */ "./node_modules/inversify-binding-decorators/lib/index.js");
/* harmony import */ var inversify_binding_decorators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(inversify_binding_decorators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "provide", function() { return inversify_binding_decorators__WEBPACK_IMPORTED_MODULE_1__["provide"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildProviderModule", function() { return inversify_binding_decorators__WEBPACK_IMPORTED_MODULE_1__["buildProviderModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fluentProvide", function() { return inversify_binding_decorators__WEBPACK_IMPORTED_MODULE_1__["fluentProvide"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "autoProvide", function() { return inversify_binding_decorators__WEBPACK_IMPORTED_MODULE_1__["autoProvide"]; });

/* harmony import */ var inversify_inject_decorators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! inversify-inject-decorators */ "./node_modules/inversify-inject-decorators/lib/index.js");
/* harmony import */ var inversify_inject_decorators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(inversify_inject_decorators__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "injectable", function() { return inversify__WEBPACK_IMPORTED_MODULE_3__["injectable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unmanaged", function() { return inversify__WEBPACK_IMPORTED_MODULE_3__["unmanaged"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "optional", function() { return inversify__WEBPACK_IMPORTED_MODULE_3__["optional"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decorate", function() { return inversify__WEBPACK_IMPORTED_MODULE_3__["decorate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "named", function() { return inversify__WEBPACK_IMPORTED_MODULE_3__["named"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tagged", function() { return inversify__WEBPACK_IMPORTED_MODULE_3__["tagged"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "postConstruct", function() { return inversify__WEBPACK_IMPORTED_MODULE_3__["postConstruct"]; });

 // noinspection ES6UnusedImports




var app = new _Application__WEBPACK_IMPORTED_MODULE_0__["Application"]();

var _createDecorators = inversify_inject_decorators__WEBPACK_IMPORTED_MODULE_2___default()(app),
    inject = _createDecorators.lazyInject;





/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/index.js":
/*!****************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/index.js ***!
  \****************************************************************/
/*! exports provided: prefixAndRegisterComponents, toJS, app, inject, provide, buildProviderModule, fluentProvide, autoProvide, injectable, unmanaged, optional, decorate, named, tagged, postConstruct, Application, Config, Dispatcher, PlatformServiceProvider, ServiceProvider, VuePlugin, isSSR, Agent, warn, uniqueId, getRandomId, load, copy, getViewPort, isTouchDevice, getElementHeight, listen, getScroll, getOffset, cssTransitions, escapeHash, parseBool, looseEqual, looseIndexOf, strEnsureLeft, strEnsureRight, strStripLeft, strStripRight, ucfirst, lcfirst, trace, keysToCamelCase, kindOf, isNumber, isString, isBoolean, isFunction, isRegExp, isArray, isDate, isError, isObject, objectify, getScrollWidth, getHorizontalScrollPosition, animHorizontalScrollTo, setHorizontalScrollPosition, getScrollbarWidth, getScrollTarget, getScrollHeight, getScrollPosition, animScrollTo, animScrollToFn, setScrollPosition, hasScrollbar, scrollTo, Storage, Cookies, styleToString, firstBy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ "./node_modules/reflect-metadata/Reflect.js-exposed");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./vendor/anomaly/streams-platform/resources/src/utils/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "prefixAndRegisterComponents", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["prefixAndRegisterComponents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toJS", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["toJS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSSR", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isSSR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Agent", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["Agent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["warn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uniqueId", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["uniqueId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRandomId", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getRandomId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "load", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["load"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["copy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getViewPort", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getViewPort"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTouchDevice", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isTouchDevice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getElementHeight", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getElementHeight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "listen", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["listen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScroll", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getScroll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOffset", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getOffset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cssTransitions", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["cssTransitions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeHash", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["escapeHash"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseBool", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["parseBool"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "looseEqual", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["looseEqual"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "looseIndexOf", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["looseIndexOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "strEnsureLeft", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["strEnsureLeft"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "strEnsureRight", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["strEnsureRight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "strStripLeft", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["strStripLeft"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "strStripRight", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["strStripRight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ucfirst", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["ucfirst"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lcfirst", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["lcfirst"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "trace", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["trace"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keysToCamelCase", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["keysToCamelCase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "kindOf", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["kindOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isBoolean"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isFunction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isRegExp", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isRegExp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDate", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isDate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isError", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["isObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "objectify", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["objectify"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollWidth", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getScrollWidth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getHorizontalScrollPosition", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getHorizontalScrollPosition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animHorizontalScrollTo", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["animHorizontalScrollTo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setHorizontalScrollPosition", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["setHorizontalScrollPosition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollbarWidth", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getScrollbarWidth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollTarget", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getScrollTarget"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollHeight", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getScrollHeight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollPosition", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["getScrollPosition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animScrollTo", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["animScrollTo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animScrollToFn", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["animScrollToFn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setScrollPosition", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["setScrollPosition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasScrollbar", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["hasScrollbar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scrollTo", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["scrollTo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Storage", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["Storage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cookies", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["Cookies"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "styleToString", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["styleToString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "firstBy", function() { return _utils__WEBPACK_IMPORTED_MODULE_1__["firstBy"]; });

/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./vendor/anomaly/streams-platform/resources/src/app.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "app", function() { return _app__WEBPACK_IMPORTED_MODULE_2__["app"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inject", function() { return _app__WEBPACK_IMPORTED_MODULE_2__["inject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "provide", function() { return _app__WEBPACK_IMPORTED_MODULE_2__["provide"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "buildProviderModule", function() { return _app__WEBPACK_IMPORTED_MODULE_2__["buildProviderModule"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fluentProvide", function() { return _app__WEBPACK_IMPORTED_MODULE_2__["fluentProvide"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "autoProvide", function() { return _app__WEBPACK_IMPORTED_MODULE_2__["autoProvide"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "injectable", function() { return _app__WEBPACK_IMPORTED_MODULE_2__["injectable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unmanaged", function() { return _app__WEBPACK_IMPORTED_MODULE_2__["unmanaged"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "optional", function() { return _app__WEBPACK_IMPORTED_MODULE_2__["optional"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decorate", function() { return _app__WEBPACK_IMPORTED_MODULE_2__["decorate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "named", function() { return _app__WEBPACK_IMPORTED_MODULE_2__["named"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tagged", function() { return _app__WEBPACK_IMPORTED_MODULE_2__["tagged"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "postConstruct", function() { return _app__WEBPACK_IMPORTED_MODULE_2__["postConstruct"]; });

/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Application */ "./vendor/anomaly/streams-platform/resources/src/Application.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Application", function() { return _Application__WEBPACK_IMPORTED_MODULE_3__["Application"]; });

/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Config */ "./vendor/anomaly/streams-platform/resources/src/Config.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return _Config__WEBPACK_IMPORTED_MODULE_4__["Config"]; });

/* harmony import */ var _Dispatcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Dispatcher */ "./vendor/anomaly/streams-platform/resources/src/Dispatcher.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dispatcher", function() { return _Dispatcher__WEBPACK_IMPORTED_MODULE_5__["Dispatcher"]; });

/* harmony import */ var _PlatformServiceProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PlatformServiceProvider */ "./vendor/anomaly/streams-platform/resources/src/PlatformServiceProvider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlatformServiceProvider", function() { return _PlatformServiceProvider__WEBPACK_IMPORTED_MODULE_6__["PlatformServiceProvider"]; });

/* harmony import */ var _ServiceProvider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ServiceProvider */ "./vendor/anomaly/streams-platform/resources/src/ServiceProvider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ServiceProvider", function() { return _ServiceProvider__WEBPACK_IMPORTED_MODULE_7__["ServiceProvider"]; });

/* harmony import */ var _VuePlugin__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./VuePlugin */ "./vendor/anomaly/streams-platform/resources/src/VuePlugin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VuePlugin", function() { return _VuePlugin__WEBPACK_IMPORTED_MODULE_8__["VuePlugin"]; });











/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/utils/agent.js":
/*!**********************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/utils/agent.js ***!
  \**********************************************************************/
/*! exports provided: isSSR, Agent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSSR", function() { return isSSR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Agent", function() { return Agent; });
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ "./node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.parse-int */ "./node_modules/core-js/modules/es.parse-int.js");
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_3__);





/* eslint-disable no-useless-escape */

/* eslint-disable no-unused-expressions */

/* eslint-disable no-mixed-operators */
var isSSR = typeof window === 'undefined';

function getMatch(userAgent, platformMatch) {
  var match = /(edge)\/([\w.]+)/.exec(userAgent) || /(opr)[\/]([\w.]+)/.exec(userAgent) || /(vivaldi)[\/]([\w.]+)/.exec(userAgent) || /(chrome)[\/]([\w.]+)/.exec(userAgent) || /(iemobile)[\/]([\w.]+)/.exec(userAgent) || /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent) || /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent) || /(webkit)[\/]([\w.]+)/.exec(userAgent) || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(userAgent) || /(msie) ([\w.]+)/.exec(userAgent) || userAgent.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(userAgent) || userAgent.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(userAgent) || [];
  return {
    browser: match[5] || match[3] || match[1] || '',
    version: match[2] || match[4] || '0',
    versionNumber: match[4] || match[2] || '0',
    platform: platformMatch[0] || ''
  };
}

function getPlatformMatch(userAgent) {
  return /(ipad)/.exec(userAgent) || /(ipod)/.exec(userAgent) || /(windows phone)/.exec(userAgent) || /(iphone)/.exec(userAgent) || /(kindle)/.exec(userAgent) || /(silk)/.exec(userAgent) || /(android)/.exec(userAgent) || /(win)/.exec(userAgent) || /(mac)/.exec(userAgent) || /(linux)/.exec(userAgent) || /(cros)/.exec(userAgent) || /(playbook)/.exec(userAgent) || /(bb)/.exec(userAgent) || /(blackberry)/.exec(userAgent) || [];
}

function getAgentIs(userAgent) {
  userAgent = (userAgent || navigator.userAgent || navigator.vendor || window['opera']).toLowerCase();
  var platformMatch = getPlatformMatch(userAgent),
      matched = getMatch(userAgent, platformMatch),
      browser = {
    ssr: isSSR
  };

  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.versionNumber, 10);
  }

  if (matched.platform) {
    browser[matched.platform] = true;
  } // These are all considered mobile platforms, meaning they run a mobile browser


  if (browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone || browser.ipod || browser.kindle || browser.playbook || browser.silk || browser['windows phone']) {
    browser.mobile = true;
  } // Set iOS if on iPod, iPad or iPhone


  if (browser.ipod || browser.ipad || browser.iphone) {
    browser.ios = true;
  }

  if (browser['windows phone']) {
    browser.winphone = true;
    delete browser['windows phone'];
  } // These are all considered desktop platforms, meaning they run a desktop browser


  if (browser.cros || browser.mac || browser.linux || browser.win) {
    browser.desktop = true;
  } // Chrome, Opera 15+, Vivaldi and Safari are webkit based browsers


  if (browser.chrome || browser.opr || browser.safari || browser.vivaldi) {
    browser.webkit = true;
  } // IE11 has a new token so we will assign it msie to avoid breaking changes


  if (browser.rv || browser.iemobile) {
    matched.browser = 'ie';
    browser.ie = true;
  } // Edge is officially known as Microsoft Edge, so rewrite the key to match


  if (browser.edge) {
    matched.browser = 'edge';
    browser.edge = true;
  } // Blackberry browsers are marked as Safari on BlackBerry


  if (browser.safari && browser.blackberry || browser.bb) {
    matched.browser = 'blackberry';
    browser.blackberry = true;
  } // Playbook browsers are marked as Safari on Playbook


  if (browser.safari && browser.playbook) {
    matched.browser = 'playbook';
    browser.playbook = true;
  } // Opera 15+ are identified as opr


  if (browser.opr) {
    matched.browser = 'opera';
    browser.opera = true;
  } // Stock Android browsers are marked as Safari on Android.


  if (browser.safari && browser.android) {
    matched.browser = 'android';
    browser.android = true;
  } // Kindle browsers are marked as Safari on Kindle


  if (browser.safari && browser.kindle) {
    matched.browser = 'kindle';
    browser.kindle = true;
  } // Kindle Silk browsers are marked as Safari on Kindle


  if (browser.safari && browser.silk) {
    matched.browser = 'silk';
    browser.silk = true;
  }

  if (browser.vivaldi) {
    matched.browser = 'vivaldi';
    browser.vivaldi = true;
  } // Assign the name and platform variable


  browser.name = matched.browser;
  browser.platform = matched.platform;

  if (!isSSR) {
    // if ( window[ 'process' ] && window[ 'process' ].versions && window[ 'process' ].versions.electron ) {
    //     browser.electron = true
    // }
    if (document.location.href.indexOf('chrome-extension://') === 0) {
      browser.chromeExt = true;
    } else if (window['_cordovaNative'] || window['cordova']) {
      browser.cordova = true;
    }
  }

  return browser;
}

function getAgent() {
  if (isSSR) {
    return {
      is: getAgentIs('firefox'),
      has: {
        touch: false,
        webStorage: false
      },
      within: {
        iframe: false
      }
    };
  }

  var webStorage;

  try {
    if (window.localStorage) {
      webStorage = true;
    }
  } catch (e) {
    webStorage = false;
  } // noinspection PointlessBooleanExpressionJS


  return {
    is: getAgentIs(),
    has: {
      touch: function () {
        return !!('ontouchstart' in document.documentElement) || window.navigator.msMaxTouchPoints > 0;
      }(),
      webStorage: webStorage
    },
    within: {
      iframe: window.self !== window.top
    }
  };
}

var Agent = getAgent();

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/utils/general.js":
/*!************************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/utils/general.js ***!
  \************************************************************************/
/*! exports provided: warn, uniqueId, getRandomId, load, copy, getViewPort, isTouchDevice, getElementHeight, listen, getScroll, getOffset, cssTransitions, escapeHash, parseBool, looseEqual, looseIndexOf, strEnsureLeft, strEnsureRight, strStripLeft, strStripRight, ucfirst, lcfirst, trace, keysToCamelCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return warn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uniqueId", function() { return uniqueId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomId", function() { return getRandomId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load", function() { return load; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getViewPort", function() { return getViewPort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTouchDevice", function() { return isTouchDevice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementHeight", function() { return getElementHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listen", function() { return listen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScroll", function() { return getScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOffset", function() { return getOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssTransitions", function() { return cssTransitions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeHash", function() { return escapeHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBool", function() { return parseBool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "looseEqual", function() { return looseEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "looseIndexOf", function() { return looseIndexOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strEnsureLeft", function() { return strEnsureLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strEnsureRight", function() { return strEnsureRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strStripLeft", function() { return strStripLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "strStripRight", function() { return strStripRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ucfirst", function() { return ucfirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lcfirst", function() { return lcfirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trace", function() { return trace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keysToCamelCase", function() { return keysToCamelCase; });
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.slice */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.ends-with */ "./node_modules/core-js/modules/es.string.ends-with.js");
/* harmony import */ var core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_string_starts_with__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.string.starts-with */ "./node_modules/core-js/modules/es.string.starts-with.js");
/* harmony import */ var core_js_modules_es_string_starts_with__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_starts_with__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash/camelCase */ "./node_modules/lodash/camelCase.js");
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash_camelCase__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _kindOf__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./kindOf */ "./vendor/anomaly/streams-platform/resources/src/utils/kindOf.js");














function warn(message) {
  var _console;

  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  (_console = console).warn.apply(_console, ['[codex][core] ' + message].concat(params));
}
function uniqueId() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
function getRandomId() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 15;
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
function load(vNodeContext, cb) {
  if (document.readyState === 'complete') {
    vNodeContext.$nextTick(function () {
      return cb();
    });
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      return cb();
    });
  }
}
function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
/**
 * Get the current viewport
 * @returns {{width: *, height: *}}
 */

function getViewPort() {
  var e = window,
      a = 'inner';

  if (!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }

  return {
    width: e[a + 'Width'],
    height: e[a + 'Height']
  };
}
/**
 * Checks if the device currently used is a touch device
 * @returns {boolean}
 */

function isTouchDevice() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}
/**
 *
 * @param {HTMLElement} element
 */

function getElementHeight(element) {
  // Support: IE <=11 only
  // Running getBoundingClientRect on a
  // disconnected node in IE throws an error
  if (!element['getClientRects']().length) {
    return element.offsetHeight;
  }

  var rect = element.getBoundingClientRect(); // Make sure element is not hidden (display: none)

  if (rect.width || rect.height) {
    return rect.bottom - rect.top;
  } // Return zeros for disconnected and hidden elements (gh-2310)


  return 0;
}
function listen(target, eventType, callback) {
  if (target.addEventListener) {
    target.addEventListener(eventType, callback, false);
    return {
      remove: function remove() {
        target.removeEventListener(eventType, callback, false);
      }
    };
  }

  if (target['attachEvent']) {
    target['attachEvent']("on".concat(eventType), callback);
    return {
      remove: function remove() {
        target['detachEvent']("on".concat(eventType), callback);
      }
    };
  }
}
function getScroll(w, top) {
  var ret = w["page".concat(top ? 'Y' : 'X', "Offset")];
  var method = "scroll".concat(top ? 'Top' : 'Left');

  if (typeof ret !== 'number') {
    var d = w.document;
    ret = d.documentElement[method];

    if (typeof ret !== 'number') {
      ret = d.body[method];
    }
  }

  return ret;
}
function getOffset(element) {
  var elm = element;
  var top = elm.offsetTop;
  var left = elm.offsetLeft;

  while (elm.offsetParent !== null) {
    elm = elm.offsetParent;
    top += elm.offsetTop;
    left += elm.offsetLeft;
  }

  return {
    top: top,
    left: left
  };
} // check if browser support css3 transitions

function cssTransitions() {
  if (typeof document === 'undefined') return false;
  var style = document.documentElement.style;
  return style['webkitTransition'] !== undefined || style['MozTransition'] !== undefined || style['OTransition'] !== undefined || style['MsTransition'] !== undefined || style.transition !== undefined;
}
function escapeHash(hash) {
  return hash.replace(/(:|\.|\[|\]|,|=)/g, '\\$1');
}
function parseBool(val) {
  return val === true || val === 1 || val === 'true' || val === '1';
}
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */

function looseEqual(a, b) {
  // eslint-disable-next-line eqeqeq
  return a == b || (Object(_kindOf__WEBPACK_IMPORTED_MODULE_13__["isObject"])(a) && Object(_kindOf__WEBPACK_IMPORTED_MODULE_13__["isObject"])(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
}
/**
 * Check if a val exists in arr using looseEqual comparison
 */

function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
function strEnsureLeft(str, left) {
  if (false === str.startsWith(left)) {
    return left + str;
  }

  return str;
}
function strEnsureRight(str, right) {
  if (false === str.endsWith(right)) {
    return str + right;
  }

  return str;
}
function strStripLeft(str, left) {
  if (str.startsWith(left)) {
    return str.substr(left.length);
  }

  return str;
}
function strStripRight(str, right) {
  if (str.endsWith(right)) {
    return str.substr(0, str.length - right.length);
  }

  return str;
}
function ucfirst(string) {
  return string[0].toUpperCase() + string.slice(1);
}
function lcfirst(string) {
  return string[0].toLowerCase() + string.slice(1);
}
function trace(name) {
  var _console2;

  console.groupCollapsed(name);

  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  (_console2 = console).trace.apply(_console2, args);

  console.groupEnd();
}
function keysToCamelCase(obj) {
  Object.keys(obj).forEach(function (key) {
    if (key !== lodash_camelCase__WEBPACK_IMPORTED_MODULE_12___default()(key)) {
      obj[lodash_camelCase__WEBPACK_IMPORTED_MODULE_12___default()(key)] = obj[key];
      delete obj[key];
    }
  });
  return obj;
}

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/utils/index.js":
/*!**********************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/utils/index.js ***!
  \**********************************************************************/
/*! exports provided: prefixAndRegisterComponents, toJS, isSSR, Agent, warn, uniqueId, getRandomId, load, copy, getViewPort, isTouchDevice, getElementHeight, listen, getScroll, getOffset, cssTransitions, escapeHash, parseBool, looseEqual, looseIndexOf, strEnsureLeft, strEnsureRight, strStripLeft, strStripRight, ucfirst, lcfirst, trace, keysToCamelCase, kindOf, isNumber, isString, isBoolean, isFunction, isRegExp, isArray, isDate, isError, isObject, objectify, getScrollWidth, getHorizontalScrollPosition, animHorizontalScrollTo, setHorizontalScrollPosition, getScrollbarWidth, getScrollTarget, getScrollHeight, getScrollPosition, animScrollTo, animScrollToFn, setScrollPosition, hasScrollbar, scrollTo, Storage, Cookies, styleToString, firstBy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _agent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./agent */ "./vendor/anomaly/streams-platform/resources/src/utils/agent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSSR", function() { return _agent__WEBPACK_IMPORTED_MODULE_0__["isSSR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Agent", function() { return _agent__WEBPACK_IMPORTED_MODULE_0__["Agent"]; });

/* harmony import */ var _general__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./general */ "./vendor/anomaly/streams-platform/resources/src/utils/general.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["warn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uniqueId", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["uniqueId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRandomId", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["getRandomId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "load", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["load"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["copy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getViewPort", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["getViewPort"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTouchDevice", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["isTouchDevice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getElementHeight", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["getElementHeight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "listen", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["listen"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScroll", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["getScroll"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getOffset", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["getOffset"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cssTransitions", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["cssTransitions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeHash", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["escapeHash"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseBool", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["parseBool"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "looseEqual", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["looseEqual"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "looseIndexOf", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["looseIndexOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "strEnsureLeft", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["strEnsureLeft"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "strEnsureRight", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["strEnsureRight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "strStripLeft", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["strStripLeft"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "strStripRight", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["strStripRight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ucfirst", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["ucfirst"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lcfirst", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["lcfirst"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "trace", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["trace"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keysToCamelCase", function() { return _general__WEBPACK_IMPORTED_MODULE_1__["keysToCamelCase"]; });

/* harmony import */ var _kindOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./kindOf */ "./vendor/anomaly/streams-platform/resources/src/utils/kindOf.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "kindOf", function() { return _kindOf__WEBPACK_IMPORTED_MODULE_2__["kindOf"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return _kindOf__WEBPACK_IMPORTED_MODULE_2__["isNumber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return _kindOf__WEBPACK_IMPORTED_MODULE_2__["isString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return _kindOf__WEBPACK_IMPORTED_MODULE_2__["isBoolean"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return _kindOf__WEBPACK_IMPORTED_MODULE_2__["isFunction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isRegExp", function() { return _kindOf__WEBPACK_IMPORTED_MODULE_2__["isRegExp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return _kindOf__WEBPACK_IMPORTED_MODULE_2__["isArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDate", function() { return _kindOf__WEBPACK_IMPORTED_MODULE_2__["isDate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isError", function() { return _kindOf__WEBPACK_IMPORTED_MODULE_2__["isError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return _kindOf__WEBPACK_IMPORTED_MODULE_2__["isObject"]; });

/* harmony import */ var _objectify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./objectify */ "./vendor/anomaly/streams-platform/resources/src/utils/objectify.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "objectify", function() { return _objectify__WEBPACK_IMPORTED_MODULE_3__["objectify"]; });

/* harmony import */ var _prefixAndRegisterComponents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./prefixAndRegisterComponents */ "./vendor/anomaly/streams-platform/resources/src/utils/prefixAndRegisterComponents.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "prefixAndRegisterComponents", function() { return _prefixAndRegisterComponents__WEBPACK_IMPORTED_MODULE_4__["prefixAndRegisterComponents"]; });

/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scroll */ "./vendor/anomaly/streams-platform/resources/src/utils/scroll.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollWidth", function() { return _scroll__WEBPACK_IMPORTED_MODULE_5__["getScrollWidth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getHorizontalScrollPosition", function() { return _scroll__WEBPACK_IMPORTED_MODULE_5__["getHorizontalScrollPosition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animHorizontalScrollTo", function() { return _scroll__WEBPACK_IMPORTED_MODULE_5__["animHorizontalScrollTo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setHorizontalScrollPosition", function() { return _scroll__WEBPACK_IMPORTED_MODULE_5__["setHorizontalScrollPosition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollbarWidth", function() { return _scroll__WEBPACK_IMPORTED_MODULE_5__["getScrollbarWidth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollTarget", function() { return _scroll__WEBPACK_IMPORTED_MODULE_5__["getScrollTarget"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollHeight", function() { return _scroll__WEBPACK_IMPORTED_MODULE_5__["getScrollHeight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScrollPosition", function() { return _scroll__WEBPACK_IMPORTED_MODULE_5__["getScrollPosition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animScrollTo", function() { return _scroll__WEBPACK_IMPORTED_MODULE_5__["animScrollTo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animScrollToFn", function() { return _scroll__WEBPACK_IMPORTED_MODULE_5__["animScrollToFn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setScrollPosition", function() { return _scroll__WEBPACK_IMPORTED_MODULE_5__["setScrollPosition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasScrollbar", function() { return _scroll__WEBPACK_IMPORTED_MODULE_5__["hasScrollbar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scrollTo", function() { return _scroll__WEBPACK_IMPORTED_MODULE_5__["scrollTo"]; });

/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./storage */ "./vendor/anomaly/streams-platform/resources/src/utils/storage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Storage", function() { return _storage__WEBPACK_IMPORTED_MODULE_6__["Storage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cookies", function() { return _storage__WEBPACK_IMPORTED_MODULE_6__["Cookies"]; });

/* harmony import */ var _styleToString__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./styleToString */ "./vendor/anomaly/streams-platform/resources/src/utils/styleToString.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "styleToString", function() { return _styleToString__WEBPACK_IMPORTED_MODULE_7__["styleToString"]; });

/* harmony import */ var _thenBy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./thenBy */ "./vendor/anomaly/streams-platform/resources/src/utils/thenBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "firstBy", function() { return _thenBy__WEBPACK_IMPORTED_MODULE_8__["firstBy"]; });

/* harmony import */ var _toJS__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./toJS */ "./vendor/anomaly/streams-platform/resources/src/utils/toJS.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toJS", function() { return _toJS__WEBPACK_IMPORTED_MODULE_9__["toJS"]; });












/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/utils/kindOf.js":
/*!***********************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/utils/kindOf.js ***!
  \***********************************************************************/
/*! exports provided: kindOf, isNumber, isString, isBoolean, isFunction, isRegExp, isArray, isDate, isError, isObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kindOf", function() { return kindOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoolean", function() { return isBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRegExp", function() { return isRegExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDate", function() { return isDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isError", function() { return isError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.split */ "./node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_3__);




var kindsOf = {};
'Number String Boolean Function RegExp Array Date Error'.split(' ').forEach(function (k) {
  kindsOf['[object ' + k + ']'] = k.toLowerCase();
});
function kindOf(value) {
  // Null or undefined.
  if (value == null) {
    return String(value);
  } // Everything else.


  return kindsOf[kindsOf.toString.call(value)] || 'object';
}
var isNumber = function isNumber(value) {
  return kindOf(value) === 'number';
};
var isString = function isString(value) {
  return kindOf(value) === 'string';
};
var isBoolean = function isBoolean(value) {
  return kindOf(value) === 'boolean';
};
var isFunction = function isFunction(value) {
  return kindOf(value) === 'function';
};
var isRegExp = function isRegExp(value) {
  return kindOf(value) === 'regexp';
};
var isArray = function isArray(value) {
  return kindOf(value) === 'array';
};
var isDate = function isDate(value) {
  return kindOf(value) === 'date';
};
var isError = function isError(value) {
  return kindOf(value) === 'error';
};
var isObject = function isObject(value) {
  return kindOf(value) === 'object';
};

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/utils/objectify.js":
/*!**************************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/utils/objectify.js ***!
  \**************************************************************************/
/*! exports provided: objectify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objectify", function() { return objectify; });
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.define-properties */ "./node_modules/core-js/modules/es.object.define-properties.js");
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");












function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 *
 * @param obj
 * @param k
 * @param v
 * @example
 *
 * params = Object.entries(params).filter(([ key, value ]) => {
 *     return value.toString().length > 0;
 * }).reduce(utils.objectify, {});
 *
 */
var objectify = function objectify(obj, _ref) {
  var _ref2 = Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_10__["default"])(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];

  return _objectSpread({}, obj, Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_9__["default"])({}, k, v));
};

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/utils/prefixAndRegisterComponents.js":
/*!********************************************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/utils/prefixAndRegisterComponents.js ***!
  \********************************************************************************************/
/*! exports provided: prefixAndRegisterComponents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefixAndRegisterComponents", function() { return prefixAndRegisterComponents; });
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.define-properties */ "./node_modules/core-js/modules/es.object.define-properties.js");
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var lodash_kebabCase__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash/kebabCase */ "./node_modules/lodash/kebabCase.js");
/* harmony import */ var lodash_kebabCase__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash_kebabCase__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../app */ "./vendor/anomaly/streams-platform/resources/src/app.js");













function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_11__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



var log = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('utils:registerComponents');
/**
 *
 * @param {VueConstructor} _Vue
 * @param _components
 * @return {*}
 */


function prefixAndRegisterComponents(_Vue, _components) {
  var components = _app__WEBPACK_IMPORTED_MODULE_12__["app"].events.emit('components:register', _objectSpread({}, _components));
  Object.keys(components).forEach(function (key) {
    var componentName = key;

    if (_app__WEBPACK_IMPORTED_MODULE_12__["app"].config.prefix) {
      componentName = "".concat(_app__WEBPACK_IMPORTED_MODULE_12__["app"].config.prefix, "-").concat(lodash_kebabCase__WEBPACK_IMPORTED_MODULE_10___default()(key));
    }

    log('prefixAndRegisterComponents componentName', componentName, {
      key: components[key]
    });

    _Vue.component(componentName, components[key]);
  });
  return components;
}

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/utils/scroll.js":
/*!***********************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/utils/scroll.js ***!
  \***********************************************************************/
/*! exports provided: getScrollWidth, getHorizontalScrollPosition, animHorizontalScrollTo, setHorizontalScrollPosition, getScrollbarWidth, getScrollTarget, getScrollHeight, getScrollPosition, animScrollTo, animScrollToFn, setScrollPosition, hasScrollbar, scrollTo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollWidth", function() { return getScrollWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHorizontalScrollPosition", function() { return getHorizontalScrollPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animHorizontalScrollTo", function() { return animHorizontalScrollTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setHorizontalScrollPosition", function() { return setHorizontalScrollPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollbarWidth", function() { return getScrollbarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollTarget", function() { return getScrollTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollHeight", function() { return getScrollHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollPosition", function() { return getScrollPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animScrollTo", function() { return animScrollTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animScrollToFn", function() { return animScrollToFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setScrollPosition", function() { return setScrollPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasScrollbar", function() { return hasScrollbar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollTo", function() { return scrollTo; });
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.includes */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_date_now__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.date.now */ "./node_modules/core-js/modules/es.date.now.js");
/* harmony import */ var core_js_modules_es_date_now__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_now__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.define-properties */ "./node_modules/core-js/modules/es.object.define-properties.js");
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var lodash_mapValues__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash/mapValues */ "./node_modules/lodash/mapValues.js");
/* harmony import */ var lodash_mapValues__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash_mapValues__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var lodash_keyBy__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lodash/keyBy */ "./node_modules/lodash/keyBy.js");
/* harmony import */ var lodash_keyBy__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(lodash_keyBy__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var lodash_reverse__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! lodash/reverse */ "./node_modules/lodash/reverse.js");
/* harmony import */ var lodash_reverse__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(lodash_reverse__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! lodash/sortBy */ "./node_modules/lodash/sortBy.js");
/* harmony import */ var lodash_sortBy__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(lodash_sortBy__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! lodash/map */ "./node_modules/lodash/map.js");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");



















function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_17__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getScrollWidth(el) {
  return (el === window ? document.body : el).scrollWidth;
}
function getHorizontalScrollPosition(scrollTarget) {
  if (scrollTarget === window) {
    return window.pageXOffset || window.scrollX || document.body.scrollLeft || 0;
  }

  return scrollTarget.scrollLeft;
}
function animHorizontalScrollTo(el, to, duration) {
  var pos = getHorizontalScrollPosition(el);

  if (duration <= 0) {
    if (pos !== to) {
      setHorizontalScroll(el, to);
    }

    return;
  }

  requestAnimationFrame(function () {
    var newPos = pos + (to - pos) / Math.max(16, duration) * 16;
    setHorizontalScroll(el, newPos);

    if (newPos !== to) {
      animHorizontalScrollTo(el, to, duration - 16);
    }
  });
}

function setHorizontalScroll(scrollTarget, offset) {
  if (scrollTarget === window) {
    window.scrollTo(offset, 0);
    return;
  }

  scrollTarget.scrollLeft = offset;
}

function setHorizontalScrollPosition(scrollTarget, offset, duration) {
  if (duration) {
    animHorizontalScrollTo(scrollTarget, offset, duration);
    return;
  }

  setHorizontalScroll(scrollTarget, offset);
}
var size;
function getScrollbarWidth() {
  if (size !== undefined) {
    return size;
  }

  var inner = document.createElement('p'),
      outer = document.createElement('div');
  inner.style = _objectSpread({}, inner.style, {
    width: '100%',
    height: '200px'
  });
  outer.style = _objectSpread({}, outer.style, {
    position: 'absolute',
    top: '0px',
    left: '0px',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });
  outer.appendChild(inner);
  document.body.appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;

  if (w1 === w2) {
    w2 = outer.clientWidth;
  }

  outer.remove();
  size = w1 - w2;
  return size;
}
/**
 *
 * @param {Element|node} el
 * @param {string} selector
 * @return {Element|Window}
 */

function getScrollTarget(el, selector) {
  return el.closest(selector || '.c-scrollbar') || window;
}
function getScrollHeight(el) {
  return (el === window ? document.body : el).scrollHeight;
}
function getScrollPosition(scrollTarget) {
  if (scrollTarget === window) {
    return window.pageYOffset || window.scrollY || document.body.scrollTop || 0;
  }

  return scrollTarget.scrollTop;
}
function animScrollTo(el, to, duration) {
  if (duration <= 0) {
    return;
  }

  var pos = getScrollPosition(el);
  window.requestAnimationFrame(function () {
    setScroll(el, pos + (to - pos) / duration * 16);

    if (el.scrollTop !== to) {
      animScrollTo(el, to, duration - 16);
    }
  });
}
/**
 *
 * @param {Function|()=>number} getScrollPosition
 * @param {Function|(pos: number) => any} setScrollPosition
 * @param {number} offset
 * @param {number} duration
 */

function animScrollToFn(getScrollPosition, setScrollPosition, offset) {
  var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;

  if (duration <= 0) {
    return;
  }

  var pos = getScrollPosition();
  window.requestAnimationFrame(function () {
    setScrollPosition(pos + (offset - pos) / duration * 16);
    pos = getScrollPosition();

    if (pos !== offset) {
      animScrollToFn(getScrollPosition, setScrollPosition, offset, duration - 16);
    }
  });
}

function setScroll(scrollTarget, offset) {
  if (scrollTarget === window) {
    document.documentElement.scrollTop = offset;
    document.body.scrollTop = offset;
    return;
  }

  scrollTarget.scrollTop = offset;
}

function setScrollPosition(scrollTarget, offset, duration) {
  if (duration) {
    animScrollTo(scrollTarget, offset, duration);
    return;
  }

  setScroll(scrollTarget, offset);
}
function hasScrollbar(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return (el.classList.contains('scroll') || ['auto', 'scroll'].includes(window.getComputedStyle(el)['overflow-y'])) && el.scrollHeight > el.clientHeight;
}

var log = __webpack_require__(/*! debug */ "./node_modules/debug/src/browser.js")('utils:scroll');

var sortByValues = function sortByValues(object) {
  var _reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  object = lodash_map__WEBPACK_IMPORTED_MODULE_16___default()(object, function (val, key) {
    return {
      name: key,
      count: val
    };
  });
  object = lodash_sortBy__WEBPACK_IMPORTED_MODULE_15___default()(object, 'count');
  if (_reverse) object = lodash_reverse__WEBPACK_IMPORTED_MODULE_14___default()(object);
  object = lodash_keyBy__WEBPACK_IMPORTED_MODULE_13___default()(object, 'name');
  object = lodash_mapValues__WEBPACK_IMPORTED_MODULE_12___default()(object, 'count');
  return object;
};
/**
 *
 * @param {string | number | HTMLElement} _scrollTo
 * @param {number} scrollOffset
 * @param {number} scrollDuration duration in ms
 * @return {*}
 */


function scrollTo(_scrollTo) {
  var scrollOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var scrollDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  var scrollTo = _scrollTo;
  var def = defer(); // polyfill

  if ('performance' in window == false) {
    window['performance'] = {};
  }

  if ('now' in window.performance == false) {
    Date.now = Date.now || function () {
      // thanks IE8
      return new Date().getTime();
    };

    var nowOffset = Date.now();

    if (performance.timing && performance.timing.navigationStart) {
      nowOffset = performance.timing.navigationStart;
    }

    window.performance.now = function now() {
      return Date.now() - nowOffset;
    };
  } //
  // Set a default for where we're scrolling to
  //


  if (typeof scrollTo === 'string') {
    // Assuming this is a selector we can use to find an element
    var scrollToObj = $(scrollTo).get(0);

    if (scrollToObj && typeof scrollToObj.getBoundingClientRect === 'function') {
      scrollTo = window.pageYOffset + scrollToObj.getBoundingClientRect().top;
    } else {
      throw 'error: No element found with the selector "' + scrollTo + '"';
    }
  } else if (typeof scrollTo !== 'number') {
    // If it's nothing above and not an integer, we assume top of the window
    scrollTo = 0;
  } else {
    var _scrollToObj = $(scrollTo).get(0);

    if (_scrollToObj && typeof _scrollToObj.getBoundingClientRect === 'function') {
      scrollTo = window.pageYOffset + _scrollToObj.getBoundingClientRect().top;
    } else {
      throw 'error: No element found with the selector "' + scrollTo + '"';
    }
  }

  scrollTo += scrollOffset; // Set this a bit higher

  var anchorHeightAdjust = 30;

  if (scrollTo > anchorHeightAdjust) {
    scrollTo = scrollTo - anchorHeightAdjust;
  } // Declarations


  var cosParameter = (window.pageYOffset - scrollTo) / 2;
  var scrollCount = 0,
      oldTimestamp = window.performance.now();

  function step(newTimestamp) {
    var tsDiff = newTimestamp - oldTimestamp; // Performance.now() polyfill loads late so passed-in timestamp is a larger offset
    // on the first go-through than we want so I'm adjusting the difference down here.
    // Regardless, we would rather have a slightly slower animation than a big jump so a good
    // safeguard, even if we're not using the polyfill.

    if (tsDiff > 100) {
      tsDiff = 30;
    }

    scrollCount += Math.PI / (scrollDuration / tsDiff); // As soon  cross over Pi, we're about where we need to be

    if (scrollCount >= Math.PI) {
      return def.resolve();
    }

    var moveStep = Math.round(scrollTo + cosParameter + cosParameter * Math.cos(scrollCount));
    window.scrollTo(0, moveStep);
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
  return def.promise;
} // export class ScrollSpyHelper {
//     protected targets: ZeptoMap<TargetID>              = {};
//     protected items: ZeptoMap<ItemID>                  = {};
//     protected scrollListener: (event: UIEvent) => void = null;
//     protected targetItems: Targets2Items               = {};
//
//     constructor(protected itemTargets: Items2Targets, protected offset: number = 0, protected el: Element | Window = window) {
//         this.itemIds.forEach(itemID => {
//             itemID                       = strStripLeft(itemID, '#');
//             let targetID                 = itemTargets[ itemID ];
//             this.targetItems[ targetID ] = itemID;
//             this.items[ itemID ]         = $(strEnsureLeft(itemID, '#'));
//         });
//         this.targetIds.forEach(targetID => {
//             targetID                 = strStripLeft(targetID, '#');
//             this.targets[ targetID ] = $(strEnsureLeft(targetID, '#'));
//         });
//     }
//
//     get itemIds(): string[] { return Object.keys(this.itemTargets); }
//
//     get targetIds(): string[] { return this.itemIds.map(listItemId => this.itemTargets[ listItemId ]); }
//
//     getScrollPosition(): number {return getScrollPosition(this.el); }
//
//     getTargetPosition(targetID: TargetID): number { return this.getTarget(targetID).offset().top; }
//
//     getItem(itemID: ItemID): JQuery {return this.items[ strStripLeft(itemID, '#') ];}
//
//     getTarget(targetID: TargetID): JQuery {return this.targets[ strStripLeft(targetID, '#') ];}
//
//     item2targetID(itemID: ItemID): TargetID {return this.itemTargets[ strStripLeft(itemID, '#') ];}
//
//     target2itemID(targetID: TargetID): ItemID {return this.targetItems[ strStripLeft(targetID, '#') ];}
//
//     getItemTarget(itemID: ItemID): JQuery {return this.targets[ this.item2targetID(itemID) ]; }
//
//     getTargetItem(targetID: TargetID): JQuery { return this.items[ this.target2itemID(targetID) ]; }
//
//     getTargetPositions = debounce(()=> {
//         let positions = {};
//
//         ''.trimLeft()
//         this.targetIds.forEach(targetID => {
//             positions[ targetID ] = this.getTargetPosition(targetID);
//         });
//         return positions;
//     },100, { leading: true, trailing: true })
//
//     hasPassedTarget(targetID: TargetID, offset: number = 0) {
//         let position       = this.getScrollPosition();
//         let targetPosition = this.getTargetPosition(targetID);
//         return (position + offset) > targetPosition;
//     }
//
//     getSortedTargetPositions(direction: 'asc' | 'desc' = 'asc') { return sortByValues(this.getTargetPositions(), direction === 'desc'); }
//
//     getHighestPassedPositionTargetID(): TargetID | null {
//         let position        = this.getScrollPosition();
//         let sortedPositions = this.getSortedTargetPositions();
//         let highestTargetID = null;
//         for ( const targetID in sortedPositions ) {
//             const targetPosition = sortedPositions[ targetID ];
//             if ( (position + this.offset) > targetPosition ) {
//                 highestTargetID = targetID;
//                 continue;
//             }
//             break;
//         }
//         return highestTargetID;
//     }
//
//     start(startupDelay: number = 1000) {
//         if ( ! this.scrollListener ) {
//             let highestTargetID = null;
//             this.scrollListener = event => {
//                 let pos                    = this.getScrollPosition();
//                 let currentHighestTargetID = this.getHighestPassedPositionTargetID();
//                 if ( highestTargetID !== currentHighestTargetID ) {
//                     highestTargetID = currentHighestTargetID;
//                     this.onChangeCallback(highestTargetID, highestTargetID ? this.target2itemID(highestTargetID) : null);
//                 }
//             };
//         }
//
//         setTimeout(() => {
//             this.el.addEventListener('scroll', this.scrollListener);
//         }, startupDelay);
//     }
//
//     stop() {
//         if ( this.scrollListener ) {
//             this.el.removeEventListener('scroll', this.scrollListener);
//             this.scrollListener = null;
//         }
//     }
//
//     protected onChangeCallback: OnChangeCallback = () => null;
//
//     onChange(cb: OnChangeCallback) {
//         this.onChangeCallback = cb;
//     }
// }

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/utils/storage.js":
/*!************************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/utils/storage.js ***!
  \************************************************************************/
/*! exports provided: Storage, Cookies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Storage", function() { return Storage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cookies", function() { return Cookies; });
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.date.to-string */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.regexp.constructor */ "./node_modules/core-js/modules/es.regexp.constructor.js");
/* harmony import */ var core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lodash/merge */ "./node_modules/lodash/merge.js");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var lz_string__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! lz-string */ "./node_modules/lz-string/libs/lz-string.js");
/* harmony import */ var lz_string__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(lz_string__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");
/* harmony import */ var inversify__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(inversify__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_18__);

















var _dec, _class, _temp, _dec2, _class3;




var typePrefix = '__c_';

function _compress(value) {
  return typePrefix + 'lz-s|' + lz_string__WEBPACK_IMPORTED_MODULE_16___default.a.compressToUTF16(value);
}

function _decompress(value) {
  var type, length, source;
  length = value.length;

  if (length < 9) {
    // then it wasn't compressed by us
    return value;
  }

  type = value.substr(0, 8);
  source = value.substring(9);

  if (type === typePrefix + 'lz-s') {
    value = lz_string__WEBPACK_IMPORTED_MODULE_16___default.a.decompressFromUTF16(source);
  }

  return value;
}

function encode(value) {
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return typePrefix + 'date|' + value.toUTCString();
  }

  if (Object.prototype.toString.call(value) === '[object RegExp]') {
    return typePrefix + 'expr|' + value.source;
  }

  if (typeof value === 'number') {
    return typePrefix + 'numb|' + value;
  }

  if (typeof value === 'boolean') {
    return typePrefix + 'bool|' + (value ? '1' : '0');
  }

  if (typeof value === 'string') {
    return typePrefix + 'strn|' + value;
  }

  if (typeof value === 'function') {
    return typePrefix + 'strn|' + value.toString();
  }

  if (value === Object(value)) {
    return typePrefix + 'objt|' + JSON.stringify(value);
  } // hmm, we don't know what to do with it,
  // so just return it as is


  return value;
}

function decode(value) {
  var type, length, source;
  length = value.length;

  if (length < 9) {
    // then it wasn't encoded by us
    return value;
  }

  type = value.substr(0, 8);
  source = value.substring(9);

  switch (type) {
    case typePrefix + 'date':
      return new Date(source);

    case typePrefix + 'expr':
      return new RegExp(source);

    case typePrefix + 'numb':
      return Number(source);

    case typePrefix + 'bool':
      return Boolean(source === '1');

    case typePrefix + 'strn':
      return '' + source;

    case typePrefix + 'objt':
      return JSON.parse(source);

    default:
      // hmm, we reached here, we don't know the type,
      // then it means it wasn't encoded by us, so just
      // return whatever value it is
      return value;
  }
}

var Storage = (_dec = Object(inversify__WEBPACK_IMPORTED_MODULE_17__["injectable"])(), _dec(_class = (_temp =
/*#__PURE__*/
function () {
  function Storage() {
    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_13__["default"])(this, Storage);

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_15__["default"])(this, "handlers", {
      serialize: function serialize(value) {
        return encode(value);
      },
      deserialize: function deserialize(value) {
        return decode(value);
      },
      compress: function compress(value) {
        return _compress(value);
      },
      decompress: function decompress(value) {
        return _decompress(value);
      }
    });

    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_15__["default"])(this, "options", {
      compression: false,
      seralization: true,
      driver: null
    });
  }

  Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_14__["default"])(Storage, [{
    key: "configure",
    value: function configure() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      options = lodash_merge__WEBPACK_IMPORTED_MODULE_12___default()({
        drivers: Storage.defaultDrivers(),
        driver: 'local'
      }, options);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = options.drivers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var driver = _step.value;
          this.registerDriver(driver);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.use(options.driver);
      return this;
    }
  }, {
    key: "o",
    value: function o() {
      var _this = this;

      var _o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var options = lodash_merge__WEBPACK_IMPORTED_MODULE_12___default()({}, this.options, _o);

      return {
        decode: function decode(value) {
          return options.seralization ? _this.handlers.deserialize(value) : value;
        },
        encode: function encode(value) {
          return options.seralization ? _this.handlers.serialize(value) : value;
        },
        decompress: function decompress(value) {
          return options.compression ? _this.handlers.decompress(value) : value;
        },
        compress: function compress(value) {
          return options.compression ? _this.handlers.compress(value) : value;
        },
        driver: options.driver in this.drivers ? this.drivers[options.driver] : this.driver,
        options: options
      };
    }
  }, {
    key: "registerDriver",
    value: function registerDriver(driver) {
      this.drivers[driver.name] = driver;

      if (!this.driver) {
        this.driver = driver;
      }

      return this;
    }
  }, {
    key: "use",
    value: function use(driverName) {
      if (driverName && driverName in this.drivers) {
        this.driver = this.drivers[driverName];
      }

      return this;
    }
  }, {
    key: "has",
    value: function has(key, options) {
      return this.o(options).driver.has(key);
    }
  }, {
    key: "get",
    value: function get(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _this$o = this.o(options),
          driver = _this$o.driver,
          decode = _this$o.decode,
          decompress = _this$o.decompress;

      var value = defaultValue;

      if (driver.has(key)) {
        value = driver.get(key);
        value = decompress(value);
        value = decode(value);
      }

      return value;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _this$o2 = this.o(options),
          driver = _this$o2.driver,
          encode = _this$o2.encode,
          compress = _this$o2.compress;

      value = encode(value);
      value = compress(value);
      driver.set(key, value);
      return this;
    }
  }, {
    key: "unset",
    value: function unset(key, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.o(options).driver.unset(key);
      return this;
    }
  }, {
    key: "clear",
    value: function clear() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.o(options).driver.clear();
      return this;
    }
  }], [{
    key: "defaultDrivers",
    value: function defaultDrivers() {
      return [new StorageDriver('local', window.localStorage), new StorageDriver('session', window.sessionStorage)];
    }
  }]);

  return Storage;
}(), _temp)) || _class);

var StorageDriver =
/*#__PURE__*/
function () {
  function StorageDriver(name, storage) {
    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_13__["default"])(this, StorageDriver);

    this.storage = storage;
  }

  Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_14__["default"])(StorageDriver, [{
    key: "get",
    value: function get(key) {
      return this.storage.getItem(key);
    }
  }, {
    key: "has",
    value: function has(key) {
      return this.storage.getItem(key) !== undefined && this.storage.getItem(key) !== null;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.storage.setItem(key, value);
    }
  }, {
    key: "unset",
    value: function unset(key) {
      this.storage.removeItem(key);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.storage.clear();
    }
  }, {
    key: "getSize",
    value: function getSize() {
      return this.storage.length;
    }
  }]);

  return StorageDriver;
}();

var Cookies = (_dec2 = Object(inversify__WEBPACK_IMPORTED_MODULE_17__["injectable"])(), _dec2(_class3 =
/*#__PURE__*/
function () {
  Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_14__["default"])(Cookies, [{
    key: "defaults",
    get: function get() {
      return js_cookie__WEBPACK_IMPORTED_MODULE_18___default.a.defaults;
    },
    set: function set(defaults) {
      js_cookie__WEBPACK_IMPORTED_MODULE_18___default.a.defaults = defaults;
    }
  }]);

  function Cookies() {
    Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_13__["default"])(this, Cookies);

    this.defaults.expires = 30; // days
  }

  Object(_Users_ryanthompson_Sites_streams_local_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_14__["default"])(Cookies, [{
    key: "get",
    value: function get(name, defaultValue) {
      if (!this.has(name)) {
        return defaultValue;
      }

      return js_cookie__WEBPACK_IMPORTED_MODULE_18___default.a.get(name);
    }
  }, {
    key: "has",
    value: function has(name) {
      return js_cookie__WEBPACK_IMPORTED_MODULE_18___default.a.get(name) !== undefined;
    }
  }, {
    key: "set",
    value: function set(name, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      js_cookie__WEBPACK_IMPORTED_MODULE_18___default.a.set(name, value, options);
      return this;
    }
    /**
     *
     * @param name
     * @param {cook}options
     * @return {Cookies}
     */

  }, {
    key: "unset",
    value: function unset(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      js_cookie__WEBPACK_IMPORTED_MODULE_18___default.a.remove(name, options);
      return this;
    }
  }]);

  return Cookies;
}()) || _class3); // let stor = window[ 'stor' ] = new Storage({
//     driver : 'local',
//     drivers: Storage.defaultDrivers()
// })
// stor.clear()
// stor.options.compression = true;
// stor.set('var.foo', { a: 'b', bv: 34, c: true, d: { pp: 'cc' } })
//
//
// export let lzstest = window[ 'lzstest' ] = {
//     basic() {
//         var string = 'This is my compression test.';
//         console.log('Size of sample is: ' + string.length);
//         var compressed = lzs.compress(string);
//         console.log('Size of compressed sample is: ' + compressed.length);
//         localStorage.setItem('lzstest-basic', compressed);
//         string = lzs.decompress(localStorage.getItem('lzstest-basic'));
//         console.log('Sample is: ' + string);
//     },
//     utf16() {
//         var string = 'This is my compression test.';
//         console.log('Size of sample is: ' + string.length);
//         var compressed = lzs.compressToUTF16(string);
//         console.log('Size of compressed sample is: ' + compressed.length);
//         localStorage.setItem('lzstest-utf16', compressed);
//         string = lzs.decompressFromUTF16(localStorage.getItem('myData'));
//         console.log('Sample is: ' + string);
//     },
//     uint() {
//         var string = 'This is my compression test.';
//         console.log('Size of sample is: ' + string.length);
//         var compressed = lzs.compressToUint8Array(string);
//         console.log('Size of compressed sample is: ' + compressed.length);
//         // localStorage.setItem("lzstest-utf16",compressed.join(''));
//         string = lzs.decompressFromUint8Array(compressed);
//         console.log('Sample is: ' + string);
//     }
// }

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/utils/styleToString.js":
/*!******************************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/utils/styleToString.js ***!
  \******************************************************************************/
/*! exports provided: styleToString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleToString", function() { return styleToString; });
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2__);



function styleToString(style) {
  var elm = new Option();
  Object.keys(style).forEach(function (a) {
    elm.style[a] = style[a];
  });
  return elm.getAttribute('style');
}

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/utils/thenBy.js":
/*!***********************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/utils/thenBy.js ***!
  \***********************************************************************/
/*! exports provided: firstBy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firstBy", function() { return firstBy; });
//https://github.com/Teun/thenBy.js
function identity(v) {
  return v;
}

function ignoreCase(v) {
  return typeof v === "string" ? v.toLowerCase() : v;
}

function makeCompareFunction(f, opt) {
  opt = typeof opt === "number" ? {
    direction: opt
  } : opt || {};

  if (typeof f != "function") {
    var prop = f; // make unary function

    f = function f(v1) {
      return !!v1[prop] ? v1[prop] : "";
    };
  }

  if (f.length === 1) {
    // f is a unary function mapping a single item to its sort score
    var uf = f;
    var preprocess = opt.ignoreCase ? ignoreCase : identity;

    var cmp = opt.cmp || function (v1, v2) {
      return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
    };

    f = function f(v1, v2) {
      return cmp(preprocess(uf(v1)), preprocess(uf(v2)));
    };
  }

  if (opt.direction === -1) return function (v1, v2) {
    return -f(v1, v2);
  };
  return f;
}
/* adds a secondary compare function to the target function (`this` context)
   which is applied in case the first one returns 0 (equal)
   returns a new compare function, which has a `thenBy` method as well */


function tb(func, opt) {
  /* should get value false for the first call. This can be done by calling the
  exported function, or the firstBy property on it (for es6 module compatibility)
  */
  var x = typeof this == "function" && !this.firstBy ? this : false;
  var y = makeCompareFunction(func, opt);
  var f = x ? function (a, b) {
    return x(a, b) || y(a, b);
  } : y;
  f.thenBy = tb;
  return f;
}

var firstBy = tb;

/***/ }),

/***/ "./vendor/anomaly/streams-platform/resources/src/utils/toJS.js":
/*!*********************************************************************!*\
  !*** ./vendor/anomaly/streams-platform/resources/src/utils/toJS.js ***!
  \*********************************************************************/
/*! exports provided: toJS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toJS", function() { return toJS; });
function toJS(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/***/ }),

/***/ 0:
/*!**********************************************************************!*\
  !*** multi ./vendor/anomaly/streams-platform/resources/src/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/ryanthompson/Sites/streams.local/vendor/anomaly/streams-platform/resources/src/index.js */"./vendor/anomaly/streams-platform/resources/src/index.js");


/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["Vue"]; }());

/***/ })

/******/ });
//# sourceMappingURL=anomaly__streams_platform.js.map