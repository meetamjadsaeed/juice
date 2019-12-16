/*  =========================================================================
    APPLICATION -> POLYFILL -> ELEMENT PROTOTYPE DATASET
    ========================================================================= */

/* eslint-env browser */

/**
 * Element.prototype.dataset polyfill.
 * @author Mark Milstein <mark@epiloque.com>
 * @credit Brett Zamir <https://github.com/brettz9>
 * @credit Eli Grey <https://github.com/eligrey>
 */
if (!document.documentElement.dataset && (!Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'dataset') || !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'dataset').get)) {
    console.info('Polyfill: Element.prototype.dataset');

    const descriptor = {}

    descriptor.enumerable = true

    descriptor.get = function get () {
        const element = this
        const map = {}
        const attributes = this.attributes

        function toUpperCase (n0) {
            return n0.charAt(1).toUpperCase()
        }

        function getter () {
            return this.value
        }

        function setter (name, value) {
            if (typeof value !== 'undefined') {
                this.setAttribute(name, value)
            } else {
                this.removeAttribute(name)
            }
        }

        for (let i = 0; i < attributes.length; i += 1) {
            const attribute = attributes[i]

            if (attribute && attribute.name && (/^data-\w[\w-]*$/).test(attribute.name)) {
                const name = attribute.name
                const value = attribute.value

                const propName = name.substr(5).replace(/-./g, toUpperCase)

                Object.defineProperty(map, propName, {
                    enumerable: descriptor.enumerable,
                    get: getter.bind({ value: value || '' }),
                    set: setter.bind(element, name)
                })
            }
        }

        return map
    }

    Object.defineProperty(HTMLElement.prototype, 'dataset', descriptor)
}
