/*  =========================================================================
    APPLICATION -> POLYFILL -> ELEMENT PROTOTYPE MATCHES
    ========================================================================= */

/**
 * Element.prototype.matches polyfill.
 * @credit Mozilla Developer Network (MDN) <https://developer.mozilla.org/en-US/docs/Web/API/Element/matches>
 */
(function() {
    if (!Element.prototype.matches) {
        console.info('Polyfill: Element.prototype.matches');

        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
})();
