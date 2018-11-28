/* =============================================================================================
   JUICE -> COMPONENTS -> NOTICE
   ============================================================================================= */

;(function (root, factory) {
    // Set the plugin name
    const pluginName = 'Notice';

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
            console.log('Notice: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Notice: callbackInitializeAfter');
        },
        callbackRemoveBefore: () => {
            console.log('Notice: callbackRemoveBefore');
        },
        callbackRemoveAfter: () => {
            console.log('Notice: callbackRemoveAfter');
        },
        callbackRefreshBefore: () => {
            console.log('Notice: callbackRefreshBefore');
        },
        callbackRefreshAfter: () => {
            console.log('Notice: callbackRefreshAfter');
        },
        callbackDestroyBefore: () => {
            console.log('Notice: callbackDestroyBefore');
        },
        callbackDestroyAfter: () => {
            console.log('Notice: callbackDestroyAfter');
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
     * Event handler to remove a notice when the notice remove is clicked
     * @param  {object}  event  The event object
     * @return {void}
     */
    const clickRemoveEventHandler = (event) => {
        // Set the notice remove
        const $remove = event.currentTarget;

        // Set the notice
        const $notice = $remove.closest('.notice');

        // Remove the notice
        plugin.this.remove($notice);
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

            // Set the notices
            const $notices = document.querySelectorAll(plugin.element);

            // Cycle through all of the notices
            $notices.forEach(($notice) => {
                // Set the notice remove
                const $remove = $notice.querySelector('.js-notice-remove');

                // Add a click event handler to the notice remove to remove the notice
                $remove.addEventListener('click', clickRemoveEventHandler);
            });

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * Remove a notice
         * @param  {element}  $notice  The notice
         * @param  {bool}     silent   Suppress callbacks
         * @return {void}
         */
        remove: ($notice, silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the remove before callback
                plugin.settings.callbackRemoveBefore.call();
            }

            // Set the notice remove animation
            const removeAnimation = $notice.dataset.noticeRemoveAnimation || plugin.settings.removeAnimation;

            // Check if the remove animation is set
            if (removeAnimation && removeAnimation != 'none') {
                // Add the animating state hook to the notice
                $notice.classList.add('is-animating');

                // Add the animation classes to the notice
                $notice.classList.add('animated');
                $notice.classList.add(removeAnimation);

                // Add an animation end event listener to the notice
                $notice.addEventListener('animationend', () => {
                    // Remove the notice
                    $notice.parentNode.removeChild($notice);

                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the remove after callback
                        plugin.settings.callbackRemoveAfter.call();
                    }
                }, {
                    once: true
                });
            } else {
                // Remove the notice
                $notice.parentNode.removeChild($notice);

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

            // Set the notices
            const $notices = document.querySelectorAll(plugin.element);

            // Cycle through all of the notices
            $notices.forEach(($notice) => {
                // Set the notice remove
                const $remove = $notice.querySelector('.js-notice-remove');

                // Remove then click event handler from the notice remove
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
         * @param  {element}  $notice   The notice
         * @return {void}
         */
        removeSilently: ($notice) => {
            // Call the remove method silently
            plugin.this.remove($notice, true);
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
