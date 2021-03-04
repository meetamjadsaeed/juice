(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Notice';

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

        callbackDestroyBefore: () => {},
        callbackDestroyAfter: () => {},
        callbackInitializeBefore: () => {},
        callbackInitializeAfter: () => {},
        callbackRefreshBefore: () => {},
        callbackRefreshAfter: () => {},
        callbackRemoveBefore: () => {},
        callbackRemoveAfter: () => {}
    };

    /**
     * Constructor.
     *
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
     * Click event handler to remove a notice.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickNoticeRemoveEventHandler = (event) => {
        // Check if the event target is the remove or a descendant of the remove
        if (isTargetSelector(event.target, 'class', 'js-notice-remove')) {
            // Prevent the default action
            event.preventDefault();

            // Set the remove and notice
            const $remove = event.target;
            const $notice = $remove.closest('.notice');

            // Remove the notice
            plugin.this.remove($notice);
        }
    };

    /**
     * Check if an event target is a target selector or a descendant of a target selector.
     *
     * @param  {element}  target     The event target.
     * @param  {string}   attribute  The event target attribute to check.
     * @param  {string}   selector   The id/class selector.
     * @return {bool}                True if event target, false otherwise.
     */
    const isTargetSelector = (target, attribute, selector) => {
        // Check if the target is an element node
        if (target.nodeType !== Node.ELEMENT_NODE) {
            // Return false
            return false;
        }

        // Start a switch statement for the attribute
        switch (attribute) {
            // Default
            default:
                // Return false
                return false;

            // Class
            case 'class': {
                // Return true if event target, false otherwise
                return ((target.classList.contains(selector)) || target.closest(`.${selector}`));
            }

            // Id
            case 'id': {
                // Return true if event target, false otherwise
                return ((target.id == selector) || target.closest(`#${selector}`));
            }
        }
    };

    /**
     * Public variables and methods.
     *
     * @type {object}
     */
    Plugin.prototype = {
        /**
         * Destroy an existing initialization.
         *
         * @param  {bool}  silent  Suppress callbacks.
         * @return {void}
         */
        destroy: (silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy before callback
                plugin.settings.callbackDestroyBefore.call();
            }

            // Remove the click event handler from the notice
            document.removeEventListener('click', clickNoticeRemoveEventHandler);

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy after callback
                plugin.settings.callbackDestroyAfter.call();
            }
        },

        /**
         * Call the destroy method silently.
         *
         * @return {void}
         */
        destroySilently: () => {
            // Call the destroy method silently
            plugin.this.destroy(true);
        },

        /**
         * Initialize the plugin.
         *
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

            // Add a click event handler to the notice
            document.addEventListener('click', clickNoticeRemoveEventHandler);

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * Refresh the plugins initialization.
         *
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
         * Call the refresh method silently.
         *
         * @return {void}
         */
        refreshSilently: () => {
            // Call the refresh method silently
            plugin.this.refresh(true);
        },

        /**
         * Remove a notice.
         *
         * @param  {element}  $notice  The notice.
         * @param  {bool}     silent   Suppress callbacks.
         * @return {void}
         */
        remove: ($notice, silent = false) => {
            // Check if the notice exists and isn't animating out
            if ($notice && !$notice.classList.contains('is-animating-out')) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the remove before callback
                    plugin.settings.callbackRemoveBefore.call();
                }

                // Check if the notice is animated
                if (plugin.settings.animation) {
                    // Set the notice remove animation
                    const remove_animation = $notice.dataset.noticeAnimationRemove || plugin.settings.animationRemove;

                    // Set the notice animation classes
                    $notice.classList.add('is-animating-out', plugin.settings.animationClass, remove_animation);

                    // Add an animation end event handler to the notice
                    $notice.addEventListener('animationend', () => {
                        // Remove the notice
                        $notice.remove();

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
                    $notice.remove();

                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the remove after callback
                        plugin.settings.callbackRemoveAfter.call();
                    }
                }
            }
        },

        /**
         * Call the remove method silently.
         *
         * @param  {element}  $notice  The notice.
         * @return {void}
         */
        removeSilently: ($notice) => {
            // Call the remove method silently
            plugin.this.remove($notice, true);
        },
    };

    // Return the plugin
    return Plugin;
}));
