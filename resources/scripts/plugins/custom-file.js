/*  ========================================================================
    JUICE -> COMPONENTS -> CUSTOM FILE
    ========================================================================  */

;(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'CustomFile';

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
        callbackInitializeBefore: () => {
            console.log('Custom File: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Custom File: callbackInitializeAfter');
        },
        callbackChangeBefore: () => {
            console.log('Custom File: callbackChangeBefore');
        },
        callbackChangeAfter: () => {
            console.log('Custom File: callbackChangeAfter');
        },
        callbackRefreshBefore: () => {
            console.log('Custom File: callbackRefreshBefore');
        },
        callbackRefreshAfter: () => {
            console.log('Custom File: callbackRefreshAfter');
        },
        callbackDestroyBefore: () => {
            console.log('Custom File: callbackDestroyBefore');
        },
        callbackDestroyAfter: () => {
            console.log('Custom File: callbackDestroyAfter');
        }
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
     * Event handler to update the custom file input on change.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const changeInputEventHandler = (event) => {
        // Set the custom file elements
        const $input = event.target;
        const $container = $input.closest('.custom-file');

        // Update the custom file text
        plugin.this.update($container);
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

            // Set the custom files inputs
            const $custom_files = document.querySelectorAll(plugin.element + ' input');

            // Cycle through all of the custom file inputs
            $custom_files.forEach(($custom_file) => {
                // Add a change event handler to the custom file input to update the custom file text
                $custom_file.addEventListener('change', changeInputEventHandler);
            });

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * Update the custom file text.
         * @param   {element}  $custom_file  The custom file container.
         * @param   {boolean}  silent        Suppress callbacks.
         * @return  {void}
         */
        update: ($custom_file, silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the change before callback
                plugin.settings.callbackChangeBefore.call();
            }

            // Set the custom file elements
            const $input = $custom_file.querySelector('input');
            const $button = $custom_file.querySelector('.custom-file__button');
            const $text = $custom_file.querySelector('.custom-file__text');

            // Start a switch statement for the following true values
            switch (true) {
                // Multiple files
                case $input.files.length > 1:
                    // Set the text and break the switch
                    $text.textContent = $input.files.length + ' files selected';
                    break;

                // Single file
                case $input.files.length == 1:
                    // Set the text and break the switch
                    $text.textContent = $input.files[0].name;
                    break;

                // Empty
                case $input.files.length == 1:
                    // Set the text and break the switch
                    $text.textContent = $container.dataset.customFileText || '';
                    break;
            }

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the change after callback
                plugin.settings.callbackChangeAfter.call();
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

            // Set the custom files inputs
            const $custom_files = document.querySelectorAll(plugin.element + ' input');

            // Cycle through all of the custom file inputs
            $custom_files.forEach(($custom_file) => {
                // Remove the change event handler from the custom file input
                $custom_file.removeEventListener('change', changeInputEventHandler);
            });

            // Check if the callbacks should not be suppressed
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
