/*  =========================================================================
    APPLICATION -> POLYFILL -> STRING PROTOTYPE INCLUDES
    ========================================================================= */

/**
 * String.prototype.includes polyfill.
 * @credit Mozilla Developer Network (MDN) <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes>
 */
(function() {
    if (!String.prototype.includes) {
        console.info('Polyfill: String.prototype.includes');

        String.prototype.includes = function(search, start) {
            'use strict';

            if (search instanceof RegExp) {
                throw TypeError('first argument must not be a RegExp');
            }

            if (start === undefined) {
                start = 0;
            }

            return this.indexOf(search, start) !== -1;
          };
    }
})();
