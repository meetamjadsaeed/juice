'use strict';

/* =============================================================================================
   JUICE -> COMPONENTS -> CHIP
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'chip';

    // Set the plugin defaults
    const defaults = {
        removeAnimation: 'zoomOut'
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
            // Set the chip element
            const $chip = $(this.element);

            // Add a click event handler to remove a chip
            $(document).on('click', '.js-chip-remove', (event) => {
                // Set the chip element
                const $chip = $(event.currentTarget).parents('.chip');

                // Remove the chip
                this.remove($chip);
            });
        },

        /**
         * Remove a chip
         * @param  {element}  $chip  The chip element
         * @return {void}
         */
        remove($chip) {
            // Set the chip remove animation
            const removeAnimation = $chip.data('chip-remove-animation') || this.settings.removeAnimation;

            // Check if the remove animation is set
            if (removeAnimation && removeAnimation != 'none') {
                // Add the animation classe to the chip and check when the animation has ended
                $chip.addClass(`animated ${removeAnimation}`).on('animationend', () => {
                    // Remove the chip
                    $chip.remove();
                });
            } else {
                // Remove the chip
                $chip.remove();
            }
        }
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
