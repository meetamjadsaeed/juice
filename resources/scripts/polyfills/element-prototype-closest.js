/*  =========================================================================
    APPLICATION -> POLYFILL -> ELEMENT PROTOTYPE CLOSEST
    ========================================================================= */

/**
 * Element.prototype.closest polyfill.
 * @credit Mozilla Developer Network (MDN) <https://developer.mozilla.org/en-US/docs/Web/API/Element/closest>
 */
(function() {
    if (!Element.prototype.closest) {
        console.info('Polyfill: Element.prototype.closest');

        Element.prototype.closest = function (s) {
            var el = this;

            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);

            return null;
        };
    }
})();
