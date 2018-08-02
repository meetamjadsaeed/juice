'use strict';

/* =============================================================================================
   JUICE -> COMPONENTS -> DROPDOWN
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'dropdown';

    // Set the plugin defaults
    const defaults = {
        animationIn: 'fadeInUpTiny',
        animationOut: 'fadeOutDownTiny',
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
            // Set the target element
            const $element = $(this.element);
            const $dropdown = $('.dropdown', $element);

            // Store the settings to the dropdown data
            $dropdown.data({
                'animation-in': $element.data('animation-in') || this.settings.animationIn,
                'animation-out': $element.data('animation-out') || this.settings.animationOut,
            });

            // Check if the dropdown has the center modifier class
            if ($dropdown.hasClass('dropdown--center')) {
                // Set the dropdown width
                const dropdownWidth = $dropdown.outerWidth();

                // Set the inline left margin
                $dropdown.css({
                    'margin-left': -(dropdownWidth / 2)
                });
            }

            // Add a click and blur handler to show and hide the dropdown
            $('.has-dropdown').off().on('click', '.js-dropdown-trigger', (event) => {
                // Set the dropdown element
                const $dropdown = $(event.currentTarget).next('.dropdown');

                // Check if the dropdown has the active state hook class
                if ($dropdown.hasClass('is-active')) {
                    // Hide the dropdown
                    this.hide($dropdown);
                } else {
                    // Show the dropdown
                    this.show($dropdown);
                }
            }).on('blur', '.js-dropdown-trigger', (event) => {
                // Set the dropdown element
                const $dropdown = $(event.currentTarget).next('.dropdown');

                // Hide the dropdown
                this.hide($dropdown);
            });
        },

        /**
         * Show a dropdown
         * @param  {element}  $dropdown  The dropdown element
         * @return {void}
         */
        show($dropdown) {
            // Toggle the is active state hook class on the dropdown
            $dropdown.toggleClass('is-active');

            // Add the animation in class to the dropdown and check when the animation has ended
            $dropdown.addClass($dropdown.data('animation-in')).one('animationend', () => {
                // Remove the animation in class
                $dropdown.removeClass($dropdown.data('animation-in'));
            });
        },

        /**
         * Hide a dropdown
         * @param  {element}  $dropdown  The dropdown element
         * @return {void}
         */
        hide($dropdown) {
            // Add the animation out class to the dropdown and check when the animation has ended
            $dropdown.addClass($dropdown.data('animation-out')).one('animationend', () => {
                // Remove the is active state hook class on the dropdown
                $dropdown.removeClass('is-active');

                // Remove the animation out class
                $dropdown.removeClass($dropdown.data('animation-out'));
            });
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
