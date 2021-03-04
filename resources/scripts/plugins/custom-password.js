(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'CustomPassword';

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
        action: 'click',

        callbackDestroyBefore: () => {},
        callbackDestroyAfter: () => {},
        callbackHideBefore: () => {},
        callbackHideAfter: () => {},
        callbackInitializeBefore: () => {},
        callbackInitializeAfter: () => {},
        callbackRefreshBefore: () => {},
        callbackRefreshAfter: () => {},
        callbackShowBefore: () => {},
        callbackShowAfter: () => {}
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
     * Event handler to toggle a password when the custom password trigger is clicked.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickTriggerEventHandler = (event) => {
        // Prevent the default action
        event.preventDefault();

        // Set the custom password container and input
        const $container = event.target.closest('.custom-password');
        const $input = $container.querySelector('input');

        // Check if the input is a password input
        ($input.getAttribute('type') == 'password'
            ? plugin.this.show($input)
            : plugin.this.hide($input)
        );
    };

    /**
     * Event handler to hide a password for various actions.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const hideEventHandler = (event) => {
        // Set the custom password container and input
        const $container = event.target.closest('.custom-password');
        const $input = $container.querySelector('input');

        // Check if the container has the active state hook
        if ($container.classList.contains('is-active')) {
            // Hide the password
            plugin.this.hide($input);
        }
    };

    /**
     * Event handler to prevent the default behavior.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const preventDefaultEventHandler = (event) => {
        // Prevent the default behavior
        event.preventDefault();
    };

    /**
     * Event handler to show a password for various actions.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const showEventHandler = (event) => {
        // Set the custom password container and input
        const $container = event.target.closest('.custom-password');
        const $input = $container.querySelector('input');

        // Check if the container doesn't have the active state hook
        if (!$container.classList.contains('is-active')) {
            // Show the password
            plugin.this.show($input);
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

            // Set the containers
            const $containers = document.querySelectorAll(plugin.element);

            // Cycle through all of the containers
            $containers.forEach(($container) => {
                // Set the custom password trigger and input
                const $trigger = $container.querySelector('.js-custom-password-trigger');
                const $input = $container.querySelector('input');

                // Hide the password silently
                plugin.this.hideSilently($input);

                // Check if the action is set to hover and check if the html tag has the touch detection class
                const action = (plugin.settings.action == 'hover' && document.documentElement.classList.contains('has-touch')
                    ? 'click'
                    : plugin.settings.action
                );

                // Start a switch statement for the action
                switch (action) {
                    // Click
                    case 'click': {
                        // Remove the click event handler from the trigger and break the switch
                        $trigger.removeEventListener('click', clickTriggerEventHandler);
                        break;
                    }

                    // Hover
                    case 'hover': {
                        // Remove the click, mouseenter and mouseleave event handlers from the trigger and break the switch
                        $trigger.removeEventListener('click', preventDefaultEventHandler);
                        $trigger.removeEventListener('mouseenter', showEventHandler);
                        $trigger.removeEventListener('mouseleave', hideEventHandler);
                        break;
                    }

                    // Hold
                    case 'hold': {
                        // Remove the click, mousedown, mouseup and mouseleave event handlers from the custom password trigger and break the switch
                        $trigger.removeEventListener('click', preventDefaultEventHandler);
                        $trigger.removeEventListener('mousedown', showEventHandler);
                        $trigger.removeEventListener('mouseup', hideEventHandler);
                        $trigger.removeEventListener('mouseleave', hideEventHandler);
                        break;
                    }
                }
            });

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
         * Hide a password.
         *
         * @param  {element}  $input  The input.
         * @param  {bool}     silent  Suppress callbacks.
         * @return {void}
         */
        hide: ($input, silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the hide before callback
                plugin.settings.callbackHideBefore.call();
            }

            // Set the custom password container
            const $container = $input.closest('.custom-password');

            // Add the active state hook to the container
            $container.classList.remove('is-active');

            // Set the input attribute type to password
            $input.type = 'password';

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the hide after callback
                plugin.settings.callbackHideAfter.call();
            }
        },

        /**
         * Call the hide method silently.
         *
         * @param  {element}  $input  The input.
         * @return {void}
         */
        hideSilently: ($input) => {
            // Call the hide method silently
            plugin.this.hide($input, true);
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

            // Set the containers
            const $containers = document.querySelectorAll(plugin.element);

            // Cycle through all of the containers
            $containers.forEach(($container) => {
                // Set the custom password trigger and input
                const $trigger = $container.querySelector('.js-custom-password-trigger');
                const $input = $container.querySelector('input');

                // Hide the password silently
                plugin.this.hideSilently($input);

                // Check if the action is set to hover and check if the html tag has the touch detection class
                const action = (plugin.settings.action == 'hover' && document.documentElement.classList.contains('has-touch')
                    ? 'click'
                    : plugin.settings.action
                );

                // Start a switch statement for the action
                switch (action) {
                    // Click
                    case 'click': {
                        // Add a click event handler to the custom password trigger
                        $trigger.addEventListener('click', clickTriggerEventHandler);
                        break;
                    }

                    // Hover
                    case 'hover': {
                        // Add the click, mouseeneter and mouseleave event handlers to the custom password trigger
                        $trigger.addEventListener('click', preventDefaultEventHandler);
                        $trigger.addEventListener('mouseenter', showEventHandler);
                        $trigger.addEventListener('mouseleave', hideEventHandler);
                        break;
                    }

                    // Hold
                    case 'hold': {
                        // Add the click, mousedown, mouseup and mouseleave event handlers to the custom password trigger
                        $trigger.addEventListener('click', preventDefaultEventHandler);
                        $trigger.addEventListener('mousedown', showEventHandler);
                        $trigger.addEventListener('mouseup', hideEventHandler);
                        $trigger.addEventListener('mouseleave', hideEventHandler);
                        break;
                    }
                }
            });

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
         * Show a password.
         *
         * @param  {element}  $input  The input.
         * @param  {bool}     silent  Suppress callbacks.
         * @return {void}
         */
        show: ($input, silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the show before callback
                plugin.settings.callbackShowBefore.call();
            }

            // Set the custom password container
            const $container = $input.closest('.custom-password');

            // Add the active state hook to the container
            $container.classList.add('is-active');

            // Set the input attribute type to text
            $input.type = 'text';

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the show after callback
                plugin.settings.callbackShowAfter.call();
            }
        },

        /**
         * Call the show method silently.
         *
         * @param  {element}  $input  The input.
         * @return {void}
         */
        showSilently: ($input) => {
            // Call the show method silently
            plugin.this.show($input, true);
        }
    };

    // Return the plugin
    return Plugin;
}));
