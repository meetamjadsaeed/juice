/*  =========================================================================
    APPLICATION -> POLYFILL -> ELEMENT PROTOTYPE REMOVE
    ========================================================================= */

/**
 * Element.prototype.remove polyfill.
 * @credit Mozilla Developer Network (MDN) <https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove>
 */
(function(arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('remove')) {
            return;
        }

        console.info('Polyfill: Element.prototype.remove');

        Object.defineProperty(item, 'remove', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function remove() {
                if (this.parentNode === null) {
                    return;
                }

                this.parentNode.removeChild(this);
            }
        });
    });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
