'use strict';

/* =============================================================================================
   RUCKSACK -> COMPONENTS -> NOTICE
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin defaults
    const pluginName = 'notice';
    const defaults = {
        removeAnimation: 'fadeOut'
    };

    /**
     * Constructor
     * @param  {element}  element  The target element
     * @param  {array}    options  The plugin options
     * @return void
     */
    function Plugin(element, options) {
        // Store the plugin defaults, element and settings
        this._defaults = defaults;
        this._name = pluginName;
        this.element = element;
        this.settings = $.extend({}, defaults, options);

        // Call the initialize function
        this.initialize();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        /**
         * Initialize the plugin
         * @return void
         */
        initialize() {
            // Set the notice elements
            const $notice = $(this.element);

            // Check if the notice remove animation data attribute exists and set the remove animation
            this.settings.removeAnimation = ($notice.data('notice-remove-animation')
                ? $notice.data('notice-remove-animation')
                : this.settings.removeAnimation
            );

            // Add a click event handler to remove a notice
            $('.js-notice-remove', this.element).on('click', () => {
                // Check if the remove animation is not set to none
                if (this.settings.removeAnimation != 'none') {
                    // Add the remove animation class to the notice and check when the animation has ended
                    $notice.addClass(`animated ${this.settings.removeAnimation}`).one('animationend', () => {
                        // Remove the notice
                        $notice.remove();
                    });
                } else {
                    // Remove the notice
                    $notice.remove();
                }
            });
        }
    });

    /**
     * Plugin wrapper around the constructor to prevent against multiple instantiations
     * @param  {array}   options  The plugin options
     * @return {element}          The target element
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
