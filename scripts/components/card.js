'use strict';

/* =============================================================================================
   RUCKSACK -> COMPONENTS -> CARD
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
     * @param  {array}    options  The plugin options
     * @return {void}
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
         * @return {void}
         */
        initialize() {
            // Set the card element
            const $card = $(this.element);

            // Set the card settings
            this.setCardSettings($card);

            // Add a click event handler to remove a card
            $('.js-card-remove', this.element).on('click', () => {
                // Remove the card
                this.removeCard($card);
            });
        },

        /**
         * Set the card settings from the plugin default settings or the card element data attribute overrides
         * @param  {element}  $card  The card element
         * @return {void}
         */
        setCardSettings($card) {
            // Check if the card remove animation data attribute exists and set the remove animation
            this.settings.removeAnimation =
                $card.data('card-remove-animation') || this.settings.removeAnimation;
        },

        /**
         * Remove a card
         * @param  {element}  $card  The card element
         * @return {void}
         */
        removeCard($card) {
            // Check if the remove animation is not set to none
            if (this.settings.removeAnimation != 'none') {
                // Add the remove animation class to the card and check when the animation has ended
                $card.addClass(`animated ${this.settings.removeAnimation}`).one('animationend', () => {
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
