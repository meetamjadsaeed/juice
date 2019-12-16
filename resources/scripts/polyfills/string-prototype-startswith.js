/*  =========================================================================
    APPLICATION -> POLYFILL -> STRING PROTOTYPE STARTSWITH
    ========================================================================= */

/**
 * String.prototype.startsWith polyfill.
 * @credit Mozilla Developer Network (MDN) <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith>
 */
(function() {
    if (!String.prototype.startsWith) {
        console.info('Polyfill: String.prototype.startsWith');

        Object.defineProperty(String.prototype, 'startsWith', {
            value: function(search, rawPos) {
                var pos = rawPos > 0 ? rawPos|0 : 0;
                return this.substring(pos, pos + search.length) === search;
            }
        });
    }
})();
