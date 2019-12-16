/*  =========================================================================
    APPLICATION -> POLYFILL -> NODELIST PROTOTYPE FOREACH
    ========================================================================= */

/**
 * NodeList.prototype.forEach polyfill.
 * @credit Mozilla Developer Network (MDN) <https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach>
 */
(function() {
    if ('NodeList' in window && !NodeList.prototype.forEach) {
        console.info('Polyfill: NodeList.prototype.forEach');

        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;

            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }
})();
