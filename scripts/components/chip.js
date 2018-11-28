/* =============================================================================================
   JUICE -> COMPONENTS -> CHIP
   ============================================================================================= */

;(function (root, factory) {
    // Set the plugin name
    const pluginName = 'Chip';

    // Check if the plugin should be instantiated via AMD, CommonJS or the Browser
    if (typeof define === 'function' && define.amd) {
        define([], factory(pluginName));
    } else if (typeof exports === 'object') {
        module.exports = factory(pluginName);
    } else {
        root[pluginName] = factory(pluginName);
    }
}((window || module || {}), function(pluginName) {
    // Use strict mode
    'use strict';

    // Create an empty plugin object
    const plugin = {};

    // Set the plugin defaults
    const defaults = {
        callbackInitializeBefore: () => {
            console.log('Chip: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Chip: callbackInitializeAfter');
        },
        callbackRemoveBefore: () => {
            console.log('Chip: callbackRemoveBefore');
        },
        callbackRemoveAfter: () => {
            console.log('Chip: callbackRemoveAfter');
        },
        callbackRefreshBefore: () => {
            console.log('Chip: callbackRefreshBefore');
        },
        callbackRefreshAfter: () => {
            console.log('Chip: callbackRefreshAfter');
        },
        callbackDestroyBefore: () => {
            console.log('Chip: callbackDestroyBefore');
        },
        callbackDestroyAfter: () => {
            console.log('Chip: callbackDestroyAfter');
        },
        removeAnimation: 'fadeOut'
    };

    /**
     * Constructor
     * @param  {element}  element  The initialized element
     * @param  {object}   options  The plugin options
     * @return {void}
     */
    function Plugin(element, options) {
        // Set the plugin instance, name, element, default settings, user options and extended settings
        plugin.this = this;
        plugin.name = pluginName;
        plugin.element = element;
        plugin.defaults = defaults;
        plugin.options = options;
        plugin.settings = extendDefaults(defaults, options);

        // Initialize the plugin
        plugin.this.initialize();
    }

    /**
     * Merge the default plugin settings with the user options
     * @param  {object}  defaults  The default plugin settings
     * @param  {object}  options   The user options
     * @return {object}            The extended plugin settings
     */
    const extendDefaults = (defaults, options) => {
        // Cycle through the user options
        for (let property in options) {
            // Check if the property exists in the user options
            if (options.hasOwnProperty(property)) {
                // Set the property key value in the defaults object with the options property key value
                defaults[property] = options[property];
            }
        }

        // Return the extended plugin settings
        return defaults;
    };

    /**
     * Event handler to remove a chip when the chip remove is clicked
     * @param  {object}  event  The event object
     * @return {void}
     */
    const clickRemoveEventHandler = (event) => {
        // Set the chip remove
        const $remove = event.currentTarget;

        // Set the chip
        const $chip = $remove.closest('.chip');

        // Remove the chip
        plugin.this.remove($chip);
    };

    /**
     * Public variables and methods
     * @type {object}
     */
    Plugin.prototype = {
        /**
         * Initialize the plugin
         * @param  {bool}  silent  Suppress callbacks
         * @return {void}
         */
        initialize: (silent = false) => {
            // Destroy the existing initialization silently
            plugin.this.destroySilently();

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize before callback
                plugin.settings.callbackInitializeBefore.call();
            }

            // Set the chips
            const $chips = document.querySelectorAll(plugin.element);

            // Cycle through all of the chips
            $chips.forEach(($chip) => {
                // Set the chip remove
                const $remove = $chip.querySelector('.js-chip-remove');

                // Add a click event handler to the chip remove to remove the chip
                $remove.addEventListener('click', clickRemoveEventHandler);
            });

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * Remove a chip
         * @param  {element}  $chip  The chip
         * @param  {bool}     silent  Suppress callbacks
         * @return {void}
         */
        remove: ($chip, silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the remove before callback
                plugin.settings.callbackRemoveBefore.call();
            }

            // Set the chip remove animation
            const removeAnimation = $chip.dataset.chipRemoveAnimation || plugin.settings.removeAnimation;

            // Check if the remove animation is set
            if (removeAnimation && removeAnimation != 'none') {
                // Add the animating state hook to the chip
                $chip.classList.add('is-animating');

                // Add the animation classes to the chip
                $chip.classList.add('animated');
                $chip.classList.add(removeAnimation);

                // Add an animation end event listener to the chip
                $chip.addEventListener('animationend', () => {
                    // Remove the chip
                    $chip.parentNode.removeChild($chip);

                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the remove after callback
                        plugin.settings.callbackRemoveAfter.call();
                    }
                }, {
                    once: true
                });
            } else {
                // Remove the chip
                $chip.parentNode.removeChild($chip);

                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the remove after callback
                    plugin.settings.callbackRemoveAfter.call();
                }
            }
        },

        /**
         * Refresh the plugin by destroying an existing initialization and initializing again
         * @param  {bool}  silent  Suppress callbacks
         * @return {void}
         */
        refresh: (silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the refresh before callback
                plugin.settings.callbackRefreshBefore.call();
            }

            // Destroy the existing initialization
            plugin.this.destroy(silent);

            // Initialize the plugin
            plugin.this.initialize(silent);

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the refresh after callback
                plugin.settings.callbackRefreshAfter.call();
            }
        },

        /**
         * Destroy an existing initialization
         * @param  {bool}  silent  Suppress callbacks
         * @return {void}
         */
        destroy: (silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy before callback
                plugin.settings.callbackDestroyBefore.call();
            }

            // Set the chips
            const $chips = document.querySelectorAll(plugin.element);

            // Cycle through all of the chips
            $chips.forEach(($chip) => {
                // Set the chip remove
                const $remove = $chip.querySelector('.js-chip-remove');

                // Remove the click event handler from the chip remove
                $remove.removeEventListener('click', clickRemoveEventHandler);
            });

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy after callback
                plugin.settings.callbackDestroyAfter.call();
            }
        },

        /**
         * Call the remove method silently
         * @param  {element}  $chip   The chip
         * @return {void}
         */
        removeSilently: ($chip) => {
            // Call the remove method silently
            plugin.this.remove($chip, true);
        },

        /**
         * Call the refresh method silently
         * @return {void}
         */
        refreshSilently: () => {
            // Call the refresh method silently
            plugin.this.refresh(true);
        },

        /**
         * Call the destroy method silently
         * @return {void}
         */
        destroySilently: () => {
            // Call the destroy method silently
            plugin.this.destroy(true);
        }
    };

    // Return the plugin
    return Plugin;
}));
