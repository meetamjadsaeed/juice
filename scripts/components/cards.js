'use strict';

/* =============================================================================================
   RUCKSACK -> COMPONENTS -> CARDS
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin defaults
    const pluginName = 'card';
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
            // Set the card element
            const $card = $(this.element);

            // Check if the card doesn't have either the expanded or collapsed state hooks
            if (!$card.is('.is-expanded, .is-collapsed')) {
                // Add the expanded state hook class to the card
                $card.addClass('is-expanded');
            }

            // Add a click event handler to toggle the cards body
            $('.js-card-toggle', this.element).on('click', () => {
                // Toggle the expanded and collapsed state hook classes on the card
                $card.toggleClass('is-expanded is-collapsed');
            });

            // Add a click event handler to remove a card
            $('.js-card-remove', this.element).on('click', () => {
                // Check if the card remove animation data attribute exists and set the remove animation
                this.settings.removeAnimation = ($card.data('card-remove-animation')
                    ? $card.data('card-remove-animation')
                    : this.settings.removeAnimation
                );

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
