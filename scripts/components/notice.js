'use strict';

/* =============================================================================================
   JUICE -> COMPONENTS -> NOTICE
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'notice';

    // Set the plugin defaults
    const defaults = {
        removeAnimation: 'fadeOut'
    };

    /**
     * Constructor
     * @param  {element}  element  The target element
     * @param  {object}   options  The plugin options
     * @return {void}
     */
    function Plugin(element, options) {
        // Store the plugin defaults, element and settings
        this._defaults = defaults;
        this._name = pluginName;
        this.element = element;
        this.settings = $.extend({}, defaults, options);

        // Initialize the plugin
        this.initialize();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        /**
         * Initialize the plugin
         * @return {void}
         */
        initialize() {
            // Set the notice element
            const $notice = $(this.element);

            // Add a click event handler to remove a notice
            $('.js-notice-remove', this.element).on('click', () => {
                // Set the remove settings
                const settings = {
                    'animation': $notice.data('notice-remove-animation') || this.settings.removeAnimation
                };

                // Remove the notice
                this.remove($notice, settings);
            });
        },

        /**
         * Remove a notice
         * @param  {element}  $notice   The notice element
         * @param  {object}   settings  The plugin/user settings
         * @return {void}
         */
        remove($notice, settings) {
            // Check if the animation is not set to none
            if (settings.animation != 'none') {
                // Add the animation classe to the notice and check when the animation has ended
                $notice.addClass(`animated ${settings.animation}`).one('animationend', () => {
                    // Remove the notice
                    $notice.remove();
                });
            } else {
                // Remove the notice
                $notice.remove();
            }
        },
    });

    /**
     * Plugin wrapper around the constructor to prevent against multiple instantiations
     * @param  {object}   options  The plugin options
     * @return {element}           The target element
     */
    $.fn[pluginName] = function(options) {
        // Return each element
        return this.each(function() {
            // Check the plugin does not exist in the elements data
            if (!$.data(this, `plugin_${pluginName}`)) {
                // Create a new instance of the plugin and assign it to the elements data
                $.data(this, `plugin_${pluginName}`, new Plugin(this, options));
            }
        });
    };
}))(jQuery, window, document);
