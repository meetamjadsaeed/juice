/*  =========================================================================
    APPLICATION -> POLYFILL -> ELEMENT PROTOTYPE APPEND
    ========================================================================= */

/*
 * Element.prototype.append polyfill.
 * @credit Mozilla Developer Network (MDN) <https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append>
 */
(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('append')) {
            return;
        }

        switch(item) {
            case (Element.prototype):
                console.info('Polyfill: Element.prototype.append');
                break;

            case (Document.prototype):
                console.info('Polyfill: Document.prototype.append');
                break;

            case (DocumentFragment.prototype):
                console.info('Polyfill: DocumentFragment.prototype.append');
                break;
        }

        Object.defineProperty(item, 'append', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function append() {
                var argArr = Array.prototype.slice.call(arguments),

                docFrag = document.createDocumentFragment();

                argArr.forEach(function (argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.appendChild(docFrag);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);
