'use strict';

/* =============================================================================================
   JUICE -> COMPONENTS -> PASSWORD REVEAL
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'passwordReveal';

    // Set the plugin defaults
    const defaults = {
        action: 'click'
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
            // Set the elements
            const $element = $(this.element);
            const $input = $element.find('input');

            // Hide the password by default
            this.hide($input);

            // Check if the action is set to hover and the html tag has the no touch detection class and set the action/fallback
            const action = (this.settings.action == 'hover' && $('html').hasClass('has-no-touch')
                ? this.settings.action
                : 'click'
            );

            // Start a swtich statement for the action
            switch (action) {
                // Click
                case ('click'):
                    // Add a click event handler to reveal a password
                    $(document).on('click', '.js-password-reveal-trigger', (event) => {
                        // Prevent the default action
                        event.preventDefault();

                        // Set the elements
                        const $element = $(event.currentTarget).parents('.has-password-reveal');
                        const $input = $element.find('input');

                        // Check if the input is a password input and show or hide the input text/password
                        ($input.attr('type') == 'password'
                            ? this.show($input)
                            : this.hide($input)
                        );
                    });
                break;

                // Hover
                case ('hover'):
                    // Add a click event handler to prevent the default action
                    $(document).on('click', '.js-password-reveal-trigger', (event) => {
                        // Prevent the default action
                        event.preventDefault();
                    });

                    // Add a mouse enter event handler to reveal a password
                    $(document).on('mouseenter', '.js-password-reveal-trigger', (event) => {
                        // Set the elements
                        const $element = $(event.currentTarget).parents('.has-password-reveal');
                        const $input = $element.find('input');

                        // Show the input text
                        this.show($input);
                    });

                    // Add a mouse leave event handler to hide a password
                    $(document).on('mouseleave', '.js-password-reveal-trigger', (event) => {
                        // Set the elements
                        const $element = $(event.currentTarget).parents('.has-password-reveal');
                        const $input = $element.find('input');

                        // Show the input text
                        this.hide($input);
                    });
                break;

                // Hold
                case ('hold'):
                    // Add a click event handler to prevent the default action
                    $(document).on('click', '.js-password-reveal-trigger', (event) => {
                        // Prevent the default action
                        event.preventDefault();
                    });

                    // Add a mouse down event handler to reveal a password
                    $(document).on('mousedown', '.js-password-reveal-trigger', (event) => {
                        // Set the elements
                        const $element = $(event.currentTarget).parents('.has-password-reveal');
                        const $input = $element.find('input');

                        // Show the input text
                        this.show($input);
                    });

                    // Add a mouse up and mouse leave event handler to hide a password
                    $(document).on('mouseup mouseleave', '.js-password-reveal-trigger', (event) => {
                        // Set the elements
                        const $element = $(event.currentTarget).parents('.has-password-reveal');
                        const $input = $element.find('input');

                        // Show the input text
                        this.hide($input);
                    });
                break;
            }
        },

        /**
         * Show a password
         * @param  {element}  $input  The input element
         * @return {void}
         */
        show($input) {
            // Set the target element
            const $element = $input.parents('.has-password-reveal');

            // Add the active state hook to the target element
            $element.addClass('is-active');

            // Set the attribute type to text
            $input[0].type = 'text';
        },

        /**
         * Hide a password
         * @param  {element}  $input  The input element
         * @return {void}
         */
        hide($input) {
            // Set the target element
            const $element = $input.parents('.has-password-reveal');

            // Remove the active state hook to the target element
            $element.removeClass('is-active');

            // Set the attribute type to password
            $input[0].type = 'password';
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
