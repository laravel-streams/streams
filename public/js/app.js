/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/alpinejs/dist/alpine.js":
/*!**********************************************!*\
  !*** ./node_modules/alpinejs/dist/alpine.js ***!
  \**********************************************/
/***/ (function(module) {

(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  // Thanks @stimulus:
  // https://github.com/stimulusjs/stimulus/blob/master/packages/%40stimulus/core/src/application.ts
  function domReady() {
    return new Promise(resolve => {
      if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", resolve);
      } else {
        resolve();
      }
    });
  }
  function arrayUnique(array) {
    return Array.from(new Set(array));
  }
  function isTesting() {
    return navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
  }
  function checkedAttrLooseCompare(valueA, valueB) {
    return valueA == valueB;
  }
  function warnIfMalformedTemplate(el, directive) {
    if (el.tagName.toLowerCase() !== 'template') {
      console.warn(`Alpine: [${directive}] directive should only be added to <template> tags. See https://github.com/alpinejs/alpine#${directive}`);
    } else if (el.content.childElementCount !== 1) {
      console.warn(`Alpine: <template> tag with [${directive}] encountered with an unexpected number of root elements. Make sure <template> has a single root element. `);
    }
  }
  function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[_\s]/, '-').toLowerCase();
  }
  function camelCase(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
  }
  function walk(el, callback) {
    if (callback(el) === false) return;
    let node = el.firstElementChild;

    while (node) {
      walk(node, callback);
      node = node.nextElementSibling;
    }
  }
  function debounce(func, wait) {
    var timeout;
    return function () {
      var context = this,
          args = arguments;

      var later = function later() {
        timeout = null;
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const handleError = (el, expression, error) => {
    console.warn(`Alpine Error: "${error}"\n\nExpression: "${expression}"\nElement:`, el);

    if (!isTesting()) {
      Object.assign(error, {
        el,
        expression
      });
      throw error;
    }
  };

  function tryCatch(cb, {
    el,
    expression
  }) {
    try {
      const value = cb();
      return value instanceof Promise ? value.catch(e => handleError(el, expression, e)) : value;
    } catch (e) {
      handleError(el, expression, e);
    }
  }

  function saferEval(el, expression, dataContext, additionalHelperVariables = {}) {
    return tryCatch(() => {
      if (typeof expression === 'function') {
        return expression.call(dataContext);
      }

      return new Function(['$data', ...Object.keys(additionalHelperVariables)], `var __alpine_result; with($data) { __alpine_result = ${expression} }; return __alpine_result`)(dataContext, ...Object.values(additionalHelperVariables));
    }, {
      el,
      expression
    });
  }
  function saferEvalNoReturn(el, expression, dataContext, additionalHelperVariables = {}) {
    return tryCatch(() => {
      if (typeof expression === 'function') {
        return Promise.resolve(expression.call(dataContext, additionalHelperVariables['$event']));
      }

      let AsyncFunction = Function;
      /* MODERN-ONLY:START */

      AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      /* MODERN-ONLY:END */
      // For the cases when users pass only a function reference to the caller: `x-on:click="foo"`
      // Where "foo" is a function. Also, we'll pass the function the event instance when we call it.

      if (Object.keys(dataContext).includes(expression)) {
        let methodReference = new Function(['dataContext', ...Object.keys(additionalHelperVariables)], `with(dataContext) { return ${expression} }`)(dataContext, ...Object.values(additionalHelperVariables));

        if (typeof methodReference === 'function') {
          return Promise.resolve(methodReference.call(dataContext, additionalHelperVariables['$event']));
        } else {
          return Promise.resolve();
        }
      }

      return Promise.resolve(new AsyncFunction(['dataContext', ...Object.keys(additionalHelperVariables)], `with(dataContext) { ${expression} }`)(dataContext, ...Object.values(additionalHelperVariables)));
    }, {
      el,
      expression
    });
  }
  const xAttrRE = /^x-(on|bind|data|text|html|model|if|for|show|cloak|transition|ref|spread)\b/;
  function isXAttr(attr) {
    const name = replaceAtAndColonWithStandardSyntax(attr.name);
    return xAttrRE.test(name);
  }
  function getXAttrs(el, component, type) {
    let directives = Array.from(el.attributes).filter(isXAttr).map(parseHtmlAttribute); // Get an object of directives from x-spread.

    let spreadDirective = directives.filter(directive => directive.type === 'spread')[0];

    if (spreadDirective) {
      let spreadObject = saferEval(el, spreadDirective.expression, component.$data); // Add x-spread directives to the pile of existing directives.

      directives = directives.concat(Object.entries(spreadObject).map(([name, value]) => parseHtmlAttribute({
        name,
        value
      })));
    }

    if (type) return directives.filter(i => i.type === type);
    return sortDirectives(directives);
  }

  function sortDirectives(directives) {
    let directiveOrder = ['bind', 'model', 'show', 'catch-all'];
    return directives.sort((a, b) => {
      let typeA = directiveOrder.indexOf(a.type) === -1 ? 'catch-all' : a.type;
      let typeB = directiveOrder.indexOf(b.type) === -1 ? 'catch-all' : b.type;
      return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
    });
  }

  function parseHtmlAttribute({
    name,
    value
  }) {
    const normalizedName = replaceAtAndColonWithStandardSyntax(name);
    const typeMatch = normalizedName.match(xAttrRE);
    const valueMatch = normalizedName.match(/:([a-zA-Z0-9\-:]+)/);
    const modifiers = normalizedName.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
    return {
      type: typeMatch ? typeMatch[1] : null,
      value: valueMatch ? valueMatch[1] : null,
      modifiers: modifiers.map(i => i.replace('.', '')),
      expression: value
    };
  }
  function isBooleanAttr(attrName) {
    // As per HTML spec table https://html.spec.whatwg.org/multipage/indices.html#attributes-3:boolean-attribute
    // Array roughly ordered by estimated usage
    const booleanAttributes = ['disabled', 'checked', 'required', 'readonly', 'hidden', 'open', 'selected', 'autofocus', 'itemscope', 'multiple', 'novalidate', 'allowfullscreen', 'allowpaymentrequest', 'formnovalidate', 'autoplay', 'controls', 'loop', 'muted', 'playsinline', 'default', 'ismap', 'reversed', 'async', 'defer', 'nomodule'];
    return booleanAttributes.includes(attrName);
  }
  function replaceAtAndColonWithStandardSyntax(name) {
    if (name.startsWith('@')) {
      return name.replace('@', 'x-on:');
    } else if (name.startsWith(':')) {
      return name.replace(':', 'x-bind:');
    }

    return name;
  }
  function convertClassStringToArray(classList, filterFn = Boolean) {
    return classList.split(' ').filter(filterFn);
  }
  const TRANSITION_TYPE_IN = 'in';
  const TRANSITION_TYPE_OUT = 'out';
  const TRANSITION_CANCELLED = 'cancelled';
  function transitionIn(el, show, reject, component, forceSkip = false) {
    // We don't want to transition on the initial page load.
    if (forceSkip) return show();

    if (el.__x_transition && el.__x_transition.type === TRANSITION_TYPE_IN) {
      // there is already a similar transition going on, this was probably triggered by
      // a change in a different property, let's just leave the previous one doing its job
      return;
    }

    const attrs = getXAttrs(el, component, 'transition');
    const showAttr = getXAttrs(el, component, 'show')[0]; // If this is triggered by a x-show.transition.

    if (showAttr && showAttr.modifiers.includes('transition')) {
      let modifiers = showAttr.modifiers; // If x-show.transition.out, we'll skip the "in" transition.

      if (modifiers.includes('out') && !modifiers.includes('in')) return show();
      const settingBothSidesOfTransition = modifiers.includes('in') && modifiers.includes('out'); // If x-show.transition.in...out... only use "in" related modifiers for this transition.

      modifiers = settingBothSidesOfTransition ? modifiers.filter((i, index) => index < modifiers.indexOf('out')) : modifiers;
      transitionHelperIn(el, modifiers, show, reject); // Otherwise, we can assume x-transition:enter.
    } else if (attrs.some(attr => ['enter', 'enter-start', 'enter-end'].includes(attr.value))) {
      transitionClassesIn(el, component, attrs, show, reject);
    } else {
      // If neither, just show that damn thing.
      show();
    }
  }
  function transitionOut(el, hide, reject, component, forceSkip = false) {
    // We don't want to transition on the initial page load.
    if (forceSkip) return hide();

    if (el.__x_transition && el.__x_transition.type === TRANSITION_TYPE_OUT) {
      // there is already a similar transition going on, this was probably triggered by
      // a change in a different property, let's just leave the previous one doing its job
      return;
    }

    const attrs = getXAttrs(el, component, 'transition');
    const showAttr = getXAttrs(el, component, 'show')[0];

    if (showAttr && showAttr.modifiers.includes('transition')) {
      let modifiers = showAttr.modifiers;
      if (modifiers.includes('in') && !modifiers.includes('out')) return hide();
      const settingBothSidesOfTransition = modifiers.includes('in') && modifiers.includes('out');
      modifiers = settingBothSidesOfTransition ? modifiers.filter((i, index) => index > modifiers.indexOf('out')) : modifiers;
      transitionHelperOut(el, modifiers, settingBothSidesOfTransition, hide, reject);
    } else if (attrs.some(attr => ['leave', 'leave-start', 'leave-end'].includes(attr.value))) {
      transitionClassesOut(el, component, attrs, hide, reject);
    } else {
      hide();
    }
  }
  function transitionHelperIn(el, modifiers, showCallback, reject) {
    // Default values inspired by: https://material.io/design/motion/speed.html#duration
    const styleValues = {
      duration: modifierValue(modifiers, 'duration', 150),
      origin: modifierValue(modifiers, 'origin', 'center'),
      first: {
        opacity: 0,
        scale: modifierValue(modifiers, 'scale', 95)
      },
      second: {
        opacity: 1,
        scale: 100
      }
    };
    transitionHelper(el, modifiers, showCallback, () => {}, reject, styleValues, TRANSITION_TYPE_IN);
  }
  function transitionHelperOut(el, modifiers, settingBothSidesOfTransition, hideCallback, reject) {
    // Make the "out" transition .5x slower than the "in". (Visually better)
    // HOWEVER, if they explicitly set a duration for the "out" transition,
    // use that.
    const duration = settingBothSidesOfTransition ? modifierValue(modifiers, 'duration', 150) : modifierValue(modifiers, 'duration', 150) / 2;
    const styleValues = {
      duration: duration,
      origin: modifierValue(modifiers, 'origin', 'center'),
      first: {
        opacity: 1,
        scale: 100
      },
      second: {
        opacity: 0,
        scale: modifierValue(modifiers, 'scale', 95)
      }
    };
    transitionHelper(el, modifiers, () => {}, hideCallback, reject, styleValues, TRANSITION_TYPE_OUT);
  }

  function modifierValue(modifiers, key, fallback) {
    // If the modifier isn't present, use the default.
    if (modifiers.indexOf(key) === -1) return fallback; // If it IS present, grab the value after it: x-show.transition.duration.500ms

    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue) return fallback;

    if (key === 'scale') {
      // Check if the very next value is NOT a number and return the fallback.
      // If x-show.transition.scale, we'll use the default scale value.
      // That is how a user opts out of the opacity transition.
      if (!isNumeric(rawValue)) return fallback;
    }

    if (key === 'duration') {
      // Support x-show.transition.duration.500ms && duration.500
      let match = rawValue.match(/([0-9]+)ms/);
      if (match) return match[1];
    }

    if (key === 'origin') {
      // Support chaining origin directions: x-show.transition.top.right
      if (['top', 'right', 'left', 'center', 'bottom'].includes(modifiers[modifiers.indexOf(key) + 2])) {
        return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(' ');
      }
    }

    return rawValue;
  }

  function transitionHelper(el, modifiers, hook1, hook2, reject, styleValues, type) {
    // clear the previous transition if exists to avoid caching the wrong styles
    if (el.__x_transition) {
      el.__x_transition.cancel && el.__x_transition.cancel();
    } // If the user set these style values, we'll put them back when we're done with them.


    const opacityCache = el.style.opacity;
    const transformCache = el.style.transform;
    const transformOriginCache = el.style.transformOrigin; // If no modifiers are present: x-show.transition, we'll default to both opacity and scale.

    const noModifiers = !modifiers.includes('opacity') && !modifiers.includes('scale');
    const transitionOpacity = noModifiers || modifiers.includes('opacity');
    const transitionScale = noModifiers || modifiers.includes('scale'); // These are the explicit stages of a transition (same stages for in and for out).
    // This way you can get a birds eye view of the hooks, and the differences
    // between them.

    const stages = {
      start() {
        if (transitionOpacity) el.style.opacity = styleValues.first.opacity;
        if (transitionScale) el.style.transform = `scale(${styleValues.first.scale / 100})`;
      },

      during() {
        if (transitionScale) el.style.transformOrigin = styleValues.origin;
        el.style.transitionProperty = [transitionOpacity ? `opacity` : ``, transitionScale ? `transform` : ``].join(' ').trim();
        el.style.transitionDuration = `${styleValues.duration / 1000}s`;
        el.style.transitionTimingFunction = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
      },

      show() {
        hook1();
      },

      end() {
        if (transitionOpacity) el.style.opacity = styleValues.second.opacity;
        if (transitionScale) el.style.transform = `scale(${styleValues.second.scale / 100})`;
      },

      hide() {
        hook2();
      },

      cleanup() {
        if (transitionOpacity) el.style.opacity = opacityCache;
        if (transitionScale) el.style.transform = transformCache;
        if (transitionScale) el.style.transformOrigin = transformOriginCache;
        el.style.transitionProperty = null;
        el.style.transitionDuration = null;
        el.style.transitionTimingFunction = null;
      }

    };
    transition(el, stages, type, reject);
  }

  const ensureStringExpression = (expression, el, component) => {
    return typeof expression === 'function' ? component.evaluateReturnExpression(el, expression) : expression;
  };

  function transitionClassesIn(el, component, directives, showCallback, reject) {
    const enter = convertClassStringToArray(ensureStringExpression((directives.find(i => i.value === 'enter') || {
      expression: ''
    }).expression, el, component));
    const enterStart = convertClassStringToArray(ensureStringExpression((directives.find(i => i.value === 'enter-start') || {
      expression: ''
    }).expression, el, component));
    const enterEnd = convertClassStringToArray(ensureStringExpression((directives.find(i => i.value === 'enter-end') || {
      expression: ''
    }).expression, el, component));
    transitionClasses(el, enter, enterStart, enterEnd, showCallback, () => {}, TRANSITION_TYPE_IN, reject);
  }
  function transitionClassesOut(el, component, directives, hideCallback, reject) {
    const leave = convertClassStringToArray(ensureStringExpression((directives.find(i => i.value === 'leave') || {
      expression: ''
    }).expression, el, component));
    const leaveStart = convertClassStringToArray(ensureStringExpression((directives.find(i => i.value === 'leave-start') || {
      expression: ''
    }).expression, el, component));
    const leaveEnd = convertClassStringToArray(ensureStringExpression((directives.find(i => i.value === 'leave-end') || {
      expression: ''
    }).expression, el, component));
    transitionClasses(el, leave, leaveStart, leaveEnd, () => {}, hideCallback, TRANSITION_TYPE_OUT, reject);
  }
  function transitionClasses(el, classesDuring, classesStart, classesEnd, hook1, hook2, type, reject) {
    // clear the previous transition if exists to avoid caching the wrong classes
    if (el.__x_transition) {
      el.__x_transition.cancel && el.__x_transition.cancel();
    }

    const originalClasses = el.__x_original_classes || [];
    const stages = {
      start() {
        el.classList.add(...classesStart);
      },

      during() {
        el.classList.add(...classesDuring);
      },

      show() {
        hook1();
      },

      end() {
        // Don't remove classes that were in the original class attribute.
        el.classList.remove(...classesStart.filter(i => !originalClasses.includes(i)));
        el.classList.add(...classesEnd);
      },

      hide() {
        hook2();
      },

      cleanup() {
        el.classList.remove(...classesDuring.filter(i => !originalClasses.includes(i)));
        el.classList.remove(...classesEnd.filter(i => !originalClasses.includes(i)));
      }

    };
    transition(el, stages, type, reject);
  }
  function transition(el, stages, type, reject) {
    const finish = once(() => {
      stages.hide(); // Adding an "isConnected" check, in case the callback
      // removed the element from the DOM.

      if (el.isConnected) {
        stages.cleanup();
      }

      delete el.__x_transition;
    });
    el.__x_transition = {
      // Set transition type so we can avoid clearing transition if the direction is the same
      type: type,
      // create a callback for the last stages of the transition so we can call it
      // from different point and early terminate it. Once will ensure that function
      // is only called one time.
      cancel: once(() => {
        reject(TRANSITION_CANCELLED);
        finish();
      }),
      finish,
      // This store the next animation frame so we can cancel it
      nextFrame: null
    };
    stages.start();
    stages.during();
    el.__x_transition.nextFrame = requestAnimationFrame(() => {
      // Note: Safari's transitionDuration property will list out comma separated transition durations
      // for every single transition property. Let's grab the first one and call it a day.
      let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, '').replace('s', '')) * 1000;

      if (duration === 0) {
        duration = Number(getComputedStyle(el).animationDuration.replace('s', '')) * 1000;
      }

      stages.show();
      el.__x_transition.nextFrame = requestAnimationFrame(() => {
        stages.end();
        setTimeout(el.__x_transition.finish, duration);
      });
    });
  }
  function isNumeric(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  } // Thanks @vuejs
  // https://github.com/vuejs/vue/blob/4de4649d9637262a9b007720b59f80ac72a5620c/src/shared/util.js

  function once(callback) {
    let called = false;
    return function () {
      if (!called) {
        called = true;
        callback.apply(this, arguments);
      }
    };
  }

  function handleForDirective(component, templateEl, expression, initialUpdate, extraVars) {
    warnIfMalformedTemplate(templateEl, 'x-for');
    let iteratorNames = typeof expression === 'function' ? parseForExpression(component.evaluateReturnExpression(templateEl, expression)) : parseForExpression(expression);
    let items = evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(component, templateEl, iteratorNames, extraVars); // As we walk the array, we'll also walk the DOM (updating/creating as we go).

    let currentEl = templateEl;
    items.forEach((item, index) => {
      let iterationScopeVariables = getIterationScopeVariables(iteratorNames, item, index, items, extraVars());
      let currentKey = generateKeyForIteration(component, templateEl, index, iterationScopeVariables);
      let nextEl = lookAheadForMatchingKeyedElementAndMoveItIfFound(currentEl.nextElementSibling, currentKey); // If we haven't found a matching key, insert the element at the current position.

      if (!nextEl) {
        nextEl = addElementInLoopAfterCurrentEl(templateEl, currentEl); // And transition it in if it's not the first page load.

        transitionIn(nextEl, () => {}, () => {}, component, initialUpdate);
        nextEl.__x_for = iterationScopeVariables;
        component.initializeElements(nextEl, () => nextEl.__x_for); // Otherwise update the element we found.
      } else {
        // Temporarily remove the key indicator to allow the normal "updateElements" to work.
        delete nextEl.__x_for_key;
        nextEl.__x_for = iterationScopeVariables;
        component.updateElements(nextEl, () => nextEl.__x_for);
      }

      currentEl = nextEl;
      currentEl.__x_for_key = currentKey;
    });
    removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component);
  } // This was taken from VueJS 2.* core. Thanks Vue!

  function parseForExpression(expression) {
    let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    let stripParensRE = /^\(|\)$/g;
    let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    let inMatch = String(expression).match(forAliasRE);
    if (!inMatch) return;
    let res = {};
    res.items = inMatch[2].trim();
    let item = inMatch[1].trim().replace(stripParensRE, '');
    let iteratorMatch = item.match(forIteratorRE);

    if (iteratorMatch) {
      res.item = item.replace(forIteratorRE, '').trim();
      res.index = iteratorMatch[1].trim();

      if (iteratorMatch[2]) {
        res.collection = iteratorMatch[2].trim();
      }
    } else {
      res.item = item;
    }

    return res;
  }

  function getIterationScopeVariables(iteratorNames, item, index, items, extraVars) {
    // We must create a new object, so each iteration has a new scope
    let scopeVariables = extraVars ? _objectSpread2({}, extraVars) : {};
    scopeVariables[iteratorNames.item] = item;
    if (iteratorNames.index) scopeVariables[iteratorNames.index] = index;
    if (iteratorNames.collection) scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
  }

  function generateKeyForIteration(component, el, index, iterationScopeVariables) {
    let bindKeyAttribute = getXAttrs(el, component, 'bind').filter(attr => attr.value === 'key')[0]; // If the dev hasn't specified a key, just return the index of the iteration.

    if (!bindKeyAttribute) return index;
    return component.evaluateReturnExpression(el, bindKeyAttribute.expression, () => iterationScopeVariables);
  }

  function evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(component, el, iteratorNames, extraVars) {
    let ifAttribute = getXAttrs(el, component, 'if')[0];

    if (ifAttribute && !component.evaluateReturnExpression(el, ifAttribute.expression)) {
      return [];
    }

    let items = component.evaluateReturnExpression(el, iteratorNames.items, extraVars); // This adds support for the `i in n` syntax.

    if (isNumeric(items) && items >= 0) {
      items = Array.from(Array(items).keys(), i => i + 1);
    }

    return items;
  }

  function addElementInLoopAfterCurrentEl(templateEl, currentEl) {
    let clone = document.importNode(templateEl.content, true);
    currentEl.parentElement.insertBefore(clone, currentEl.nextElementSibling);
    return currentEl.nextElementSibling;
  }

  function lookAheadForMatchingKeyedElementAndMoveItIfFound(nextEl, currentKey) {
    if (!nextEl) return; // If we are already past the x-for generated elements, we don't need to look ahead.

    if (nextEl.__x_for_key === undefined) return; // If the the key's DO match, no need to look ahead.

    if (nextEl.__x_for_key === currentKey) return nextEl; // If they don't, we'll look ahead for a match.
    // If we find it, we'll move it to the current position in the loop.

    let tmpNextEl = nextEl;

    while (tmpNextEl) {
      if (tmpNextEl.__x_for_key === currentKey) {
        return tmpNextEl.parentElement.insertBefore(tmpNextEl, nextEl);
      }

      tmpNextEl = tmpNextEl.nextElementSibling && tmpNextEl.nextElementSibling.__x_for_key !== undefined ? tmpNextEl.nextElementSibling : false;
    }
  }

  function removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component) {
    var nextElementFromOldLoop = currentEl.nextElementSibling && currentEl.nextElementSibling.__x_for_key !== undefined ? currentEl.nextElementSibling : false;

    while (nextElementFromOldLoop) {
      let nextElementFromOldLoopImmutable = nextElementFromOldLoop;
      let nextSibling = nextElementFromOldLoop.nextElementSibling;
      transitionOut(nextElementFromOldLoop, () => {
        nextElementFromOldLoopImmutable.remove();
      }, () => {}, component);
      nextElementFromOldLoop = nextSibling && nextSibling.__x_for_key !== undefined ? nextSibling : false;
    }
  }

  function handleAttributeBindingDirective(component, el, attrName, expression, extraVars, attrType, modifiers) {
    var value = component.evaluateReturnExpression(el, expression, extraVars);

    if (attrName === 'value') {
      if (Alpine.ignoreFocusedForValueBinding && document.activeElement.isSameNode(el)) return; // If nested model key is undefined, set the default value to empty string.

      if (value === undefined && String(expression).match(/\./)) {
        value = '';
      }

      if (el.type === 'radio') {
        // Set radio value from x-bind:value, if no "value" attribute exists.
        // If there are any initial state values, radio will have a correct
        // "checked" value since x-bind:value is processed before x-model.
        if (el.attributes.value === undefined && attrType === 'bind') {
          el.value = value;
        } else if (attrType !== 'bind') {
          el.checked = checkedAttrLooseCompare(el.value, value);
        }
      } else if (el.type === 'checkbox') {
        // If we are explicitly binding a string to the :value, set the string,
        // If the value is a boolean, leave it alone, it will be set to "on"
        // automatically.
        if (typeof value !== 'boolean' && ![null, undefined].includes(value) && attrType === 'bind') {
          el.value = String(value);
        } else if (attrType !== 'bind') {
          if (Array.isArray(value)) {
            // I'm purposely not using Array.includes here because it's
            // strict, and because of Numeric/String mis-casting, I
            // want the "includes" to be "fuzzy".
            el.checked = value.some(val => checkedAttrLooseCompare(val, el.value));
          } else {
            el.checked = !!value;
          }
        }
      } else if (el.tagName === 'SELECT') {
        updateSelect(el, value);
      } else {
        if (el.value === value) return;
        el.value = value;
      }
    } else if (attrName === 'class') {
      if (Array.isArray(value)) {
        const originalClasses = el.__x_original_classes || [];
        el.setAttribute('class', arrayUnique(originalClasses.concat(value)).join(' '));
      } else if (typeof value === 'object') {
        // Sorting the keys / class names by their boolean value will ensure that
        // anything that evaluates to `false` and needs to remove classes is run first.
        const keysSortedByBooleanValue = Object.keys(value).sort((a, b) => value[a] - value[b]);
        keysSortedByBooleanValue.forEach(classNames => {
          if (value[classNames]) {
            convertClassStringToArray(classNames).forEach(className => el.classList.add(className));
          } else {
            convertClassStringToArray(classNames).forEach(className => el.classList.remove(className));
          }
        });
      } else {
        const originalClasses = el.__x_original_classes || [];
        const newClasses = value ? convertClassStringToArray(value) : [];
        el.setAttribute('class', arrayUnique(originalClasses.concat(newClasses)).join(' '));
      }
    } else {
      attrName = modifiers.includes('camel') ? camelCase(attrName) : attrName; // If an attribute's bound value is null, undefined or false, remove the attribute

      if ([null, undefined, false].includes(value)) {
        el.removeAttribute(attrName);
      } else {
        isBooleanAttr(attrName) ? setIfChanged(el, attrName, attrName) : setIfChanged(el, attrName, value);
      }
    }
  }

  function setIfChanged(el, attrName, value) {
    if (el.getAttribute(attrName) != value) {
      el.setAttribute(attrName, value);
    }
  }

  function updateSelect(el, value) {
    const arrayWrappedValue = [].concat(value).map(value => {
      return value + '';
    });
    Array.from(el.options).forEach(option => {
      option.selected = arrayWrappedValue.includes(option.value || option.text);
    });
  }

  function handleTextDirective(el, output, expression) {
    // If nested model key is undefined, set the default value to empty string.
    if (output === undefined && String(expression).match(/\./)) {
      output = '';
    }

    el.textContent = output;
  }

  function handleHtmlDirective(component, el, expression, extraVars) {
    el.innerHTML = component.evaluateReturnExpression(el, expression, extraVars);
  }

  function handleShowDirective(component, el, value, modifiers, initialUpdate = false) {
    const hide = () => {
      el.style.display = 'none';
      el.__x_is_shown = false;
    };

    const show = () => {
      if (el.style.length === 1 && el.style.display === 'none') {
        el.removeAttribute('style');
      } else {
        el.style.removeProperty('display');
      }

      el.__x_is_shown = true;
    };

    if (initialUpdate === true) {
      if (value) {
        show();
      } else {
        hide();
      }

      return;
    }

    const handle = (resolve, reject) => {
      if (value) {
        if (el.style.display === 'none' || el.__x_transition) {
          transitionIn(el, () => {
            show();
          }, reject, component);
        }

        resolve(() => {});
      } else {
        if (el.style.display !== 'none') {
          transitionOut(el, () => {
            resolve(() => {
              hide();
            });
          }, reject, component);
        } else {
          resolve(() => {});
        }
      }
    }; // The working of x-show is a bit complex because we need to
    // wait for any child transitions to finish before hiding
    // some element. Also, this has to be done recursively.
    // If x-show.immediate, foregoe the waiting.


    if (modifiers.includes('immediate')) {
      handle(finish => finish(), () => {});
      return;
    } // x-show is encountered during a DOM tree walk. If an element
    // we encounter is NOT a child of another x-show element we
    // can execute the previous x-show stack (if one exists).


    if (component.showDirectiveLastElement && !component.showDirectiveLastElement.contains(el)) {
      component.executeAndClearRemainingShowDirectiveStack();
    }

    component.showDirectiveStack.push(handle);
    component.showDirectiveLastElement = el;
  }

  function handleIfDirective(component, el, expressionResult, initialUpdate, extraVars) {
    warnIfMalformedTemplate(el, 'x-if');
    const elementHasAlreadyBeenAdded = el.nextElementSibling && el.nextElementSibling.__x_inserted_me === true;

    if (expressionResult && (!elementHasAlreadyBeenAdded || el.__x_transition)) {
      const clone = document.importNode(el.content, true);
      el.parentElement.insertBefore(clone, el.nextElementSibling);
      transitionIn(el.nextElementSibling, () => {}, () => {}, component, initialUpdate);
      component.initializeElements(el.nextElementSibling, extraVars);
      el.nextElementSibling.__x_inserted_me = true;
    } else if (!expressionResult && elementHasAlreadyBeenAdded) {
      transitionOut(el.nextElementSibling, () => {
        el.nextElementSibling.remove();
      }, () => {}, component, initialUpdate);
    }
  }

  function registerListener(component, el, event, modifiers, expression, extraVars = {}) {
    const options = {
      passive: modifiers.includes('passive')
    };

    if (modifiers.includes('camel')) {
      event = camelCase(event);
    }

    let handler, listenerTarget;

    if (modifiers.includes('away')) {
      listenerTarget = document;

      handler = e => {
        // Don't do anything if the click came from the element or within it.
        if (el.contains(e.target)) return; // Don't do anything if this element isn't currently visible.

        if (el.offsetWidth < 1 && el.offsetHeight < 1) return; // Now that we are sure the element is visible, AND the click
        // is from outside it, let's run the expression.

        runListenerHandler(component, expression, e, extraVars);

        if (modifiers.includes('once')) {
          document.removeEventListener(event, handler, options);
        }
      };
    } else {
      listenerTarget = modifiers.includes('window') ? window : modifiers.includes('document') ? document : el;

      handler = e => {
        // Remove this global event handler if the element that declared it
        // has been removed. It's now stale.
        if (listenerTarget === window || listenerTarget === document) {
          if (!document.body.contains(el)) {
            listenerTarget.removeEventListener(event, handler, options);
            return;
          }
        }

        if (isKeyEvent(event)) {
          if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
            return;
          }
        }

        if (modifiers.includes('prevent')) e.preventDefault();
        if (modifiers.includes('stop')) e.stopPropagation(); // If the .self modifier isn't present, or if it is present and
        // the target element matches the element we are registering the
        // event on, run the handler

        if (!modifiers.includes('self') || e.target === el) {
          const returnValue = runListenerHandler(component, expression, e, extraVars);
          returnValue.then(value => {
            if (value === false) {
              e.preventDefault();
            } else {
              if (modifiers.includes('once')) {
                listenerTarget.removeEventListener(event, handler, options);
              }
            }
          });
        }
      };
    }

    if (modifiers.includes('debounce')) {
      let nextModifier = modifiers[modifiers.indexOf('debounce') + 1] || 'invalid-wait';
      let wait = isNumeric(nextModifier.split('ms')[0]) ? Number(nextModifier.split('ms')[0]) : 250;
      handler = debounce(handler, wait);
    }

    listenerTarget.addEventListener(event, handler, options);
  }

  function runListenerHandler(component, expression, e, extraVars) {
    return component.evaluateCommandExpression(e.target, expression, () => {
      return _objectSpread2(_objectSpread2({}, extraVars()), {}, {
        '$event': e
      });
    });
  }

  function isKeyEvent(event) {
    return ['keydown', 'keyup'].includes(event);
  }

  function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
    let keyModifiers = modifiers.filter(i => {
      return !['window', 'document', 'prevent', 'stop'].includes(i);
    });

    if (keyModifiers.includes('debounce')) {
      let debounceIndex = keyModifiers.indexOf('debounce');
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
    } // If no modifier is specified, we'll call it a press.


    if (keyModifiers.length === 0) return false; // If one is passed, AND it matches the key pressed, we'll call it a press.

    if (keyModifiers.length === 1 && keyModifiers[0] === keyToModifier(e.key)) return false; // The user is listening for key combinations.

    const systemKeyModifiers = ['ctrl', 'shift', 'alt', 'meta', 'cmd', 'super'];
    const selectedSystemKeyModifiers = systemKeyModifiers.filter(modifier => keyModifiers.includes(modifier));
    keyModifiers = keyModifiers.filter(i => !selectedSystemKeyModifiers.includes(i));

    if (selectedSystemKeyModifiers.length > 0) {
      const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter(modifier => {
        // Alias "cmd" and "super" to "meta"
        if (modifier === 'cmd' || modifier === 'super') modifier = 'meta';
        return e[`${modifier}Key`];
      }); // If all the modifiers selected are pressed, ...

      if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
        // AND the remaining key is pressed as well. It's a press.
        if (keyModifiers[0] === keyToModifier(e.key)) return false;
      }
    } // We'll call it NOT a valid keypress.


    return true;
  }

  function keyToModifier(key) {
    switch (key) {
      case '/':
        return 'slash';

      case ' ':
      case 'Spacebar':
        return 'space';

      default:
        return key && kebabCase(key);
    }
  }

  function registerModelListener(component, el, modifiers, expression, extraVars) {
    // If the element we are binding to is a select, a radio, or checkbox
    // we'll listen for the change event instead of the "input" event.
    var event = el.tagName.toLowerCase() === 'select' || ['checkbox', 'radio'].includes(el.type) || modifiers.includes('lazy') ? 'change' : 'input';
    const listenerExpression = `${expression} = rightSideOfExpression($event, ${expression})`;
    registerListener(component, el, event, modifiers, listenerExpression, () => {
      return _objectSpread2(_objectSpread2({}, extraVars()), {}, {
        rightSideOfExpression: generateModelAssignmentFunction(el, modifiers, expression)
      });
    });
  }

  function generateModelAssignmentFunction(el, modifiers, expression) {
    if (el.type === 'radio') {
      // Radio buttons only work properly when they share a name attribute.
      // People might assume we take care of that for them, because
      // they already set a shared "x-model" attribute.
      if (!el.hasAttribute('name')) el.setAttribute('name', expression);
    }

    return (event, currentValue) => {
      // Check for event.detail due to an issue where IE11 handles other events as a CustomEvent.
      if (event instanceof CustomEvent && event.detail) {
        return event.detail;
      } else if (el.type === 'checkbox') {
        // If the data we are binding to is an array, toggle its value inside the array.
        if (Array.isArray(currentValue)) {
          const newValue = modifiers.includes('number') ? safeParseNumber(event.target.value) : event.target.value;
          return event.target.checked ? currentValue.concat([newValue]) : currentValue.filter(el => !checkedAttrLooseCompare(el, newValue));
        } else {
          return event.target.checked;
        }
      } else if (el.tagName.toLowerCase() === 'select' && el.multiple) {
        return modifiers.includes('number') ? Array.from(event.target.selectedOptions).map(option => {
          const rawValue = option.value || option.text;
          return safeParseNumber(rawValue);
        }) : Array.from(event.target.selectedOptions).map(option => {
          return option.value || option.text;
        });
      } else {
        const rawValue = event.target.value;
        return modifiers.includes('number') ? safeParseNumber(rawValue) : modifiers.includes('trim') ? rawValue.trim() : rawValue;
      }
    };
  }

  function safeParseNumber(rawValue) {
    const number = rawValue ? parseFloat(rawValue) : null;
    return isNumeric(number) ? number : rawValue;
  }

  /**
   * Copyright (C) 2017 salesforce.com, inc.
   */
  const { isArray } = Array;
  const { getPrototypeOf, create: ObjectCreate, defineProperty: ObjectDefineProperty, defineProperties: ObjectDefineProperties, isExtensible, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols, preventExtensions, hasOwnProperty, } = Object;
  const { push: ArrayPush, concat: ArrayConcat, map: ArrayMap, } = Array.prototype;
  function isUndefined(obj) {
      return obj === undefined;
  }
  function isFunction(obj) {
      return typeof obj === 'function';
  }
  function isObject(obj) {
      return typeof obj === 'object';
  }
  const proxyToValueMap = new WeakMap();
  function registerProxy(proxy, value) {
      proxyToValueMap.set(proxy, value);
  }
  const unwrap = (replicaOrAny) => proxyToValueMap.get(replicaOrAny) || replicaOrAny;

  function wrapValue(membrane, value) {
      return membrane.valueIsObservable(value) ? membrane.getProxy(value) : value;
  }
  /**
   * Unwrap property descriptors will set value on original descriptor
   * We only need to unwrap if value is specified
   * @param descriptor external descrpitor provided to define new property on original value
   */
  function unwrapDescriptor(descriptor) {
      if (hasOwnProperty.call(descriptor, 'value')) {
          descriptor.value = unwrap(descriptor.value);
      }
      return descriptor;
  }
  function lockShadowTarget(membrane, shadowTarget, originalTarget) {
      const targetKeys = ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
      targetKeys.forEach((key) => {
          let descriptor = getOwnPropertyDescriptor(originalTarget, key);
          // We do not need to wrap the descriptor if configurable
          // Because we can deal with wrapping it when user goes through
          // Get own property descriptor. There is also a chance that this descriptor
          // could change sometime in the future, so we can defer wrapping
          // until we need to
          if (!descriptor.configurable) {
              descriptor = wrapDescriptor(membrane, descriptor, wrapValue);
          }
          ObjectDefineProperty(shadowTarget, key, descriptor);
      });
      preventExtensions(shadowTarget);
  }
  class ReactiveProxyHandler {
      constructor(membrane, value) {
          this.originalTarget = value;
          this.membrane = membrane;
      }
      get(shadowTarget, key) {
          const { originalTarget, membrane } = this;
          const value = originalTarget[key];
          const { valueObserved } = membrane;
          valueObserved(originalTarget, key);
          return membrane.getProxy(value);
      }
      set(shadowTarget, key, value) {
          const { originalTarget, membrane: { valueMutated } } = this;
          const oldValue = originalTarget[key];
          if (oldValue !== value) {
              originalTarget[key] = value;
              valueMutated(originalTarget, key);
          }
          else if (key === 'length' && isArray(originalTarget)) {
              // fix for issue #236: push will add the new index, and by the time length
              // is updated, the internal length is already equal to the new length value
              // therefore, the oldValue is equal to the value. This is the forking logic
              // to support this use case.
              valueMutated(originalTarget, key);
          }
          return true;
      }
      deleteProperty(shadowTarget, key) {
          const { originalTarget, membrane: { valueMutated } } = this;
          delete originalTarget[key];
          valueMutated(originalTarget, key);
          return true;
      }
      apply(shadowTarget, thisArg, argArray) {
          /* No op */
      }
      construct(target, argArray, newTarget) {
          /* No op */
      }
      has(shadowTarget, key) {
          const { originalTarget, membrane: { valueObserved } } = this;
          valueObserved(originalTarget, key);
          return key in originalTarget;
      }
      ownKeys(shadowTarget) {
          const { originalTarget } = this;
          return ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
      }
      isExtensible(shadowTarget) {
          const shadowIsExtensible = isExtensible(shadowTarget);
          if (!shadowIsExtensible) {
              return shadowIsExtensible;
          }
          const { originalTarget, membrane } = this;
          const targetIsExtensible = isExtensible(originalTarget);
          if (!targetIsExtensible) {
              lockShadowTarget(membrane, shadowTarget, originalTarget);
          }
          return targetIsExtensible;
      }
      setPrototypeOf(shadowTarget, prototype) {
      }
      getPrototypeOf(shadowTarget) {
          const { originalTarget } = this;
          return getPrototypeOf(originalTarget);
      }
      getOwnPropertyDescriptor(shadowTarget, key) {
          const { originalTarget, membrane } = this;
          const { valueObserved } = this.membrane;
          // keys looked up via hasOwnProperty need to be reactive
          valueObserved(originalTarget, key);
          let desc = getOwnPropertyDescriptor(originalTarget, key);
          if (isUndefined(desc)) {
              return desc;
          }
          const shadowDescriptor = getOwnPropertyDescriptor(shadowTarget, key);
          if (!isUndefined(shadowDescriptor)) {
              return shadowDescriptor;
          }
          // Note: by accessing the descriptor, the key is marked as observed
          // but access to the value, setter or getter (if available) cannot observe
          // mutations, just like regular methods, in which case we just do nothing.
          desc = wrapDescriptor(membrane, desc, wrapValue);
          if (!desc.configurable) {
              // If descriptor from original target is not configurable,
              // We must copy the wrapped descriptor over to the shadow target.
              // Otherwise, proxy will throw an invariant error.
              // This is our last chance to lock the value.
              // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
              ObjectDefineProperty(shadowTarget, key, desc);
          }
          return desc;
      }
      preventExtensions(shadowTarget) {
          const { originalTarget, membrane } = this;
          lockShadowTarget(membrane, shadowTarget, originalTarget);
          preventExtensions(originalTarget);
          return true;
      }
      defineProperty(shadowTarget, key, descriptor) {
          const { originalTarget, membrane } = this;
          const { valueMutated } = membrane;
          const { configurable } = descriptor;
          // We have to check for value in descriptor
          // because Object.freeze(proxy) calls this method
          // with only { configurable: false, writeable: false }
          // Additionally, method will only be called with writeable:false
          // if the descriptor has a value, as opposed to getter/setter
          // So we can just check if writable is present and then see if
          // value is present. This eliminates getter and setter descriptors
          if (hasOwnProperty.call(descriptor, 'writable') && !hasOwnProperty.call(descriptor, 'value')) {
              const originalDescriptor = getOwnPropertyDescriptor(originalTarget, key);
              descriptor.value = originalDescriptor.value;
          }
          ObjectDefineProperty(originalTarget, key, unwrapDescriptor(descriptor));
          if (configurable === false) {
              ObjectDefineProperty(shadowTarget, key, wrapDescriptor(membrane, descriptor, wrapValue));
          }
          valueMutated(originalTarget, key);
          return true;
      }
  }

  function wrapReadOnlyValue(membrane, value) {
      return membrane.valueIsObservable(value) ? membrane.getReadOnlyProxy(value) : value;
  }
  class ReadOnlyHandler {
      constructor(membrane, value) {
          this.originalTarget = value;
          this.membrane = membrane;
      }
      get(shadowTarget, key) {
          const { membrane, originalTarget } = this;
          const value = originalTarget[key];
          const { valueObserved } = membrane;
          valueObserved(originalTarget, key);
          return membrane.getReadOnlyProxy(value);
      }
      set(shadowTarget, key, value) {
          return false;
      }
      deleteProperty(shadowTarget, key) {
          return false;
      }
      apply(shadowTarget, thisArg, argArray) {
          /* No op */
      }
      construct(target, argArray, newTarget) {
          /* No op */
      }
      has(shadowTarget, key) {
          const { originalTarget, membrane: { valueObserved } } = this;
          valueObserved(originalTarget, key);
          return key in originalTarget;
      }
      ownKeys(shadowTarget) {
          const { originalTarget } = this;
          return ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
      }
      setPrototypeOf(shadowTarget, prototype) {
      }
      getOwnPropertyDescriptor(shadowTarget, key) {
          const { originalTarget, membrane } = this;
          const { valueObserved } = membrane;
          // keys looked up via hasOwnProperty need to be reactive
          valueObserved(originalTarget, key);
          let desc = getOwnPropertyDescriptor(originalTarget, key);
          if (isUndefined(desc)) {
              return desc;
          }
          const shadowDescriptor = getOwnPropertyDescriptor(shadowTarget, key);
          if (!isUndefined(shadowDescriptor)) {
              return shadowDescriptor;
          }
          // Note: by accessing the descriptor, the key is marked as observed
          // but access to the value or getter (if available) cannot be observed,
          // just like regular methods, in which case we just do nothing.
          desc = wrapDescriptor(membrane, desc, wrapReadOnlyValue);
          if (hasOwnProperty.call(desc, 'set')) {
              desc.set = undefined; // readOnly membrane does not allow setters
          }
          if (!desc.configurable) {
              // If descriptor from original target is not configurable,
              // We must copy the wrapped descriptor over to the shadow target.
              // Otherwise, proxy will throw an invariant error.
              // This is our last chance to lock the value.
              // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
              ObjectDefineProperty(shadowTarget, key, desc);
          }
          return desc;
      }
      preventExtensions(shadowTarget) {
          return false;
      }
      defineProperty(shadowTarget, key, descriptor) {
          return false;
      }
  }
  function createShadowTarget(value) {
      let shadowTarget = undefined;
      if (isArray(value)) {
          shadowTarget = [];
      }
      else if (isObject(value)) {
          shadowTarget = {};
      }
      return shadowTarget;
  }
  const ObjectDotPrototype = Object.prototype;
  function defaultValueIsObservable(value) {
      // intentionally checking for null
      if (value === null) {
          return false;
      }
      // treat all non-object types, including undefined, as non-observable values
      if (typeof value !== 'object') {
          return false;
      }
      if (isArray(value)) {
          return true;
      }
      const proto = getPrototypeOf(value);
      return (proto === ObjectDotPrototype || proto === null || getPrototypeOf(proto) === null);
  }
  const defaultValueObserved = (obj, key) => {
      /* do nothing */
  };
  const defaultValueMutated = (obj, key) => {
      /* do nothing */
  };
  const defaultValueDistortion = (value) => value;
  function wrapDescriptor(membrane, descriptor, getValue) {
      const { set, get } = descriptor;
      if (hasOwnProperty.call(descriptor, 'value')) {
          descriptor.value = getValue(membrane, descriptor.value);
      }
      else {
          if (!isUndefined(get)) {
              descriptor.get = function () {
                  // invoking the original getter with the original target
                  return getValue(membrane, get.call(unwrap(this)));
              };
          }
          if (!isUndefined(set)) {
              descriptor.set = function (value) {
                  // At this point we don't have a clear indication of whether
                  // or not a valid mutation will occur, we don't have the key,
                  // and we are not sure why and how they are invoking this setter.
                  // Nevertheless we preserve the original semantics by invoking the
                  // original setter with the original target and the unwrapped value
                  set.call(unwrap(this), membrane.unwrapProxy(value));
              };
          }
      }
      return descriptor;
  }
  class ReactiveMembrane {
      constructor(options) {
          this.valueDistortion = defaultValueDistortion;
          this.valueMutated = defaultValueMutated;
          this.valueObserved = defaultValueObserved;
          this.valueIsObservable = defaultValueIsObservable;
          this.objectGraph = new WeakMap();
          if (!isUndefined(options)) {
              const { valueDistortion, valueMutated, valueObserved, valueIsObservable } = options;
              this.valueDistortion = isFunction(valueDistortion) ? valueDistortion : defaultValueDistortion;
              this.valueMutated = isFunction(valueMutated) ? valueMutated : defaultValueMutated;
              this.valueObserved = isFunction(valueObserved) ? valueObserved : defaultValueObserved;
              this.valueIsObservable = isFunction(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
          }
      }
      getProxy(value) {
          const unwrappedValue = unwrap(value);
          const distorted = this.valueDistortion(unwrappedValue);
          if (this.valueIsObservable(distorted)) {
              const o = this.getReactiveState(unwrappedValue, distorted);
              // when trying to extract the writable version of a readonly
              // we return the readonly.
              return o.readOnly === value ? value : o.reactive;
          }
          return distorted;
      }
      getReadOnlyProxy(value) {
          value = unwrap(value);
          const distorted = this.valueDistortion(value);
          if (this.valueIsObservable(distorted)) {
              return this.getReactiveState(value, distorted).readOnly;
          }
          return distorted;
      }
      unwrapProxy(p) {
          return unwrap(p);
      }
      getReactiveState(value, distortedValue) {
          const { objectGraph, } = this;
          let reactiveState = objectGraph.get(distortedValue);
          if (reactiveState) {
              return reactiveState;
          }
          const membrane = this;
          reactiveState = {
              get reactive() {
                  const reactiveHandler = new ReactiveProxyHandler(membrane, distortedValue);
                  // caching the reactive proxy after the first time it is accessed
                  const proxy = new Proxy(createShadowTarget(distortedValue), reactiveHandler);
                  registerProxy(proxy, value);
                  ObjectDefineProperty(this, 'reactive', { value: proxy });
                  return proxy;
              },
              get readOnly() {
                  const readOnlyHandler = new ReadOnlyHandler(membrane, distortedValue);
                  // caching the readOnly proxy after the first time it is accessed
                  const proxy = new Proxy(createShadowTarget(distortedValue), readOnlyHandler);
                  registerProxy(proxy, value);
                  ObjectDefineProperty(this, 'readOnly', { value: proxy });
                  return proxy;
              }
          };
          objectGraph.set(distortedValue, reactiveState);
          return reactiveState;
      }
  }
  /** version: 0.26.0 */

  function wrap(data, mutationCallback) {

    let membrane = new ReactiveMembrane({
      valueMutated(target, key) {
        mutationCallback(target, key);
      }

    });
    return {
      data: membrane.getProxy(data),
      membrane: membrane
    };
  }
  function unwrap$1(membrane, observable) {
    let unwrappedData = membrane.unwrapProxy(observable);
    let copy = {};
    Object.keys(unwrappedData).forEach(key => {
      if (['$el', '$refs', '$nextTick', '$watch'].includes(key)) return;
      copy[key] = unwrappedData[key];
    });
    return copy;
  }

  class Component {
    constructor(el, componentForClone = null) {
      this.$el = el;
      const dataAttr = this.$el.getAttribute('x-data');
      const dataExpression = dataAttr === '' ? '{}' : dataAttr;
      const initExpression = this.$el.getAttribute('x-init');
      let dataExtras = {
        $el: this.$el
      };
      let canonicalComponentElementReference = componentForClone ? componentForClone.$el : this.$el;
      Object.entries(Alpine.magicProperties).forEach(([name, callback]) => {
        Object.defineProperty(dataExtras, `$${name}`, {
          get: function get() {
            return callback(canonicalComponentElementReference);
          }
        });
      });
      this.unobservedData = componentForClone ? componentForClone.getUnobservedData() : saferEval(el, dataExpression, dataExtras);
      // Construct a Proxy-based observable. This will be used to handle reactivity.

      let {
        membrane,
        data
      } = this.wrapDataInObservable(this.unobservedData);
      this.$data = data;
      this.membrane = membrane; // After making user-supplied data methods reactive, we can now add
      // our magic properties to the original data for access.

      this.unobservedData.$el = this.$el;
      this.unobservedData.$refs = this.getRefsProxy();
      this.nextTickStack = [];

      this.unobservedData.$nextTick = callback => {
        this.nextTickStack.push(callback);
      };

      this.watchers = {};

      this.unobservedData.$watch = (property, callback) => {
        if (!this.watchers[property]) this.watchers[property] = [];
        this.watchers[property].push(callback);
      };
      /* MODERN-ONLY:START */
      // We remove this piece of code from the legacy build.
      // In IE11, we have already defined our helpers at this point.
      // Register custom magic properties.


      Object.entries(Alpine.magicProperties).forEach(([name, callback]) => {
        Object.defineProperty(this.unobservedData, `$${name}`, {
          get: function get() {
            return callback(canonicalComponentElementReference, this.$el);
          }
        });
      });
      /* MODERN-ONLY:END */

      this.showDirectiveStack = [];
      this.showDirectiveLastElement;
      componentForClone || Alpine.onBeforeComponentInitializeds.forEach(callback => callback(this));
      var initReturnedCallback; // If x-init is present AND we aren't cloning (skip x-init on clone)

      if (initExpression && !componentForClone) {
        // We want to allow data manipulation, but not trigger DOM updates just yet.
        // We haven't even initialized the elements with their Alpine bindings. I mean c'mon.
        this.pauseReactivity = true;
        initReturnedCallback = this.evaluateReturnExpression(this.$el, initExpression);
        this.pauseReactivity = false;
      } // Register all our listeners and set all our attribute bindings.
      // If we're cloning a component, the third parameter ensures no duplicate
      // event listeners are registered (the mutation observer will take care of them)


      this.initializeElements(this.$el, () => {}, componentForClone); // Use mutation observer to detect new elements being added within this component at run-time.
      // Alpine's just so darn flexible amirite?

      this.listenForNewElementsToInitialize();

      if (typeof initReturnedCallback === 'function') {
        // Run the callback returned from the "x-init" hook to allow the user to do stuff after
        // Alpine's got it's grubby little paws all over everything.
        initReturnedCallback.call(this.$data);
      }

      componentForClone || setTimeout(() => {
        Alpine.onComponentInitializeds.forEach(callback => callback(this));
      }, 0);
    }

    getUnobservedData() {
      return unwrap$1(this.membrane, this.$data);
    }

    wrapDataInObservable(data) {
      var self = this;
      let updateDom = debounce(function () {
        self.updateElements(self.$el);
      }, 0);
      return wrap(data, (target, key) => {
        if (self.watchers[key]) {
          // If there's a watcher for this specific key, run it.
          self.watchers[key].forEach(callback => callback(target[key]));
        } else if (Array.isArray(target)) {
          // Arrays are special cases, if any of the items change, we consider the array as mutated.
          Object.keys(self.watchers).forEach(fullDotNotationKey => {
            let dotNotationParts = fullDotNotationKey.split('.'); // Ignore length mutations since they would result in duplicate calls.
            // For example, when calling push, we would get a mutation for the item's key
            // and a second mutation for the length property.

            if (key === 'length') return;
            dotNotationParts.reduce((comparisonData, part) => {
              if (Object.is(target, comparisonData[part])) {
                self.watchers[fullDotNotationKey].forEach(callback => callback(target));
              }

              return comparisonData[part];
            }, self.unobservedData);
          });
        } else {
          // Let's walk through the watchers with "dot-notation" (foo.bar) and see
          // if this mutation fits any of them.
          Object.keys(self.watchers).filter(i => i.includes('.')).forEach(fullDotNotationKey => {
            let dotNotationParts = fullDotNotationKey.split('.'); // If this dot-notation watcher's last "part" doesn't match the current
            // key, then skip it early for performance reasons.

            if (key !== dotNotationParts[dotNotationParts.length - 1]) return; // Now, walk through the dot-notation "parts" recursively to find
            // a match, and call the watcher if one's found.

            dotNotationParts.reduce((comparisonData, part) => {
              if (Object.is(target, comparisonData)) {
                // Run the watchers.
                self.watchers[fullDotNotationKey].forEach(callback => callback(target[key]));
              }

              return comparisonData[part];
            }, self.unobservedData);
          });
        } // Don't react to data changes for cases like the `x-created` hook.


        if (self.pauseReactivity) return;
        updateDom();
      });
    }

    walkAndSkipNestedComponents(el, callback, initializeComponentCallback = () => {}) {
      walk(el, el => {
        // We've hit a component.
        if (el.hasAttribute('x-data')) {
          // If it's not the current one.
          if (!el.isSameNode(this.$el)) {
            // Initialize it if it's not.
            if (!el.__x) initializeComponentCallback(el); // Now we'll let that sub-component deal with itself.

            return false;
          }
        }

        return callback(el);
      });
    }

    initializeElements(rootEl, extraVars = () => {}, componentForClone = false) {
      this.walkAndSkipNestedComponents(rootEl, el => {
        // Don't touch spawns from for loop
        if (el.__x_for_key !== undefined) return false; // Don't touch spawns from if directives

        if (el.__x_inserted_me !== undefined) return false;
        this.initializeElement(el, extraVars, componentForClone ? false : true);
      }, el => {
        if (!componentForClone) el.__x = new Component(el);
      });
      this.executeAndClearRemainingShowDirectiveStack();
      this.executeAndClearNextTickStack(rootEl);
    }

    initializeElement(el, extraVars, shouldRegisterListeners = true) {
      // To support class attribute merging, we have to know what the element's
      // original class attribute looked like for reference.
      if (el.hasAttribute('class') && getXAttrs(el, this).length > 0) {
        el.__x_original_classes = convertClassStringToArray(el.getAttribute('class'));
      }

      shouldRegisterListeners && this.registerListeners(el, extraVars);
      this.resolveBoundAttributes(el, true, extraVars);
    }

    updateElements(rootEl, extraVars = () => {}) {
      this.walkAndSkipNestedComponents(rootEl, el => {
        // Don't touch spawns from for loop (and check if the root is actually a for loop in a parent, don't skip it.)
        if (el.__x_for_key !== undefined && !el.isSameNode(this.$el)) return false;
        this.updateElement(el, extraVars);
      }, el => {
        el.__x = new Component(el);
      });
      this.executeAndClearRemainingShowDirectiveStack();
      this.executeAndClearNextTickStack(rootEl);
    }

    executeAndClearNextTickStack(el) {
      // Skip spawns from alpine directives
      if (el === this.$el && this.nextTickStack.length > 0) {
        // We run the tick stack after the next frame to allow any
        // running transitions to pass the initial show stage.
        requestAnimationFrame(() => {
          while (this.nextTickStack.length > 0) {
            this.nextTickStack.shift()();
          }
        });
      }
    }

    executeAndClearRemainingShowDirectiveStack() {
      // The goal here is to start all the x-show transitions
      // and build a nested promise chain so that elements
      // only hide when the children are finished hiding.
      this.showDirectiveStack.reverse().map(handler => {
        return new Promise((resolve, reject) => {
          handler(resolve, reject);
        });
      }).reduce((promiseChain, promise) => {
        return promiseChain.then(() => {
          return promise.then(finishElement => {
            finishElement();
          });
        });
      }, Promise.resolve(() => {})).catch(e => {
        if (e !== TRANSITION_CANCELLED) throw e;
      }); // We've processed the handler stack. let's clear it.

      this.showDirectiveStack = [];
      this.showDirectiveLastElement = undefined;
    }

    updateElement(el, extraVars) {
      this.resolveBoundAttributes(el, false, extraVars);
    }

    registerListeners(el, extraVars) {
      getXAttrs(el, this).forEach(({
        type,
        value,
        modifiers,
        expression
      }) => {
        switch (type) {
          case 'on':
            registerListener(this, el, value, modifiers, expression, extraVars);
            break;

          case 'model':
            registerModelListener(this, el, modifiers, expression, extraVars);
            break;
        }
      });
    }

    resolveBoundAttributes(el, initialUpdate = false, extraVars) {
      let attrs = getXAttrs(el, this);
      attrs.forEach(({
        type,
        value,
        modifiers,
        expression
      }) => {
        switch (type) {
          case 'model':
            handleAttributeBindingDirective(this, el, 'value', expression, extraVars, type, modifiers);
            break;

          case 'bind':
            // The :key binding on an x-for is special, ignore it.
            if (el.tagName.toLowerCase() === 'template' && value === 'key') return;
            handleAttributeBindingDirective(this, el, value, expression, extraVars, type, modifiers);
            break;

          case 'text':
            var output = this.evaluateReturnExpression(el, expression, extraVars);
            handleTextDirective(el, output, expression);
            break;

          case 'html':
            handleHtmlDirective(this, el, expression, extraVars);
            break;

          case 'show':
            var output = this.evaluateReturnExpression(el, expression, extraVars);
            handleShowDirective(this, el, output, modifiers, initialUpdate);
            break;

          case 'if':
            // If this element also has x-for on it, don't process x-if.
            // We will let the "x-for" directive handle the "if"ing.
            if (attrs.some(i => i.type === 'for')) return;
            var output = this.evaluateReturnExpression(el, expression, extraVars);
            handleIfDirective(this, el, output, initialUpdate, extraVars);
            break;

          case 'for':
            handleForDirective(this, el, expression, initialUpdate, extraVars);
            break;

          case 'cloak':
            el.removeAttribute('x-cloak');
            break;
        }
      });
    }

    evaluateReturnExpression(el, expression, extraVars = () => {}) {
      return saferEval(el, expression, this.$data, _objectSpread2(_objectSpread2({}, extraVars()), {}, {
        $dispatch: this.getDispatchFunction(el)
      }));
    }

    evaluateCommandExpression(el, expression, extraVars = () => {}) {
      return saferEvalNoReturn(el, expression, this.$data, _objectSpread2(_objectSpread2({}, extraVars()), {}, {
        $dispatch: this.getDispatchFunction(el)
      }));
    }

    getDispatchFunction(el) {
      return (event, detail = {}) => {
        el.dispatchEvent(new CustomEvent(event, {
          detail,
          bubbles: true
        }));
      };
    }

    listenForNewElementsToInitialize() {
      const targetNode = this.$el;
      const observerOptions = {
        childList: true,
        attributes: true,
        subtree: true
      };
      const observer = new MutationObserver(mutations => {
        for (let i = 0; i < mutations.length; i++) {
          // Filter out mutations triggered from child components.
          const closestParentComponent = mutations[i].target.closest('[x-data]');
          if (!(closestParentComponent && closestParentComponent.isSameNode(this.$el))) continue;

          if (mutations[i].type === 'attributes' && mutations[i].attributeName === 'x-data') {
            const xAttr = mutations[i].target.getAttribute('x-data') || '{}';
            const rawData = saferEval(this.$el, xAttr, {
              $el: this.$el
            });
            Object.keys(rawData).forEach(key => {
              if (this.$data[key] !== rawData[key]) {
                this.$data[key] = rawData[key];
              }
            });
          }

          if (mutations[i].addedNodes.length > 0) {
            mutations[i].addedNodes.forEach(node => {
              if (node.nodeType !== 1 || node.__x_inserted_me) return;

              if (node.matches('[x-data]') && !node.__x) {
                node.__x = new Component(node);
                return;
              }

              this.initializeElements(node);
            });
          }
        }
      });
      observer.observe(targetNode, observerOptions);
    }

    getRefsProxy() {
      var self = this;
      var refObj = {};
      // One of the goals of this is to not hold elements in memory, but rather re-evaluate
      // the DOM when the system needs something from it. This way, the framework is flexible and
      // friendly to outside DOM changes from libraries like Vue/Livewire.
      // For this reason, I'm using an "on-demand" proxy to fake a "$refs" object.

      return new Proxy(refObj, {
        get(object, property) {
          if (property === '$isAlpineProxy') return true;
          var ref; // We can't just query the DOM because it's hard to filter out refs in
          // nested components.

          self.walkAndSkipNestedComponents(self.$el, el => {
            if (el.hasAttribute('x-ref') && el.getAttribute('x-ref') === property) {
              ref = el;
            }
          });
          return ref;
        }

      });
    }

  }

  const Alpine = {
    version: "2.8.2",
    pauseMutationObserver: false,
    magicProperties: {},
    onComponentInitializeds: [],
    onBeforeComponentInitializeds: [],
    ignoreFocusedForValueBinding: false,
    start: async function start() {
      if (!isTesting()) {
        await domReady();
      }

      this.discoverComponents(el => {
        this.initializeComponent(el);
      }); // It's easier and more performant to just support Turbolinks than listen
      // to MutationObserver mutations at the document level.

      document.addEventListener("turbolinks:load", () => {
        this.discoverUninitializedComponents(el => {
          this.initializeComponent(el);
        });
      });
      this.listenForNewUninitializedComponentsAtRunTime();
    },
    discoverComponents: function discoverComponents(callback) {
      const rootEls = document.querySelectorAll('[x-data]');
      rootEls.forEach(rootEl => {
        callback(rootEl);
      });
    },
    discoverUninitializedComponents: function discoverUninitializedComponents(callback, el = null) {
      const rootEls = (el || document).querySelectorAll('[x-data]');
      Array.from(rootEls).filter(el => el.__x === undefined).forEach(rootEl => {
        callback(rootEl);
      });
    },
    listenForNewUninitializedComponentsAtRunTime: function listenForNewUninitializedComponentsAtRunTime() {
      const targetNode = document.querySelector('body');
      const observerOptions = {
        childList: true,
        attributes: true,
        subtree: true
      };
      const observer = new MutationObserver(mutations => {
        if (this.pauseMutationObserver) return;

        for (let i = 0; i < mutations.length; i++) {
          if (mutations[i].addedNodes.length > 0) {
            mutations[i].addedNodes.forEach(node => {
              // Discard non-element nodes (like line-breaks)
              if (node.nodeType !== 1) return; // Discard any changes happening within an existing component.
              // They will take care of themselves.

              if (node.parentElement && node.parentElement.closest('[x-data]')) return;
              this.discoverUninitializedComponents(el => {
                this.initializeComponent(el);
              }, node.parentElement);
            });
          }
        }
      });
      observer.observe(targetNode, observerOptions);
    },
    initializeComponent: function initializeComponent(el) {
      if (!el.__x) {
        // Wrap in a try/catch so that we don't prevent other components
        // from initializing when one component contains an error.
        try {
          el.__x = new Component(el);
        } catch (error) {
          setTimeout(() => {
            throw error;
          }, 0);
        }
      }
    },
    clone: function clone(component, newEl) {
      if (!newEl.__x) {
        newEl.__x = new Component(newEl, component);
      }
    },
    addMagicProperty: function addMagicProperty(name, callback) {
      this.magicProperties[name] = callback;
    },
    onComponentInitialized: function onComponentInitialized(callback) {
      this.onComponentInitializeds.push(callback);
    },
    onBeforeComponentInitialized: function onBeforeComponentInitialized(callback) {
      this.onBeforeComponentInitializeds.push(callback);
    }
  };

  if (!isTesting()) {
    window.Alpine = Alpine;

    if (window.deferLoadingAlpine) {
      window.deferLoadingAlpine(function () {
        window.Alpine.start();
      });
    } else {
      window.Alpine.start();
    }
  }

  return Alpine;

})));


/***/ }),

/***/ "./resources/js/src/AppServiceProvider.js":
/*!************************************************!*\
  !*** ./resources/js/src/AppServiceProvider.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppServiceProvider": () => (/* binding */ AppServiceProvider)
/* harmony export */ });
/* harmony import */ var _laravel_streams_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @laravel-streams/core */ "./vendor/streams/core/resources/public/js/index.js");
/* harmony import */ var _laravel_streams_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_laravel_streams_core__WEBPACK_IMPORTED_MODULE_0__);


class AppServiceProvider extends _laravel_streams_core__WEBPACK_IMPORTED_MODULE_0__.ServiceProvider {

    register() {
        //
    }

    boot() {
        //
    }
}


/***/ }),

/***/ "./vendor/streams/core/resources/public/js/index.js":
/*!**********************************************************!*\
  !*** ./vendor/streams/core/resources/public/js/index.js ***!
  \**********************************************************/
/***/ (() => {

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/reflect-metadata/Reflect.js":
/*!**************************************************!*\
  !*** ./node_modules/reflect-metadata/Reflect.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __nested_webpack_require_5992__) => {

/* provided dependency */ var process = __nested_webpack_require_5992__(/*! process/browser */ "./node_modules/process/browser.js");
/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
        var root = typeof __nested_webpack_require_5992__.g === "object" ? __nested_webpack_require_5992__.g :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return function (key, value) {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                }
                if (previous)
                    previous(key, value);
            };
        }
    })(function (exporter) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate
                ? function () { return MakeDictionary(Object.create(null)); }
                : supportsProto
                    ? function () { return MakeDictionary({ __proto__: null }); }
                    : function () { return MakeDictionary({}); },
            has: downLevel
                ? function (map, key) { return hasOwn.call(map, key); }
                : function (map, key) { return key in map; },
            get: downLevel
                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                : function (map, key) { return map[key]; },
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        // [[Metadata]] internal slot
        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
        var Metadata = new _WeakMap();
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    throw new TypeError();
                if (IsNull(attributes))
                    attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsConstructor(target))
                    throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            if (!metadataMap.delete(metadataKey))
                return false;
            if (metadataMap.size > 0)
                return true;
            var targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                return true;
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    return undefined;
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    return undefined;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return undefined;
            return metadataMap.get(MetadataKey);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                return ownKeys;
            if (ownKeys.length <= 0)
                return parentKeys;
            var set = new _Set();
            var keys = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                var nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        // 6 ECMAScript Data Typ0es and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null)
                return 1 /* Null */;
            switch (typeof x) {
                case "undefined": return 0 /* Undefined */;
                case "boolean": return 2 /* Boolean */;
                case "string": return 3 /* String */;
                case "symbol": return 4 /* Symbol */;
                case "number": return 5 /* Number */;
                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                default: return 6 /* Object */;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0 /* Undefined */: return input;
                case 1 /* Null */: return input;
                case 2 /* Boolean */: return input;
                case 3 /* String */: return input;
                case 4 /* Symbol */: return input;
                case 5 /* Number */: return input;
            }
            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */);
            if (IsSymbol(key))
                return key;
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3 /* String */: return true;
                case 4 /* Symbol */: return true;
                default: return false;
            }
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null)
                return undefined;
            if (!IsCallable(func))
                throw new TypeError();
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                throw new TypeError(); // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator))
                throw new TypeError();
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
                f.call(iterator);
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                return proto;
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype)
                return proto;
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                return proto;
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                return proto;
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O)
                return proto;
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = /** @class */ (function () {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function () { return this; };
                MapIterator.prototype[iteratorSymbol] = function () { return this; };
                MapIterator.prototype.next = function () {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                };
                MapIterator.prototype.throw = function (error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function (value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                };
                return MapIterator;
            }());
            return /** @class */ (function () {
                function Map() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map.prototype, "size", {
                    get: function () { return this._keys.length; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                Map.prototype.get = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map.prototype.set = function (key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map.prototype.delete = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for (var i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map.prototype.clear = function () {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                Map.prototype["@@iterator"] = function () { return this.entries(); };
                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                Map.prototype._find = function (key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map;
            }());
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            return /** @class */ (function () {
                function Set() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set.prototype, "size", {
                    get: function () { return this._map.size; },
                    enumerable: true,
                    configurable: true
                });
                Set.prototype.has = function (value) { return this._map.has(value); };
                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                Set.prototype.delete = function (value) { return this._map.delete(value); };
                Set.prototype.clear = function () { this._map.clear(); };
                Set.prototype.keys = function () { return this._map.keys(); };
                Set.prototype.values = function () { return this._map.values(); };
                Set.prototype.entries = function () { return this._map.entries(); };
                Set.prototype["@@iterator"] = function () { return this.keys(); };
                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                return Set;
            }());
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return /** @class */ (function () {
                function WeakMap() {
                    this._key = CreateUniqueKey();
                }
                WeakMap.prototype.has = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap.prototype.get = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap.prototype.set = function (target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap.prototype.delete = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap.prototype.clear = function () {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap;
            }());
            function CreateUniqueKey() {
                var key;
                do
                    key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        return undefined;
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (var i = 0; i < size; ++i)
                    buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        return crypto.getRandomValues(new Uint8Array(size));
                    if (typeof msCrypto !== "undefined")
                        return msCrypto.getRandomValues(new Uint8Array(size));
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for (var offset = 0; offset < UUID_SIZE; ++offset) {
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        result += "-";
                    if (byte < 16)
                        result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect || (Reflect = {}));


/***/ }),

/***/ "./resources/lib/Dispatcher/Dispatcher.ts":
/*!************************************************!*\
  !*** ./resources/lib/Dispatcher/Dispatcher.ts ***!
  \************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected character '@' (6:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| decorate(injectable(), EventEmitter2);\n| \n> @injectable()\n| export class Dispatcher extends EventEmitter2 {\n|     protected anyListeners:Array<(...args: any[]) => void> = [];");

/***/ }),

/***/ "./resources/lib/Dispatcher/index.ts":
/*!*******************************************!*\
  !*** ./resources/lib/Dispatcher/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_58314__) => {

"use strict";
__nested_webpack_require_58314__.r(__webpack_exports__);
/* harmony import */ var _Dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_58314__(/*! ./Dispatcher */ "./resources/lib/Dispatcher/Dispatcher.ts");
/* harmony import */ var _Dispatcher__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_58314__.n(_Dispatcher__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Dispatcher__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Dispatcher__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_58314__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);



/***/ }),

/***/ "./resources/lib/Foundation/Application.ts":
/*!*************************************************!*\
  !*** ./resources/lib/Foundation/Application.ts ***!
  \*************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (8:25)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| import { ApplicationInitOptions, Configuration } from '@/types/config';\n| import { IServiceProvider, IServiceProviderClass } from '@/Support/ServiceProvider';\n> import ServiceIdentifier = interfaces.ServiceIdentifier;\n| import { isServiceProviderClass, makeLog } from '@/Support/utils';\n| ");

/***/ }),

/***/ "./resources/lib/Foundation/index.ts":
/*!*******************************************!*\
  !*** ./resources/lib/Foundation/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_60188__) => {

"use strict";
__nested_webpack_require_60188__.r(__webpack_exports__);
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_60188__(/*! ./Application */ "./resources/lib/Foundation/Application.ts");
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_60188__.n(_Application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Application__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Application__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_60188__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);



/***/ }),

/***/ "./resources/lib/Http/HttpServiceProvider.ts":
/*!***************************************************!*\
  !*** ./resources/lib/Http/HttpServiceProvider.ts ***!
  \***************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (16:50)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n|         this.app.instance('axios', Axios);\n|         this.app.instance('http', axios).addBindingGetter('http');\n>         this.app.instance('createHttp', (overrides: AxiosRequestConfig): AxiosInstance => {\n|             overrides = {\n|                 ...config,");

/***/ }),

/***/ "./resources/lib/Http/index.ts":
/*!*************************************!*\
  !*** ./resources/lib/Http/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_62027__) => {

"use strict";
__nested_webpack_require_62027__.r(__webpack_exports__);
/* harmony import */ var _HttpServiceProvider__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_62027__(/*! ./HttpServiceProvider */ "./resources/lib/Http/HttpServiceProvider.ts");
/* harmony import */ var _HttpServiceProvider__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_62027__.n(_HttpServiceProvider__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _HttpServiceProvider__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _HttpServiceProvider__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_62027__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);



/***/ }),

/***/ "./resources/lib/Streams/Criteria.ts":
/*!*******************************************!*\
  !*** ./resources/lib/Streams/Criteria.ts ***!
  \*******************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (10:7)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| import { Http } from '@/Streams/Http';\n| \n> export type OrderByDirection = 'asc'|'desc'\n| export type ComparisonOperator =\n|     | '>'");

/***/ }),

/***/ "./resources/lib/Streams/Entry.ts":
/*!****************************************!*\
  !*** ./resources/lib/Streams/Entry.ts ***!
  \****************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (5:7)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| import { Http } from '@/Streams/Http';\n| \n> export interface Entry<ID extends string = string> {\n|     id: string;\n| }");

/***/ }),

/***/ "./resources/lib/Streams/EntryCollection.ts":
/*!**************************************************!*\
  !*** ./resources/lib/Streams/EntryCollection.ts ***!
  \**************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (6:7)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| \n| \n> export type IEntriesLinks = IStreamLinks<'next_page'|'previous_page'|'self'>;\n| export interface IEntriesMeta extends IStreamMeta {\n|     current_page:number");

/***/ }),

/***/ "./resources/lib/Streams/Field.ts":
/*!****************************************!*\
  !*** ./resources/lib/Streams/Field.ts ***!
  \****************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (2:7)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| import { fields } from '@/types';\n> export interface Field {\n|     config?:Record<string,any>\n|     handle:string");

/***/ }),

/***/ "./resources/lib/Streams/FieldCollection.ts":
/*!**************************************************!*\
  !*** ./resources/lib/Streams/FieldCollection.ts ***!
  \**************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (4:47)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| import { Collection } from '@/Support';\n| \n> export class FieldCollection extends Collection<Field> {\n| }\n| ");

/***/ }),

/***/ "./resources/lib/Streams/Repository.ts":
/*!*********************************************!*\
  !*** ./resources/lib/Streams/Repository.ts ***!
  \*********************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (9:23)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| \n| \n> export class Repository<ID extends string = string> {\n|     @inject('streams.http') protected http:Http\n| ");

/***/ }),

/***/ "./resources/lib/Streams/Stream.ts":
/*!*****************************************!*\
  !*** ./resources/lib/Streams/Stream.ts ***!
  \*****************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (6:7)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| import { IBaseStream, IStreamLinks, IStreamMeta } from '@/types/streams';\n| \n> export interface Stream<ID extends string = string> extends Omit<IBaseStream<ID>,'fields'> {}\n| \n| export class Stream<ID extends string = string> {");

/***/ }),

/***/ "./resources/lib/Streams/Streams.ts":
/*!******************************************!*\
  !*** ./resources/lib/Streams/Streams.ts ***!
  \******************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected character '@' (8:0)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| import { Http } from '@/Streams/Http';\n| \n> @injectable()\n| export class Streams {\n|     @inject('config') config: Config;");

/***/ }),

/***/ "./resources/lib/Streams/StreamsServiceProvider.ts":
/*!*********************************************************!*\
  !*** ./resources/lib/Streams/StreamsServiceProvider.ts ***!
  \*********************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (9:13)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| \n| export class StreamsServiceProvider extends ServiceProvider {\n>     providers: [\n|         HttpServiceProvider\n|     ]");

/***/ }),

/***/ "./resources/lib/Streams/index.ts":
/*!****************************************!*\
  !*** ./resources/lib/Streams/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_68585__) => {

"use strict";
__nested_webpack_require_68585__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_68585__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_68585__(/*! ./Stream */ "./resources/lib/Streams/Stream.ts");
/* harmony import */ var _Stream__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_68585__.n(_Stream__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Criteria__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_68585__(/*! ./Criteria */ "./resources/lib/Streams/Criteria.ts");
/* harmony import */ var _Criteria__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_68585__.n(_Criteria__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Criteria__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Criteria__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_68585__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _Entry__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_68585__(/*! ./Entry */ "./resources/lib/Streams/Entry.ts");
/* harmony import */ var _Entry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__nested_webpack_require_68585__.n(_Entry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Entry__WEBPACK_IMPORTED_MODULE_2__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Entry__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_68585__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _EntryCollection__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_68585__(/*! ./EntryCollection */ "./resources/lib/Streams/EntryCollection.ts");
/* harmony import */ var _EntryCollection__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__nested_webpack_require_68585__.n(_EntryCollection__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _EntryCollection__WEBPACK_IMPORTED_MODULE_3__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _EntryCollection__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_68585__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_68585__(/*! ./Field */ "./resources/lib/Streams/Field.ts");
/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__nested_webpack_require_68585__.n(_Field__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Field__WEBPACK_IMPORTED_MODULE_4__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Field__WEBPACK_IMPORTED_MODULE_4__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_68585__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _FieldCollection__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_68585__(/*! ./FieldCollection */ "./resources/lib/Streams/FieldCollection.ts");
/* harmony import */ var _FieldCollection__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__nested_webpack_require_68585__.n(_FieldCollection__WEBPACK_IMPORTED_MODULE_5__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _FieldCollection__WEBPACK_IMPORTED_MODULE_5__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _FieldCollection__WEBPACK_IMPORTED_MODULE_5__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_68585__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _Repository__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_68585__(/*! ./Repository */ "./resources/lib/Streams/Repository.ts");
/* harmony import */ var _Repository__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__nested_webpack_require_68585__.n(_Repository__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Repository__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Repository__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_68585__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Stream__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Stream__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_68585__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _Streams__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_68585__(/*! ./Streams */ "./resources/lib/Streams/Streams.ts");
/* harmony import */ var _Streams__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__nested_webpack_require_68585__.n(_Streams__WEBPACK_IMPORTED_MODULE_7__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Streams__WEBPACK_IMPORTED_MODULE_7__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Streams__WEBPACK_IMPORTED_MODULE_7__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_68585__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _StreamsServiceProvider__WEBPACK_IMPORTED_MODULE_8__ = __nested_webpack_require_68585__(/*! ./StreamsServiceProvider */ "./resources/lib/Streams/StreamsServiceProvider.ts");
/* harmony import */ var _StreamsServiceProvider__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__nested_webpack_require_68585__.n(_StreamsServiceProvider__WEBPACK_IMPORTED_MODULE_8__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _StreamsServiceProvider__WEBPACK_IMPORTED_MODULE_8__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _StreamsServiceProvider__WEBPACK_IMPORTED_MODULE_8__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_68585__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);












/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Stream__WEBPACK_IMPORTED_MODULE_0__.Stream);


/***/ }),

/***/ "./resources/lib/Support/Collection.ts":
/*!*********************************************!*\
  !*** ./resources/lib/Support/Collection.ts ***!
  \*********************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (1:23)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n> export class Collection<T> extends Array<T> implements Array<T> {\n|     constructor(...items: T[]) {\n|         super(...items);");

/***/ }),

/***/ "./resources/lib/Support/ServiceProvider.ts":
/*!**************************************************!*\
  !*** ./resources/lib/Support/ServiceProvider.ts ***!
  \**************************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (3:29)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| import { Application } from '../Foundation/Application';\n| \n> export class ServiceProvider implements IServiceProvider {\n|     constructor(public app: Application) {}\n| }");

/***/ }),

/***/ "./resources/lib/Support/index.ts":
/*!****************************************!*\
  !*** ./resources/lib/Support/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_77285__) => {

"use strict";
__nested_webpack_require_77285__.r(__webpack_exports__);
/* harmony import */ var _Collection__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_77285__(/*! ./Collection */ "./resources/lib/Support/Collection.ts");
/* harmony import */ var _Collection__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_77285__.n(_Collection__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Collection__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Collection__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_77285__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _ServiceProvider__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_77285__(/*! ./ServiceProvider */ "./resources/lib/Support/ServiceProvider.ts");
/* harmony import */ var _ServiceProvider__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_77285__.n(_ServiceProvider__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _ServiceProvider__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _ServiceProvider__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_77285__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);




/***/ }),

/***/ "./resources/lib/examples.ts":
/*!***********************************!*\
  !*** ./resources/lib/examples.ts ***!
  \***********************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (4:7)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| import { Streams } from '@/Streams';\n| \n> export namespace examples {\n|     export async function test() {\n| ");

/***/ }),

/***/ "./resources/lib/types/config.ts":
/*!***************************************!*\
  !*** ./resources/lib/types/config.ts ***!
  \***************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (5:7)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| import { IServiceProviderClass } from '@/Support';\n| \n> export interface StreamsConfiguration {\n| \n| }");

/***/ }),

/***/ "./resources/lib/types/index.ts":
/*!**************************************!*\
  !*** ./resources/lib/types/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_80234__) => {

"use strict";
__nested_webpack_require_80234__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_80234__(/*! ./config */ "./resources/lib/types/config.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_80234__.n(_config__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _config__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _config__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_80234__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _streams__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_80234__(/*! ./streams */ "./resources/lib/types/streams.ts");
/* harmony import */ var _streams__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_80234__.n(_streams__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _streams__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _streams__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_80234__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);




/***/ }),

/***/ "./resources/lib/types/streams.ts":
/*!****************************************!*\
  !*** ./resources/lib/types/streams.ts ***!
  \****************************************/
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (3:7)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| import { Field } from '@/Streams';\n| \n> export interface IStreamMeta {\n|     parameters: Record<string, string>;\n|     query: string[];");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_82593__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_82593__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nested_webpack_require_82593__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nested_webpack_require_82593__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_82593__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_82593__.o(definition, key) && !__nested_webpack_require_82593__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__nested_webpack_require_82593__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nested_webpack_require_82593__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_82593__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************************!*\
  !*** ./resources/lib/index.ts ***!
  \********************************/
__nested_webpack_require_82593__.r(__webpack_exports__);
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_82593__(/*! reflect-metadata */ "./node_modules/reflect-metadata/Reflect.js");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_82593__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_82593__(/*! ./Dispatcher */ "./resources/lib/Dispatcher/index.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Dispatcher__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Dispatcher__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_82593__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _Foundation__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_82593__(/*! ./Foundation */ "./resources/lib/Foundation/index.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Foundation__WEBPACK_IMPORTED_MODULE_2__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Foundation__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_82593__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _Http__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_82593__(/*! ./Http */ "./resources/lib/Http/index.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Http__WEBPACK_IMPORTED_MODULE_3__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Http__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_82593__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _Streams__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_82593__(/*! ./Streams */ "./resources/lib/Streams/index.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Streams__WEBPACK_IMPORTED_MODULE_4__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Streams__WEBPACK_IMPORTED_MODULE_4__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_82593__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _Support__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_82593__(/*! ./Support */ "./resources/lib/Support/index.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _Support__WEBPACK_IMPORTED_MODULE_5__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _Support__WEBPACK_IMPORTED_MODULE_5__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_82593__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __nested_webpack_require_82593__(/*! ./types */ "./resources/lib/types/index.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_6__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _types__WEBPACK_IMPORTED_MODULE_6__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_82593__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _examples__WEBPACK_IMPORTED_MODULE_7__ = __nested_webpack_require_82593__(/*! ./examples */ "./resources/lib/examples.ts");
/* harmony import */ var _examples__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__nested_webpack_require_82593__.n(_examples__WEBPACK_IMPORTED_MODULE_7__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _examples__WEBPACK_IMPORTED_MODULE_7__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _examples__WEBPACK_IMPORTED_MODULE_7__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __nested_webpack_require_82593__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


// export * from './Config';










})();

(window.streams = window.streams || {}).core = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMW1DQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZmxlY3QtbWV0YWRhdGEvUmVmbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvbGliL0Rpc3BhdGNoZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2xpYi9Gb3VuZGF0aW9uL2luZGV4LnRzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9saWIvSHR0cC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2xpYi9TdXBwb3J0L2luZGV4LnRzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9saWIvdHlwZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3Jlc291cmNlcy9saWIvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuQ29weXJpZ2h0IChDKSBNaWNyb3NvZnQuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cblxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xudmFyIFJlZmxlY3Q7XG4oZnVuY3Rpb24gKFJlZmxlY3QpIHtcbiAgICAvLyBNZXRhZGF0YSBQcm9wb3NhbFxuICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvXG4gICAgKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgICAgIHZhciByb290ID0gdHlwZW9mIGdsb2JhbCA9PT0gXCJvYmplY3RcIiA/IGdsb2JhbCA6XG4gICAgICAgICAgICB0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiA/IHNlbGYgOlxuICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzID09PSBcIm9iamVjdFwiID8gdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgIEZ1bmN0aW9uKFwicmV0dXJuIHRoaXM7XCIpKCk7XG4gICAgICAgIHZhciBleHBvcnRlciA9IG1ha2VFeHBvcnRlcihSZWZsZWN0KTtcbiAgICAgICAgaWYgKHR5cGVvZiByb290LlJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHJvb3QuUmVmbGVjdCA9IFJlZmxlY3Q7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBleHBvcnRlciA9IG1ha2VFeHBvcnRlcihyb290LlJlZmxlY3QsIGV4cG9ydGVyKTtcbiAgICAgICAgfVxuICAgICAgICBmYWN0b3J5KGV4cG9ydGVyKTtcbiAgICAgICAgZnVuY3Rpb24gbWFrZUV4cG9ydGVyKHRhcmdldCwgcHJldmlvdXMpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W2tleV0gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHsgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMpXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0pKGZ1bmN0aW9uIChleHBvcnRlcikge1xuICAgICAgICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgICAgICAgLy8gZmVhdHVyZSB0ZXN0IGZvciBTeW1ib2wgc3VwcG9ydFxuICAgICAgICB2YXIgc3VwcG9ydHNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICAgIHZhciB0b1ByaW1pdGl2ZVN5bWJvbCA9IHN1cHBvcnRzU3ltYm9sICYmIHR5cGVvZiBTeW1ib2wudG9QcmltaXRpdmUgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wudG9QcmltaXRpdmUgOiBcIkBAdG9QcmltaXRpdmVcIjtcbiAgICAgICAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gc3VwcG9ydHNTeW1ib2wgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciAhPT0gXCJ1bmRlZmluZWRcIiA/IFN5bWJvbC5pdGVyYXRvciA6IFwiQEBpdGVyYXRvclwiO1xuICAgICAgICB2YXIgc3VwcG9ydHNDcmVhdGUgPSB0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gXCJmdW5jdGlvblwiOyAvLyBmZWF0dXJlIHRlc3QgZm9yIE9iamVjdC5jcmVhdGUgc3VwcG9ydFxuICAgICAgICB2YXIgc3VwcG9ydHNQcm90byA9IHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXk7IC8vIGZlYXR1cmUgdGVzdCBmb3IgX19wcm90b19fIHN1cHBvcnRcbiAgICAgICAgdmFyIGRvd25MZXZlbCA9ICFzdXBwb3J0c0NyZWF0ZSAmJiAhc3VwcG9ydHNQcm90bztcbiAgICAgICAgdmFyIEhhc2hNYXAgPSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgYW4gb2JqZWN0IGluIGRpY3Rpb25hcnkgbW9kZSAoYS5rLmEuIFwic2xvd1wiIG1vZGUgaW4gdjgpXG4gICAgICAgICAgICBjcmVhdGU6IHN1cHBvcnRzQ3JlYXRlXG4gICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBNYWtlRGljdGlvbmFyeShPYmplY3QuY3JlYXRlKG51bGwpKTsgfVxuICAgICAgICAgICAgICAgIDogc3VwcG9ydHNQcm90b1xuICAgICAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE1ha2VEaWN0aW9uYXJ5KHsgX19wcm90b19fOiBudWxsIH0pOyB9XG4gICAgICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKCkgeyByZXR1cm4gTWFrZURpY3Rpb25hcnkoe30pOyB9LFxuICAgICAgICAgICAgaGFzOiBkb3duTGV2ZWxcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uIChtYXAsIGtleSkgeyByZXR1cm4gaGFzT3duLmNhbGwobWFwLCBrZXkpOyB9XG4gICAgICAgICAgICAgICAgOiBmdW5jdGlvbiAobWFwLCBrZXkpIHsgcmV0dXJuIGtleSBpbiBtYXA7IH0sXG4gICAgICAgICAgICBnZXQ6IGRvd25MZXZlbFxuICAgICAgICAgICAgICAgID8gZnVuY3Rpb24gKG1hcCwga2V5KSB7IHJldHVybiBoYXNPd24uY2FsbChtYXAsIGtleSkgPyBtYXBba2V5XSA6IHVuZGVmaW5lZDsgfVxuICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKG1hcCwga2V5KSB7IHJldHVybiBtYXBba2V5XTsgfSxcbiAgICAgICAgfTtcbiAgICAgICAgLy8gTG9hZCBnbG9iYWwgb3Igc2hpbSB2ZXJzaW9ucyBvZiBNYXAsIFNldCwgYW5kIFdlYWtNYXBcbiAgICAgICAgdmFyIGZ1bmN0aW9uUHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKEZ1bmN0aW9uKTtcbiAgICAgICAgdmFyIHVzZVBvbHlmaWxsID0gdHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnZbXCJSRUZMRUNUX01FVEFEQVRBX1VTRV9NQVBfUE9MWUZJTExcIl0gPT09IFwidHJ1ZVwiO1xuICAgICAgICB2YXIgX01hcCA9ICF1c2VQb2x5ZmlsbCAmJiB0eXBlb2YgTWFwID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIE1hcC5wcm90b3R5cGUuZW50cmllcyA9PT0gXCJmdW5jdGlvblwiID8gTWFwIDogQ3JlYXRlTWFwUG9seWZpbGwoKTtcbiAgICAgICAgdmFyIF9TZXQgPSAhdXNlUG9seWZpbGwgJiYgdHlwZW9mIFNldCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTZXQucHJvdG90eXBlLmVudHJpZXMgPT09IFwiZnVuY3Rpb25cIiA/IFNldCA6IENyZWF0ZVNldFBvbHlmaWxsKCk7XG4gICAgICAgIHZhciBfV2Vha01hcCA9ICF1c2VQb2x5ZmlsbCAmJiB0eXBlb2YgV2Vha01hcCA9PT0gXCJmdW5jdGlvblwiID8gV2Vha01hcCA6IENyZWF0ZVdlYWtNYXBQb2x5ZmlsbCgpO1xuICAgICAgICAvLyBbW01ldGFkYXRhXV0gaW50ZXJuYWwgc2xvdFxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeS1vYmplY3QtaW50ZXJuYWwtbWV0aG9kcy1hbmQtaW50ZXJuYWwtc2xvdHNcbiAgICAgICAgdmFyIE1ldGFkYXRhID0gbmV3IF9XZWFrTWFwKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBsaWVzIGEgc2V0IG9mIGRlY29yYXRvcnMgdG8gYSBwcm9wZXJ0eSBvZiBhIHRhcmdldCBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSBkZWNvcmF0b3JzIEFuIGFycmF5IG9mIGRlY29yYXRvcnMuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgdG8gZGVjb3JhdGUuXG4gICAgICAgICAqIEBwYXJhbSBhdHRyaWJ1dGVzIChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGRlc2NyaXB0b3IgZm9yIHRoZSB0YXJnZXQga2V5LlxuICAgICAgICAgKiBAcmVtYXJrcyBEZWNvcmF0b3JzIGFyZSBhcHBsaWVkIGluIHJldmVyc2Ugb3JkZXIuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIEV4YW1wbGUgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIsXG4gICAgICAgICAqICAgICAgICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIsXG4gICAgICAgICAqICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIikpKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiLFxuICAgICAgICAgKiAgICAgICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9yc0FycmF5LCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIixcbiAgICAgICAgICogICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIikpKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwgcHJvcGVydHlLZXksIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFJc0FycmF5KGRlY29yYXRvcnMpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChhdHRyaWJ1dGVzKSAmJiAhSXNVbmRlZmluZWQoYXR0cmlidXRlcykgJiYgIUlzTnVsbChhdHRyaWJ1dGVzKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmIChJc051bGwoYXR0cmlidXRlcykpXG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGVjb3JhdGVQcm9wZXJ0eShkZWNvcmF0b3JzLCB0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghSXNBcnJheShkZWNvcmF0b3JzKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmICghSXNDb25zdHJ1Y3Rvcih0YXJnZXQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERlY29yYXRlQ29uc3RydWN0b3IoZGVjb3JhdG9ycywgdGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImRlY29yYXRlXCIsIGRlY29yYXRlKTtcbiAgICAgICAgLy8gNC4xLjIgUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSlcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jcmVmbGVjdC5tZXRhZGF0YVxuICAgICAgICAvKipcbiAgICAgICAgICogQSBkZWZhdWx0IG1ldGFkYXRhIGRlY29yYXRvciBmYWN0b3J5IHRoYXQgY2FuIGJlIHVzZWQgb24gYSBjbGFzcywgY2xhc3MgbWVtYmVyLCBvciBwYXJhbWV0ZXIuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBUaGUga2V5IGZvciB0aGUgbWV0YWRhdGEgZW50cnkuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YVZhbHVlIFRoZSB2YWx1ZSBmb3IgdGhlIG1ldGFkYXRhIGVudHJ5LlxuICAgICAgICAgKiBAcmV0dXJucyBBIGRlY29yYXRvciBmdW5jdGlvbi5cbiAgICAgICAgICogQHJlbWFya3NcbiAgICAgICAgICogSWYgYG1ldGFkYXRhS2V5YCBpcyBhbHJlYWR5IGRlZmluZWQgZm9yIHRoZSB0YXJnZXQgYW5kIHRhcmdldCBrZXksIHRoZVxuICAgICAgICAgKiBtZXRhZGF0YVZhbHVlIGZvciB0aGF0IGtleSB3aWxsIGJlIG92ZXJ3cml0dGVuLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvciwgVHlwZVNjcmlwdCBvbmx5KVxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgQFJlZmxlY3QubWV0YWRhdGEoa2V5LCB2YWx1ZSlcbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlLCBUeXBlU2NyaXB0IG9ubHkpXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxuICAgICAgICAgKiAgICAgICAgIHByb3BlcnR5O1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZCgpIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZCgpIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlY29yYXRvcih0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkgJiYgIUlzUHJvcGVydHlLZXkocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgT3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVjb3JhdG9yO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwibWV0YWRhdGFcIiwgbWV0YWRhdGEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lIGEgdW5pcXVlIG1ldGFkYXRhIGVudHJ5IG9uIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhVmFsdWUgQSB2YWx1ZSB0aGF0IGNvbnRhaW5zIGF0dGFjaGVkIG1ldGFkYXRhLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRvIGRlZmluZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGRlY29yYXRvciBmYWN0b3J5IGFzIG1ldGFkYXRhLXByb2R1Y2luZyBhbm5vdGF0aW9uLlxuICAgICAgICAgKiAgICAgZnVuY3Rpb24gTXlBbm5vdGF0aW9uKG9wdGlvbnMpOiBEZWNvcmF0b3Ige1xuICAgICAgICAgKiAgICAgICAgIHJldHVybiAodGFyZ2V0LCBrZXk/KSA9PiBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgdGFyZ2V0LCBrZXkpO1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZGVmaW5lTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiZGVmaW5lTWV0YWRhdGFcIiwgZGVmaW5lTWV0YWRhdGEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdGFyZ2V0IG9iamVjdCBvciBpdHMgcHJvdG90eXBlIGNoYWluIGhhcyB0aGUgcHJvdmlkZWQgbWV0YWRhdGEga2V5IGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZSBtZXRhZGF0YSBrZXkgd2FzIGRlZmluZWQgb24gdGhlIHRhcmdldCBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbjsgb3RoZXJ3aXNlLCBgZmFsc2VgLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gaGFzTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5SGFzTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiaGFzTWV0YWRhdGFcIiwgaGFzTWV0YWRhdGEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyBhIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciB0aGUgdGFyZ2V0IG9iamVjdCBoYXMgdGhlIHByb3ZpZGVkIG1ldGFkYXRhIGtleSBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgbWV0YWRhdGEga2V5IHdhcyBkZWZpbmVkIG9uIHRoZSB0YXJnZXQgb2JqZWN0OyBvdGhlcndpc2UsIGBmYWxzZWAuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzT3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBoYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlIYXNPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJoYXNPd25NZXRhZGF0YVwiLCBoYXNPd25NZXRhZGF0YSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIHByb3ZpZGVkIG1ldGFkYXRhIGtleSBvbiB0aGUgdGFyZ2V0IG9iamVjdCBvciBpdHMgcHJvdG90eXBlIGNoYWluLlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIG1ldGFkYXRhIGtleSBpZiBmb3VuZDsgb3RoZXJ3aXNlLCBgdW5kZWZpbmVkYC5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldE1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImdldE1ldGFkYXRhXCIsIGdldE1ldGFkYXRhKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIG1ldGFkYXRhIHZhbHVlIGZvciB0aGUgcHJvdmlkZWQgbWV0YWRhdGEga2V5IG9uIHRoZSB0YXJnZXQgb2JqZWN0LlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIG1ldGFkYXRhIGtleSBpZiBmb3VuZDsgb3RoZXJ3aXNlLCBgdW5kZWZpbmVkYC5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldE93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImdldE93bk1ldGFkYXRhXCIsIGdldE93bk1ldGFkYXRhKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIG1ldGFkYXRhIGtleXMgZGVmaW5lZCBvbiB0aGUgdGFyZ2V0IG9iamVjdCBvciBpdHMgcHJvdG90eXBlIGNoYWluLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcmV0dXJucyBBbiBhcnJheSBvZiB1bmlxdWUgbWV0YWRhdGEga2V5cy5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMoRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRNZXRhZGF0YUtleXModGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlNZXRhZGF0YUtleXModGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJnZXRNZXRhZGF0YUtleXNcIiwgZ2V0TWV0YWRhdGFLZXlzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIHVuaXF1ZSBtZXRhZGF0YSBrZXlzIGRlZmluZWQgb24gdGhlIHRhcmdldCBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIEFuIGFycmF5IG9mIHVuaXF1ZSBtZXRhZGF0YSBrZXlzLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldE93bk1ldGFkYXRhS2V5cyh0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeU93bk1ldGFkYXRhS2V5cyh0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImdldE93bk1ldGFkYXRhS2V5c1wiLCBnZXRPd25NZXRhZGF0YUtleXMpO1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVsZXRlcyB0aGUgbWV0YWRhdGEgZW50cnkgZnJvbSB0aGUgdGFyZ2V0IG9iamVjdCB3aXRoIHRoZSBwcm92aWRlZCBrZXkuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YUtleSBBIGtleSB1c2VkIHRvIHN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQHJldHVybnMgYHRydWVgIGlmIHRoZSBtZXRhZGF0YSBlbnRyeSB3YXMgZm91bmQgYW5kIGRlbGV0ZWQ7IG90aGVyd2lzZSwgZmFsc2UuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZGVsZXRlTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBkZWxldGVNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKHRhcmdldCwgcHJvcGVydHlLZXksIC8qQ3JlYXRlKi8gZmFsc2UpO1xuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIW1ldGFkYXRhTWFwLmRlbGV0ZShtZXRhZGF0YUtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKG1ldGFkYXRhTWFwLnNpemUgPiAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgdmFyIHRhcmdldE1ldGFkYXRhID0gTWV0YWRhdGEuZ2V0KHRhcmdldCk7XG4gICAgICAgICAgICB0YXJnZXRNZXRhZGF0YS5kZWxldGUocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgaWYgKHRhcmdldE1ldGFkYXRhLnNpemUgPiAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgTWV0YWRhdGEuZGVsZXRlKHRhcmdldCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImRlbGV0ZU1ldGFkYXRhXCIsIGRlbGV0ZU1ldGFkYXRhKTtcbiAgICAgICAgZnVuY3Rpb24gRGVjb3JhdGVDb25zdHJ1Y3RvcihkZWNvcmF0b3JzLCB0YXJnZXQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlY29yYXRvciA9IGRlY29yYXRvcnNbaV07XG4gICAgICAgICAgICAgICAgdmFyIGRlY29yYXRlZCA9IGRlY29yYXRvcih0YXJnZXQpO1xuICAgICAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQoZGVjb3JhdGVkKSAmJiAhSXNOdWxsKGRlY29yYXRlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc0NvbnN0cnVjdG9yKGRlY29yYXRlZCkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGRlY29yYXRlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIERlY29yYXRlUHJvcGVydHkoZGVjb3JhdG9ycywgdGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVjb3JhdG9yID0gZGVjb3JhdG9yc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgZGVjb3JhdGVkID0gZGVjb3JhdG9yKHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQoZGVjb3JhdGVkKSAmJiAhSXNOdWxsKGRlY29yYXRlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChkZWNvcmF0ZWQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdG9yID0gZGVjb3JhdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgQ3JlYXRlKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0TWV0YWRhdGEgPSBNZXRhZGF0YS5nZXQoTyk7XG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQodGFyZ2V0TWV0YWRhdGEpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFDcmVhdGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGFyZ2V0TWV0YWRhdGEgPSBuZXcgX01hcCgpO1xuICAgICAgICAgICAgICAgIE1ldGFkYXRhLnNldChPLCB0YXJnZXRNZXRhZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSB0YXJnZXRNZXRhZGF0YS5nZXQoUCk7XG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFDcmVhdGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGFNYXAgPSBuZXcgX01hcCgpO1xuICAgICAgICAgICAgICAgIHRhcmdldE1ldGFkYXRhLnNldChQLCBtZXRhZGF0YU1hcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWV0YWRhdGFNYXA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjEuMSBPcmRpbmFyeUhhc01ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWhhc21ldGFkYXRhXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5SGFzTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcbiAgICAgICAgICAgIHZhciBoYXNPd24gPSBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcbiAgICAgICAgICAgIGlmIChoYXNPd24pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKTtcbiAgICAgICAgICAgIGlmICghSXNOdWxsKHBhcmVudCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5SGFzTWV0YWRhdGEoTWV0YWRhdGFLZXksIHBhcmVudCwgUCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjIuMSBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWhhc293bm1ldGFkYXRhXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5SGFzT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgLypDcmVhdGUqLyBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBUb0Jvb2xlYW4obWV0YWRhdGFNYXAuaGFzKE1ldGFkYXRhS2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjMuMSBPcmRpbmFyeUdldE1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWdldG1ldGFkYXRhXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5R2V0TWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcbiAgICAgICAgICAgIHZhciBoYXNPd24gPSBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcbiAgICAgICAgICAgIGlmIChoYXNPd24pXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5R2V0T3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApO1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTyk7XG4gICAgICAgICAgICBpZiAoIUlzTnVsbChwYXJlbnQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE1ldGFkYXRhKE1ldGFkYXRhS2V5LCBwYXJlbnQsIFApO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyAzLjEuNC4xIE9yZGluYXJ5R2V0T3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5Z2V0b3dubWV0YWRhdGFcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlHZXRPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCkge1xuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCAvKkNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZChtZXRhZGF0YU1hcCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBtZXRhZGF0YU1hcC5nZXQoTWV0YWRhdGFLZXkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuMS41LjEgT3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTWV0YWRhdGFWYWx1ZSwgTywgUClcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnlkZWZpbmVvd25tZXRhZGF0YVxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeURlZmluZU93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBNZXRhZGF0YVZhbHVlLCBPLCBQKSB7XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIC8qQ3JlYXRlKi8gdHJ1ZSk7XG4gICAgICAgICAgICBtZXRhZGF0YU1hcC5zZXQoTWV0YWRhdGFLZXksIE1ldGFkYXRhVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuMS42LjEgT3JkaW5hcnlNZXRhZGF0YUtleXMoTywgUClcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnltZXRhZGF0YWtleXNcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlNZXRhZGF0YUtleXMoTywgUCkge1xuICAgICAgICAgICAgdmFyIG93bktleXMgPSBPcmRpbmFyeU93bk1ldGFkYXRhS2V5cyhPLCBQKTtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBPcmRpbmFyeUdldFByb3RvdHlwZU9mKE8pO1xuICAgICAgICAgICAgaWYgKHBhcmVudCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3duS2V5cztcbiAgICAgICAgICAgIHZhciBwYXJlbnRLZXlzID0gT3JkaW5hcnlNZXRhZGF0YUtleXMocGFyZW50LCBQKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRLZXlzLmxlbmd0aCA8PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBvd25LZXlzO1xuICAgICAgICAgICAgaWYgKG93bktleXMubGVuZ3RoIDw9IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudEtleXM7XG4gICAgICAgICAgICB2YXIgc2V0ID0gbmV3IF9TZXQoKTtcbiAgICAgICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIG93bktleXNfMSA9IG93bktleXM7IF9pIDwgb3duS2V5c18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBvd25LZXlzXzFbX2ldO1xuICAgICAgICAgICAgICAgIHZhciBoYXNLZXkgPSBzZXQuaGFzKGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0LmFkZChrZXkpO1xuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBfYSA9IDAsIHBhcmVudEtleXNfMSA9IHBhcmVudEtleXM7IF9hIDwgcGFyZW50S2V5c18xLmxlbmd0aDsgX2ErKykge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBwYXJlbnRLZXlzXzFbX2FdO1xuICAgICAgICAgICAgICAgIHZhciBoYXNLZXkgPSBzZXQuaGFzKGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0LmFkZChrZXkpO1xuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgICAgfVxuICAgICAgICAvLyAzLjEuNy4xIE9yZGluYXJ5T3duTWV0YWRhdGFLZXlzKE8sIFApXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5b3dubWV0YWRhdGFrZXlzXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5T3duTWV0YWRhdGFLZXlzKE8sIFApIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIC8qQ3JlYXRlKi8gZmFsc2UpO1xuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSlcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgICAgICAgIHZhciBrZXlzT2JqID0gbWV0YWRhdGFNYXAua2V5cygpO1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gR2V0SXRlcmF0b3Ioa2V5c09iaik7XG4gICAgICAgICAgICB2YXIgayA9IDA7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gSXRlcmF0b3JTdGVwKGl0ZXJhdG9yKTtcbiAgICAgICAgICAgICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cy5sZW5ndGggPSBrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5cztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIG5leHRWYWx1ZSA9IEl0ZXJhdG9yVmFsdWUobmV4dCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAga2V5c1trXSA9IG5leHRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gNiBFQ01BU2NyaXB0IERhdGEgVHlwMGVzIGFuZCBWYWx1ZXNcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1kYXRhLXR5cGVzLWFuZC12YWx1ZXNcbiAgICAgICAgZnVuY3Rpb24gVHlwZSh4KSB7XG4gICAgICAgICAgICBpZiAoeCA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gMSAvKiBOdWxsICovO1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgeCkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ1bmRlZmluZWRcIjogcmV0dXJuIDAgLyogVW5kZWZpbmVkICovO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6IHJldHVybiAyIC8qIEJvb2xlYW4gKi87XG4gICAgICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOiByZXR1cm4gMyAvKiBTdHJpbmcgKi87XG4gICAgICAgICAgICAgICAgY2FzZSBcInN5bWJvbFwiOiByZXR1cm4gNCAvKiBTeW1ib2wgKi87XG4gICAgICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOiByZXR1cm4gNSAvKiBOdW1iZXIgKi87XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOiByZXR1cm4geCA9PT0gbnVsbCA/IDEgLyogTnVsbCAqLyA6IDYgLyogT2JqZWN0ICovO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiA2IC8qIE9iamVjdCAqLztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyA2LjEuMSBUaGUgVW5kZWZpbmVkIFR5cGVcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcy11bmRlZmluZWQtdHlwZVxuICAgICAgICBmdW5jdGlvbiBJc1VuZGVmaW5lZCh4KSB7XG4gICAgICAgICAgICByZXR1cm4geCA9PT0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIDYuMS4yIFRoZSBOdWxsIFR5cGVcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcy1udWxsLXR5cGVcbiAgICAgICAgZnVuY3Rpb24gSXNOdWxsKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB4ID09PSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIDYuMS41IFRoZSBTeW1ib2wgVHlwZVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzLXN5bWJvbC10eXBlXG4gICAgICAgIGZ1bmN0aW9uIElzU3ltYm9sKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyA2LjEuNyBUaGUgT2JqZWN0IFR5cGVcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LXR5cGVcbiAgICAgICAgZnVuY3Rpb24gSXNPYmplY3QoeCkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcIm9iamVjdFwiID8geCAhPT0gbnVsbCA6IHR5cGVvZiB4ID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4xIFR5cGUgQ29udmVyc2lvblxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10eXBlLWNvbnZlcnNpb25cbiAgICAgICAgLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4gICAgICAgIGZ1bmN0aW9uIFRvUHJpbWl0aXZlKGlucHV0LCBQcmVmZXJyZWRUeXBlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKFR5cGUoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwIC8qIFVuZGVmaW5lZCAqLzogcmV0dXJuIGlucHV0O1xuICAgICAgICAgICAgICAgIGNhc2UgMSAvKiBOdWxsICovOiByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICAgICAgY2FzZSAyIC8qIEJvb2xlYW4gKi86IHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgICAgICBjYXNlIDMgLyogU3RyaW5nICovOiByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICAgICAgY2FzZSA0IC8qIFN5bWJvbCAqLzogcmV0dXJuIGlucHV0O1xuICAgICAgICAgICAgICAgIGNhc2UgNSAvKiBOdW1iZXIgKi86IHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBoaW50ID0gUHJlZmVycmVkVHlwZSA9PT0gMyAvKiBTdHJpbmcgKi8gPyBcInN0cmluZ1wiIDogUHJlZmVycmVkVHlwZSA9PT0gNSAvKiBOdW1iZXIgKi8gPyBcIm51bWJlclwiIDogXCJkZWZhdWx0XCI7XG4gICAgICAgICAgICB2YXIgZXhvdGljVG9QcmltID0gR2V0TWV0aG9kKGlucHV0LCB0b1ByaW1pdGl2ZVN5bWJvbCk7XG4gICAgICAgICAgICBpZiAoZXhvdGljVG9QcmltICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZXhvdGljVG9QcmltLmNhbGwoaW5wdXQsIGhpbnQpO1xuICAgICAgICAgICAgICAgIGlmIChJc09iamVjdChyZXN1bHQpKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeVRvUHJpbWl0aXZlKGlucHV0LCBoaW50ID09PSBcImRlZmF1bHRcIiA/IFwibnVtYmVyXCIgOiBoaW50KTtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjEuMS4xIE9yZGluYXJ5VG9QcmltaXRpdmUoTywgaGludClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3JkaW5hcnl0b3ByaW1pdGl2ZVxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeVRvUHJpbWl0aXZlKE8sIGhpbnQpIHtcbiAgICAgICAgICAgIGlmIChoaW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvU3RyaW5nXzEgPSBPLnRvU3RyaW5nO1xuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHRvU3RyaW5nXzEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0b1N0cmluZ18xLmNhbGwoTyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZU9mID0gTy52YWx1ZU9mO1xuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHZhbHVlT2YpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB2YWx1ZU9mLmNhbGwoTyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlT2YgPSBPLnZhbHVlT2Y7XG4gICAgICAgICAgICAgICAgaWYgKElzQ2FsbGFibGUodmFsdWVPZikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHZhbHVlT2YuY2FsbChPKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJc09iamVjdChyZXN1bHQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHRvU3RyaW5nXzIgPSBPLnRvU3RyaW5nO1xuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHRvU3RyaW5nXzIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0b1N0cmluZ18yLmNhbGwoTyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMS4yIFRvQm9vbGVhbihhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLzIwMTYvI3NlYy10b2Jvb2xlYW5cbiAgICAgICAgZnVuY3Rpb24gVG9Cb29sZWFuKGFyZ3VtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gISFhcmd1bWVudDtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjEuMTIgVG9TdHJpbmcoYXJndW1lbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvc3RyaW5nXG4gICAgICAgIGZ1bmN0aW9uIFRvU3RyaW5nKGFyZ3VtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIiArIGFyZ3VtZW50O1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMS4xNCBUb1Byb3BlcnR5S2V5KGFyZ3VtZW50KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b3Byb3BlcnR5a2V5XG4gICAgICAgIGZ1bmN0aW9uIFRvUHJvcGVydHlLZXkoYXJndW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBUb1ByaW1pdGl2ZShhcmd1bWVudCwgMyAvKiBTdHJpbmcgKi8pO1xuICAgICAgICAgICAgaWYgKElzU3ltYm9sKGtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIHJldHVybiBUb1N0cmluZyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMiBUZXN0aW5nIGFuZCBDb21wYXJpc29uIE9wZXJhdGlvbnNcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdGVzdGluZy1hbmQtY29tcGFyaXNvbi1vcGVyYXRpb25zXG4gICAgICAgIC8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWlzYXJyYXlcbiAgICAgICAgZnVuY3Rpb24gSXNBcnJheShhcmd1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXlcbiAgICAgICAgICAgICAgICA/IEFycmF5LmlzQXJyYXkoYXJndW1lbnQpXG4gICAgICAgICAgICAgICAgOiBhcmd1bWVudCBpbnN0YW5jZW9mIE9iamVjdFxuICAgICAgICAgICAgICAgICAgICA/IGFyZ3VtZW50IGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgICAgICAgICAgOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4yLjMgSXNDYWxsYWJsZShhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNjYWxsYWJsZVxuICAgICAgICBmdW5jdGlvbiBJc0NhbGxhYmxlKGFyZ3VtZW50KSB7XG4gICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGlzIGFuIGFwcHJveGltYXRpb24gYXMgd2UgY2Fubm90IGNoZWNrIGZvciBbW0NhbGxdXSBpbnRlcm5hbCBtZXRob2QuXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4yLjQgSXNDb25zdHJ1Y3Rvcihhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNjb25zdHJ1Y3RvclxuICAgICAgICBmdW5jdGlvbiBJc0NvbnN0cnVjdG9yKGFyZ3VtZW50KSB7XG4gICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGlzIGFuIGFwcHJveGltYXRpb24gYXMgd2UgY2Fubm90IGNoZWNrIGZvciBbW0NvbnN0cnVjdF1dIGludGVybmFsIG1ldGhvZC5cbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgYXJndW1lbnQgPT09IFwiZnVuY3Rpb25cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjIuNyBJc1Byb3BlcnR5S2V5KGFyZ3VtZW50KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pc3Byb3BlcnR5a2V5XG4gICAgICAgIGZ1bmN0aW9uIElzUHJvcGVydHlLZXkoYXJndW1lbnQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoVHlwZShhcmd1bWVudCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDMgLyogU3RyaW5nICovOiByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDQgLyogU3ltYm9sICovOiByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4zIE9wZXJhdGlvbnMgb24gT2JqZWN0c1xuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcGVyYXRpb25zLW9uLW9iamVjdHNcbiAgICAgICAgLy8gNy4zLjkgR2V0TWV0aG9kKFYsIFApXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWdldG1ldGhvZFxuICAgICAgICBmdW5jdGlvbiBHZXRNZXRob2QoViwgUCkge1xuICAgICAgICAgICAgdmFyIGZ1bmMgPSBWW1BdO1xuICAgICAgICAgICAgaWYgKGZ1bmMgPT09IHVuZGVmaW5lZCB8fCBmdW5jID09PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoIUlzQ2FsbGFibGUoZnVuYykpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy40IE9wZXJhdGlvbnMgb24gSXRlcmF0b3IgT2JqZWN0c1xuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcGVyYXRpb25zLW9uLWl0ZXJhdG9yLW9iamVjdHNcbiAgICAgICAgZnVuY3Rpb24gR2V0SXRlcmF0b3Iob2JqKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gR2V0TWV0aG9kKG9iaiwgaXRlcmF0b3JTeW1ib2wpO1xuICAgICAgICAgICAgaWYgKCFJc0NhbGxhYmxlKG1ldGhvZCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpOyAvLyBmcm9tIENhbGxcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG1ldGhvZC5jYWxsKG9iaik7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KGl0ZXJhdG9yKSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICByZXR1cm4gaXRlcmF0b3I7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy40LjQgSXRlcmF0b3JWYWx1ZShpdGVyUmVzdWx0KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvMjAxNi8jc2VjLWl0ZXJhdG9ydmFsdWVcbiAgICAgICAgZnVuY3Rpb24gSXRlcmF0b3JWYWx1ZShpdGVyUmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlclJlc3VsdC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjQuNSBJdGVyYXRvclN0ZXAoaXRlcmF0b3IpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWl0ZXJhdG9yc3RlcFxuICAgICAgICBmdW5jdGlvbiBJdGVyYXRvclN0ZXAoaXRlcmF0b3IpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyBmYWxzZSA6IHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pdGVyYXRvcmNsb3NlXG4gICAgICAgIGZ1bmN0aW9uIEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IpIHtcbiAgICAgICAgICAgIHZhciBmID0gaXRlcmF0b3JbXCJyZXR1cm5cIl07XG4gICAgICAgICAgICBpZiAoZilcbiAgICAgICAgICAgICAgICBmLmNhbGwoaXRlcmF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDkuMSBPcmRpbmFyeSBPYmplY3QgSW50ZXJuYWwgTWV0aG9kcyBhbmQgSW50ZXJuYWwgU2xvdHNcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3JkaW5hcnktb2JqZWN0LWludGVybmFsLW1ldGhvZHMtYW5kLWludGVybmFsLXNsb3RzXG4gICAgICAgIC8vIDkuMS4xLjEgT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vcmRpbmFyeWdldHByb3RvdHlwZW9mXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTykge1xuICAgICAgICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBPICE9PSBcImZ1bmN0aW9uXCIgfHwgTyA9PT0gZnVuY3Rpb25Qcm90b3R5cGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICAgICAgLy8gVHlwZVNjcmlwdCBkb2Vzbid0IHNldCBfX3Byb3RvX18gaW4gRVM1LCBhcyBpdCdzIG5vbi1zdGFuZGFyZC5cbiAgICAgICAgICAgIC8vIFRyeSB0byBkZXRlcm1pbmUgdGhlIHN1cGVyY2xhc3MgY29uc3RydWN0b3IuIENvbXBhdGlibGUgaW1wbGVtZW50YXRpb25zXG4gICAgICAgICAgICAvLyBtdXN0IGVpdGhlciBzZXQgX19wcm90b19fIG9uIGEgc3ViY2xhc3MgY29uc3RydWN0b3IgdG8gdGhlIHN1cGVyY2xhc3MgY29uc3RydWN0b3IsXG4gICAgICAgICAgICAvLyBvciBlbnN1cmUgZWFjaCBjbGFzcyBoYXMgYSB2YWxpZCBgY29uc3RydWN0b3JgIHByb3BlcnR5IG9uIGl0cyBwcm90b3R5cGUgdGhhdFxuICAgICAgICAgICAgLy8gcG9pbnRzIGJhY2sgdG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBub3QgdGhlIHNhbWUgYXMgRnVuY3Rpb24uW1tQcm90b3R5cGVdXSwgdGhlbiB0aGlzIGlzIGRlZmluYXRlbHkgaW5oZXJpdGVkLlxuICAgICAgICAgICAgLy8gVGhpcyBpcyB0aGUgY2FzZSB3aGVuIGluIEVTNiBvciB3aGVuIHVzaW5nIF9fcHJvdG9fXyBpbiBhIGNvbXBhdGlibGUgYnJvd3Nlci5cbiAgICAgICAgICAgIGlmIChwcm90byAhPT0gZnVuY3Rpb25Qcm90b3R5cGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICAgICAgLy8gSWYgdGhlIHN1cGVyIHByb3RvdHlwZSBpcyBPYmplY3QucHJvdG90eXBlLCBudWxsLCBvciB1bmRlZmluZWQsIHRoZW4gd2UgY2Fubm90IGRldGVybWluZSB0aGUgaGVyaXRhZ2UuXG4gICAgICAgICAgICB2YXIgcHJvdG90eXBlID0gTy5wcm90b3R5cGU7XG4gICAgICAgICAgICB2YXIgcHJvdG90eXBlUHJvdG8gPSBwcm90b3R5cGUgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvdHlwZSk7XG4gICAgICAgICAgICBpZiAocHJvdG90eXBlUHJvdG8gPT0gbnVsbCB8fCBwcm90b3R5cGVQcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdG87XG4gICAgICAgICAgICAvLyBJZiB0aGUgY29uc3RydWN0b3Igd2FzIG5vdCBhIGZ1bmN0aW9uLCB0aGVuIHdlIGNhbm5vdCBkZXRlcm1pbmUgdGhlIGhlcml0YWdlLlxuICAgICAgICAgICAgdmFyIGNvbnN0cnVjdG9yID0gcHJvdG90eXBlUHJvdG8uY29uc3RydWN0b3I7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnN0cnVjdG9yICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICAgICAgLy8gSWYgd2UgaGF2ZSBzb21lIGtpbmQgb2Ygc2VsZi1yZWZlcmVuY2UsIHRoZW4gd2UgY2Fubm90IGRldGVybWluZSB0aGUgaGVyaXRhZ2UuXG4gICAgICAgICAgICBpZiAoY29uc3RydWN0b3IgPT09IE8pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICAgICAgLy8gd2UgaGF2ZSBhIHByZXR0eSBnb29kIGd1ZXNzIGF0IHRoZSBoZXJpdGFnZS5cbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3RvcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBuYWl2ZSBNYXAgc2hpbVxuICAgICAgICBmdW5jdGlvbiBDcmVhdGVNYXBQb2x5ZmlsbCgpIHtcbiAgICAgICAgICAgIHZhciBjYWNoZVNlbnRpbmVsID0ge307XG4gICAgICAgICAgICB2YXIgYXJyYXlTZW50aW5lbCA9IFtdO1xuICAgICAgICAgICAgdmFyIE1hcEl0ZXJhdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIE1hcEl0ZXJhdG9yKGtleXMsIHZhbHVlcywgc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0ga2V5cztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGVbXCJAQGl0ZXJhdG9yXCJdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcbiAgICAgICAgICAgICAgICBNYXBJdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5faW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5fa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9zZWxlY3Rvcih0aGlzLl9rZXlzW2luZGV4XSwgdGhpcy5fdmFsdWVzW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggKyAxID49IHRoaXMuX2tleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0gYXJyYXlTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBhcnJheVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiByZXN1bHQsIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlLnRocm93ID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRleCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IGFycmF5U2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBhcnJheVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlLnJldHVybiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBhcnJheVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gYXJyYXlTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGRvbmU6IHRydWUgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXBJdGVyYXRvcjtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIE1hcCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVLZXkgPSBjYWNoZVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gLTI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShNYXAucHJvdG90eXBlLCBcInNpemVcIiwge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2tleXMubGVuZ3RoOyB9LFxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHRoaXMuX2ZpbmQoa2V5LCAvKmluc2VydCovIGZhbHNlKSA+PSAwOyB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9maW5kKGtleSwgLyppbnNlcnQqLyBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCA+PSAwID8gdGhpcy5fdmFsdWVzW2luZGV4XSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZChrZXksIC8qaW5zZXJ0Ki8gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZChrZXksIC8qaW5zZXJ0Ki8gZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNpemUgPSB0aGlzLl9rZXlzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBpbmRleCArIDE7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzW2kgLSAxXSA9IHRoaXMuX2tleXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzW2kgLSAxXSA9IHRoaXMuX3ZhbHVlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMubGVuZ3RoLS07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMubGVuZ3RoLS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSB0aGlzLl9jYWNoZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlS2V5ID0gY2FjaGVTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gLTI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUtleSA9IGNhY2hlU2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlSW5kZXggPSAtMjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBNYXBJdGVyYXRvcih0aGlzLl9rZXlzLCB0aGlzLl92YWx1ZXMsIGdldEtleSk7IH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTWFwSXRlcmF0b3IodGhpcy5fa2V5cywgdGhpcy5fdmFsdWVzLCBnZXRWYWx1ZSk7IH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE1hcEl0ZXJhdG9yKHRoaXMuX2tleXMsIHRoaXMuX3ZhbHVlcywgZ2V0RW50cnkpOyB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGVbXCJAQGl0ZXJhdG9yXCJdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzKCk7IH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmVudHJpZXMoKTsgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLl9maW5kID0gZnVuY3Rpb24gKGtleSwgaW5zZXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jYWNoZUtleSAhPT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gdGhpcy5fa2V5cy5pbmRleE9mKHRoaXMuX2NhY2hlS2V5ID0ga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FjaGVJbmRleCA8IDAgJiYgaW5zZXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gdGhpcy5fa2V5cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlSW5kZXg7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWFwO1xuICAgICAgICAgICAgfSgpKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEtleShrZXksIF8pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0VmFsdWUoXywgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRFbnRyeShrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBuYWl2ZSBTZXQgc2hpbVxuICAgICAgICBmdW5jdGlvbiBDcmVhdGVTZXRQb2x5ZmlsbCgpIHtcbiAgICAgICAgICAgIHJldHVybiAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gU2V0KCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXAgPSBuZXcgX01hcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2V0LnByb3RvdHlwZSwgXCJzaXplXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYXAuc2l6ZTsgfSxcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHRoaXMuX21hcC5oYXModmFsdWUpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB0aGlzLl9tYXAuc2V0KHZhbHVlLCB2YWx1ZSksIHRoaXM7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHRoaXMuX21hcC5kZWxldGUodmFsdWUpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7IHRoaXMuX21hcC5jbGVhcigpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hcC5rZXlzKCk7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYXAudmFsdWVzKCk7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwLmVudHJpZXMoKTsgfTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlW1wiQEBpdGVyYXRvclwiXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMua2V5cygpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5rZXlzKCk7IH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNldDtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbmFpdmUgV2Vha01hcCBzaGltXG4gICAgICAgIGZ1bmN0aW9uIENyZWF0ZVdlYWtNYXBQb2x5ZmlsbCgpIHtcbiAgICAgICAgICAgIHZhciBVVUlEX1NJWkUgPSAxNjtcbiAgICAgICAgICAgIHZhciBrZXlzID0gSGFzaE1hcC5jcmVhdGUoKTtcbiAgICAgICAgICAgIHZhciByb290S2V5ID0gQ3JlYXRlVW5pcXVlS2V5KCk7XG4gICAgICAgICAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFdlYWtNYXAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleSA9IENyZWF0ZVVuaXF1ZUtleSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgLypjcmVhdGUqLyBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZSAhPT0gdW5kZWZpbmVkID8gSGFzaE1hcC5oYXModGFibGUsIHRoaXMuX2tleSkgOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gR2V0T3JDcmVhdGVXZWFrTWFwVGFibGUodGFyZ2V0LCAvKmNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlICE9PSB1bmRlZmluZWQgPyBIYXNoTWFwLmdldCh0YWJsZSwgdGhpcy5fa2V5KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgLypjcmVhdGUqLyB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGFibGVbdGhpcy5fa2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhYmxlID0gR2V0T3JDcmVhdGVXZWFrTWFwVGFibGUodGFyZ2V0LCAvKmNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhYmxlICE9PSB1bmRlZmluZWQgPyBkZWxldGUgdGFibGVbdGhpcy5fa2V5XSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IG5vdCBhIHJlYWwgY2xlYXIsIGp1c3QgbWFrZXMgdGhlIHByZXZpb3VzIGRhdGEgdW5yZWFjaGFibGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5ID0gQ3JlYXRlVW5pcXVlS2V5KCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gV2Vha01hcDtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBDcmVhdGVVbmlxdWVLZXkoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgICAgICBkb1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBcIkBAV2Vha01hcEBAXCIgKyBDcmVhdGVVVUlEKCk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKEhhc2hNYXAuaGFzKGtleXMsIGtleSkpO1xuICAgICAgICAgICAgICAgIGtleXNba2V5XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgY3JlYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNPd24uY2FsbCh0YXJnZXQsIHJvb3RLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcm9vdEtleSwgeyB2YWx1ZTogSGFzaE1hcC5jcmVhdGUoKSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtyb290S2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIEZpbGxSYW5kb21CeXRlcyhidWZmZXIsIHNpemUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSlcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyW2ldID0gTWF0aC5yYW5kb20oKSAqIDB4ZmYgfCAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBHZW5SYW5kb21CeXRlcyhzaXplKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBVaW50OEFycmF5ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjcnlwdG8gIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbXNDcnlwdG8gIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KHNpemUpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZpbGxSYW5kb21CeXRlcyhuZXcgVWludDhBcnJheShzaXplKSwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBGaWxsUmFuZG9tQnl0ZXMobmV3IEFycmF5KHNpemUpLCBzaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIENyZWF0ZVVVSUQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBHZW5SYW5kb21CeXRlcyhVVUlEX1NJWkUpO1xuICAgICAgICAgICAgICAgIC8vIG1hcmsgYXMgcmFuZG9tIC0gUkZDIDQxMjIgwqcgNC40XG4gICAgICAgICAgICAgICAgZGF0YVs2XSA9IGRhdGFbNl0gJiAweDRmIHwgMHg0MDtcbiAgICAgICAgICAgICAgICBkYXRhWzhdID0gZGF0YVs4XSAmIDB4YmYgfCAweDgwO1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIG9mZnNldCA9IDA7IG9mZnNldCA8IFVVSURfU0laRTsgKytvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ5dGUgPSBkYXRhW29mZnNldF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPT09IDQgfHwgb2Zmc2V0ID09PSA2IHx8IG9mZnNldCA9PT0gOClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIi1cIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ5dGUgPCAxNilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIjBcIjtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGJ5dGUudG9TdHJpbmcoMTYpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXNlcyBhIGhldXJpc3RpYyB1c2VkIGJ5IHY4IGFuZCBjaGFrcmEgdG8gZm9yY2UgYW4gb2JqZWN0IGludG8gZGljdGlvbmFyeSBtb2RlLlxuICAgICAgICBmdW5jdGlvbiBNYWtlRGljdGlvbmFyeShvYmopIHtcbiAgICAgICAgICAgIG9iai5fXyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmouX187XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgfSk7XG59KShSZWZsZWN0IHx8IChSZWZsZWN0ID0ge30pKTtcbiIsImV4cG9ydCAqIGZyb20gJy4vRGlzcGF0Y2hlcic7XG4iLCJleHBvcnQgKiBmcm9tICcuL0FwcGxpY2F0aW9uJztcbiIsImV4cG9ydCAqIGZyb20gJy4vSHR0cFNlcnZpY2VQcm92aWRlcic7XG4iLCJpbXBvcnQgeyBTdHJlYW0gfSBmcm9tICcuL1N0cmVhbSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vQ3JpdGVyaWEnO1xuZXhwb3J0ICogZnJvbSAnLi9FbnRyeSc7XG5leHBvcnQgKiBmcm9tICcuL0VudHJ5Q29sbGVjdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL0ZpZWxkJztcbmV4cG9ydCAqIGZyb20gJy4vRmllbGRDb2xsZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vUmVwb3NpdG9yeSc7XG5leHBvcnQgKiBmcm9tICcuL1N0cmVhbSc7XG5leHBvcnQgKiBmcm9tICcuL1N0cmVhbXMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdHJlYW1zU2VydmljZVByb3ZpZGVyJztcblxuZXhwb3J0IGRlZmF1bHQgU3RyZWFtO1xuIiwiZXhwb3J0ICogZnJvbSAnLi9Db2xsZWN0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vU2VydmljZVByb3ZpZGVyJztcbiIsImV4cG9ydCAqIGZyb20gJy4vY29uZmlnJztcbmV4cG9ydCAqIGZyb20gJy4vc3RyZWFtcyc7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuXG4vLyBleHBvcnQgKiBmcm9tICcuL0NvbmZpZyc7XG5leHBvcnQgKiBmcm9tICcuL0Rpc3BhdGNoZXInO1xuZXhwb3J0ICogZnJvbSAnLi9Gb3VuZGF0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vSHR0cCc7XG5leHBvcnQgKiBmcm9tICcuL1N0cmVhbXMnO1xuZXhwb3J0ICogZnJvbSAnLi9TdXBwb3J0JztcbmV4cG9ydCAqIGZyb20gJy4vdHlwZXMnO1xuXG5cbmV4cG9ydCAqIGZyb20gJy4vZXhhbXBsZXMnO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppServiceProvider": () => (/* reexport safe */ _src_AppServiceProvider__WEBPACK_IMPORTED_MODULE_0__.AppServiceProvider),
/* harmony export */   "test": () => (/* binding */ test)
/* harmony export */ });
/* harmony import */ var _src_AppServiceProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/AppServiceProvider */ "./resources/js/src/AppServiceProvider.js");
/* harmony import */ var alpinejs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! alpinejs */ "./node_modules/alpinejs/dist/alpine.js");
/* harmony import */ var alpinejs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(alpinejs__WEBPACK_IMPORTED_MODULE_1__);





const test = true;



})();

window.app = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2pzL2FwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNTVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzd4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdHJlYW1zLmRldi8uL25vZGVfbW9kdWxlcy9hbHBpbmVqcy9kaXN0L2FscGluZS5qcyIsIndlYnBhY2s6Ly9zdHJlYW1zLmRldi8uL3Jlc291cmNlcy9qcy9zcmMvQXBwU2VydmljZVByb3ZpZGVyLmpzIiwid2VicGFjazovL3N0cmVhbXMuZGV2Ly4vdmVuZG9yL3N0cmVhbXMvY29yZS9yZXNvdXJjZXMvcHVibGljL2pzL2luZGV4LmpzIiwid2VicGFjazovL3N0cmVhbXMuZGV2L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3N0cmVhbXMuZGV2L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3N0cmVhbXMuZGV2L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdHJlYW1zLmRldi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3N0cmVhbXMuZGV2L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3RyZWFtcy5kZXYvLi9yZXNvdXJjZXMvanMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuQWxwaW5lID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIG93bktleXMob2JqZWN0LCBlbnVtZXJhYmxlT25seSkge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcblxuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTtcbiAgICAgIGlmIChlbnVtZXJhYmxlT25seSkgc3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBzeW0pLmVudW1lcmFibGU7XG4gICAgICB9KTtcbiAgICAgIGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5cztcbiAgfVxuXG4gIGZ1bmN0aW9uIF9vYmplY3RTcHJlYWQyKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcblxuICAgICAgaWYgKGkgJSAyKSB7XG4gICAgICAgIG93bktleXMoT2JqZWN0KHNvdXJjZSksIHRydWUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhzb3VyY2UpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG93bktleXMoT2JqZWN0KHNvdXJjZSkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgLy8gVGhhbmtzIEBzdGltdWx1czpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N0aW11bHVzanMvc3RpbXVsdXMvYmxvYi9tYXN0ZXIvcGFja2FnZXMvJTQwc3RpbXVsdXMvY29yZS9zcmMvYXBwbGljYXRpb24udHNcbiAgZnVuY3Rpb24gZG9tUmVhZHkoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gXCJsb2FkaW5nXCIpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgcmVzb2x2ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gYXJyYXlVbmlxdWUoYXJyYXkpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGFycmF5KSk7XG4gIH1cbiAgZnVuY3Rpb24gaXNUZXN0aW5nKCkge1xuICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwiTm9kZS5qc1wiKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKFwianNkb21cIik7XG4gIH1cbiAgZnVuY3Rpb24gY2hlY2tlZEF0dHJMb29zZUNvbXBhcmUodmFsdWVBLCB2YWx1ZUIpIHtcbiAgICByZXR1cm4gdmFsdWVBID09IHZhbHVlQjtcbiAgfVxuICBmdW5jdGlvbiB3YXJuSWZNYWxmb3JtZWRUZW1wbGF0ZShlbCwgZGlyZWN0aXZlKSB7XG4gICAgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ3RlbXBsYXRlJykge1xuICAgICAgY29uc29sZS53YXJuKGBBbHBpbmU6IFske2RpcmVjdGl2ZX1dIGRpcmVjdGl2ZSBzaG91bGQgb25seSBiZSBhZGRlZCB0byA8dGVtcGxhdGU+IHRhZ3MuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYWxwaW5lanMvYWxwaW5lIyR7ZGlyZWN0aXZlfWApO1xuICAgIH0gZWxzZSBpZiAoZWwuY29udGVudC5jaGlsZEVsZW1lbnRDb3VudCAhPT0gMSkge1xuICAgICAgY29uc29sZS53YXJuKGBBbHBpbmU6IDx0ZW1wbGF0ZT4gdGFnIHdpdGggWyR7ZGlyZWN0aXZlfV0gZW5jb3VudGVyZWQgd2l0aCBhbiB1bmV4cGVjdGVkIG51bWJlciBvZiByb290IGVsZW1lbnRzLiBNYWtlIHN1cmUgPHRlbXBsYXRlPiBoYXMgYSBzaW5nbGUgcm9vdCBlbGVtZW50LiBgKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24ga2ViYWJDYXNlKHN1YmplY3QpIHtcbiAgICByZXR1cm4gc3ViamVjdC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS5yZXBsYWNlKC9bX1xcc10vLCAnLScpLnRvTG93ZXJDYXNlKCk7XG4gIH1cbiAgZnVuY3Rpb24gY2FtZWxDYXNlKHN1YmplY3QpIHtcbiAgICByZXR1cm4gc3ViamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0oXFx3KS9nLCAobWF0Y2gsIGNoYXIpID0+IGNoYXIudG9VcHBlckNhc2UoKSk7XG4gIH1cbiAgZnVuY3Rpb24gd2FsayhlbCwgY2FsbGJhY2spIHtcbiAgICBpZiAoY2FsbGJhY2soZWwpID09PSBmYWxzZSkgcmV0dXJuO1xuICAgIGxldCBub2RlID0gZWwuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICB3aGlsZSAobm9kZSkge1xuICAgICAgd2Fsayhub2RlLCBjYWxsYmFjayk7XG4gICAgICBub2RlID0gbm9kZS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcbiAgICB2YXIgdGltZW91dDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLFxuICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uIGxhdGVyKCkge1xuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIH07XG5cbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgaGFuZGxlRXJyb3IgPSAoZWwsIGV4cHJlc3Npb24sIGVycm9yKSA9PiB7XG4gICAgY29uc29sZS53YXJuKGBBbHBpbmUgRXJyb3I6IFwiJHtlcnJvcn1cIlxcblxcbkV4cHJlc3Npb246IFwiJHtleHByZXNzaW9ufVwiXFxuRWxlbWVudDpgLCBlbCk7XG5cbiAgICBpZiAoIWlzVGVzdGluZygpKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGVycm9yLCB7XG4gICAgICAgIGVsLFxuICAgICAgICBleHByZXNzaW9uXG4gICAgICB9KTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiB0cnlDYXRjaChjYiwge1xuICAgIGVsLFxuICAgIGV4cHJlc3Npb25cbiAgfSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNiKCk7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlID8gdmFsdWUuY2F0Y2goZSA9PiBoYW5kbGVFcnJvcihlbCwgZXhwcmVzc2lvbiwgZSkpIDogdmFsdWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaGFuZGxlRXJyb3IoZWwsIGV4cHJlc3Npb24sIGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNhZmVyRXZhbChlbCwgZXhwcmVzc2lvbiwgZGF0YUNvbnRleHQsIGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXMgPSB7fSkge1xuICAgIHJldHVybiB0cnlDYXRjaCgoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGV4cHJlc3Npb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGV4cHJlc3Npb24uY2FsbChkYXRhQ29udGV4dCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oWyckZGF0YScsIC4uLk9iamVjdC5rZXlzKGFkZGl0aW9uYWxIZWxwZXJWYXJpYWJsZXMpXSwgYHZhciBfX2FscGluZV9yZXN1bHQ7IHdpdGgoJGRhdGEpIHsgX19hbHBpbmVfcmVzdWx0ID0gJHtleHByZXNzaW9ufSB9OyByZXR1cm4gX19hbHBpbmVfcmVzdWx0YCkoZGF0YUNvbnRleHQsIC4uLk9iamVjdC52YWx1ZXMoYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlcykpO1xuICAgIH0sIHtcbiAgICAgIGVsLFxuICAgICAgZXhwcmVzc2lvblxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHNhZmVyRXZhbE5vUmV0dXJuKGVsLCBleHByZXNzaW9uLCBkYXRhQ29udGV4dCwgYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlcyA9IHt9KSB7XG4gICAgcmV0dXJuIHRyeUNhdGNoKCgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGV4cHJlc3Npb24uY2FsbChkYXRhQ29udGV4dCwgYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlc1snJGV2ZW50J10pKTtcbiAgICAgIH1cblxuICAgICAgbGV0IEFzeW5jRnVuY3Rpb24gPSBGdW5jdGlvbjtcbiAgICAgIC8qIE1PREVSTi1PTkxZOlNUQVJUICovXG5cbiAgICAgIEFzeW5jRnVuY3Rpb24gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYXN5bmMgZnVuY3Rpb24gKCkge30pLmNvbnN0cnVjdG9yO1xuICAgICAgLyogTU9ERVJOLU9OTFk6RU5EICovXG4gICAgICAvLyBGb3IgdGhlIGNhc2VzIHdoZW4gdXNlcnMgcGFzcyBvbmx5IGEgZnVuY3Rpb24gcmVmZXJlbmNlIHRvIHRoZSBjYWxsZXI6IGB4LW9uOmNsaWNrPVwiZm9vXCJgXG4gICAgICAvLyBXaGVyZSBcImZvb1wiIGlzIGEgZnVuY3Rpb24uIEFsc28sIHdlJ2xsIHBhc3MgdGhlIGZ1bmN0aW9uIHRoZSBldmVudCBpbnN0YW5jZSB3aGVuIHdlIGNhbGwgaXQuXG5cbiAgICAgIGlmIChPYmplY3Qua2V5cyhkYXRhQ29udGV4dCkuaW5jbHVkZXMoZXhwcmVzc2lvbikpIHtcbiAgICAgICAgbGV0IG1ldGhvZFJlZmVyZW5jZSA9IG5ldyBGdW5jdGlvbihbJ2RhdGFDb250ZXh0JywgLi4uT2JqZWN0LmtleXMoYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlcyldLCBgd2l0aChkYXRhQ29udGV4dCkgeyByZXR1cm4gJHtleHByZXNzaW9ufSB9YCkoZGF0YUNvbnRleHQsIC4uLk9iamVjdC52YWx1ZXMoYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlcykpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgbWV0aG9kUmVmZXJlbmNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtZXRob2RSZWZlcmVuY2UuY2FsbChkYXRhQ29udGV4dCwgYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlc1snJGV2ZW50J10pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQXN5bmNGdW5jdGlvbihbJ2RhdGFDb250ZXh0JywgLi4uT2JqZWN0LmtleXMoYWRkaXRpb25hbEhlbHBlclZhcmlhYmxlcyldLCBgd2l0aChkYXRhQ29udGV4dCkgeyAke2V4cHJlc3Npb259IH1gKShkYXRhQ29udGV4dCwgLi4uT2JqZWN0LnZhbHVlcyhhZGRpdGlvbmFsSGVscGVyVmFyaWFibGVzKSkpO1xuICAgIH0sIHtcbiAgICAgIGVsLFxuICAgICAgZXhwcmVzc2lvblxuICAgIH0pO1xuICB9XG4gIGNvbnN0IHhBdHRyUkUgPSAvXngtKG9ufGJpbmR8ZGF0YXx0ZXh0fGh0bWx8bW9kZWx8aWZ8Zm9yfHNob3d8Y2xvYWt8dHJhbnNpdGlvbnxyZWZ8c3ByZWFkKVxcYi87XG4gIGZ1bmN0aW9uIGlzWEF0dHIoYXR0cikge1xuICAgIGNvbnN0IG5hbWUgPSByZXBsYWNlQXRBbmRDb2xvbldpdGhTdGFuZGFyZFN5bnRheChhdHRyLm5hbWUpO1xuICAgIHJldHVybiB4QXR0clJFLnRlc3QobmFtZSk7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0WEF0dHJzKGVsLCBjb21wb25lbnQsIHR5cGUpIHtcbiAgICBsZXQgZGlyZWN0aXZlcyA9IEFycmF5LmZyb20oZWwuYXR0cmlidXRlcykuZmlsdGVyKGlzWEF0dHIpLm1hcChwYXJzZUh0bWxBdHRyaWJ1dGUpOyAvLyBHZXQgYW4gb2JqZWN0IG9mIGRpcmVjdGl2ZXMgZnJvbSB4LXNwcmVhZC5cblxuICAgIGxldCBzcHJlYWREaXJlY3RpdmUgPSBkaXJlY3RpdmVzLmZpbHRlcihkaXJlY3RpdmUgPT4gZGlyZWN0aXZlLnR5cGUgPT09ICdzcHJlYWQnKVswXTtcblxuICAgIGlmIChzcHJlYWREaXJlY3RpdmUpIHtcbiAgICAgIGxldCBzcHJlYWRPYmplY3QgPSBzYWZlckV2YWwoZWwsIHNwcmVhZERpcmVjdGl2ZS5leHByZXNzaW9uLCBjb21wb25lbnQuJGRhdGEpOyAvLyBBZGQgeC1zcHJlYWQgZGlyZWN0aXZlcyB0byB0aGUgcGlsZSBvZiBleGlzdGluZyBkaXJlY3RpdmVzLlxuXG4gICAgICBkaXJlY3RpdmVzID0gZGlyZWN0aXZlcy5jb25jYXQoT2JqZWN0LmVudHJpZXMoc3ByZWFkT2JqZWN0KS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+IHBhcnNlSHRtbEF0dHJpYnV0ZSh7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIHZhbHVlXG4gICAgICB9KSkpO1xuICAgIH1cblxuICAgIGlmICh0eXBlKSByZXR1cm4gZGlyZWN0aXZlcy5maWx0ZXIoaSA9PiBpLnR5cGUgPT09IHR5cGUpO1xuICAgIHJldHVybiBzb3J0RGlyZWN0aXZlcyhkaXJlY3RpdmVzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNvcnREaXJlY3RpdmVzKGRpcmVjdGl2ZXMpIHtcbiAgICBsZXQgZGlyZWN0aXZlT3JkZXIgPSBbJ2JpbmQnLCAnbW9kZWwnLCAnc2hvdycsICdjYXRjaC1hbGwnXTtcbiAgICByZXR1cm4gZGlyZWN0aXZlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBsZXQgdHlwZUEgPSBkaXJlY3RpdmVPcmRlci5pbmRleE9mKGEudHlwZSkgPT09IC0xID8gJ2NhdGNoLWFsbCcgOiBhLnR5cGU7XG4gICAgICBsZXQgdHlwZUIgPSBkaXJlY3RpdmVPcmRlci5pbmRleE9mKGIudHlwZSkgPT09IC0xID8gJ2NhdGNoLWFsbCcgOiBiLnR5cGU7XG4gICAgICByZXR1cm4gZGlyZWN0aXZlT3JkZXIuaW5kZXhPZih0eXBlQSkgLSBkaXJlY3RpdmVPcmRlci5pbmRleE9mKHR5cGVCKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSHRtbEF0dHJpYnV0ZSh7XG4gICAgbmFtZSxcbiAgICB2YWx1ZVxuICB9KSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZE5hbWUgPSByZXBsYWNlQXRBbmRDb2xvbldpdGhTdGFuZGFyZFN5bnRheChuYW1lKTtcbiAgICBjb25zdCB0eXBlTWF0Y2ggPSBub3JtYWxpemVkTmFtZS5tYXRjaCh4QXR0clJFKTtcbiAgICBjb25zdCB2YWx1ZU1hdGNoID0gbm9ybWFsaXplZE5hbWUubWF0Y2goLzooW2EtekEtWjAtOVxcLTpdKykvKTtcbiAgICBjb25zdCBtb2RpZmllcnMgPSBub3JtYWxpemVkTmFtZS5tYXRjaCgvXFwuW14uXFxdXSsoPz1bXlxcXV0qJCkvZykgfHwgW107XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IHR5cGVNYXRjaCA/IHR5cGVNYXRjaFsxXSA6IG51bGwsXG4gICAgICB2YWx1ZTogdmFsdWVNYXRjaCA/IHZhbHVlTWF0Y2hbMV0gOiBudWxsLFxuICAgICAgbW9kaWZpZXJzOiBtb2RpZmllcnMubWFwKGkgPT4gaS5yZXBsYWNlKCcuJywgJycpKSxcbiAgICAgIGV4cHJlc3Npb246IHZhbHVlXG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBpc0Jvb2xlYW5BdHRyKGF0dHJOYW1lKSB7XG4gICAgLy8gQXMgcGVyIEhUTUwgc3BlYyB0YWJsZSBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmRpY2VzLmh0bWwjYXR0cmlidXRlcy0zOmJvb2xlYW4tYXR0cmlidXRlXG4gICAgLy8gQXJyYXkgcm91Z2hseSBvcmRlcmVkIGJ5IGVzdGltYXRlZCB1c2FnZVxuICAgIGNvbnN0IGJvb2xlYW5BdHRyaWJ1dGVzID0gWydkaXNhYmxlZCcsICdjaGVja2VkJywgJ3JlcXVpcmVkJywgJ3JlYWRvbmx5JywgJ2hpZGRlbicsICdvcGVuJywgJ3NlbGVjdGVkJywgJ2F1dG9mb2N1cycsICdpdGVtc2NvcGUnLCAnbXVsdGlwbGUnLCAnbm92YWxpZGF0ZScsICdhbGxvd2Z1bGxzY3JlZW4nLCAnYWxsb3dwYXltZW50cmVxdWVzdCcsICdmb3Jtbm92YWxpZGF0ZScsICdhdXRvcGxheScsICdjb250cm9scycsICdsb29wJywgJ211dGVkJywgJ3BsYXlzaW5saW5lJywgJ2RlZmF1bHQnLCAnaXNtYXAnLCAncmV2ZXJzZWQnLCAnYXN5bmMnLCAnZGVmZXInLCAnbm9tb2R1bGUnXTtcbiAgICByZXR1cm4gYm9vbGVhbkF0dHJpYnV0ZXMuaW5jbHVkZXMoYXR0ck5hbWUpO1xuICB9XG4gIGZ1bmN0aW9uIHJlcGxhY2VBdEFuZENvbG9uV2l0aFN0YW5kYXJkU3ludGF4KG5hbWUpIHtcbiAgICBpZiAobmFtZS5zdGFydHNXaXRoKCdAJykpIHtcbiAgICAgIHJldHVybiBuYW1lLnJlcGxhY2UoJ0AnLCAneC1vbjonKTtcbiAgICB9IGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnOicpKSB7XG4gICAgICByZXR1cm4gbmFtZS5yZXBsYWNlKCc6JywgJ3gtYmluZDonKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuICBmdW5jdGlvbiBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGNsYXNzTGlzdCwgZmlsdGVyRm4gPSBCb29sZWFuKSB7XG4gICAgcmV0dXJuIGNsYXNzTGlzdC5zcGxpdCgnICcpLmZpbHRlcihmaWx0ZXJGbik7XG4gIH1cbiAgY29uc3QgVFJBTlNJVElPTl9UWVBFX0lOID0gJ2luJztcbiAgY29uc3QgVFJBTlNJVElPTl9UWVBFX09VVCA9ICdvdXQnO1xuICBjb25zdCBUUkFOU0lUSU9OX0NBTkNFTExFRCA9ICdjYW5jZWxsZWQnO1xuICBmdW5jdGlvbiB0cmFuc2l0aW9uSW4oZWwsIHNob3csIHJlamVjdCwgY29tcG9uZW50LCBmb3JjZVNraXAgPSBmYWxzZSkge1xuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gdHJhbnNpdGlvbiBvbiB0aGUgaW5pdGlhbCBwYWdlIGxvYWQuXG4gICAgaWYgKGZvcmNlU2tpcCkgcmV0dXJuIHNob3coKTtcblxuICAgIGlmIChlbC5fX3hfdHJhbnNpdGlvbiAmJiBlbC5fX3hfdHJhbnNpdGlvbi50eXBlID09PSBUUkFOU0lUSU9OX1RZUEVfSU4pIHtcbiAgICAgIC8vIHRoZXJlIGlzIGFscmVhZHkgYSBzaW1pbGFyIHRyYW5zaXRpb24gZ29pbmcgb24sIHRoaXMgd2FzIHByb2JhYmx5IHRyaWdnZXJlZCBieVxuICAgICAgLy8gYSBjaGFuZ2UgaW4gYSBkaWZmZXJlbnQgcHJvcGVydHksIGxldCdzIGp1c3QgbGVhdmUgdGhlIHByZXZpb3VzIG9uZSBkb2luZyBpdHMgam9iXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXR0cnMgPSBnZXRYQXR0cnMoZWwsIGNvbXBvbmVudCwgJ3RyYW5zaXRpb24nKTtcbiAgICBjb25zdCBzaG93QXR0ciA9IGdldFhBdHRycyhlbCwgY29tcG9uZW50LCAnc2hvdycpWzBdOyAvLyBJZiB0aGlzIGlzIHRyaWdnZXJlZCBieSBhIHgtc2hvdy50cmFuc2l0aW9uLlxuXG4gICAgaWYgKHNob3dBdHRyICYmIHNob3dBdHRyLm1vZGlmaWVycy5pbmNsdWRlcygndHJhbnNpdGlvbicpKSB7XG4gICAgICBsZXQgbW9kaWZpZXJzID0gc2hvd0F0dHIubW9kaWZpZXJzOyAvLyBJZiB4LXNob3cudHJhbnNpdGlvbi5vdXQsIHdlJ2xsIHNraXAgdGhlIFwiaW5cIiB0cmFuc2l0aW9uLlxuXG4gICAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKCdvdXQnKSAmJiAhbW9kaWZpZXJzLmluY2x1ZGVzKCdpbicpKSByZXR1cm4gc2hvdygpO1xuICAgICAgY29uc3Qgc2V0dGluZ0JvdGhTaWRlc09mVHJhbnNpdGlvbiA9IG1vZGlmaWVycy5pbmNsdWRlcygnaW4nKSAmJiBtb2RpZmllcnMuaW5jbHVkZXMoJ291dCcpOyAvLyBJZiB4LXNob3cudHJhbnNpdGlvbi5pbi4uLm91dC4uLiBvbmx5IHVzZSBcImluXCIgcmVsYXRlZCBtb2RpZmllcnMgZm9yIHRoaXMgdHJhbnNpdGlvbi5cblxuICAgICAgbW9kaWZpZXJzID0gc2V0dGluZ0JvdGhTaWRlc09mVHJhbnNpdGlvbiA/IG1vZGlmaWVycy5maWx0ZXIoKGksIGluZGV4KSA9PiBpbmRleCA8IG1vZGlmaWVycy5pbmRleE9mKCdvdXQnKSkgOiBtb2RpZmllcnM7XG4gICAgICB0cmFuc2l0aW9uSGVscGVySW4oZWwsIG1vZGlmaWVycywgc2hvdywgcmVqZWN0KTsgLy8gT3RoZXJ3aXNlLCB3ZSBjYW4gYXNzdW1lIHgtdHJhbnNpdGlvbjplbnRlci5cbiAgICB9IGVsc2UgaWYgKGF0dHJzLnNvbWUoYXR0ciA9PiBbJ2VudGVyJywgJ2VudGVyLXN0YXJ0JywgJ2VudGVyLWVuZCddLmluY2x1ZGVzKGF0dHIudmFsdWUpKSkge1xuICAgICAgdHJhbnNpdGlvbkNsYXNzZXNJbihlbCwgY29tcG9uZW50LCBhdHRycywgc2hvdywgcmVqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgbmVpdGhlciwganVzdCBzaG93IHRoYXQgZGFtbiB0aGluZy5cbiAgICAgIHNob3coKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbk91dChlbCwgaGlkZSwgcmVqZWN0LCBjb21wb25lbnQsIGZvcmNlU2tpcCA9IGZhbHNlKSB7XG4gICAgLy8gV2UgZG9uJ3Qgd2FudCB0byB0cmFuc2l0aW9uIG9uIHRoZSBpbml0aWFsIHBhZ2UgbG9hZC5cbiAgICBpZiAoZm9yY2VTa2lwKSByZXR1cm4gaGlkZSgpO1xuXG4gICAgaWYgKGVsLl9feF90cmFuc2l0aW9uICYmIGVsLl9feF90cmFuc2l0aW9uLnR5cGUgPT09IFRSQU5TSVRJT05fVFlQRV9PVVQpIHtcbiAgICAgIC8vIHRoZXJlIGlzIGFscmVhZHkgYSBzaW1pbGFyIHRyYW5zaXRpb24gZ29pbmcgb24sIHRoaXMgd2FzIHByb2JhYmx5IHRyaWdnZXJlZCBieVxuICAgICAgLy8gYSBjaGFuZ2UgaW4gYSBkaWZmZXJlbnQgcHJvcGVydHksIGxldCdzIGp1c3QgbGVhdmUgdGhlIHByZXZpb3VzIG9uZSBkb2luZyBpdHMgam9iXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXR0cnMgPSBnZXRYQXR0cnMoZWwsIGNvbXBvbmVudCwgJ3RyYW5zaXRpb24nKTtcbiAgICBjb25zdCBzaG93QXR0ciA9IGdldFhBdHRycyhlbCwgY29tcG9uZW50LCAnc2hvdycpWzBdO1xuXG4gICAgaWYgKHNob3dBdHRyICYmIHNob3dBdHRyLm1vZGlmaWVycy5pbmNsdWRlcygndHJhbnNpdGlvbicpKSB7XG4gICAgICBsZXQgbW9kaWZpZXJzID0gc2hvd0F0dHIubW9kaWZpZXJzO1xuICAgICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcygnaW4nKSAmJiAhbW9kaWZpZXJzLmluY2x1ZGVzKCdvdXQnKSkgcmV0dXJuIGhpZGUoKTtcbiAgICAgIGNvbnN0IHNldHRpbmdCb3RoU2lkZXNPZlRyYW5zaXRpb24gPSBtb2RpZmllcnMuaW5jbHVkZXMoJ2luJykgJiYgbW9kaWZpZXJzLmluY2x1ZGVzKCdvdXQnKTtcbiAgICAgIG1vZGlmaWVycyA9IHNldHRpbmdCb3RoU2lkZXNPZlRyYW5zaXRpb24gPyBtb2RpZmllcnMuZmlsdGVyKChpLCBpbmRleCkgPT4gaW5kZXggPiBtb2RpZmllcnMuaW5kZXhPZignb3V0JykpIDogbW9kaWZpZXJzO1xuICAgICAgdHJhbnNpdGlvbkhlbHBlck91dChlbCwgbW9kaWZpZXJzLCBzZXR0aW5nQm90aFNpZGVzT2ZUcmFuc2l0aW9uLCBoaWRlLCByZWplY3QpO1xuICAgIH0gZWxzZSBpZiAoYXR0cnMuc29tZShhdHRyID0+IFsnbGVhdmUnLCAnbGVhdmUtc3RhcnQnLCAnbGVhdmUtZW5kJ10uaW5jbHVkZXMoYXR0ci52YWx1ZSkpKSB7XG4gICAgICB0cmFuc2l0aW9uQ2xhc3Nlc091dChlbCwgY29tcG9uZW50LCBhdHRycywgaGlkZSwgcmVqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZSgpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiB0cmFuc2l0aW9uSGVscGVySW4oZWwsIG1vZGlmaWVycywgc2hvd0NhbGxiYWNrLCByZWplY3QpIHtcbiAgICAvLyBEZWZhdWx0IHZhbHVlcyBpbnNwaXJlZCBieTogaHR0cHM6Ly9tYXRlcmlhbC5pby9kZXNpZ24vbW90aW9uL3NwZWVkLmh0bWwjZHVyYXRpb25cbiAgICBjb25zdCBzdHlsZVZhbHVlcyA9IHtcbiAgICAgIGR1cmF0aW9uOiBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgJ2R1cmF0aW9uJywgMTUwKSxcbiAgICAgIG9yaWdpbjogbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsICdvcmlnaW4nLCAnY2VudGVyJyksXG4gICAgICBmaXJzdDoge1xuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBzY2FsZTogbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsICdzY2FsZScsIDk1KVxuICAgICAgfSxcbiAgICAgIHNlY29uZDoge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBzY2FsZTogMTAwXG4gICAgICB9XG4gICAgfTtcbiAgICB0cmFuc2l0aW9uSGVscGVyKGVsLCBtb2RpZmllcnMsIHNob3dDYWxsYmFjaywgKCkgPT4ge30sIHJlamVjdCwgc3R5bGVWYWx1ZXMsIFRSQU5TSVRJT05fVFlQRV9JTik7XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkhlbHBlck91dChlbCwgbW9kaWZpZXJzLCBzZXR0aW5nQm90aFNpZGVzT2ZUcmFuc2l0aW9uLCBoaWRlQ2FsbGJhY2ssIHJlamVjdCkge1xuICAgIC8vIE1ha2UgdGhlIFwib3V0XCIgdHJhbnNpdGlvbiAuNXggc2xvd2VyIHRoYW4gdGhlIFwiaW5cIi4gKFZpc3VhbGx5IGJldHRlcilcbiAgICAvLyBIT1dFVkVSLCBpZiB0aGV5IGV4cGxpY2l0bHkgc2V0IGEgZHVyYXRpb24gZm9yIHRoZSBcIm91dFwiIHRyYW5zaXRpb24sXG4gICAgLy8gdXNlIHRoYXQuXG4gICAgY29uc3QgZHVyYXRpb24gPSBzZXR0aW5nQm90aFNpZGVzT2ZUcmFuc2l0aW9uID8gbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsICdkdXJhdGlvbicsIDE1MCkgOiBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgJ2R1cmF0aW9uJywgMTUwKSAvIDI7XG4gICAgY29uc3Qgc3R5bGVWYWx1ZXMgPSB7XG4gICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICBvcmlnaW46IG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCAnb3JpZ2luJywgJ2NlbnRlcicpLFxuICAgICAgZmlyc3Q6IHtcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgc2NhbGU6IDEwMFxuICAgICAgfSxcbiAgICAgIHNlY29uZDoge1xuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBzY2FsZTogbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsICdzY2FsZScsIDk1KVxuICAgICAgfVxuICAgIH07XG4gICAgdHJhbnNpdGlvbkhlbHBlcihlbCwgbW9kaWZpZXJzLCAoKSA9PiB7fSwgaGlkZUNhbGxiYWNrLCByZWplY3QsIHN0eWxlVmFsdWVzLCBUUkFOU0lUSU9OX1RZUEVfT1VUKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vZGlmaWVyVmFsdWUobW9kaWZpZXJzLCBrZXksIGZhbGxiYWNrKSB7XG4gICAgLy8gSWYgdGhlIG1vZGlmaWVyIGlzbid0IHByZXNlbnQsIHVzZSB0aGUgZGVmYXVsdC5cbiAgICBpZiAobW9kaWZpZXJzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHJldHVybiBmYWxsYmFjazsgLy8gSWYgaXQgSVMgcHJlc2VudCwgZ3JhYiB0aGUgdmFsdWUgYWZ0ZXIgaXQ6IHgtc2hvdy50cmFuc2l0aW9uLmR1cmF0aW9uLjUwMG1zXG5cbiAgICBjb25zdCByYXdWYWx1ZSA9IG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZihrZXkpICsgMV07XG4gICAgaWYgKCFyYXdWYWx1ZSkgcmV0dXJuIGZhbGxiYWNrO1xuXG4gICAgaWYgKGtleSA9PT0gJ3NjYWxlJykge1xuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZlcnkgbmV4dCB2YWx1ZSBpcyBOT1QgYSBudW1iZXIgYW5kIHJldHVybiB0aGUgZmFsbGJhY2suXG4gICAgICAvLyBJZiB4LXNob3cudHJhbnNpdGlvbi5zY2FsZSwgd2UnbGwgdXNlIHRoZSBkZWZhdWx0IHNjYWxlIHZhbHVlLlxuICAgICAgLy8gVGhhdCBpcyBob3cgYSB1c2VyIG9wdHMgb3V0IG9mIHRoZSBvcGFjaXR5IHRyYW5zaXRpb24uXG4gICAgICBpZiAoIWlzTnVtZXJpYyhyYXdWYWx1ZSkpIHJldHVybiBmYWxsYmFjaztcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09PSAnZHVyYXRpb24nKSB7XG4gICAgICAvLyBTdXBwb3J0IHgtc2hvdy50cmFuc2l0aW9uLmR1cmF0aW9uLjUwMG1zICYmIGR1cmF0aW9uLjUwMFxuICAgICAgbGV0IG1hdGNoID0gcmF3VmFsdWUubWF0Y2goLyhbMC05XSspbXMvKTtcbiAgICAgIGlmIChtYXRjaCkgcmV0dXJuIG1hdGNoWzFdO1xuICAgIH1cblxuICAgIGlmIChrZXkgPT09ICdvcmlnaW4nKSB7XG4gICAgICAvLyBTdXBwb3J0IGNoYWluaW5nIG9yaWdpbiBkaXJlY3Rpb25zOiB4LXNob3cudHJhbnNpdGlvbi50b3AucmlnaHRcbiAgICAgIGlmIChbJ3RvcCcsICdyaWdodCcsICdsZWZ0JywgJ2NlbnRlcicsICdib3R0b20nXS5pbmNsdWRlcyhtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2Yoa2V5KSArIDJdKSkge1xuICAgICAgICByZXR1cm4gW3Jhd1ZhbHVlLCBtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2Yoa2V5KSArIDJdXS5qb2luKCcgJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhd1ZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkhlbHBlcihlbCwgbW9kaWZpZXJzLCBob29rMSwgaG9vazIsIHJlamVjdCwgc3R5bGVWYWx1ZXMsIHR5cGUpIHtcbiAgICAvLyBjbGVhciB0aGUgcHJldmlvdXMgdHJhbnNpdGlvbiBpZiBleGlzdHMgdG8gYXZvaWQgY2FjaGluZyB0aGUgd3Jvbmcgc3R5bGVzXG4gICAgaWYgKGVsLl9feF90cmFuc2l0aW9uKSB7XG4gICAgICBlbC5fX3hfdHJhbnNpdGlvbi5jYW5jZWwgJiYgZWwuX194X3RyYW5zaXRpb24uY2FuY2VsKCk7XG4gICAgfSAvLyBJZiB0aGUgdXNlciBzZXQgdGhlc2Ugc3R5bGUgdmFsdWVzLCB3ZSdsbCBwdXQgdGhlbSBiYWNrIHdoZW4gd2UncmUgZG9uZSB3aXRoIHRoZW0uXG5cblxuICAgIGNvbnN0IG9wYWNpdHlDYWNoZSA9IGVsLnN0eWxlLm9wYWNpdHk7XG4gICAgY29uc3QgdHJhbnNmb3JtQ2FjaGUgPSBlbC5zdHlsZS50cmFuc2Zvcm07XG4gICAgY29uc3QgdHJhbnNmb3JtT3JpZ2luQ2FjaGUgPSBlbC5zdHlsZS50cmFuc2Zvcm1PcmlnaW47IC8vIElmIG5vIG1vZGlmaWVycyBhcmUgcHJlc2VudDogeC1zaG93LnRyYW5zaXRpb24sIHdlJ2xsIGRlZmF1bHQgdG8gYm90aCBvcGFjaXR5IGFuZCBzY2FsZS5cblxuICAgIGNvbnN0IG5vTW9kaWZpZXJzID0gIW1vZGlmaWVycy5pbmNsdWRlcygnb3BhY2l0eScpICYmICFtb2RpZmllcnMuaW5jbHVkZXMoJ3NjYWxlJyk7XG4gICAgY29uc3QgdHJhbnNpdGlvbk9wYWNpdHkgPSBub01vZGlmaWVycyB8fCBtb2RpZmllcnMuaW5jbHVkZXMoJ29wYWNpdHknKTtcbiAgICBjb25zdCB0cmFuc2l0aW9uU2NhbGUgPSBub01vZGlmaWVycyB8fCBtb2RpZmllcnMuaW5jbHVkZXMoJ3NjYWxlJyk7IC8vIFRoZXNlIGFyZSB0aGUgZXhwbGljaXQgc3RhZ2VzIG9mIGEgdHJhbnNpdGlvbiAoc2FtZSBzdGFnZXMgZm9yIGluIGFuZCBmb3Igb3V0KS5cbiAgICAvLyBUaGlzIHdheSB5b3UgY2FuIGdldCBhIGJpcmRzIGV5ZSB2aWV3IG9mIHRoZSBob29rcywgYW5kIHRoZSBkaWZmZXJlbmNlc1xuICAgIC8vIGJldHdlZW4gdGhlbS5cblxuICAgIGNvbnN0IHN0YWdlcyA9IHtcbiAgICAgIHN0YXJ0KCkge1xuICAgICAgICBpZiAodHJhbnNpdGlvbk9wYWNpdHkpIGVsLnN0eWxlLm9wYWNpdHkgPSBzdHlsZVZhbHVlcy5maXJzdC5vcGFjaXR5O1xuICAgICAgICBpZiAodHJhbnNpdGlvblNjYWxlKSBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHtzdHlsZVZhbHVlcy5maXJzdC5zY2FsZSAvIDEwMH0pYDtcbiAgICAgIH0sXG5cbiAgICAgIGR1cmluZygpIHtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25TY2FsZSkgZWwuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gc3R5bGVWYWx1ZXMub3JpZ2luO1xuICAgICAgICBlbC5zdHlsZS50cmFuc2l0aW9uUHJvcGVydHkgPSBbdHJhbnNpdGlvbk9wYWNpdHkgPyBgb3BhY2l0eWAgOiBgYCwgdHJhbnNpdGlvblNjYWxlID8gYHRyYW5zZm9ybWAgOiBgYF0uam9pbignICcpLnRyaW0oKTtcbiAgICAgICAgZWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7c3R5bGVWYWx1ZXMuZHVyYXRpb24gLyAxMDAwfXNgO1xuICAgICAgICBlbC5zdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb24gPSBgY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpYDtcbiAgICAgIH0sXG5cbiAgICAgIHNob3coKSB7XG4gICAgICAgIGhvb2sxKCk7XG4gICAgICB9LFxuXG4gICAgICBlbmQoKSB7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uT3BhY2l0eSkgZWwuc3R5bGUub3BhY2l0eSA9IHN0eWxlVmFsdWVzLnNlY29uZC5vcGFjaXR5O1xuICAgICAgICBpZiAodHJhbnNpdGlvblNjYWxlKSBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHtzdHlsZVZhbHVlcy5zZWNvbmQuc2NhbGUgLyAxMDB9KWA7XG4gICAgICB9LFxuXG4gICAgICBoaWRlKCkge1xuICAgICAgICBob29rMigpO1xuICAgICAgfSxcblxuICAgICAgY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25PcGFjaXR5KSBlbC5zdHlsZS5vcGFjaXR5ID0gb3BhY2l0eUNhY2hlO1xuICAgICAgICBpZiAodHJhbnNpdGlvblNjYWxlKSBlbC5zdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1DYWNoZTtcbiAgICAgICAgaWYgKHRyYW5zaXRpb25TY2FsZSkgZWwuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gdHJhbnNmb3JtT3JpZ2luQ2FjaGU7XG4gICAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSA9IG51bGw7XG4gICAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IG51bGw7XG4gICAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb25UaW1pbmdGdW5jdGlvbiA9IG51bGw7XG4gICAgICB9XG5cbiAgICB9O1xuICAgIHRyYW5zaXRpb24oZWwsIHN0YWdlcywgdHlwZSwgcmVqZWN0KTtcbiAgfVxuXG4gIGNvbnN0IGVuc3VyZVN0cmluZ0V4cHJlc3Npb24gPSAoZXhwcmVzc2lvbiwgZWwsIGNvbXBvbmVudCkgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ2Z1bmN0aW9uJyA/IGNvbXBvbmVudC5ldmFsdWF0ZVJldHVybkV4cHJlc3Npb24oZWwsIGV4cHJlc3Npb24pIDogZXhwcmVzc2lvbjtcbiAgfTtcblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uQ2xhc3Nlc0luKGVsLCBjb21wb25lbnQsIGRpcmVjdGl2ZXMsIHNob3dDYWxsYmFjaywgcmVqZWN0KSB7XG4gICAgY29uc3QgZW50ZXIgPSBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGVuc3VyZVN0cmluZ0V4cHJlc3Npb24oKGRpcmVjdGl2ZXMuZmluZChpID0+IGkudmFsdWUgPT09ICdlbnRlcicpIHx8IHtcbiAgICAgIGV4cHJlc3Npb246ICcnXG4gICAgfSkuZXhwcmVzc2lvbiwgZWwsIGNvbXBvbmVudCkpO1xuICAgIGNvbnN0IGVudGVyU3RhcnQgPSBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGVuc3VyZVN0cmluZ0V4cHJlc3Npb24oKGRpcmVjdGl2ZXMuZmluZChpID0+IGkudmFsdWUgPT09ICdlbnRlci1zdGFydCcpIHx8IHtcbiAgICAgIGV4cHJlc3Npb246ICcnXG4gICAgfSkuZXhwcmVzc2lvbiwgZWwsIGNvbXBvbmVudCkpO1xuICAgIGNvbnN0IGVudGVyRW5kID0gY29udmVydENsYXNzU3RyaW5nVG9BcnJheShlbnN1cmVTdHJpbmdFeHByZXNzaW9uKChkaXJlY3RpdmVzLmZpbmQoaSA9PiBpLnZhbHVlID09PSAnZW50ZXItZW5kJykgfHwge1xuICAgICAgZXhwcmVzc2lvbjogJydcbiAgICB9KS5leHByZXNzaW9uLCBlbCwgY29tcG9uZW50KSk7XG4gICAgdHJhbnNpdGlvbkNsYXNzZXMoZWwsIGVudGVyLCBlbnRlclN0YXJ0LCBlbnRlckVuZCwgc2hvd0NhbGxiYWNrLCAoKSA9PiB7fSwgVFJBTlNJVElPTl9UWVBFX0lOLCByZWplY3QpO1xuICB9XG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25DbGFzc2VzT3V0KGVsLCBjb21wb25lbnQsIGRpcmVjdGl2ZXMsIGhpZGVDYWxsYmFjaywgcmVqZWN0KSB7XG4gICAgY29uc3QgbGVhdmUgPSBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGVuc3VyZVN0cmluZ0V4cHJlc3Npb24oKGRpcmVjdGl2ZXMuZmluZChpID0+IGkudmFsdWUgPT09ICdsZWF2ZScpIHx8IHtcbiAgICAgIGV4cHJlc3Npb246ICcnXG4gICAgfSkuZXhwcmVzc2lvbiwgZWwsIGNvbXBvbmVudCkpO1xuICAgIGNvbnN0IGxlYXZlU3RhcnQgPSBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGVuc3VyZVN0cmluZ0V4cHJlc3Npb24oKGRpcmVjdGl2ZXMuZmluZChpID0+IGkudmFsdWUgPT09ICdsZWF2ZS1zdGFydCcpIHx8IHtcbiAgICAgIGV4cHJlc3Npb246ICcnXG4gICAgfSkuZXhwcmVzc2lvbiwgZWwsIGNvbXBvbmVudCkpO1xuICAgIGNvbnN0IGxlYXZlRW5kID0gY29udmVydENsYXNzU3RyaW5nVG9BcnJheShlbnN1cmVTdHJpbmdFeHByZXNzaW9uKChkaXJlY3RpdmVzLmZpbmQoaSA9PiBpLnZhbHVlID09PSAnbGVhdmUtZW5kJykgfHwge1xuICAgICAgZXhwcmVzc2lvbjogJydcbiAgICB9KS5leHByZXNzaW9uLCBlbCwgY29tcG9uZW50KSk7XG4gICAgdHJhbnNpdGlvbkNsYXNzZXMoZWwsIGxlYXZlLCBsZWF2ZVN0YXJ0LCBsZWF2ZUVuZCwgKCkgPT4ge30sIGhpZGVDYWxsYmFjaywgVFJBTlNJVElPTl9UWVBFX09VVCwgcmVqZWN0KTtcbiAgfVxuICBmdW5jdGlvbiB0cmFuc2l0aW9uQ2xhc3NlcyhlbCwgY2xhc3Nlc0R1cmluZywgY2xhc3Nlc1N0YXJ0LCBjbGFzc2VzRW5kLCBob29rMSwgaG9vazIsIHR5cGUsIHJlamVjdCkge1xuICAgIC8vIGNsZWFyIHRoZSBwcmV2aW91cyB0cmFuc2l0aW9uIGlmIGV4aXN0cyB0byBhdm9pZCBjYWNoaW5nIHRoZSB3cm9uZyBjbGFzc2VzXG4gICAgaWYgKGVsLl9feF90cmFuc2l0aW9uKSB7XG4gICAgICBlbC5fX3hfdHJhbnNpdGlvbi5jYW5jZWwgJiYgZWwuX194X3RyYW5zaXRpb24uY2FuY2VsKCk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3JpZ2luYWxDbGFzc2VzID0gZWwuX194X29yaWdpbmFsX2NsYXNzZXMgfHwgW107XG4gICAgY29uc3Qgc3RhZ2VzID0ge1xuICAgICAgc3RhcnQoKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlc1N0YXJ0KTtcbiAgICAgIH0sXG5cbiAgICAgIGR1cmluZygpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzRHVyaW5nKTtcbiAgICAgIH0sXG5cbiAgICAgIHNob3coKSB7XG4gICAgICAgIGhvb2sxKCk7XG4gICAgICB9LFxuXG4gICAgICBlbmQoKSB7XG4gICAgICAgIC8vIERvbid0IHJlbW92ZSBjbGFzc2VzIHRoYXQgd2VyZSBpbiB0aGUgb3JpZ2luYWwgY2xhc3MgYXR0cmlidXRlLlxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzZXNTdGFydC5maWx0ZXIoaSA9PiAhb3JpZ2luYWxDbGFzc2VzLmluY2x1ZGVzKGkpKSk7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlc0VuZCk7XG4gICAgICB9LFxuXG4gICAgICBoaWRlKCkge1xuICAgICAgICBob29rMigpO1xuICAgICAgfSxcblxuICAgICAgY2xlYW51cCgpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc2VzRHVyaW5nLmZpbHRlcihpID0+ICFvcmlnaW5hbENsYXNzZXMuaW5jbHVkZXMoaSkpKTtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc2VzRW5kLmZpbHRlcihpID0+ICFvcmlnaW5hbENsYXNzZXMuaW5jbHVkZXMoaSkpKTtcbiAgICAgIH1cblxuICAgIH07XG4gICAgdHJhbnNpdGlvbihlbCwgc3RhZ2VzLCB0eXBlLCByZWplY3QpO1xuICB9XG4gIGZ1bmN0aW9uIHRyYW5zaXRpb24oZWwsIHN0YWdlcywgdHlwZSwgcmVqZWN0KSB7XG4gICAgY29uc3QgZmluaXNoID0gb25jZSgoKSA9PiB7XG4gICAgICBzdGFnZXMuaGlkZSgpOyAvLyBBZGRpbmcgYW4gXCJpc0Nvbm5lY3RlZFwiIGNoZWNrLCBpbiBjYXNlIHRoZSBjYWxsYmFja1xuICAgICAgLy8gcmVtb3ZlZCB0aGUgZWxlbWVudCBmcm9tIHRoZSBET00uXG5cbiAgICAgIGlmIChlbC5pc0Nvbm5lY3RlZCkge1xuICAgICAgICBzdGFnZXMuY2xlYW51cCgpO1xuICAgICAgfVxuXG4gICAgICBkZWxldGUgZWwuX194X3RyYW5zaXRpb247XG4gICAgfSk7XG4gICAgZWwuX194X3RyYW5zaXRpb24gPSB7XG4gICAgICAvLyBTZXQgdHJhbnNpdGlvbiB0eXBlIHNvIHdlIGNhbiBhdm9pZCBjbGVhcmluZyB0cmFuc2l0aW9uIGlmIHRoZSBkaXJlY3Rpb24gaXMgdGhlIHNhbWVcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAvLyBjcmVhdGUgYSBjYWxsYmFjayBmb3IgdGhlIGxhc3Qgc3RhZ2VzIG9mIHRoZSB0cmFuc2l0aW9uIHNvIHdlIGNhbiBjYWxsIGl0XG4gICAgICAvLyBmcm9tIGRpZmZlcmVudCBwb2ludCBhbmQgZWFybHkgdGVybWluYXRlIGl0LiBPbmNlIHdpbGwgZW5zdXJlIHRoYXQgZnVuY3Rpb25cbiAgICAgIC8vIGlzIG9ubHkgY2FsbGVkIG9uZSB0aW1lLlxuICAgICAgY2FuY2VsOiBvbmNlKCgpID0+IHtcbiAgICAgICAgcmVqZWN0KFRSQU5TSVRJT05fQ0FOQ0VMTEVEKTtcbiAgICAgICAgZmluaXNoKCk7XG4gICAgICB9KSxcbiAgICAgIGZpbmlzaCxcbiAgICAgIC8vIFRoaXMgc3RvcmUgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lIHNvIHdlIGNhbiBjYW5jZWwgaXRcbiAgICAgIG5leHRGcmFtZTogbnVsbFxuICAgIH07XG4gICAgc3RhZ2VzLnN0YXJ0KCk7XG4gICAgc3RhZ2VzLmR1cmluZygpO1xuICAgIGVsLl9feF90cmFuc2l0aW9uLm5leHRGcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBOb3RlOiBTYWZhcmkncyB0cmFuc2l0aW9uRHVyYXRpb24gcHJvcGVydHkgd2lsbCBsaXN0IG91dCBjb21tYSBzZXBhcmF0ZWQgdHJhbnNpdGlvbiBkdXJhdGlvbnNcbiAgICAgIC8vIGZvciBldmVyeSBzaW5nbGUgdHJhbnNpdGlvbiBwcm9wZXJ0eS4gTGV0J3MgZ3JhYiB0aGUgZmlyc3Qgb25lIGFuZCBjYWxsIGl0IGEgZGF5LlxuICAgICAgbGV0IGR1cmF0aW9uID0gTnVtYmVyKGdldENvbXB1dGVkU3R5bGUoZWwpLnRyYW5zaXRpb25EdXJhdGlvbi5yZXBsYWNlKC8sLiovLCAnJykucmVwbGFjZSgncycsICcnKSkgKiAxMDAwO1xuXG4gICAgICBpZiAoZHVyYXRpb24gPT09IDApIHtcbiAgICAgICAgZHVyYXRpb24gPSBOdW1iZXIoZ2V0Q29tcHV0ZWRTdHlsZShlbCkuYW5pbWF0aW9uRHVyYXRpb24ucmVwbGFjZSgncycsICcnKSkgKiAxMDAwO1xuICAgICAgfVxuXG4gICAgICBzdGFnZXMuc2hvdygpO1xuICAgICAgZWwuX194X3RyYW5zaXRpb24ubmV4dEZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgc3RhZ2VzLmVuZCgpO1xuICAgICAgICBzZXRUaW1lb3V0KGVsLl9feF90cmFuc2l0aW9uLmZpbmlzaCwgZHVyYXRpb24pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gaXNOdW1lcmljKHN1YmplY3QpIHtcbiAgICByZXR1cm4gIUFycmF5LmlzQXJyYXkoc3ViamVjdCkgJiYgIWlzTmFOKHN1YmplY3QpO1xuICB9IC8vIFRoYW5rcyBAdnVlanNcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3Z1ZS9ibG9iLzRkZTQ2NDlkOTYzNzI2MmE5YjAwNzcyMGI1OWY4MGFjNzJhNTYyMGMvc3JjL3NoYXJlZC91dGlsLmpzXG5cbiAgZnVuY3Rpb24gb25jZShjYWxsYmFjaykge1xuICAgIGxldCBjYWxsZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgICAgY2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlRm9yRGlyZWN0aXZlKGNvbXBvbmVudCwgdGVtcGxhdGVFbCwgZXhwcmVzc2lvbiwgaW5pdGlhbFVwZGF0ZSwgZXh0cmFWYXJzKSB7XG4gICAgd2FybklmTWFsZm9ybWVkVGVtcGxhdGUodGVtcGxhdGVFbCwgJ3gtZm9yJyk7XG4gICAgbGV0IGl0ZXJhdG9yTmFtZXMgPSB0eXBlb2YgZXhwcmVzc2lvbiA9PT0gJ2Z1bmN0aW9uJyA/IHBhcnNlRm9yRXhwcmVzc2lvbihjb21wb25lbnQuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKHRlbXBsYXRlRWwsIGV4cHJlc3Npb24pKSA6IHBhcnNlRm9yRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgICBsZXQgaXRlbXMgPSBldmFsdWF0ZUl0ZW1zQW5kUmV0dXJuRW1wdHlJZlhJZklzUHJlc2VudEFuZEZhbHNlT25FbGVtZW50KGNvbXBvbmVudCwgdGVtcGxhdGVFbCwgaXRlcmF0b3JOYW1lcywgZXh0cmFWYXJzKTsgLy8gQXMgd2Ugd2FsayB0aGUgYXJyYXksIHdlJ2xsIGFsc28gd2FsayB0aGUgRE9NICh1cGRhdGluZy9jcmVhdGluZyBhcyB3ZSBnbykuXG5cbiAgICBsZXQgY3VycmVudEVsID0gdGVtcGxhdGVFbDtcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGl0ZXJhdGlvblNjb3BlVmFyaWFibGVzID0gZ2V0SXRlcmF0aW9uU2NvcGVWYXJpYWJsZXMoaXRlcmF0b3JOYW1lcywgaXRlbSwgaW5kZXgsIGl0ZW1zLCBleHRyYVZhcnMoKSk7XG4gICAgICBsZXQgY3VycmVudEtleSA9IGdlbmVyYXRlS2V5Rm9ySXRlcmF0aW9uKGNvbXBvbmVudCwgdGVtcGxhdGVFbCwgaW5kZXgsIGl0ZXJhdGlvblNjb3BlVmFyaWFibGVzKTtcbiAgICAgIGxldCBuZXh0RWwgPSBsb29rQWhlYWRGb3JNYXRjaGluZ0tleWVkRWxlbWVudEFuZE1vdmVJdElmRm91bmQoY3VycmVudEVsLm5leHRFbGVtZW50U2libGluZywgY3VycmVudEtleSk7IC8vIElmIHdlIGhhdmVuJ3QgZm91bmQgYSBtYXRjaGluZyBrZXksIGluc2VydCB0aGUgZWxlbWVudCBhdCB0aGUgY3VycmVudCBwb3NpdGlvbi5cblxuICAgICAgaWYgKCFuZXh0RWwpIHtcbiAgICAgICAgbmV4dEVsID0gYWRkRWxlbWVudEluTG9vcEFmdGVyQ3VycmVudEVsKHRlbXBsYXRlRWwsIGN1cnJlbnRFbCk7IC8vIEFuZCB0cmFuc2l0aW9uIGl0IGluIGlmIGl0J3Mgbm90IHRoZSBmaXJzdCBwYWdlIGxvYWQuXG5cbiAgICAgICAgdHJhbnNpdGlvbkluKG5leHRFbCwgKCkgPT4ge30sICgpID0+IHt9LCBjb21wb25lbnQsIGluaXRpYWxVcGRhdGUpO1xuICAgICAgICBuZXh0RWwuX194X2ZvciA9IGl0ZXJhdGlvblNjb3BlVmFyaWFibGVzO1xuICAgICAgICBjb21wb25lbnQuaW5pdGlhbGl6ZUVsZW1lbnRzKG5leHRFbCwgKCkgPT4gbmV4dEVsLl9feF9mb3IpOyAvLyBPdGhlcndpc2UgdXBkYXRlIHRoZSBlbGVtZW50IHdlIGZvdW5kLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGVtcG9yYXJpbHkgcmVtb3ZlIHRoZSBrZXkgaW5kaWNhdG9yIHRvIGFsbG93IHRoZSBub3JtYWwgXCJ1cGRhdGVFbGVtZW50c1wiIHRvIHdvcmsuXG4gICAgICAgIGRlbGV0ZSBuZXh0RWwuX194X2Zvcl9rZXk7XG4gICAgICAgIG5leHRFbC5fX3hfZm9yID0gaXRlcmF0aW9uU2NvcGVWYXJpYWJsZXM7XG4gICAgICAgIGNvbXBvbmVudC51cGRhdGVFbGVtZW50cyhuZXh0RWwsICgpID0+IG5leHRFbC5fX3hfZm9yKTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudEVsID0gbmV4dEVsO1xuICAgICAgY3VycmVudEVsLl9feF9mb3Jfa2V5ID0gY3VycmVudEtleTtcbiAgICB9KTtcbiAgICByZW1vdmVBbnlMZWZ0T3ZlckVsZW1lbnRzRnJvbVByZXZpb3VzVXBkYXRlKGN1cnJlbnRFbCwgY29tcG9uZW50KTtcbiAgfSAvLyBUaGlzIHdhcyB0YWtlbiBmcm9tIFZ1ZUpTIDIuKiBjb3JlLiBUaGFua3MgVnVlIVxuXG4gIGZ1bmN0aW9uIHBhcnNlRm9yRXhwcmVzc2lvbihleHByZXNzaW9uKSB7XG4gICAgbGV0IGZvckl0ZXJhdG9yUkUgPSAvLChbXixcXH1cXF1dKikoPzosKFteLFxcfVxcXV0qKSk/JC87XG4gICAgbGV0IHN0cmlwUGFyZW5zUkUgPSAvXlxcKHxcXCkkL2c7XG4gICAgbGV0IGZvckFsaWFzUkUgPSAvKFtcXHNcXFNdKj8pXFxzKyg/OmlufG9mKVxccysoW1xcc1xcU10qKS87XG4gICAgbGV0IGluTWF0Y2ggPSBTdHJpbmcoZXhwcmVzc2lvbikubWF0Y2goZm9yQWxpYXNSRSk7XG4gICAgaWYgKCFpbk1hdGNoKSByZXR1cm47XG4gICAgbGV0IHJlcyA9IHt9O1xuICAgIHJlcy5pdGVtcyA9IGluTWF0Y2hbMl0udHJpbSgpO1xuICAgIGxldCBpdGVtID0gaW5NYXRjaFsxXS50cmltKCkucmVwbGFjZShzdHJpcFBhcmVuc1JFLCAnJyk7XG4gICAgbGV0IGl0ZXJhdG9yTWF0Y2ggPSBpdGVtLm1hdGNoKGZvckl0ZXJhdG9yUkUpO1xuXG4gICAgaWYgKGl0ZXJhdG9yTWF0Y2gpIHtcbiAgICAgIHJlcy5pdGVtID0gaXRlbS5yZXBsYWNlKGZvckl0ZXJhdG9yUkUsICcnKS50cmltKCk7XG4gICAgICByZXMuaW5kZXggPSBpdGVyYXRvck1hdGNoWzFdLnRyaW0oKTtcblxuICAgICAgaWYgKGl0ZXJhdG9yTWF0Y2hbMl0pIHtcbiAgICAgICAgcmVzLmNvbGxlY3Rpb24gPSBpdGVyYXRvck1hdGNoWzJdLnRyaW0oKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzLml0ZW0gPSBpdGVtO1xuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJdGVyYXRpb25TY29wZVZhcmlhYmxlcyhpdGVyYXRvck5hbWVzLCBpdGVtLCBpbmRleCwgaXRlbXMsIGV4dHJhVmFycykge1xuICAgIC8vIFdlIG11c3QgY3JlYXRlIGEgbmV3IG9iamVjdCwgc28gZWFjaCBpdGVyYXRpb24gaGFzIGEgbmV3IHNjb3BlXG4gICAgbGV0IHNjb3BlVmFyaWFibGVzID0gZXh0cmFWYXJzID8gX29iamVjdFNwcmVhZDIoe30sIGV4dHJhVmFycykgOiB7fTtcbiAgICBzY29wZVZhcmlhYmxlc1tpdGVyYXRvck5hbWVzLml0ZW1dID0gaXRlbTtcbiAgICBpZiAoaXRlcmF0b3JOYW1lcy5pbmRleCkgc2NvcGVWYXJpYWJsZXNbaXRlcmF0b3JOYW1lcy5pbmRleF0gPSBpbmRleDtcbiAgICBpZiAoaXRlcmF0b3JOYW1lcy5jb2xsZWN0aW9uKSBzY29wZVZhcmlhYmxlc1tpdGVyYXRvck5hbWVzLmNvbGxlY3Rpb25dID0gaXRlbXM7XG4gICAgcmV0dXJuIHNjb3BlVmFyaWFibGVzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVLZXlGb3JJdGVyYXRpb24oY29tcG9uZW50LCBlbCwgaW5kZXgsIGl0ZXJhdGlvblNjb3BlVmFyaWFibGVzKSB7XG4gICAgbGV0IGJpbmRLZXlBdHRyaWJ1dGUgPSBnZXRYQXR0cnMoZWwsIGNvbXBvbmVudCwgJ2JpbmQnKS5maWx0ZXIoYXR0ciA9PiBhdHRyLnZhbHVlID09PSAna2V5JylbMF07IC8vIElmIHRoZSBkZXYgaGFzbid0IHNwZWNpZmllZCBhIGtleSwganVzdCByZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBpdGVyYXRpb24uXG5cbiAgICBpZiAoIWJpbmRLZXlBdHRyaWJ1dGUpIHJldHVybiBpbmRleDtcbiAgICByZXR1cm4gY29tcG9uZW50LmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgYmluZEtleUF0dHJpYnV0ZS5leHByZXNzaW9uLCAoKSA9PiBpdGVyYXRpb25TY29wZVZhcmlhYmxlcyk7XG4gIH1cblxuICBmdW5jdGlvbiBldmFsdWF0ZUl0ZW1zQW5kUmV0dXJuRW1wdHlJZlhJZklzUHJlc2VudEFuZEZhbHNlT25FbGVtZW50KGNvbXBvbmVudCwgZWwsIGl0ZXJhdG9yTmFtZXMsIGV4dHJhVmFycykge1xuICAgIGxldCBpZkF0dHJpYnV0ZSA9IGdldFhBdHRycyhlbCwgY29tcG9uZW50LCAnaWYnKVswXTtcblxuICAgIGlmIChpZkF0dHJpYnV0ZSAmJiAhY29tcG9uZW50LmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgaWZBdHRyaWJ1dGUuZXhwcmVzc2lvbikpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBsZXQgaXRlbXMgPSBjb21wb25lbnQuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKGVsLCBpdGVyYXRvck5hbWVzLml0ZW1zLCBleHRyYVZhcnMpOyAvLyBUaGlzIGFkZHMgc3VwcG9ydCBmb3IgdGhlIGBpIGluIG5gIHN5bnRheC5cblxuICAgIGlmIChpc051bWVyaWMoaXRlbXMpICYmIGl0ZW1zID49IDApIHtcbiAgICAgIGl0ZW1zID0gQXJyYXkuZnJvbShBcnJheShpdGVtcykua2V5cygpLCBpID0+IGkgKyAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRFbGVtZW50SW5Mb29wQWZ0ZXJDdXJyZW50RWwodGVtcGxhdGVFbCwgY3VycmVudEVsKSB7XG4gICAgbGV0IGNsb25lID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZUVsLmNvbnRlbnQsIHRydWUpO1xuICAgIGN1cnJlbnRFbC5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShjbG9uZSwgY3VycmVudEVsLm5leHRFbGVtZW50U2libGluZyk7XG4gICAgcmV0dXJuIGN1cnJlbnRFbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBsb29rQWhlYWRGb3JNYXRjaGluZ0tleWVkRWxlbWVudEFuZE1vdmVJdElmRm91bmQobmV4dEVsLCBjdXJyZW50S2V5KSB7XG4gICAgaWYgKCFuZXh0RWwpIHJldHVybjsgLy8gSWYgd2UgYXJlIGFscmVhZHkgcGFzdCB0aGUgeC1mb3IgZ2VuZXJhdGVkIGVsZW1lbnRzLCB3ZSBkb24ndCBuZWVkIHRvIGxvb2sgYWhlYWQuXG5cbiAgICBpZiAobmV4dEVsLl9feF9mb3Jfa2V5ID09PSB1bmRlZmluZWQpIHJldHVybjsgLy8gSWYgdGhlIHRoZSBrZXkncyBETyBtYXRjaCwgbm8gbmVlZCB0byBsb29rIGFoZWFkLlxuXG4gICAgaWYgKG5leHRFbC5fX3hfZm9yX2tleSA9PT0gY3VycmVudEtleSkgcmV0dXJuIG5leHRFbDsgLy8gSWYgdGhleSBkb24ndCwgd2UnbGwgbG9vayBhaGVhZCBmb3IgYSBtYXRjaC5cbiAgICAvLyBJZiB3ZSBmaW5kIGl0LCB3ZSdsbCBtb3ZlIGl0IHRvIHRoZSBjdXJyZW50IHBvc2l0aW9uIGluIHRoZSBsb29wLlxuXG4gICAgbGV0IHRtcE5leHRFbCA9IG5leHRFbDtcblxuICAgIHdoaWxlICh0bXBOZXh0RWwpIHtcbiAgICAgIGlmICh0bXBOZXh0RWwuX194X2Zvcl9rZXkgPT09IGN1cnJlbnRLZXkpIHtcbiAgICAgICAgcmV0dXJuIHRtcE5leHRFbC5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZSh0bXBOZXh0RWwsIG5leHRFbCk7XG4gICAgICB9XG5cbiAgICAgIHRtcE5leHRFbCA9IHRtcE5leHRFbC5uZXh0RWxlbWVudFNpYmxpbmcgJiYgdG1wTmV4dEVsLm5leHRFbGVtZW50U2libGluZy5fX3hfZm9yX2tleSAhPT0gdW5kZWZpbmVkID8gdG1wTmV4dEVsLm5leHRFbGVtZW50U2libGluZyA6IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUFueUxlZnRPdmVyRWxlbWVudHNGcm9tUHJldmlvdXNVcGRhdGUoY3VycmVudEVsLCBjb21wb25lbnQpIHtcbiAgICB2YXIgbmV4dEVsZW1lbnRGcm9tT2xkTG9vcCA9IGN1cnJlbnRFbC5uZXh0RWxlbWVudFNpYmxpbmcgJiYgY3VycmVudEVsLm5leHRFbGVtZW50U2libGluZy5fX3hfZm9yX2tleSAhPT0gdW5kZWZpbmVkID8gY3VycmVudEVsLm5leHRFbGVtZW50U2libGluZyA6IGZhbHNlO1xuXG4gICAgd2hpbGUgKG5leHRFbGVtZW50RnJvbU9sZExvb3ApIHtcbiAgICAgIGxldCBuZXh0RWxlbWVudEZyb21PbGRMb29wSW1tdXRhYmxlID0gbmV4dEVsZW1lbnRGcm9tT2xkTG9vcDtcbiAgICAgIGxldCBuZXh0U2libGluZyA9IG5leHRFbGVtZW50RnJvbU9sZExvb3AubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgdHJhbnNpdGlvbk91dChuZXh0RWxlbWVudEZyb21PbGRMb29wLCAoKSA9PiB7XG4gICAgICAgIG5leHRFbGVtZW50RnJvbU9sZExvb3BJbW11dGFibGUucmVtb3ZlKCk7XG4gICAgICB9LCAoKSA9PiB7fSwgY29tcG9uZW50KTtcbiAgICAgIG5leHRFbGVtZW50RnJvbU9sZExvb3AgPSBuZXh0U2libGluZyAmJiBuZXh0U2libGluZy5fX3hfZm9yX2tleSAhPT0gdW5kZWZpbmVkID8gbmV4dFNpYmxpbmcgOiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVBdHRyaWJ1dGVCaW5kaW5nRGlyZWN0aXZlKGNvbXBvbmVudCwgZWwsIGF0dHJOYW1lLCBleHByZXNzaW9uLCBleHRyYVZhcnMsIGF0dHJUeXBlLCBtb2RpZmllcnMpIHtcbiAgICB2YXIgdmFsdWUgPSBjb21wb25lbnQuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKGVsLCBleHByZXNzaW9uLCBleHRyYVZhcnMpO1xuXG4gICAgaWYgKGF0dHJOYW1lID09PSAndmFsdWUnKSB7XG4gICAgICBpZiAoQWxwaW5lLmlnbm9yZUZvY3VzZWRGb3JWYWx1ZUJpbmRpbmcgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGVsKSkgcmV0dXJuOyAvLyBJZiBuZXN0ZWQgbW9kZWwga2V5IGlzIHVuZGVmaW5lZCwgc2V0IHRoZSBkZWZhdWx0IHZhbHVlIHRvIGVtcHR5IHN0cmluZy5cblxuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgU3RyaW5nKGV4cHJlc3Npb24pLm1hdGNoKC9cXC4vKSkge1xuICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWwudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAvLyBTZXQgcmFkaW8gdmFsdWUgZnJvbSB4LWJpbmQ6dmFsdWUsIGlmIG5vIFwidmFsdWVcIiBhdHRyaWJ1dGUgZXhpc3RzLlxuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgYW55IGluaXRpYWwgc3RhdGUgdmFsdWVzLCByYWRpbyB3aWxsIGhhdmUgYSBjb3JyZWN0XG4gICAgICAgIC8vIFwiY2hlY2tlZFwiIHZhbHVlIHNpbmNlIHgtYmluZDp2YWx1ZSBpcyBwcm9jZXNzZWQgYmVmb3JlIHgtbW9kZWwuXG4gICAgICAgIGlmIChlbC5hdHRyaWJ1dGVzLnZhbHVlID09PSB1bmRlZmluZWQgJiYgYXR0clR5cGUgPT09ICdiaW5kJykge1xuICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoYXR0clR5cGUgIT09ICdiaW5kJykge1xuICAgICAgICAgIGVsLmNoZWNrZWQgPSBjaGVja2VkQXR0ckxvb3NlQ29tcGFyZShlbC52YWx1ZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGVsLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlIGV4cGxpY2l0bHkgYmluZGluZyBhIHN0cmluZyB0byB0aGUgOnZhbHVlLCBzZXQgdGhlIHN0cmluZyxcbiAgICAgICAgLy8gSWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbiwgbGVhdmUgaXQgYWxvbmUsIGl0IHdpbGwgYmUgc2V0IHRvIFwib25cIlxuICAgICAgICAvLyBhdXRvbWF0aWNhbGx5LlxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnYm9vbGVhbicgJiYgIVtudWxsLCB1bmRlZmluZWRdLmluY2x1ZGVzKHZhbHVlKSAmJiBhdHRyVHlwZSA9PT0gJ2JpbmQnKSB7XG4gICAgICAgICAgZWwudmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGF0dHJUeXBlICE9PSAnYmluZCcpIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIEknbSBwdXJwb3NlbHkgbm90IHVzaW5nIEFycmF5LmluY2x1ZGVzIGhlcmUgYmVjYXVzZSBpdCdzXG4gICAgICAgICAgICAvLyBzdHJpY3QsIGFuZCBiZWNhdXNlIG9mIE51bWVyaWMvU3RyaW5nIG1pcy1jYXN0aW5nLCBJXG4gICAgICAgICAgICAvLyB3YW50IHRoZSBcImluY2x1ZGVzXCIgdG8gYmUgXCJmdXp6eVwiLlxuICAgICAgICAgICAgZWwuY2hlY2tlZCA9IHZhbHVlLnNvbWUodmFsID0+IGNoZWNrZWRBdHRyTG9vc2VDb21wYXJlKHZhbCwgZWwudmFsdWUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWwuY2hlY2tlZCA9ICEhdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGVsLnRhZ05hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgIHVwZGF0ZVNlbGVjdChlbCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsLnZhbHVlID09PSB2YWx1ZSkgcmV0dXJuO1xuICAgICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXR0ck5hbWUgPT09ICdjbGFzcycpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBjb25zdCBvcmlnaW5hbENsYXNzZXMgPSBlbC5fX3hfb3JpZ2luYWxfY2xhc3NlcyB8fCBbXTtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIGFycmF5VW5pcXVlKG9yaWdpbmFsQ2xhc3Nlcy5jb25jYXQodmFsdWUpKS5qb2luKCcgJykpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIFNvcnRpbmcgdGhlIGtleXMgLyBjbGFzcyBuYW1lcyBieSB0aGVpciBib29sZWFuIHZhbHVlIHdpbGwgZW5zdXJlIHRoYXRcbiAgICAgICAgLy8gYW55dGhpbmcgdGhhdCBldmFsdWF0ZXMgdG8gYGZhbHNlYCBhbmQgbmVlZHMgdG8gcmVtb3ZlIGNsYXNzZXMgaXMgcnVuIGZpcnN0LlxuICAgICAgICBjb25zdCBrZXlzU29ydGVkQnlCb29sZWFuVmFsdWUgPSBPYmplY3Qua2V5cyh2YWx1ZSkuc29ydCgoYSwgYikgPT4gdmFsdWVbYV0gLSB2YWx1ZVtiXSk7XG4gICAgICAgIGtleXNTb3J0ZWRCeUJvb2xlYW5WYWx1ZS5mb3JFYWNoKGNsYXNzTmFtZXMgPT4ge1xuICAgICAgICAgIGlmICh2YWx1ZVtjbGFzc05hbWVzXSkge1xuICAgICAgICAgICAgY29udmVydENsYXNzU3RyaW5nVG9BcnJheShjbGFzc05hbWVzKS5mb3JFYWNoKGNsYXNzTmFtZSA9PiBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KGNsYXNzTmFtZXMpLmZvckVhY2goY2xhc3NOYW1lID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsQ2xhc3NlcyA9IGVsLl9feF9vcmlnaW5hbF9jbGFzc2VzIHx8IFtdO1xuICAgICAgICBjb25zdCBuZXdDbGFzc2VzID0gdmFsdWUgPyBjb252ZXJ0Q2xhc3NTdHJpbmdUb0FycmF5KHZhbHVlKSA6IFtdO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYXJyYXlVbmlxdWUob3JpZ2luYWxDbGFzc2VzLmNvbmNhdChuZXdDbGFzc2VzKSkuam9pbignICcpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYXR0ck5hbWUgPSBtb2RpZmllcnMuaW5jbHVkZXMoJ2NhbWVsJykgPyBjYW1lbENhc2UoYXR0ck5hbWUpIDogYXR0ck5hbWU7IC8vIElmIGFuIGF0dHJpYnV0ZSdzIGJvdW5kIHZhbHVlIGlzIG51bGwsIHVuZGVmaW5lZCBvciBmYWxzZSwgcmVtb3ZlIHRoZSBhdHRyaWJ1dGVcblxuICAgICAgaWYgKFtudWxsLCB1bmRlZmluZWQsIGZhbHNlXS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzQm9vbGVhbkF0dHIoYXR0ck5hbWUpID8gc2V0SWZDaGFuZ2VkKGVsLCBhdHRyTmFtZSwgYXR0ck5hbWUpIDogc2V0SWZDaGFuZ2VkKGVsLCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldElmQ2hhbmdlZChlbCwgYXR0ck5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKGVsLmdldEF0dHJpYnV0ZShhdHRyTmFtZSkgIT0gdmFsdWUpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdChlbCwgdmFsdWUpIHtcbiAgICBjb25zdCBhcnJheVdyYXBwZWRWYWx1ZSA9IFtdLmNvbmNhdCh2YWx1ZSkubWFwKHZhbHVlID0+IHtcbiAgICAgIHJldHVybiB2YWx1ZSArICcnO1xuICAgIH0pO1xuICAgIEFycmF5LmZyb20oZWwub3B0aW9ucykuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgb3B0aW9uLnNlbGVjdGVkID0gYXJyYXlXcmFwcGVkVmFsdWUuaW5jbHVkZXMob3B0aW9uLnZhbHVlIHx8IG9wdGlvbi50ZXh0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVRleHREaXJlY3RpdmUoZWwsIG91dHB1dCwgZXhwcmVzc2lvbikge1xuICAgIC8vIElmIG5lc3RlZCBtb2RlbCBrZXkgaXMgdW5kZWZpbmVkLCBzZXQgdGhlIGRlZmF1bHQgdmFsdWUgdG8gZW1wdHkgc3RyaW5nLlxuICAgIGlmIChvdXRwdXQgPT09IHVuZGVmaW5lZCAmJiBTdHJpbmcoZXhwcmVzc2lvbikubWF0Y2goL1xcLi8pKSB7XG4gICAgICBvdXRwdXQgPSAnJztcbiAgICB9XG5cbiAgICBlbC50ZXh0Q29udGVudCA9IG91dHB1dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUh0bWxEaXJlY3RpdmUoY29tcG9uZW50LCBlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKSB7XG4gICAgZWwuaW5uZXJIVE1MID0gY29tcG9uZW50LmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVNob3dEaXJlY3RpdmUoY29tcG9uZW50LCBlbCwgdmFsdWUsIG1vZGlmaWVycywgaW5pdGlhbFVwZGF0ZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgaGlkZSA9ICgpID0+IHtcbiAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBlbC5fX3hfaXNfc2hvd24gPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2hvdyA9ICgpID0+IHtcbiAgICAgIGlmIChlbC5zdHlsZS5sZW5ndGggPT09IDEgJiYgZWwuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdkaXNwbGF5Jyk7XG4gICAgICB9XG5cbiAgICAgIGVsLl9feF9pc19zaG93biA9IHRydWU7XG4gICAgfTtcblxuICAgIGlmIChpbml0aWFsVXBkYXRlID09PSB0cnVlKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgc2hvdygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlID0gKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGlmIChlbC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgfHwgZWwuX194X3RyYW5zaXRpb24pIHtcbiAgICAgICAgICB0cmFuc2l0aW9uSW4oZWwsICgpID0+IHtcbiAgICAgICAgICAgIHNob3coKTtcbiAgICAgICAgICB9LCByZWplY3QsIGNvbXBvbmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXNvbHZlKCgpID0+IHt9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlbC5zdHlsZS5kaXNwbGF5ICE9PSAnbm9uZScpIHtcbiAgICAgICAgICB0cmFuc2l0aW9uT3V0KGVsLCAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCgpID0+IHtcbiAgICAgICAgICAgICAgaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgcmVqZWN0LCBjb21wb25lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoKCkgPT4ge30pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTsgLy8gVGhlIHdvcmtpbmcgb2YgeC1zaG93IGlzIGEgYml0IGNvbXBsZXggYmVjYXVzZSB3ZSBuZWVkIHRvXG4gICAgLy8gd2FpdCBmb3IgYW55IGNoaWxkIHRyYW5zaXRpb25zIHRvIGZpbmlzaCBiZWZvcmUgaGlkaW5nXG4gICAgLy8gc29tZSBlbGVtZW50LiBBbHNvLCB0aGlzIGhhcyB0byBiZSBkb25lIHJlY3Vyc2l2ZWx5LlxuICAgIC8vIElmIHgtc2hvdy5pbW1lZGlhdGUsIGZvcmVnb2UgdGhlIHdhaXRpbmcuXG5cblxuICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ2ltbWVkaWF0ZScpKSB7XG4gICAgICBoYW5kbGUoZmluaXNoID0+IGZpbmlzaCgpLCAoKSA9PiB7fSk7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyB4LXNob3cgaXMgZW5jb3VudGVyZWQgZHVyaW5nIGEgRE9NIHRyZWUgd2Fsay4gSWYgYW4gZWxlbWVudFxuICAgIC8vIHdlIGVuY291bnRlciBpcyBOT1QgYSBjaGlsZCBvZiBhbm90aGVyIHgtc2hvdyBlbGVtZW50IHdlXG4gICAgLy8gY2FuIGV4ZWN1dGUgdGhlIHByZXZpb3VzIHgtc2hvdyBzdGFjayAoaWYgb25lIGV4aXN0cykuXG5cblxuICAgIGlmIChjb21wb25lbnQuc2hvd0RpcmVjdGl2ZUxhc3RFbGVtZW50ICYmICFjb21wb25lbnQuc2hvd0RpcmVjdGl2ZUxhc3RFbGVtZW50LmNvbnRhaW5zKGVsKSkge1xuICAgICAgY29tcG9uZW50LmV4ZWN1dGVBbmRDbGVhclJlbWFpbmluZ1Nob3dEaXJlY3RpdmVTdGFjaygpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudC5zaG93RGlyZWN0aXZlU3RhY2sucHVzaChoYW5kbGUpO1xuICAgIGNvbXBvbmVudC5zaG93RGlyZWN0aXZlTGFzdEVsZW1lbnQgPSBlbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUlmRGlyZWN0aXZlKGNvbXBvbmVudCwgZWwsIGV4cHJlc3Npb25SZXN1bHQsIGluaXRpYWxVcGRhdGUsIGV4dHJhVmFycykge1xuICAgIHdhcm5JZk1hbGZvcm1lZFRlbXBsYXRlKGVsLCAneC1pZicpO1xuICAgIGNvbnN0IGVsZW1lbnRIYXNBbHJlYWR5QmVlbkFkZGVkID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nICYmIGVsLm5leHRFbGVtZW50U2libGluZy5fX3hfaW5zZXJ0ZWRfbWUgPT09IHRydWU7XG5cbiAgICBpZiAoZXhwcmVzc2lvblJlc3VsdCAmJiAoIWVsZW1lbnRIYXNBbHJlYWR5QmVlbkFkZGVkIHx8IGVsLl9feF90cmFuc2l0aW9uKSkge1xuICAgICAgY29uc3QgY2xvbmUgPSBkb2N1bWVudC5pbXBvcnROb2RlKGVsLmNvbnRlbnQsIHRydWUpO1xuICAgICAgZWwucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoY2xvbmUsIGVsLm5leHRFbGVtZW50U2libGluZyk7XG4gICAgICB0cmFuc2l0aW9uSW4oZWwubmV4dEVsZW1lbnRTaWJsaW5nLCAoKSA9PiB7fSwgKCkgPT4ge30sIGNvbXBvbmVudCwgaW5pdGlhbFVwZGF0ZSk7XG4gICAgICBjb21wb25lbnQuaW5pdGlhbGl6ZUVsZW1lbnRzKGVsLm5leHRFbGVtZW50U2libGluZywgZXh0cmFWYXJzKTtcbiAgICAgIGVsLm5leHRFbGVtZW50U2libGluZy5fX3hfaW5zZXJ0ZWRfbWUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIWV4cHJlc3Npb25SZXN1bHQgJiYgZWxlbWVudEhhc0FscmVhZHlCZWVuQWRkZWQpIHtcbiAgICAgIHRyYW5zaXRpb25PdXQoZWwubmV4dEVsZW1lbnRTaWJsaW5nLCAoKSA9PiB7XG4gICAgICAgIGVsLm5leHRFbGVtZW50U2libGluZy5yZW1vdmUoKTtcbiAgICAgIH0sICgpID0+IHt9LCBjb21wb25lbnQsIGluaXRpYWxVcGRhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyTGlzdGVuZXIoY29tcG9uZW50LCBlbCwgZXZlbnQsIG1vZGlmaWVycywgZXhwcmVzc2lvbiwgZXh0cmFWYXJzID0ge30pIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgcGFzc2l2ZTogbW9kaWZpZXJzLmluY2x1ZGVzKCdwYXNzaXZlJylcbiAgICB9O1xuXG4gICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcygnY2FtZWwnKSkge1xuICAgICAgZXZlbnQgPSBjYW1lbENhc2UoZXZlbnQpO1xuICAgIH1cblxuICAgIGxldCBoYW5kbGVyLCBsaXN0ZW5lclRhcmdldDtcblxuICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ2F3YXknKSkge1xuICAgICAgbGlzdGVuZXJUYXJnZXQgPSBkb2N1bWVudDtcblxuICAgICAgaGFuZGxlciA9IGUgPT4ge1xuICAgICAgICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiB0aGUgY2xpY2sgY2FtZSBmcm9tIHRoZSBlbGVtZW50IG9yIHdpdGhpbiBpdC5cbiAgICAgICAgaWYgKGVsLmNvbnRhaW5zKGUudGFyZ2V0KSkgcmV0dXJuOyAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiB0aGlzIGVsZW1lbnQgaXNuJ3QgY3VycmVudGx5IHZpc2libGUuXG5cbiAgICAgICAgaWYgKGVsLm9mZnNldFdpZHRoIDwgMSAmJiBlbC5vZmZzZXRIZWlnaHQgPCAxKSByZXR1cm47IC8vIE5vdyB0aGF0IHdlIGFyZSBzdXJlIHRoZSBlbGVtZW50IGlzIHZpc2libGUsIEFORCB0aGUgY2xpY2tcbiAgICAgICAgLy8gaXMgZnJvbSBvdXRzaWRlIGl0LCBsZXQncyBydW4gdGhlIGV4cHJlc3Npb24uXG5cbiAgICAgICAgcnVuTGlzdGVuZXJIYW5kbGVyKGNvbXBvbmVudCwgZXhwcmVzc2lvbiwgZSwgZXh0cmFWYXJzKTtcblxuICAgICAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKCdvbmNlJykpIHtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdGVuZXJUYXJnZXQgPSBtb2RpZmllcnMuaW5jbHVkZXMoJ3dpbmRvdycpID8gd2luZG93IDogbW9kaWZpZXJzLmluY2x1ZGVzKCdkb2N1bWVudCcpID8gZG9jdW1lbnQgOiBlbDtcblxuICAgICAgaGFuZGxlciA9IGUgPT4ge1xuICAgICAgICAvLyBSZW1vdmUgdGhpcyBnbG9iYWwgZXZlbnQgaGFuZGxlciBpZiB0aGUgZWxlbWVudCB0aGF0IGRlY2xhcmVkIGl0XG4gICAgICAgIC8vIGhhcyBiZWVuIHJlbW92ZWQuIEl0J3Mgbm93IHN0YWxlLlxuICAgICAgICBpZiAobGlzdGVuZXJUYXJnZXQgPT09IHdpbmRvdyB8fCBsaXN0ZW5lclRhcmdldCA9PT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICBpZiAoIWRvY3VtZW50LmJvZHkuY29udGFpbnMoZWwpKSB7XG4gICAgICAgICAgICBsaXN0ZW5lclRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNLZXlFdmVudChldmVudCkpIHtcbiAgICAgICAgICBpZiAoaXNMaXN0ZW5pbmdGb3JBU3BlY2lmaWNLZXlUaGF0SGFzbnRCZWVuUHJlc3NlZChlLCBtb2RpZmllcnMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcygncHJldmVudCcpKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ3N0b3AnKSkgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8gSWYgdGhlIC5zZWxmIG1vZGlmaWVyIGlzbid0IHByZXNlbnQsIG9yIGlmIGl0IGlzIHByZXNlbnQgYW5kXG4gICAgICAgIC8vIHRoZSB0YXJnZXQgZWxlbWVudCBtYXRjaGVzIHRoZSBlbGVtZW50IHdlIGFyZSByZWdpc3RlcmluZyB0aGVcbiAgICAgICAgLy8gZXZlbnQgb24sIHJ1biB0aGUgaGFuZGxlclxuXG4gICAgICAgIGlmICghbW9kaWZpZXJzLmluY2x1ZGVzKCdzZWxmJykgfHwgZS50YXJnZXQgPT09IGVsKSB7XG4gICAgICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPSBydW5MaXN0ZW5lckhhbmRsZXIoY29tcG9uZW50LCBleHByZXNzaW9uLCBlLCBleHRyYVZhcnMpO1xuICAgICAgICAgIHJldHVyblZhbHVlLnRoZW4odmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKCdvbmNlJykpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lclRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoJ2RlYm91bmNlJykpIHtcbiAgICAgIGxldCBuZXh0TW9kaWZpZXIgPSBtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2YoJ2RlYm91bmNlJykgKyAxXSB8fCAnaW52YWxpZC13YWl0JztcbiAgICAgIGxldCB3YWl0ID0gaXNOdW1lcmljKG5leHRNb2RpZmllci5zcGxpdCgnbXMnKVswXSkgPyBOdW1iZXIobmV4dE1vZGlmaWVyLnNwbGl0KCdtcycpWzBdKSA6IDI1MDtcbiAgICAgIGhhbmRsZXIgPSBkZWJvdW5jZShoYW5kbGVyLCB3YWl0KTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lclRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1bkxpc3RlbmVySGFuZGxlcihjb21wb25lbnQsIGV4cHJlc3Npb24sIGUsIGV4dHJhVmFycykge1xuICAgIHJldHVybiBjb21wb25lbnQuZXZhbHVhdGVDb21tYW5kRXhwcmVzc2lvbihlLnRhcmdldCwgZXhwcmVzc2lvbiwgKCkgPT4ge1xuICAgICAgcmV0dXJuIF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBleHRyYVZhcnMoKSksIHt9LCB7XG4gICAgICAgICckZXZlbnQnOiBlXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzS2V5RXZlbnQoZXZlbnQpIHtcbiAgICByZXR1cm4gWydrZXlkb3duJywgJ2tleXVwJ10uaW5jbHVkZXMoZXZlbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNMaXN0ZW5pbmdGb3JBU3BlY2lmaWNLZXlUaGF0SGFzbnRCZWVuUHJlc3NlZChlLCBtb2RpZmllcnMpIHtcbiAgICBsZXQga2V5TW9kaWZpZXJzID0gbW9kaWZpZXJzLmZpbHRlcihpID0+IHtcbiAgICAgIHJldHVybiAhWyd3aW5kb3cnLCAnZG9jdW1lbnQnLCAncHJldmVudCcsICdzdG9wJ10uaW5jbHVkZXMoaSk7XG4gICAgfSk7XG5cbiAgICBpZiAoa2V5TW9kaWZpZXJzLmluY2x1ZGVzKCdkZWJvdW5jZScpKSB7XG4gICAgICBsZXQgZGVib3VuY2VJbmRleCA9IGtleU1vZGlmaWVycy5pbmRleE9mKCdkZWJvdW5jZScpO1xuICAgICAga2V5TW9kaWZpZXJzLnNwbGljZShkZWJvdW5jZUluZGV4LCBpc051bWVyaWMoKGtleU1vZGlmaWVyc1tkZWJvdW5jZUluZGV4ICsgMV0gfHwgJ2ludmFsaWQtd2FpdCcpLnNwbGl0KCdtcycpWzBdKSA/IDIgOiAxKTtcbiAgICB9IC8vIElmIG5vIG1vZGlmaWVyIGlzIHNwZWNpZmllZCwgd2UnbGwgY2FsbCBpdCBhIHByZXNzLlxuXG5cbiAgICBpZiAoa2V5TW9kaWZpZXJzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlOyAvLyBJZiBvbmUgaXMgcGFzc2VkLCBBTkQgaXQgbWF0Y2hlcyB0aGUga2V5IHByZXNzZWQsIHdlJ2xsIGNhbGwgaXQgYSBwcmVzcy5cblxuICAgIGlmIChrZXlNb2RpZmllcnMubGVuZ3RoID09PSAxICYmIGtleU1vZGlmaWVyc1swXSA9PT0ga2V5VG9Nb2RpZmllcihlLmtleSkpIHJldHVybiBmYWxzZTsgLy8gVGhlIHVzZXIgaXMgbGlzdGVuaW5nIGZvciBrZXkgY29tYmluYXRpb25zLlxuXG4gICAgY29uc3Qgc3lzdGVtS2V5TW9kaWZpZXJzID0gWydjdHJsJywgJ3NoaWZ0JywgJ2FsdCcsICdtZXRhJywgJ2NtZCcsICdzdXBlciddO1xuICAgIGNvbnN0IHNlbGVjdGVkU3lzdGVtS2V5TW9kaWZpZXJzID0gc3lzdGVtS2V5TW9kaWZpZXJzLmZpbHRlcihtb2RpZmllciA9PiBrZXlNb2RpZmllcnMuaW5jbHVkZXMobW9kaWZpZXIpKTtcbiAgICBrZXlNb2RpZmllcnMgPSBrZXlNb2RpZmllcnMuZmlsdGVyKGkgPT4gIXNlbGVjdGVkU3lzdGVtS2V5TW9kaWZpZXJzLmluY2x1ZGVzKGkpKTtcblxuICAgIGlmIChzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBhY3RpdmVseVByZXNzZWRLZXlNb2RpZmllcnMgPSBzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycy5maWx0ZXIobW9kaWZpZXIgPT4ge1xuICAgICAgICAvLyBBbGlhcyBcImNtZFwiIGFuZCBcInN1cGVyXCIgdG8gXCJtZXRhXCJcbiAgICAgICAgaWYgKG1vZGlmaWVyID09PSAnY21kJyB8fCBtb2RpZmllciA9PT0gJ3N1cGVyJykgbW9kaWZpZXIgPSAnbWV0YSc7XG4gICAgICAgIHJldHVybiBlW2Ake21vZGlmaWVyfUtleWBdO1xuICAgICAgfSk7IC8vIElmIGFsbCB0aGUgbW9kaWZpZXJzIHNlbGVjdGVkIGFyZSBwcmVzc2VkLCAuLi5cblxuICAgICAgaWYgKGFjdGl2ZWx5UHJlc3NlZEtleU1vZGlmaWVycy5sZW5ndGggPT09IHNlbGVjdGVkU3lzdGVtS2V5TW9kaWZpZXJzLmxlbmd0aCkge1xuICAgICAgICAvLyBBTkQgdGhlIHJlbWFpbmluZyBrZXkgaXMgcHJlc3NlZCBhcyB3ZWxsLiBJdCdzIGEgcHJlc3MuXG4gICAgICAgIGlmIChrZXlNb2RpZmllcnNbMF0gPT09IGtleVRvTW9kaWZpZXIoZS5rZXkpKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSAvLyBXZSdsbCBjYWxsIGl0IE5PVCBhIHZhbGlkIGtleXByZXNzLlxuXG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGtleVRvTW9kaWZpZXIoa2V5KSB7XG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgJy8nOlxuICAgICAgICByZXR1cm4gJ3NsYXNoJztcblxuICAgICAgY2FzZSAnICc6XG4gICAgICBjYXNlICdTcGFjZWJhcic6XG4gICAgICAgIHJldHVybiAnc3BhY2UnO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4ga2V5ICYmIGtlYmFiQ2FzZShrZXkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyTW9kZWxMaXN0ZW5lcihjb21wb25lbnQsIGVsLCBtb2RpZmllcnMsIGV4cHJlc3Npb24sIGV4dHJhVmFycykge1xuICAgIC8vIElmIHRoZSBlbGVtZW50IHdlIGFyZSBiaW5kaW5nIHRvIGlzIGEgc2VsZWN0LCBhIHJhZGlvLCBvciBjaGVja2JveFxuICAgIC8vIHdlJ2xsIGxpc3RlbiBmb3IgdGhlIGNoYW5nZSBldmVudCBpbnN0ZWFkIG9mIHRoZSBcImlucHV0XCIgZXZlbnQuXG4gICAgdmFyIGV2ZW50ID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0JyB8fCBbJ2NoZWNrYm94JywgJ3JhZGlvJ10uaW5jbHVkZXMoZWwudHlwZSkgfHwgbW9kaWZpZXJzLmluY2x1ZGVzKCdsYXp5JykgPyAnY2hhbmdlJyA6ICdpbnB1dCc7XG4gICAgY29uc3QgbGlzdGVuZXJFeHByZXNzaW9uID0gYCR7ZXhwcmVzc2lvbn0gPSByaWdodFNpZGVPZkV4cHJlc3Npb24oJGV2ZW50LCAke2V4cHJlc3Npb259KWA7XG4gICAgcmVnaXN0ZXJMaXN0ZW5lcihjb21wb25lbnQsIGVsLCBldmVudCwgbW9kaWZpZXJzLCBsaXN0ZW5lckV4cHJlc3Npb24sICgpID0+IHtcbiAgICAgIHJldHVybiBfb2JqZWN0U3ByZWFkMihfb2JqZWN0U3ByZWFkMih7fSwgZXh0cmFWYXJzKCkpLCB7fSwge1xuICAgICAgICByaWdodFNpZGVPZkV4cHJlc3Npb246IGdlbmVyYXRlTW9kZWxBc3NpZ25tZW50RnVuY3Rpb24oZWwsIG1vZGlmaWVycywgZXhwcmVzc2lvbilcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVNb2RlbEFzc2lnbm1lbnRGdW5jdGlvbihlbCwgbW9kaWZpZXJzLCBleHByZXNzaW9uKSB7XG4gICAgaWYgKGVsLnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgIC8vIFJhZGlvIGJ1dHRvbnMgb25seSB3b3JrIHByb3Blcmx5IHdoZW4gdGhleSBzaGFyZSBhIG5hbWUgYXR0cmlidXRlLlxuICAgICAgLy8gUGVvcGxlIG1pZ2h0IGFzc3VtZSB3ZSB0YWtlIGNhcmUgb2YgdGhhdCBmb3IgdGhlbSwgYmVjYXVzZVxuICAgICAgLy8gdGhleSBhbHJlYWR5IHNldCBhIHNoYXJlZCBcIngtbW9kZWxcIiBhdHRyaWJ1dGUuXG4gICAgICBpZiAoIWVsLmhhc0F0dHJpYnV0ZSgnbmFtZScpKSBlbC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBleHByZXNzaW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKGV2ZW50LCBjdXJyZW50VmFsdWUpID0+IHtcbiAgICAgIC8vIENoZWNrIGZvciBldmVudC5kZXRhaWwgZHVlIHRvIGFuIGlzc3VlIHdoZXJlIElFMTEgaGFuZGxlcyBvdGhlciBldmVudHMgYXMgYSBDdXN0b21FdmVudC5cbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEN1c3RvbUV2ZW50ICYmIGV2ZW50LmRldGFpbCkge1xuICAgICAgICByZXR1cm4gZXZlbnQuZGV0YWlsO1xuICAgICAgfSBlbHNlIGlmIChlbC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgIC8vIElmIHRoZSBkYXRhIHdlIGFyZSBiaW5kaW5nIHRvIGlzIGFuIGFycmF5LCB0b2dnbGUgaXRzIHZhbHVlIGluc2lkZSB0aGUgYXJyYXkuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IG1vZGlmaWVycy5pbmNsdWRlcygnbnVtYmVyJykgPyBzYWZlUGFyc2VOdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlKSA6IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LmNoZWNrZWQgPyBjdXJyZW50VmFsdWUuY29uY2F0KFtuZXdWYWx1ZV0pIDogY3VycmVudFZhbHVlLmZpbHRlcihlbCA9PiAhY2hlY2tlZEF0dHJMb29zZUNvbXBhcmUoZWwsIG5ld1ZhbHVlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcgJiYgZWwubXVsdGlwbGUpIHtcbiAgICAgICAgcmV0dXJuIG1vZGlmaWVycy5pbmNsdWRlcygnbnVtYmVyJykgPyBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnMpLm1hcChvcHRpb24gPT4ge1xuICAgICAgICAgIGNvbnN0IHJhd1ZhbHVlID0gb3B0aW9uLnZhbHVlIHx8IG9wdGlvbi50ZXh0O1xuICAgICAgICAgIHJldHVybiBzYWZlUGFyc2VOdW1iZXIocmF3VmFsdWUpO1xuICAgICAgICB9KSA6IEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9ucykubWFwKG9wdGlvbiA9PiB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbi52YWx1ZSB8fCBvcHRpb24udGV4dDtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByYXdWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIG1vZGlmaWVycy5pbmNsdWRlcygnbnVtYmVyJykgPyBzYWZlUGFyc2VOdW1iZXIocmF3VmFsdWUpIDogbW9kaWZpZXJzLmluY2x1ZGVzKCd0cmltJykgPyByYXdWYWx1ZS50cmltKCkgOiByYXdWYWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2FmZVBhcnNlTnVtYmVyKHJhd1ZhbHVlKSB7XG4gICAgY29uc3QgbnVtYmVyID0gcmF3VmFsdWUgPyBwYXJzZUZsb2F0KHJhd1ZhbHVlKSA6IG51bGw7XG4gICAgcmV0dXJuIGlzTnVtZXJpYyhudW1iZXIpID8gbnVtYmVyIDogcmF3VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQ29weXJpZ2h0IChDKSAyMDE3IHNhbGVzZm9yY2UuY29tLCBpbmMuXG4gICAqL1xuICBjb25zdCB7IGlzQXJyYXkgfSA9IEFycmF5O1xuICBjb25zdCB7IGdldFByb3RvdHlwZU9mLCBjcmVhdGU6IE9iamVjdENyZWF0ZSwgZGVmaW5lUHJvcGVydHk6IE9iamVjdERlZmluZVByb3BlcnR5LCBkZWZpbmVQcm9wZXJ0aWVzOiBPYmplY3REZWZpbmVQcm9wZXJ0aWVzLCBpc0V4dGVuc2libGUsIGdldE93blByb3BlcnR5RGVzY3JpcHRvciwgZ2V0T3duUHJvcGVydHlOYW1lcywgZ2V0T3duUHJvcGVydHlTeW1ib2xzLCBwcmV2ZW50RXh0ZW5zaW9ucywgaGFzT3duUHJvcGVydHksIH0gPSBPYmplY3Q7XG4gIGNvbnN0IHsgcHVzaDogQXJyYXlQdXNoLCBjb25jYXQ6IEFycmF5Q29uY2F0LCBtYXA6IEFycmF5TWFwLCB9ID0gQXJyYXkucHJvdG90eXBlO1xuICBmdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZDtcbiAgfVxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbic7XG4gIH1cbiAgZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCc7XG4gIH1cbiAgY29uc3QgcHJveHlUb1ZhbHVlTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgZnVuY3Rpb24gcmVnaXN0ZXJQcm94eShwcm94eSwgdmFsdWUpIHtcbiAgICAgIHByb3h5VG9WYWx1ZU1hcC5zZXQocHJveHksIHZhbHVlKTtcbiAgfVxuICBjb25zdCB1bndyYXAgPSAocmVwbGljYU9yQW55KSA9PiBwcm94eVRvVmFsdWVNYXAuZ2V0KHJlcGxpY2FPckFueSkgfHwgcmVwbGljYU9yQW55O1xuXG4gIGZ1bmN0aW9uIHdyYXBWYWx1ZShtZW1icmFuZSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBtZW1icmFuZS52YWx1ZUlzT2JzZXJ2YWJsZSh2YWx1ZSkgPyBtZW1icmFuZS5nZXRQcm94eSh2YWx1ZSkgOiB2YWx1ZTtcbiAgfVxuICAvKipcbiAgICogVW53cmFwIHByb3BlcnR5IGRlc2NyaXB0b3JzIHdpbGwgc2V0IHZhbHVlIG9uIG9yaWdpbmFsIGRlc2NyaXB0b3JcbiAgICogV2Ugb25seSBuZWVkIHRvIHVud3JhcCBpZiB2YWx1ZSBpcyBzcGVjaWZpZWRcbiAgICogQHBhcmFtIGRlc2NyaXB0b3IgZXh0ZXJuYWwgZGVzY3JwaXRvciBwcm92aWRlZCB0byBkZWZpbmUgbmV3IHByb3BlcnR5IG9uIG9yaWdpbmFsIHZhbHVlXG4gICAqL1xuICBmdW5jdGlvbiB1bndyYXBEZXNjcmlwdG9yKGRlc2NyaXB0b3IpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGRlc2NyaXB0b3IsICd2YWx1ZScpKSB7XG4gICAgICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IHVud3JhcChkZXNjcmlwdG9yLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICB9XG4gIGZ1bmN0aW9uIGxvY2tTaGFkb3dUYXJnZXQobWVtYnJhbmUsIHNoYWRvd1RhcmdldCwgb3JpZ2luYWxUYXJnZXQpIHtcbiAgICAgIGNvbnN0IHRhcmdldEtleXMgPSBBcnJheUNvbmNhdC5jYWxsKGdldE93blByb3BlcnR5TmFtZXMob3JpZ2luYWxUYXJnZXQpLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMob3JpZ2luYWxUYXJnZXQpKTtcbiAgICAgIHRhcmdldEtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgbGV0IGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgLy8gV2UgZG8gbm90IG5lZWQgdG8gd3JhcCB0aGUgZGVzY3JpcHRvciBpZiBjb25maWd1cmFibGVcbiAgICAgICAgICAvLyBCZWNhdXNlIHdlIGNhbiBkZWFsIHdpdGggd3JhcHBpbmcgaXQgd2hlbiB1c2VyIGdvZXMgdGhyb3VnaFxuICAgICAgICAgIC8vIEdldCBvd24gcHJvcGVydHkgZGVzY3JpcHRvci4gVGhlcmUgaXMgYWxzbyBhIGNoYW5jZSB0aGF0IHRoaXMgZGVzY3JpcHRvclxuICAgICAgICAgIC8vIGNvdWxkIGNoYW5nZSBzb21ldGltZSBpbiB0aGUgZnV0dXJlLCBzbyB3ZSBjYW4gZGVmZXIgd3JhcHBpbmdcbiAgICAgICAgICAvLyB1bnRpbCB3ZSBuZWVkIHRvXG4gICAgICAgICAgaWYgKCFkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgICAgICAgICBkZXNjcmlwdG9yID0gd3JhcERlc2NyaXB0b3IobWVtYnJhbmUsIGRlc2NyaXB0b3IsIHdyYXBWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KHNoYWRvd1RhcmdldCwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgIH0pO1xuICAgICAgcHJldmVudEV4dGVuc2lvbnMoc2hhZG93VGFyZ2V0KTtcbiAgfVxuICBjbGFzcyBSZWFjdGl2ZVByb3h5SGFuZGxlciB7XG4gICAgICBjb25zdHJ1Y3RvcihtZW1icmFuZSwgdmFsdWUpIHtcbiAgICAgICAgICB0aGlzLm9yaWdpbmFsVGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgICAgdGhpcy5tZW1icmFuZSA9IG1lbWJyYW5lO1xuICAgICAgfVxuICAgICAgZ2V0KHNoYWRvd1RhcmdldCwga2V5KSB7XG4gICAgICAgICAgY29uc3QgeyBvcmlnaW5hbFRhcmdldCwgbWVtYnJhbmUgfSA9IHRoaXM7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBvcmlnaW5hbFRhcmdldFtrZXldO1xuICAgICAgICAgIGNvbnN0IHsgdmFsdWVPYnNlcnZlZCB9ID0gbWVtYnJhbmU7XG4gICAgICAgICAgdmFsdWVPYnNlcnZlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICByZXR1cm4gbWVtYnJhbmUuZ2V0UHJveHkodmFsdWUpO1xuICAgICAgfVxuICAgICAgc2V0KHNoYWRvd1RhcmdldCwga2V5LCB2YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHsgb3JpZ2luYWxUYXJnZXQsIG1lbWJyYW5lOiB7IHZhbHVlTXV0YXRlZCB9IH0gPSB0aGlzO1xuICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gb3JpZ2luYWxUYXJnZXRba2V5XTtcbiAgICAgICAgICBpZiAob2xkVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIG9yaWdpbmFsVGFyZ2V0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgdmFsdWVNdXRhdGVkKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdsZW5ndGgnICYmIGlzQXJyYXkob3JpZ2luYWxUYXJnZXQpKSB7XG4gICAgICAgICAgICAgIC8vIGZpeCBmb3IgaXNzdWUgIzIzNjogcHVzaCB3aWxsIGFkZCB0aGUgbmV3IGluZGV4LCBhbmQgYnkgdGhlIHRpbWUgbGVuZ3RoXG4gICAgICAgICAgICAgIC8vIGlzIHVwZGF0ZWQsIHRoZSBpbnRlcm5hbCBsZW5ndGggaXMgYWxyZWFkeSBlcXVhbCB0byB0aGUgbmV3IGxlbmd0aCB2YWx1ZVxuICAgICAgICAgICAgICAvLyB0aGVyZWZvcmUsIHRoZSBvbGRWYWx1ZSBpcyBlcXVhbCB0byB0aGUgdmFsdWUuIFRoaXMgaXMgdGhlIGZvcmtpbmcgbG9naWNcbiAgICAgICAgICAgICAgLy8gdG8gc3VwcG9ydCB0aGlzIHVzZSBjYXNlLlxuICAgICAgICAgICAgICB2YWx1ZU11dGF0ZWQob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgZGVsZXRlUHJvcGVydHkoc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZTogeyB2YWx1ZU11dGF0ZWQgfSB9ID0gdGhpcztcbiAgICAgICAgICBkZWxldGUgb3JpZ2luYWxUYXJnZXRba2V5XTtcbiAgICAgICAgICB2YWx1ZU11dGF0ZWQob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBhcHBseShzaGFkb3dUYXJnZXQsIHRoaXNBcmcsIGFyZ0FycmF5KSB7XG4gICAgICAgICAgLyogTm8gb3AgKi9cbiAgICAgIH1cbiAgICAgIGNvbnN0cnVjdCh0YXJnZXQsIGFyZ0FycmF5LCBuZXdUYXJnZXQpIHtcbiAgICAgICAgICAvKiBObyBvcCAqL1xuICAgICAgfVxuICAgICAgaGFzKHNoYWRvd1RhcmdldCwga2V5KSB7XG4gICAgICAgICAgY29uc3QgeyBvcmlnaW5hbFRhcmdldCwgbWVtYnJhbmU6IHsgdmFsdWVPYnNlcnZlZCB9IH0gPSB0aGlzO1xuICAgICAgICAgIHZhbHVlT2JzZXJ2ZWQob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgcmV0dXJuIGtleSBpbiBvcmlnaW5hbFRhcmdldDtcbiAgICAgIH1cbiAgICAgIG93bktleXMoc2hhZG93VGFyZ2V0KSB7XG4gICAgICAgICAgY29uc3QgeyBvcmlnaW5hbFRhcmdldCB9ID0gdGhpcztcbiAgICAgICAgICByZXR1cm4gQXJyYXlDb25jYXQuY2FsbChnZXRPd25Qcm9wZXJ0eU5hbWVzKG9yaWdpbmFsVGFyZ2V0KSwgZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9yaWdpbmFsVGFyZ2V0KSk7XG4gICAgICB9XG4gICAgICBpc0V4dGVuc2libGUoc2hhZG93VGFyZ2V0KSB7XG4gICAgICAgICAgY29uc3Qgc2hhZG93SXNFeHRlbnNpYmxlID0gaXNFeHRlbnNpYmxlKHNoYWRvd1RhcmdldCk7XG4gICAgICAgICAgaWYgKCFzaGFkb3dJc0V4dGVuc2libGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNoYWRvd0lzRXh0ZW5zaWJsZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgeyBvcmlnaW5hbFRhcmdldCwgbWVtYnJhbmUgfSA9IHRoaXM7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0SXNFeHRlbnNpYmxlID0gaXNFeHRlbnNpYmxlKG9yaWdpbmFsVGFyZ2V0KTtcbiAgICAgICAgICBpZiAoIXRhcmdldElzRXh0ZW5zaWJsZSkge1xuICAgICAgICAgICAgICBsb2NrU2hhZG93VGFyZ2V0KG1lbWJyYW5lLCBzaGFkb3dUYXJnZXQsIG9yaWdpbmFsVGFyZ2V0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRhcmdldElzRXh0ZW5zaWJsZTtcbiAgICAgIH1cbiAgICAgIHNldFByb3RvdHlwZU9mKHNoYWRvd1RhcmdldCwgcHJvdG90eXBlKSB7XG4gICAgICB9XG4gICAgICBnZXRQcm90b3R5cGVPZihzaGFkb3dUYXJnZXQpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0IH0gPSB0aGlzO1xuICAgICAgICAgIHJldHVybiBnZXRQcm90b3R5cGVPZihvcmlnaW5hbFRhcmdldCk7XG4gICAgICB9XG4gICAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZSB9ID0gdGhpcztcbiAgICAgICAgICBjb25zdCB7IHZhbHVlT2JzZXJ2ZWQgfSA9IHRoaXMubWVtYnJhbmU7XG4gICAgICAgICAgLy8ga2V5cyBsb29rZWQgdXAgdmlhIGhhc093blByb3BlcnR5IG5lZWQgdG8gYmUgcmVhY3RpdmVcbiAgICAgICAgICB2YWx1ZU9ic2VydmVkKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIGxldCBkZXNjID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIGlmIChpc1VuZGVmaW5lZChkZXNjKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZGVzYztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3Qgc2hhZG93RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzaGFkb3dUYXJnZXQsIGtleSk7XG4gICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChzaGFkb3dEZXNjcmlwdG9yKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2hhZG93RGVzY3JpcHRvcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTm90ZTogYnkgYWNjZXNzaW5nIHRoZSBkZXNjcmlwdG9yLCB0aGUga2V5IGlzIG1hcmtlZCBhcyBvYnNlcnZlZFxuICAgICAgICAgIC8vIGJ1dCBhY2Nlc3MgdG8gdGhlIHZhbHVlLCBzZXR0ZXIgb3IgZ2V0dGVyIChpZiBhdmFpbGFibGUpIGNhbm5vdCBvYnNlcnZlXG4gICAgICAgICAgLy8gbXV0YXRpb25zLCBqdXN0IGxpa2UgcmVndWxhciBtZXRob2RzLCBpbiB3aGljaCBjYXNlIHdlIGp1c3QgZG8gbm90aGluZy5cbiAgICAgICAgICBkZXNjID0gd3JhcERlc2NyaXB0b3IobWVtYnJhbmUsIGRlc2MsIHdyYXBWYWx1ZSk7XG4gICAgICAgICAgaWYgKCFkZXNjLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgICAgICAgICAvLyBJZiBkZXNjcmlwdG9yIGZyb20gb3JpZ2luYWwgdGFyZ2V0IGlzIG5vdCBjb25maWd1cmFibGUsXG4gICAgICAgICAgICAgIC8vIFdlIG11c3QgY29weSB0aGUgd3JhcHBlZCBkZXNjcmlwdG9yIG92ZXIgdG8gdGhlIHNoYWRvdyB0YXJnZXQuXG4gICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgcHJveHkgd2lsbCB0aHJvdyBhbiBpbnZhcmlhbnQgZXJyb3IuXG4gICAgICAgICAgICAgIC8vIFRoaXMgaXMgb3VyIGxhc3QgY2hhbmNlIHRvIGxvY2sgdGhlIHZhbHVlLlxuICAgICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9Qcm94eS9oYW5kbGVyL2dldE93blByb3BlcnR5RGVzY3JpcHRvciNJbnZhcmlhbnRzXG4gICAgICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KHNoYWRvd1RhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGRlc2M7XG4gICAgICB9XG4gICAgICBwcmV2ZW50RXh0ZW5zaW9ucyhzaGFkb3dUYXJnZXQpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZSB9ID0gdGhpcztcbiAgICAgICAgICBsb2NrU2hhZG93VGFyZ2V0KG1lbWJyYW5lLCBzaGFkb3dUYXJnZXQsIG9yaWdpbmFsVGFyZ2V0KTtcbiAgICAgICAgICBwcmV2ZW50RXh0ZW5zaW9ucyhvcmlnaW5hbFRhcmdldCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBkZWZpbmVQcm9wZXJ0eShzaGFkb3dUYXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICAgICAgICAgIGNvbnN0IHsgb3JpZ2luYWxUYXJnZXQsIG1lbWJyYW5lIH0gPSB0aGlzO1xuICAgICAgICAgIGNvbnN0IHsgdmFsdWVNdXRhdGVkIH0gPSBtZW1icmFuZTtcbiAgICAgICAgICBjb25zdCB7IGNvbmZpZ3VyYWJsZSB9ID0gZGVzY3JpcHRvcjtcbiAgICAgICAgICAvLyBXZSBoYXZlIHRvIGNoZWNrIGZvciB2YWx1ZSBpbiBkZXNjcmlwdG9yXG4gICAgICAgICAgLy8gYmVjYXVzZSBPYmplY3QuZnJlZXplKHByb3h5KSBjYWxscyB0aGlzIG1ldGhvZFxuICAgICAgICAgIC8vIHdpdGggb25seSB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIHdyaXRlYWJsZTogZmFsc2UgfVxuICAgICAgICAgIC8vIEFkZGl0aW9uYWxseSwgbWV0aG9kIHdpbGwgb25seSBiZSBjYWxsZWQgd2l0aCB3cml0ZWFibGU6ZmFsc2VcbiAgICAgICAgICAvLyBpZiB0aGUgZGVzY3JpcHRvciBoYXMgYSB2YWx1ZSwgYXMgb3Bwb3NlZCB0byBnZXR0ZXIvc2V0dGVyXG4gICAgICAgICAgLy8gU28gd2UgY2FuIGp1c3QgY2hlY2sgaWYgd3JpdGFibGUgaXMgcHJlc2VudCBhbmQgdGhlbiBzZWUgaWZcbiAgICAgICAgICAvLyB2YWx1ZSBpcyBwcmVzZW50LiBUaGlzIGVsaW1pbmF0ZXMgZ2V0dGVyIGFuZCBzZXR0ZXIgZGVzY3JpcHRvcnNcbiAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChkZXNjcmlwdG9yLCAnd3JpdGFibGUnKSAmJiAhaGFzT3duUHJvcGVydHkuY2FsbChkZXNjcmlwdG9yLCAndmFsdWUnKSkge1xuICAgICAgICAgICAgICBjb25zdCBvcmlnaW5hbERlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob3JpZ2luYWxUYXJnZXQsIGtleSk7XG4gICAgICAgICAgICAgIGRlc2NyaXB0b3IudmFsdWUgPSBvcmlnaW5hbERlc2NyaXB0b3IudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KG9yaWdpbmFsVGFyZ2V0LCBrZXksIHVud3JhcERlc2NyaXB0b3IoZGVzY3JpcHRvcikpO1xuICAgICAgICAgIGlmIChjb25maWd1cmFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KHNoYWRvd1RhcmdldCwga2V5LCB3cmFwRGVzY3JpcHRvcihtZW1icmFuZSwgZGVzY3JpcHRvciwgd3JhcFZhbHVlKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlTXV0YXRlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXBSZWFkT25seVZhbHVlKG1lbWJyYW5lLCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG1lbWJyYW5lLnZhbHVlSXNPYnNlcnZhYmxlKHZhbHVlKSA/IG1lbWJyYW5lLmdldFJlYWRPbmx5UHJveHkodmFsdWUpIDogdmFsdWU7XG4gIH1cbiAgY2xhc3MgUmVhZE9ubHlIYW5kbGVyIHtcbiAgICAgIGNvbnN0cnVjdG9yKG1lbWJyYW5lLCB2YWx1ZSkge1xuICAgICAgICAgIHRoaXMub3JpZ2luYWxUYXJnZXQgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLm1lbWJyYW5lID0gbWVtYnJhbmU7XG4gICAgICB9XG4gICAgICBnZXQoc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG1lbWJyYW5lLCBvcmlnaW5hbFRhcmdldCB9ID0gdGhpcztcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IG9yaWdpbmFsVGFyZ2V0W2tleV07XG4gICAgICAgICAgY29uc3QgeyB2YWx1ZU9ic2VydmVkIH0gPSBtZW1icmFuZTtcbiAgICAgICAgICB2YWx1ZU9ic2VydmVkKG9yaWdpbmFsVGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIHJldHVybiBtZW1icmFuZS5nZXRSZWFkT25seVByb3h5KHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHNldChzaGFkb3dUYXJnZXQsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBkZWxldGVQcm9wZXJ0eShzaGFkb3dUYXJnZXQsIGtleSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGFwcGx5KHNoYWRvd1RhcmdldCwgdGhpc0FyZywgYXJnQXJyYXkpIHtcbiAgICAgICAgICAvKiBObyBvcCAqL1xuICAgICAgfVxuICAgICAgY29uc3RydWN0KHRhcmdldCwgYXJnQXJyYXksIG5ld1RhcmdldCkge1xuICAgICAgICAgIC8qIE5vIG9wICovXG4gICAgICB9XG4gICAgICBoYXMoc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZTogeyB2YWx1ZU9ic2VydmVkIH0gfSA9IHRoaXM7XG4gICAgICAgICAgdmFsdWVPYnNlcnZlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICByZXR1cm4ga2V5IGluIG9yaWdpbmFsVGFyZ2V0O1xuICAgICAgfVxuICAgICAgb3duS2V5cyhzaGFkb3dUYXJnZXQpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0IH0gPSB0aGlzO1xuICAgICAgICAgIHJldHVybiBBcnJheUNvbmNhdC5jYWxsKGdldE93blByb3BlcnR5TmFtZXMob3JpZ2luYWxUYXJnZXQpLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMob3JpZ2luYWxUYXJnZXQpKTtcbiAgICAgIH1cbiAgICAgIHNldFByb3RvdHlwZU9mKHNoYWRvd1RhcmdldCwgcHJvdG90eXBlKSB7XG4gICAgICB9XG4gICAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc2hhZG93VGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICBjb25zdCB7IG9yaWdpbmFsVGFyZ2V0LCBtZW1icmFuZSB9ID0gdGhpcztcbiAgICAgICAgICBjb25zdCB7IHZhbHVlT2JzZXJ2ZWQgfSA9IG1lbWJyYW5lO1xuICAgICAgICAgIC8vIGtleXMgbG9va2VkIHVwIHZpYSBoYXNPd25Qcm9wZXJ0eSBuZWVkIHRvIGJlIHJlYWN0aXZlXG4gICAgICAgICAgdmFsdWVPYnNlcnZlZChvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICBsZXQgZGVzYyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvcmlnaW5hbFRhcmdldCwga2V5KTtcbiAgICAgICAgICBpZiAoaXNVbmRlZmluZWQoZGVzYykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRlc2M7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHNoYWRvd0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc2hhZG93VGFyZ2V0LCBrZXkpO1xuICAgICAgICAgIGlmICghaXNVbmRlZmluZWQoc2hhZG93RGVzY3JpcHRvcikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNoYWRvd0Rlc2NyaXB0b3I7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIE5vdGU6IGJ5IGFjY2Vzc2luZyB0aGUgZGVzY3JpcHRvciwgdGhlIGtleSBpcyBtYXJrZWQgYXMgb2JzZXJ2ZWRcbiAgICAgICAgICAvLyBidXQgYWNjZXNzIHRvIHRoZSB2YWx1ZSBvciBnZXR0ZXIgKGlmIGF2YWlsYWJsZSkgY2Fubm90IGJlIG9ic2VydmVkLFxuICAgICAgICAgIC8vIGp1c3QgbGlrZSByZWd1bGFyIG1ldGhvZHMsIGluIHdoaWNoIGNhc2Ugd2UganVzdCBkbyBub3RoaW5nLlxuICAgICAgICAgIGRlc2MgPSB3cmFwRGVzY3JpcHRvcihtZW1icmFuZSwgZGVzYywgd3JhcFJlYWRPbmx5VmFsdWUpO1xuICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGRlc2MsICdzZXQnKSkge1xuICAgICAgICAgICAgICBkZXNjLnNldCA9IHVuZGVmaW5lZDsgLy8gcmVhZE9ubHkgbWVtYnJhbmUgZG9lcyBub3QgYWxsb3cgc2V0dGVyc1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWRlc2MuY29uZmlndXJhYmxlKSB7XG4gICAgICAgICAgICAgIC8vIElmIGRlc2NyaXB0b3IgZnJvbSBvcmlnaW5hbCB0YXJnZXQgaXMgbm90IGNvbmZpZ3VyYWJsZSxcbiAgICAgICAgICAgICAgLy8gV2UgbXVzdCBjb3B5IHRoZSB3cmFwcGVkIGRlc2NyaXB0b3Igb3ZlciB0byB0aGUgc2hhZG93IHRhcmdldC5cbiAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBwcm94eSB3aWxsIHRocm93IGFuIGludmFyaWFudCBlcnJvci5cbiAgICAgICAgICAgICAgLy8gVGhpcyBpcyBvdXIgbGFzdCBjaGFuY2UgdG8gbG9jayB0aGUgdmFsdWUuXG4gICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1Byb3h5L2hhbmRsZXIvZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yI0ludmFyaWFudHNcbiAgICAgICAgICAgICAgT2JqZWN0RGVmaW5lUHJvcGVydHkoc2hhZG93VGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGVzYztcbiAgICAgIH1cbiAgICAgIHByZXZlbnRFeHRlbnNpb25zKHNoYWRvd1RhcmdldCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGRlZmluZVByb3BlcnR5KHNoYWRvd1RhcmdldCwga2V5LCBkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYWRvd1RhcmdldCh2YWx1ZSkge1xuICAgICAgbGV0IHNoYWRvd1RhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIHNoYWRvd1RhcmdldCA9IFtdO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgc2hhZG93VGFyZ2V0ID0ge307XG4gICAgICB9XG4gICAgICByZXR1cm4gc2hhZG93VGFyZ2V0O1xuICB9XG4gIGNvbnN0IE9iamVjdERvdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG4gIGZ1bmN0aW9uIGRlZmF1bHRWYWx1ZUlzT2JzZXJ2YWJsZSh2YWx1ZSkge1xuICAgICAgLy8gaW50ZW50aW9uYWxseSBjaGVja2luZyBmb3IgbnVsbFxuICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdHJlYXQgYWxsIG5vbi1vYmplY3QgdHlwZXMsIGluY2x1ZGluZyB1bmRlZmluZWQsIGFzIG5vbi1vYnNlcnZhYmxlIHZhbHVlc1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByb3RvID0gZ2V0UHJvdG90eXBlT2YodmFsdWUpO1xuICAgICAgcmV0dXJuIChwcm90byA9PT0gT2JqZWN0RG90UHJvdG90eXBlIHx8IHByb3RvID09PSBudWxsIHx8IGdldFByb3RvdHlwZU9mKHByb3RvKSA9PT0gbnVsbCk7XG4gIH1cbiAgY29uc3QgZGVmYXVsdFZhbHVlT2JzZXJ2ZWQgPSAob2JqLCBrZXkpID0+IHtcbiAgICAgIC8qIGRvIG5vdGhpbmcgKi9cbiAgfTtcbiAgY29uc3QgZGVmYXVsdFZhbHVlTXV0YXRlZCA9IChvYmosIGtleSkgPT4ge1xuICAgICAgLyogZG8gbm90aGluZyAqL1xuICB9O1xuICBjb25zdCBkZWZhdWx0VmFsdWVEaXN0b3J0aW9uID0gKHZhbHVlKSA9PiB2YWx1ZTtcbiAgZnVuY3Rpb24gd3JhcERlc2NyaXB0b3IobWVtYnJhbmUsIGRlc2NyaXB0b3IsIGdldFZhbHVlKSB7XG4gICAgICBjb25zdCB7IHNldCwgZ2V0IH0gPSBkZXNjcmlwdG9yO1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZGVzY3JpcHRvciwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICBkZXNjcmlwdG9yLnZhbHVlID0gZ2V0VmFsdWUobWVtYnJhbmUsIGRlc2NyaXB0b3IudmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChnZXQpKSB7XG4gICAgICAgICAgICAgIGRlc2NyaXB0b3IuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgLy8gaW52b2tpbmcgdGhlIG9yaWdpbmFsIGdldHRlciB3aXRoIHRoZSBvcmlnaW5hbCB0YXJnZXRcbiAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRWYWx1ZShtZW1icmFuZSwgZ2V0LmNhbGwodW53cmFwKHRoaXMpKSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghaXNVbmRlZmluZWQoc2V0KSkge1xuICAgICAgICAgICAgICBkZXNjcmlwdG9yLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgLy8gQXQgdGhpcyBwb2ludCB3ZSBkb24ndCBoYXZlIGEgY2xlYXIgaW5kaWNhdGlvbiBvZiB3aGV0aGVyXG4gICAgICAgICAgICAgICAgICAvLyBvciBub3QgYSB2YWxpZCBtdXRhdGlvbiB3aWxsIG9jY3VyLCB3ZSBkb24ndCBoYXZlIHRoZSBrZXksXG4gICAgICAgICAgICAgICAgICAvLyBhbmQgd2UgYXJlIG5vdCBzdXJlIHdoeSBhbmQgaG93IHRoZXkgYXJlIGludm9raW5nIHRoaXMgc2V0dGVyLlxuICAgICAgICAgICAgICAgICAgLy8gTmV2ZXJ0aGVsZXNzIHdlIHByZXNlcnZlIHRoZSBvcmlnaW5hbCBzZW1hbnRpY3MgYnkgaW52b2tpbmcgdGhlXG4gICAgICAgICAgICAgICAgICAvLyBvcmlnaW5hbCBzZXR0ZXIgd2l0aCB0aGUgb3JpZ2luYWwgdGFyZ2V0IGFuZCB0aGUgdW53cmFwcGVkIHZhbHVlXG4gICAgICAgICAgICAgICAgICBzZXQuY2FsbCh1bndyYXAodGhpcyksIG1lbWJyYW5lLnVud3JhcFByb3h5KHZhbHVlKSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gIH1cbiAgY2xhc3MgUmVhY3RpdmVNZW1icmFuZSB7XG4gICAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgICAgdGhpcy52YWx1ZURpc3RvcnRpb24gPSBkZWZhdWx0VmFsdWVEaXN0b3J0aW9uO1xuICAgICAgICAgIHRoaXMudmFsdWVNdXRhdGVkID0gZGVmYXVsdFZhbHVlTXV0YXRlZDtcbiAgICAgICAgICB0aGlzLnZhbHVlT2JzZXJ2ZWQgPSBkZWZhdWx0VmFsdWVPYnNlcnZlZDtcbiAgICAgICAgICB0aGlzLnZhbHVlSXNPYnNlcnZhYmxlID0gZGVmYXVsdFZhbHVlSXNPYnNlcnZhYmxlO1xuICAgICAgICAgIHRoaXMub2JqZWN0R3JhcGggPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICAgIGlmICghaXNVbmRlZmluZWQob3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgY29uc3QgeyB2YWx1ZURpc3RvcnRpb24sIHZhbHVlTXV0YXRlZCwgdmFsdWVPYnNlcnZlZCwgdmFsdWVJc09ic2VydmFibGUgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgIHRoaXMudmFsdWVEaXN0b3J0aW9uID0gaXNGdW5jdGlvbih2YWx1ZURpc3RvcnRpb24pID8gdmFsdWVEaXN0b3J0aW9uIDogZGVmYXVsdFZhbHVlRGlzdG9ydGlvbjtcbiAgICAgICAgICAgICAgdGhpcy52YWx1ZU11dGF0ZWQgPSBpc0Z1bmN0aW9uKHZhbHVlTXV0YXRlZCkgPyB2YWx1ZU11dGF0ZWQgOiBkZWZhdWx0VmFsdWVNdXRhdGVkO1xuICAgICAgICAgICAgICB0aGlzLnZhbHVlT2JzZXJ2ZWQgPSBpc0Z1bmN0aW9uKHZhbHVlT2JzZXJ2ZWQpID8gdmFsdWVPYnNlcnZlZCA6IGRlZmF1bHRWYWx1ZU9ic2VydmVkO1xuICAgICAgICAgICAgICB0aGlzLnZhbHVlSXNPYnNlcnZhYmxlID0gaXNGdW5jdGlvbih2YWx1ZUlzT2JzZXJ2YWJsZSkgPyB2YWx1ZUlzT2JzZXJ2YWJsZSA6IGRlZmF1bHRWYWx1ZUlzT2JzZXJ2YWJsZTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBnZXRQcm94eSh2YWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHVud3JhcHBlZFZhbHVlID0gdW53cmFwKHZhbHVlKTtcbiAgICAgICAgICBjb25zdCBkaXN0b3J0ZWQgPSB0aGlzLnZhbHVlRGlzdG9ydGlvbih1bndyYXBwZWRWYWx1ZSk7XG4gICAgICAgICAgaWYgKHRoaXMudmFsdWVJc09ic2VydmFibGUoZGlzdG9ydGVkKSkge1xuICAgICAgICAgICAgICBjb25zdCBvID0gdGhpcy5nZXRSZWFjdGl2ZVN0YXRlKHVud3JhcHBlZFZhbHVlLCBkaXN0b3J0ZWQpO1xuICAgICAgICAgICAgICAvLyB3aGVuIHRyeWluZyB0byBleHRyYWN0IHRoZSB3cml0YWJsZSB2ZXJzaW9uIG9mIGEgcmVhZG9ubHlcbiAgICAgICAgICAgICAgLy8gd2UgcmV0dXJuIHRoZSByZWFkb25seS5cbiAgICAgICAgICAgICAgcmV0dXJuIG8ucmVhZE9ubHkgPT09IHZhbHVlID8gdmFsdWUgOiBvLnJlYWN0aXZlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGlzdG9ydGVkO1xuICAgICAgfVxuICAgICAgZ2V0UmVhZE9ubHlQcm94eSh2YWx1ZSkge1xuICAgICAgICAgIHZhbHVlID0gdW53cmFwKHZhbHVlKTtcbiAgICAgICAgICBjb25zdCBkaXN0b3J0ZWQgPSB0aGlzLnZhbHVlRGlzdG9ydGlvbih2YWx1ZSk7XG4gICAgICAgICAgaWYgKHRoaXMudmFsdWVJc09ic2VydmFibGUoZGlzdG9ydGVkKSkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZWFjdGl2ZVN0YXRlKHZhbHVlLCBkaXN0b3J0ZWQpLnJlYWRPbmx5O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZGlzdG9ydGVkO1xuICAgICAgfVxuICAgICAgdW53cmFwUHJveHkocCkge1xuICAgICAgICAgIHJldHVybiB1bndyYXAocCk7XG4gICAgICB9XG4gICAgICBnZXRSZWFjdGl2ZVN0YXRlKHZhbHVlLCBkaXN0b3J0ZWRWYWx1ZSkge1xuICAgICAgICAgIGNvbnN0IHsgb2JqZWN0R3JhcGgsIH0gPSB0aGlzO1xuICAgICAgICAgIGxldCByZWFjdGl2ZVN0YXRlID0gb2JqZWN0R3JhcGguZ2V0KGRpc3RvcnRlZFZhbHVlKTtcbiAgICAgICAgICBpZiAocmVhY3RpdmVTdGF0ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVhY3RpdmVTdGF0ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbWVtYnJhbmUgPSB0aGlzO1xuICAgICAgICAgIHJlYWN0aXZlU3RhdGUgPSB7XG4gICAgICAgICAgICAgIGdldCByZWFjdGl2ZSgpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlYWN0aXZlSGFuZGxlciA9IG5ldyBSZWFjdGl2ZVByb3h5SGFuZGxlcihtZW1icmFuZSwgZGlzdG9ydGVkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgLy8gY2FjaGluZyB0aGUgcmVhY3RpdmUgcHJveHkgYWZ0ZXIgdGhlIGZpcnN0IHRpbWUgaXQgaXMgYWNjZXNzZWRcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KGNyZWF0ZVNoYWRvd1RhcmdldChkaXN0b3J0ZWRWYWx1ZSksIHJlYWN0aXZlSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICByZWdpc3RlclByb3h5KHByb3h5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBPYmplY3REZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmVhY3RpdmUnLCB7IHZhbHVlOiBwcm94eSB9KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwcm94eTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZ2V0IHJlYWRPbmx5KCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVhZE9ubHlIYW5kbGVyID0gbmV3IFJlYWRPbmx5SGFuZGxlcihtZW1icmFuZSwgZGlzdG9ydGVkVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgLy8gY2FjaGluZyB0aGUgcmVhZE9ubHkgcHJveHkgYWZ0ZXIgdGhlIGZpcnN0IHRpbWUgaXQgaXMgYWNjZXNzZWRcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3h5ID0gbmV3IFByb3h5KGNyZWF0ZVNoYWRvd1RhcmdldChkaXN0b3J0ZWRWYWx1ZSksIHJlYWRPbmx5SGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICByZWdpc3RlclByb3h5KHByb3h5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBPYmplY3REZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmVhZE9ubHknLCB7IHZhbHVlOiBwcm94eSB9KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBwcm94eTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgb2JqZWN0R3JhcGguc2V0KGRpc3RvcnRlZFZhbHVlLCByZWFjdGl2ZVN0YXRlKTtcbiAgICAgICAgICByZXR1cm4gcmVhY3RpdmVTdGF0ZTtcbiAgICAgIH1cbiAgfVxuICAvKiogdmVyc2lvbjogMC4yNi4wICovXG5cbiAgZnVuY3Rpb24gd3JhcChkYXRhLCBtdXRhdGlvbkNhbGxiYWNrKSB7XG5cbiAgICBsZXQgbWVtYnJhbmUgPSBuZXcgUmVhY3RpdmVNZW1icmFuZSh7XG4gICAgICB2YWx1ZU11dGF0ZWQodGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgbXV0YXRpb25DYWxsYmFjayh0YXJnZXQsIGtleSk7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogbWVtYnJhbmUuZ2V0UHJveHkoZGF0YSksXG4gICAgICBtZW1icmFuZTogbWVtYnJhbmVcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIHVud3JhcCQxKG1lbWJyYW5lLCBvYnNlcnZhYmxlKSB7XG4gICAgbGV0IHVud3JhcHBlZERhdGEgPSBtZW1icmFuZS51bndyYXBQcm94eShvYnNlcnZhYmxlKTtcbiAgICBsZXQgY29weSA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHVud3JhcHBlZERhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChbJyRlbCcsICckcmVmcycsICckbmV4dFRpY2snLCAnJHdhdGNoJ10uaW5jbHVkZXMoa2V5KSkgcmV0dXJuO1xuICAgICAgY29weVtrZXldID0gdW53cmFwcGVkRGF0YVtrZXldO1xuICAgIH0pO1xuICAgIHJldHVybiBjb3B5O1xuICB9XG5cbiAgY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihlbCwgY29tcG9uZW50Rm9yQ2xvbmUgPSBudWxsKSB7XG4gICAgICB0aGlzLiRlbCA9IGVsO1xuICAgICAgY29uc3QgZGF0YUF0dHIgPSB0aGlzLiRlbC5nZXRBdHRyaWJ1dGUoJ3gtZGF0YScpO1xuICAgICAgY29uc3QgZGF0YUV4cHJlc3Npb24gPSBkYXRhQXR0ciA9PT0gJycgPyAne30nIDogZGF0YUF0dHI7XG4gICAgICBjb25zdCBpbml0RXhwcmVzc2lvbiA9IHRoaXMuJGVsLmdldEF0dHJpYnV0ZSgneC1pbml0Jyk7XG4gICAgICBsZXQgZGF0YUV4dHJhcyA9IHtcbiAgICAgICAgJGVsOiB0aGlzLiRlbFxuICAgICAgfTtcbiAgICAgIGxldCBjYW5vbmljYWxDb21wb25lbnRFbGVtZW50UmVmZXJlbmNlID0gY29tcG9uZW50Rm9yQ2xvbmUgPyBjb21wb25lbnRGb3JDbG9uZS4kZWwgOiB0aGlzLiRlbDtcbiAgICAgIE9iamVjdC5lbnRyaWVzKEFscGluZS5tYWdpY1Byb3BlcnRpZXMpLmZvckVhY2goKFtuYW1lLCBjYWxsYmFja10pID0+IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRhdGFFeHRyYXMsIGAkJHtuYW1lfWAsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjYW5vbmljYWxDb21wb25lbnRFbGVtZW50UmVmZXJlbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnVub2JzZXJ2ZWREYXRhID0gY29tcG9uZW50Rm9yQ2xvbmUgPyBjb21wb25lbnRGb3JDbG9uZS5nZXRVbm9ic2VydmVkRGF0YSgpIDogc2FmZXJFdmFsKGVsLCBkYXRhRXhwcmVzc2lvbiwgZGF0YUV4dHJhcyk7XG4gICAgICAvLyBDb25zdHJ1Y3QgYSBQcm94eS1iYXNlZCBvYnNlcnZhYmxlLiBUaGlzIHdpbGwgYmUgdXNlZCB0byBoYW5kbGUgcmVhY3Rpdml0eS5cblxuICAgICAgbGV0IHtcbiAgICAgICAgbWVtYnJhbmUsXG4gICAgICAgIGRhdGFcbiAgICAgIH0gPSB0aGlzLndyYXBEYXRhSW5PYnNlcnZhYmxlKHRoaXMudW5vYnNlcnZlZERhdGEpO1xuICAgICAgdGhpcy4kZGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLm1lbWJyYW5lID0gbWVtYnJhbmU7IC8vIEFmdGVyIG1ha2luZyB1c2VyLXN1cHBsaWVkIGRhdGEgbWV0aG9kcyByZWFjdGl2ZSwgd2UgY2FuIG5vdyBhZGRcbiAgICAgIC8vIG91ciBtYWdpYyBwcm9wZXJ0aWVzIHRvIHRoZSBvcmlnaW5hbCBkYXRhIGZvciBhY2Nlc3MuXG5cbiAgICAgIHRoaXMudW5vYnNlcnZlZERhdGEuJGVsID0gdGhpcy4kZWw7XG4gICAgICB0aGlzLnVub2JzZXJ2ZWREYXRhLiRyZWZzID0gdGhpcy5nZXRSZWZzUHJveHkoKTtcbiAgICAgIHRoaXMubmV4dFRpY2tTdGFjayA9IFtdO1xuXG4gICAgICB0aGlzLnVub2JzZXJ2ZWREYXRhLiRuZXh0VGljayA9IGNhbGxiYWNrID0+IHtcbiAgICAgICAgdGhpcy5uZXh0VGlja1N0YWNrLnB1c2goY2FsbGJhY2spO1xuICAgICAgfTtcblxuICAgICAgdGhpcy53YXRjaGVycyA9IHt9O1xuXG4gICAgICB0aGlzLnVub2JzZXJ2ZWREYXRhLiR3YXRjaCA9IChwcm9wZXJ0eSwgY2FsbGJhY2spID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLndhdGNoZXJzW3Byb3BlcnR5XSkgdGhpcy53YXRjaGVyc1twcm9wZXJ0eV0gPSBbXTtcbiAgICAgICAgdGhpcy53YXRjaGVyc1twcm9wZXJ0eV0ucHVzaChjYWxsYmFjayk7XG4gICAgICB9O1xuICAgICAgLyogTU9ERVJOLU9OTFk6U1RBUlQgKi9cbiAgICAgIC8vIFdlIHJlbW92ZSB0aGlzIHBpZWNlIG9mIGNvZGUgZnJvbSB0aGUgbGVnYWN5IGJ1aWxkLlxuICAgICAgLy8gSW4gSUUxMSwgd2UgaGF2ZSBhbHJlYWR5IGRlZmluZWQgb3VyIGhlbHBlcnMgYXQgdGhpcyBwb2ludC5cbiAgICAgIC8vIFJlZ2lzdGVyIGN1c3RvbSBtYWdpYyBwcm9wZXJ0aWVzLlxuXG5cbiAgICAgIE9iamVjdC5lbnRyaWVzKEFscGluZS5tYWdpY1Byb3BlcnRpZXMpLmZvckVhY2goKFtuYW1lLCBjYWxsYmFja10pID0+IHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMudW5vYnNlcnZlZERhdGEsIGAkJHtuYW1lfWAsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjYW5vbmljYWxDb21wb25lbnRFbGVtZW50UmVmZXJlbmNlLCB0aGlzLiRlbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgLyogTU9ERVJOLU9OTFk6RU5EICovXG5cbiAgICAgIHRoaXMuc2hvd0RpcmVjdGl2ZVN0YWNrID0gW107XG4gICAgICB0aGlzLnNob3dEaXJlY3RpdmVMYXN0RWxlbWVudDtcbiAgICAgIGNvbXBvbmVudEZvckNsb25lIHx8IEFscGluZS5vbkJlZm9yZUNvbXBvbmVudEluaXRpYWxpemVkcy5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKHRoaXMpKTtcbiAgICAgIHZhciBpbml0UmV0dXJuZWRDYWxsYmFjazsgLy8gSWYgeC1pbml0IGlzIHByZXNlbnQgQU5EIHdlIGFyZW4ndCBjbG9uaW5nIChza2lwIHgtaW5pdCBvbiBjbG9uZSlcblxuICAgICAgaWYgKGluaXRFeHByZXNzaW9uICYmICFjb21wb25lbnRGb3JDbG9uZSkge1xuICAgICAgICAvLyBXZSB3YW50IHRvIGFsbG93IGRhdGEgbWFuaXB1bGF0aW9uLCBidXQgbm90IHRyaWdnZXIgRE9NIHVwZGF0ZXMganVzdCB5ZXQuXG4gICAgICAgIC8vIFdlIGhhdmVuJ3QgZXZlbiBpbml0aWFsaXplZCB0aGUgZWxlbWVudHMgd2l0aCB0aGVpciBBbHBpbmUgYmluZGluZ3MuIEkgbWVhbiBjJ21vbi5cbiAgICAgICAgdGhpcy5wYXVzZVJlYWN0aXZpdHkgPSB0cnVlO1xuICAgICAgICBpbml0UmV0dXJuZWRDYWxsYmFjayA9IHRoaXMuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKHRoaXMuJGVsLCBpbml0RXhwcmVzc2lvbik7XG4gICAgICAgIHRoaXMucGF1c2VSZWFjdGl2aXR5ID0gZmFsc2U7XG4gICAgICB9IC8vIFJlZ2lzdGVyIGFsbCBvdXIgbGlzdGVuZXJzIGFuZCBzZXQgYWxsIG91ciBhdHRyaWJ1dGUgYmluZGluZ3MuXG4gICAgICAvLyBJZiB3ZSdyZSBjbG9uaW5nIGEgY29tcG9uZW50LCB0aGUgdGhpcmQgcGFyYW1ldGVyIGVuc3VyZXMgbm8gZHVwbGljYXRlXG4gICAgICAvLyBldmVudCBsaXN0ZW5lcnMgYXJlIHJlZ2lzdGVyZWQgKHRoZSBtdXRhdGlvbiBvYnNlcnZlciB3aWxsIHRha2UgY2FyZSBvZiB0aGVtKVxuXG5cbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUVsZW1lbnRzKHRoaXMuJGVsLCAoKSA9PiB7fSwgY29tcG9uZW50Rm9yQ2xvbmUpOyAvLyBVc2UgbXV0YXRpb24gb2JzZXJ2ZXIgdG8gZGV0ZWN0IG5ldyBlbGVtZW50cyBiZWluZyBhZGRlZCB3aXRoaW4gdGhpcyBjb21wb25lbnQgYXQgcnVuLXRpbWUuXG4gICAgICAvLyBBbHBpbmUncyBqdXN0IHNvIGRhcm4gZmxleGlibGUgYW1pcml0ZT9cblxuICAgICAgdGhpcy5saXN0ZW5Gb3JOZXdFbGVtZW50c1RvSW5pdGlhbGl6ZSgpO1xuXG4gICAgICBpZiAodHlwZW9mIGluaXRSZXR1cm5lZENhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIFJ1biB0aGUgY2FsbGJhY2sgcmV0dXJuZWQgZnJvbSB0aGUgXCJ4LWluaXRcIiBob29rIHRvIGFsbG93IHRoZSB1c2VyIHRvIGRvIHN0dWZmIGFmdGVyXG4gICAgICAgIC8vIEFscGluZSdzIGdvdCBpdCdzIGdydWJieSBsaXR0bGUgcGF3cyBhbGwgb3ZlciBldmVyeXRoaW5nLlxuICAgICAgICBpbml0UmV0dXJuZWRDYWxsYmFjay5jYWxsKHRoaXMuJGRhdGEpO1xuICAgICAgfVxuXG4gICAgICBjb21wb25lbnRGb3JDbG9uZSB8fCBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgQWxwaW5lLm9uQ29tcG9uZW50SW5pdGlhbGl6ZWRzLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2sodGhpcykpO1xuICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgZ2V0VW5vYnNlcnZlZERhdGEoKSB7XG4gICAgICByZXR1cm4gdW53cmFwJDEodGhpcy5tZW1icmFuZSwgdGhpcy4kZGF0YSk7XG4gICAgfVxuXG4gICAgd3JhcERhdGFJbk9ic2VydmFibGUoZGF0YSkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgbGV0IHVwZGF0ZURvbSA9IGRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi51cGRhdGVFbGVtZW50cyhzZWxmLiRlbCk7XG4gICAgICB9LCAwKTtcbiAgICAgIHJldHVybiB3cmFwKGRhdGEsICh0YXJnZXQsIGtleSkgPT4ge1xuICAgICAgICBpZiAoc2VsZi53YXRjaGVyc1trZXldKSB7XG4gICAgICAgICAgLy8gSWYgdGhlcmUncyBhIHdhdGNoZXIgZm9yIHRoaXMgc3BlY2lmaWMga2V5LCBydW4gaXQuXG4gICAgICAgICAgc2VsZi53YXRjaGVyc1trZXldLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2sodGFyZ2V0W2tleV0pKTtcbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICAvLyBBcnJheXMgYXJlIHNwZWNpYWwgY2FzZXMsIGlmIGFueSBvZiB0aGUgaXRlbXMgY2hhbmdlLCB3ZSBjb25zaWRlciB0aGUgYXJyYXkgYXMgbXV0YXRlZC5cbiAgICAgICAgICBPYmplY3Qua2V5cyhzZWxmLndhdGNoZXJzKS5mb3JFYWNoKGZ1bGxEb3ROb3RhdGlvbktleSA9PiB7XG4gICAgICAgICAgICBsZXQgZG90Tm90YXRpb25QYXJ0cyA9IGZ1bGxEb3ROb3RhdGlvbktleS5zcGxpdCgnLicpOyAvLyBJZ25vcmUgbGVuZ3RoIG11dGF0aW9ucyBzaW5jZSB0aGV5IHdvdWxkIHJlc3VsdCBpbiBkdXBsaWNhdGUgY2FsbHMuXG4gICAgICAgICAgICAvLyBGb3IgZXhhbXBsZSwgd2hlbiBjYWxsaW5nIHB1c2gsIHdlIHdvdWxkIGdldCBhIG11dGF0aW9uIGZvciB0aGUgaXRlbSdzIGtleVxuICAgICAgICAgICAgLy8gYW5kIGEgc2Vjb25kIG11dGF0aW9uIGZvciB0aGUgbGVuZ3RoIHByb3BlcnR5LlxuXG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnbGVuZ3RoJykgcmV0dXJuO1xuICAgICAgICAgICAgZG90Tm90YXRpb25QYXJ0cy5yZWR1Y2UoKGNvbXBhcmlzb25EYXRhLCBwYXJ0KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChPYmplY3QuaXModGFyZ2V0LCBjb21wYXJpc29uRGF0YVtwYXJ0XSkpIHtcbiAgICAgICAgICAgICAgICBzZWxmLndhdGNoZXJzW2Z1bGxEb3ROb3RhdGlvbktleV0uZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayh0YXJnZXQpKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBjb21wYXJpc29uRGF0YVtwYXJ0XTtcbiAgICAgICAgICAgIH0sIHNlbGYudW5vYnNlcnZlZERhdGEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIExldCdzIHdhbGsgdGhyb3VnaCB0aGUgd2F0Y2hlcnMgd2l0aCBcImRvdC1ub3RhdGlvblwiIChmb28uYmFyKSBhbmQgc2VlXG4gICAgICAgICAgLy8gaWYgdGhpcyBtdXRhdGlvbiBmaXRzIGFueSBvZiB0aGVtLlxuICAgICAgICAgIE9iamVjdC5rZXlzKHNlbGYud2F0Y2hlcnMpLmZpbHRlcihpID0+IGkuaW5jbHVkZXMoJy4nKSkuZm9yRWFjaChmdWxsRG90Tm90YXRpb25LZXkgPT4ge1xuICAgICAgICAgICAgbGV0IGRvdE5vdGF0aW9uUGFydHMgPSBmdWxsRG90Tm90YXRpb25LZXkuc3BsaXQoJy4nKTsgLy8gSWYgdGhpcyBkb3Qtbm90YXRpb24gd2F0Y2hlcidzIGxhc3QgXCJwYXJ0XCIgZG9lc24ndCBtYXRjaCB0aGUgY3VycmVudFxuICAgICAgICAgICAgLy8ga2V5LCB0aGVuIHNraXAgaXQgZWFybHkgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMuXG5cbiAgICAgICAgICAgIGlmIChrZXkgIT09IGRvdE5vdGF0aW9uUGFydHNbZG90Tm90YXRpb25QYXJ0cy5sZW5ndGggLSAxXSkgcmV0dXJuOyAvLyBOb3csIHdhbGsgdGhyb3VnaCB0aGUgZG90LW5vdGF0aW9uIFwicGFydHNcIiByZWN1cnNpdmVseSB0byBmaW5kXG4gICAgICAgICAgICAvLyBhIG1hdGNoLCBhbmQgY2FsbCB0aGUgd2F0Y2hlciBpZiBvbmUncyBmb3VuZC5cblxuICAgICAgICAgICAgZG90Tm90YXRpb25QYXJ0cy5yZWR1Y2UoKGNvbXBhcmlzb25EYXRhLCBwYXJ0KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChPYmplY3QuaXModGFyZ2V0LCBjb21wYXJpc29uRGF0YSkpIHtcbiAgICAgICAgICAgICAgICAvLyBSdW4gdGhlIHdhdGNoZXJzLlxuICAgICAgICAgICAgICAgIHNlbGYud2F0Y2hlcnNbZnVsbERvdE5vdGF0aW9uS2V5XS5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKHRhcmdldFtrZXldKSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gY29tcGFyaXNvbkRhdGFbcGFydF07XG4gICAgICAgICAgICB9LCBzZWxmLnVub2JzZXJ2ZWREYXRhKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSAvLyBEb24ndCByZWFjdCB0byBkYXRhIGNoYW5nZXMgZm9yIGNhc2VzIGxpa2UgdGhlIGB4LWNyZWF0ZWRgIGhvb2suXG5cblxuICAgICAgICBpZiAoc2VsZi5wYXVzZVJlYWN0aXZpdHkpIHJldHVybjtcbiAgICAgICAgdXBkYXRlRG9tKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB3YWxrQW5kU2tpcE5lc3RlZENvbXBvbmVudHMoZWwsIGNhbGxiYWNrLCBpbml0aWFsaXplQ29tcG9uZW50Q2FsbGJhY2sgPSAoKSA9PiB7fSkge1xuICAgICAgd2FsayhlbCwgZWwgPT4ge1xuICAgICAgICAvLyBXZSd2ZSBoaXQgYSBjb21wb25lbnQuXG4gICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ3gtZGF0YScpKSB7XG4gICAgICAgICAgLy8gSWYgaXQncyBub3QgdGhlIGN1cnJlbnQgb25lLlxuICAgICAgICAgIGlmICghZWwuaXNTYW1lTm9kZSh0aGlzLiRlbCkpIHtcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgaXQgaWYgaXQncyBub3QuXG4gICAgICAgICAgICBpZiAoIWVsLl9feCkgaW5pdGlhbGl6ZUNvbXBvbmVudENhbGxiYWNrKGVsKTsgLy8gTm93IHdlJ2xsIGxldCB0aGF0IHN1Yi1jb21wb25lbnQgZGVhbCB3aXRoIGl0c2VsZi5cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlbCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplRWxlbWVudHMocm9vdEVsLCBleHRyYVZhcnMgPSAoKSA9PiB7fSwgY29tcG9uZW50Rm9yQ2xvbmUgPSBmYWxzZSkge1xuICAgICAgdGhpcy53YWxrQW5kU2tpcE5lc3RlZENvbXBvbmVudHMocm9vdEVsLCBlbCA9PiB7XG4gICAgICAgIC8vIERvbid0IHRvdWNoIHNwYXducyBmcm9tIGZvciBsb29wXG4gICAgICAgIGlmIChlbC5fX3hfZm9yX2tleSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7IC8vIERvbid0IHRvdWNoIHNwYXducyBmcm9tIGlmIGRpcmVjdGl2ZXNcblxuICAgICAgICBpZiAoZWwuX194X2luc2VydGVkX21lICE9PSB1bmRlZmluZWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRWxlbWVudChlbCwgZXh0cmFWYXJzLCBjb21wb25lbnRGb3JDbG9uZSA/IGZhbHNlIDogdHJ1ZSk7XG4gICAgICB9LCBlbCA9PiB7XG4gICAgICAgIGlmICghY29tcG9uZW50Rm9yQ2xvbmUpIGVsLl9feCA9IG5ldyBDb21wb25lbnQoZWwpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmV4ZWN1dGVBbmRDbGVhclJlbWFpbmluZ1Nob3dEaXJlY3RpdmVTdGFjaygpO1xuICAgICAgdGhpcy5leGVjdXRlQW5kQ2xlYXJOZXh0VGlja1N0YWNrKHJvb3RFbCk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUVsZW1lbnQoZWwsIGV4dHJhVmFycywgc2hvdWxkUmVnaXN0ZXJMaXN0ZW5lcnMgPSB0cnVlKSB7XG4gICAgICAvLyBUbyBzdXBwb3J0IGNsYXNzIGF0dHJpYnV0ZSBtZXJnaW5nLCB3ZSBoYXZlIHRvIGtub3cgd2hhdCB0aGUgZWxlbWVudCdzXG4gICAgICAvLyBvcmlnaW5hbCBjbGFzcyBhdHRyaWJ1dGUgbG9va2VkIGxpa2UgZm9yIHJlZmVyZW5jZS5cbiAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2NsYXNzJykgJiYgZ2V0WEF0dHJzKGVsLCB0aGlzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVsLl9feF9vcmlnaW5hbF9jbGFzc2VzID0gY29udmVydENsYXNzU3RyaW5nVG9BcnJheShlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykpO1xuICAgICAgfVxuXG4gICAgICBzaG91bGRSZWdpc3Rlckxpc3RlbmVycyAmJiB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKGVsLCBleHRyYVZhcnMpO1xuICAgICAgdGhpcy5yZXNvbHZlQm91bmRBdHRyaWJ1dGVzKGVsLCB0cnVlLCBleHRyYVZhcnMpO1xuICAgIH1cblxuICAgIHVwZGF0ZUVsZW1lbnRzKHJvb3RFbCwgZXh0cmFWYXJzID0gKCkgPT4ge30pIHtcbiAgICAgIHRoaXMud2Fsa0FuZFNraXBOZXN0ZWRDb21wb25lbnRzKHJvb3RFbCwgZWwgPT4ge1xuICAgICAgICAvLyBEb24ndCB0b3VjaCBzcGF3bnMgZnJvbSBmb3IgbG9vcCAoYW5kIGNoZWNrIGlmIHRoZSByb290IGlzIGFjdHVhbGx5IGEgZm9yIGxvb3AgaW4gYSBwYXJlbnQsIGRvbid0IHNraXAgaXQuKVxuICAgICAgICBpZiAoZWwuX194X2Zvcl9rZXkgIT09IHVuZGVmaW5lZCAmJiAhZWwuaXNTYW1lTm9kZSh0aGlzLiRlbCkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50KGVsLCBleHRyYVZhcnMpO1xuICAgICAgfSwgZWwgPT4ge1xuICAgICAgICBlbC5fX3ggPSBuZXcgQ29tcG9uZW50KGVsKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5leGVjdXRlQW5kQ2xlYXJSZW1haW5pbmdTaG93RGlyZWN0aXZlU3RhY2soKTtcbiAgICAgIHRoaXMuZXhlY3V0ZUFuZENsZWFyTmV4dFRpY2tTdGFjayhyb290RWwpO1xuICAgIH1cblxuICAgIGV4ZWN1dGVBbmRDbGVhck5leHRUaWNrU3RhY2soZWwpIHtcbiAgICAgIC8vIFNraXAgc3Bhd25zIGZyb20gYWxwaW5lIGRpcmVjdGl2ZXNcbiAgICAgIGlmIChlbCA9PT0gdGhpcy4kZWwgJiYgdGhpcy5uZXh0VGlja1N0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gV2UgcnVuIHRoZSB0aWNrIHN0YWNrIGFmdGVyIHRoZSBuZXh0IGZyYW1lIHRvIGFsbG93IGFueVxuICAgICAgICAvLyBydW5uaW5nIHRyYW5zaXRpb25zIHRvIHBhc3MgdGhlIGluaXRpYWwgc2hvdyBzdGFnZS5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICB3aGlsZSAodGhpcy5uZXh0VGlja1N0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubmV4dFRpY2tTdGFjay5zaGlmdCgpKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBleGVjdXRlQW5kQ2xlYXJSZW1haW5pbmdTaG93RGlyZWN0aXZlU3RhY2soKSB7XG4gICAgICAvLyBUaGUgZ29hbCBoZXJlIGlzIHRvIHN0YXJ0IGFsbCB0aGUgeC1zaG93IHRyYW5zaXRpb25zXG4gICAgICAvLyBhbmQgYnVpbGQgYSBuZXN0ZWQgcHJvbWlzZSBjaGFpbiBzbyB0aGF0IGVsZW1lbnRzXG4gICAgICAvLyBvbmx5IGhpZGUgd2hlbiB0aGUgY2hpbGRyZW4gYXJlIGZpbmlzaGVkIGhpZGluZy5cbiAgICAgIHRoaXMuc2hvd0RpcmVjdGl2ZVN0YWNrLnJldmVyc2UoKS5tYXAoaGFuZGxlciA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgaGFuZGxlcihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLnJlZHVjZSgocHJvbWlzZUNoYWluLCBwcm9taXNlKSA9PiB7XG4gICAgICAgIHJldHVybiBwcm9taXNlQ2hhaW4udGhlbigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmaW5pc2hFbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGZpbmlzaEVsZW1lbnQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LCBQcm9taXNlLnJlc29sdmUoKCkgPT4ge30pKS5jYXRjaChlID0+IHtcbiAgICAgICAgaWYgKGUgIT09IFRSQU5TSVRJT05fQ0FOQ0VMTEVEKSB0aHJvdyBlO1xuICAgICAgfSk7IC8vIFdlJ3ZlIHByb2Nlc3NlZCB0aGUgaGFuZGxlciBzdGFjay4gbGV0J3MgY2xlYXIgaXQuXG5cbiAgICAgIHRoaXMuc2hvd0RpcmVjdGl2ZVN0YWNrID0gW107XG4gICAgICB0aGlzLnNob3dEaXJlY3RpdmVMYXN0RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB1cGRhdGVFbGVtZW50KGVsLCBleHRyYVZhcnMpIHtcbiAgICAgIHRoaXMucmVzb2x2ZUJvdW5kQXR0cmlidXRlcyhlbCwgZmFsc2UsIGV4dHJhVmFycyk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJMaXN0ZW5lcnMoZWwsIGV4dHJhVmFycykge1xuICAgICAgZ2V0WEF0dHJzKGVsLCB0aGlzKS5mb3JFYWNoKCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBtb2RpZmllcnMsXG4gICAgICAgIGV4cHJlc3Npb25cbiAgICAgIH0pID0+IHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgY2FzZSAnb24nOlxuICAgICAgICAgICAgcmVnaXN0ZXJMaXN0ZW5lcih0aGlzLCBlbCwgdmFsdWUsIG1vZGlmaWVycywgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnbW9kZWwnOlxuICAgICAgICAgICAgcmVnaXN0ZXJNb2RlbExpc3RlbmVyKHRoaXMsIGVsLCBtb2RpZmllcnMsIGV4cHJlc3Npb24sIGV4dHJhVmFycyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzb2x2ZUJvdW5kQXR0cmlidXRlcyhlbCwgaW5pdGlhbFVwZGF0ZSA9IGZhbHNlLCBleHRyYVZhcnMpIHtcbiAgICAgIGxldCBhdHRycyA9IGdldFhBdHRycyhlbCwgdGhpcyk7XG4gICAgICBhdHRycy5mb3JFYWNoKCh7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBtb2RpZmllcnMsXG4gICAgICAgIGV4cHJlc3Npb25cbiAgICAgIH0pID0+IHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgY2FzZSAnbW9kZWwnOlxuICAgICAgICAgICAgaGFuZGxlQXR0cmlidXRlQmluZGluZ0RpcmVjdGl2ZSh0aGlzLCBlbCwgJ3ZhbHVlJywgZXhwcmVzc2lvbiwgZXh0cmFWYXJzLCB0eXBlLCBtb2RpZmllcnMpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdiaW5kJzpcbiAgICAgICAgICAgIC8vIFRoZSA6a2V5IGJpbmRpbmcgb24gYW4geC1mb3IgaXMgc3BlY2lhbCwgaWdub3JlIGl0LlxuICAgICAgICAgICAgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RlbXBsYXRlJyAmJiB2YWx1ZSA9PT0gJ2tleScpIHJldHVybjtcbiAgICAgICAgICAgIGhhbmRsZUF0dHJpYnV0ZUJpbmRpbmdEaXJlY3RpdmUodGhpcywgZWwsIHZhbHVlLCBleHByZXNzaW9uLCBleHRyYVZhcnMsIHR5cGUsIG1vZGlmaWVycyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuZXZhbHVhdGVSZXR1cm5FeHByZXNzaW9uKGVsLCBleHByZXNzaW9uLCBleHRyYVZhcnMpO1xuICAgICAgICAgICAgaGFuZGxlVGV4dERpcmVjdGl2ZShlbCwgb3V0cHV0LCBleHByZXNzaW9uKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnaHRtbCc6XG4gICAgICAgICAgICBoYW5kbGVIdG1sRGlyZWN0aXZlKHRoaXMsIGVsLCBleHByZXNzaW9uLCBleHRyYVZhcnMpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdzaG93JzpcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcbiAgICAgICAgICAgIGhhbmRsZVNob3dEaXJlY3RpdmUodGhpcywgZWwsIG91dHB1dCwgbW9kaWZpZXJzLCBpbml0aWFsVXBkYXRlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnaWYnOlxuICAgICAgICAgICAgLy8gSWYgdGhpcyBlbGVtZW50IGFsc28gaGFzIHgtZm9yIG9uIGl0LCBkb24ndCBwcm9jZXNzIHgtaWYuXG4gICAgICAgICAgICAvLyBXZSB3aWxsIGxldCB0aGUgXCJ4LWZvclwiIGRpcmVjdGl2ZSBoYW5kbGUgdGhlIFwiaWZcImluZy5cbiAgICAgICAgICAgIGlmIChhdHRycy5zb21lKGkgPT4gaS50eXBlID09PSAnZm9yJykpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLmV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzKTtcbiAgICAgICAgICAgIGhhbmRsZUlmRGlyZWN0aXZlKHRoaXMsIGVsLCBvdXRwdXQsIGluaXRpYWxVcGRhdGUsIGV4dHJhVmFycyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ2Zvcic6XG4gICAgICAgICAgICBoYW5kbGVGb3JEaXJlY3RpdmUodGhpcywgZWwsIGV4cHJlc3Npb24sIGluaXRpYWxVcGRhdGUsIGV4dHJhVmFycyk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ2Nsb2FrJzpcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgneC1jbG9haycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGV2YWx1YXRlUmV0dXJuRXhwcmVzc2lvbihlbCwgZXhwcmVzc2lvbiwgZXh0cmFWYXJzID0gKCkgPT4ge30pIHtcbiAgICAgIHJldHVybiBzYWZlckV2YWwoZWwsIGV4cHJlc3Npb24sIHRoaXMuJGRhdGEsIF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBleHRyYVZhcnMoKSksIHt9LCB7XG4gICAgICAgICRkaXNwYXRjaDogdGhpcy5nZXREaXNwYXRjaEZ1bmN0aW9uKGVsKVxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIGV2YWx1YXRlQ29tbWFuZEV4cHJlc3Npb24oZWwsIGV4cHJlc3Npb24sIGV4dHJhVmFycyA9ICgpID0+IHt9KSB7XG4gICAgICByZXR1cm4gc2FmZXJFdmFsTm9SZXR1cm4oZWwsIGV4cHJlc3Npb24sIHRoaXMuJGRhdGEsIF9vYmplY3RTcHJlYWQyKF9vYmplY3RTcHJlYWQyKHt9LCBleHRyYVZhcnMoKSksIHt9LCB7XG4gICAgICAgICRkaXNwYXRjaDogdGhpcy5nZXREaXNwYXRjaEZ1bmN0aW9uKGVsKVxuICAgICAgfSkpO1xuICAgIH1cblxuICAgIGdldERpc3BhdGNoRnVuY3Rpb24oZWwpIHtcbiAgICAgIHJldHVybiAoZXZlbnQsIGRldGFpbCA9IHt9KSA9PiB7XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2ZW50LCB7XG4gICAgICAgICAgZGV0YWlsLFxuICAgICAgICAgIGJ1YmJsZXM6IHRydWVcbiAgICAgICAgfSkpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBsaXN0ZW5Gb3JOZXdFbGVtZW50c1RvSW5pdGlhbGl6ZSgpIHtcbiAgICAgIGNvbnN0IHRhcmdldE5vZGUgPSB0aGlzLiRlbDtcbiAgICAgIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgICB9O1xuICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvbnMgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG11dGF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vIEZpbHRlciBvdXQgbXV0YXRpb25zIHRyaWdnZXJlZCBmcm9tIGNoaWxkIGNvbXBvbmVudHMuXG4gICAgICAgICAgY29uc3QgY2xvc2VzdFBhcmVudENvbXBvbmVudCA9IG11dGF0aW9uc1tpXS50YXJnZXQuY2xvc2VzdCgnW3gtZGF0YV0nKTtcbiAgICAgICAgICBpZiAoIShjbG9zZXN0UGFyZW50Q29tcG9uZW50ICYmIGNsb3Nlc3RQYXJlbnRDb21wb25lbnQuaXNTYW1lTm9kZSh0aGlzLiRlbCkpKSBjb250aW51ZTtcblxuICAgICAgICAgIGlmIChtdXRhdGlvbnNbaV0udHlwZSA9PT0gJ2F0dHJpYnV0ZXMnICYmIG11dGF0aW9uc1tpXS5hdHRyaWJ1dGVOYW1lID09PSAneC1kYXRhJykge1xuICAgICAgICAgICAgY29uc3QgeEF0dHIgPSBtdXRhdGlvbnNbaV0udGFyZ2V0LmdldEF0dHJpYnV0ZSgneC1kYXRhJykgfHwgJ3t9JztcbiAgICAgICAgICAgIGNvbnN0IHJhd0RhdGEgPSBzYWZlckV2YWwodGhpcy4kZWwsIHhBdHRyLCB7XG4gICAgICAgICAgICAgICRlbDogdGhpcy4kZWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMocmF3RGF0YSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy4kZGF0YVtrZXldICE9PSByYXdEYXRhW2tleV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRkYXRhW2tleV0gPSByYXdEYXRhW2tleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChtdXRhdGlvbnNbaV0uYWRkZWROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtdXRhdGlvbnNbaV0uYWRkZWROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gMSB8fCBub2RlLl9feF9pbnNlcnRlZF9tZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgIGlmIChub2RlLm1hdGNoZXMoJ1t4LWRhdGFdJykgJiYgIW5vZGUuX194KSB7XG4gICAgICAgICAgICAgICAgbm9kZS5fX3ggPSBuZXcgQ29tcG9uZW50KG5vZGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUVsZW1lbnRzKG5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0Tm9kZSwgb2JzZXJ2ZXJPcHRpb25zKTtcbiAgICB9XG5cbiAgICBnZXRSZWZzUHJveHkoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgcmVmT2JqID0ge307XG4gICAgICAvLyBPbmUgb2YgdGhlIGdvYWxzIG9mIHRoaXMgaXMgdG8gbm90IGhvbGQgZWxlbWVudHMgaW4gbWVtb3J5LCBidXQgcmF0aGVyIHJlLWV2YWx1YXRlXG4gICAgICAvLyB0aGUgRE9NIHdoZW4gdGhlIHN5c3RlbSBuZWVkcyBzb21ldGhpbmcgZnJvbSBpdC4gVGhpcyB3YXksIHRoZSBmcmFtZXdvcmsgaXMgZmxleGlibGUgYW5kXG4gICAgICAvLyBmcmllbmRseSB0byBvdXRzaWRlIERPTSBjaGFuZ2VzIGZyb20gbGlicmFyaWVzIGxpa2UgVnVlL0xpdmV3aXJlLlxuICAgICAgLy8gRm9yIHRoaXMgcmVhc29uLCBJJ20gdXNpbmcgYW4gXCJvbi1kZW1hbmRcIiBwcm94eSB0byBmYWtlIGEgXCIkcmVmc1wiIG9iamVjdC5cblxuICAgICAgcmV0dXJuIG5ldyBQcm94eShyZWZPYmosIHtcbiAgICAgICAgZ2V0KG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICAgICAgICBpZiAocHJvcGVydHkgPT09ICckaXNBbHBpbmVQcm94eScpIHJldHVybiB0cnVlO1xuICAgICAgICAgIHZhciByZWY7IC8vIFdlIGNhbid0IGp1c3QgcXVlcnkgdGhlIERPTSBiZWNhdXNlIGl0J3MgaGFyZCB0byBmaWx0ZXIgb3V0IHJlZnMgaW5cbiAgICAgICAgICAvLyBuZXN0ZWQgY29tcG9uZW50cy5cblxuICAgICAgICAgIHNlbGYud2Fsa0FuZFNraXBOZXN0ZWRDb21wb25lbnRzKHNlbGYuJGVsLCBlbCA9PiB7XG4gICAgICAgICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCd4LXJlZicpICYmIGVsLmdldEF0dHJpYnV0ZSgneC1yZWYnKSA9PT0gcHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgcmVmID0gZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHJlZjtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbnN0IEFscGluZSA9IHtcbiAgICB2ZXJzaW9uOiBcIjIuOC4yXCIsXG4gICAgcGF1c2VNdXRhdGlvbk9ic2VydmVyOiBmYWxzZSxcbiAgICBtYWdpY1Byb3BlcnRpZXM6IHt9LFxuICAgIG9uQ29tcG9uZW50SW5pdGlhbGl6ZWRzOiBbXSxcbiAgICBvbkJlZm9yZUNvbXBvbmVudEluaXRpYWxpemVkczogW10sXG4gICAgaWdub3JlRm9jdXNlZEZvclZhbHVlQmluZGluZzogZmFsc2UsXG4gICAgc3RhcnQ6IGFzeW5jIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgaWYgKCFpc1Rlc3RpbmcoKSkge1xuICAgICAgICBhd2FpdCBkb21SZWFkeSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRpc2NvdmVyQ29tcG9uZW50cyhlbCA9PiB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUNvbXBvbmVudChlbCk7XG4gICAgICB9KTsgLy8gSXQncyBlYXNpZXIgYW5kIG1vcmUgcGVyZm9ybWFudCB0byBqdXN0IHN1cHBvcnQgVHVyYm9saW5rcyB0aGFuIGxpc3RlblxuICAgICAgLy8gdG8gTXV0YXRpb25PYnNlcnZlciBtdXRhdGlvbnMgYXQgdGhlIGRvY3VtZW50IGxldmVsLlxuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidHVyYm9saW5rczpsb2FkXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5kaXNjb3ZlclVuaW5pdGlhbGl6ZWRDb21wb25lbnRzKGVsID0+IHtcbiAgICAgICAgICB0aGlzLmluaXRpYWxpemVDb21wb25lbnQoZWwpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5saXN0ZW5Gb3JOZXdVbmluaXRpYWxpemVkQ29tcG9uZW50c0F0UnVuVGltZSgpO1xuICAgIH0sXG4gICAgZGlzY292ZXJDb21wb25lbnRzOiBmdW5jdGlvbiBkaXNjb3ZlckNvbXBvbmVudHMoY2FsbGJhY2spIHtcbiAgICAgIGNvbnN0IHJvb3RFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbeC1kYXRhXScpO1xuICAgICAgcm9vdEVscy5mb3JFYWNoKHJvb3RFbCA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHJvb3RFbCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRpc2NvdmVyVW5pbml0aWFsaXplZENvbXBvbmVudHM6IGZ1bmN0aW9uIGRpc2NvdmVyVW5pbml0aWFsaXplZENvbXBvbmVudHMoY2FsbGJhY2ssIGVsID0gbnVsbCkge1xuICAgICAgY29uc3Qgcm9vdEVscyA9IChlbCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbCgnW3gtZGF0YV0nKTtcbiAgICAgIEFycmF5LmZyb20ocm9vdEVscykuZmlsdGVyKGVsID0+IGVsLl9feCA9PT0gdW5kZWZpbmVkKS5mb3JFYWNoKHJvb3RFbCA9PiB7XG4gICAgICAgIGNhbGxiYWNrKHJvb3RFbCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGxpc3RlbkZvck5ld1VuaW5pdGlhbGl6ZWRDb21wb25lbnRzQXRSdW5UaW1lOiBmdW5jdGlvbiBsaXN0ZW5Gb3JOZXdVbmluaXRpYWxpemVkQ29tcG9uZW50c0F0UnVuVGltZSgpIHtcbiAgICAgIGNvbnN0IHRhcmdldE5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICBjb25zdCBvYnNlcnZlck9wdGlvbnMgPSB7XG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgc3VidHJlZTogdHJ1ZVxuICAgICAgfTtcbiAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25zID0+IHtcbiAgICAgICAgaWYgKHRoaXMucGF1c2VNdXRhdGlvbk9ic2VydmVyKSByZXR1cm47XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdXRhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAobXV0YXRpb25zW2ldLmFkZGVkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbXV0YXRpb25zW2ldLmFkZGVkTm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgLy8gRGlzY2FyZCBub24tZWxlbWVudCBub2RlcyAobGlrZSBsaW5lLWJyZWFrcylcbiAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgIT09IDEpIHJldHVybjsgLy8gRGlzY2FyZCBhbnkgY2hhbmdlcyBoYXBwZW5pbmcgd2l0aGluIGFuIGV4aXN0aW5nIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgLy8gVGhleSB3aWxsIHRha2UgY2FyZSBvZiB0aGVtc2VsdmVzLlxuXG4gICAgICAgICAgICAgIGlmIChub2RlLnBhcmVudEVsZW1lbnQgJiYgbm9kZS5wYXJlbnRFbGVtZW50LmNsb3Nlc3QoJ1t4LWRhdGFdJykpIHJldHVybjtcbiAgICAgICAgICAgICAgdGhpcy5kaXNjb3ZlclVuaW5pdGlhbGl6ZWRDb21wb25lbnRzKGVsID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVDb21wb25lbnQoZWwpO1xuICAgICAgICAgICAgICB9LCBub2RlLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0Tm9kZSwgb2JzZXJ2ZXJPcHRpb25zKTtcbiAgICB9LFxuICAgIGluaXRpYWxpemVDb21wb25lbnQ6IGZ1bmN0aW9uIGluaXRpYWxpemVDb21wb25lbnQoZWwpIHtcbiAgICAgIGlmICghZWwuX194KSB7XG4gICAgICAgIC8vIFdyYXAgaW4gYSB0cnkvY2F0Y2ggc28gdGhhdCB3ZSBkb24ndCBwcmV2ZW50IG90aGVyIGNvbXBvbmVudHNcbiAgICAgICAgLy8gZnJvbSBpbml0aWFsaXppbmcgd2hlbiBvbmUgY29tcG9uZW50IGNvbnRhaW5zIGFuIGVycm9yLlxuICAgICAgICB0cnkge1xuICAgICAgICAgIGVsLl9feCA9IG5ldyBDb21wb25lbnQoZWwpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNsb25lOiBmdW5jdGlvbiBjbG9uZShjb21wb25lbnQsIG5ld0VsKSB7XG4gICAgICBpZiAoIW5ld0VsLl9feCkge1xuICAgICAgICBuZXdFbC5fX3ggPSBuZXcgQ29tcG9uZW50KG5ld0VsLCBjb21wb25lbnQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYWRkTWFnaWNQcm9wZXJ0eTogZnVuY3Rpb24gYWRkTWFnaWNQcm9wZXJ0eShuYW1lLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5tYWdpY1Byb3BlcnRpZXNbbmFtZV0gPSBjYWxsYmFjaztcbiAgICB9LFxuICAgIG9uQ29tcG9uZW50SW5pdGlhbGl6ZWQ6IGZ1bmN0aW9uIG9uQ29tcG9uZW50SW5pdGlhbGl6ZWQoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMub25Db21wb25lbnRJbml0aWFsaXplZHMucHVzaChjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbkJlZm9yZUNvbXBvbmVudEluaXRpYWxpemVkOiBmdW5jdGlvbiBvbkJlZm9yZUNvbXBvbmVudEluaXRpYWxpemVkKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLm9uQmVmb3JlQ29tcG9uZW50SW5pdGlhbGl6ZWRzLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgfTtcblxuICBpZiAoIWlzVGVzdGluZygpKSB7XG4gICAgd2luZG93LkFscGluZSA9IEFscGluZTtcblxuICAgIGlmICh3aW5kb3cuZGVmZXJMb2FkaW5nQWxwaW5lKSB7XG4gICAgICB3aW5kb3cuZGVmZXJMb2FkaW5nQWxwaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LkFscGluZS5zdGFydCgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5BbHBpbmUuc3RhcnQoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gQWxwaW5lO1xuXG59KSkpO1xuIiwiaW1wb3J0IHsgU2VydmljZVByb3ZpZGVyIH0gZnJvbSAnQGxhcmF2ZWwtc3RyZWFtcy9jb3JlJztcblxuZXhwb3J0IGNsYXNzIEFwcFNlcnZpY2VQcm92aWRlciBleHRlbmRzIFNlcnZpY2VQcm92aWRlciB7XG5cbiAgICByZWdpc3RlcigpIHtcbiAgICAgICAgLy9cbiAgICB9XG5cbiAgICBib290KCkge1xuICAgICAgICAvL1xuICAgIH1cbn1cbiIsIi8qKioqKiovICgoKSA9PiB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVzX18gPSAoe1xuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovICgobW9kdWxlKSA9PiB7XG5cbi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvcmVmbGVjdC1tZXRhZGF0YS9SZWZsZWN0LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9yZWZsZWN0LW1ldGFkYXRhL1JlZmxlY3QuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSA9PiB7XG5cbi8qIHByb3ZpZGVkIGRlcGVuZGVuY3kgKi8gdmFyIHByb2Nlc3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISBwcm9jZXNzL2Jyb3dzZXIgKi8gXCIuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIik7XG4vKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoQykgTWljcm9zb2Z0LiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXG5cblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbnZhciBSZWZsZWN0O1xuKGZ1bmN0aW9uIChSZWZsZWN0KSB7XG4gICAgLy8gTWV0YWRhdGEgUHJvcG9zYWxcbiAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhL1xuICAgIChmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgICAgICB2YXIgcm9vdCA9IHR5cGVvZiBfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPT09IFwib2JqZWN0XCIgPyBfX3dlYnBhY2tfcmVxdWlyZV9fLmcgOlxuICAgICAgICAgICAgdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgPyBzZWxmIDpcbiAgICAgICAgICAgICAgICB0eXBlb2YgdGhpcyA9PT0gXCJvYmplY3RcIiA/IHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICBGdW5jdGlvbihcInJldHVybiB0aGlzO1wiKSgpO1xuICAgICAgICB2YXIgZXhwb3J0ZXIgPSBtYWtlRXhwb3J0ZXIoUmVmbGVjdCk7XG4gICAgICAgIGlmICh0eXBlb2Ygcm9vdC5SZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICByb290LlJlZmxlY3QgPSBSZWZsZWN0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXhwb3J0ZXIgPSBtYWtlRXhwb3J0ZXIocm9vdC5SZWZsZWN0LCBleHBvcnRlcik7XG4gICAgICAgIH1cbiAgICAgICAgZmFjdG9yeShleHBvcnRlcik7XG4gICAgICAgIGZ1bmN0aW9uIG1ha2VFeHBvcnRlcih0YXJnZXQsIHByZXZpb3VzKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFtrZXldICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzKVxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyhrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KShmdW5jdGlvbiAoZXhwb3J0ZXIpIHtcbiAgICAgICAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gICAgICAgIC8vIGZlYXR1cmUgdGVzdCBmb3IgU3ltYm9sIHN1cHBvcnRcbiAgICAgICAgdmFyIHN1cHBvcnRzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiO1xuICAgICAgICB2YXIgdG9QcmltaXRpdmVTeW1ib2wgPSBzdXBwb3J0c1N5bWJvbCAmJiB0eXBlb2YgU3ltYm9sLnRvUHJpbWl0aXZlICE9PSBcInVuZGVmaW5lZFwiID8gU3ltYm9sLnRvUHJpbWl0aXZlIDogXCJAQHRvUHJpbWl0aXZlXCI7XG4gICAgICAgIHZhciBpdGVyYXRvclN5bWJvbCA9IHN1cHBvcnRzU3ltYm9sICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgIT09IFwidW5kZWZpbmVkXCIgPyBTeW1ib2wuaXRlcmF0b3IgOiBcIkBAaXRlcmF0b3JcIjtcbiAgICAgICAgdmFyIHN1cHBvcnRzQ3JlYXRlID0gdHlwZW9mIE9iamVjdC5jcmVhdGUgPT09IFwiZnVuY3Rpb25cIjsgLy8gZmVhdHVyZSB0ZXN0IGZvciBPYmplY3QuY3JlYXRlIHN1cHBvcnRcbiAgICAgICAgdmFyIHN1cHBvcnRzUHJvdG8gPSB7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5OyAvLyBmZWF0dXJlIHRlc3QgZm9yIF9fcHJvdG9fXyBzdXBwb3J0XG4gICAgICAgIHZhciBkb3duTGV2ZWwgPSAhc3VwcG9ydHNDcmVhdGUgJiYgIXN1cHBvcnRzUHJvdG87XG4gICAgICAgIHZhciBIYXNoTWFwID0ge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGFuIG9iamVjdCBpbiBkaWN0aW9uYXJ5IG1vZGUgKGEuay5hLiBcInNsb3dcIiBtb2RlIGluIHY4KVxuICAgICAgICAgICAgY3JlYXRlOiBzdXBwb3J0c0NyZWF0ZVxuICAgICAgICAgICAgICAgID8gZnVuY3Rpb24gKCkgeyByZXR1cm4gTWFrZURpY3Rpb25hcnkoT2JqZWN0LmNyZWF0ZShudWxsKSk7IH1cbiAgICAgICAgICAgICAgICA6IHN1cHBvcnRzUHJvdG9cbiAgICAgICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBNYWtlRGljdGlvbmFyeSh7IF9fcHJvdG9fXzogbnVsbCB9KTsgfVxuICAgICAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIE1ha2VEaWN0aW9uYXJ5KHt9KTsgfSxcbiAgICAgICAgICAgIGhhczogZG93bkxldmVsXG4gICAgICAgICAgICAgICAgPyBmdW5jdGlvbiAobWFwLCBrZXkpIHsgcmV0dXJuIGhhc093bi5jYWxsKG1hcCwga2V5KTsgfVxuICAgICAgICAgICAgICAgIDogZnVuY3Rpb24gKG1hcCwga2V5KSB7IHJldHVybiBrZXkgaW4gbWFwOyB9LFxuICAgICAgICAgICAgZ2V0OiBkb3duTGV2ZWxcbiAgICAgICAgICAgICAgICA/IGZ1bmN0aW9uIChtYXAsIGtleSkgeyByZXR1cm4gaGFzT3duLmNhbGwobWFwLCBrZXkpID8gbWFwW2tleV0gOiB1bmRlZmluZWQ7IH1cbiAgICAgICAgICAgICAgICA6IGZ1bmN0aW9uIChtYXAsIGtleSkgeyByZXR1cm4gbWFwW2tleV07IH0sXG4gICAgICAgIH07XG4gICAgICAgIC8vIExvYWQgZ2xvYmFsIG9yIHNoaW0gdmVyc2lvbnMgb2YgTWFwLCBTZXQsIGFuZCBXZWFrTWFwXG4gICAgICAgIHZhciBmdW5jdGlvblByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihGdW5jdGlvbik7XG4gICAgICAgIHZhciB1c2VQb2x5ZmlsbCA9IHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52W1wiUkVGTEVDVF9NRVRBREFUQV9VU0VfTUFQX1BPTFlGSUxMXCJdID09PSBcInRydWVcIjtcbiAgICAgICAgdmFyIF9NYXAgPSAhdXNlUG9seWZpbGwgJiYgdHlwZW9mIE1hcCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBNYXAucHJvdG90eXBlLmVudHJpZXMgPT09IFwiZnVuY3Rpb25cIiA/IE1hcCA6IENyZWF0ZU1hcFBvbHlmaWxsKCk7XG4gICAgICAgIHZhciBfU2V0ID0gIXVzZVBvbHlmaWxsICYmIHR5cGVvZiBTZXQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU2V0LnByb3RvdHlwZS5lbnRyaWVzID09PSBcImZ1bmN0aW9uXCIgPyBTZXQgOiBDcmVhdGVTZXRQb2x5ZmlsbCgpO1xuICAgICAgICB2YXIgX1dlYWtNYXAgPSAhdXNlUG9seWZpbGwgJiYgdHlwZW9mIFdlYWtNYXAgPT09IFwiZnVuY3Rpb25cIiA/IFdlYWtNYXAgOiBDcmVhdGVXZWFrTWFwUG9seWZpbGwoKTtcbiAgICAgICAgLy8gW1tNZXRhZGF0YV1dIGludGVybmFsIHNsb3RcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnktb2JqZWN0LWludGVybmFsLW1ldGhvZHMtYW5kLWludGVybmFsLXNsb3RzXG4gICAgICAgIHZhciBNZXRhZGF0YSA9IG5ldyBfV2Vha01hcCgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXBwbGllcyBhIHNldCBvZiBkZWNvcmF0b3JzIHRvIGEgcHJvcGVydHkgb2YgYSB0YXJnZXQgb2JqZWN0LlxuICAgICAgICAgKiBAcGFyYW0gZGVjb3JhdG9ycyBBbiBhcnJheSBvZiBkZWNvcmF0b3JzLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0LlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IHRvIGRlY29yYXRlLlxuICAgICAgICAgKiBAcGFyYW0gYXR0cmlidXRlcyAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZvciB0aGUgdGFyZ2V0IGtleS5cbiAgICAgICAgICogQHJlbWFya3MgRGVjb3JhdG9ycyBhcmUgYXBwbGllZCBpbiByZXZlcnNlIG9yZGVyLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICBFeGFtcGxlID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzQXJyYXksIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiLFxuICAgICAgICAgKiAgICAgICAgIFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9yc0FycmF5LCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiLFxuICAgICAgICAgKiAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpKSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIixcbiAgICAgICAgICogICAgICAgICBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnNBcnJheSwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIsXG4gICAgICAgICAqICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpKSk7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBkZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIHByb3BlcnR5S2V5LCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSkge1xuICAgICAgICAgICAgICAgIGlmICghSXNBcnJheShkZWNvcmF0b3JzKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QoYXR0cmlidXRlcykgJiYgIUlzVW5kZWZpbmVkKGF0dHJpYnV0ZXMpICYmICFJc051bGwoYXR0cmlidXRlcykpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoSXNOdWxsKGF0dHJpYnV0ZXMpKVxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERlY29yYXRlUHJvcGVydHkoZGVjb3JhdG9ycywgdGFyZ2V0LCBwcm9wZXJ0eUtleSwgYXR0cmlidXRlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIUlzQXJyYXkoZGVjb3JhdG9ycykpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICBpZiAoIUlzQ29uc3RydWN0b3IodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBEZWNvcmF0ZUNvbnN0cnVjdG9yKGRlY29yYXRvcnMsIHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJkZWNvcmF0ZVwiLCBkZWNvcmF0ZSk7XG4gICAgICAgIC8vIDQuMS4yIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI3JlZmxlY3QubWV0YWRhdGFcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZGVmYXVsdCBtZXRhZGF0YSBkZWNvcmF0b3IgZmFjdG9yeSB0aGF0IGNhbiBiZSB1c2VkIG9uIGEgY2xhc3MsIGNsYXNzIG1lbWJlciwgb3IgcGFyYW1ldGVyLlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgVGhlIGtleSBmb3IgdGhlIG1ldGFkYXRhIGVudHJ5LlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFWYWx1ZSBUaGUgdmFsdWUgZm9yIHRoZSBtZXRhZGF0YSBlbnRyeS5cbiAgICAgICAgICogQHJldHVybnMgQSBkZWNvcmF0b3IgZnVuY3Rpb24uXG4gICAgICAgICAqIEByZW1hcmtzXG4gICAgICAgICAqIElmIGBtZXRhZGF0YUtleWAgaXMgYWxyZWFkeSBkZWZpbmVkIGZvciB0aGUgdGFyZ2V0IGFuZCB0YXJnZXQga2V5LCB0aGVcbiAgICAgICAgICogbWV0YWRhdGFWYWx1ZSBmb3IgdGhhdCBrZXkgd2lsbCBiZSBvdmVyd3JpdHRlbi5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IsIFR5cGVTY3JpcHQgb25seSlcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIEBSZWZsZWN0Lm1ldGFkYXRhKGtleSwgdmFsdWUpXG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSwgVHlwZVNjcmlwdCBvbmx5KVxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgQFJlZmxlY3QubWV0YWRhdGEoa2V5LCB2YWx1ZSlcbiAgICAgICAgICogICAgICAgICBwcm9wZXJ0eTtcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICBAUmVmbGVjdC5tZXRhZGF0YShrZXksIHZhbHVlKVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QoKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgQFJlZmxlY3QubWV0YWRhdGEoa2V5LCB2YWx1ZSlcbiAgICAgICAgICogICAgICAgICBtZXRob2QoKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBkZWNvcmF0b3IodGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpICYmICFJc1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIE9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUsIHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlY29yYXRvcjtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcIm1ldGFkYXRhXCIsIG1ldGFkYXRhKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZSBhIHVuaXF1ZSBtZXRhZGF0YSBlbnRyeSBvbiB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSBtZXRhZGF0YVZhbHVlIEEgdmFsdWUgdGhhdCBjb250YWlucyBhdHRhY2hlZCBtZXRhZGF0YS5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0byBkZWZpbmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgb3B0aW9ucywgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBvcHRpb25zLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBkZWNvcmF0b3IgZmFjdG9yeSBhcyBtZXRhZGF0YS1wcm9kdWNpbmcgYW5ub3RhdGlvbi5cbiAgICAgICAgICogICAgIGZ1bmN0aW9uIE15QW5ub3RhdGlvbihvcHRpb25zKTogRGVjb3JhdG9yIHtcbiAgICAgICAgICogICAgICAgICByZXR1cm4gKHRhcmdldCwga2V5PykgPT4gUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIG9wdGlvbnMsIHRhcmdldCwga2V5KTtcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGRlZmluZU1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeURlZmluZU93bk1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlLCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImRlZmluZU1ldGFkYXRhXCIsIGRlZmluZU1ldGFkYXRhKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgYSB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHRhcmdldCBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbiBoYXMgdGhlIHByb3ZpZGVkIG1ldGFkYXRhIGtleSBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgbWV0YWRhdGEga2V5IHdhcyBkZWZpbmVkIG9uIHRoZSB0YXJnZXQgb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUgY2hhaW47IG90aGVyd2lzZSwgYGZhbHNlYC5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljUHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUucHJvdG90eXBlLCBcIm1ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGhhc01ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHRhcmdldCkpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgaWYgKCFJc1VuZGVmaW5lZChwcm9wZXJ0eUtleSkpXG4gICAgICAgICAgICAgICAgcHJvcGVydHlLZXkgPSBUb1Byb3BlcnR5S2V5KHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUhhc01ldGFkYXRhKG1ldGFkYXRhS2V5LCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRlcihcImhhc01ldGFkYXRhXCIsIGhhc01ldGFkYXRhKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgYSB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHRhcmdldCBvYmplY3QgaGFzIHRoZSBwcm92aWRlZCBtZXRhZGF0YSBrZXkgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG1ldGFkYXRhIGtleSB3YXMgZGVmaW5lZCBvbiB0aGUgdGFyZ2V0IG9iamVjdDsgb3RoZXJ3aXNlLCBgZmFsc2VgLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5oYXNPd25NZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0Lmhhc093bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gaGFzT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5SGFzT3duTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiaGFzT3duTWV0YWRhdGFcIiwgaGFzT3duTWV0YWRhdGEpO1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgbWV0YWRhdGEgdmFsdWUgZm9yIHRoZSBwcm92aWRlZCBtZXRhZGF0YSBrZXkgb24gdGhlIHRhcmdldCBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbi5cbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgbWV0YWRhdGEgdmFsdWUgZm9yIHRoZSBtZXRhZGF0YSBrZXkgaWYgZm91bmQ7IG90aGVyd2lzZSwgYHVuZGVmaW5lZGAuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlHZXRNZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJnZXRNZXRhZGF0YVwiLCBnZXRNZXRhZGF0YSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBtZXRhZGF0YSB2YWx1ZSBmb3IgdGhlIHByb3ZpZGVkIG1ldGFkYXRhIGtleSBvbiB0aGUgdGFyZ2V0IG9iamVjdC5cbiAgICAgICAgICogQHBhcmFtIG1ldGFkYXRhS2V5IEEga2V5IHVzZWQgdG8gc3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhLlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgbWV0YWRhdGEgdmFsdWUgZm9yIHRoZSBtZXRhZGF0YSBrZXkgaWYgZm91bmQ7IG90aGVyd2lzZSwgYHVuZGVmaW5lZGAuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNNZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGEoXCJjdXN0b206YW5ub3RhdGlvblwiLCBFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlHZXRPd25NZXRhZGF0YShtZXRhZGF0YUtleSwgdGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJnZXRPd25NZXRhZGF0YVwiLCBnZXRPd25NZXRhZGF0YSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBtZXRhZGF0YSBrZXlzIGRlZmluZWQgb24gdGhlIHRhcmdldCBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbi5cbiAgICAgICAgICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IG9iamVjdCBvbiB3aGljaCB0aGUgbWV0YWRhdGEgaXMgZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHByb3BlcnR5S2V5IChPcHRpb25hbCkgVGhlIHByb3BlcnR5IGtleSBmb3IgdGhlIHRhcmdldC5cbiAgICAgICAgICogQHJldHVybnMgQW4gYXJyYXkgb2YgdW5pcXVlIG1ldGFkYXRhIGtleXMuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBjbGFzcyBFeGFtcGxlIHtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eSBkZWNsYXJhdGlvbnMgYXJlIG5vdCBwYXJ0IG9mIEVTNiwgdGhvdWdoIHRoZXkgYXJlIHZhbGlkIGluIFR5cGVTY3JpcHQ6XG4gICAgICAgICAqICAgICAgICAgLy8gc3RhdGljIHN0YXRpY1Byb3BlcnR5O1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5O1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgIGNvbnN0cnVjdG9yKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIHN0YXRpYyBzdGF0aWNNZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgbWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0TWV0YWRhdGFLZXlzKEV4YW1wbGUpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMoRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlLnByb3RvdHlwZSwgXCJwcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE1ldGFkYXRhS2V5cyhFeGFtcGxlLCBcInN0YXRpY01ldGhvZFwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIG1ldGhvZCAob24gcHJvdG90eXBlKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRNZXRhZGF0YUtleXMoRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0TWV0YWRhdGFLZXlzKHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgcmV0dXJuIE9yZGluYXJ5TWV0YWRhdGFLZXlzKHRhcmdldCwgcHJvcGVydHlLZXkpO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydGVyKFwiZ2V0TWV0YWRhdGFLZXlzXCIsIGdldE1ldGFkYXRhS2V5cyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSB1bmlxdWUgbWV0YWRhdGEga2V5cyBkZWZpbmVkIG9uIHRoZSB0YXJnZXQgb2JqZWN0LlxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IG9uIHdoaWNoIHRoZSBtZXRhZGF0YSBpcyBkZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlLZXkgKE9wdGlvbmFsKSBUaGUgcHJvcGVydHkga2V5IGZvciB0aGUgdGFyZ2V0LlxuICAgICAgICAgKiBAcmV0dXJucyBBbiBhcnJheSBvZiB1bmlxdWUgbWV0YWRhdGEga2V5cy5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIGNsYXNzIEV4YW1wbGUge1xuICAgICAgICAgKiAgICAgICAgIC8vIHByb3BlcnR5IGRlY2xhcmF0aW9ucyBhcmUgbm90IHBhcnQgb2YgRVM2LCB0aG91Z2ggdGhleSBhcmUgdmFsaWQgaW4gVHlwZVNjcmlwdDpcbiAgICAgICAgICogICAgICAgICAvLyBzdGF0aWMgc3RhdGljUHJvcGVydHk7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgY29uc3RydWN0b3IocCkgeyB9XG4gICAgICAgICAqICAgICAgICAgc3RhdGljIHN0YXRpY01ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgICAgICBtZXRob2QocCkgeyB9XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBjb25zdHJ1Y3RvclxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5nZXRPd25NZXRhZGF0YUtleXMoRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhFeGFtcGxlLCBcInN0YXRpY1Byb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gcHJvcGVydHkgKG9uIHByb3RvdHlwZSlcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUucHJvdG90eXBlLCBcInByb3BlcnR5XCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBjb25zdHJ1Y3RvcilcbiAgICAgICAgICogICAgIHJlc3VsdCA9IFJlZmxlY3QuZ2V0T3duTWV0YWRhdGFLZXlzKEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmdldE93bk1ldGFkYXRhS2V5cyhFeGFtcGxlLnByb3RvdHlwZSwgXCJtZXRob2RcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZXRPd25NZXRhZGF0YUtleXModGFyZ2V0LCBwcm9wZXJ0eUtleSkge1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdCh0YXJnZXQpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIGlmICghSXNVbmRlZmluZWQocHJvcGVydHlLZXkpKVxuICAgICAgICAgICAgICAgIHByb3BlcnR5S2V5ID0gVG9Qcm9wZXJ0eUtleShwcm9wZXJ0eUtleSk7XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlPd25NZXRhZGF0YUtleXModGFyZ2V0LCBwcm9wZXJ0eUtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJnZXRPd25NZXRhZGF0YUtleXNcIiwgZ2V0T3duTWV0YWRhdGFLZXlzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlbGV0ZXMgdGhlIG1ldGFkYXRhIGVudHJ5IGZyb20gdGhlIHRhcmdldCBvYmplY3Qgd2l0aCB0aGUgcHJvdmlkZWQga2V5LlxuICAgICAgICAgKiBAcGFyYW0gbWV0YWRhdGFLZXkgQSBrZXkgdXNlZCB0byBzdG9yZSBhbmQgcmV0cmlldmUgbWV0YWRhdGEuXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3Qgb24gd2hpY2ggdGhlIG1ldGFkYXRhIGlzIGRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eUtleSAoT3B0aW9uYWwpIFRoZSBwcm9wZXJ0eSBrZXkgZm9yIHRoZSB0YXJnZXQuXG4gICAgICAgICAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgbWV0YWRhdGEgZW50cnkgd2FzIGZvdW5kIGFuZCBkZWxldGVkOyBvdGhlcndpc2UsIGZhbHNlLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgY2xhc3MgRXhhbXBsZSB7XG4gICAgICAgICAqICAgICAgICAgLy8gcHJvcGVydHkgZGVjbGFyYXRpb25zIGFyZSBub3QgcGFydCBvZiBFUzYsIHRob3VnaCB0aGV5IGFyZSB2YWxpZCBpbiBUeXBlU2NyaXB0OlxuICAgICAgICAgKiAgICAgICAgIC8vIHN0YXRpYyBzdGF0aWNQcm9wZXJ0eTtcbiAgICAgICAgICogICAgICAgICAvLyBwcm9wZXJ0eTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICBjb25zdHJ1Y3RvcihwKSB7IH1cbiAgICAgICAgICogICAgICAgICBzdGF0aWMgc3RhdGljTWV0aG9kKHApIHsgfVxuICAgICAgICAgKiAgICAgICAgIG1ldGhvZChwKSB7IH1cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIGNvbnN0cnVjdG9yXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBwcm9wZXJ0eSAob24gY29uc3RydWN0b3IpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZSwgXCJzdGF0aWNQcm9wZXJ0eVwiKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIHByb3BlcnR5IChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwicHJvcGVydHlcIik7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBtZXRob2QgKG9uIGNvbnN0cnVjdG9yKVxuICAgICAgICAgKiAgICAgcmVzdWx0ID0gUmVmbGVjdC5kZWxldGVNZXRhZGF0YShcImN1c3RvbTphbm5vdGF0aW9uXCIsIEV4YW1wbGUsIFwic3RhdGljTWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gbWV0aG9kIChvbiBwcm90b3R5cGUpXG4gICAgICAgICAqICAgICByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZU1ldGFkYXRhKFwiY3VzdG9tOmFubm90YXRpb25cIiwgRXhhbXBsZS5wcm90b3R5cGUsIFwibWV0aG9kXCIpO1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZGVsZXRlTWV0YWRhdGEobWV0YWRhdGFLZXksIHRhcmdldCwgcHJvcGVydHlLZXkpIHtcbiAgICAgICAgICAgIGlmICghSXNPYmplY3QodGFyZ2V0KSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKHByb3BlcnR5S2V5KSlcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleSA9IFRvUHJvcGVydHlLZXkocHJvcGVydHlLZXkpO1xuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcCh0YXJnZXQsIHByb3BlcnR5S2V5LCAvKkNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZChtZXRhZGF0YU1hcCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFtZXRhZGF0YU1hcC5kZWxldGUobWV0YWRhdGFLZXkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YU1hcC5zaXplID4gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIHZhciB0YXJnZXRNZXRhZGF0YSA9IE1ldGFkYXRhLmdldCh0YXJnZXQpO1xuICAgICAgICAgICAgdGFyZ2V0TWV0YWRhdGEuZGVsZXRlKHByb3BlcnR5S2V5KTtcbiAgICAgICAgICAgIGlmICh0YXJnZXRNZXRhZGF0YS5zaXplID4gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIE1ldGFkYXRhLmRlbGV0ZSh0YXJnZXQpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZXhwb3J0ZXIoXCJkZWxldGVNZXRhZGF0YVwiLCBkZWxldGVNZXRhZGF0YSk7XG4gICAgICAgIGZ1bmN0aW9uIERlY29yYXRlQ29uc3RydWN0b3IoZGVjb3JhdG9ycywgdGFyZ2V0KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIHZhciBkZWNvcmF0b3IgPSBkZWNvcmF0b3JzW2ldO1xuICAgICAgICAgICAgICAgIHZhciBkZWNvcmF0ZWQgPSBkZWNvcmF0b3IodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKGRlY29yYXRlZCkgJiYgIUlzTnVsbChkZWNvcmF0ZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNDb25zdHJ1Y3RvcihkZWNvcmF0ZWQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSBkZWNvcmF0ZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBEZWNvcmF0ZVByb3BlcnR5KGRlY29yYXRvcnMsIHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlY29yYXRvciA9IGRlY29yYXRvcnNbaV07XG4gICAgICAgICAgICAgICAgdmFyIGRlY29yYXRlZCA9IGRlY29yYXRvcih0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgICAgICBpZiAoIUlzVW5kZWZpbmVkKGRlY29yYXRlZCkgJiYgIUlzTnVsbChkZWNvcmF0ZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QoZGVjb3JhdGVkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRvciA9IGRlY29yYXRlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRvcjtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIENyZWF0ZSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldE1ldGFkYXRhID0gTWV0YWRhdGEuZ2V0KE8pO1xuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKHRhcmdldE1ldGFkYXRhKSkge1xuICAgICAgICAgICAgICAgIGlmICghQ3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRhcmdldE1ldGFkYXRhID0gbmV3IF9NYXAoKTtcbiAgICAgICAgICAgICAgICBNZXRhZGF0YS5zZXQoTywgdGFyZ2V0TWV0YWRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gdGFyZ2V0TWV0YWRhdGEuZ2V0KFApO1xuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSkge1xuICAgICAgICAgICAgICAgIGlmICghQ3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhTWFwID0gbmV3IF9NYXAoKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRNZXRhZGF0YS5zZXQoUCwgbWV0YWRhdGFNYXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1ldGFkYXRhTWFwO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuMS4xLjEgT3JkaW5hcnlIYXNNZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUClcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnloYXNtZXRhZGF0YVxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeUhhc01ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKSB7XG4gICAgICAgICAgICB2YXIgaGFzT3duID0gT3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCk7XG4gICAgICAgICAgICBpZiAoaGFzT3duKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTyk7XG4gICAgICAgICAgICBpZiAoIUlzTnVsbChwYXJlbnQpKVxuICAgICAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUhhc01ldGFkYXRhKE1ldGFkYXRhS2V5LCBwYXJlbnQsIFApO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuMS4yLjEgT3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUClcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnloYXNvd25tZXRhZGF0YVxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeUhhc093bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKSB7XG4gICAgICAgICAgICB2YXIgbWV0YWRhdGFNYXAgPSBHZXRPckNyZWF0ZU1ldGFkYXRhTWFwKE8sIFAsIC8qQ3JlYXRlKi8gZmFsc2UpO1xuICAgICAgICAgICAgaWYgKElzVW5kZWZpbmVkKG1ldGFkYXRhTWFwKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gVG9Cb29sZWFuKG1ldGFkYXRhTWFwLmhhcyhNZXRhZGF0YUtleSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIDMuMS4zLjEgT3JkaW5hcnlHZXRNZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUClcbiAgICAgICAgLy8gaHR0cHM6Ly9yYnVja3Rvbi5naXRodWIuaW8vcmVmbGVjdC1tZXRhZGF0YS8jb3JkaW5hcnlnZXRtZXRhZGF0YVxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeUdldE1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKSB7XG4gICAgICAgICAgICB2YXIgaGFzT3duID0gT3JkaW5hcnlIYXNPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTywgUCk7XG4gICAgICAgICAgICBpZiAoaGFzT3duKVxuICAgICAgICAgICAgICAgIHJldHVybiBPcmRpbmFyeUdldE93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKTtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBPcmRpbmFyeUdldFByb3RvdHlwZU9mKE8pO1xuICAgICAgICAgICAgaWYgKCFJc051bGwocGFyZW50KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlHZXRNZXRhZGF0YShNZXRhZGF0YUtleSwgcGFyZW50LCBQKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjQuMSBPcmRpbmFyeUdldE93bk1ldGFkYXRhKE1ldGFkYXRhS2V5LCBPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeWdldG93bm1ldGFkYXRhXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5R2V0T3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE8sIFApIHtcbiAgICAgICAgICAgIHZhciBtZXRhZGF0YU1hcCA9IEdldE9yQ3JlYXRlTWV0YWRhdGFNYXAoTywgUCwgLypDcmVhdGUqLyBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoSXNVbmRlZmluZWQobWV0YWRhdGFNYXApKVxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gbWV0YWRhdGFNYXAuZ2V0KE1ldGFkYXRhS2V5KTtcbiAgICAgICAgfVxuICAgICAgICAvLyAzLjEuNS4xIE9yZGluYXJ5RGVmaW5lT3duTWV0YWRhdGEoTWV0YWRhdGFLZXksIE1ldGFkYXRhVmFsdWUsIE8sIFApXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5ZGVmaW5lb3dubWV0YWRhdGFcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlEZWZpbmVPd25NZXRhZGF0YShNZXRhZGF0YUtleSwgTWV0YWRhdGFWYWx1ZSwgTywgUCkge1xuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCAvKkNyZWF0ZSovIHRydWUpO1xuICAgICAgICAgICAgbWV0YWRhdGFNYXAuc2V0KE1ldGFkYXRhS2V5LCBNZXRhZGF0YVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyAzLjEuNi4xIE9yZGluYXJ5TWV0YWRhdGFLZXlzKE8sIFApXG4gICAgICAgIC8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI29yZGluYXJ5bWV0YWRhdGFrZXlzXG4gICAgICAgIGZ1bmN0aW9uIE9yZGluYXJ5TWV0YWRhdGFLZXlzKE8sIFApIHtcbiAgICAgICAgICAgIHZhciBvd25LZXlzID0gT3JkaW5hcnlPd25NZXRhZGF0YUtleXMoTywgUCk7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gT3JkaW5hcnlHZXRQcm90b3R5cGVPZihPKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG93bktleXM7XG4gICAgICAgICAgICB2YXIgcGFyZW50S2V5cyA9IE9yZGluYXJ5TWV0YWRhdGFLZXlzKHBhcmVudCwgUCk7XG4gICAgICAgICAgICBpZiAocGFyZW50S2V5cy5sZW5ndGggPD0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gb3duS2V5cztcbiAgICAgICAgICAgIGlmIChvd25LZXlzLmxlbmd0aCA8PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnRLZXlzO1xuICAgICAgICAgICAgdmFyIHNldCA9IG5ldyBfU2V0KCk7XG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBvd25LZXlzXzEgPSBvd25LZXlzOyBfaSA8IG93bktleXNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gb3duS2V5c18xW19pXTtcbiAgICAgICAgICAgICAgICB2YXIgaGFzS2V5ID0gc2V0LmhhcyhrZXkpO1xuICAgICAgICAgICAgICAgIGlmICghaGFzS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldC5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBwYXJlbnRLZXlzXzEgPSBwYXJlbnRLZXlzOyBfYSA8IHBhcmVudEtleXNfMS5sZW5ndGg7IF9hKyspIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gcGFyZW50S2V5c18xW19hXTtcbiAgICAgICAgICAgICAgICB2YXIgaGFzS2V5ID0gc2V0LmhhcyhrZXkpO1xuICAgICAgICAgICAgICAgIGlmICghaGFzS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldC5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4xLjcuMSBPcmRpbmFyeU93bk1ldGFkYXRhS2V5cyhPLCBQKVxuICAgICAgICAvLyBodHRwczovL3JidWNrdG9uLmdpdGh1Yi5pby9yZWZsZWN0LW1ldGFkYXRhLyNvcmRpbmFyeW93bm1ldGFkYXRha2V5c1xuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeU93bk1ldGFkYXRhS2V5cyhPLCBQKSB7XG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICAgICAgdmFyIG1ldGFkYXRhTWFwID0gR2V0T3JDcmVhdGVNZXRhZGF0YU1hcChPLCBQLCAvKkNyZWF0ZSovIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChJc1VuZGVmaW5lZChtZXRhZGF0YU1hcCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgICAgICAgICB2YXIga2V5c09iaiA9IG1ldGFkYXRhTWFwLmtleXMoKTtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IEdldEl0ZXJhdG9yKGtleXNPYmopO1xuICAgICAgICAgICAgdmFyIGsgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IEl0ZXJhdG9yU3RlcChpdGVyYXRvcik7XG4gICAgICAgICAgICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXMubGVuZ3RoID0gaztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBuZXh0VmFsdWUgPSBJdGVyYXRvclZhbHVlKG5leHQpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGtleXNba10gPSBuZXh0VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIDYgRUNNQVNjcmlwdCBEYXRhIFR5cDBlcyBhbmQgVmFsdWVzXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWVjbWFzY3JpcHQtZGF0YS10eXBlcy1hbmQtdmFsdWVzXG4gICAgICAgIGZ1bmN0aW9uIFR5cGUoeCkge1xuICAgICAgICAgICAgaWYgKHggPT09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDEgLyogTnVsbCAqLztcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIHgpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6IHJldHVybiAwIC8qIFVuZGVmaW5lZCAqLztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOiByZXR1cm4gMiAvKiBCb29sZWFuICovO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjogcmV0dXJuIDMgLyogU3RyaW5nICovO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzeW1ib2xcIjogcmV0dXJuIDQgLyogU3ltYm9sICovO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjogcmV0dXJuIDUgLyogTnVtYmVyICovO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjogcmV0dXJuIHggPT09IG51bGwgPyAxIC8qIE51bGwgKi8gOiA2IC8qIE9iamVjdCAqLztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gNiAvKiBPYmplY3QgKi87XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gNi4xLjEgVGhlIFVuZGVmaW5lZCBUeXBlXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMtdW5kZWZpbmVkLXR5cGVcbiAgICAgICAgZnVuY3Rpb24gSXNVbmRlZmluZWQoeCkge1xuICAgICAgICAgICAgcmV0dXJuIHggPT09IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICAvLyA2LjEuMiBUaGUgTnVsbCBUeXBlXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMtbnVsbC10eXBlXG4gICAgICAgIGZ1bmN0aW9uIElzTnVsbCh4KSB7XG4gICAgICAgICAgICByZXR1cm4geCA9PT0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyA2LjEuNSBUaGUgU3ltYm9sIFR5cGVcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcy1zeW1ib2wtdHlwZVxuICAgICAgICBmdW5jdGlvbiBJc1N5bWJvbCh4KSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHggPT09IFwic3ltYm9sXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNi4xLjcgVGhlIE9iamVjdCBUeXBlXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC10eXBlXG4gICAgICAgIGZ1bmN0aW9uIElzT2JqZWN0KHgpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJvYmplY3RcIiA/IHggIT09IG51bGwgOiB0eXBlb2YgeCA9PT0gXCJmdW5jdGlvblwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMSBUeXBlIENvbnZlcnNpb25cbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdHlwZS1jb252ZXJzaW9uXG4gICAgICAgIC8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b3ByaW1pdGl2ZVxuICAgICAgICBmdW5jdGlvbiBUb1ByaW1pdGl2ZShpbnB1dCwgUHJlZmVycmVkVHlwZSkge1xuICAgICAgICAgICAgc3dpdGNoIChUeXBlKGlucHV0KSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMCAvKiBVbmRlZmluZWQgKi86IHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgICAgICBjYXNlIDEgLyogTnVsbCAqLzogcmV0dXJuIGlucHV0O1xuICAgICAgICAgICAgICAgIGNhc2UgMiAvKiBCb29sZWFuICovOiByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICAgICAgY2FzZSAzIC8qIFN0cmluZyAqLzogcmV0dXJuIGlucHV0O1xuICAgICAgICAgICAgICAgIGNhc2UgNCAvKiBTeW1ib2wgKi86IHJldHVybiBpbnB1dDtcbiAgICAgICAgICAgICAgICBjYXNlIDUgLyogTnVtYmVyICovOiByZXR1cm4gaW5wdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaGludCA9IFByZWZlcnJlZFR5cGUgPT09IDMgLyogU3RyaW5nICovID8gXCJzdHJpbmdcIiA6IFByZWZlcnJlZFR5cGUgPT09IDUgLyogTnVtYmVyICovID8gXCJudW1iZXJcIiA6IFwiZGVmYXVsdFwiO1xuICAgICAgICAgICAgdmFyIGV4b3RpY1RvUHJpbSA9IEdldE1ldGhvZChpbnB1dCwgdG9QcmltaXRpdmVTeW1ib2wpO1xuICAgICAgICAgICAgaWYgKGV4b3RpY1RvUHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGV4b3RpY1RvUHJpbS5jYWxsKGlucHV0LCBoaW50KTtcbiAgICAgICAgICAgICAgICBpZiAoSXNPYmplY3QocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gT3JkaW5hcnlUb1ByaW1pdGl2ZShpbnB1dCwgaGludCA9PT0gXCJkZWZhdWx0XCIgPyBcIm51bWJlclwiIDogaGludCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4xLjEuMSBPcmRpbmFyeVRvUHJpbWl0aXZlKE8sIGhpbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9yZGluYXJ5dG9wcmltaXRpdmVcbiAgICAgICAgZnVuY3Rpb24gT3JkaW5hcnlUb1ByaW1pdGl2ZShPLCBoaW50KSB7XG4gICAgICAgICAgICBpZiAoaGludCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIHZhciB0b1N0cmluZ18xID0gTy50b1N0cmluZztcbiAgICAgICAgICAgICAgICBpZiAoSXNDYWxsYWJsZSh0b1N0cmluZ18xKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdG9TdHJpbmdfMS5jYWxsKE8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHJlc3VsdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVPZiA9IE8udmFsdWVPZjtcbiAgICAgICAgICAgICAgICBpZiAoSXNDYWxsYWJsZSh2YWx1ZU9mKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdmFsdWVPZi5jYWxsKE8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHJlc3VsdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZU9mID0gTy52YWx1ZU9mO1xuICAgICAgICAgICAgICAgIGlmIChJc0NhbGxhYmxlKHZhbHVlT2YpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB2YWx1ZU9mLmNhbGwoTyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSXNPYmplY3QocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0b1N0cmluZ18yID0gTy50b1N0cmluZztcbiAgICAgICAgICAgICAgICBpZiAoSXNDYWxsYWJsZSh0b1N0cmluZ18yKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdG9TdHJpbmdfMi5jYWxsKE8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUlzT2JqZWN0KHJlc3VsdCkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjEuMiBUb0Jvb2xlYW4oYXJndW1lbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8yMDE2LyNzZWMtdG9ib29sZWFuXG4gICAgICAgIGZ1bmN0aW9uIFRvQm9vbGVhbihhcmd1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuICEhYXJndW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4xLjEyIFRvU3RyaW5nKGFyZ3VtZW50KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b3N0cmluZ1xuICAgICAgICBmdW5jdGlvbiBUb1N0cmluZyhhcmd1bWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBhcmd1bWVudDtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjEuMTQgVG9Qcm9wZXJ0eUtleShhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9wcm9wZXJ0eWtleVxuICAgICAgICBmdW5jdGlvbiBUb1Byb3BlcnR5S2V5KGFyZ3VtZW50KSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gVG9QcmltaXRpdmUoYXJndW1lbnQsIDMgLyogU3RyaW5nICovKTtcbiAgICAgICAgICAgIGlmIChJc1N5bWJvbChrZXkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICByZXR1cm4gVG9TdHJpbmcoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICAvLyA3LjIgVGVzdGluZyBhbmQgQ29tcGFyaXNvbiBPcGVyYXRpb25zXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRlc3RpbmctYW5kLWNvbXBhcmlzb24tb3BlcmF0aW9uc1xuICAgICAgICAvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pc2FycmF5XG4gICAgICAgIGZ1bmN0aW9uIElzQXJyYXkoYXJndW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5XG4gICAgICAgICAgICAgICAgPyBBcnJheS5pc0FycmF5KGFyZ3VtZW50KVxuICAgICAgICAgICAgICAgIDogYXJndW1lbnQgaW5zdGFuY2VvZiBPYmplY3RcbiAgICAgICAgICAgICAgICAgICAgPyBhcmd1bWVudCBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMi4zIElzQ2FsbGFibGUoYXJndW1lbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWlzY2FsbGFibGVcbiAgICAgICAgZnVuY3Rpb24gSXNDYWxsYWJsZShhcmd1bWVudCkge1xuICAgICAgICAgICAgLy8gTk9URTogVGhpcyBpcyBhbiBhcHByb3hpbWF0aW9uIGFzIHdlIGNhbm5vdCBjaGVjayBmb3IgW1tDYWxsXV0gaW50ZXJuYWwgbWV0aG9kLlxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmd1bWVudCA9PT0gXCJmdW5jdGlvblwiO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuMi40IElzQ29uc3RydWN0b3IoYXJndW1lbnQpXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWlzY29uc3RydWN0b3JcbiAgICAgICAgZnVuY3Rpb24gSXNDb25zdHJ1Y3Rvcihhcmd1bWVudCkge1xuICAgICAgICAgICAgLy8gTk9URTogVGhpcyBpcyBhbiBhcHByb3hpbWF0aW9uIGFzIHdlIGNhbm5vdCBjaGVjayBmb3IgW1tDb25zdHJ1Y3RdXSBpbnRlcm5hbCBtZXRob2QuXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09PSBcImZ1bmN0aW9uXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy4yLjcgSXNQcm9wZXJ0eUtleShhcmd1bWVudClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNwcm9wZXJ0eWtleVxuICAgICAgICBmdW5jdGlvbiBJc1Byb3BlcnR5S2V5KGFyZ3VtZW50KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKFR5cGUoYXJndW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAzIC8qIFN0cmluZyAqLzogcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZSA0IC8qIFN5bWJvbCAqLzogcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIDcuMyBPcGVyYXRpb25zIG9uIE9iamVjdHNcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3BlcmF0aW9ucy1vbi1vYmplY3RzXG4gICAgICAgIC8vIDcuMy45IEdldE1ldGhvZChWLCBQKVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1nZXRtZXRob2RcbiAgICAgICAgZnVuY3Rpb24gR2V0TWV0aG9kKFYsIFApIHtcbiAgICAgICAgICAgIHZhciBmdW5jID0gVltQXTtcbiAgICAgICAgICAgIGlmIChmdW5jID09PSB1bmRlZmluZWQgfHwgZnVuYyA9PT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKCFJc0NhbGxhYmxlKGZ1bmMpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuNCBPcGVyYXRpb25zIG9uIEl0ZXJhdG9yIE9iamVjdHNcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3BlcmF0aW9ucy1vbi1pdGVyYXRvci1vYmplY3RzXG4gICAgICAgIGZ1bmN0aW9uIEdldEl0ZXJhdG9yKG9iaikge1xuICAgICAgICAgICAgdmFyIG1ldGhvZCA9IEdldE1ldGhvZChvYmosIGl0ZXJhdG9yU3ltYm9sKTtcbiAgICAgICAgICAgIGlmICghSXNDYWxsYWJsZShtZXRob2QpKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTsgLy8gZnJvbSBDYWxsXG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBtZXRob2QuY2FsbChvYmopO1xuICAgICAgICAgICAgaWYgKCFJc09iamVjdChpdGVyYXRvcikpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xuICAgICAgICB9XG4gICAgICAgIC8vIDcuNC40IEl0ZXJhdG9yVmFsdWUoaXRlclJlc3VsdClcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLzIwMTYvI3NlYy1pdGVyYXRvcnZhbHVlXG4gICAgICAgIGZ1bmN0aW9uIEl0ZXJhdG9yVmFsdWUoaXRlclJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJSZXN1bHQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy40LjUgSXRlcmF0b3JTdGVwKGl0ZXJhdG9yKVxuICAgICAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1pdGVyYXRvcnN0ZXBcbiAgICAgICAgZnVuY3Rpb24gSXRlcmF0b3JTdGVwKGl0ZXJhdG9yKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gZmFsc2UgOiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXRlcmF0b3JjbG9zZVxuICAgICAgICBmdW5jdGlvbiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yKSB7XG4gICAgICAgICAgICB2YXIgZiA9IGl0ZXJhdG9yW1wicmV0dXJuXCJdO1xuICAgICAgICAgICAgaWYgKGYpXG4gICAgICAgICAgICAgICAgZi5jYWxsKGl0ZXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICAvLyA5LjEgT3JkaW5hcnkgT2JqZWN0IEludGVybmFsIE1ldGhvZHMgYW5kIEludGVybmFsIFNsb3RzXG4gICAgICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9yZGluYXJ5LW9iamVjdC1pbnRlcm5hbC1tZXRob2RzLWFuZC1pbnRlcm5hbC1zbG90c1xuICAgICAgICAvLyA5LjEuMS4xIE9yZGluYXJ5R2V0UHJvdG90eXBlT2YoTylcbiAgICAgICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb3JkaW5hcnlnZXRwcm90b3R5cGVvZlxuICAgICAgICBmdW5jdGlvbiBPcmRpbmFyeUdldFByb3RvdHlwZU9mKE8pIHtcbiAgICAgICAgICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgTyAhPT0gXCJmdW5jdGlvblwiIHx8IE8gPT09IGZ1bmN0aW9uUHJvdG90eXBlKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm90bztcbiAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQgZG9lc24ndCBzZXQgX19wcm90b19fIGluIEVTNSwgYXMgaXQncyBub24tc3RhbmRhcmQuXG4gICAgICAgICAgICAvLyBUcnkgdG8gZGV0ZXJtaW5lIHRoZSBzdXBlcmNsYXNzIGNvbnN0cnVjdG9yLiBDb21wYXRpYmxlIGltcGxlbWVudGF0aW9uc1xuICAgICAgICAgICAgLy8gbXVzdCBlaXRoZXIgc2V0IF9fcHJvdG9fXyBvbiBhIHN1YmNsYXNzIGNvbnN0cnVjdG9yIHRvIHRoZSBzdXBlcmNsYXNzIGNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgLy8gb3IgZW5zdXJlIGVhY2ggY2xhc3MgaGFzIGEgdmFsaWQgYGNvbnN0cnVjdG9yYCBwcm9wZXJ0eSBvbiBpdHMgcHJvdG90eXBlIHRoYXRcbiAgICAgICAgICAgIC8vIHBvaW50cyBiYWNrIHRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgbm90IHRoZSBzYW1lIGFzIEZ1bmN0aW9uLltbUHJvdG90eXBlXV0sIHRoZW4gdGhpcyBpcyBkZWZpbmF0ZWx5IGluaGVyaXRlZC5cbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdGhlIGNhc2Ugd2hlbiBpbiBFUzYgb3Igd2hlbiB1c2luZyBfX3Byb3RvX18gaW4gYSBjb21wYXRpYmxlIGJyb3dzZXIuXG4gICAgICAgICAgICBpZiAocHJvdG8gIT09IGZ1bmN0aW9uUHJvdG90eXBlKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm90bztcbiAgICAgICAgICAgIC8vIElmIHRoZSBzdXBlciBwcm90b3R5cGUgaXMgT2JqZWN0LnByb3RvdHlwZSwgbnVsbCwgb3IgdW5kZWZpbmVkLCB0aGVuIHdlIGNhbm5vdCBkZXRlcm1pbmUgdGhlIGhlcml0YWdlLlxuICAgICAgICAgICAgdmFyIHByb3RvdHlwZSA9IE8ucHJvdG90eXBlO1xuICAgICAgICAgICAgdmFyIHByb3RvdHlwZVByb3RvID0gcHJvdG90eXBlICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90b3R5cGUpO1xuICAgICAgICAgICAgaWYgKHByb3RvdHlwZVByb3RvID09IG51bGwgfHwgcHJvdG90eXBlUHJvdG8gPT09IE9iamVjdC5wcm90b3R5cGUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3RvO1xuICAgICAgICAgICAgLy8gSWYgdGhlIGNvbnN0cnVjdG9yIHdhcyBub3QgYSBmdW5jdGlvbiwgdGhlbiB3ZSBjYW5ub3QgZGV0ZXJtaW5lIHRoZSBoZXJpdGFnZS5cbiAgICAgICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IHByb3RvdHlwZVByb3RvLmNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zdHJ1Y3RvciAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm90bztcbiAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgc29tZSBraW5kIG9mIHNlbGYtcmVmZXJlbmNlLCB0aGVuIHdlIGNhbm5vdCBkZXRlcm1pbmUgdGhlIGhlcml0YWdlLlxuICAgICAgICAgICAgaWYgKGNvbnN0cnVjdG9yID09PSBPKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm90bztcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgYSBwcmV0dHkgZ29vZCBndWVzcyBhdCB0aGUgaGVyaXRhZ2UuXG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3I7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbmFpdmUgTWFwIHNoaW1cbiAgICAgICAgZnVuY3Rpb24gQ3JlYXRlTWFwUG9seWZpbGwoKSB7XG4gICAgICAgICAgICB2YXIgY2FjaGVTZW50aW5lbCA9IHt9O1xuICAgICAgICAgICAgdmFyIGFycmF5U2VudGluZWwgPSBbXTtcbiAgICAgICAgICAgIHZhciBNYXBJdGVyYXRvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBNYXBJdGVyYXRvcihrZXlzLCB2YWx1ZXMsIHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IGtleXM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlW1wiQEBpdGVyYXRvclwiXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG4gICAgICAgICAgICAgICAgTWFwSXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2luZGV4O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuX2tleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fc2VsZWN0b3IodGhpcy5fa2V5c1tpbmRleF0sIHRoaXMuX3ZhbHVlc1tpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICsgMSA+PSB0aGlzLl9rZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cyA9IGFycmF5U2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gYXJyYXlTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogcmVzdWx0LCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE1hcEl0ZXJhdG9yLnByb3RvdHlwZS50aHJvdyA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBhcnJheVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gYXJyYXlTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIE1hcEl0ZXJhdG9yLnByb3RvdHlwZS5yZXR1cm4gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGV4ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzID0gYXJyYXlTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IGFycmF5U2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWFwSXRlcmF0b3I7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBNYXAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlS2V5ID0gY2FjaGVTZW50aW5lbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVJbmRleCA9IC0yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWFwLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9rZXlzLmxlbmd0aDsgfSxcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB0aGlzLl9maW5kKGtleSwgLyppbnNlcnQqLyBmYWxzZSkgPj0gMDsgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZChrZXksIC8qaW5zZXJ0Ki8gZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXggPj0gMCA/IHRoaXMuX3ZhbHVlc1tpbmRleF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2ZpbmQoa2V5LCAvKmluc2VydCovIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2ZpbmQoa2V5LCAvKmluc2VydCovIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaXplID0gdGhpcy5fa2V5cy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gaW5kZXggKyAxOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5c1tpIC0gMV0gPSB0aGlzLl9rZXlzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1tpIC0gMV0gPSB0aGlzLl92YWx1ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlzLmxlbmd0aC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzLmxlbmd0aC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gdGhpcy5fY2FjaGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUtleSA9IGNhY2hlU2VudGluZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVJbmRleCA9IC0yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVLZXkgPSBjYWNoZVNlbnRpbmVsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZUluZGV4ID0gLTI7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTWFwSXRlcmF0b3IodGhpcy5fa2V5cywgdGhpcy5fdmFsdWVzLCBnZXRLZXkpOyB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE1hcEl0ZXJhdG9yKHRoaXMuX2tleXMsIHRoaXMuX3ZhbHVlcywgZ2V0VmFsdWUpOyB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBNYXBJdGVyYXRvcih0aGlzLl9rZXlzLCB0aGlzLl92YWx1ZXMsIGdldEVudHJ5KTsgfTtcbiAgICAgICAgICAgICAgICBNYXAucHJvdG90eXBlW1wiQEBpdGVyYXRvclwiXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZW50cmllcygpOyB9O1xuICAgICAgICAgICAgICAgIE1hcC5wcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzKCk7IH07XG4gICAgICAgICAgICAgICAgTWFwLnByb3RvdHlwZS5fZmluZCA9IGZ1bmN0aW9uIChrZXksIGluc2VydCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2FjaGVLZXkgIT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVJbmRleCA9IHRoaXMuX2tleXMuaW5kZXhPZih0aGlzLl9jYWNoZUtleSA9IGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NhY2hlSW5kZXggPCAwICYmIGluc2VydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FjaGVJbmRleCA9IHRoaXMuX2tleXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5cy5wdXNoKGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYWNoZUluZGV4O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hcDtcbiAgICAgICAgICAgIH0oKSk7XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRLZXkoa2V5LCBfKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFZhbHVlKF8sIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0RW50cnkoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gbmFpdmUgU2V0IHNoaW1cbiAgICAgICAgZnVuY3Rpb24gQ3JlYXRlU2V0UG9seWZpbGwoKSB7XG4gICAgICAgICAgICByZXR1cm4gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIFNldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwID0gbmV3IF9NYXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFNldC5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwLnNpemU7IH0sXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB0aGlzLl9tYXAuaGFzKHZhbHVlKTsgfTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdGhpcy5fbWFwLnNldCh2YWx1ZSwgdmFsdWUpLCB0aGlzOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB0aGlzLl9tYXAuZGVsZXRlKHZhbHVlKTsgfTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkgeyB0aGlzLl9tYXAuY2xlYXIoKTsgfTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9tYXAua2V5cygpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fbWFwLnZhbHVlcygpOyB9O1xuICAgICAgICAgICAgICAgIFNldC5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX21hcC5lbnRyaWVzKCk7IH07XG4gICAgICAgICAgICAgICAgU2V0LnByb3RvdHlwZVtcIkBAaXRlcmF0b3JcIl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmtleXMoKTsgfTtcbiAgICAgICAgICAgICAgICBTZXQucHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMua2V5cygpOyB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBTZXQ7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5haXZlIFdlYWtNYXAgc2hpbVxuICAgICAgICBmdW5jdGlvbiBDcmVhdGVXZWFrTWFwUG9seWZpbGwoKSB7XG4gICAgICAgICAgICB2YXIgVVVJRF9TSVpFID0gMTY7XG4gICAgICAgICAgICB2YXIga2V5cyA9IEhhc2hNYXAuY3JlYXRlKCk7XG4gICAgICAgICAgICB2YXIgcm9vdEtleSA9IENyZWF0ZVVuaXF1ZUtleSgpO1xuICAgICAgICAgICAgcmV0dXJuIC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBXZWFrTWFwKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXkgPSBDcmVhdGVVbmlxdWVLZXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgV2Vha01hcC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGUgPSBHZXRPckNyZWF0ZVdlYWtNYXBUYWJsZSh0YXJnZXQsIC8qY3JlYXRlKi8gZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGUgIT09IHVuZGVmaW5lZCA/IEhhc2hNYXAuaGFzKHRhYmxlLCB0aGlzLl9rZXkpIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgLypjcmVhdGUqLyBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZSAhPT0gdW5kZWZpbmVkID8gSGFzaE1hcC5nZXQodGFibGUsIHRoaXMuX2tleSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodGFyZ2V0LCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGUgPSBHZXRPckNyZWF0ZVdlYWtNYXBUYWJsZSh0YXJnZXQsIC8qY3JlYXRlKi8gdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlW3RoaXMuX2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBXZWFrTWFwLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWJsZSA9IEdldE9yQ3JlYXRlV2Vha01hcFRhYmxlKHRhcmdldCwgLypjcmVhdGUqLyBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YWJsZSAhPT0gdW5kZWZpbmVkID8gZGVsZXRlIHRhYmxlW3RoaXMuX2tleV0gOiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFdlYWtNYXAucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBub3QgYSByZWFsIGNsZWFyLCBqdXN0IG1ha2VzIHRoZSBwcmV2aW91cyBkYXRhIHVucmVhY2hhYmxlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleSA9IENyZWF0ZVVuaXF1ZUtleSgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIFdlYWtNYXA7XG4gICAgICAgICAgICB9KCkpO1xuICAgICAgICAgICAgZnVuY3Rpb24gQ3JlYXRlVW5pcXVlS2V5KCkge1xuICAgICAgICAgICAgICAgIHZhciBrZXk7XG4gICAgICAgICAgICAgICAgZG9cbiAgICAgICAgICAgICAgICAgICAga2V5ID0gXCJAQFdlYWtNYXBAQFwiICsgQ3JlYXRlVVVJRCgpO1xuICAgICAgICAgICAgICAgIHdoaWxlIChIYXNoTWFwLmhhcyhrZXlzLCBrZXkpKTtcbiAgICAgICAgICAgICAgICBrZXlzW2tleV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBHZXRPckNyZWF0ZVdlYWtNYXBUYWJsZSh0YXJnZXQsIGNyZWF0ZSkge1xuICAgICAgICAgICAgICAgIGlmICghaGFzT3duLmNhbGwodGFyZ2V0LCByb290S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNyZWF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHJvb3RLZXksIHsgdmFsdWU6IEhhc2hNYXAuY3JlYXRlKCkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcm9vdEtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBGaWxsUmFuZG9tQnl0ZXMoYnVmZmVyLCBzaXplKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlcltpXSA9IE1hdGgucmFuZG9tKCkgKiAweGZmIHwgMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gR2VuUmFuZG9tQnl0ZXMoc2l6ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgVWludDhBcnJheSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY3J5cHRvICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoc2l6ZSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG1zQ3J5cHRvICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheShzaXplKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBGaWxsUmFuZG9tQnl0ZXMobmV3IFVpbnQ4QXJyYXkoc2l6ZSksIHNpemUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gRmlsbFJhbmRvbUJ5dGVzKG5ldyBBcnJheShzaXplKSwgc2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBDcmVhdGVVVUlEKCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gR2VuUmFuZG9tQnl0ZXMoVVVJRF9TSVpFKTtcbiAgICAgICAgICAgICAgICAvLyBtYXJrIGFzIHJhbmRvbSAtIFJGQyA0MTIyIMKnIDQuNFxuICAgICAgICAgICAgICAgIGRhdGFbNl0gPSBkYXRhWzZdICYgMHg0ZiB8IDB4NDA7XG4gICAgICAgICAgICAgICAgZGF0YVs4XSA9IGRhdGFbOF0gJiAweGJmIHwgMHg4MDtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBVVUlEX1NJWkU7ICsrb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBieXRlID0gZGF0YVtvZmZzZXRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ID09PSA0IHx8IG9mZnNldCA9PT0gNiB8fCBvZmZzZXQgPT09IDgpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCItXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChieXRlIDwgMTYpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gXCIwXCI7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBieXRlLnRvU3RyaW5nKDE2KS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHVzZXMgYSBoZXVyaXN0aWMgdXNlZCBieSB2OCBhbmQgY2hha3JhIHRvIGZvcmNlIGFuIG9iamVjdCBpbnRvIGRpY3Rpb25hcnkgbW9kZS5cbiAgICAgICAgZnVuY3Rpb24gTWFrZURpY3Rpb25hcnkob2JqKSB7XG4gICAgICAgICAgICBvYmouX18gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBkZWxldGUgb2JqLl9fO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgIH0pO1xufSkoUmVmbGVjdCB8fCAoUmVmbGVjdCA9IHt9KSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9yZXNvdXJjZXMvbGliL0Rpc3BhdGNoZXIvRGlzcGF0Y2hlci50c1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vcmVzb3VyY2VzL2xpYi9EaXNwYXRjaGVyL0Rpc3BhdGNoZXIudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovICgoKSA9PiB7XG5cbnRocm93IG5ldyBFcnJvcihcIk1vZHVsZSBwYXJzZSBmYWlsZWQ6IFVuZXhwZWN0ZWQgY2hhcmFjdGVyICdAJyAoNjowKVxcbllvdSBtYXkgbmVlZCBhbiBhcHByb3ByaWF0ZSBsb2FkZXIgdG8gaGFuZGxlIHRoaXMgZmlsZSB0eXBlLCBjdXJyZW50bHkgbm8gbG9hZGVycyBhcmUgY29uZmlndXJlZCB0byBwcm9jZXNzIHRoaXMgZmlsZS4gU2VlIGh0dHBzOi8vd2VicGFjay5qcy5vcmcvY29uY2VwdHMjbG9hZGVyc1xcbnwgZGVjb3JhdGUoaW5qZWN0YWJsZSgpLCBFdmVudEVtaXR0ZXIyKTtcXG58IFxcbj4gQGluamVjdGFibGUoKVxcbnwgZXhwb3J0IGNsYXNzIERpc3BhdGNoZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIyIHtcXG58ICAgICBwcm90ZWN0ZWQgYW55TGlzdGVuZXJzOkFycmF5PCguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZD4gPSBbXTtcIik7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vcmVzb3VyY2VzL2xpYi9EaXNwYXRjaGVyL2luZGV4LnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vcmVzb3VyY2VzL2xpYi9EaXNwYXRjaGVyL2luZGV4LnRzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG5cInVzZSBzdHJpY3RcIjtcbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfRGlzcGF0Y2hlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9EaXNwYXRjaGVyICovIFwiLi9yZXNvdXJjZXMvbGliL0Rpc3BhdGNoZXIvRGlzcGF0Y2hlci50c1wiKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfRGlzcGF0Y2hlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fX2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovX193ZWJwYWNrX3JlcXVpcmVfXy5uKF9EaXNwYXRjaGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18pO1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gdmFyIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyA9IHt9O1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gZm9yKGNvbnN0IF9fV0VCUEFDS19JTVBPUlRfS0VZX18gaW4gX0Rpc3BhdGNoZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXykgaWYoX19XRUJQQUNLX0lNUE9SVF9LRVlfXyAhPT0gXCJkZWZhdWx0XCIpIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXSA9ICgpID0+IF9EaXNwYXRjaGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX11cbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX18pO1xuXG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9yZXNvdXJjZXMvbGliL0ZvdW5kYXRpb24vQXBwbGljYXRpb24udHNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9yZXNvdXJjZXMvbGliL0ZvdW5kYXRpb24vQXBwbGljYXRpb24udHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoKCkgPT4ge1xuXG50aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGUgcGFyc2UgZmFpbGVkOiBVbmV4cGVjdGVkIHRva2VuICg4OjI1KVxcbllvdSBtYXkgbmVlZCBhbiBhcHByb3ByaWF0ZSBsb2FkZXIgdG8gaGFuZGxlIHRoaXMgZmlsZSB0eXBlLCBjdXJyZW50bHkgbm8gbG9hZGVycyBhcmUgY29uZmlndXJlZCB0byBwcm9jZXNzIHRoaXMgZmlsZS4gU2VlIGh0dHBzOi8vd2VicGFjay5qcy5vcmcvY29uY2VwdHMjbG9hZGVyc1xcbnwgaW1wb3J0IHsgQXBwbGljYXRpb25Jbml0T3B0aW9ucywgQ29uZmlndXJhdGlvbiB9IGZyb20gJ0AvdHlwZXMvY29uZmlnJztcXG58IGltcG9ydCB7IElTZXJ2aWNlUHJvdmlkZXIsIElTZXJ2aWNlUHJvdmlkZXJDbGFzcyB9IGZyb20gJ0AvU3VwcG9ydC9TZXJ2aWNlUHJvdmlkZXInO1xcbj4gaW1wb3J0IFNlcnZpY2VJZGVudGlmaWVyID0gaW50ZXJmYWNlcy5TZXJ2aWNlSWRlbnRpZmllcjtcXG58IGltcG9ydCB7IGlzU2VydmljZVByb3ZpZGVyQ2xhc3MsIG1ha2VMb2cgfSBmcm9tICdAL1N1cHBvcnQvdXRpbHMnO1xcbnwgXCIpO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL3Jlc291cmNlcy9saWIvRm91bmRhdGlvbi9pbmRleC50c1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3Jlc291cmNlcy9saWIvRm91bmRhdGlvbi9pbmRleC50cyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovICgoX191bnVzZWRfd2VicGFja19tb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pID0+IHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX0FwcGxpY2F0aW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL0FwcGxpY2F0aW9uICovIFwiLi9yZXNvdXJjZXMvbGliL0ZvdW5kYXRpb24vQXBwbGljYXRpb24udHNcIik7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX0FwcGxpY2F0aW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9fX3dlYnBhY2tfcmVxdWlyZV9fLm4oX0FwcGxpY2F0aW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18pO1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gdmFyIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyA9IHt9O1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gZm9yKGNvbnN0IF9fV0VCUEFDS19JTVBPUlRfS0VZX18gaW4gX0FwcGxpY2F0aW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18pIGlmKF9fV0VCUEFDS19JTVBPUlRfS0VZX18gIT09IFwiZGVmYXVsdFwiKSBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX10gPSAoKSA9PiBfQXBwbGljYXRpb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXVxuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyk7XG5cblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL3Jlc291cmNlcy9saWIvSHR0cC9IdHRwU2VydmljZVByb3ZpZGVyLnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9yZXNvdXJjZXMvbGliL0h0dHAvSHR0cFNlcnZpY2VQcm92aWRlci50cyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKCgpID0+IHtcblxudGhyb3cgbmV3IEVycm9yKFwiTW9kdWxlIHBhcnNlIGZhaWxlZDogVW5leHBlY3RlZCB0b2tlbiAoMTY6NTApXFxuWW91IG1heSBuZWVkIGFuIGFwcHJvcHJpYXRlIGxvYWRlciB0byBoYW5kbGUgdGhpcyBmaWxlIHR5cGUsIGN1cnJlbnRseSBubyBsb2FkZXJzIGFyZSBjb25maWd1cmVkIHRvIHByb2Nlc3MgdGhpcyBmaWxlLiBTZWUgaHR0cHM6Ly93ZWJwYWNrLmpzLm9yZy9jb25jZXB0cyNsb2FkZXJzXFxufCAgICAgICAgIHRoaXMuYXBwLmluc3RhbmNlKCdheGlvcycsIEF4aW9zKTtcXG58ICAgICAgICAgdGhpcy5hcHAuaW5zdGFuY2UoJ2h0dHAnLCBheGlvcykuYWRkQmluZGluZ0dldHRlcignaHR0cCcpO1xcbj4gICAgICAgICB0aGlzLmFwcC5pbnN0YW5jZSgnY3JlYXRlSHR0cCcsIChvdmVycmlkZXM6IEF4aW9zUmVxdWVzdENvbmZpZyk6IEF4aW9zSW5zdGFuY2UgPT4ge1xcbnwgICAgICAgICAgICAgb3ZlcnJpZGVzID0ge1xcbnwgICAgICAgICAgICAgICAgIC4uLmNvbmZpZyxcIik7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vcmVzb3VyY2VzL2xpYi9IdHRwL2luZGV4LnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vcmVzb3VyY2VzL2xpYi9IdHRwL2luZGV4LnRzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG5cInVzZSBzdHJpY3RcIjtcbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfSHR0cFNlcnZpY2VQcm92aWRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9IdHRwU2VydmljZVByb3ZpZGVyICovIFwiLi9yZXNvdXJjZXMvbGliL0h0dHAvSHR0cFNlcnZpY2VQcm92aWRlci50c1wiKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfSHR0cFNlcnZpY2VQcm92aWRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fX2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovX193ZWJwYWNrX3JlcXVpcmVfXy5uKF9IdHRwU2VydmljZVByb3ZpZGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18pO1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gdmFyIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyA9IHt9O1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gZm9yKGNvbnN0IF9fV0VCUEFDS19JTVBPUlRfS0VZX18gaW4gX0h0dHBTZXJ2aWNlUHJvdmlkZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXykgaWYoX19XRUJQQUNLX0lNUE9SVF9LRVlfXyAhPT0gXCJkZWZhdWx0XCIpIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXSA9ICgpID0+IF9IdHRwU2VydmljZVByb3ZpZGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX11cbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX18pO1xuXG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvQ3JpdGVyaWEudHNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvQ3JpdGVyaWEudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoKCkgPT4ge1xuXG50aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGUgcGFyc2UgZmFpbGVkOiBVbmV4cGVjdGVkIHRva2VuICgxMDo3KVxcbllvdSBtYXkgbmVlZCBhbiBhcHByb3ByaWF0ZSBsb2FkZXIgdG8gaGFuZGxlIHRoaXMgZmlsZSB0eXBlLCBjdXJyZW50bHkgbm8gbG9hZGVycyBhcmUgY29uZmlndXJlZCB0byBwcm9jZXNzIHRoaXMgZmlsZS4gU2VlIGh0dHBzOi8vd2VicGFjay5qcy5vcmcvY29uY2VwdHMjbG9hZGVyc1xcbnwgaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0AvU3RyZWFtcy9IdHRwJztcXG58IFxcbj4gZXhwb3J0IHR5cGUgT3JkZXJCeURpcmVjdGlvbiA9ICdhc2MnfCdkZXNjJ1xcbnwgZXhwb3J0IHR5cGUgQ29tcGFyaXNvbk9wZXJhdG9yID1cXG58ICAgICB8ICc+J1wiKTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvRW50cnkudHNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvRW50cnkudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoKCkgPT4ge1xuXG50aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGUgcGFyc2UgZmFpbGVkOiBVbmV4cGVjdGVkIHRva2VuICg1OjcpXFxuWW91IG1heSBuZWVkIGFuIGFwcHJvcHJpYXRlIGxvYWRlciB0byBoYW5kbGUgdGhpcyBmaWxlIHR5cGUsIGN1cnJlbnRseSBubyBsb2FkZXJzIGFyZSBjb25maWd1cmVkIHRvIHByb2Nlc3MgdGhpcyBmaWxlLiBTZWUgaHR0cHM6Ly93ZWJwYWNrLmpzLm9yZy9jb25jZXB0cyNsb2FkZXJzXFxufCBpbXBvcnQgeyBIdHRwIH0gZnJvbSAnQC9TdHJlYW1zL0h0dHAnO1xcbnwgXFxuPiBleHBvcnQgaW50ZXJmYWNlIEVudHJ5PElEIGV4dGVuZHMgc3RyaW5nID0gc3RyaW5nPiB7XFxufCAgICAgaWQ6IHN0cmluZztcXG58IH1cIik7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vcmVzb3VyY2VzL2xpYi9TdHJlYW1zL0VudHJ5Q29sbGVjdGlvbi50c1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvRW50cnlDb2xsZWN0aW9uLnRzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovICgoKSA9PiB7XG5cbnRocm93IG5ldyBFcnJvcihcIk1vZHVsZSBwYXJzZSBmYWlsZWQ6IFVuZXhwZWN0ZWQgdG9rZW4gKDY6NylcXG5Zb3UgbWF5IG5lZWQgYW4gYXBwcm9wcmlhdGUgbG9hZGVyIHRvIGhhbmRsZSB0aGlzIGZpbGUgdHlwZSwgY3VycmVudGx5IG5vIGxvYWRlcnMgYXJlIGNvbmZpZ3VyZWQgdG8gcHJvY2VzcyB0aGlzIGZpbGUuIFNlZSBodHRwczovL3dlYnBhY2suanMub3JnL2NvbmNlcHRzI2xvYWRlcnNcXG58IFxcbnwgXFxuPiBleHBvcnQgdHlwZSBJRW50cmllc0xpbmtzID0gSVN0cmVhbUxpbmtzPCduZXh0X3BhZ2UnfCdwcmV2aW91c19wYWdlJ3wnc2VsZic+O1xcbnwgZXhwb3J0IGludGVyZmFjZSBJRW50cmllc01ldGEgZXh0ZW5kcyBJU3RyZWFtTWV0YSB7XFxufCAgICAgY3VycmVudF9wYWdlOm51bWJlclwiKTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvRmllbGQudHNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvRmllbGQudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoKCkgPT4ge1xuXG50aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGUgcGFyc2UgZmFpbGVkOiBVbmV4cGVjdGVkIHRva2VuICgyOjcpXFxuWW91IG1heSBuZWVkIGFuIGFwcHJvcHJpYXRlIGxvYWRlciB0byBoYW5kbGUgdGhpcyBmaWxlIHR5cGUsIGN1cnJlbnRseSBubyBsb2FkZXJzIGFyZSBjb25maWd1cmVkIHRvIHByb2Nlc3MgdGhpcyBmaWxlLiBTZWUgaHR0cHM6Ly93ZWJwYWNrLmpzLm9yZy9jb25jZXB0cyNsb2FkZXJzXFxufCBpbXBvcnQgeyBmaWVsZHMgfSBmcm9tICdAL3R5cGVzJztcXG4+IGV4cG9ydCBpbnRlcmZhY2UgRmllbGQge1xcbnwgICAgIGNvbmZpZz86UmVjb3JkPHN0cmluZyxhbnk+XFxufCAgICAgaGFuZGxlOnN0cmluZ1wiKTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvRmllbGRDb2xsZWN0aW9uLnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3Jlc291cmNlcy9saWIvU3RyZWFtcy9GaWVsZENvbGxlY3Rpb24udHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKCgpID0+IHtcblxudGhyb3cgbmV3IEVycm9yKFwiTW9kdWxlIHBhcnNlIGZhaWxlZDogVW5leHBlY3RlZCB0b2tlbiAoNDo0NylcXG5Zb3UgbWF5IG5lZWQgYW4gYXBwcm9wcmlhdGUgbG9hZGVyIHRvIGhhbmRsZSB0aGlzIGZpbGUgdHlwZSwgY3VycmVudGx5IG5vIGxvYWRlcnMgYXJlIGNvbmZpZ3VyZWQgdG8gcHJvY2VzcyB0aGlzIGZpbGUuIFNlZSBodHRwczovL3dlYnBhY2suanMub3JnL2NvbmNlcHRzI2xvYWRlcnNcXG58IGltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICdAL1N1cHBvcnQnO1xcbnwgXFxuPiBleHBvcnQgY2xhc3MgRmllbGRDb2xsZWN0aW9uIGV4dGVuZHMgQ29sbGVjdGlvbjxGaWVsZD4ge1xcbnwgfVxcbnwgXCIpO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL3Jlc291cmNlcy9saWIvU3RyZWFtcy9SZXBvc2l0b3J5LnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvUmVwb3NpdG9yeS50cyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKCgpID0+IHtcblxudGhyb3cgbmV3IEVycm9yKFwiTW9kdWxlIHBhcnNlIGZhaWxlZDogVW5leHBlY3RlZCB0b2tlbiAoOToyMylcXG5Zb3UgbWF5IG5lZWQgYW4gYXBwcm9wcmlhdGUgbG9hZGVyIHRvIGhhbmRsZSB0aGlzIGZpbGUgdHlwZSwgY3VycmVudGx5IG5vIGxvYWRlcnMgYXJlIGNvbmZpZ3VyZWQgdG8gcHJvY2VzcyB0aGlzIGZpbGUuIFNlZSBodHRwczovL3dlYnBhY2suanMub3JnL2NvbmNlcHRzI2xvYWRlcnNcXG58IFxcbnwgXFxuPiBleHBvcnQgY2xhc3MgUmVwb3NpdG9yeTxJRCBleHRlbmRzIHN0cmluZyA9IHN0cmluZz4ge1xcbnwgICAgIEBpbmplY3QoJ3N0cmVhbXMuaHR0cCcpIHByb3RlY3RlZCBodHRwOkh0dHBcXG58IFwiKTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvU3RyZWFtLnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3Jlc291cmNlcy9saWIvU3RyZWFtcy9TdHJlYW0udHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKCgpID0+IHtcblxudGhyb3cgbmV3IEVycm9yKFwiTW9kdWxlIHBhcnNlIGZhaWxlZDogVW5leHBlY3RlZCB0b2tlbiAoNjo3KVxcbllvdSBtYXkgbmVlZCBhbiBhcHByb3ByaWF0ZSBsb2FkZXIgdG8gaGFuZGxlIHRoaXMgZmlsZSB0eXBlLCBjdXJyZW50bHkgbm8gbG9hZGVycyBhcmUgY29uZmlndXJlZCB0byBwcm9jZXNzIHRoaXMgZmlsZS4gU2VlIGh0dHBzOi8vd2VicGFjay5qcy5vcmcvY29uY2VwdHMjbG9hZGVyc1xcbnwgaW1wb3J0IHsgSUJhc2VTdHJlYW0sIElTdHJlYW1MaW5rcywgSVN0cmVhbU1ldGEgfSBmcm9tICdAL3R5cGVzL3N0cmVhbXMnO1xcbnwgXFxuPiBleHBvcnQgaW50ZXJmYWNlIFN0cmVhbTxJRCBleHRlbmRzIHN0cmluZyA9IHN0cmluZz4gZXh0ZW5kcyBPbWl0PElCYXNlU3RyZWFtPElEPiwnZmllbGRzJz4ge31cXG58IFxcbnwgZXhwb3J0IGNsYXNzIFN0cmVhbTxJRCBleHRlbmRzIHN0cmluZyA9IHN0cmluZz4ge1wiKTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvU3RyZWFtcy50c1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vcmVzb3VyY2VzL2xpYi9TdHJlYW1zL1N0cmVhbXMudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovICgoKSA9PiB7XG5cbnRocm93IG5ldyBFcnJvcihcIk1vZHVsZSBwYXJzZSBmYWlsZWQ6IFVuZXhwZWN0ZWQgY2hhcmFjdGVyICdAJyAoODowKVxcbllvdSBtYXkgbmVlZCBhbiBhcHByb3ByaWF0ZSBsb2FkZXIgdG8gaGFuZGxlIHRoaXMgZmlsZSB0eXBlLCBjdXJyZW50bHkgbm8gbG9hZGVycyBhcmUgY29uZmlndXJlZCB0byBwcm9jZXNzIHRoaXMgZmlsZS4gU2VlIGh0dHBzOi8vd2VicGFjay5qcy5vcmcvY29uY2VwdHMjbG9hZGVyc1xcbnwgaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0AvU3RyZWFtcy9IdHRwJztcXG58IFxcbj4gQGluamVjdGFibGUoKVxcbnwgZXhwb3J0IGNsYXNzIFN0cmVhbXMge1xcbnwgICAgIEBpbmplY3QoJ2NvbmZpZycpIGNvbmZpZzogQ29uZmlnO1wiKTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvU3RyZWFtc1NlcnZpY2VQcm92aWRlci50c1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vcmVzb3VyY2VzL2xpYi9TdHJlYW1zL1N0cmVhbXNTZXJ2aWNlUHJvdmlkZXIudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovICgoKSA9PiB7XG5cbnRocm93IG5ldyBFcnJvcihcIk1vZHVsZSBwYXJzZSBmYWlsZWQ6IFVuZXhwZWN0ZWQgdG9rZW4gKDk6MTMpXFxuWW91IG1heSBuZWVkIGFuIGFwcHJvcHJpYXRlIGxvYWRlciB0byBoYW5kbGUgdGhpcyBmaWxlIHR5cGUsIGN1cnJlbnRseSBubyBsb2FkZXJzIGFyZSBjb25maWd1cmVkIHRvIHByb2Nlc3MgdGhpcyBmaWxlLiBTZWUgaHR0cHM6Ly93ZWJwYWNrLmpzLm9yZy9jb25jZXB0cyNsb2FkZXJzXFxufCBcXG58IGV4cG9ydCBjbGFzcyBTdHJlYW1zU2VydmljZVByb3ZpZGVyIGV4dGVuZHMgU2VydmljZVByb3ZpZGVyIHtcXG4+ICAgICBwcm92aWRlcnM6IFtcXG58ICAgICAgICAgSHR0cFNlcnZpY2VQcm92aWRlclxcbnwgICAgIF1cIik7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vcmVzb3VyY2VzL2xpYi9TdHJlYW1zL2luZGV4LnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vcmVzb3VyY2VzL2xpYi9TdHJlYW1zL2luZGV4LnRzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG5cInVzZSBzdHJpY3RcIjtcbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgZXhwb3J0ICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCB7XG4vKiBoYXJtb255IGV4cG9ydCAqLyAgIFwiZGVmYXVsdFwiOiAoKSA9PiAoX19XRUJQQUNLX0RFRkFVTFRfRVhQT1JUX18pXG4vKiBoYXJtb255IGV4cG9ydCAqLyB9KTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfU3RyZWFtX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL1N0cmVhbSAqLyBcIi4vcmVzb3VyY2VzL2xpYi9TdHJlYW1zL1N0cmVhbS50c1wiKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfU3RyZWFtX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9fX3dlYnBhY2tfcmVxdWlyZV9fLm4oX1N0cmVhbV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfQ3JpdGVyaWFfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vQ3JpdGVyaWEgKi8gXCIuL3Jlc291cmNlcy9saWIvU3RyZWFtcy9Dcml0ZXJpYS50c1wiKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfQ3JpdGVyaWFfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19fd2VicGFja19yZXF1aXJlX18ubihfQ3JpdGVyaWFfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyk7XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyB2YXIgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fID0ge307XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBmb3IoY29uc3QgX19XRUJQQUNLX0lNUE9SVF9LRVlfXyBpbiBfQ3JpdGVyaWFfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXykgaWYoX19XRUJQQUNLX0lNUE9SVF9LRVlfXyAhPT0gXCJkZWZhdWx0XCIpIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXSA9ICgpID0+IF9Dcml0ZXJpYV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dXG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfRW50cnlfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vRW50cnkgKi8gXCIuL3Jlc291cmNlcy9saWIvU3RyZWFtcy9FbnRyeS50c1wiKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfRW50cnlfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19fd2VicGFja19yZXF1aXJlX18ubihfRW50cnlfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyk7XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyB2YXIgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fID0ge307XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBmb3IoY29uc3QgX19XRUJQQUNLX0lNUE9SVF9LRVlfXyBpbiBfRW50cnlfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXykgaWYoX19XRUJQQUNLX0lNUE9SVF9LRVlfXyAhPT0gXCJkZWZhdWx0XCIpIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXSA9ICgpID0+IF9FbnRyeV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dXG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfRW50cnlDb2xsZWN0aW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL0VudHJ5Q29sbGVjdGlvbiAqLyBcIi4vcmVzb3VyY2VzL2xpYi9TdHJlYW1zL0VudHJ5Q29sbGVjdGlvbi50c1wiKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfRW50cnlDb2xsZWN0aW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX19fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9fX3dlYnBhY2tfcmVxdWlyZV9fLm4oX0VudHJ5Q29sbGVjdGlvbl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fKTtcbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIHZhciBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX18gPSB7fTtcbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIGZvcihjb25zdCBfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fIGluIF9FbnRyeUNvbGxlY3Rpb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXykgaWYoX19XRUJQQUNLX0lNUE9SVF9LRVlfXyAhPT0gXCJkZWZhdWx0XCIpIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXSA9ICgpID0+IF9FbnRyeUNvbGxlY3Rpb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXVxuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX0ZpZWxkX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL0ZpZWxkICovIFwiLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvRmllbGQudHNcIik7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX0ZpZWxkX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X19fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9fX3dlYnBhY2tfcmVxdWlyZV9fLm4oX0ZpZWxkX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18pO1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gdmFyIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyA9IHt9O1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gZm9yKGNvbnN0IF9fV0VCUEFDS19JTVBPUlRfS0VZX18gaW4gX0ZpZWxkX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18pIGlmKF9fV0VCUEFDS19JTVBPUlRfS0VZX18gIT09IFwiZGVmYXVsdFwiKSBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX10gPSAoKSA9PiBfRmllbGRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXVxuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX0ZpZWxkQ29sbGVjdGlvbl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNV9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9GaWVsZENvbGxlY3Rpb24gKi8gXCIuL3Jlc291cmNlcy9saWIvU3RyZWFtcy9GaWVsZENvbGxlY3Rpb24udHNcIik7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX0ZpZWxkQ29sbGVjdGlvbl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNV9fX2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovX193ZWJwYWNrX3JlcXVpcmVfXy5uKF9GaWVsZENvbGxlY3Rpb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyk7XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyB2YXIgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fID0ge307XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBmb3IoY29uc3QgX19XRUJQQUNLX0lNUE9SVF9LRVlfXyBpbiBfRmllbGRDb2xsZWN0aW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18pIGlmKF9fV0VCUEFDS19JTVBPUlRfS0VZX18gIT09IFwiZGVmYXVsdFwiKSBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX10gPSAoKSA9PiBfRmllbGRDb2xsZWN0aW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX11cbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX18pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9SZXBvc2l0b3J5X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL1JlcG9zaXRvcnkgKi8gXCIuL3Jlc291cmNlcy9saWIvU3RyZWFtcy9SZXBvc2l0b3J5LnRzXCIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9SZXBvc2l0b3J5X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X19fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9fX3dlYnBhY2tfcmVxdWlyZV9fLm4oX1JlcG9zaXRvcnlfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzZfXyk7XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyB2YXIgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fID0ge307XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBmb3IoY29uc3QgX19XRUJQQUNLX0lNUE9SVF9LRVlfXyBpbiBfUmVwb3NpdG9yeV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNl9fKSBpZihfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fICE9PSBcImRlZmF1bHRcIikgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dID0gKCkgPT4gX1JlcG9zaXRvcnlfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzZfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXVxuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyk7XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyB2YXIgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fID0ge307XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBmb3IoY29uc3QgX19XRUJQQUNLX0lNUE9SVF9LRVlfXyBpbiBfU3RyZWFtX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18pIGlmKF9fV0VCUEFDS19JTVBPUlRfS0VZX18gIT09IFwiZGVmYXVsdFwiKSBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX10gPSAoKSA9PiBfU3RyZWFtX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX11cbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX18pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9TdHJlYW1zX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV83X18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL1N0cmVhbXMgKi8gXCIuL3Jlc291cmNlcy9saWIvU3RyZWFtcy9TdHJlYW1zLnRzXCIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9TdHJlYW1zX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV83X19fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9fX3dlYnBhY2tfcmVxdWlyZV9fLm4oX1N0cmVhbXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzdfXyk7XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyB2YXIgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fID0ge307XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBmb3IoY29uc3QgX19XRUJQQUNLX0lNUE9SVF9LRVlfXyBpbiBfU3RyZWFtc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfN19fKSBpZihfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fICE9PSBcImRlZmF1bHRcIikgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dID0gKCkgPT4gX1N0cmVhbXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzdfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXVxuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX1N0cmVhbXNTZXJ2aWNlUHJvdmlkZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzhfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vU3RyZWFtc1NlcnZpY2VQcm92aWRlciAqLyBcIi4vcmVzb3VyY2VzL2xpYi9TdHJlYW1zL1N0cmVhbXNTZXJ2aWNlUHJvdmlkZXIudHNcIik7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX1N0cmVhbXNTZXJ2aWNlUHJvdmlkZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzhfX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19fd2VicGFja19yZXF1aXJlX18ubihfU3RyZWFtc1NlcnZpY2VQcm92aWRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfOF9fKTtcbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIHZhciBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX18gPSB7fTtcbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIGZvcihjb25zdCBfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fIGluIF9TdHJlYW1zU2VydmljZVByb3ZpZGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV84X18pIGlmKF9fV0VCUEFDS19JTVBPUlRfS0VZX18gIT09IFwiZGVmYXVsdFwiKSBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX10gPSAoKSA9PiBfU3RyZWFtc1NlcnZpY2VQcm92aWRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfOF9fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dXG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fKTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gY29uc3QgX19XRUJQQUNLX0RFRkFVTFRfRVhQT1JUX18gPSAoX1N0cmVhbV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fLlN0cmVhbSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9yZXNvdXJjZXMvbGliL1N1cHBvcnQvQ29sbGVjdGlvbi50c1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vcmVzb3VyY2VzL2xpYi9TdXBwb3J0L0NvbGxlY3Rpb24udHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovICgoKSA9PiB7XG5cbnRocm93IG5ldyBFcnJvcihcIk1vZHVsZSBwYXJzZSBmYWlsZWQ6IFVuZXhwZWN0ZWQgdG9rZW4gKDE6MjMpXFxuWW91IG1heSBuZWVkIGFuIGFwcHJvcHJpYXRlIGxvYWRlciB0byBoYW5kbGUgdGhpcyBmaWxlIHR5cGUsIGN1cnJlbnRseSBubyBsb2FkZXJzIGFyZSBjb25maWd1cmVkIHRvIHByb2Nlc3MgdGhpcyBmaWxlLiBTZWUgaHR0cHM6Ly93ZWJwYWNrLmpzLm9yZy9jb25jZXB0cyNsb2FkZXJzXFxuPiBleHBvcnQgY2xhc3MgQ29sbGVjdGlvbjxUPiBleHRlbmRzIEFycmF5PFQ+IGltcGxlbWVudHMgQXJyYXk8VD4ge1xcbnwgICAgIGNvbnN0cnVjdG9yKC4uLml0ZW1zOiBUW10pIHtcXG58ICAgICAgICAgc3VwZXIoLi4uaXRlbXMpO1wiKTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9yZXNvdXJjZXMvbGliL1N1cHBvcnQvU2VydmljZVByb3ZpZGVyLnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3Jlc291cmNlcy9saWIvU3VwcG9ydC9TZXJ2aWNlUHJvdmlkZXIudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKCgpID0+IHtcblxudGhyb3cgbmV3IEVycm9yKFwiTW9kdWxlIHBhcnNlIGZhaWxlZDogVW5leHBlY3RlZCB0b2tlbiAoMzoyOSlcXG5Zb3UgbWF5IG5lZWQgYW4gYXBwcm9wcmlhdGUgbG9hZGVyIHRvIGhhbmRsZSB0aGlzIGZpbGUgdHlwZSwgY3VycmVudGx5IG5vIGxvYWRlcnMgYXJlIGNvbmZpZ3VyZWQgdG8gcHJvY2VzcyB0aGlzIGZpbGUuIFNlZSBodHRwczovL3dlYnBhY2suanMub3JnL2NvbmNlcHRzI2xvYWRlcnNcXG58IGltcG9ydCB7IEFwcGxpY2F0aW9uIH0gZnJvbSAnLi4vRm91bmRhdGlvbi9BcHBsaWNhdGlvbic7XFxufCBcXG4+IGV4cG9ydCBjbGFzcyBTZXJ2aWNlUHJvdmlkZXIgaW1wbGVtZW50cyBJU2VydmljZVByb3ZpZGVyIHtcXG58ICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYXBwOiBBcHBsaWNhdGlvbikge31cXG58IH1cIik7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vcmVzb3VyY2VzL2xpYi9TdXBwb3J0L2luZGV4LnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vcmVzb3VyY2VzL2xpYi9TdXBwb3J0L2luZGV4LnRzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKChfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykgPT4ge1xuXG5cInVzZSBzdHJpY3RcIjtcbl9fd2VicGFja19yZXF1aXJlX18ucihfX3dlYnBhY2tfZXhwb3J0c19fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfQ29sbGVjdGlvbl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9Db2xsZWN0aW9uICovIFwiLi9yZXNvdXJjZXMvbGliL1N1cHBvcnQvQ29sbGVjdGlvbi50c1wiKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfQ29sbGVjdGlvbl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fX2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovX193ZWJwYWNrX3JlcXVpcmVfXy5uKF9Db2xsZWN0aW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18pO1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gdmFyIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyA9IHt9O1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gZm9yKGNvbnN0IF9fV0VCUEFDS19JTVBPUlRfS0VZX18gaW4gX0NvbGxlY3Rpb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXykgaWYoX19XRUJQQUNLX0lNUE9SVF9LRVlfXyAhPT0gXCJkZWZhdWx0XCIpIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXSA9ICgpID0+IF9Db2xsZWN0aW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX11cbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX18pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9TZXJ2aWNlUHJvdmlkZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vU2VydmljZVByb3ZpZGVyICovIFwiLi9yZXNvdXJjZXMvbGliL1N1cHBvcnQvU2VydmljZVByb3ZpZGVyLnRzXCIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9TZXJ2aWNlUHJvdmlkZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19fd2VicGFja19yZXF1aXJlX18ubihfU2VydmljZVByb3ZpZGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18pO1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gdmFyIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyA9IHt9O1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gZm9yKGNvbnN0IF9fV0VCUEFDS19JTVBPUlRfS0VZX18gaW4gX1NlcnZpY2VQcm92aWRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fKSBpZihfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fICE9PSBcImRlZmF1bHRcIikgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dID0gKCkgPT4gX1NlcnZpY2VQcm92aWRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dXG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fKTtcblxuXG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9yZXNvdXJjZXMvbGliL2V4YW1wbGVzLnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3Jlc291cmNlcy9saWIvZXhhbXBsZXMudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKCgpID0+IHtcblxudGhyb3cgbmV3IEVycm9yKFwiTW9kdWxlIHBhcnNlIGZhaWxlZDogVW5leHBlY3RlZCB0b2tlbiAoNDo3KVxcbllvdSBtYXkgbmVlZCBhbiBhcHByb3ByaWF0ZSBsb2FkZXIgdG8gaGFuZGxlIHRoaXMgZmlsZSB0eXBlLCBjdXJyZW50bHkgbm8gbG9hZGVycyBhcmUgY29uZmlndXJlZCB0byBwcm9jZXNzIHRoaXMgZmlsZS4gU2VlIGh0dHBzOi8vd2VicGFjay5qcy5vcmcvY29uY2VwdHMjbG9hZGVyc1xcbnwgaW1wb3J0IHsgU3RyZWFtcyB9IGZyb20gJ0AvU3RyZWFtcyc7XFxufCBcXG4+IGV4cG9ydCBuYW1lc3BhY2UgZXhhbXBsZXMge1xcbnwgICAgIGV4cG9ydCBhc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xcbnwgXCIpO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL3Jlc291cmNlcy9saWIvdHlwZXMvY29uZmlnLnRzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9yZXNvdXJjZXMvbGliL3R5cGVzL2NvbmZpZy50cyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gKCgpID0+IHtcblxudGhyb3cgbmV3IEVycm9yKFwiTW9kdWxlIHBhcnNlIGZhaWxlZDogVW5leHBlY3RlZCB0b2tlbiAoNTo3KVxcbllvdSBtYXkgbmVlZCBhbiBhcHByb3ByaWF0ZSBsb2FkZXIgdG8gaGFuZGxlIHRoaXMgZmlsZSB0eXBlLCBjdXJyZW50bHkgbm8gbG9hZGVycyBhcmUgY29uZmlndXJlZCB0byBwcm9jZXNzIHRoaXMgZmlsZS4gU2VlIGh0dHBzOi8vd2VicGFjay5qcy5vcmcvY29uY2VwdHMjbG9hZGVyc1xcbnwgaW1wb3J0IHsgSVNlcnZpY2VQcm92aWRlckNsYXNzIH0gZnJvbSAnQC9TdXBwb3J0JztcXG58IFxcbj4gZXhwb3J0IGludGVyZmFjZSBTdHJlYW1zQ29uZmlndXJhdGlvbiB7XFxufCBcXG58IH1cIik7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vcmVzb3VyY2VzL2xpYi90eXBlcy9pbmRleC50c1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9yZXNvdXJjZXMvbGliL3R5cGVzL2luZGV4LnRzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovICgoX191bnVzZWRfd2VicGFja19tb2R1bGUsIF9fd2VicGFja19leHBvcnRzX18sIF9fd2VicGFja19yZXF1aXJlX18pID0+IHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX2NvbmZpZ19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9jb25maWcgKi8gXCIuL3Jlc291cmNlcy9saWIvdHlwZXMvY29uZmlnLnRzXCIpO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9jb25maWdfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19fd2VicGFja19yZXF1aXJlX18ubihfY29uZmlnX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18pO1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gdmFyIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyA9IHt9O1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gZm9yKGNvbnN0IF9fV0VCUEFDS19JTVBPUlRfS0VZX18gaW4gX2NvbmZpZ19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fKSBpZihfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fICE9PSBcImRlZmF1bHRcIikgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dID0gKCkgPT4gX2NvbmZpZ19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dXG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfc3RyZWFtc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9zdHJlYW1zICovIFwiLi9yZXNvdXJjZXMvbGliL3R5cGVzL3N0cmVhbXMudHNcIik7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX3N0cmVhbXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19fd2VicGFja19yZXF1aXJlX18ubihfc3RyZWFtc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fKTtcbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIHZhciBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX18gPSB7fTtcbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIGZvcihjb25zdCBfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fIGluIF9zdHJlYW1zX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18pIGlmKF9fV0VCUEFDS19JTVBPUlRfS0VZX18gIT09IFwiZGVmYXVsdFwiKSBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX10gPSAoKSA9PiBfc3RyZWFtc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dXG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fKTtcblxuXG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9yZXNvdXJjZXMvbGliL3R5cGVzL3N0cmVhbXMudHNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9yZXNvdXJjZXMvbGliL3R5cGVzL3N0cmVhbXMudHMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqLyAoKCkgPT4ge1xuXG50aHJvdyBuZXcgRXJyb3IoXCJNb2R1bGUgcGFyc2UgZmFpbGVkOiBVbmV4cGVjdGVkIHRva2VuICgzOjcpXFxuWW91IG1heSBuZWVkIGFuIGFwcHJvcHJpYXRlIGxvYWRlciB0byBoYW5kbGUgdGhpcyBmaWxlIHR5cGUsIGN1cnJlbnRseSBubyBsb2FkZXJzIGFyZSBjb25maWd1cmVkIHRvIHByb2Nlc3MgdGhpcyBmaWxlLiBTZWUgaHR0cHM6Ly93ZWJwYWNrLmpzLm9yZy9jb25jZXB0cyNsb2FkZXJzXFxufCBpbXBvcnQgeyBGaWVsZCB9IGZyb20gJ0AvU3RyZWFtcyc7XFxufCBcXG4+IGV4cG9ydCBpbnRlcmZhY2UgSVN0cmVhbU1ldGEge1xcbnwgICAgIHBhcmFtZXRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XFxufCAgICAgcXVlcnk6IHN0cmluZ1tdO1wiKTtcblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuLyoqKioqKi8gXHRcdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcbi8qKioqKiovIFx0XHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcbi8qKioqKiovIFx0XHRcdFx0KCkgPT4gKG1vZHVsZSk7XG4vKioqKioqLyBcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcbi8qKioqKiovIFx0XHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyAqL1xuLyoqKioqKi8gXHQoKCkgPT4ge1xuLyoqKioqKi8gXHRcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9nbG9iYWwgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0XHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcbi8qKioqKiovIFx0XHRcdHRyeSB7XG4vKioqKioqLyBcdFx0XHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuLyoqKioqKi8gXHRcdFx0fSBjYXRjaCAoZSkge1xuLyoqKioqKi8gXHRcdFx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fSkoKTtcbi8qKioqKiovIFx0fSkoKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdC8qIHdlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQgKi9cbi8qKioqKiovIFx0KCgpID0+IHtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpXG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0ICovXG4vKioqKioqLyBcdCgoKSA9PiB7XG4vKioqKioqLyBcdFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG4vKioqKioqLyBcdFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbi8qKioqKiovIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gXHRcdH07XG4vKioqKioqLyBcdH0pKCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG4vLyBUaGlzIGVudHJ5IG5lZWQgdG8gYmUgd3JhcHBlZCBpbiBhbiBJSUZFIGJlY2F1c2UgaXQgbmVlZCB0byBiZSBpbiBzdHJpY3QgbW9kZS5cbigoKSA9PiB7XG5cInVzZSBzdHJpY3RcIjtcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vcmVzb3VyY2VzL2xpYi9pbmRleC50cyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIoX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgcmVmbGVjdF9tZXRhZGF0YV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgcmVmbGVjdC1tZXRhZGF0YSAqLyBcIi4vbm9kZV9tb2R1bGVzL3JlZmxlY3QtbWV0YWRhdGEvUmVmbGVjdC5qc1wiKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciByZWZsZWN0X21ldGFkYXRhX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19fZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9fX3dlYnBhY2tfcmVxdWlyZV9fLm4ocmVmbGVjdF9tZXRhZGF0YV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfRGlzcGF0Y2hlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9EaXNwYXRjaGVyICovIFwiLi9yZXNvdXJjZXMvbGliL0Rpc3BhdGNoZXIvaW5kZXgudHNcIik7XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyB2YXIgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fID0ge307XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBmb3IoY29uc3QgX19XRUJQQUNLX0lNUE9SVF9LRVlfXyBpbiBfRGlzcGF0Y2hlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fKSBpZihfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fICE9PSBcImRlZmF1bHRcIikgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dID0gKCkgPT4gX0Rpc3BhdGNoZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXVxuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX0ZvdW5kYXRpb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vRm91bmRhdGlvbiAqLyBcIi4vcmVzb3VyY2VzL2xpYi9Gb3VuZGF0aW9uL2luZGV4LnRzXCIpO1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gdmFyIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyA9IHt9O1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gZm9yKGNvbnN0IF9fV0VCUEFDS19JTVBPUlRfS0VZX18gaW4gX0ZvdW5kYXRpb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXykgaWYoX19XRUJQQUNLX0lNUE9SVF9LRVlfXyAhPT0gXCJkZWZhdWx0XCIpIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXSA9ICgpID0+IF9Gb3VuZGF0aW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX11cbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX18pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9IdHRwX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL0h0dHAgKi8gXCIuL3Jlc291cmNlcy9saWIvSHR0cC9pbmRleC50c1wiKTtcbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIHZhciBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX18gPSB7fTtcbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIGZvcihjb25zdCBfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fIGluIF9IdHRwX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18pIGlmKF9fV0VCUEFDS19JTVBPUlRfS0VZX18gIT09IFwiZGVmYXVsdFwiKSBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX10gPSAoKSA9PiBfSHR0cF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dXG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfU3RyZWFtc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9TdHJlYW1zICovIFwiLi9yZXNvdXJjZXMvbGliL1N0cmVhbXMvaW5kZXgudHNcIik7XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyB2YXIgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fID0ge307XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBmb3IoY29uc3QgX19XRUJQQUNLX0lNUE9SVF9LRVlfXyBpbiBfU3RyZWFtc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fKSBpZihfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fICE9PSBcImRlZmF1bHRcIikgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dID0gKCkgPT4gX1N0cmVhbXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXVxuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyk7XG4vKiBoYXJtb255IGltcG9ydCAqLyB2YXIgX1N1cHBvcnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vU3VwcG9ydCAqLyBcIi4vcmVzb3VyY2VzL2xpYi9TdXBwb3J0L2luZGV4LnRzXCIpO1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gdmFyIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfXyA9IHt9O1xuLyogaGFybW9ueSByZWV4cG9ydCAodW5rbm93bikgKi8gZm9yKGNvbnN0IF9fV0VCUEFDS19JTVBPUlRfS0VZX18gaW4gX1N1cHBvcnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXykgaWYoX19XRUJQQUNLX0lNUE9SVF9LRVlfXyAhPT0gXCJkZWZhdWx0XCIpIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXSA9ICgpID0+IF9TdXBwb3J0X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX11cbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX18pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNl9fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi90eXBlcyAqLyBcIi4vcmVzb3VyY2VzL2xpYi90eXBlcy9pbmRleC50c1wiKTtcbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIHZhciBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX18gPSB7fTtcbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIGZvcihjb25zdCBfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fIGluIF90eXBlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNl9fKSBpZihfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fICE9PSBcImRlZmF1bHRcIikgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dID0gKCkgPT4gX3R5cGVzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X19bX19XRUJQQUNLX0lNUE9SVF9LRVlfX11cbi8qIGhhcm1vbnkgcmVleHBvcnQgKHVua25vd24pICovIF9fd2VicGFja19yZXF1aXJlX18uZChfX3dlYnBhY2tfZXhwb3J0c19fLCBfX1dFQlBBQ0tfUkVFWFBPUlRfT0JKRUNUX18pO1xuLyogaGFybW9ueSBpbXBvcnQgKi8gdmFyIF9leGFtcGxlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfN19fID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9leGFtcGxlcyAqLyBcIi4vcmVzb3VyY2VzL2xpYi9leGFtcGxlcy50c1wiKTtcbi8qIGhhcm1vbnkgaW1wb3J0ICovIHZhciBfZXhhbXBsZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzdfX19kZWZhdWx0ID0gLyojX19QVVJFX18qL19fd2VicGFja19yZXF1aXJlX18ubihfZXhhbXBsZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzdfXyk7XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyB2YXIgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fID0ge307XG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBmb3IoY29uc3QgX19XRUJQQUNLX0lNUE9SVF9LRVlfXyBpbiBfZXhhbXBsZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzdfXykgaWYoX19XRUJQQUNLX0lNUE9SVF9LRVlfXyAhPT0gXCJkZWZhdWx0XCIpIF9fV0VCUEFDS19SRUVYUE9SVF9PQkpFQ1RfX1tfX1dFQlBBQ0tfSU1QT1JUX0tFWV9fXSA9ICgpID0+IF9leGFtcGxlc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfN19fW19fV0VCUEFDS19JTVBPUlRfS0VZX19dXG4vKiBoYXJtb255IHJlZXhwb3J0ICh1bmtub3duKSAqLyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoX193ZWJwYWNrX2V4cG9ydHNfXywgX19XRUJQQUNLX1JFRVhQT1JUX09CSkVDVF9fKTtcblxuXG4vLyBleHBvcnQgKiBmcm9tICcuL0NvbmZpZyc7XG5cblxuXG5cblxuXG5cblxuXG5cbn0pKCk7XG5cbih3aW5kb3cuc3RyZWFtcyA9IHdpbmRvdy5zdHJlYW1zIHx8IHt9KS5jb3JlID0gX193ZWJwYWNrX2V4cG9ydHNfXztcbi8qKioqKiovIH0pKClcbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYW5NdkwybHVaR1Y0TG1weklpd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPenRCUVVGQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3pzN096czdPenM3T3pzN1FVTjJURUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPMEZETVcxRFFUczdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096dEJRMEZCT3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3TzBGRFFVRTdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1FVTkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3p0QlExcEJPMEZCUTBFN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3UVVORVFUdEJRVU5CT3pzN096czdPenM3T3pzN096czdPenRCUTBSQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096dEJRM1pDUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3pzN096dEJRMUJCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3pzN08wRkRVRUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3T3pzN1FVTlFRVHM3T3pzN1FVTkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenRCUTA1Qk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTSXNJbk52ZFhKalpYTWlPbHNpZDJWaWNHRmphem92THk4dUwyNXZaR1ZmYlc5a2RXeGxjeTl3Y205alpYTnpMMkp5YjNkelpYSXVhbk1pTENKM1pXSndZV05yT2k4dkx5NHZibTlrWlY5dGIyUjFiR1Z6TDNKbFpteGxZM1F0YldWMFlXUmhkR0V2VW1WbWJHVmpkQzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTl5WlhOdmRYSmpaWE12YkdsaUwwUnBjM0JoZEdOb1pYSXZhVzVrWlhndWRITWlMQ0ozWldKd1lXTnJPaTh2THk0dmNtVnpiM1Z5WTJWekwyeHBZaTlHYjNWdVpHRjBhVzl1TDJsdVpHVjRMblJ6SWl3aWQyVmljR0ZqYXpvdkx5OHVMM0psYzI5MWNtTmxjeTlzYVdJdlNIUjBjQzlwYm1SbGVDNTBjeUlzSW5kbFluQmhZMnM2THk4dkxpOXlaWE52ZFhKalpYTXZiR2xpTDFOMGNtVmhiWE12YVc1a1pYZ3VkSE1pTENKM1pXSndZV05yT2k4dkx5NHZjbVZ6YjNWeVkyVnpMMnhwWWk5VGRYQndiM0owTDJsdVpHVjRMblJ6SWl3aWQyVmljR0ZqYXpvdkx5OHVMM0psYzI5MWNtTmxjeTlzYVdJdmRIbHdaWE12YVc1a1pYZ3VkSE1pTENKM1pXSndZV05yT2k4dkwzZGxZbkJoWTJzdlltOXZkSE4wY21Gd0lpd2lkMlZpY0dGamF6b3ZMeTkzWldKd1lXTnJMM0oxYm5ScGJXVXZZMjl0Y0dGMElHZGxkQ0JrWldaaGRXeDBJR1Y0Y0c5eWRDSXNJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTl5ZFc1MGFXMWxMMlJsWm1sdVpTQndjbTl3WlhKMGVTQm5aWFIwWlhKeklpd2lkMlZpY0dGamF6b3ZMeTkzWldKd1lXTnJMM0oxYm5ScGJXVXZaMnh2WW1Gc0lpd2lkMlZpY0dGamF6b3ZMeTkzWldKd1lXTnJMM0oxYm5ScGJXVXZhR0Z6VDNkdVVISnZjR1Z5ZEhrZ2MyaHZjblJvWVc1a0lpd2lkMlZpY0dGamF6b3ZMeTkzWldKd1lXTnJMM0oxYm5ScGJXVXZiV0ZyWlNCdVlXMWxjM0JoWTJVZ2IySnFaV04wSWl3aWQyVmljR0ZqYXpvdkx5OHVMM0psYzI5MWNtTmxjeTlzYVdJdmFXNWtaWGd1ZEhNaVhTd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lMeThnYzJocGJTQm1iM0lnZFhOcGJtY2djSEp2WTJWemN5QnBiaUJpY205M2MyVnlYRzUyWVhJZ2NISnZZMlZ6Y3lBOUlHMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2UzMDdYRzVjYmk4dklHTmhZMmhsWkNCbWNtOXRJSGRvWVhSbGRtVnlJR2RzYjJKaGJDQnBjeUJ3Y21WelpXNTBJSE52SUhSb1lYUWdkR1Z6ZENCeWRXNXVaWEp6SUhSb1lYUWdjM1IxWWlCcGRGeHVMeThnWkc5dUozUWdZbkpsWVdzZ2RHaHBibWR6TGlBZ1FuVjBJSGRsSUc1bFpXUWdkRzhnZDNKaGNDQnBkQ0JwYmlCaElIUnllU0JqWVhSamFDQnBiaUJqWVhObElHbDBJR2x6WEc0dkx5QjNjbUZ3Y0dWa0lHbHVJSE4wY21samRDQnRiMlJsSUdOdlpHVWdkMmhwWTJnZ1pHOWxjMjRuZENCa1pXWnBibVVnWVc1NUlHZHNiMkpoYkhNdUlDQkpkQ2R6SUdsdWMybGtaU0JoWEc0dkx5Qm1kVzVqZEdsdmJpQmlaV05oZFhObElIUnllUzlqWVhSamFHVnpJR1JsYjNCMGFXMXBlbVVnYVc0Z1kyVnlkR0ZwYmlCbGJtZHBibVZ6TGx4dVhHNTJZWElnWTJGamFHVmtVMlYwVkdsdFpXOTFkRHRjYm5aaGNpQmpZV05vWldSRGJHVmhjbFJwYldWdmRYUTdYRzVjYm1aMWJtTjBhVzl1SUdSbFptRjFiSFJUWlhSVWFXMXZkWFFvS1NCN1hHNGdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2R6WlhSVWFXMWxiM1YwSUdoaGN5QnViM1FnWW1WbGJpQmtaV1pwYm1Wa0p5azdYRzU5WEc1bWRXNWpkR2x2YmlCa1pXWmhkV3gwUTJ4bFlYSlVhVzFsYjNWMElDZ3BJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0oyTnNaV0Z5VkdsdFpXOTFkQ0JvWVhNZ2JtOTBJR0psWlc0Z1pHVm1hVzVsWkNjcE8xeHVmVnh1S0daMWJtTjBhVzl1SUNncElIdGNiaUFnSUNCMGNua2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb2RIbHdaVzltSUhObGRGUnBiV1Z2ZFhRZ1BUMDlJQ2RtZFc1amRHbHZiaWNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR05oWTJobFpGTmxkRlJwYldWdmRYUWdQU0J6WlhSVWFXMWxiM1YwTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMkZqYUdWa1UyVjBWR2x0Wlc5MWRDQTlJR1JsWm1GMWJIUlRaWFJVYVcxdmRYUTdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lDQWdJQ0FnSUdOaFkyaGxaRk5sZEZScGJXVnZkWFFnUFNCa1pXWmhkV3gwVTJWMFZHbHRiM1YwTzF4dUlDQWdJSDFjYmlBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlHTnNaV0Z5VkdsdFpXOTFkQ0E5UFQwZ0oyWjFibU4wYVc5dUp5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyRmphR1ZrUTJ4bFlYSlVhVzFsYjNWMElEMGdZMnhsWVhKVWFXMWxiM1YwTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMkZqYUdWa1EyeGxZWEpVYVcxbGIzVjBJRDBnWkdWbVlYVnNkRU5zWldGeVZHbHRaVzkxZER0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNBZ0lDQWdZMkZqYUdWa1EyeGxZWEpVYVcxbGIzVjBJRDBnWkdWbVlYVnNkRU5zWldGeVZHbHRaVzkxZER0Y2JpQWdJQ0I5WEc1OUlDZ3BLVnh1Wm5WdVkzUnBiMjRnY25WdVZHbHRaVzkxZENobWRXNHBJSHRjYmlBZ0lDQnBaaUFvWTJGamFHVmtVMlYwVkdsdFpXOTFkQ0E5UFQwZ2MyVjBWR2x0Wlc5MWRDa2dlMXh1SUNBZ0lDQWdJQ0F2TDI1dmNtMWhiQ0JsYm5acGNtOXRaVzUwY3lCcGJpQnpZVzVsSUhOcGRIVmhkR2x2Ym5OY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhObGRGUnBiV1Z2ZFhRb1puVnVMQ0F3S1R0Y2JpQWdJQ0I5WEc0Z0lDQWdMeThnYVdZZ2MyVjBWR2x0Wlc5MWRDQjNZWE51SjNRZ1lYWmhhV3hoWW14bElHSjFkQ0IzWVhNZ2JHRjBkR1Z5SUdSbFptbHVaV1JjYmlBZ0lDQnBaaUFvS0dOaFkyaGxaRk5sZEZScGJXVnZkWFFnUFQwOUlHUmxabUYxYkhSVFpYUlVhVzF2ZFhRZ2ZId2dJV05oWTJobFpGTmxkRlJwYldWdmRYUXBJQ1ltSUhObGRGUnBiV1Z2ZFhRcElIdGNiaUFnSUNBZ0lDQWdZMkZqYUdWa1UyVjBWR2x0Wlc5MWRDQTlJSE5sZEZScGJXVnZkWFE3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ6WlhSVWFXMWxiM1YwS0daMWJpd2dNQ2s3WEc0Z0lDQWdmVnh1SUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0FnSUM4dklIZG9aVzRnZDJobGJpQnpiMjFsWW05a2VTQm9ZWE1nYzJOeVpYZGxaQ0IzYVhSb0lITmxkRlJwYldWdmRYUWdZblYwSUc1dklFa3VSUzRnYldGa1pHNWxjM05jYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR05oWTJobFpGTmxkRlJwYldWdmRYUW9ablZ1TENBd0tUdGNiaUFnSUNCOUlHTmhkR05vS0dVcGUxeHVJQ0FnSUNBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnVjJobGJpQjNaU0JoY21VZ2FXNGdTUzVGTGlCaWRYUWdkR2hsSUhOamNtbHdkQ0JvWVhNZ1ltVmxiaUJsZG1Gc1pXUWdjMjhnU1M1RkxpQmtiMlZ6YmlkMElIUnlkWE4wSUhSb1pTQm5iRzlpWVd3Z2IySnFaV04wSUhkb1pXNGdZMkZzYkdWa0lHNXZjbTFoYkd4NVhHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdZMkZqYUdWa1UyVjBWR2x0Wlc5MWRDNWpZV3hzS0c1MWJHd3NJR1oxYml3Z01DazdYRzRnSUNBZ0lDQWdJSDBnWTJGMFkyZ29aU2w3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJ6WVcxbElHRnpJR0ZpYjNabElHSjFkQ0IzYUdWdUlHbDBKM01nWVNCMlpYSnphVzl1SUc5bUlFa3VSUzRnZEdoaGRDQnRkWE4wSUdoaGRtVWdkR2hsSUdkc2IySmhiQ0J2WW1wbFkzUWdabTl5SUNkMGFHbHpKeXdnYUc5d1puVnNiSGtnYjNWeUlHTnZiblJsZUhRZ1kyOXljbVZqZENCdmRHaGxjbmRwYzJVZ2FYUWdkMmxzYkNCMGFISnZkeUJoSUdkc2IySmhiQ0JsY25KdmNseHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR05oWTJobFpGTmxkRlJwYldWdmRYUXVZMkZzYkNoMGFHbHpMQ0JtZFc0c0lEQXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVnh1WEc1Y2JuMWNibVoxYm1OMGFXOXVJSEoxYmtOc1pXRnlWR2x0Wlc5MWRDaHRZWEpyWlhJcElIdGNiaUFnSUNCcFppQW9ZMkZqYUdWa1EyeGxZWEpVYVcxbGIzVjBJRDA5UFNCamJHVmhjbFJwYldWdmRYUXBJSHRjYmlBZ0lDQWdJQ0FnTHk5dWIzSnRZV3dnWlc1MmFYSnZiV1Z1ZEhNZ2FXNGdjMkZ1WlNCemFYUjFZWFJwYjI1elhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCamJHVmhjbFJwYldWdmRYUW9iV0Z5YTJWeUtUdGNiaUFnSUNCOVhHNGdJQ0FnTHk4Z2FXWWdZMnhsWVhKVWFXMWxiM1YwSUhkaGMyNG5kQ0JoZG1GcGJHRmliR1VnWW5WMElIZGhjeUJzWVhSMFpYSWdaR1ZtYVc1bFpGeHVJQ0FnSUdsbUlDZ29ZMkZqYUdWa1EyeGxZWEpVYVcxbGIzVjBJRDA5UFNCa1pXWmhkV3gwUTJ4bFlYSlVhVzFsYjNWMElIeDhJQ0ZqWVdOb1pXUkRiR1ZoY2xScGJXVnZkWFFwSUNZbUlHTnNaV0Z5VkdsdFpXOTFkQ2tnZTF4dUlDQWdJQ0FnSUNCallXTm9aV1JEYkdWaGNsUnBiV1Z2ZFhRZ1BTQmpiR1ZoY2xScGJXVnZkWFE3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJqYkdWaGNsUnBiV1Z2ZFhRb2JXRnlhMlZ5S1R0Y2JpQWdJQ0I5WEc0Z0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUNBZ0x5OGdkMmhsYmlCM2FHVnVJSE52YldWaWIyUjVJR2hoY3lCelkzSmxkMlZrSUhkcGRHZ2djMlYwVkdsdFpXOTFkQ0JpZFhRZ2JtOGdTUzVGTGlCdFlXUmtibVZ6YzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnWTJGamFHVmtRMnhsWVhKVWFXMWxiM1YwS0cxaGNtdGxjaWs3WEc0Z0lDQWdmU0JqWVhSamFDQW9aU2w3WEc0Z0lDQWdJQ0FnSUhSeWVTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QlhhR1Z1SUhkbElHRnlaU0JwYmlCSkxrVXVJR0oxZENCMGFHVWdjMk55YVhCMElHaGhjeUJpWldWdUlHVjJZV3hsWkNCemJ5QkpMa1V1SUdSdlpYTnVKM1FnSUhSeWRYTjBJSFJvWlNCbmJHOWlZV3dnYjJKcVpXTjBJSGRvWlc0Z1kyRnNiR1ZrSUc1dmNtMWhiR3g1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1kyRmphR1ZrUTJ4bFlYSlVhVzFsYjNWMExtTmhiR3dvYm5Wc2JDd2diV0Z5YTJWeUtUdGNiaUFnSUNBZ0lDQWdmU0JqWVhSamFDQW9aU2w3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJ6WVcxbElHRnpJR0ZpYjNabElHSjFkQ0IzYUdWdUlHbDBKM01nWVNCMlpYSnphVzl1SUc5bUlFa3VSUzRnZEdoaGRDQnRkWE4wSUdoaGRtVWdkR2hsSUdkc2IySmhiQ0J2WW1wbFkzUWdabTl5SUNkMGFHbHpKeXdnYUc5d1puVnNiSGtnYjNWeUlHTnZiblJsZUhRZ1kyOXljbVZqZENCdmRHaGxjbmRwYzJVZ2FYUWdkMmxzYkNCMGFISnZkeUJoSUdkc2IySmhiQ0JsY25KdmNpNWNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklGTnZiV1VnZG1WeWMybHZibk1nYjJZZ1NTNUZMaUJvWVhabElHUnBabVpsY21WdWRDQnlkV3hsY3lCbWIzSWdZMnhsWVhKVWFXMWxiM1YwSUhaeklITmxkRlJwYldWdmRYUmNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJqWVdOb1pXUkRiR1ZoY2xScGJXVnZkWFF1WTJGc2JDaDBhR2x6TENCdFlYSnJaWElwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dVhHNWNibHh1ZlZ4dWRtRnlJSEYxWlhWbElEMGdXMTA3WEc1MllYSWdaSEpoYVc1cGJtY2dQU0JtWVd4elpUdGNiblpoY2lCamRYSnlaVzUwVVhWbGRXVTdYRzUyWVhJZ2NYVmxkV1ZKYm1SbGVDQTlJQzB4TzF4dVhHNW1kVzVqZEdsdmJpQmpiR1ZoYmxWd1RtVjRkRlJwWTJzb0tTQjdYRzRnSUNBZ2FXWWdLQ0ZrY21GcGJtbHVaeUI4ZkNBaFkzVnljbVZ1ZEZGMVpYVmxLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQjlYRzRnSUNBZ1pISmhhVzVwYm1jZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0JwWmlBb1kzVnljbVZ1ZEZGMVpYVmxMbXhsYm1kMGFDa2dlMXh1SUNBZ0lDQWdJQ0J4ZFdWMVpTQTlJR04xY25KbGJuUlJkV1YxWlM1amIyNWpZWFFvY1hWbGRXVXBPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lIRjFaWFZsU1c1a1pYZ2dQU0F0TVR0Y2JpQWdJQ0I5WEc0Z0lDQWdhV1lnS0hGMVpYVmxMbXhsYm1kMGFDa2dlMXh1SUNBZ0lDQWdJQ0JrY21GcGJsRjFaWFZsS0NrN1hHNGdJQ0FnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJrY21GcGJsRjFaWFZsS0NrZ2UxeHVJQ0FnSUdsbUlDaGtjbUZwYm1sdVp5a2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ2ZWeHVJQ0FnSUhaaGNpQjBhVzFsYjNWMElEMGdjblZ1VkdsdFpXOTFkQ2hqYkdWaGJsVndUbVY0ZEZScFkyc3BPMXh1SUNBZ0lHUnlZV2x1YVc1bklEMGdkSEoxWlR0Y2JseHVJQ0FnSUhaaGNpQnNaVzRnUFNCeGRXVjFaUzVzWlc1bmRHZzdYRzRnSUNBZ2QyaHBiR1VvYkdWdUtTQjdYRzRnSUNBZ0lDQWdJR04xY25KbGJuUlJkV1YxWlNBOUlIRjFaWFZsTzF4dUlDQWdJQ0FnSUNCeGRXVjFaU0E5SUZ0ZE8xeHVJQ0FnSUNBZ0lDQjNhR2xzWlNBb0t5dHhkV1YxWlVsdVpHVjRJRHdnYkdWdUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9ZM1Z5Y21WdWRGRjFaWFZsS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kzVnljbVZ1ZEZGMVpYVmxXM0YxWlhWbFNXNWtaWGhkTG5KMWJpZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSEYxWlhWbFNXNWtaWGdnUFNBdE1UdGNiaUFnSUNBZ0lDQWdiR1Z1SUQwZ2NYVmxkV1V1YkdWdVozUm9PMXh1SUNBZ0lIMWNiaUFnSUNCamRYSnlaVzUwVVhWbGRXVWdQU0J1ZFd4c08xeHVJQ0FnSUdSeVlXbHVhVzVuSUQwZ1ptRnNjMlU3WEc0Z0lDQWdjblZ1UTJ4bFlYSlVhVzFsYjNWMEtIUnBiV1Z2ZFhRcE8xeHVmVnh1WEc1d2NtOWpaWE56TG01bGVIUlVhV05ySUQwZ1puVnVZM1JwYjI0Z0tHWjFiaWtnZTF4dUlDQWdJSFpoY2lCaGNtZHpJRDBnYm1WM0lFRnljbUY1S0dGeVozVnRaVzUwY3k1c1pXNW5kR2dnTFNBeEtUdGNiaUFnSUNCcFppQW9ZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQStJREVwSUh0Y2JpQWdJQ0FnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJREU3SUdrZ1BDQmhjbWQxYldWdWRITXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR0Z5WjNOYmFTQXRJREZkSUQwZ1lYSm5kVzFsYm5SelcybGRPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVnh1SUNBZ0lIRjFaWFZsTG5CMWMyZ29ibVYzSUVsMFpXMG9ablZ1TENCaGNtZHpLU2s3WEc0Z0lDQWdhV1lnS0hGMVpYVmxMbXhsYm1kMGFDQTlQVDBnTVNBbUppQWhaSEpoYVc1cGJtY3BJSHRjYmlBZ0lDQWdJQ0FnY25WdVZHbHRaVzkxZENoa2NtRnBibEYxWlhWbEtUdGNiaUFnSUNCOVhHNTlPMXh1WEc0dkx5QjJPQ0JzYVd0bGN5QndjbVZrYVdOMGFXSnNaU0J2WW1wbFkzUnpYRzVtZFc1amRHbHZiaUJKZEdWdEtHWjFiaXdnWVhKeVlYa3BJSHRjYmlBZ0lDQjBhR2x6TG1aMWJpQTlJR1oxYmp0Y2JpQWdJQ0IwYUdsekxtRnljbUY1SUQwZ1lYSnlZWGs3WEc1OVhHNUpkR1Z0TG5CeWIzUnZkSGx3WlM1eWRXNGdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnZEdocGN5NW1kVzR1WVhCd2JIa29iblZzYkN3Z2RHaHBjeTVoY25KaGVTazdYRzU5TzF4dWNISnZZMlZ6Y3k1MGFYUnNaU0E5SUNkaWNtOTNjMlZ5Snp0Y2JuQnliMk5sYzNNdVluSnZkM05sY2lBOUlIUnlkV1U3WEc1d2NtOWpaWE56TG1WdWRpQTlJSHQ5TzF4dWNISnZZMlZ6Y3k1aGNtZDJJRDBnVzEwN1hHNXdjbTlqWlhOekxuWmxjbk5wYjI0Z1BTQW5KenNnTHk4Z1pXMXdkSGtnYzNSeWFXNW5JSFJ2SUdGMmIybGtJSEpsWjJWNGNDQnBjM04xWlhOY2JuQnliMk5sYzNNdWRtVnljMmx2Ym5NZ1BTQjdmVHRjYmx4dVpuVnVZM1JwYjI0Z2JtOXZjQ2dwSUh0OVhHNWNibkJ5YjJObGMzTXViMjRnUFNCdWIyOXdPMXh1Y0hKdlkyVnpjeTVoWkdSTWFYTjBaVzVsY2lBOUlHNXZiM0E3WEc1d2NtOWpaWE56TG05dVkyVWdQU0J1YjI5d08xeHVjSEp2WTJWemN5NXZabVlnUFNCdWIyOXdPMXh1Y0hKdlkyVnpjeTV5WlcxdmRtVk1hWE4wWlc1bGNpQTlJRzV2YjNBN1hHNXdjbTlqWlhOekxuSmxiVzkyWlVGc2JFeHBjM1JsYm1WeWN5QTlJRzV2YjNBN1hHNXdjbTlqWlhOekxtVnRhWFFnUFNCdWIyOXdPMXh1Y0hKdlkyVnpjeTV3Y21Wd1pXNWtUR2x6ZEdWdVpYSWdQU0J1YjI5d08xeHVjSEp2WTJWemN5NXdjbVZ3Wlc1a1QyNWpaVXhwYzNSbGJtVnlJRDBnYm05dmNEdGNibHh1Y0hKdlkyVnpjeTVzYVhOMFpXNWxjbk1nUFNCbWRXNWpkR2x2YmlBb2JtRnRaU2tnZXlCeVpYUjFjbTRnVzEwZ2ZWeHVYRzV3Y205alpYTnpMbUpwYm1ScGJtY2dQU0JtZFc1amRHbHZiaUFvYm1GdFpTa2dlMXh1SUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnbmNISnZZMlZ6Y3k1aWFXNWthVzVuSUdseklHNXZkQ0J6ZFhCd2IzSjBaV1FuS1R0Y2JuMDdYRzVjYm5CeWIyTmxjM011WTNka0lEMGdablZ1WTNScGIyNGdLQ2tnZXlCeVpYUjFjbTRnSnk4bklIMDdYRzV3Y205alpYTnpMbU5vWkdseUlEMGdablZ1WTNScGIyNGdLR1JwY2lrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduY0hKdlkyVnpjeTVqYUdScGNpQnBjeUJ1YjNRZ2MzVndjRzl5ZEdWa0p5azdYRzU5TzF4dWNISnZZMlZ6Y3k1MWJXRnpheUE5SUdaMWJtTjBhVzl1S0NrZ2V5QnlaWFIxY200Z01Ec2dmVHRjYmlJc0lpOHFJU0FxS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtseHVRMjl3ZVhKcFoyaDBJQ2hES1NCTmFXTnliM052Wm5RdUlFRnNiQ0J5YVdkb2RITWdjbVZ6WlhKMlpXUXVYRzVNYVdObGJuTmxaQ0IxYm1SbGNpQjBhR1VnUVhCaFkyaGxJRXhwWTJWdWMyVXNJRlpsY25OcGIyNGdNaTR3SUNoMGFHVWdYQ0pNYVdObGJuTmxYQ0lwT3lCNWIzVWdiV0Y1SUc1dmRDQjFjMlZjYm5Sb2FYTWdabWxzWlNCbGVHTmxjSFFnYVc0Z1kyOXRjR3hwWVc1alpTQjNhWFJvSUhSb1pTQk1hV05sYm5ObExpQlpiM1VnYldGNUlHOWlkR0ZwYmlCaElHTnZjSGtnYjJZZ2RHaGxYRzVNYVdObGJuTmxJR0YwSUdoMGRIQTZMeTkzZDNjdVlYQmhZMmhsTG05eVp5OXNhV05sYm5ObGN5OU1TVU5GVGxORkxUSXVNRnh1WEc1VVNFbFRJRU5QUkVVZ1NWTWdVRkpQVmtsRVJVUWdUMDRnUVU0Z0trRlRJRWxUS2lCQ1FWTkpVeXdnVjBsVVNFOVZWQ0JYUVZKU1FVNVVTVVZUSUU5U0lFTlBUa1JKVkVsUFRsTWdUMFlnUVU1WlhHNUxTVTVFTENCRlNWUklSVklnUlZoUVVrVlRVeUJQVWlCSlRWQk1TVVZFTENCSlRrTk1WVVJKVGtjZ1YwbFVTRTlWVkNCTVNVMUpWRUZVU1U5T0lFRk9XU0JKVFZCTVNVVkVYRzVYUVZKU1FVNVVTVVZUSUU5U0lFTlBUa1JKVkVsUFRsTWdUMFlnVkVsVVRFVXNJRVpKVkU1RlUxTWdSazlTSUVFZ1VFRlNWRWxEVlV4QlVpQlFWVkpRVDFORkxGeHVUVVZTUTBoQlRsUkJRa3hKVkZrZ1QxSWdUazlPTFVsT1JsSkpUa2RGVFVWT1ZDNWNibHh1VTJWbElIUm9aU0JCY0dGamFHVWdWbVZ5YzJsdmJpQXlMakFnVEdsalpXNXpaU0JtYjNJZ2MzQmxZMmxtYVdNZ2JHRnVaM1ZoWjJVZ1oyOTJaWEp1YVc1bklIQmxjbTFwYzNOcGIyNXpYRzVoYm1RZ2JHbHRhWFJoZEdsdmJuTWdkVzVrWlhJZ2RHaGxJRXhwWTJWdWMyVXVYRzRxS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpb3FLaW9xS2lvcUtpQXFMMXh1ZG1GeUlGSmxabXhsWTNRN1hHNG9ablZ1WTNScGIyNGdLRkpsWm14bFkzUXBJSHRjYmlBZ0lDQXZMeUJOWlhSaFpHRjBZU0JRY205d2IzTmhiRnh1SUNBZ0lDOHZJR2gwZEhCek9pOHZjbUoxWTJ0MGIyNHVaMmwwYUhWaUxtbHZMM0psWm14bFkzUXRiV1YwWVdSaGRHRXZYRzRnSUNBZ0tHWjFibU4wYVc5dUlDaG1ZV04wYjNKNUtTQjdYRzRnSUNBZ0lDQWdJSFpoY2lCeWIyOTBJRDBnZEhsd1pXOW1JR2RzYjJKaGJDQTlQVDBnWENKdlltcGxZM1JjSWlBL0lHZHNiMkpoYkNBNlhHNGdJQ0FnSUNBZ0lDQWdJQ0IwZVhCbGIyWWdjMlZzWmlBOVBUMGdYQ0p2WW1wbFkzUmNJaUEvSUhObGJHWWdPbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFI1Y0dWdlppQjBhR2x6SUQwOVBTQmNJbTlpYW1WamRGd2lJRDhnZEdocGN5QTZYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUVaMWJtTjBhVzl1S0Z3aWNtVjBkWEp1SUhSb2FYTTdYQ0lwS0NrN1hHNGdJQ0FnSUNBZ0lIWmhjaUJsZUhCdmNuUmxjaUE5SUcxaGEyVkZlSEJ2Y25SbGNpaFNaV1pzWldOMEtUdGNiaUFnSUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUJ5YjI5MExsSmxabXhsWTNRZ1BUMDlJRndpZFc1a1pXWnBibVZrWENJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKdmIzUXVVbVZtYkdWamRDQTlJRkpsWm14bFkzUTdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCbGVIQnZjblJsY2lBOUlHMWhhMlZGZUhCdmNuUmxjaWh5YjI5MExsSmxabXhsWTNRc0lHVjRjRzl5ZEdWeUtUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0JtWVdOMGIzSjVLR1Y0Y0c5eWRHVnlLVHRjYmlBZ0lDQWdJQ0FnWm5WdVkzUnBiMjRnYldGclpVVjRjRzl5ZEdWeUtIUmhjbWRsZEN3Z2NISmxkbWx2ZFhNcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJtZFc1amRHbHZiaUFvYTJWNUxDQjJZV3gxWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwZVhCbGIyWWdkR0Z5WjJWMFcydGxlVjBnSVQwOUlGd2lablZ1WTNScGIyNWNJaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvZEdGeVoyVjBMQ0JyWlhrc0lIc2dZMjl1Wm1sbmRYSmhZbXhsT2lCMGNuVmxMQ0IzY21sMFlXSnNaVG9nZEhKMVpTd2dkbUZzZFdVNklIWmhiSFZsSUgwcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvY0hKbGRtbHZkWE1wWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIQnlaWFpwYjNWektHdGxlU3dnZG1Gc2RXVXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMHBLR1oxYm1OMGFXOXVJQ2hsZUhCdmNuUmxjaWtnZTF4dUlDQWdJQ0FnSUNCMllYSWdhR0Z6VDNkdUlEMGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNW9ZWE5QZDI1UWNtOXdaWEowZVR0Y2JpQWdJQ0FnSUNBZ0x5OGdabVZoZEhWeVpTQjBaWE4wSUdadmNpQlRlVzFpYjJ3Z2MzVndjRzl5ZEZ4dUlDQWdJQ0FnSUNCMllYSWdjM1Z3Y0c5eWRITlRlVzFpYjJ3Z1BTQjBlWEJsYjJZZ1UzbHRZbTlzSUQwOVBTQmNJbVoxYm1OMGFXOXVYQ0k3WEc0Z0lDQWdJQ0FnSUhaaGNpQjBiMUJ5YVcxcGRHbDJaVk41YldKdmJDQTlJSE4xY0hCdmNuUnpVM2x0WW05c0lDWW1JSFI1Y0dWdlppQlRlVzFpYjJ3dWRHOVFjbWx0YVhScGRtVWdJVDA5SUZ3aWRXNWtaV1pwYm1Wa1hDSWdQeUJUZVcxaWIyd3VkRzlRY21sdGFYUnBkbVVnT2lCY0lrQkFkRzlRY21sdGFYUnBkbVZjSWp0Y2JpQWdJQ0FnSUNBZ2RtRnlJR2wwWlhKaGRHOXlVM2x0WW05c0lEMGdjM1Z3Y0c5eWRITlRlVzFpYjJ3Z0ppWWdkSGx3Wlc5bUlGTjViV0p2YkM1cGRHVnlZWFJ2Y2lBaFBUMGdYQ0oxYm1SbFptbHVaV1JjSWlBL0lGTjViV0p2YkM1cGRHVnlZWFJ2Y2lBNklGd2lRRUJwZEdWeVlYUnZjbHdpTzF4dUlDQWdJQ0FnSUNCMllYSWdjM1Z3Y0c5eWRITkRjbVZoZEdVZ1BTQjBlWEJsYjJZZ1QySnFaV04wTG1OeVpXRjBaU0E5UFQwZ1hDSm1kVzVqZEdsdmJsd2lPeUF2THlCbVpXRjBkWEpsSUhSbGMzUWdabTl5SUU5aWFtVmpkQzVqY21WaGRHVWdjM1Z3Y0c5eWRGeHVJQ0FnSUNBZ0lDQjJZWElnYzNWd2NHOXlkSE5RY205MGJ5QTlJSHNnWDE5d2NtOTBiMTlmT2lCYlhTQjlJR2x1YzNSaGJtTmxiMllnUVhKeVlYazdJQzh2SUdabFlYUjFjbVVnZEdWemRDQm1iM0lnWDE5d2NtOTBiMTlmSUhOMWNIQnZjblJjYmlBZ0lDQWdJQ0FnZG1GeUlHUnZkMjVNWlhabGJDQTlJQ0Z6ZFhCd2IzSjBjME55WldGMFpTQW1KaUFoYzNWd2NHOXlkSE5RY205MGJ6dGNiaUFnSUNBZ0lDQWdkbUZ5SUVoaGMyaE5ZWEFnUFNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlCamNtVmhkR1VnWVc0Z2IySnFaV04wSUdsdUlHUnBZM1JwYjI1aGNua2diVzlrWlNBb1lTNXJMbUV1SUZ3aWMyeHZkMXdpSUcxdlpHVWdhVzRnZGpncFhHNGdJQ0FnSUNBZ0lDQWdJQ0JqY21WaGRHVTZJSE4xY0hCdmNuUnpRM0psWVhSbFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1B5Qm1kVzVqZEdsdmJpQW9LU0I3SUhKbGRIVnliaUJOWVd0bFJHbGpkR2x2Ym1GeWVTaFBZbXBsWTNRdVkzSmxZWFJsS0c1MWJHd3BLVHNnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSURvZ2MzVndjRzl5ZEhOUWNtOTBiMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBL0lHWjFibU4wYVc5dUlDZ3BJSHNnY21WMGRYSnVJRTFoYTJWRWFXTjBhVzl1WVhKNUtIc2dYMTl3Y205MGIxOWZPaUJ1ZFd4c0lIMHBPeUI5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEb2dablZ1WTNScGIyNGdLQ2tnZXlCeVpYUjFjbTRnVFdGclpVUnBZM1JwYjI1aGNua29lMzBwT3lCOUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnYUdGek9pQmtiM2R1VEdWMlpXeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQS9JR1oxYm1OMGFXOXVJQ2h0WVhBc0lHdGxlU2tnZXlCeVpYUjFjbTRnYUdGelQzZHVMbU5oYkd3b2JXRndMQ0JyWlhrcE95QjlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdPaUJtZFc1amRHbHZiaUFvYldGd0xDQnJaWGtwSUhzZ2NtVjBkWEp1SUd0bGVTQnBiaUJ0WVhBN0lIMHNYRzRnSUNBZ0lDQWdJQ0FnSUNCblpYUTZJR1J2ZDI1TVpYWmxiRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRDhnWm5WdVkzUnBiMjRnS0cxaGNDd2dhMlY1S1NCN0lISmxkSFZ5YmlCb1lYTlBkMjR1WTJGc2JDaHRZWEFzSUd0bGVTa2dQeUJ0WVhCYmEyVjVYU0E2SUhWdVpHVm1hVzVsWkRzZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEb2dablZ1WTNScGIyNGdLRzFoY0N3Z2EyVjVLU0I3SUhKbGRIVnliaUJ0WVhCYmEyVjVYVHNnZlN4Y2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdMeThnVEc5aFpDQm5iRzlpWVd3Z2IzSWdjMmhwYlNCMlpYSnphVzl1Y3lCdlppQk5ZWEFzSUZObGRDd2dZVzVrSUZkbFlXdE5ZWEJjYmlBZ0lDQWdJQ0FnZG1GeUlHWjFibU4wYVc5dVVISnZkRzkwZVhCbElEMGdUMkpxWldOMExtZGxkRkJ5YjNSdmRIbHdaVTltS0VaMWJtTjBhVzl1S1R0Y2JpQWdJQ0FnSUNBZ2RtRnlJSFZ6WlZCdmJIbG1hV3hzSUQwZ2RIbHdaVzltSUhCeWIyTmxjM01nUFQwOUlGd2liMkpxWldOMFhDSWdKaVlnY0hKdlkyVnpjeTVsYm5ZZ0ppWWdjSEp2WTJWemN5NWxiblpiWENKU1JVWk1SVU5VWDAxRlZFRkVRVlJCWDFWVFJWOU5RVkJmVUU5TVdVWkpURXhjSWwwZ1BUMDlJRndpZEhKMVpWd2lPMXh1SUNBZ0lDQWdJQ0IyWVhJZ1gwMWhjQ0E5SUNGMWMyVlFiMng1Wm1sc2JDQW1KaUIwZVhCbGIyWWdUV0Z3SUQwOVBTQmNJbVoxYm1OMGFXOXVYQ0lnSmlZZ2RIbHdaVzltSUUxaGNDNXdjbTkwYjNSNWNHVXVaVzUwY21sbGN5QTlQVDBnWENKbWRXNWpkR2x2Ymx3aUlEOGdUV0Z3SURvZ1EzSmxZWFJsVFdGd1VHOXNlV1pwYkd3b0tUdGNiaUFnSUNBZ0lDQWdkbUZ5SUY5VFpYUWdQU0FoZFhObFVHOXNlV1pwYkd3Z0ppWWdkSGx3Wlc5bUlGTmxkQ0E5UFQwZ1hDSm1kVzVqZEdsdmJsd2lJQ1ltSUhSNWNHVnZaaUJUWlhRdWNISnZkRzkwZVhCbExtVnVkSEpwWlhNZ1BUMDlJRndpWm5WdVkzUnBiMjVjSWlBL0lGTmxkQ0E2SUVOeVpXRjBaVk5sZEZCdmJIbG1hV3hzS0NrN1hHNGdJQ0FnSUNBZ0lIWmhjaUJmVjJWaGEwMWhjQ0E5SUNGMWMyVlFiMng1Wm1sc2JDQW1KaUIwZVhCbGIyWWdWMlZoYTAxaGNDQTlQVDBnWENKbWRXNWpkR2x2Ymx3aUlEOGdWMlZoYTAxaGNDQTZJRU55WldGMFpWZGxZV3ROWVhCUWIyeDVabWxzYkNncE8xeHVJQ0FnSUNBZ0lDQXZMeUJiVzAxbGRHRmtZWFJoWFYwZ2FXNTBaWEp1WVd3Z2MyeHZkRnh1SUNBZ0lDQWdJQ0F2THlCb2RIUndjem92TDNKaWRXTnJkRzl1TG1kcGRHaDFZaTVwYnk5eVpXWnNaV04wTFcxbGRHRmtZWFJoTHlOdmNtUnBibUZ5ZVMxdlltcGxZM1F0YVc1MFpYSnVZV3d0YldWMGFHOWtjeTFoYm1RdGFXNTBaWEp1WVd3dGMyeHZkSE5jYmlBZ0lDQWdJQ0FnZG1GeUlFMWxkR0ZrWVhSaElEMGdibVYzSUY5WFpXRnJUV0Z3S0NrN1hHNGdJQ0FnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ0FnS2lCQmNIQnNhV1Z6SUdFZ2MyVjBJRzltSUdSbFkyOXlZWFJ2Y25NZ2RHOGdZU0J3Y205d1pYSjBlU0J2WmlCaElIUmhjbWRsZENCdlltcGxZM1F1WEc0Z0lDQWdJQ0FnSUNBcUlFQndZWEpoYlNCa1pXTnZjbUYwYjNKeklFRnVJR0Z5Y21GNUlHOW1JR1JsWTI5eVlYUnZjbk11WEc0Z0lDQWdJQ0FnSUNBcUlFQndZWEpoYlNCMFlYSm5aWFFnVkdobElIUmhjbWRsZENCdlltcGxZM1F1WEc0Z0lDQWdJQ0FnSUNBcUlFQndZWEpoYlNCd2NtOXdaWEowZVV0bGVTQW9UM0IwYVc5dVlXd3BJRlJvWlNCd2NtOXdaWEowZVNCclpYa2dkRzhnWkdWamIzSmhkR1V1WEc0Z0lDQWdJQ0FnSUNBcUlFQndZWEpoYlNCaGRIUnlhV0oxZEdWeklDaFBjSFJwYjI1aGJDa2dWR2hsSUhCeWIzQmxjblI1SUdSbGMyTnlhWEIwYjNJZ1ptOXlJSFJvWlNCMFlYSm5aWFFnYTJWNUxseHVJQ0FnSUNBZ0lDQWdLaUJBY21WdFlYSnJjeUJFWldOdmNtRjBiM0p6SUdGeVpTQmhjSEJzYVdWa0lHbHVJSEpsZG1WeWMyVWdiM0prWlhJdVhHNGdJQ0FnSUNBZ0lDQXFJRUJsZUdGdGNHeGxYRzRnSUNBZ0lDQWdJQ0FxWEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0JqYkdGemN5QkZlR0Z0Y0d4bElIdGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lDQWdJQ0F2THlCd2NtOXdaWEowZVNCa1pXTnNZWEpoZEdsdmJuTWdZWEpsSUc1dmRDQndZWEowSUc5bUlFVlROaXdnZEdodmRXZG9JSFJvWlhrZ1lYSmxJSFpoYkdsa0lHbHVJRlI1Y0dWVFkzSnBjSFE2WEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0FnSUNBZ0x5OGdjM1JoZEdsaklITjBZWFJwWTFCeWIzQmxjblI1TzF4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnSUNBZ0lDOHZJSEJ5YjNCbGNuUjVPMXh1SUNBZ0lDQWdJQ0FnS2x4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnSUNBZ0lHTnZibk4wY25WamRHOXlLSEFwSUhzZ2ZWeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ0lDQWdJSE4wWVhScFl5QnpkR0YwYVdOTlpYUm9iMlFvY0NrZ2V5QjlYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQWdJQ0FnYldWMGFHOWtLSEFwSUhzZ2ZWeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdLbHh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdMeThnWTI5dWMzUnlkV04wYjNKY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUVWNFlXMXdiR1VnUFNCU1pXWnNaV04wTG1SbFkyOXlZWFJsS0dSbFkyOXlZWFJ2Y25OQmNuSmhlU3dnUlhoaGJYQnNaU2s3WEc0Z0lDQWdJQ0FnSUNBcVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBdkx5QndjbTl3WlhKMGVTQW9iMjRnWTI5dWMzUnlkV04wYjNJcFhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNCU1pXWnNaV04wTG1SbFkyOXlZWFJsS0dSbFkyOXlZWFJ2Y25OQmNuSmhlU3dnUlhoaGJYQnNaU3dnWENKemRHRjBhV05RY205d1pYSjBlVndpS1R0Y2JpQWdJQ0FnSUNBZ0lDcGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lDOHZJSEJ5YjNCbGNuUjVJQ2h2YmlCd2NtOTBiM1I1Y0dVcFhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNCU1pXWnNaV04wTG1SbFkyOXlZWFJsS0dSbFkyOXlZWFJ2Y25OQmNuSmhlU3dnUlhoaGJYQnNaUzV3Y205MGIzUjVjR1VzSUZ3aWNISnZjR1Z5ZEhsY0lpazdYRzRnSUNBZ0lDQWdJQ0FxWEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0F2THlCdFpYUm9iMlFnS0c5dUlHTnZibk4wY25WamRHOXlLVnh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1S0VWNFlXMXdiR1VzSUZ3aWMzUmhkR2xqVFdWMGFHOWtYQ0lzWEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0FnSUNBZ1VtVm1iR1ZqZEM1a1pXTnZjbUYwWlNoa1pXTnZjbUYwYjNKelFYSnlZWGtzSUVWNFlXMXdiR1VzSUZ3aWMzUmhkR2xqVFdWMGFHOWtYQ0lzWEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0FnSUNBZ0lDQWdJRTlpYW1WamRDNW5aWFJQZDI1UWNtOXdaWEowZVVSbGMyTnlhWEIwYjNJb1JYaGhiWEJzWlN3Z1hDSnpkR0YwYVdOTlpYUm9iMlJjSWlrcEtUdGNiaUFnSUNBZ0lDQWdJQ3BjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJQzh2SUcxbGRHaHZaQ0FvYjI0Z2NISnZkRzkwZVhCbEtWeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ1QySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLRVY0WVcxd2JHVXVjSEp2ZEc5MGVYQmxMQ0JjSW0xbGRHaHZaRndpTEZ4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnSUNBZ0lGSmxabXhsWTNRdVpHVmpiM0poZEdVb1pHVmpiM0poZEc5eWMwRnljbUY1TENCRmVHRnRjR3hsTG5CeWIzUnZkSGx3WlN3Z1hDSnRaWFJvYjJSY0lpeGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lDQWdJQ0FnSUNBZ1QySnFaV04wTG1kbGRFOTNibEJ5YjNCbGNuUjVSR1Z6WTNKcGNIUnZjaWhGZUdGdGNHeGxMbkJ5YjNSdmRIbHdaU3dnWENKdFpYUm9iMlJjSWlrcEtUdGNiaUFnSUNBZ0lDQWdJQ3BjYmlBZ0lDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNBZ0lHWjFibU4wYVc5dUlHUmxZMjl5WVhSbEtHUmxZMjl5WVhSdmNuTXNJSFJoY21kbGRDd2djSEp2Y0dWeWRIbExaWGtzSUdGMGRISnBZblYwWlhNcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDZ2hTWE5WYm1SbFptbHVaV1FvY0hKdmNHVnlkSGxMWlhrcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NGSmMwRnljbUY1S0dSbFkyOXlZWFJ2Y25NcEtWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUhKdmR5QnVaWGNnVkhsd1pVVnljbTl5S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ0ZKYzA5aWFtVmpkQ2gwWVhKblpYUXBLVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1ZIbHdaVVZ5Y205eUtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NGSmMwOWlhbVZqZENoaGRIUnlhV0oxZEdWektTQW1KaUFoU1hOVmJtUmxabWx1WldRb1lYUjBjbWxpZFhSbGN5a2dKaVlnSVVselRuVnNiQ2hoZEhSeWFXSjFkR1Z6S1NsY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRlI1Y0dWRmNuSnZjaWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaEpjMDUxYkd3b1lYUjBjbWxpZFhSbGN5a3BYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdGMGRISnBZblYwWlhNZ1BTQjFibVJsWm1sdVpXUTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjSEp2Y0dWeWRIbExaWGtnUFNCVWIxQnliM0JsY25SNVMyVjVLSEJ5YjNCbGNuUjVTMlY1S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnUkdWamIzSmhkR1ZRY205d1pYSjBlU2hrWldOdmNtRjBiM0p6TENCMFlYSm5aWFFzSUhCeWIzQmxjblI1UzJWNUxDQmhkSFJ5YVdKMWRHVnpLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNnaFNYTkJjbkpoZVNoa1pXTnZjbUYwYjNKektTbGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdoeWIzY2dibVYzSUZSNWNHVkZjbkp2Y2lncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2doU1hORGIyNXpkSEoxWTNSdmNpaDBZWEpuWlhRcEtWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUhKdmR5QnVaWGNnVkhsd1pVVnljbTl5S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUVSbFkyOXlZWFJsUTI5dWMzUnlkV04wYjNJb1pHVmpiM0poZEc5eWN5d2dkR0Z5WjJWMEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQmxlSEJ2Y25SbGNpaGNJbVJsWTI5eVlYUmxYQ0lzSUdSbFkyOXlZWFJsS1R0Y2JpQWdJQ0FnSUNBZ0x5OGdOQzR4TGpJZ1VtVm1iR1ZqZEM1dFpYUmhaR0YwWVNodFpYUmhaR0YwWVV0bGVTd2diV1YwWVdSaGRHRldZV3gxWlNsY2JpQWdJQ0FnSUNBZ0x5OGdhSFIwY0hNNkx5OXlZblZqYTNSdmJpNW5hWFJvZFdJdWFXOHZjbVZtYkdWamRDMXRaWFJoWkdGMFlTOGpjbVZtYkdWamRDNXRaWFJoWkdGMFlWeHVJQ0FnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FnSUNvZ1FTQmtaV1poZFd4MElHMWxkR0ZrWVhSaElHUmxZMjl5WVhSdmNpQm1ZV04wYjNKNUlIUm9ZWFFnWTJGdUlHSmxJSFZ6WldRZ2IyNGdZU0JqYkdGemN5d2dZMnhoYzNNZ2JXVnRZbVZ5TENCdmNpQndZWEpoYldWMFpYSXVYRzRnSUNBZ0lDQWdJQ0FxSUVCd1lYSmhiU0J0WlhSaFpHRjBZVXRsZVNCVWFHVWdhMlY1SUdadmNpQjBhR1VnYldWMFlXUmhkR0VnWlc1MGNua3VYRzRnSUNBZ0lDQWdJQ0FxSUVCd1lYSmhiU0J0WlhSaFpHRjBZVlpoYkhWbElGUm9aU0IyWVd4MVpTQm1iM0lnZEdobElHMWxkR0ZrWVhSaElHVnVkSEo1TGx4dUlDQWdJQ0FnSUNBZ0tpQkFjbVYwZFhKdWN5QkJJR1JsWTI5eVlYUnZjaUJtZFc1amRHbHZiaTVjYmlBZ0lDQWdJQ0FnSUNvZ1FISmxiV0Z5YTNOY2JpQWdJQ0FnSUNBZ0lDb2dTV1lnWUcxbGRHRmtZWFJoUzJWNVlDQnBjeUJoYkhKbFlXUjVJR1JsWm1sdVpXUWdabTl5SUhSb1pTQjBZWEpuWlhRZ1lXNWtJSFJoY21kbGRDQnJaWGtzSUhSb1pWeHVJQ0FnSUNBZ0lDQWdLaUJ0WlhSaFpHRjBZVlpoYkhWbElHWnZjaUIwYUdGMElHdGxlU0IzYVd4c0lHSmxJRzkyWlhKM2NtbDBkR1Z1TGx4dUlDQWdJQ0FnSUNBZ0tpQkFaWGhoYlhCc1pWeHVJQ0FnSUNBZ0lDQWdLbHh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdMeThnWTI5dWMzUnlkV04wYjNKY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUVCU1pXWnNaV04wTG0xbGRHRmtZWFJoS0d0bGVTd2dkbUZzZFdVcFhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNCamJHRnpjeUJGZUdGdGNHeGxJSHRjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNwY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUM4dklIQnliM0JsY25SNUlDaHZiaUJqYjI1emRISjFZM1J2Y2l3Z1ZIbHdaVk5qY21sd2RDQnZibXg1S1Z4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnWTJ4aGMzTWdSWGhoYlhCc1pTQjdYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQWdJQ0FnUUZKbFpteGxZM1F1YldWMFlXUmhkR0VvYTJWNUxDQjJZV3gxWlNsY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUNBZ0lDQnpkR0YwYVdNZ2MzUmhkR2xqVUhKdmNHVnlkSGs3WEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBcVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBdkx5QndjbTl3WlhKMGVTQW9iMjRnY0hKdmRHOTBlWEJsTENCVWVYQmxVMk55YVhCMElHOXViSGtwWEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0JqYkdGemN5QkZlR0Z0Y0d4bElIdGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lDQWdJQ0JBVW1WbWJHVmpkQzV0WlhSaFpHRjBZU2hyWlhrc0lIWmhiSFZsS1Z4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnSUNBZ0lIQnliM0JsY25SNU8xeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdLbHh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdMeThnYldWMGFHOWtJQ2h2YmlCamIyNXpkSEoxWTNSdmNpbGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lHTnNZWE56SUVWNFlXMXdiR1VnZTF4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnSUNBZ0lFQlNaV1pzWldOMExtMWxkR0ZrWVhSaEtHdGxlU3dnZG1Gc2RXVXBYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQWdJQ0FnYzNSaGRHbGpJSE4wWVhScFkwMWxkR2h2WkNncElIc2dmVnh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnS2x4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnTHk4Z2JXVjBhRzlrSUNodmJpQndjbTkwYjNSNWNHVXBYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQmpiR0Z6Y3lCRmVHRnRjR3hsSUh0Y2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUNBZ0lDQkFVbVZtYkdWamRDNXRaWFJoWkdGMFlTaHJaWGtzSUhaaGJIVmxLVnh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdJQ0FnSUcxbGRHaHZaQ2dwSUhzZ2ZWeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdLbHh1SUNBZ0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUNBZ1puVnVZM1JwYjI0Z2JXVjBZV1JoZEdFb2JXVjBZV1JoZEdGTFpYa3NJRzFsZEdGa1lYUmhWbUZzZFdVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdaMWJtTjBhVzl1SUdSbFkyOXlZWFJ2Y2loMFlYSm5aWFFzSUhCeWIzQmxjblI1UzJWNUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NGSmMwOWlhbVZqZENoMFlYSm5aWFFwS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dWSGx3WlVWeWNtOXlLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tDRkpjMVZ1WkdWbWFXNWxaQ2h3Y205d1pYSjBlVXRsZVNrZ0ppWWdJVWx6VUhKdmNHVnlkSGxMWlhrb2NISnZjR1Z5ZEhsTFpYa3BLVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1ZIbHdaVVZ5Y205eUtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdUM0prYVc1aGNubEVaV1pwYm1WUGQyNU5aWFJoWkdGMFlTaHRaWFJoWkdGMFlVdGxlU3dnYldWMFlXUmhkR0ZXWVd4MVpTd2dkR0Z5WjJWMExDQndjbTl3WlhKMGVVdGxlU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWkdWamIzSmhkRzl5TzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lHVjRjRzl5ZEdWeUtGd2liV1YwWVdSaGRHRmNJaXdnYldWMFlXUmhkR0VwTzF4dUlDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ29nUkdWbWFXNWxJR0VnZFc1cGNYVmxJRzFsZEdGa1lYUmhJR1Z1ZEhKNUlHOXVJSFJvWlNCMFlYSm5aWFF1WEc0Z0lDQWdJQ0FnSUNBcUlFQndZWEpoYlNCdFpYUmhaR0YwWVV0bGVTQkJJR3RsZVNCMWMyVmtJSFJ2SUhOMGIzSmxJR0Z1WkNCeVpYUnlhV1YyWlNCdFpYUmhaR0YwWVM1Y2JpQWdJQ0FnSUNBZ0lDb2dRSEJoY21GdElHMWxkR0ZrWVhSaFZtRnNkV1VnUVNCMllXeDFaU0IwYUdGMElHTnZiblJoYVc1eklHRjBkR0ZqYUdWa0lHMWxkR0ZrWVhSaExseHVJQ0FnSUNBZ0lDQWdLaUJBY0dGeVlXMGdkR0Z5WjJWMElGUm9aU0IwWVhKblpYUWdiMkpxWldOMElHOXVJSGRvYVdOb0lIUnZJR1JsWm1sdVpTQnRaWFJoWkdGMFlTNWNiaUFnSUNBZ0lDQWdJQ29nUUhCaGNtRnRJSEJ5YjNCbGNuUjVTMlY1SUNoUGNIUnBiMjVoYkNrZ1ZHaGxJSEJ5YjNCbGNuUjVJR3RsZVNCbWIzSWdkR2hsSUhSaGNtZGxkQzVjYmlBZ0lDQWdJQ0FnSUNvZ1FHVjRZVzF3YkdWY2JpQWdJQ0FnSUNBZ0lDcGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lHTnNZWE56SUVWNFlXMXdiR1VnZTF4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnSUNBZ0lDOHZJSEJ5YjNCbGNuUjVJR1JsWTJ4aGNtRjBhVzl1Y3lCaGNtVWdibTkwSUhCaGNuUWdiMllnUlZNMkxDQjBhRzkxWjJnZ2RHaGxlU0JoY21VZ2RtRnNhV1FnYVc0Z1ZIbHdaVk5qY21sd2REcGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lDQWdJQ0F2THlCemRHRjBhV01nYzNSaGRHbGpVSEp2Y0dWeWRIazdYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQWdJQ0FnTHk4Z2NISnZjR1Z5ZEhrN1hHNGdJQ0FnSUNBZ0lDQXFYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQWdJQ0FnWTI5dWMzUnlkV04wYjNJb2NDa2dleUI5WEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0FnSUNBZ2MzUmhkR2xqSUhOMFlYUnBZMDFsZEdodlpDaHdLU0I3SUgxY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUNBZ0lDQnRaWFJvYjJRb2NDa2dleUI5WEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBcVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBdkx5QmpiMjV6ZEhKMVkzUnZjbHh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdVbVZtYkdWamRDNWtaV1pwYm1WTlpYUmhaR0YwWVNoY0ltTjFjM1J2YlRwaGJtNXZkR0YwYVc5dVhDSXNJRzl3ZEdsdmJuTXNJRVY0WVcxd2JHVXBPMXh1SUNBZ0lDQWdJQ0FnS2x4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnTHk4Z2NISnZjR1Z5ZEhrZ0tHOXVJR052Ym5OMGNuVmpkRzl5S1Z4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnVW1WbWJHVmpkQzVrWldacGJtVk5aWFJoWkdGMFlTaGNJbU4xYzNSdmJUcGhibTV2ZEdGMGFXOXVYQ0lzSUc5d2RHbHZibk1zSUVWNFlXMXdiR1VzSUZ3aWMzUmhkR2xqVUhKdmNHVnlkSGxjSWlrN1hHNGdJQ0FnSUNBZ0lDQXFYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQXZMeUJ3Y205d1pYSjBlU0FvYjI0Z2NISnZkRzkwZVhCbEtWeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ1VtVm1iR1ZqZEM1a1pXWnBibVZOWlhSaFpHRjBZU2hjSW1OMWMzUnZiVHBoYm01dmRHRjBhVzl1WENJc0lHOXdkR2x2Ym5Nc0lFVjRZVzF3YkdVdWNISnZkRzkwZVhCbExDQmNJbkJ5YjNCbGNuUjVYQ0lwTzF4dUlDQWdJQ0FnSUNBZ0tseHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ0x5OGdiV1YwYUc5a0lDaHZiaUJqYjI1emRISjFZM1J2Y2lsY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUZKbFpteGxZM1F1WkdWbWFXNWxUV1YwWVdSaGRHRW9YQ0pqZFhOMGIyMDZZVzV1YjNSaGRHbHZibHdpTENCdmNIUnBiMjV6TENCRmVHRnRjR3hsTENCY0luTjBZWFJwWTAxbGRHaHZaRndpS1R0Y2JpQWdJQ0FnSUNBZ0lDcGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lDOHZJRzFsZEdodlpDQW9iMjRnY0hKdmRHOTBlWEJsS1Z4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnVW1WbWJHVmpkQzVrWldacGJtVk5aWFJoWkdGMFlTaGNJbU4xYzNSdmJUcGhibTV2ZEdGMGFXOXVYQ0lzSUc5d2RHbHZibk1zSUVWNFlXMXdiR1V1Y0hKdmRHOTBlWEJsTENCY0ltMWxkR2h2WkZ3aUtUdGNiaUFnSUNBZ0lDQWdJQ3BjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJQzh2SUdSbFkyOXlZWFJ2Y2lCbVlXTjBiM0o1SUdGeklHMWxkR0ZrWVhSaExYQnliMlIxWTJsdVp5QmhibTV2ZEdGMGFXOXVMbHh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdablZ1WTNScGIyNGdUWGxCYm01dmRHRjBhVzl1S0c5d2RHbHZibk1wT2lCRVpXTnZjbUYwYjNJZ2UxeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ0lDQWdJSEpsZEhWeWJpQW9kR0Z5WjJWMExDQnJaWGsvS1NBOVBpQlNaV1pzWldOMExtUmxabWx1WlUxbGRHRmtZWFJoS0Z3aVkzVnpkRzl0T21GdWJtOTBZWFJwYjI1Y0lpd2diM0IwYVc5dWN5d2dkR0Z5WjJWMExDQnJaWGtwTzF4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0tseHVJQ0FnSUNBZ0lDQWdLaTljYmlBZ0lDQWdJQ0FnWm5WdVkzUnBiMjRnWkdWbWFXNWxUV1YwWVdSaGRHRW9iV1YwWVdSaGRHRkxaWGtzSUcxbGRHRmtZWFJoVm1Gc2RXVXNJSFJoY21kbGRDd2djSEp2Y0dWeWRIbExaWGtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNnaFNYTlBZbXBsWTNRb2RHRnlaMlYwS1NsY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1ZIbHdaVVZ5Y205eUtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9JVWx6Vlc1a1pXWnBibVZrS0hCeWIzQmxjblI1UzJWNUtTbGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQndjbTl3WlhKMGVVdGxlU0E5SUZSdlVISnZjR1Z5ZEhsTFpYa29jSEp2Y0dWeWRIbExaWGtwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlFOXlaR2x1WVhKNVJHVm1hVzVsVDNkdVRXVjBZV1JoZEdFb2JXVjBZV1JoZEdGTFpYa3NJRzFsZEdGa1lYUmhWbUZzZFdVc0lIUmhjbWRsZEN3Z2NISnZjR1Z5ZEhsTFpYa3BPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUdWNGNHOXlkR1Z5S0Z3aVpHVm1hVzVsVFdWMFlXUmhkR0ZjSWl3Z1pHVm1hVzVsVFdWMFlXUmhkR0VwTzF4dUlDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ29nUjJWMGN5QmhJSFpoYkhWbElHbHVaR2xqWVhScGJtY2dkMmhsZEdobGNpQjBhR1VnZEdGeVoyVjBJRzlpYW1WamRDQnZjaUJwZEhNZ2NISnZkRzkwZVhCbElHTm9ZV2x1SUdoaGN5QjBhR1VnY0hKdmRtbGtaV1FnYldWMFlXUmhkR0VnYTJWNUlHUmxabWx1WldRdVhHNGdJQ0FnSUNBZ0lDQXFJRUJ3WVhKaGJTQnRaWFJoWkdGMFlVdGxlU0JCSUd0bGVTQjFjMlZrSUhSdklITjBiM0psSUdGdVpDQnlaWFJ5YVdWMlpTQnRaWFJoWkdGMFlTNWNiaUFnSUNBZ0lDQWdJQ29nUUhCaGNtRnRJSFJoY21kbGRDQlVhR1VnZEdGeVoyVjBJRzlpYW1WamRDQnZiaUIzYUdsamFDQjBhR1VnYldWMFlXUmhkR0VnYVhNZ1pHVm1hVzVsWkM1Y2JpQWdJQ0FnSUNBZ0lDb2dRSEJoY21GdElIQnliM0JsY25SNVMyVjVJQ2hQY0hScGIyNWhiQ2tnVkdobElIQnliM0JsY25SNUlHdGxlU0JtYjNJZ2RHaGxJSFJoY21kbGRDNWNiaUFnSUNBZ0lDQWdJQ29nUUhKbGRIVnlibk1nWUhSeWRXVmdJR2xtSUhSb1pTQnRaWFJoWkdGMFlTQnJaWGtnZDJGeklHUmxabWx1WldRZ2IyNGdkR2hsSUhSaGNtZGxkQ0J2WW1wbFkzUWdiM0lnYVhSeklIQnliM1J2ZEhsd1pTQmphR0ZwYmpzZ2IzUm9aWEozYVhObExDQmdabUZzYzJWZ0xseHVJQ0FnSUNBZ0lDQWdLaUJBWlhoaGJYQnNaVnh1SUNBZ0lDQWdJQ0FnS2x4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnWTJ4aGMzTWdSWGhoYlhCc1pTQjdYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQWdJQ0FnTHk4Z2NISnZjR1Z5ZEhrZ1pHVmpiR0Z5WVhScGIyNXpJR0Z5WlNCdWIzUWdjR0Z5ZENCdlppQkZVellzSUhSb2IzVm5hQ0IwYUdWNUlHRnlaU0IyWVd4cFpDQnBiaUJVZVhCbFUyTnlhWEIwT2x4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnSUNBZ0lDOHZJSE4wWVhScFl5QnpkR0YwYVdOUWNtOXdaWEowZVR0Y2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUNBZ0lDQXZMeUJ3Y205d1pYSjBlVHRjYmlBZ0lDQWdJQ0FnSUNwY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUNBZ0lDQmpiMjV6ZEhKMVkzUnZjaWh3S1NCN0lIMWNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lDQWdJQ0J6ZEdGMGFXTWdjM1JoZEdsalRXVjBhRzlrS0hBcElIc2dmVnh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdJQ0FnSUcxbGRHaHZaQ2h3S1NCN0lIMWNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ3BjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJQzh2SUdOdmJuTjBjblZqZEc5eVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNCeVpYTjFiSFFnUFNCU1pXWnNaV04wTG1oaGMwMWxkR0ZrWVhSaEtGd2lZM1Z6ZEc5dE9tRnVibTkwWVhScGIyNWNJaXdnUlhoaGJYQnNaU2s3WEc0Z0lDQWdJQ0FnSUNBcVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBdkx5QndjbTl3WlhKMGVTQW9iMjRnWTI5dWMzUnlkV04wYjNJcFhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNCeVpYTjFiSFFnUFNCU1pXWnNaV04wTG1oaGMwMWxkR0ZrWVhSaEtGd2lZM1Z6ZEc5dE9tRnVibTkwWVhScGIyNWNJaXdnUlhoaGJYQnNaU3dnWENKemRHRjBhV05RY205d1pYSjBlVndpS1R0Y2JpQWdJQ0FnSUNBZ0lDcGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lDOHZJSEJ5YjNCbGNuUjVJQ2h2YmlCd2NtOTBiM1I1Y0dVcFhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNCeVpYTjFiSFFnUFNCU1pXWnNaV04wTG1oaGMwMWxkR0ZrWVhSaEtGd2lZM1Z6ZEc5dE9tRnVibTkwWVhScGIyNWNJaXdnUlhoaGJYQnNaUzV3Y205MGIzUjVjR1VzSUZ3aWNISnZjR1Z5ZEhsY0lpazdYRzRnSUNBZ0lDQWdJQ0FxWEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0F2THlCdFpYUm9iMlFnS0c5dUlHTnZibk4wY25WamRHOXlLVnh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdjbVZ6ZFd4MElEMGdVbVZtYkdWamRDNW9ZWE5OWlhSaFpHRjBZU2hjSW1OMWMzUnZiVHBoYm01dmRHRjBhVzl1WENJc0lFVjRZVzF3YkdVc0lGd2ljM1JoZEdsalRXVjBhRzlrWENJcE8xeHVJQ0FnSUNBZ0lDQWdLbHh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdMeThnYldWMGFHOWtJQ2h2YmlCd2NtOTBiM1I1Y0dVcFhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNCeVpYTjFiSFFnUFNCU1pXWnNaV04wTG1oaGMwMWxkR0ZrWVhSaEtGd2lZM1Z6ZEc5dE9tRnVibTkwWVhScGIyNWNJaXdnUlhoaGJYQnNaUzV3Y205MGIzUjVjR1VzSUZ3aWJXVjBhRzlrWENJcE8xeHVJQ0FnSUNBZ0lDQWdLbHh1SUNBZ0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUNBZ1puVnVZM1JwYjI0Z2FHRnpUV1YwWVdSaGRHRW9iV1YwWVdSaGRHRkxaWGtzSUhSaGNtZGxkQ3dnY0hKdmNHVnlkSGxMWlhrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDZ2hTWE5QWW1wbFkzUW9kR0Z5WjJWMEtTbGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dWSGx3WlVWeWNtOXlLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvSVVselZXNWtaV1pwYm1Wa0tIQnliM0JsY25SNVMyVjVLU2xjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J3Y205d1pYSjBlVXRsZVNBOUlGUnZVSEp2Y0dWeWRIbExaWGtvY0hKdmNHVnlkSGxMWlhrcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRTl5WkdsdVlYSjVTR0Z6VFdWMFlXUmhkR0VvYldWMFlXUmhkR0ZMWlhrc0lIUmhjbWRsZEN3Z2NISnZjR1Z5ZEhsTFpYa3BPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUdWNGNHOXlkR1Z5S0Z3aWFHRnpUV1YwWVdSaGRHRmNJaXdnYUdGelRXVjBZV1JoZEdFcE8xeHVJQ0FnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FnSUNvZ1IyVjBjeUJoSUhaaGJIVmxJR2x1WkdsallYUnBibWNnZDJobGRHaGxjaUIwYUdVZ2RHRnlaMlYwSUc5aWFtVmpkQ0JvWVhNZ2RHaGxJSEJ5YjNacFpHVmtJRzFsZEdGa1lYUmhJR3RsZVNCa1pXWnBibVZrTGx4dUlDQWdJQ0FnSUNBZ0tpQkFjR0Z5WVcwZ2JXVjBZV1JoZEdGTFpYa2dRU0JyWlhrZ2RYTmxaQ0IwYnlCemRHOXlaU0JoYm1RZ2NtVjBjbWxsZG1VZ2JXVjBZV1JoZEdFdVhHNGdJQ0FnSUNBZ0lDQXFJRUJ3WVhKaGJTQjBZWEpuWlhRZ1ZHaGxJSFJoY21kbGRDQnZZbXBsWTNRZ2IyNGdkMmhwWTJnZ2RHaGxJRzFsZEdGa1lYUmhJR2x6SUdSbFptbHVaV1F1WEc0Z0lDQWdJQ0FnSUNBcUlFQndZWEpoYlNCd2NtOXdaWEowZVV0bGVTQW9UM0IwYVc5dVlXd3BJRlJvWlNCd2NtOXdaWEowZVNCclpYa2dabTl5SUhSb1pTQjBZWEpuWlhRdVhHNGdJQ0FnSUNBZ0lDQXFJRUJ5WlhSMWNtNXpJR0IwY25WbFlDQnBaaUIwYUdVZ2JXVjBZV1JoZEdFZ2EyVjVJSGRoY3lCa1pXWnBibVZrSUc5dUlIUm9aU0IwWVhKblpYUWdiMkpxWldOME95QnZkR2hsY25kcGMyVXNJR0JtWVd4elpXQXVYRzRnSUNBZ0lDQWdJQ0FxSUVCbGVHRnRjR3hsWEc0Z0lDQWdJQ0FnSUNBcVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNCamJHRnpjeUJGZUdGdGNHeGxJSHRjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJQ0FnSUNBdkx5QndjbTl3WlhKMGVTQmtaV05zWVhKaGRHbHZibk1nWVhKbElHNXZkQ0J3WVhKMElHOW1JRVZUTml3Z2RHaHZkV2RvSUhSb1pYa2dZWEpsSUhaaGJHbGtJR2x1SUZSNWNHVlRZM0pwY0hRNlhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBZ0lDQWdMeThnYzNSaGRHbGpJSE4wWVhScFkxQnliM0JsY25SNU8xeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ0lDQWdJQzh2SUhCeWIzQmxjblI1TzF4dUlDQWdJQ0FnSUNBZ0tseHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ0lDQWdJR052Ym5OMGNuVmpkRzl5S0hBcElIc2dmVnh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdJQ0FnSUhOMFlYUnBZeUJ6ZEdGMGFXTk5aWFJvYjJRb2NDa2dleUI5WEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0FnSUNBZ2JXVjBhRzlrS0hBcElIc2dmVnh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnS2x4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnTHk4Z1kyOXVjM1J5ZFdOMGIzSmNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lISmxjM1ZzZENBOUlGSmxabXhsWTNRdWFHRnpUM2R1VFdWMFlXUmhkR0VvWENKamRYTjBiMjA2WVc1dWIzUmhkR2x2Ymx3aUxDQkZlR0Z0Y0d4bEtUdGNiaUFnSUNBZ0lDQWdJQ3BjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJQzh2SUhCeWIzQmxjblI1SUNodmJpQmpiMjV6ZEhKMVkzUnZjaWxjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJSEpsYzNWc2RDQTlJRkpsWm14bFkzUXVhR0Z6VDNkdVRXVjBZV1JoZEdFb1hDSmpkWE4wYjIwNllXNXViM1JoZEdsdmJsd2lMQ0JGZUdGdGNHeGxMQ0JjSW5OMFlYUnBZMUJ5YjNCbGNuUjVYQ0lwTzF4dUlDQWdJQ0FnSUNBZ0tseHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ0x5OGdjSEp2Y0dWeWRIa2dLRzl1SUhCeWIzUnZkSGx3WlNsY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUhKbGMzVnNkQ0E5SUZKbFpteGxZM1F1YUdGelQzZHVUV1YwWVdSaGRHRW9YQ0pqZFhOMGIyMDZZVzV1YjNSaGRHbHZibHdpTENCRmVHRnRjR3hsTG5CeWIzUnZkSGx3WlN3Z1hDSndjbTl3WlhKMGVWd2lLVHRjYmlBZ0lDQWdJQ0FnSUNwY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUM4dklHMWxkR2h2WkNBb2IyNGdZMjl1YzNSeWRXTjBiM0lwWEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0J5WlhOMWJIUWdQU0JTWldac1pXTjBMbWhoYzA5M2JrMWxkR0ZrWVhSaEtGd2lZM1Z6ZEc5dE9tRnVibTkwWVhScGIyNWNJaXdnUlhoaGJYQnNaU3dnWENKemRHRjBhV05OWlhSb2IyUmNJaWs3WEc0Z0lDQWdJQ0FnSUNBcVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBdkx5QnRaWFJvYjJRZ0tHOXVJSEJ5YjNSdmRIbHdaU2xjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJSEpsYzNWc2RDQTlJRkpsWm14bFkzUXVhR0Z6VDNkdVRXVjBZV1JoZEdFb1hDSmpkWE4wYjIwNllXNXViM1JoZEdsdmJsd2lMQ0JGZUdGdGNHeGxMbkJ5YjNSdmRIbHdaU3dnWENKdFpYUm9iMlJjSWlrN1hHNGdJQ0FnSUNBZ0lDQXFYRzRnSUNBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnSUNCbWRXNWpkR2x2YmlCb1lYTlBkMjVOWlhSaFpHRjBZU2h0WlhSaFpHRjBZVXRsZVN3Z2RHRnlaMlYwTENCd2NtOXdaWEowZVV0bGVTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ0ZKYzA5aWFtVmpkQ2gwWVhKblpYUXBLVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJvY205M0lHNWxkeUJVZVhCbFJYSnliM0lvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNnaFNYTlZibVJsWm1sdVpXUW9jSEp2Y0dWeWRIbExaWGtwS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhCeWIzQmxjblI1UzJWNUlEMGdWRzlRY205d1pYSjBlVXRsZVNod2NtOXdaWEowZVV0bGVTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnVDNKa2FXNWhjbmxJWVhOUGQyNU5aWFJoWkdGMFlTaHRaWFJoWkdGMFlVdGxlU3dnZEdGeVoyVjBMQ0J3Y205d1pYSjBlVXRsZVNrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdaWGh3YjNKMFpYSW9YQ0pvWVhOUGQyNU5aWFJoWkdGMFlWd2lMQ0JvWVhOUGQyNU5aWFJoWkdGMFlTazdYRzRnSUNBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNBZ0tpQkhaWFJ6SUhSb1pTQnRaWFJoWkdGMFlTQjJZV3gxWlNCbWIzSWdkR2hsSUhCeWIzWnBaR1ZrSUcxbGRHRmtZWFJoSUd0bGVTQnZiaUIwYUdVZ2RHRnlaMlYwSUc5aWFtVmpkQ0J2Y2lCcGRITWdjSEp2ZEc5MGVYQmxJR05vWVdsdUxseHVJQ0FnSUNBZ0lDQWdLaUJBY0dGeVlXMGdiV1YwWVdSaGRHRkxaWGtnUVNCclpYa2dkWE5sWkNCMGJ5QnpkRzl5WlNCaGJtUWdjbVYwY21sbGRtVWdiV1YwWVdSaGRHRXVYRzRnSUNBZ0lDQWdJQ0FxSUVCd1lYSmhiU0IwWVhKblpYUWdWR2hsSUhSaGNtZGxkQ0J2WW1wbFkzUWdiMjRnZDJocFkyZ2dkR2hsSUcxbGRHRmtZWFJoSUdseklHUmxabWx1WldRdVhHNGdJQ0FnSUNBZ0lDQXFJRUJ3WVhKaGJTQndjbTl3WlhKMGVVdGxlU0FvVDNCMGFXOXVZV3dwSUZSb1pTQndjbTl3WlhKMGVTQnJaWGtnWm05eUlIUm9aU0IwWVhKblpYUXVYRzRnSUNBZ0lDQWdJQ0FxSUVCeVpYUjFjbTV6SUZSb1pTQnRaWFJoWkdGMFlTQjJZV3gxWlNCbWIzSWdkR2hsSUcxbGRHRmtZWFJoSUd0bGVTQnBaaUJtYjNWdVpEc2diM1JvWlhKM2FYTmxMQ0JnZFc1a1pXWnBibVZrWUM1Y2JpQWdJQ0FnSUNBZ0lDb2dRR1Y0WVcxd2JHVmNiaUFnSUNBZ0lDQWdJQ3BjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJR05zWVhOeklFVjRZVzF3YkdVZ2UxeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ0lDQWdJQzh2SUhCeWIzQmxjblI1SUdSbFkyeGhjbUYwYVc5dWN5QmhjbVVnYm05MElIQmhjblFnYjJZZ1JWTTJMQ0IwYUc5MVoyZ2dkR2hsZVNCaGNtVWdkbUZzYVdRZ2FXNGdWSGx3WlZOamNtbHdkRHBjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJQ0FnSUNBdkx5QnpkR0YwYVdNZ2MzUmhkR2xqVUhKdmNHVnlkSGs3WEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0FnSUNBZ0x5OGdjSEp2Y0dWeWRIazdYRzRnSUNBZ0lDQWdJQ0FxWEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0FnSUNBZ1kyOXVjM1J5ZFdOMGIzSW9jQ2tnZXlCOVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBZ0lDQWdjM1JoZEdsaklITjBZWFJwWTAxbGRHaHZaQ2h3S1NCN0lIMWNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lDQWdJQ0J0WlhSb2IyUW9jQ2tnZXlCOVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQXFYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQXZMeUJqYjI1emRISjFZM1J2Y2x4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnY21WemRXeDBJRDBnVW1WbWJHVmpkQzVuWlhSTlpYUmhaR0YwWVNoY0ltTjFjM1J2YlRwaGJtNXZkR0YwYVc5dVhDSXNJRVY0WVcxd2JHVXBPMXh1SUNBZ0lDQWdJQ0FnS2x4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnTHk4Z2NISnZjR1Z5ZEhrZ0tHOXVJR052Ym5OMGNuVmpkRzl5S1Z4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnY21WemRXeDBJRDBnVW1WbWJHVmpkQzVuWlhSTlpYUmhaR0YwWVNoY0ltTjFjM1J2YlRwaGJtNXZkR0YwYVc5dVhDSXNJRVY0WVcxd2JHVXNJRndpYzNSaGRHbGpVSEp2Y0dWeWRIbGNJaWs3WEc0Z0lDQWdJQ0FnSUNBcVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBdkx5QndjbTl3WlhKMGVTQW9iMjRnY0hKdmRHOTBlWEJsS1Z4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnY21WemRXeDBJRDBnVW1WbWJHVmpkQzVuWlhSTlpYUmhaR0YwWVNoY0ltTjFjM1J2YlRwaGJtNXZkR0YwYVc5dVhDSXNJRVY0WVcxd2JHVXVjSEp2ZEc5MGVYQmxMQ0JjSW5CeWIzQmxjblI1WENJcE8xeHVJQ0FnSUNBZ0lDQWdLbHh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdMeThnYldWMGFHOWtJQ2h2YmlCamIyNXpkSEoxWTNSdmNpbGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lISmxjM1ZzZENBOUlGSmxabXhsWTNRdVoyVjBUV1YwWVdSaGRHRW9YQ0pqZFhOMGIyMDZZVzV1YjNSaGRHbHZibHdpTENCRmVHRnRjR3hsTENCY0luTjBZWFJwWTAxbGRHaHZaRndpS1R0Y2JpQWdJQ0FnSUNBZ0lDcGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lDOHZJRzFsZEdodlpDQW9iMjRnY0hKdmRHOTBlWEJsS1Z4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnY21WemRXeDBJRDBnVW1WbWJHVmpkQzVuWlhSTlpYUmhaR0YwWVNoY0ltTjFjM1J2YlRwaGJtNXZkR0YwYVc5dVhDSXNJRVY0WVcxd2JHVXVjSEp2ZEc5MGVYQmxMQ0JjSW0xbGRHaHZaRndpS1R0Y2JpQWdJQ0FnSUNBZ0lDcGNiaUFnSUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0FnSUdaMWJtTjBhVzl1SUdkbGRFMWxkR0ZrWVhSaEtHMWxkR0ZrWVhSaFMyVjVMQ0IwWVhKblpYUXNJSEJ5YjNCbGNuUjVTMlY1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb0lVbHpUMkpxWldOMEtIUmhjbWRsZENrcFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHliM2NnYm1WM0lGUjVjR1ZGY25KdmNpZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ0ZKYzFWdVpHVm1hVzVsWkNod2NtOXdaWEowZVV0bGVTa3BYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjSEp2Y0dWeWRIbExaWGtnUFNCVWIxQnliM0JsY25SNVMyVjVLSEJ5YjNCbGNuUjVTMlY1S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQlBjbVJwYm1GeWVVZGxkRTFsZEdGa1lYUmhLRzFsZEdGa1lYUmhTMlY1TENCMFlYSm5aWFFzSUhCeWIzQmxjblI1UzJWNUtUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0JsZUhCdmNuUmxjaWhjSW1kbGRFMWxkR0ZrWVhSaFhDSXNJR2RsZEUxbGRHRmtZWFJoS1R0Y2JpQWdJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdJQ0FxSUVkbGRITWdkR2hsSUcxbGRHRmtZWFJoSUhaaGJIVmxJR1p2Y2lCMGFHVWdjSEp2ZG1sa1pXUWdiV1YwWVdSaGRHRWdhMlY1SUc5dUlIUm9aU0IwWVhKblpYUWdiMkpxWldOMExseHVJQ0FnSUNBZ0lDQWdLaUJBY0dGeVlXMGdiV1YwWVdSaGRHRkxaWGtnUVNCclpYa2dkWE5sWkNCMGJ5QnpkRzl5WlNCaGJtUWdjbVYwY21sbGRtVWdiV1YwWVdSaGRHRXVYRzRnSUNBZ0lDQWdJQ0FxSUVCd1lYSmhiU0IwWVhKblpYUWdWR2hsSUhSaGNtZGxkQ0J2WW1wbFkzUWdiMjRnZDJocFkyZ2dkR2hsSUcxbGRHRmtZWFJoSUdseklHUmxabWx1WldRdVhHNGdJQ0FnSUNBZ0lDQXFJRUJ3WVhKaGJTQndjbTl3WlhKMGVVdGxlU0FvVDNCMGFXOXVZV3dwSUZSb1pTQndjbTl3WlhKMGVTQnJaWGtnWm05eUlIUm9aU0IwWVhKblpYUXVYRzRnSUNBZ0lDQWdJQ0FxSUVCeVpYUjFjbTV6SUZSb1pTQnRaWFJoWkdGMFlTQjJZV3gxWlNCbWIzSWdkR2hsSUcxbGRHRmtZWFJoSUd0bGVTQnBaaUJtYjNWdVpEc2diM1JvWlhKM2FYTmxMQ0JnZFc1a1pXWnBibVZrWUM1Y2JpQWdJQ0FnSUNBZ0lDb2dRR1Y0WVcxd2JHVmNiaUFnSUNBZ0lDQWdJQ3BjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJR05zWVhOeklFVjRZVzF3YkdVZ2UxeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ0lDQWdJQzh2SUhCeWIzQmxjblI1SUdSbFkyeGhjbUYwYVc5dWN5QmhjbVVnYm05MElIQmhjblFnYjJZZ1JWTTJMQ0IwYUc5MVoyZ2dkR2hsZVNCaGNtVWdkbUZzYVdRZ2FXNGdWSGx3WlZOamNtbHdkRHBjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJQ0FnSUNBdkx5QnpkR0YwYVdNZ2MzUmhkR2xqVUhKdmNHVnlkSGs3WEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0FnSUNBZ0x5OGdjSEp2Y0dWeWRIazdYRzRnSUNBZ0lDQWdJQ0FxWEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0FnSUNBZ1kyOXVjM1J5ZFdOMGIzSW9jQ2tnZXlCOVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBZ0lDQWdjM1JoZEdsaklITjBZWFJwWTAxbGRHaHZaQ2h3S1NCN0lIMWNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lDQWdJQ0J0WlhSb2IyUW9jQ2tnZXlCOVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQXFYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQXZMeUJqYjI1emRISjFZM1J2Y2x4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnY21WemRXeDBJRDBnVW1WbWJHVmpkQzVuWlhSUGQyNU5aWFJoWkdGMFlTaGNJbU4xYzNSdmJUcGhibTV2ZEdGMGFXOXVYQ0lzSUVWNFlXMXdiR1VwTzF4dUlDQWdJQ0FnSUNBZ0tseHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ0x5OGdjSEp2Y0dWeWRIa2dLRzl1SUdOdmJuTjBjblZqZEc5eUtWeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ2NtVnpkV3gwSUQwZ1VtVm1iR1ZqZEM1blpYUlBkMjVOWlhSaFpHRjBZU2hjSW1OMWMzUnZiVHBoYm01dmRHRjBhVzl1WENJc0lFVjRZVzF3YkdVc0lGd2ljM1JoZEdsalVISnZjR1Z5ZEhsY0lpazdYRzRnSUNBZ0lDQWdJQ0FxWEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0F2THlCd2NtOXdaWEowZVNBb2IyNGdjSEp2ZEc5MGVYQmxLVnh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdjbVZ6ZFd4MElEMGdVbVZtYkdWamRDNW5aWFJQZDI1TlpYUmhaR0YwWVNoY0ltTjFjM1J2YlRwaGJtNXZkR0YwYVc5dVhDSXNJRVY0WVcxd2JHVXVjSEp2ZEc5MGVYQmxMQ0JjSW5CeWIzQmxjblI1WENJcE8xeHVJQ0FnSUNBZ0lDQWdLbHh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdMeThnYldWMGFHOWtJQ2h2YmlCamIyNXpkSEoxWTNSdmNpbGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lISmxjM1ZzZENBOUlGSmxabXhsWTNRdVoyVjBUM2R1VFdWMFlXUmhkR0VvWENKamRYTjBiMjA2WVc1dWIzUmhkR2x2Ymx3aUxDQkZlR0Z0Y0d4bExDQmNJbk4wWVhScFkwMWxkR2h2WkZ3aUtUdGNiaUFnSUNBZ0lDQWdJQ3BjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJQzh2SUcxbGRHaHZaQ0FvYjI0Z2NISnZkRzkwZVhCbEtWeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ2NtVnpkV3gwSUQwZ1VtVm1iR1ZqZEM1blpYUlBkMjVOWlhSaFpHRjBZU2hjSW1OMWMzUnZiVHBoYm01dmRHRjBhVzl1WENJc0lFVjRZVzF3YkdVdWNISnZkRzkwZVhCbExDQmNJbTFsZEdodlpGd2lLVHRjYmlBZ0lDQWdJQ0FnSUNwY2JpQWdJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQWdJR1oxYm1OMGFXOXVJR2RsZEU5M2JrMWxkR0ZrWVhSaEtHMWxkR0ZrWVhSaFMyVjVMQ0IwWVhKblpYUXNJSEJ5YjNCbGNuUjVTMlY1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb0lVbHpUMkpxWldOMEtIUmhjbWRsZENrcFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHliM2NnYm1WM0lGUjVjR1ZGY25KdmNpZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ0ZKYzFWdVpHVm1hVzVsWkNod2NtOXdaWEowZVV0bGVTa3BYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjSEp2Y0dWeWRIbExaWGtnUFNCVWIxQnliM0JsY25SNVMyVjVLSEJ5YjNCbGNuUjVTMlY1S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQlBjbVJwYm1GeWVVZGxkRTkzYmsxbGRHRmtZWFJoS0cxbGRHRmtZWFJoUzJWNUxDQjBZWEpuWlhRc0lIQnliM0JsY25SNVMyVjVLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCbGVIQnZjblJsY2loY0ltZGxkRTkzYmsxbGRHRmtZWFJoWENJc0lHZGxkRTkzYmsxbGRHRmtZWFJoS1R0Y2JpQWdJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdJQ0FxSUVkbGRITWdkR2hsSUcxbGRHRmtZWFJoSUd0bGVYTWdaR1ZtYVc1bFpDQnZiaUIwYUdVZ2RHRnlaMlYwSUc5aWFtVmpkQ0J2Y2lCcGRITWdjSEp2ZEc5MGVYQmxJR05vWVdsdUxseHVJQ0FnSUNBZ0lDQWdLaUJBY0dGeVlXMGdkR0Z5WjJWMElGUm9aU0IwWVhKblpYUWdiMkpxWldOMElHOXVJSGRvYVdOb0lIUm9aU0J0WlhSaFpHRjBZU0JwY3lCa1pXWnBibVZrTGx4dUlDQWdJQ0FnSUNBZ0tpQkFjR0Z5WVcwZ2NISnZjR1Z5ZEhsTFpYa2dLRTl3ZEdsdmJtRnNLU0JVYUdVZ2NISnZjR1Z5ZEhrZ2EyVjVJR1p2Y2lCMGFHVWdkR0Z5WjJWMExseHVJQ0FnSUNBZ0lDQWdLaUJBY21WMGRYSnVjeUJCYmlCaGNuSmhlU0J2WmlCMWJtbHhkV1VnYldWMFlXUmhkR0VnYTJWNWN5NWNiaUFnSUNBZ0lDQWdJQ29nUUdWNFlXMXdiR1ZjYmlBZ0lDQWdJQ0FnSUNwY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUdOc1lYTnpJRVY0WVcxd2JHVWdlMXh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdJQ0FnSUM4dklIQnliM0JsY25SNUlHUmxZMnhoY21GMGFXOXVjeUJoY21VZ2JtOTBJSEJoY25RZ2IyWWdSVk0yTENCMGFHOTFaMmdnZEdobGVTQmhjbVVnZG1Gc2FXUWdhVzRnVkhsd1pWTmpjbWx3ZERwY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUNBZ0lDQXZMeUJ6ZEdGMGFXTWdjM1JoZEdsalVISnZjR1Z5ZEhrN1hHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBZ0lDQWdMeThnY0hKdmNHVnlkSGs3WEc0Z0lDQWdJQ0FnSUNBcVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBZ0lDQWdZMjl1YzNSeWRXTjBiM0lvY0NrZ2V5QjlYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQWdJQ0FnYzNSaGRHbGpJSE4wWVhScFkwMWxkR2h2WkNod0tTQjdJSDFjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJQ0FnSUNCdFpYUm9iMlFvY0NrZ2V5QjlYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FxWEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0F2THlCamIyNXpkSEoxWTNSdmNseHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ2NtVnpkV3gwSUQwZ1VtVm1iR1ZqZEM1blpYUk5aWFJoWkdGMFlVdGxlWE1vUlhoaGJYQnNaU2s3WEc0Z0lDQWdJQ0FnSUNBcVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBdkx5QndjbTl3WlhKMGVTQW9iMjRnWTI5dWMzUnlkV04wYjNJcFhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNCeVpYTjFiSFFnUFNCU1pXWnNaV04wTG1kbGRFMWxkR0ZrWVhSaFMyVjVjeWhGZUdGdGNHeGxMQ0JjSW5OMFlYUnBZMUJ5YjNCbGNuUjVYQ0lwTzF4dUlDQWdJQ0FnSUNBZ0tseHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ0x5OGdjSEp2Y0dWeWRIa2dLRzl1SUhCeWIzUnZkSGx3WlNsY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUhKbGMzVnNkQ0E5SUZKbFpteGxZM1F1WjJWMFRXVjBZV1JoZEdGTFpYbHpLRVY0WVcxd2JHVXVjSEp2ZEc5MGVYQmxMQ0JjSW5CeWIzQmxjblI1WENJcE8xeHVJQ0FnSUNBZ0lDQWdLbHh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdMeThnYldWMGFHOWtJQ2h2YmlCamIyNXpkSEoxWTNSdmNpbGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lISmxjM1ZzZENBOUlGSmxabXhsWTNRdVoyVjBUV1YwWVdSaGRHRkxaWGx6S0VWNFlXMXdiR1VzSUZ3aWMzUmhkR2xqVFdWMGFHOWtYQ0lwTzF4dUlDQWdJQ0FnSUNBZ0tseHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ0x5OGdiV1YwYUc5a0lDaHZiaUJ3Y205MGIzUjVjR1VwWEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0J5WlhOMWJIUWdQU0JTWldac1pXTjBMbWRsZEUxbGRHRmtZWFJoUzJWNWN5aEZlR0Z0Y0d4bExuQnliM1J2ZEhsd1pTd2dYQ0p0WlhSb2IyUmNJaWs3WEc0Z0lDQWdJQ0FnSUNBcVhHNGdJQ0FnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdJQ0JtZFc1amRHbHZiaUJuWlhSTlpYUmhaR0YwWVV0bGVYTW9kR0Z5WjJWMExDQndjbTl3WlhKMGVVdGxlU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NGSmMwOWlhbVZqZENoMFlYSm5aWFFwS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDZ2hTWE5WYm1SbFptbHVaV1FvY0hKdmNHVnlkSGxMWlhrcEtWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIQnliM0JsY25SNVMyVjVJRDBnVkc5UWNtOXdaWEowZVV0bGVTaHdjbTl3WlhKMGVVdGxlU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1QzSmthVzVoY25sTlpYUmhaR0YwWVV0bGVYTW9kR0Z5WjJWMExDQndjbTl3WlhKMGVVdGxlU2s3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ1pYaHdiM0owWlhJb1hDSm5aWFJOWlhSaFpHRjBZVXRsZVhOY0lpd2daMlYwVFdWMFlXUmhkR0ZMWlhsektUdGNiaUFnSUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnSUNBcUlFZGxkSE1nZEdobElIVnVhWEYxWlNCdFpYUmhaR0YwWVNCclpYbHpJR1JsWm1sdVpXUWdiMjRnZEdobElIUmhjbWRsZENCdlltcGxZM1F1WEc0Z0lDQWdJQ0FnSUNBcUlFQndZWEpoYlNCMFlYSm5aWFFnVkdobElIUmhjbWRsZENCdlltcGxZM1FnYjI0Z2QyaHBZMmdnZEdobElHMWxkR0ZrWVhSaElHbHpJR1JsWm1sdVpXUXVYRzRnSUNBZ0lDQWdJQ0FxSUVCd1lYSmhiU0J3Y205d1pYSjBlVXRsZVNBb1QzQjBhVzl1WVd3cElGUm9aU0J3Y205d1pYSjBlU0JyWlhrZ1ptOXlJSFJvWlNCMFlYSm5aWFF1WEc0Z0lDQWdJQ0FnSUNBcUlFQnlaWFIxY201eklFRnVJR0Z5Y21GNUlHOW1JSFZ1YVhGMVpTQnRaWFJoWkdGMFlTQnJaWGx6TGx4dUlDQWdJQ0FnSUNBZ0tpQkFaWGhoYlhCc1pWeHVJQ0FnSUNBZ0lDQWdLbHh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdZMnhoYzNNZ1JYaGhiWEJzWlNCN1hHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBZ0lDQWdMeThnY0hKdmNHVnlkSGtnWkdWamJHRnlZWFJwYjI1eklHRnlaU0J1YjNRZ2NHRnlkQ0J2WmlCRlV6WXNJSFJvYjNWbmFDQjBhR1Y1SUdGeVpTQjJZV3hwWkNCcGJpQlVlWEJsVTJOeWFYQjBPbHh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdJQ0FnSUM4dklITjBZWFJwWXlCemRHRjBhV05RY205d1pYSjBlVHRjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJQ0FnSUNBdkx5QndjbTl3WlhKMGVUdGNiaUFnSUNBZ0lDQWdJQ3BjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJQ0FnSUNCamIyNXpkSEoxWTNSdmNpaHdLU0I3SUgxY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUNBZ0lDQnpkR0YwYVdNZ2MzUmhkR2xqVFdWMGFHOWtLSEFwSUhzZ2ZWeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ0lDQWdJRzFsZEdodlpDaHdLU0I3SUgxY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDcGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lDOHZJR052Ym5OMGNuVmpkRzl5WEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0J5WlhOMWJIUWdQU0JTWldac1pXTjBMbWRsZEU5M2JrMWxkR0ZrWVhSaFMyVjVjeWhGZUdGdGNHeGxLVHRjYmlBZ0lDQWdJQ0FnSUNwY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUM4dklIQnliM0JsY25SNUlDaHZiaUJqYjI1emRISjFZM1J2Y2lsY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUhKbGMzVnNkQ0E5SUZKbFpteGxZM1F1WjJWMFQzZHVUV1YwWVdSaGRHRkxaWGx6S0VWNFlXMXdiR1VzSUZ3aWMzUmhkR2xqVUhKdmNHVnlkSGxjSWlrN1hHNGdJQ0FnSUNBZ0lDQXFYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQXZMeUJ3Y205d1pYSjBlU0FvYjI0Z2NISnZkRzkwZVhCbEtWeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ2NtVnpkV3gwSUQwZ1VtVm1iR1ZqZEM1blpYUlBkMjVOWlhSaFpHRjBZVXRsZVhNb1JYaGhiWEJzWlM1d2NtOTBiM1I1Y0dVc0lGd2ljSEp2Y0dWeWRIbGNJaWs3WEc0Z0lDQWdJQ0FnSUNBcVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBdkx5QnRaWFJvYjJRZ0tHOXVJR052Ym5OMGNuVmpkRzl5S1Z4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnY21WemRXeDBJRDBnVW1WbWJHVmpkQzVuWlhSUGQyNU5aWFJoWkdGMFlVdGxlWE1vUlhoaGJYQnNaU3dnWENKemRHRjBhV05OWlhSb2IyUmNJaWs3WEc0Z0lDQWdJQ0FnSUNBcVhHNGdJQ0FnSUNBZ0lDQXFJQ0FnSUNBdkx5QnRaWFJvYjJRZ0tHOXVJSEJ5YjNSdmRIbHdaU2xjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJSEpsYzNWc2RDQTlJRkpsWm14bFkzUXVaMlYwVDNkdVRXVjBZV1JoZEdGTFpYbHpLRVY0WVcxd2JHVXVjSEp2ZEc5MGVYQmxMQ0JjSW0xbGRHaHZaRndpS1R0Y2JpQWdJQ0FnSUNBZ0lDcGNiaUFnSUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0FnSUdaMWJtTjBhVzl1SUdkbGRFOTNiazFsZEdGa1lYUmhTMlY1Y3loMFlYSm5aWFFzSUhCeWIzQmxjblI1UzJWNUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9JVWx6VDJKcVpXTjBLSFJoY21kbGRDa3BYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRlI1Y0dWRmNuSnZjaWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NGSmMxVnVaR1ZtYVc1bFpDaHdjbTl3WlhKMGVVdGxlU2twWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY0hKdmNHVnlkSGxMWlhrZ1BTQlViMUJ5YjNCbGNuUjVTMlY1S0hCeWIzQmxjblI1UzJWNUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJQY21ScGJtRnllVTkzYmsxbGRHRmtZWFJoUzJWNWN5aDBZWEpuWlhRc0lIQnliM0JsY25SNVMyVjVLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCbGVIQnZjblJsY2loY0ltZGxkRTkzYmsxbGRHRmtZWFJoUzJWNWMxd2lMQ0JuWlhSUGQyNU5aWFJoWkdGMFlVdGxlWE1wTzF4dUlDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ29nUkdWc1pYUmxjeUIwYUdVZ2JXVjBZV1JoZEdFZ1pXNTBjbmtnWm5KdmJTQjBhR1VnZEdGeVoyVjBJRzlpYW1WamRDQjNhWFJvSUhSb1pTQndjbTkyYVdSbFpDQnJaWGt1WEc0Z0lDQWdJQ0FnSUNBcUlFQndZWEpoYlNCdFpYUmhaR0YwWVV0bGVTQkJJR3RsZVNCMWMyVmtJSFJ2SUhOMGIzSmxJR0Z1WkNCeVpYUnlhV1YyWlNCdFpYUmhaR0YwWVM1Y2JpQWdJQ0FnSUNBZ0lDb2dRSEJoY21GdElIUmhjbWRsZENCVWFHVWdkR0Z5WjJWMElHOWlhbVZqZENCdmJpQjNhR2xqYUNCMGFHVWdiV1YwWVdSaGRHRWdhWE1nWkdWbWFXNWxaQzVjYmlBZ0lDQWdJQ0FnSUNvZ1FIQmhjbUZ0SUhCeWIzQmxjblI1UzJWNUlDaFBjSFJwYjI1aGJDa2dWR2hsSUhCeWIzQmxjblI1SUd0bGVTQm1iM0lnZEdobElIUmhjbWRsZEM1Y2JpQWdJQ0FnSUNBZ0lDb2dRSEpsZEhWeWJuTWdZSFJ5ZFdWZ0lHbG1JSFJvWlNCdFpYUmhaR0YwWVNCbGJuUnllU0IzWVhNZ1ptOTFibVFnWVc1a0lHUmxiR1YwWldRN0lHOTBhR1Z5ZDJselpTd2dabUZzYzJVdVhHNGdJQ0FnSUNBZ0lDQXFJRUJsZUdGdGNHeGxYRzRnSUNBZ0lDQWdJQ0FxWEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0JqYkdGemN5QkZlR0Z0Y0d4bElIdGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lDQWdJQ0F2THlCd2NtOXdaWEowZVNCa1pXTnNZWEpoZEdsdmJuTWdZWEpsSUc1dmRDQndZWEowSUc5bUlFVlROaXdnZEdodmRXZG9JSFJvWlhrZ1lYSmxJSFpoYkdsa0lHbHVJRlI1Y0dWVFkzSnBjSFE2WEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0FnSUNBZ0x5OGdjM1JoZEdsaklITjBZWFJwWTFCeWIzQmxjblI1TzF4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnSUNBZ0lDOHZJSEJ5YjNCbGNuUjVPMXh1SUNBZ0lDQWdJQ0FnS2x4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnSUNBZ0lHTnZibk4wY25WamRHOXlLSEFwSUhzZ2ZWeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ0lDQWdJSE4wWVhScFl5QnpkR0YwYVdOTlpYUm9iMlFvY0NrZ2V5QjlYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQWdJQ0FnYldWMGFHOWtLSEFwSUhzZ2ZWeHVJQ0FnSUNBZ0lDQWdLaUFnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdLbHh1SUNBZ0lDQWdJQ0FnS2lBZ0lDQWdMeThnWTI5dWMzUnlkV04wYjNKY2JpQWdJQ0FnSUNBZ0lDb2dJQ0FnSUhKbGMzVnNkQ0E5SUZKbFpteGxZM1F1WkdWc1pYUmxUV1YwWVdSaGRHRW9YQ0pqZFhOMGIyMDZZVzV1YjNSaGRHbHZibHdpTENCRmVHRnRjR3hsS1R0Y2JpQWdJQ0FnSUNBZ0lDcGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lDOHZJSEJ5YjNCbGNuUjVJQ2h2YmlCamIyNXpkSEoxWTNSdmNpbGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lISmxjM1ZzZENBOUlGSmxabXhsWTNRdVpHVnNaWFJsVFdWMFlXUmhkR0VvWENKamRYTjBiMjA2WVc1dWIzUmhkR2x2Ymx3aUxDQkZlR0Z0Y0d4bExDQmNJbk4wWVhScFkxQnliM0JsY25SNVhDSXBPMXh1SUNBZ0lDQWdJQ0FnS2x4dUlDQWdJQ0FnSUNBZ0tpQWdJQ0FnTHk4Z2NISnZjR1Z5ZEhrZ0tHOXVJSEJ5YjNSdmRIbHdaU2xjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJSEpsYzNWc2RDQTlJRkpsWm14bFkzUXVaR1ZzWlhSbFRXVjBZV1JoZEdFb1hDSmpkWE4wYjIwNllXNXViM1JoZEdsdmJsd2lMQ0JGZUdGdGNHeGxMbkJ5YjNSdmRIbHdaU3dnWENKd2NtOXdaWEowZVZ3aUtUdGNiaUFnSUNBZ0lDQWdJQ3BjYmlBZ0lDQWdJQ0FnSUNvZ0lDQWdJQzh2SUcxbGRHaHZaQ0FvYjI0Z1kyOXVjM1J5ZFdOMGIzSXBYRzRnSUNBZ0lDQWdJQ0FxSUNBZ0lDQnlaWE4xYkhRZ1BTQlNaV1pzWldOMExtUmxiR1YwWlUxbGRHRmtZWFJoS0Z3aVkzVnpkRzl0T21GdWJtOTBZWFJwYjI1Y0lpd2dSWGhoYlhCc1pTd2dYQ0p6ZEdGMGFXTk5aWFJvYjJSY0lpazdYRzRnSUNBZ0lDQWdJQ0FxWEc0Z0lDQWdJQ0FnSUNBcUlDQWdJQ0F2THlCdFpYUm9iMlFnS0c5dUlIQnliM1J2ZEhsd1pTbGNiaUFnSUNBZ0lDQWdJQ29nSUNBZ0lISmxjM1ZzZENBOUlGSmxabXhsWTNRdVpHVnNaWFJsVFdWMFlXUmhkR0VvWENKamRYTjBiMjA2WVc1dWIzUmhkR2x2Ymx3aUxDQkZlR0Z0Y0d4bExuQnliM1J2ZEhsd1pTd2dYQ0p0WlhSb2IyUmNJaWs3WEc0Z0lDQWdJQ0FnSUNBcVhHNGdJQ0FnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdJQ0JtZFc1amRHbHZiaUJrWld4bGRHVk5aWFJoWkdGMFlTaHRaWFJoWkdGMFlVdGxlU3dnZEdGeVoyVjBMQ0J3Y205d1pYSjBlVXRsZVNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tDRkpjMDlpYW1WamRDaDBZWEpuWlhRcEtWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2doU1hOVmJtUmxabWx1WldRb2NISnZjR1Z5ZEhsTFpYa3BLVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEJ5YjNCbGNuUjVTMlY1SUQwZ1ZHOVFjbTl3WlhKMGVVdGxlU2h3Y205d1pYSjBlVXRsZVNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2JXVjBZV1JoZEdGTllYQWdQU0JIWlhSUGNrTnlaV0YwWlUxbGRHRmtZWFJoVFdGd0tIUmhjbWRsZEN3Z2NISnZjR1Z5ZEhsTFpYa3NJQzhxUTNKbFlYUmxLaThnWm1Gc2MyVXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLRWx6Vlc1a1pXWnBibVZrS0cxbGRHRmtZWFJoVFdGd0tTbGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvSVcxbGRHRmtZWFJoVFdGd0xtUmxiR1YwWlNodFpYUmhaR0YwWVV0bGVTa3BYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHWmhiSE5sTzF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0cxbGRHRmtZWFJoVFdGd0xuTnBlbVVnUGlBd0tWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCMGNuVmxPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSFJoY21kbGRFMWxkR0ZrWVhSaElEMGdUV1YwWVdSaGRHRXVaMlYwS0hSaGNtZGxkQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBZWEpuWlhSTlpYUmhaR0YwWVM1a1pXeGxkR1VvY0hKdmNHVnlkSGxMWlhrcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tIUmhjbWRsZEUxbGRHRmtZWFJoTG5OcGVtVWdQaUF3S1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUIwY25WbE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnVFdWMFlXUmhkR0V1WkdWc1pYUmxLSFJoY21kbGRDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnZEhKMVpUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0JsZUhCdmNuUmxjaWhjSW1SbGJHVjBaVTFsZEdGa1lYUmhYQ0lzSUdSbGJHVjBaVTFsZEdGa1lYUmhLVHRjYmlBZ0lDQWdJQ0FnWm5WdVkzUnBiMjRnUkdWamIzSmhkR1ZEYjI1emRISjFZM1J2Y2loa1pXTnZjbUYwYjNKekxDQjBZWEpuWlhRcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdadmNpQW9kbUZ5SUdrZ1BTQmtaV052Y21GMGIzSnpMbXhsYm1kMGFDQXRJREU3SUdrZ1BqMGdNRHNnTFMxcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdSbFkyOXlZWFJ2Y2lBOUlHUmxZMjl5WVhSdmNuTmJhVjA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHUmxZMjl5WVhSbFpDQTlJR1JsWTI5eVlYUnZjaWgwWVhKblpYUXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNnaFNYTlZibVJsWm1sdVpXUW9aR1ZqYjNKaGRHVmtLU0FtSmlBaFNYTk9kV3hzS0dSbFkyOXlZWFJsWkNrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tDRkpjME52Ym5OMGNuVmpkRzl5S0dSbFkyOXlZWFJsWkNrcFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1ZIbHdaVVZ5Y205eUtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSaGNtZGxkQ0E5SUdSbFkyOXlZWFJsWkR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2RHRnlaMlYwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lHWjFibU4wYVc5dUlFUmxZMjl5WVhSbFVISnZjR1Z5ZEhrb1pHVmpiM0poZEc5eWN5d2dkR0Z5WjJWMExDQndjbTl3WlhKMGVVdGxlU3dnWkdWelkzSnBjSFJ2Y2lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWm05eUlDaDJZWElnYVNBOUlHUmxZMjl5WVhSdmNuTXViR1Z1WjNSb0lDMGdNVHNnYVNBK1BTQXdPeUF0TFdrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnWkdWamIzSmhkRzl5SUQwZ1pHVmpiM0poZEc5eWMxdHBYVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pHVmpiM0poZEdWa0lEMGdaR1ZqYjNKaGRHOXlLSFJoY21kbGRDd2djSEp2Y0dWeWRIbExaWGtzSUdSbGMyTnlhWEIwYjNJcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2doU1hOVmJtUmxabWx1WldRb1pHVmpiM0poZEdWa0tTQW1KaUFoU1hOT2RXeHNLR1JsWTI5eVlYUmxaQ2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NGSmMwOWlhbVZqZENoa1pXTnZjbUYwWldRcEtWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHliM2NnYm1WM0lGUjVjR1ZGY25KdmNpZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa1pYTmpjbWx3ZEc5eUlEMGdaR1ZqYjNKaGRHVmtPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJrWlhOamNtbHdkRzl5TzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lHWjFibU4wYVc5dUlFZGxkRTl5UTNKbFlYUmxUV1YwWVdSaGRHRk5ZWEFvVHl3Z1VDd2dRM0psWVhSbEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdkR0Z5WjJWMFRXVjBZV1JoZEdFZ1BTQk5aWFJoWkdGMFlTNW5aWFFvVHlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1NYTlZibVJsWm1sdVpXUW9kR0Z5WjJWMFRXVjBZV1JoZEdFcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NGRGNtVmhkR1VwWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCMWJtUmxabWx1WldRN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHRnlaMlYwVFdWMFlXUmhkR0VnUFNCdVpYY2dYMDFoY0NncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lFMWxkR0ZrWVhSaExuTmxkQ2hQTENCMFlYSm5aWFJOWlhSaFpHRjBZU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdiV1YwWVdSaGRHRk5ZWEFnUFNCMFlYSm5aWFJOWlhSaFpHRjBZUzVuWlhRb1VDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9TWE5WYm1SbFptbHVaV1FvYldWMFlXUmhkR0ZOWVhBcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NGRGNtVmhkR1VwWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCMWJtUmxabWx1WldRN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JXVjBZV1JoZEdGTllYQWdQU0J1WlhjZ1gwMWhjQ2dwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSaGNtZGxkRTFsZEdGa1lYUmhMbk5sZENoUUxDQnRaWFJoWkdGMFlVMWhjQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYldWMFlXUmhkR0ZOWVhBN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdMeThnTXk0eExqRXVNU0JQY21ScGJtRnllVWhoYzAxbGRHRmtZWFJoS0UxbGRHRmtZWFJoUzJWNUxDQlBMQ0JRS1Z4dUlDQWdJQ0FnSUNBdkx5Qm9kSFJ3Y3pvdkwzSmlkV05yZEc5dUxtZHBkR2gxWWk1cGJ5OXlaV1pzWldOMExXMWxkR0ZrWVhSaEx5TnZjbVJwYm1GeWVXaGhjMjFsZEdGa1lYUmhYRzRnSUNBZ0lDQWdJR1oxYm1OMGFXOXVJRTl5WkdsdVlYSjVTR0Z6VFdWMFlXUmhkR0VvVFdWMFlXUmhkR0ZMWlhrc0lFOHNJRkFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCb1lYTlBkMjRnUFNCUGNtUnBibUZ5ZVVoaGMwOTNiazFsZEdGa1lYUmhLRTFsZEdGa1lYUmhTMlY1TENCUExDQlFLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hvWVhOUGQyNHBYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlIUnlkV1U3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnY0dGeVpXNTBJRDBnVDNKa2FXNWhjbmxIWlhSUWNtOTBiM1I1Y0dWUFppaFBLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2doU1hOT2RXeHNLSEJoY21WdWRDa3BYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlFOXlaR2x1WVhKNVNHRnpUV1YwWVdSaGRHRW9UV1YwWVdSaGRHRkxaWGtzSUhCaGNtVnVkQ3dnVUNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdabUZzYzJVN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdMeThnTXk0eExqSXVNU0JQY21ScGJtRnllVWhoYzA5M2JrMWxkR0ZrWVhSaEtFMWxkR0ZrWVhSaFMyVjVMQ0JQTENCUUtWeHVJQ0FnSUNBZ0lDQXZMeUJvZEhSd2N6b3ZMM0ppZFdOcmRHOXVMbWRwZEdoMVlpNXBieTl5Wldac1pXTjBMVzFsZEdGa1lYUmhMeU52Y21ScGJtRnllV2hoYzI5M2JtMWxkR0ZrWVhSaFhHNGdJQ0FnSUNBZ0lHWjFibU4wYVc5dUlFOXlaR2x1WVhKNVNHRnpUM2R1VFdWMFlXUmhkR0VvVFdWMFlXUmhkR0ZMWlhrc0lFOHNJRkFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCdFpYUmhaR0YwWVUxaGNDQTlJRWRsZEU5eVEzSmxZWFJsVFdWMFlXUmhkR0ZOWVhBb1R5d2dVQ3dnTHlwRGNtVmhkR1VxTHlCbVlXeHpaU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvU1hOVmJtUmxabWx1WldRb2JXVjBZV1JoZEdGTllYQXBLVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQlViMEp2YjJ4bFlXNG9iV1YwWVdSaGRHRk5ZWEF1YUdGektFMWxkR0ZrWVhSaFMyVjVLU2s3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0x5OGdNeTR4TGpNdU1TQlBjbVJwYm1GeWVVZGxkRTFsZEdGa1lYUmhLRTFsZEdGa1lYUmhTMlY1TENCUExDQlFLVnh1SUNBZ0lDQWdJQ0F2THlCb2RIUndjem92TDNKaWRXTnJkRzl1TG1kcGRHaDFZaTVwYnk5eVpXWnNaV04wTFcxbGRHRmtZWFJoTHlOdmNtUnBibUZ5ZVdkbGRHMWxkR0ZrWVhSaFhHNGdJQ0FnSUNBZ0lHWjFibU4wYVc5dUlFOXlaR2x1WVhKNVIyVjBUV1YwWVdSaGRHRW9UV1YwWVdSaGRHRkxaWGtzSUU4c0lGQXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJvWVhOUGQyNGdQU0JQY21ScGJtRnllVWhoYzA5M2JrMWxkR0ZrWVhSaEtFMWxkR0ZrWVhSaFMyVjVMQ0JQTENCUUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaG9ZWE5QZDI0cFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUU5eVpHbHVZWEo1UjJWMFQzZHVUV1YwWVdSaGRHRW9UV1YwWVdSaGRHRkxaWGtzSUU4c0lGQXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSEJoY21WdWRDQTlJRTl5WkdsdVlYSjVSMlYwVUhKdmRHOTBlWEJsVDJZb1R5azdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9JVWx6VG5Wc2JDaHdZWEpsYm5RcEtWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCUGNtUnBibUZ5ZVVkbGRFMWxkR0ZrWVhSaEtFMWxkR0ZrWVhSaFMyVjVMQ0J3WVhKbGJuUXNJRkFwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlIVnVaR1ZtYVc1bFpEdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0F2THlBekxqRXVOQzR4SUU5eVpHbHVZWEo1UjJWMFQzZHVUV1YwWVdSaGRHRW9UV1YwWVdSaGRHRkxaWGtzSUU4c0lGQXBYRzRnSUNBZ0lDQWdJQzh2SUdoMGRIQnpPaTh2Y21KMVkydDBiMjR1WjJsMGFIVmlMbWx2TDNKbFpteGxZM1F0YldWMFlXUmhkR0V2STI5eVpHbHVZWEo1WjJWMGIzZHViV1YwWVdSaGRHRmNiaUFnSUNBZ0lDQWdablZ1WTNScGIyNGdUM0prYVc1aGNubEhaWFJQZDI1TlpYUmhaR0YwWVNoTlpYUmhaR0YwWVV0bGVTd2dUeXdnVUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHMWxkR0ZrWVhSaFRXRndJRDBnUjJWMFQzSkRjbVZoZEdWTlpYUmhaR0YwWVUxaGNDaFBMQ0JRTENBdktrTnlaV0YwWlNvdklHWmhiSE5sS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoSmMxVnVaR1ZtYVc1bFpDaHRaWFJoWkdGMFlVMWhjQ2twWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSFZ1WkdWbWFXNWxaRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCdFpYUmhaR0YwWVUxaGNDNW5aWFFvVFdWMFlXUmhkR0ZMWlhrcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQzh2SURNdU1TNDFMakVnVDNKa2FXNWhjbmxFWldacGJtVlBkMjVOWlhSaFpHRjBZU2hOWlhSaFpHRjBZVXRsZVN3Z1RXVjBZV1JoZEdGV1lXeDFaU3dnVHl3Z1VDbGNiaUFnSUNBZ0lDQWdMeThnYUhSMGNITTZMeTl5WW5WamEzUnZiaTVuYVhSb2RXSXVhVzh2Y21WbWJHVmpkQzF0WlhSaFpHRjBZUzhqYjNKa2FXNWhjbmxrWldacGJtVnZkMjV0WlhSaFpHRjBZVnh1SUNBZ0lDQWdJQ0JtZFc1amRHbHZiaUJQY21ScGJtRnllVVJsWm1sdVpVOTNiazFsZEdGa1lYUmhLRTFsZEdGa1lYUmhTMlY1TENCTlpYUmhaR0YwWVZaaGJIVmxMQ0JQTENCUUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdiV1YwWVdSaGRHRk5ZWEFnUFNCSFpYUlBja055WldGMFpVMWxkR0ZrWVhSaFRXRndLRThzSUZBc0lDOHFRM0psWVhSbEtpOGdkSEoxWlNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J0WlhSaFpHRjBZVTFoY0M1elpYUW9UV1YwWVdSaGRHRkxaWGtzSUUxbGRHRmtZWFJoVm1Gc2RXVXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUM4dklETXVNUzQyTGpFZ1QzSmthVzVoY25sTlpYUmhaR0YwWVV0bGVYTW9UeXdnVUNsY2JpQWdJQ0FnSUNBZ0x5OGdhSFIwY0hNNkx5OXlZblZqYTNSdmJpNW5hWFJvZFdJdWFXOHZjbVZtYkdWamRDMXRaWFJoWkdGMFlTOGpiM0prYVc1aGNubHRaWFJoWkdGMFlXdGxlWE5jYmlBZ0lDQWdJQ0FnWm5WdVkzUnBiMjRnVDNKa2FXNWhjbmxOWlhSaFpHRjBZVXRsZVhNb1R5d2dVQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUc5M2JrdGxlWE1nUFNCUGNtUnBibUZ5ZVU5M2JrMWxkR0ZrWVhSaFMyVjVjeWhQTENCUUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQndZWEpsYm5RZ1BTQlBjbVJwYm1GeWVVZGxkRkJ5YjNSdmRIbHdaVTltS0U4cE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tIQmhjbVZ1ZENBOVBUMGdiblZzYkNsY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYjNkdVMyVjVjenRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ3WVhKbGJuUkxaWGx6SUQwZ1QzSmthVzVoY25sTlpYUmhaR0YwWVV0bGVYTW9jR0Z5Wlc1MExDQlFLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2h3WVhKbGJuUkxaWGx6TG14bGJtZDBhQ0E4UFNBd0tWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCdmQyNUxaWGx6TzF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0c5M2JrdGxlWE11YkdWdVozUm9JRHc5SURBcFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhCaGNtVnVkRXRsZVhNN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2MyVjBJRDBnYm1WM0lGOVRaWFFvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCclpYbHpJRDBnVzEwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JtYjNJZ0tIWmhjaUJmYVNBOUlEQXNJRzkzYmt0bGVYTmZNU0E5SUc5M2JrdGxlWE03SUY5cElEd2diM2R1UzJWNWMxOHhMbXhsYm1kMGFEc2dYMmtyS3lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJyWlhrZ1BTQnZkMjVMWlhselh6RmJYMmxkTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQm9ZWE5MWlhrZ1BTQnpaWFF1YUdGektHdGxlU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tDRm9ZWE5MWlhrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWMExtRmtaQ2hyWlhrcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JyWlhsekxuQjFjMmdvYTJWNUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0JtYjNJZ0tIWmhjaUJmWVNBOUlEQXNJSEJoY21WdWRFdGxlWE5mTVNBOUlIQmhjbVZ1ZEV0bGVYTTdJRjloSUR3Z2NHRnlaVzUwUzJWNWMxOHhMbXhsYm1kMGFEc2dYMkVyS3lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJyWlhrZ1BTQndZWEpsYm5STFpYbHpYekZiWDJGZE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJvWVhOTFpYa2dQU0J6WlhRdWFHRnpLR3RsZVNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ0ZvWVhOTFpYa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MyVjBMbUZrWkNoclpYa3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCclpYbHpMbkIxYzJnb2EyVjVLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYTJWNWN6dGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0F2THlBekxqRXVOeTR4SUU5eVpHbHVZWEo1VDNkdVRXVjBZV1JoZEdGTFpYbHpLRThzSUZBcFhHNGdJQ0FnSUNBZ0lDOHZJR2gwZEhCek9pOHZjbUoxWTJ0MGIyNHVaMmwwYUhWaUxtbHZMM0psWm14bFkzUXRiV1YwWVdSaGRHRXZJMjl5WkdsdVlYSjViM2R1YldWMFlXUmhkR0ZyWlhselhHNGdJQ0FnSUNBZ0lHWjFibU4wYVc5dUlFOXlaR2x1WVhKNVQzZHVUV1YwWVdSaGRHRkxaWGx6S0U4c0lGQXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJyWlhseklEMGdXMTA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnYldWMFlXUmhkR0ZOWVhBZ1BTQkhaWFJQY2tOeVpXRjBaVTFsZEdGa1lYUmhUV0Z3S0U4c0lGQXNJQzhxUTNKbFlYUmxLaThnWm1Gc2MyVXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLRWx6Vlc1a1pXWnBibVZrS0cxbGRHRmtZWFJoVFdGd0tTbGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2EyVjVjenRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJyWlhselQySnFJRDBnYldWMFlXUmhkR0ZOWVhBdWEyVjVjeWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdsMFpYSmhkRzl5SUQwZ1IyVjBTWFJsY21GMGIzSW9hMlY1YzA5aWFpazdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdheUE5SURBN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IzYUdsc1pTQW9kSEoxWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ1WlhoMElEMGdTWFJsY21GMGIzSlRkR1Z3S0dsMFpYSmhkRzl5S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9JVzVsZUhRcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYTJWNWN5NXNaVzVuZEdnZ1BTQnJPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYTJWNWN6dGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUc1bGVIUldZV3gxWlNBOUlFbDBaWEpoZEc5eVZtRnNkV1VvYm1WNGRDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhMlY1YzF0clhTQTlJRzVsZUhSV1lXeDFaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTJGMFkyZ2dLR1VwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUVsMFpYSmhkRzl5UTJ4dmMyVW9hWFJsY21GMGIzSXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1pwYm1Gc2JIa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2h5YjNjZ1pUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCckt5czdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdMeThnTmlCRlEwMUJVMk55YVhCMElFUmhkR0VnVkhsd01HVnpJR0Z1WkNCV1lXeDFaWE5jYmlBZ0lDQWdJQ0FnTHk4Z2FIUjBjSE02THk5MFl6TTVMbWRwZEdoMVlpNXBieTlsWTIxaE1qWXlMeU56WldNdFpXTnRZWE5qY21sd2RDMWtZWFJoTFhSNWNHVnpMV0Z1WkMxMllXeDFaWE5jYmlBZ0lDQWdJQ0FnWm5WdVkzUnBiMjRnVkhsd1pTaDRLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvZUNBOVBUMGdiblZzYkNsY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnTVNBdktpQk9kV3hzSUNvdk8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYzNkcGRHTm9JQ2gwZVhCbGIyWWdlQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOaGMyVWdYQ0oxYm1SbFptbHVaV1JjSWpvZ2NtVjBkWEp1SURBZ0x5b2dWVzVrWldacGJtVmtJQ292TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOaGMyVWdYQ0ppYjI5c1pXRnVYQ0k2SUhKbGRIVnliaUF5SUM4cUlFSnZiMnhsWVc0Z0tpODdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMkZ6WlNCY0luTjBjbWx1WjF3aU9pQnlaWFIxY200Z015QXZLaUJUZEhKcGJtY2dLaTg3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTJGelpTQmNJbk41YldKdmJGd2lPaUJ5WlhSMWNtNGdOQ0F2S2lCVGVXMWliMndnS2k4N1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyRnpaU0JjSW01MWJXSmxjbHdpT2lCeVpYUjFjbTRnTlNBdktpQk9kVzFpWlhJZ0tpODdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMkZ6WlNCY0ltOWlhbVZqZEZ3aU9pQnlaWFIxY200Z2VDQTlQVDBnYm5Wc2JDQS9JREVnTHlvZ1RuVnNiQ0FxTHlBNklEWWdMeW9nVDJKcVpXTjBJQ292TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdSbFptRjFiSFE2SUhKbGRIVnliaUEySUM4cUlFOWlhbVZqZENBcUx6dGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQXZMeUEyTGpFdU1TQlVhR1VnVlc1a1pXWnBibVZrSUZSNWNHVmNiaUFnSUNBZ0lDQWdMeThnYUhSMGNITTZMeTkwWXpNNUxtZHBkR2gxWWk1cGJ5OWxZMjFoTWpZeUx5TnpaV010WldOdFlYTmpjbWx3ZEMxc1lXNW5kV0ZuWlMxMGVYQmxjeTExYm1SbFptbHVaV1F0ZEhsd1pWeHVJQ0FnSUNBZ0lDQm1kVzVqZEdsdmJpQkpjMVZ1WkdWbWFXNWxaQ2g0S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdlQ0E5UFQwZ2RXNWtaV1pwYm1Wa08xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQzh2SURZdU1TNHlJRlJvWlNCT2RXeHNJRlI1Y0dWY2JpQWdJQ0FnSUNBZ0x5OGdhSFIwY0hNNkx5OTBZek01TG1kcGRHaDFZaTVwYnk5bFkyMWhNall5THlOelpXTXRaV050WVhOamNtbHdkQzFzWVc1bmRXRm5aUzEwZVhCbGN5MXVkV3hzTFhSNWNHVmNiaUFnSUNBZ0lDQWdablZ1WTNScGIyNGdTWE5PZFd4c0tIZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCNElEMDlQU0J1ZFd4c08xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQzh2SURZdU1TNDFJRlJvWlNCVGVXMWliMndnVkhsd1pWeHVJQ0FnSUNBZ0lDQXZMeUJvZEhSd2N6b3ZMM1JqTXprdVoybDBhSFZpTG1sdkwyVmpiV0V5TmpJdkkzTmxZeTFsWTIxaGMyTnlhWEIwTFd4aGJtZDFZV2RsTFhSNWNHVnpMWE41YldKdmJDMTBlWEJsWEc0Z0lDQWdJQ0FnSUdaMWJtTjBhVzl1SUVselUzbHRZbTlzS0hncElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUIwZVhCbGIyWWdlQ0E5UFQwZ1hDSnplVzFpYjJ4Y0lqdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0F2THlBMkxqRXVOeUJVYUdVZ1QySnFaV04wSUZSNWNHVmNiaUFnSUNBZ0lDQWdMeThnYUhSMGNITTZMeTkwWXpNNUxtZHBkR2gxWWk1cGJ5OWxZMjFoTWpZeUx5TnpaV010YjJKcVpXTjBMWFI1Y0dWY2JpQWdJQ0FnSUNBZ1puVnVZM1JwYjI0Z1NYTlBZbXBsWTNRb2VDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSNWNHVnZaaUI0SUQwOVBTQmNJbTlpYW1WamRGd2lJRDhnZUNBaFBUMGdiblZzYkNBNklIUjVjR1Z2WmlCNElEMDlQU0JjSW1aMWJtTjBhVzl1WENJN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdMeThnTnk0eElGUjVjR1VnUTI5dWRtVnljMmx2Ymx4dUlDQWdJQ0FnSUNBdkx5Qm9kSFJ3Y3pvdkwzUmpNemt1WjJsMGFIVmlMbWx2TDJWamJXRXlOakl2STNObFl5MTBlWEJsTFdOdmJuWmxjbk5wYjI1Y2JpQWdJQ0FnSUNBZ0x5OGdOeTR4TGpFZ1ZHOVFjbWx0YVhScGRtVW9hVzV3ZFhRZ1d5d2dVSEpsWm1WeWNtVmtWSGx3WlYwcFhHNGdJQ0FnSUNBZ0lDOHZJR2gwZEhCek9pOHZkR016T1M1bmFYUm9kV0l1YVc4dlpXTnRZVEkyTWk4amMyVmpMWFJ2Y0hKcGJXbDBhWFpsWEc0Z0lDQWdJQ0FnSUdaMWJtTjBhVzl1SUZSdlVISnBiV2wwYVhabEtHbHVjSFYwTENCUWNtVm1aWEp5WldSVWVYQmxLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnpkMmwwWTJnZ0tGUjVjR1VvYVc1d2RYUXBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTJGelpTQXdJQzhxSUZWdVpHVm1hVzVsWkNBcUx6b2djbVYwZFhKdUlHbHVjSFYwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOaGMyVWdNU0F2S2lCT2RXeHNJQ292T2lCeVpYUjFjbTRnYVc1d2RYUTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMkZ6WlNBeUlDOHFJRUp2YjJ4bFlXNGdLaTg2SUhKbGRIVnliaUJwYm5CMWREdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpZWE5sSURNZ0x5b2dVM1J5YVc1bklDb3ZPaUJ5WlhSMWNtNGdhVzV3ZFhRN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyRnpaU0EwSUM4cUlGTjViV0p2YkNBcUx6b2djbVYwZFhKdUlHbHVjSFYwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOaGMyVWdOU0F2S2lCT2RXMWlaWElnS2k4NklISmxkSFZ5YmlCcGJuQjFkRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQm9hVzUwSUQwZ1VISmxabVZ5Y21Wa1ZIbHdaU0E5UFQwZ015QXZLaUJUZEhKcGJtY2dLaThnUHlCY0luTjBjbWx1WjF3aUlEb2dVSEpsWm1WeWNtVmtWSGx3WlNBOVBUMGdOU0F2S2lCT2RXMWlaWElnS2k4Z1B5QmNJbTUxYldKbGNsd2lJRG9nWENKa1pXWmhkV3gwWENJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pYaHZkR2xqVkc5UWNtbHRJRDBnUjJWMFRXVjBhRzlrS0dsdWNIVjBMQ0IwYjFCeWFXMXBkR2wyWlZONWJXSnZiQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWlhodmRHbGpWRzlRY21sdElDRTlQU0IxYm1SbFptbHVaV1FwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjbVZ6ZFd4MElEMGdaWGh2ZEdsalZHOVFjbWx0TG1OaGJHd29hVzV3ZFhRc0lHaHBiblFwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaEpjMDlpYW1WamRDaHlaWE4xYkhRcEtWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUhKdmR5QnVaWGNnVkhsd1pVVnljbTl5S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhKbGMzVnNkRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJQY21ScGJtRnllVlJ2VUhKcGJXbDBhWFpsS0dsdWNIVjBMQ0JvYVc1MElEMDlQU0JjSW1SbFptRjFiSFJjSWlBL0lGd2liblZ0WW1WeVhDSWdPaUJvYVc1MEtUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0F2THlBM0xqRXVNUzR4SUU5eVpHbHVZWEo1Vkc5UWNtbHRhWFJwZG1Vb1R5d2dhR2x1ZENsY2JpQWdJQ0FnSUNBZ0x5OGdhSFIwY0hNNkx5OTBZek01TG1kcGRHaDFZaTVwYnk5bFkyMWhNall5THlOelpXTXRiM0prYVc1aGNubDBiM0J5YVcxcGRHbDJaVnh1SUNBZ0lDQWdJQ0JtZFc1amRHbHZiaUJQY21ScGJtRnllVlJ2VUhKcGJXbDBhWFpsS0U4c0lHaHBiblFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNob2FXNTBJRDA5UFNCY0luTjBjbWx1WjF3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUhSdlUzUnlhVzVuWHpFZ1BTQlBMblJ2VTNSeWFXNW5PMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoSmMwTmhiR3hoWW14bEtIUnZVM1J5YVc1blh6RXBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ5WlhOMWJIUWdQU0IwYjFOMGNtbHVaMTh4TG1OaGJHd29UeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2doU1hOUFltcGxZM1FvY21WemRXeDBLU2xjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnlaWE4xYkhRN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUIyWVd4MVpVOW1JRDBnVHk1MllXeDFaVTltTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaEpjME5oYkd4aFlteGxLSFpoYkhWbFQyWXBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ5WlhOMWJIUWdQU0IyWVd4MVpVOW1MbU5oYkd3b1R5azdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDZ2hTWE5QWW1wbFkzUW9jbVZ6ZFd4MEtTbGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCeVpYTjFiSFE3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlIWmhiSFZsVDJZZ1BTQlBMblpoYkhWbFQyWTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0VselEyRnNiR0ZpYkdVb2RtRnNkV1ZQWmlrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlISmxjM1ZzZENBOUlIWmhiSFZsVDJZdVkyRnNiQ2hQS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NGSmMwOWlhbVZqZENoeVpYTjFiSFFwS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSEpsYzNWc2REdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUhSdlUzUnlhVzVuWHpJZ1BTQlBMblJ2VTNSeWFXNW5PMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoSmMwTmhiR3hoWW14bEtIUnZVM1J5YVc1blh6SXBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ5WlhOMWJIUWdQU0IwYjFOMGNtbHVaMTh5TG1OaGJHd29UeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2doU1hOUFltcGxZM1FvY21WemRXeDBLU2xjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnlaWE4xYkhRN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRlI1Y0dWRmNuSnZjaWdwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDOHZJRGN1TVM0eUlGUnZRbTl2YkdWaGJpaGhjbWQxYldWdWRDbGNiaUFnSUNBZ0lDQWdMeThnYUhSMGNITTZMeTkwWXpNNUxtZHBkR2gxWWk1cGJ5OWxZMjFoTWpZeUx6SXdNVFl2STNObFl5MTBiMkp2YjJ4bFlXNWNiaUFnSUNBZ0lDQWdablZ1WTNScGIyNGdWRzlDYjI5c1pXRnVLR0Z5WjNWdFpXNTBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z0lTRmhjbWQxYldWdWREdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0F2THlBM0xqRXVNVElnVkc5VGRISnBibWNvWVhKbmRXMWxiblFwWEc0Z0lDQWdJQ0FnSUM4dklHaDBkSEJ6T2k4dmRHTXpPUzVuYVhSb2RXSXVhVzh2WldOdFlUSTJNaThqYzJWakxYUnZjM1J5YVc1blhHNGdJQ0FnSUNBZ0lHWjFibU4wYVc5dUlGUnZVM1J5YVc1bktHRnlaM1Z0Wlc1MEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWENKY0lpQXJJR0Z5WjNWdFpXNTBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUM4dklEY3VNUzR4TkNCVWIxQnliM0JsY25SNVMyVjVLR0Z5WjNWdFpXNTBLVnh1SUNBZ0lDQWdJQ0F2THlCb2RIUndjem92TDNSak16a3VaMmwwYUhWaUxtbHZMMlZqYldFeU5qSXZJM05sWXkxMGIzQnliM0JsY25SNWEyVjVYRzRnSUNBZ0lDQWdJR1oxYm1OMGFXOXVJRlJ2VUhKdmNHVnlkSGxMWlhrb1lYSm5kVzFsYm5RcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQnJaWGtnUFNCVWIxQnlhVzFwZEdsMlpTaGhjbWQxYldWdWRDd2dNeUF2S2lCVGRISnBibWNnS2k4cE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tFbHpVM2x0WW05c0tHdGxlU2twWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR3RsZVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQlViMU4wY21sdVp5aHJaWGtwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDOHZJRGN1TWlCVVpYTjBhVzVuSUdGdVpDQkRiMjF3WVhKcGMyOXVJRTl3WlhKaGRHbHZibk5jYmlBZ0lDQWdJQ0FnTHk4Z2FIUjBjSE02THk5MFl6TTVMbWRwZEdoMVlpNXBieTlsWTIxaE1qWXlMeU56WldNdGRHVnpkR2x1WnkxaGJtUXRZMjl0Y0dGeWFYTnZiaTF2Y0dWeVlYUnBiMjV6WEc0Z0lDQWdJQ0FnSUM4dklEY3VNaTR5SUVselFYSnlZWGtvWVhKbmRXMWxiblFwWEc0Z0lDQWdJQ0FnSUM4dklHaDBkSEJ6T2k4dmRHTXpPUzVuYVhSb2RXSXVhVzh2WldOdFlUSTJNaThqYzJWakxXbHpZWEp5WVhsY2JpQWdJQ0FnSUNBZ1puVnVZM1JwYjI0Z1NYTkJjbkpoZVNoaGNtZDFiV1Z1ZENrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRUZ5Y21GNUxtbHpRWEp5WVhsY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBL0lFRnljbUY1TG1selFYSnlZWGtvWVhKbmRXMWxiblFwWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnT2lCaGNtZDFiV1Z1ZENCcGJuTjBZVzVqWlc5bUlFOWlhbVZqZEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQS9JR0Z5WjNWdFpXNTBJR2x1YzNSaGJtTmxiMllnUVhKeVlYbGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnT2lCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG5SdlUzUnlhVzVuTG1OaGJHd29ZWEpuZFcxbGJuUXBJRDA5UFNCY0lsdHZZbXBsWTNRZ1FYSnlZWGxkWENJN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdMeThnTnk0eUxqTWdTWE5EWVd4c1lXSnNaU2hoY21kMWJXVnVkQ2xjYmlBZ0lDQWdJQ0FnTHk4Z2FIUjBjSE02THk5MFl6TTVMbWRwZEdoMVlpNXBieTlsWTIxaE1qWXlMeU56WldNdGFYTmpZV3hzWVdKc1pWeHVJQ0FnSUNBZ0lDQm1kVzVqZEdsdmJpQkpjME5oYkd4aFlteGxLR0Z5WjNWdFpXNTBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJPVDFSRk9pQlVhR2x6SUdseklHRnVJR0Z3Y0hKdmVHbHRZWFJwYjI0Z1lYTWdkMlVnWTJGdWJtOTBJR05vWldOcklHWnZjaUJiVzBOaGJHeGRYU0JwYm5SbGNtNWhiQ0J0WlhSb2IyUXVYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnZEhsd1pXOW1JR0Z5WjNWdFpXNTBJRDA5UFNCY0ltWjFibU4wYVc5dVhDSTdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnTHk4Z055NHlMalFnU1hORGIyNXpkSEoxWTNSdmNpaGhjbWQxYldWdWRDbGNiaUFnSUNBZ0lDQWdMeThnYUhSMGNITTZMeTkwWXpNNUxtZHBkR2gxWWk1cGJ5OWxZMjFoTWpZeUx5TnpaV010YVhOamIyNXpkSEoxWTNSdmNseHVJQ0FnSUNBZ0lDQm1kVzVqZEdsdmJpQkpjME52Ym5OMGNuVmpkRzl5S0dGeVozVnRaVzUwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlCT1QxUkZPaUJVYUdseklHbHpJR0Z1SUdGd2NISnZlR2x0WVhScGIyNGdZWE1nZDJVZ1kyRnVibTkwSUdOb1pXTnJJR1p2Y2lCYlcwTnZibk4wY25WamRGMWRJR2x1ZEdWeWJtRnNJRzFsZEdodlpDNWNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUIwZVhCbGIyWWdZWEpuZFcxbGJuUWdQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lqdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0F2THlBM0xqSXVOeUJKYzFCeWIzQmxjblI1UzJWNUtHRnlaM1Z0Wlc1MEtWeHVJQ0FnSUNBZ0lDQXZMeUJvZEhSd2N6b3ZMM1JqTXprdVoybDBhSFZpTG1sdkwyVmpiV0V5TmpJdkkzTmxZeTFwYzNCeWIzQmxjblI1YTJWNVhHNGdJQ0FnSUNBZ0lHWjFibU4wYVc5dUlFbHpVSEp2Y0dWeWRIbExaWGtvWVhKbmRXMWxiblFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSE4zYVhSamFDQW9WSGx3WlNoaGNtZDFiV1Z1ZENrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpZWE5sSURNZ0x5b2dVM1J5YVc1bklDb3ZPaUJ5WlhSMWNtNGdkSEoxWlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCallYTmxJRFFnTHlvZ1UzbHRZbTlzSUNvdk9pQnlaWFIxY200Z2RISjFaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JrWldaaGRXeDBPaUJ5WlhSMWNtNGdabUZzYzJVN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0x5OGdOeTR6SUU5d1pYSmhkR2x2Ym5NZ2IyNGdUMkpxWldOMGMxeHVJQ0FnSUNBZ0lDQXZMeUJvZEhSd2N6b3ZMM1JqTXprdVoybDBhSFZpTG1sdkwyVmpiV0V5TmpJdkkzTmxZeTF2Y0dWeVlYUnBiMjV6TFc5dUxXOWlhbVZqZEhOY2JpQWdJQ0FnSUNBZ0x5OGdOeTR6TGprZ1IyVjBUV1YwYUc5a0tGWXNJRkFwWEc0Z0lDQWdJQ0FnSUM4dklHaDBkSEJ6T2k4dmRHTXpPUzVuYVhSb2RXSXVhVzh2WldOdFlUSTJNaThqYzJWakxXZGxkRzFsZEdodlpGeHVJQ0FnSUNBZ0lDQm1kVzVqZEdsdmJpQkhaWFJOWlhSb2IyUW9WaXdnVUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHWjFibU1nUFNCV1cxQmRPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR1oxYm1NZ1BUMDlJSFZ1WkdWbWFXNWxaQ0I4ZkNCbWRXNWpJRDA5UFNCdWRXeHNLVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQjFibVJsWm1sdVpXUTdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9JVWx6UTJGc2JHRmliR1VvWm5WdVl5a3BYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRlI1Y0dWRmNuSnZjaWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHWjFibU03WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0x5OGdOeTQwSUU5d1pYSmhkR2x2Ym5NZ2IyNGdTWFJsY21GMGIzSWdUMkpxWldOMGMxeHVJQ0FnSUNBZ0lDQXZMeUJvZEhSd2N6b3ZMM1JqTXprdVoybDBhSFZpTG1sdkwyVmpiV0V5TmpJdkkzTmxZeTF2Y0dWeVlYUnBiMjV6TFc5dUxXbDBaWEpoZEc5eUxXOWlhbVZqZEhOY2JpQWdJQ0FnSUNBZ1puVnVZM1JwYjI0Z1IyVjBTWFJsY21GMGIzSW9iMkpxS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2JXVjBhRzlrSUQwZ1IyVjBUV1YwYUc5a0tHOWlhaXdnYVhSbGNtRjBiM0pUZVcxaWIyd3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ0ZKYzBOaGJHeGhZbXhsS0cxbGRHaHZaQ2twWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdoeWIzY2dibVYzSUZSNWNHVkZjbkp2Y2lncE95QXZMeUJtY205dElFTmhiR3hjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJwZEdWeVlYUnZjaUE5SUcxbGRHaHZaQzVqWVd4c0tHOWlhaWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvSVVselQySnFaV04wS0dsMFpYSmhkRzl5S1NsY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1ZIbHdaVVZ5Y205eUtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYVhSbGNtRjBiM0k3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0x5OGdOeTQwTGpRZ1NYUmxjbUYwYjNKV1lXeDFaU2hwZEdWeVVtVnpkV3gwS1Z4dUlDQWdJQ0FnSUNBdkx5Qm9kSFJ3Y3pvdkwzUmpNemt1WjJsMGFIVmlMbWx2TDJWamJXRXlOakl2TWpBeE5pOGpjMlZqTFdsMFpYSmhkRzl5ZG1Gc2RXVmNiaUFnSUNBZ0lDQWdablZ1WTNScGIyNGdTWFJsY21GMGIzSldZV3gxWlNocGRHVnlVbVZ6ZFd4MEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYVhSbGNsSmxjM1ZzZEM1MllXeDFaVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBdkx5QTNMalF1TlNCSmRHVnlZWFJ2Y2xOMFpYQW9hWFJsY21GMGIzSXBYRzRnSUNBZ0lDQWdJQzh2SUdoMGRIQnpPaTh2ZEdNek9TNW5hWFJvZFdJdWFXOHZaV050WVRJMk1pOGpjMlZqTFdsMFpYSmhkRzl5YzNSbGNGeHVJQ0FnSUNBZ0lDQm1kVzVqZEdsdmJpQkpkR1Z5WVhSdmNsTjBaWEFvYVhSbGNtRjBiM0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCeVpYTjFiSFFnUFNCcGRHVnlZWFJ2Y2k1dVpYaDBLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2NtVnpkV3gwTG1SdmJtVWdQeUJtWVd4elpTQTZJSEpsYzNWc2REdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0F2THlBM0xqUXVOaUJKZEdWeVlYUnZja05zYjNObEtHbDBaWEpoZEc5eUxDQmpiMjF3YkdWMGFXOXVLVnh1SUNBZ0lDQWdJQ0F2THlCb2RIUndjem92TDNSak16a3VaMmwwYUhWaUxtbHZMMlZqYldFeU5qSXZJM05sWXkxcGRHVnlZWFJ2Y21Oc2IzTmxYRzRnSUNBZ0lDQWdJR1oxYm1OMGFXOXVJRWwwWlhKaGRHOXlRMnh2YzJVb2FYUmxjbUYwYjNJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQm1JRDBnYVhSbGNtRjBiM0piWENKeVpYUjFjbTVjSWwwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1ppbGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQm1MbU5oYkd3b2FYUmxjbUYwYjNJcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQzh2SURrdU1TQlBjbVJwYm1GeWVTQlBZbXBsWTNRZ1NXNTBaWEp1WVd3Z1RXVjBhRzlrY3lCaGJtUWdTVzUwWlhKdVlXd2dVMnh2ZEhOY2JpQWdJQ0FnSUNBZ0x5OGdhSFIwY0hNNkx5OTBZek01TG1kcGRHaDFZaTVwYnk5bFkyMWhNall5THlOelpXTXRiM0prYVc1aGNua3RiMkpxWldOMExXbHVkR1Z5Ym1Gc0xXMWxkR2h2WkhNdFlXNWtMV2x1ZEdWeWJtRnNMWE5zYjNSelhHNGdJQ0FnSUNBZ0lDOHZJRGt1TVM0eExqRWdUM0prYVc1aGNubEhaWFJRY205MGIzUjVjR1ZQWmloUEtWeHVJQ0FnSUNBZ0lDQXZMeUJvZEhSd2N6b3ZMM1JqTXprdVoybDBhSFZpTG1sdkwyVmpiV0V5TmpJdkkzTmxZeTF2Y21ScGJtRnllV2RsZEhCeWIzUnZkSGx3Wlc5bVhHNGdJQ0FnSUNBZ0lHWjFibU4wYVc5dUlFOXlaR2x1WVhKNVIyVjBVSEp2ZEc5MGVYQmxUMllvVHlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlIQnliM1J2SUQwZ1QySnFaV04wTG1kbGRGQnliM1J2ZEhsd1pVOW1LRThwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUJQSUNFOVBTQmNJbVoxYm1OMGFXOXVYQ0lnZkh3Z1R5QTlQVDBnWm5WdVkzUnBiMjVRY205MGIzUjVjR1VwWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSEJ5YjNSdk8xeHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z1ZIbHdaVk5qY21sd2RDQmtiMlZ6YmlkMElITmxkQ0JmWDNCeWIzUnZYMThnYVc0Z1JWTTFMQ0JoY3lCcGRDZHpJRzV2YmkxemRHRnVaR0Z5WkM1Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUZSeWVTQjBieUJrWlhSbGNtMXBibVVnZEdobElITjFjR1Z5WTJ4aGMzTWdZMjl1YzNSeWRXTjBiM0l1SUVOdmJYQmhkR2xpYkdVZ2FXMXdiR1Z0Wlc1MFlYUnBiMjV6WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJ0ZFhOMElHVnBkR2hsY2lCelpYUWdYMTl3Y205MGIxOWZJRzl1SUdFZ2MzVmlZMnhoYzNNZ1kyOXVjM1J5ZFdOMGIzSWdkRzhnZEdobElITjFjR1Z5WTJ4aGMzTWdZMjl1YzNSeWRXTjBiM0lzWEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJ2Y2lCbGJuTjFjbVVnWldGamFDQmpiR0Z6Y3lCb1lYTWdZU0IyWVd4cFpDQmdZMjl1YzNSeWRXTjBiM0pnSUhCeWIzQmxjblI1SUc5dUlHbDBjeUJ3Y205MGIzUjVjR1VnZEdoaGRGeHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z2NHOXBiblJ6SUdKaFkyc2dkRzhnZEdobElHTnZibk4wY25WamRHOXlMbHh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdTV1lnZEdocGN5QnBjeUJ1YjNRZ2RHaGxJSE5oYldVZ1lYTWdSblZ1WTNScGIyNHVXMXRRY205MGIzUjVjR1ZkWFN3Z2RHaGxiaUIwYUdseklHbHpJR1JsWm1sdVlYUmxiSGtnYVc1b1pYSnBkR1ZrTGx4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnVkdocGN5QnBjeUIwYUdVZ1kyRnpaU0IzYUdWdUlHbHVJRVZUTmlCdmNpQjNhR1Z1SUhWemFXNW5JRjlmY0hKdmRHOWZYeUJwYmlCaElHTnZiWEJoZEdsaWJHVWdZbkp2ZDNObGNpNWNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaHdjbTkwYnlBaFBUMGdablZ1WTNScGIyNVFjbTkwYjNSNWNHVXBYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlIQnliM1J2TzF4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnU1dZZ2RHaGxJSE4xY0dWeUlIQnliM1J2ZEhsd1pTQnBjeUJQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMQ0J1ZFd4c0xDQnZjaUIxYm1SbFptbHVaV1FzSUhSb1pXNGdkMlVnWTJGdWJtOTBJR1JsZEdWeWJXbHVaU0IwYUdVZ2FHVnlhWFJoWjJVdVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2NISnZkRzkwZVhCbElEMGdUeTV3Y205MGIzUjVjR1U3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnY0hKdmRHOTBlWEJsVUhKdmRHOGdQU0J3Y205MGIzUjVjR1VnSmlZZ1QySnFaV04wTG1kbGRGQnliM1J2ZEhsd1pVOW1LSEJ5YjNSdmRIbHdaU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvY0hKdmRHOTBlWEJsVUhKdmRHOGdQVDBnYm5Wc2JDQjhmQ0J3Y205MGIzUjVjR1ZRY205MGJ5QTlQVDBnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaU2xjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdjSEp2ZEc4N1hHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlCSlppQjBhR1VnWTI5dWMzUnlkV04wYjNJZ2QyRnpJRzV2ZENCaElHWjFibU4wYVc5dUxDQjBhR1Z1SUhkbElHTmhibTV2ZENCa1pYUmxjbTFwYm1VZ2RHaGxJR2hsY21sMFlXZGxMbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR052Ym5OMGNuVmpkRzl5SUQwZ2NISnZkRzkwZVhCbFVISnZkRzh1WTI5dWMzUnlkV04wYjNJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2RIbHdaVzltSUdOdmJuTjBjblZqZEc5eUlDRTlQU0JjSW1aMWJtTjBhVzl1WENJcFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhCeWIzUnZPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdTV1lnZDJVZ2FHRjJaU0J6YjIxbElHdHBibVFnYjJZZ2MyVnNaaTF5WldabGNtVnVZMlVzSUhSb1pXNGdkMlVnWTJGdWJtOTBJR1JsZEdWeWJXbHVaU0IwYUdVZ2FHVnlhWFJoWjJVdVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1kyOXVjM1J5ZFdOMGIzSWdQVDA5SUU4cFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhCeWIzUnZPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdkMlVnYUdGMlpTQmhJSEJ5WlhSMGVTQm5iMjlrSUdkMVpYTnpJR0YwSUhSb1pTQm9aWEpwZEdGblpTNWNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJqYjI1emRISjFZM1J2Y2p0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQXZMeUJ1WVdsMlpTQk5ZWEFnYzJocGJWeHVJQ0FnSUNBZ0lDQm1kVzVqZEdsdmJpQkRjbVZoZEdWTllYQlFiMng1Wm1sc2JDZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJqWVdOb1pWTmxiblJwYm1Wc0lEMGdlMzA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnWVhKeVlYbFRaVzUwYVc1bGJDQTlJRnRkTzF4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUUxaGNFbDBaWEpoZEc5eUlEMGdMeW9xSUVCamJHRnpjeUFxTHlBb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1oxYm1OMGFXOXVJRTFoY0VsMFpYSmhkRzl5S0d0bGVYTXNJSFpoYkhWbGN5d2djMlZzWldOMGIzSXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVmYVc1a1pYZ2dQU0F3TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5clpYbHpJRDBnYTJWNWN6dGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWZkbUZzZFdWeklEMGdkbUZzZFdWek8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxsOXpaV3hsWTNSdmNpQTlJSE5sYkdWamRHOXlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JOWVhCSmRHVnlZWFJ2Y2k1d2NtOTBiM1I1Y0dWYlhDSkFRR2wwWlhKaGRHOXlYQ0pkSUQwZ1puVnVZM1JwYjI0Z0tDa2dleUJ5WlhSMWNtNGdkR2hwY3pzZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQk5ZWEJKZEdWeVlYUnZjaTV3Y205MGIzUjVjR1ZiYVhSbGNtRjBiM0pUZVcxaWIyeGRJRDBnWm5WdVkzUnBiMjRnS0NrZ2V5QnlaWFIxY200Z2RHaHBjenNnZlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCTllYQkpkR1Z5WVhSdmNpNXdjbTkwYjNSNWNHVXVibVY0ZENBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR2x1WkdWNElEMGdkR2hwY3k1ZmFXNWtaWGc3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hwYm1SbGVDQStQU0F3SUNZbUlHbHVaR1Y0SUR3Z2RHaHBjeTVmYTJWNWN5NXNaVzVuZEdncElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ5WlhOMWJIUWdQU0IwYUdsekxsOXpaV3hsWTNSdmNpaDBhR2x6TGw5clpYbHpXMmx1WkdWNFhTd2dkR2hwY3k1ZmRtRnNkV1Z6VzJsdVpHVjRYU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2FXNWtaWGdnS3lBeElENDlJSFJvYVhNdVgydGxlWE11YkdWdVozUm9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVmYVc1a1pYZ2dQU0F0TVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5clpYbHpJRDBnWVhKeVlYbFRaVzUwYVc1bGJEdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxsOTJZV3gxWlhNZ1BTQmhjbkpoZVZObGJuUnBibVZzTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWZhVzVrWlhnckt6dGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCN0lIWmhiSFZsT2lCeVpYTjFiSFFzSUdSdmJtVTZJR1poYkhObElIMDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlIc2dkbUZzZFdVNklIVnVaR1ZtYVc1bFpDd2daRzl1WlRvZ2RISjFaU0I5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1RXRndTWFJsY21GMGIzSXVjSEp2ZEc5MGVYQmxMblJvY205M0lEMGdablZ1WTNScGIyNGdLR1Z5Y205eUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaDBhR2x6TGw5cGJtUmxlQ0ErUFNBd0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5cGJtUmxlQ0E5SUMweE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVmYTJWNWN5QTlJR0Z5Y21GNVUyVnVkR2x1Wld3N1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbDkyWVd4MVpYTWdQU0JoY25KaGVWTmxiblJwYm1Wc08xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9jbTkzSUdWeWNtOXlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnVFdGd1NYUmxjbUYwYjNJdWNISnZkRzkwZVhCbExuSmxkSFZ5YmlBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTVmYVc1a1pYZ2dQajBnTUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVmYVc1a1pYZ2dQU0F0TVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVYMnRsZVhNZ1BTQmhjbkpoZVZObGJuUnBibVZzTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWZkbUZzZFdWeklEMGdZWEp5WVhsVFpXNTBhVzVsYkR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnZXlCMllXeDFaVG9nZG1Gc2RXVXNJR1J2Ym1VNklIUnlkV1VnZlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCTllYQkpkR1Z5WVhSdmNqdGNiaUFnSUNBZ0lDQWdJQ0FnSUgwb0tTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnTHlvcUlFQmpiR0Z6Y3lBcUx5QW9ablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdaMWJtTjBhVzl1SUUxaGNDZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVmYTJWNWN5QTlJRnRkTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5MllXeDFaWE1nUFNCYlhUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWZZMkZqYUdWTFpYa2dQU0JqWVdOb1pWTmxiblJwYm1Wc08xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxsOWpZV05vWlVsdVpHVjRJRDBnTFRJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2hOWVhBdWNISnZkRzkwZVhCbExDQmNJbk5wZW1WY0lpd2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCblpYUTZJR1oxYm1OMGFXOXVJQ2dwSUhzZ2NtVjBkWEp1SUhSb2FYTXVYMnRsZVhNdWJHVnVaM1JvT3lCOUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsYm5WdFpYSmhZbXhsT2lCMGNuVmxMRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamIyNW1hV2QxY21GaWJHVTZJSFJ5ZFdWY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQk5ZWEF1Y0hKdmRHOTBlWEJsTG1oaGN5QTlJR1oxYm1OMGFXOXVJQ2hyWlhrcElIc2djbVYwZFhKdUlIUm9hWE11WDJacGJtUW9hMlY1TENBdkttbHVjMlZ5ZENvdklHWmhiSE5sS1NBK1BTQXdPeUI5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUUxaGNDNXdjbTkwYjNSNWNHVXVaMlYwSUQwZ1puVnVZM1JwYjI0Z0tHdGxlU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnYVc1a1pYZ2dQU0IwYUdsekxsOW1hVzVrS0d0bGVTd2dMeXBwYm5ObGNuUXFMeUJtWVd4elpTazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJwYm1SbGVDQStQU0F3SUQ4Z2RHaHBjeTVmZG1Gc2RXVnpXMmx1WkdWNFhTQTZJSFZ1WkdWbWFXNWxaRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUUxaGNDNXdjbTkwYjNSNWNHVXVjMlYwSUQwZ1puVnVZM1JwYjI0Z0tHdGxlU3dnZG1Gc2RXVXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR2x1WkdWNElEMGdkR2hwY3k1ZlptbHVaQ2hyWlhrc0lDOHFhVzV6WlhKMEtpOGdkSEoxWlNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdVgzWmhiSFZsYzF0cGJtUmxlRjBnUFNCMllXeDFaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JOWVhBdWNISnZkRzkwZVhCbExtUmxiR1YwWlNBOUlHWjFibU4wYVc5dUlDaHJaWGtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdsdVpHVjRJRDBnZEdocGN5NWZabWx1WkNoclpYa3NJQzhxYVc1elpYSjBLaThnWm1Gc2MyVXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9hVzVrWlhnZ1BqMGdNQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlITnBlbVVnUFNCMGFHbHpMbDlyWlhsekxteGxibWQwYUR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdadmNpQW9kbUZ5SUdrZ1BTQnBibVJsZUNBcklERTdJR2tnUENCemFYcGxPeUJwS3lzcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxsOXJaWGx6VzJrZ0xTQXhYU0E5SUhSb2FYTXVYMnRsZVhOYmFWMDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWZkbUZzZFdWelcya2dMU0F4WFNBOUlIUm9hWE11WDNaaGJIVmxjMXRwWFR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVYMnRsZVhNdWJHVnVaM1JvTFMwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbDkyWVd4MVpYTXViR1Z1WjNSb0xTMDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvYTJWNUlEMDlQU0IwYUdsekxsOWpZV05vWlV0bGVTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVYMk5oWTJobFMyVjVJRDBnWTJGamFHVlRaVzUwYVc1bGJEdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxsOWpZV05vWlVsdVpHVjRJRDBnTFRJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnZEhKMVpUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCTllYQXVjSEp2ZEc5MGVYQmxMbU5zWldGeUlEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5clpYbHpMbXhsYm1kMGFDQTlJREE3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11WDNaaGJIVmxjeTVzWlc1bmRHZ2dQU0F3TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5allXTm9aVXRsZVNBOUlHTmhZMmhsVTJWdWRHbHVaV3c3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11WDJOaFkyaGxTVzVrWlhnZ1BTQXRNanRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUUxaGNDNXdjbTkwYjNSNWNHVXVhMlY1Y3lBOUlHWjFibU4wYVc5dUlDZ3BJSHNnY21WMGRYSnVJRzVsZHlCTllYQkpkR1Z5WVhSdmNpaDBhR2x6TGw5clpYbHpMQ0IwYUdsekxsOTJZV3gxWlhNc0lHZGxkRXRsZVNrN0lIMDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdUV0Z3TG5CeWIzUnZkSGx3WlM1MllXeDFaWE1nUFNCbWRXNWpkR2x2YmlBb0tTQjdJSEpsZEhWeWJpQnVaWGNnVFdGd1NYUmxjbUYwYjNJb2RHaHBjeTVmYTJWNWN5d2dkR2hwY3k1ZmRtRnNkV1Z6TENCblpYUldZV3gxWlNrN0lIMDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdUV0Z3TG5CeWIzUnZkSGx3WlM1bGJuUnlhV1Z6SUQwZ1puVnVZM1JwYjI0Z0tDa2dleUJ5WlhSMWNtNGdibVYzSUUxaGNFbDBaWEpoZEc5eUtIUm9hWE11WDJ0bGVYTXNJSFJvYVhNdVgzWmhiSFZsY3l3Z1oyVjBSVzUwY25rcE95QjlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRTFoY0M1d2NtOTBiM1I1Y0dWYlhDSkFRR2wwWlhKaGRHOXlYQ0pkSUQwZ1puVnVZM1JwYjI0Z0tDa2dleUJ5WlhSMWNtNGdkR2hwY3k1bGJuUnlhV1Z6S0NrN0lIMDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdUV0Z3TG5CeWIzUnZkSGx3WlZ0cGRHVnlZWFJ2Y2xONWJXSnZiRjBnUFNCbWRXNWpkR2x2YmlBb0tTQjdJSEpsZEhWeWJpQjBhR2x6TG1WdWRISnBaWE1vS1RzZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQk5ZWEF1Y0hKdmRHOTBlWEJsTGw5bWFXNWtJRDBnWm5WdVkzUnBiMjRnS0d0bGVTd2dhVzV6WlhKMEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaDBhR2x6TGw5allXTm9aVXRsZVNBaFBUMGdhMlY1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbDlqWVdOb1pVbHVaR1Y0SUQwZ2RHaHBjeTVmYTJWNWN5NXBibVJsZUU5bUtIUm9hWE11WDJOaFkyaGxTMlY1SUQwZ2EyVjVLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTVmWTJGamFHVkpibVJsZUNBOElEQWdKaVlnYVc1elpYSjBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxsOWpZV05vWlVsdVpHVjRJRDBnZEdocGN5NWZhMlY1Y3k1c1pXNW5kR2c3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxsOXJaWGx6TG5CMWMyZ29hMlY1S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVYM1poYkhWbGN5NXdkWE5vS0hWdVpHVm1hVzVsWkNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVYMk5oWTJobFNXNWtaWGc3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnVFdGd08xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlNncEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdaMWJtTjBhVzl1SUdkbGRFdGxlU2hyWlhrc0lGOHBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdhMlY1TzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ1puVnVZM1JwYjI0Z1oyVjBWbUZzZFdVb1h5d2dkbUZzZFdVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2RtRnNkV1U3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCbWRXNWpkR2x2YmlCblpYUkZiblJ5ZVNoclpYa3NJSFpoYkhWbEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlGdHJaWGtzSUhaaGJIVmxYVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0F2THlCdVlXbDJaU0JUWlhRZ2MyaHBiVnh1SUNBZ0lDQWdJQ0JtZFc1amRHbHZiaUJEY21WaGRHVlRaWFJRYjJ4NVptbHNiQ2dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQXZLaW9nUUdOc1lYTnpJQ292SUNobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdablZ1WTNScGIyNGdVMlYwS0NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxsOXRZWEFnUFNCdVpYY2dYMDFoY0NncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvVTJWMExuQnliM1J2ZEhsd1pTd2dYQ0p6YVhwbFhDSXNJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1oyVjBPaUJtZFc1amRHbHZiaUFvS1NCN0lISmxkSFZ5YmlCMGFHbHpMbDl0WVhBdWMybDZaVHNnZlN4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaVzUxYldWeVlXSnNaVG9nZEhKMVpTeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTI5dVptbG5kWEpoWW14bE9pQjBjblZsWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1UyVjBMbkJ5YjNSdmRIbHdaUzVvWVhNZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVcElIc2djbVYwZFhKdUlIUm9hWE11WDIxaGNDNW9ZWE1vZG1Gc2RXVXBPeUI5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUZObGRDNXdjbTkwYjNSNWNHVXVZV1JrSUQwZ1puVnVZM1JwYjI0Z0tIWmhiSFZsS1NCN0lISmxkSFZ5YmlCMGFHbHpMbDl0WVhBdWMyVjBLSFpoYkhWbExDQjJZV3gxWlNrc0lIUm9hWE03SUgwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1UyVjBMbkJ5YjNSdmRIbHdaUzVrWld4bGRHVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXBJSHNnY21WMGRYSnVJSFJvYVhNdVgyMWhjQzVrWld4bGRHVW9kbUZzZFdVcE95QjlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRk5sZEM1d2NtOTBiM1I1Y0dVdVkyeGxZWElnUFNCbWRXNWpkR2x2YmlBb0tTQjdJSFJvYVhNdVgyMWhjQzVqYkdWaGNpZ3BPeUI5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUZObGRDNXdjbTkwYjNSNWNHVXVhMlY1Y3lBOUlHWjFibU4wYVc5dUlDZ3BJSHNnY21WMGRYSnVJSFJvYVhNdVgyMWhjQzVyWlhsektDazdJSDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnVTJWMExuQnliM1J2ZEhsd1pTNTJZV3gxWlhNZ1BTQm1kVzVqZEdsdmJpQW9LU0I3SUhKbGRIVnliaUIwYUdsekxsOXRZWEF1ZG1Gc2RXVnpLQ2s3SUgwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1UyVjBMbkJ5YjNSdmRIbHdaUzVsYm5SeWFXVnpJRDBnWm5WdVkzUnBiMjRnS0NrZ2V5QnlaWFIxY200Z2RHaHBjeTVmYldGd0xtVnVkSEpwWlhNb0tUc2dmVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JUWlhRdWNISnZkRzkwZVhCbFcxd2lRRUJwZEdWeVlYUnZjbHdpWFNBOUlHWjFibU4wYVc5dUlDZ3BJSHNnY21WMGRYSnVJSFJvYVhNdWEyVjVjeWdwT3lCOU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lGTmxkQzV3Y205MGIzUjVjR1ZiYVhSbGNtRjBiM0pUZVcxaWIyeGRJRDBnWm5WdVkzUnBiMjRnS0NrZ2V5QnlaWFIxY200Z2RHaHBjeTVyWlhsektDazdJSDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRk5sZER0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDBvS1NrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdMeThnYm1GcGRtVWdWMlZoYTAxaGNDQnphR2x0WEc0Z0lDQWdJQ0FnSUdaMWJtTjBhVzl1SUVOeVpXRjBaVmRsWVd0TllYQlFiMng1Wm1sc2JDZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJWVlVsRVgxTkpXa1VnUFNBeE5qdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQnJaWGx6SUQwZ1NHRnphRTFoY0M1amNtVmhkR1VvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCeWIyOTBTMlY1SUQwZ1EzSmxZWFJsVlc1cGNYVmxTMlY1S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdMeW9xSUVCamJHRnpjeUFxTHlBb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1oxYm1OMGFXOXVJRmRsWVd0TllYQW9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11WDJ0bGVTQTlJRU55WldGMFpWVnVhWEYxWlV0bGVTZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JYWldGclRXRndMbkJ5YjNSdmRIbHdaUzVvWVhNZ1BTQm1kVzVqZEdsdmJpQW9kR0Z5WjJWMEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQjBZV0pzWlNBOUlFZGxkRTl5UTNKbFlYUmxWMlZoYTAxaGNGUmhZbXhsS0hSaGNtZGxkQ3dnTHlwamNtVmhkR1VxTHlCbVlXeHpaU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCMFlXSnNaU0FoUFQwZ2RXNWtaV1pwYm1Wa0lEOGdTR0Z6YUUxaGNDNW9ZWE1vZEdGaWJHVXNJSFJvYVhNdVgydGxlU2tnT2lCbVlXeHpaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUZkbFlXdE5ZWEF1Y0hKdmRHOTBlWEJsTG1kbGRDQTlJR1oxYm1OMGFXOXVJQ2gwWVhKblpYUXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSFJoWW14bElEMGdSMlYwVDNKRGNtVmhkR1ZYWldGclRXRndWR0ZpYkdVb2RHRnlaMlYwTENBdkttTnlaV0YwWlNvdklHWmhiSE5sS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlIUmhZbXhsSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJJWVhOb1RXRndMbWRsZENoMFlXSnNaU3dnZEdocGN5NWZhMlY1S1NBNklIVnVaR1ZtYVc1bFpEdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRmRsWVd0TllYQXVjSEp2ZEc5MGVYQmxMbk5sZENBOUlHWjFibU4wYVc5dUlDaDBZWEpuWlhRc0lIWmhiSFZsS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCMFlXSnNaU0E5SUVkbGRFOXlRM0psWVhSbFYyVmhhMDFoY0ZSaFlteGxLSFJoY21kbGRDd2dMeXBqY21WaGRHVXFMeUIwY25WbEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdGaWJHVmJkR2hwY3k1ZmEyVjVYU0E5SUhaaGJIVmxPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnZEdocGN6dGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRmRsWVd0TllYQXVjSEp2ZEc5MGVYQmxMbVJsYkdWMFpTQTlJR1oxYm1OMGFXOXVJQ2gwWVhKblpYUXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJSFJoWW14bElEMGdSMlYwVDNKRGNtVmhkR1ZYWldGclRXRndWR0ZpYkdVb2RHRnlaMlYwTENBdkttTnlaV0YwWlNvdklHWmhiSE5sS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlIUmhZbXhsSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJrWld4bGRHVWdkR0ZpYkdWYmRHaHBjeTVmYTJWNVhTQTZJR1poYkhObE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdWMlZoYTAxaGNDNXdjbTkwYjNSNWNHVXVZMnhsWVhJZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZJRTVQVkVVNklHNXZkQ0JoSUhKbFlXd2dZMnhsWVhJc0lHcDFjM1FnYldGclpYTWdkR2hsSUhCeVpYWnBiM1Z6SUdSaGRHRWdkVzV5WldGamFHRmliR1ZjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVmYTJWNUlEMGdRM0psWVhSbFZXNXBjWFZsUzJWNUtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdWMlZoYTAxaGNEdGNiaUFnSUNBZ0lDQWdJQ0FnSUgwb0tTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCbWRXNWpkR2x2YmlCRGNtVmhkR1ZWYm1seGRXVkxaWGtvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR3RsZVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa2IxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JyWlhrZ1BTQmNJa0JBVjJWaGEwMWhjRUJBWENJZ0t5QkRjbVZoZEdWVlZVbEVLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZDJocGJHVWdLRWhoYzJoTllYQXVhR0Z6S0d0bGVYTXNJR3RsZVNrcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHdGxlWE5iYTJWNVhTQTlJSFJ5ZFdVN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUd0bGVUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJR1oxYm1OMGFXOXVJRWRsZEU5eVEzSmxZWFJsVjJWaGEwMWhjRlJoWW14bEtIUmhjbWRsZEN3Z1kzSmxZWFJsS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ0ZvWVhOUGQyNHVZMkZzYkNoMFlYSm5aWFFzSUhKdmIzUkxaWGtwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNnaFkzSmxZWFJsS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSFZ1WkdWbWFXNWxaRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1QySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLSFJoY21kbGRDd2djbTl2ZEV0bGVTd2dleUIyWVd4MVpUb2dTR0Z6YUUxaGNDNWpjbVZoZEdVb0tTQjlLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSFJoY21kbGRGdHliMjkwUzJWNVhUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJR1oxYm1OMGFXOXVJRVpwYkd4U1lXNWtiMjFDZVhSbGN5aGlkV1ptWlhJc0lITnBlbVVwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElITnBlbVU3SUNzcmFTbGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWW5WbVptVnlXMmxkSUQwZ1RXRjBhQzV5WVc1a2IyMG9LU0FxSURCNFptWWdmQ0F3TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJpZFdabVpYSTdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0JtZFc1amRHbHZiaUJIWlc1U1lXNWtiMjFDZVhSbGN5aHphWHBsS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQlZhVzUwT0VGeWNtRjVJRDA5UFNCY0ltWjFibU4wYVc5dVhDSXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQmpjbmx3ZEc4Z0lUMDlJRndpZFc1a1pXWnBibVZrWENJcFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWTNKNWNIUnZMbWRsZEZKaGJtUnZiVlpoYkhWbGN5aHVaWGNnVldsdWREaEJjbkpoZVNoemFYcGxLU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwZVhCbGIyWWdiWE5EY25sd2RHOGdJVDA5SUZ3aWRXNWtaV1pwYm1Wa1hDSXBYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2JYTkRjbmx3ZEc4dVoyVjBVbUZ1Wkc5dFZtRnNkV1Z6S0c1bGR5QlZhVzUwT0VGeWNtRjVLSE5wZW1VcEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRVpwYkd4U1lXNWtiMjFDZVhSbGN5aHVaWGNnVldsdWREaEJjbkpoZVNoemFYcGxLU3dnYzJsNlpTazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQkdhV3hzVW1GdVpHOXRRbmwwWlhNb2JtVjNJRUZ5Y21GNUtITnBlbVVwTENCemFYcGxLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUdaMWJtTjBhVzl1SUVOeVpXRjBaVlZWU1VRb0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdSaGRHRWdQU0JIWlc1U1lXNWtiMjFDZVhSbGN5aFZWVWxFWDFOSldrVXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUcxaGNtc2dZWE1nY21GdVpHOXRJQzBnVWtaRElEUXhNaklnd3FjZ05DNDBYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaR0YwWVZzMlhTQTlJR1JoZEdGYk5sMGdKaUF3ZURSbUlId2dNSGcwTUR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa1lYUmhXemhkSUQwZ1pHRjBZVnM0WFNBbUlEQjRZbVlnZkNBd2VEZ3dPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCeVpYTjFiSFFnUFNCY0lsd2lPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1p2Y2lBb2RtRnlJRzltWm5ObGRDQTlJREE3SUc5bVpuTmxkQ0E4SUZWVlNVUmZVMGxhUlRzZ0t5dHZabVp6WlhRcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHSjVkR1VnUFNCa1lYUmhXMjltWm5ObGRGMDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaHZabVp6WlhRZ1BUMDlJRFFnZkh3Z2IyWm1jMlYwSUQwOVBTQTJJSHg4SUc5bVpuTmxkQ0E5UFQwZ09DbGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxjM1ZzZENBclBTQmNJaTFjSWp0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0dKNWRHVWdQQ0F4TmlsY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGMzVnNkQ0FyUFNCY0lqQmNJanRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVnpkV3gwSUNzOUlHSjVkR1V1ZEc5VGRISnBibWNvTVRZcExuUnZURzkzWlhKRFlYTmxLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJ5WlhOMWJIUTdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdMeThnZFhObGN5QmhJR2hsZFhKcGMzUnBZeUIxYzJWa0lHSjVJSFk0SUdGdVpDQmphR0ZyY21FZ2RHOGdabTl5WTJVZ1lXNGdiMkpxWldOMElHbHVkRzhnWkdsamRHbHZibUZ5ZVNCdGIyUmxMbHh1SUNBZ0lDQWdJQ0JtZFc1amRHbHZiaUJOWVd0bFJHbGpkR2x2Ym1GeWVTaHZZbW9wSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJRzlpYWk1Zlh5QTlJSFZ1WkdWbWFXNWxaRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHUmxiR1YwWlNCdlltb3VYMTg3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2IySnFPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmU2s3WEc1OUtTaFNaV1pzWldOMElIeDhJQ2hTWldac1pXTjBJRDBnZTMwcEtUdGNiaUlzSW1WNGNHOXlkQ0FxSUdaeWIyMGdKeTR2UkdsemNHRjBZMmhsY2ljN1hHNGlMQ0psZUhCdmNuUWdLaUJtY205dElDY3VMMEZ3Y0d4cFkyRjBhVzl1Snp0Y2JpSXNJbVY0Y0c5eWRDQXFJR1p5YjIwZ0p5NHZTSFIwY0ZObGNuWnBZMlZRY205MmFXUmxjaWM3WEc0aUxDSnBiWEJ2Y25RZ2V5QlRkSEpsWVcwZ2ZTQm1jbTl0SUNjdUwxTjBjbVZoYlNjN1hHNWNibVY0Y0c5eWRDQXFJR1p5YjIwZ0p5NHZRM0pwZEdWeWFXRW5PMXh1Wlhod2IzSjBJQ29nWm5KdmJTQW5MaTlGYm5SeWVTYzdYRzVsZUhCdmNuUWdLaUJtY205dElDY3VMMFZ1ZEhKNVEyOXNiR1ZqZEdsdmJpYzdYRzVsZUhCdmNuUWdLaUJtY205dElDY3VMMFpwWld4a0p6dGNibVY0Y0c5eWRDQXFJR1p5YjIwZ0p5NHZSbWxsYkdSRGIyeHNaV04wYVc5dUp6dGNibVY0Y0c5eWRDQXFJR1p5YjIwZ0p5NHZVbVZ3YjNOcGRHOXllU2M3WEc1bGVIQnZjblFnS2lCbWNtOXRJQ2N1TDFOMGNtVmhiU2M3WEc1bGVIQnZjblFnS2lCbWNtOXRJQ2N1TDFOMGNtVmhiWE1uTzF4dVpYaHdiM0owSUNvZ1puSnZiU0FuTGk5VGRISmxZVzF6VTJWeWRtbGpaVkJ5YjNacFpHVnlKenRjYmx4dVpYaHdiM0owSUdSbFptRjFiSFFnVTNSeVpXRnRPMXh1SWl3aVpYaHdiM0owSUNvZ1puSnZiU0FuTGk5RGIyeHNaV04wYVc5dUp6dGNibVY0Y0c5eWRDQXFJR1p5YjIwZ0p5NHZVMlZ5ZG1salpWQnliM1pwWkdWeUp6dGNiaUlzSW1WNGNHOXlkQ0FxSUdaeWIyMGdKeTR2WTI5dVptbG5KenRjYm1WNGNHOXlkQ0FxSUdaeWIyMGdKeTR2YzNSeVpXRnRjeWM3WEc0aUxDSXZMeUJVYUdVZ2JXOWtkV3hsSUdOaFkyaGxYRzUyWVhJZ1gxOTNaV0p3WVdOclgyMXZaSFZzWlY5allXTm9aVjlmSUQwZ2UzMDdYRzVjYmk4dklGUm9aU0J5WlhGMWFYSmxJR1oxYm1OMGFXOXVYRzVtZFc1amRHbHZiaUJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0cxdlpIVnNaVWxrS1NCN1hHNWNkQzh2SUVOb1pXTnJJR2xtSUcxdlpIVnNaU0JwY3lCcGJpQmpZV05vWlZ4dVhIUjJZWElnWTJGamFHVmtUVzlrZFd4bElEMGdYMTkzWldKd1lXTnJYMjF2WkhWc1pWOWpZV05vWlY5ZlcyMXZaSFZzWlVsa1hUdGNibHgwYVdZZ0tHTmhZMmhsWkUxdlpIVnNaU0FoUFQwZ2RXNWtaV1pwYm1Wa0tTQjdYRzVjZEZ4MGNtVjBkWEp1SUdOaFkyaGxaRTF2WkhWc1pTNWxlSEJ2Y25Sek8xeHVYSFI5WEc1Y2RDOHZJRU55WldGMFpTQmhJRzVsZHlCdGIyUjFiR1VnS0dGdVpDQndkWFFnYVhRZ2FXNTBieUIwYUdVZ1kyRmphR1VwWEc1Y2RIWmhjaUJ0YjJSMWJHVWdQU0JmWDNkbFluQmhZMnRmYlc5a2RXeGxYMk5oWTJobFgxOWJiVzlrZFd4bFNXUmRJRDBnZTF4dVhIUmNkQzh2SUc1dklHMXZaSFZzWlM1cFpDQnVaV1ZrWldSY2JseDBYSFF2THlCdWJ5QnRiMlIxYkdVdWJHOWhaR1ZrSUc1bFpXUmxaRnh1WEhSY2RHVjRjRzl5ZEhNNklIdDlYRzVjZEgwN1hHNWNibHgwTHk4Z1JYaGxZM1YwWlNCMGFHVWdiVzlrZFd4bElHWjFibU4wYVc5dVhHNWNkRjlmZDJWaWNHRmphMTl0YjJSMWJHVnpYMTliYlc5a2RXeGxTV1JkS0cxdlpIVnNaU3dnYlc5a2RXeGxMbVY0Y0c5eWRITXNJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThwTzF4dVhHNWNkQzh2SUZKbGRIVnliaUIwYUdVZ1pYaHdiM0owY3lCdlppQjBhR1VnYlc5a2RXeGxYRzVjZEhKbGRIVnliaUJ0YjJSMWJHVXVaWGh3YjNKMGN6dGNibjFjYmx4dUlpd2lMeThnWjJWMFJHVm1ZWFZzZEVWNGNHOXlkQ0JtZFc1amRHbHZiaUJtYjNJZ1kyOXRjR0YwYVdKcGJHbDBlU0IzYVhSb0lHNXZiaTFvWVhKdGIyNTVJRzF2WkhWc1pYTmNibDlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMTh1YmlBOUlDaHRiMlIxYkdVcElEMCtJSHRjYmx4MGRtRnlJR2RsZEhSbGNpQTlJRzF2WkhWc1pTQW1KaUJ0YjJSMWJHVXVYMTlsYzAxdlpIVnNaU0EvWEc1Y2RGeDBLQ2tnUFQ0Z0tHMXZaSFZzWlZzblpHVm1ZWFZzZENkZEtTQTZYRzVjZEZ4MEtDa2dQVDRnS0cxdlpIVnNaU2s3WEc1Y2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVaQ2huWlhSMFpYSXNJSHNnWVRvZ1oyVjBkR1Z5SUgwcE8xeHVYSFJ5WlhSMWNtNGdaMlYwZEdWeU8xeHVmVHNpTENJdkx5QmtaV1pwYm1VZ1oyVjBkR1Z5SUdaMWJtTjBhVzl1Y3lCbWIzSWdhR0Z5Ylc5dWVTQmxlSEJ2Y25SelhHNWZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbVFnUFNBb1pYaHdiM0owY3l3Z1pHVm1hVzVwZEdsdmJpa2dQVDRnZTF4dVhIUm1iM0lvZG1GeUlHdGxlU0JwYmlCa1pXWnBibWwwYVc5dUtTQjdYRzVjZEZ4MGFXWW9YMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTV2S0dSbFptbHVhWFJwYjI0c0lHdGxlU2tnSmlZZ0lWOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVieWhsZUhCdmNuUnpMQ0JyWlhrcEtTQjdYRzVjZEZ4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnYTJWNUxDQjdJR1Z1ZFcxbGNtRmliR1U2SUhSeWRXVXNJR2RsZERvZ1pHVm1hVzVwZEdsdmJsdHJaWGxkSUgwcE8xeHVYSFJjZEgxY2JseDBmVnh1ZlRzaUxDSmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbWNnUFNBb1puVnVZM1JwYjI0b0tTQjdYRzVjZEdsbUlDaDBlWEJsYjJZZ1oyeHZZbUZzVkdocGN5QTlQVDBnSjI5aWFtVmpkQ2NwSUhKbGRIVnliaUJuYkc5aVlXeFVhR2x6TzF4dVhIUjBjbmtnZTF4dVhIUmNkSEpsZEhWeWJpQjBhR2x6SUh4OElHNWxkeUJHZFc1amRHbHZiaWduY21WMGRYSnVJSFJvYVhNbktTZ3BPMXh1WEhSOUlHTmhkR05vSUNobEtTQjdYRzVjZEZ4MGFXWWdLSFI1Y0dWdlppQjNhVzVrYjNjZ1BUMDlJQ2R2WW1wbFkzUW5LU0J5WlhSMWNtNGdkMmx1Wkc5M08xeHVYSFI5WEc1OUtTZ3BPeUlzSWw5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWJ5QTlJQ2h2WW1vc0lIQnliM0FwSUQwK0lDaFBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHd29iMkpxTENCd2NtOXdLU2tpTENJdkx5QmtaV1pwYm1VZ1gxOWxjMDF2WkhWc1pTQnZiaUJsZUhCdmNuUnpYRzVmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5JZ1BTQW9aWGh3YjNKMGN5a2dQVDRnZTF4dVhIUnBaaWgwZVhCbGIyWWdVM2x0WW05c0lDRTlQU0FuZFc1a1pXWnBibVZrSnlBbUppQlRlVzFpYjJ3dWRHOVRkSEpwYm1kVVlXY3BJSHRjYmx4MFhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnVTNsdFltOXNMblJ2VTNSeWFXNW5WR0ZuTENCN0lIWmhiSFZsT2lBblRXOWtkV3hsSnlCOUtUdGNibHgwZlZ4dVhIUlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvWlhod2IzSjBjeXdnSjE5ZlpYTk5iMlIxYkdVbkxDQjdJSFpoYkhWbE9pQjBjblZsSUgwcE8xeHVmVHNpTENKcGJYQnZjblFnSjNKbFpteGxZM1F0YldWMFlXUmhkR0VuTzF4dVhHNHZMeUJsZUhCdmNuUWdLaUJtY205dElDY3VMME52Ym1acFp5YzdYRzVsZUhCdmNuUWdLaUJtY205dElDY3VMMFJwYzNCaGRHTm9aWEluTzF4dVpYaHdiM0owSUNvZ1puSnZiU0FuTGk5R2IzVnVaR0YwYVc5dUp6dGNibVY0Y0c5eWRDQXFJR1p5YjIwZ0p5NHZTSFIwY0NjN1hHNWxlSEJ2Y25RZ0tpQm1jbTl0SUNjdUwxTjBjbVZoYlhNbk8xeHVaWGh3YjNKMElDb2dabkp2YlNBbkxpOVRkWEJ3YjNKMEp6dGNibVY0Y0c5eWRDQXFJR1p5YjIwZ0p5NHZkSGx3WlhNbk8xeHVYRzVjYm1WNGNHOXlkQ0FxSUdaeWIyMGdKeTR2WlhoaGJYQnNaWE1uTzF4dUlsMHNJbTVoYldWeklqcGJYU3dpYzI5MWNtTmxVbTl2ZENJNklpSjkiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtBcHBTZXJ2aWNlUHJvdmlkZXJ9IGZyb20gJy4vc3JjL0FwcFNlcnZpY2VQcm92aWRlcic7XG5cbmltcG9ydCAnYWxwaW5lanMnO1xuXG5cbmNvbnN0IHRlc3QgPSB0cnVlO1xuXG5leHBvcnQge0FwcFNlcnZpY2VQcm92aWRlciwgdGVzdH1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==