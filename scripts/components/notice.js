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
        removeAnimation: 'fadeOut'
    };

    /**
     * Constructor
     * @param  {object}   options  The plugin options
     * @param  {element}  element  The initialized element
     * @return {void}
     */
    function Plugin(options, element) {
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
      * Remove a notice when the js notice remove element is clicked
      * @param  {object}  event  The event jobject
      * @return {void}
      */
     const removeClickEventHandler = (event) => {
         // Set the clicked element
         const $clicked = event.target;

         // Check if the clicked element contains the js notice remove class or is a child of the js notice remove element
         if ($clicked.classList.contains('js-notice-remove') || $clicked.closest('.js-notice-remove')) {
             // Set the notice element
             const $notice = $clicked.closest('.notice');

             // Remove the notice
             plugin.this.remove($notice);
         }
     }

    /**
     * Public variables and methods
     * @type {object}
     */
    Plugin.prototype = {
        /**
         * Initialize the plugin
         * @return {void}
         */
        initialize: () => {
            // Destroy the existing initialization
            plugin.this.destroy();

            // Set the notice elements
            const $notices = document.querySelectorAll(plugin.element);

            // Cycle through the notice elements
            $notices.forEach(($notice) => {
                // Add a click event handler to remove the notice element
                $notice.addEventListener('click', removeClickEventHandler);
            });
        },

        /**
         * Remove a notice
         * @param  {element}  $notice  The notice element
         * @return {void}
         */
        remove: ($notice) => {
            // Set the notice remove animation
            const removeAnimation = $notice.getAttribute('data-notice-remove-animation') || plugin.settings.removeAnimation;

            // Check if the remove animation is set
            if (removeAnimation && removeAnimation != 'none') {
                // Add the animation classes to the notice
                $notice.classList.add('animated');
                $notice.classList.add(removeAnimation);

                // Add an animationend event listener to the notice
                $notice.addEventListener('animationend', () => {
                    // Remove the notice
                    $notice.parentNode.removeChild($notice);
                });
            } else {
                // Remove the notice
                $notice.parentNode.removeChild($notice);
            }
        },

        /**
         * Refresh the plugin by destroying an existing initialization and initializing again
         * @return {void}
         */
        refresh: () => {
            // Destroy the existing initialization
            plugin.this.destroy();

            // Initialize the plugin
            plugin.this.initialize();
        },

        /**
         * Destroy an existing initialization
         * @return {void}
         */
        destroy: () => {
            // Set the notice elements
            const $notices = document.querySelectorAll(plugin.element);

            // Cycle through the notice elements
            $notices.forEach(($notice) => {
                // Remove a click event handler to remove the notice element
                $notice.removeEventListener('click', removeClickEventHandler);
            });
        }
    };

    // Return the plugin
    return Plugin;
}));

var notice = new Notice({
    removeAnimation: 'zoomOut'
}, '.notice');
