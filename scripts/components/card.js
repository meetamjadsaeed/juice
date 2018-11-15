'use strict';

/* =============================================================================================
   JUICE -> COMPONENTS -> CARD
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'card';

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
            // Add a click event handler to remove a card
            $(document).on('click', '.js-card-remove', (event) => {
                // Set the card element
                const $card = $(event.currentTarget).parents('.card');

                // Remove the card
                this.remove($card);
            });
        },

        /**
         * Remove a card
         * @param  {element}  $card  The card element
         * @return {void}
         */
        remove($card) {
            // Set the card remove animation
            const removeAnimation = $card.data('card-remove-animation') || this.settings.removeAnimation;

            // Check if the remove animation is set
            if (removeAnimation && removeAnimation != 'none') {
                // Add the animation class to the card and check when the animation has ended
                $card.addClass(`animated ${removeAnimation}`).one('animationend', () => {
                    // Remove the card
                    $card.remove();
                });
            } else {
                // Remove the card
                $card.remove();
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
