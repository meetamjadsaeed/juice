/*  ========================================================================
    JUICE -> COMPONENTS -> TOAST
    ========================================================================  */

;(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Toast';

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
        action: true,
        actionContent: '<button type="button" class="button--component js-toast-action">ACTION</button>',
        animation: true,
        animationClass: 'has-animation',
        animationIn: 'fade-in-right',
        animationOut: 'fade-out-left',
        container: '.toast-group',
        duration: 8000,
        feedback: null,
        text: 'Lorem ipsum...',

        callbackInitializeBefore: () => {
            console.log('Toast: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Toast: callbackInitializeAfter');
        },
        callbackOpenBefore: function() {
            console.log('Toast: callbackOpenBefore');
        },
        callbackOpenAfter: function() {
            console.log('Toast: callbackOpenAfter');
        },
        callbackCloseBefore: function() {
            console.log('Toast: callbackCloseBefore');
        },
        callbackCloseAfter: function() {
            console.log('Toast: callbackCloseAfter');
        },
        callbackRefreshBefore: () => {
            console.log('Toast: callbackRefreshBefore');
        },
        callbackRefreshAfter: () => {
            console.log('Toast: callbackRefreshAfter');
        },
        callbackDestroyBefore: () => {
            console.log('Toast: callbackDestroyBefore');
        },
        callbackDestroyAfter: () => {
            console.log('Toast: callbackDestroyAfter');
        },

        callbackAction: function() {
            console.log('Toast: callbackAction');
        }
    };

    /**
     * Constructor.
     * @param  {object}  options  The plugin options.
     * @return {void}
     */
    function Plugin(options) {
        // Set the plugin object
        plugin.this = this;
        plugin.name = plugin_name;
        plugin.defaults = defaults;
        plugin.options = options;
        plugin.settings = Object.assign({}, defaults, options);

        // Initialize the plugin
        plugin.this.initialize();
    }

    /**
     * Build a toast.
     * @return {node}  The toast.
     */
    const buildToast = () => {
        // Create the toast
        const $toast = document.createElement('div');
        const $text = document.createElement('div');

        // Construct the toast
        $toast.append($text);
        $text.insertAdjacentHTML('beforeend', plugin.settings.text);

        // Add the toast classes
        $toast.classList.add('toast');
        $text.classList.add('toast__text');

        // Check if the action exists
        if (plugin.settings.action) {
            // Create the action
            const $action = document.createElement('div');

            // Construct the action
            $action.classList.add('toast__action');
            $action.insertAdjacentHTML('beforeend', plugin.settings.actionContent);
            $toast.append($action);

            // Set the js action
            const $js_action = $action.querySelector('.js-toast-action');

            // Check if a js action exists
            if ($js_action) {
                // Add a click event handler to the js action to trigger the action callback
                $js_action.addEventListener('click', clickActionEventListener);
            }
        }

        // Check if a feedback modifier exists
        if (plugin.settings.feedback) {
            // Add the feedback modifier class to the toast
            $toast.classList.add(`has-${plugin.settings.feedback}`);
        }

        // Return the toast
        return $toast;
    };

    /**
     * Event handler to trigger the action callback when the action button is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickActionEventListener = (event) => {
        // Prevent the default action
        event.preventDefault();

        // Call the action callback
        plugin.settings.callbackAction.call();
    }

    /**
     * Close a toast.
     * @param  {node}  $container  The container.
     * @param  {node}  $toast      The toast.
     * @param  {bool}  silent      Suppress callbacks.
     * @return {void}
     */
    const closeToast = ($container, $toast, silent = false) => {
        // Check if the callbacks should not be suppressed
        if (!silent) {
            // Call the close before callback
            plugin.settings.callbackCloseBefore.call();
        }

        // Check if the toast is animated
        if (plugin.settings.animation) {
            // Set the content animation classes
            $toast.classList.add('is-animating-out', plugin.settings.animationClass, plugin.settings.animationOut);

            // Add an animation end event listener to the content
            $toast.addEventListener('animationend', (event) => {
                // Remove the toast
                $toast.remove();

                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the close after callback
                    plugin.settings.callbackCloseAfter.call();
                }
            }, {
                once: true
            });
        } else {
            // Remove the toast
            $toast.remove();

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the close after callback
                plugin.settings.callbackCloseAfter.call();
            }
        }
    };

    /**
     * Open a toast.
     * @param  {node}  $container  The container.
     * @param  {bool}  silent      Suppress callbacks.
     * @return {void}
     */
    const openToast = ($container, silent = false) => {
        // Check if the callbacks should not be suppressed
        if (!silent) {
            // Call the open before callback
            plugin.settings.callbackOpenBefore.call(silent);
        }

        // Built the toast
        const $toast = buildToast();

        // Append the toast to the container
        $container.append($toast);

        // Check if the toast is animated
        if (plugin.settings.animation) {
            // Set the content animation classes
            $toast.classList.add('is-animating-in', plugin.settings.animationClass, plugin.settings.animationIn);

            // Add an animation end event listener to the content
            $toast.addEventListener('animationend', (event) => {
                // Set the the content animation classes
                $toast.classList.remove('is-animating-in', plugin.settings.animationClass, plugin.settings.animationIn);
                $toast.classList.add('has-animated');

                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the open after callback
                    plugin.settings.callbackOpenAfter.call(silent);
                }

                // Start a timer
                setTimeout(() => {
                    // Close the toast
                    closeToast($container, $toast, silent);
                }, plugin.settings.duration);
            }, {
                once: true
            });
        } else {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the open after callback
                plugin.settings.callbackOpenAfter.call(silent);
            }

            // Start a timer
            setTimeout(() => {
                // Close the toast
                closeToast($container, $toast, silent);
            }, plugin.settings.duration);
        }
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

            // Set the container
            const $container = document.querySelector(plugin.settings.container);

            // Check if the container exists
            if ($container) {
                // Open the toast
                openToast($container);
            }

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
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

            // Check if the callbacks should not be suppressed.
            if (!silent) {
                // Call the destroy after callback
                plugin.settings.callbackDestroyAfter.call();
            }
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
