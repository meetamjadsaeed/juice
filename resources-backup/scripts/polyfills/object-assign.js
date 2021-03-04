/*  =========================================================================
    APPLICATION -> POLYFILL -> OBJECT ASSIGN
    ========================================================================= */

/**
 * Object.assign polyfill.
 * @credit Mozilla Developer Network (MDN) <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign>
 */
(function() {
    if (typeof Object.assign !== 'function') {
        console.info('Polyfill: Object.assign');

        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) {
                'use strict';

                if (target === null || target === undefined) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource !== null && nextSource !== undefined) {
                        for (var nextKey in nextSource) {
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }

                return to;
            },
            writable: true,
            configurable: true
        });
    }
})();
