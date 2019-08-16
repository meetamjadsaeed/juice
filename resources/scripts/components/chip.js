/*  ========================================================================
    JUICE -> COMPONENTS -> CHIP
    ========================================================================  */

;(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Chip';

    // Check if instantiation should be via amd, commonjs or the browser
    if (typeof define === 'function' && define.amd) {
        define([], factory(plugin_name));
    } else if (typeof exports === 'object') {
        module.exports = factory(plugin_name);
    } else {
        root[plugin_name] = factory(plugin_name);
    }
}((window || module || {}), function(plugin_name) {
    // Use strict mode
    'use strict';

    // Create an empty plugin object
    const plugin = {};

    // Set the plugin defaults
    const defaults = {
        animation: true,
        animationClass: 'has-animation',
        animationRemove: 'fade-out',

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
    };

    /**
     * Constructor.
     * @param  {element}  element  The initialized element.
     * @param  {object}   options  The plugin options.
     * @return {void}
     */
    function Plugin(element, options) {
        // Set the plugin object
        plugin.this = this;
        plugin.name = plugin_name;
        plugin.element = element;
        plugin.defaults = defaults;
        plugin.options = options;
        plugin.settings = Object.assign({}, defaults, options);

        // Initialize the plugin
        plugin.this.initialize();
    }

    /**
     * Event handler to remove a chip when the chip remove is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickRemoveEventHandler = (event) => {
        // Prevent the default action
        event.preventDefault();

        // Set the remove and chip
        const $remove = event.currentTarget;
        const $chip = $remove.closest('.chip');

        // Remove the chip
        plugin.this.remove($chip);
    };

    /**
     * Public variables and methods.
     * @type {object}
     */
    Plugin.prototype = {
        /**
         * Initialize the plugin.
         * @param  {bool}  silent  Suppress callbacks.
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

            // Check if any chips exist
            if ($chips) {
                // Cycle through all of the chips
                $chips.forEach(($chip) => {
                    // Set the remove
                    const $remove = $chip.querySelector('.js-chip-remove');

                    // Check if the remove exists
                    if ($remove) {
                        // Add a click event handler to the remove to remove the chip
                        $remove.addEventListener('click', clickRemoveEventHandler);
                    }
                });
            }

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * Remove a chip.
         * @param  {element}  $chip   The chip.
         * @param  {bool}     silent  Suppress callbacks.
         * @return {void}
         */
        remove: ($chip, silent = false) => {
            // Check if the chip exists and isn't animating out
            if ($chip && !$chip.classList.contains('is-animating-out')) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the remove before callback
                    plugin.settings.callbackRemoveBefore.call();
                }

                // Check if the chip is animated
                if (plugin.settings.animation) {
                    // Set the chip remove animation
                    const remove_animation = $chip.dataset.chipAnimationRemove || plugin.settings.animationRemove;

                    // Set the chip animation classes
                    $chip.classList.add('is-animating-out', plugin.settings.animationClass, remove_animation);

                    // Add an animation end event listener to the chip
                    $chip.addEventListener('animationend', () => {
                        // Remove the chip
                        $chip.remove();

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
                    $chip.remove();

                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the remove after callback
                        plugin.settings.callbackRemoveAfter.call();
                    }
                }
            }
        },

        /**
         * Refresh the plugins initialization.
         * @param  {bool}  silent  Suppress callbacks.
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
         * Destroy an existing initialization.
         * @param  {bool}  silent  Suppress callbacks.
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

            // Check if any chips exist
            if ($chips) {
                // Cycle through all of the chips
                $chips.forEach(($chip) => {
                    // Set the remove
                    const $remove = $chip.querySelector('.js-chip-remove');

                    // Check if the remove exists
                    if ($remove) {
                        // Remove the click event handler from the remove
                        $remove.removeEventListener('click', clickRemoveEventHandler);
                    }
                });
            }

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy after callback
                plugin.settings.callbackDestroyAfter.call();
            }
        },

        /**
         * Call the remove method silently.
         * @param  {element}  $chip   The chip.
         * @return {void}
         */
        removeSilently: ($chip) => {
            // Call the remove method silently
            plugin.this.remove($chip, true);
        },

        /**
         * Call the refresh method silently.
         * @return {void}
         */
        refreshSilently: () => {
            // Call the refresh method silently
            plugin.this.refresh(true);
        },

        /**
         * Call the destroy method silently.
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
