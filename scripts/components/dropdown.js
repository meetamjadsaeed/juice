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
        animationOut: 'fadeOutDownTiny'
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
            // Set the dropdown elements
            const $element = $(this.element);
            const $dropdown = $element.find('.dropdown');

            // Set the element to have a focusable tabindex
            $element.attr('tabindex', -1);

            // Check if the dropdown has the hoverable state class and the html tag has the no touch detection class
            if ($dropdown.hasClass('is-hoverable') && $('html').hasClass('has-no-touch')) {
                // Add a mouse enter event handler on the dropdown container
                $(document).on('mouseover', '.has-dropdown', (event) => {
                    // Set the dropdown element
                    const $dropdown = $(event.currentTarget).find('.dropdown');

                    if (!$dropdown.hasClass('is-active')) {
                        // Show the dropdown
                        this.show($dropdown);
                    }
                });

                // Add a mouse leave event handler on the dropdown container
                $(document).on('mouseleave', '.has-dropdown', (event) => {
                    // Set the dropdown element
                    const $dropdown = $(event.currentTarget).find('.dropdown');

                    if ($dropdown.hasClass('is-active')) {
                        // Hide the dropdown
                        this.hide($dropdown);
                    }
                });
            }

            // Add a click event handler to show and hide the dropdown
            $(document).on('click', '.js-dropdown-trigger', (event) => {
                // Stop immediate propagation
                event.stopImmediatePropagation();

                // Set the dropdown element
                const $dropdown = $(event.currentTarget).next('.dropdown');

                // Check if the dropdown has the active state hook class and show or hide the dropdown
                (!$dropdown.hasClass('is-active')
                    ? this.show($dropdown)
                    : this.hide($dropdown)
                );
            });

            // Add a focus out event handler to hide the dropdown
            $(document).on('focusout', '.has-dropdown', (event) => {
                // Set the current target, related target and dropdown elements
                const $current = $(event.currentTarget);
                const $related = $(event.relatedTarget);
                const $dropdown = $current.children('.dropdown');

                // Check if the related target element is not the dropdown container
                if (!$related.closest('.has-dropdown').is($current)) {
                    // Hide the dropdown
                    this.hide($dropdown);
                }
            });
        },

        /**
         * Show a dropdown
         * @param  {element}  $dropdown  The dropdown element
         * @return {void}
         */
        show($dropdown) {
            // Set the dropdown elements
            const $element = $dropdown.parents('.has-dropdown');
            const $dropdownContent = $('.dropdown__content', $dropdown);

            // Toggle the active state hook class on the dropdown
            $dropdown.addClass('is-active');

            // Set the dropdown animation in
            const animationIn = $element.data('dropdown-animation-in') || this.settings.animationIn;

            // Check if the animation in is set
            if (animationIn && animationIn != 'none') {
                // Add the animation in class to the dropdown content and check when the animation has ended
                $dropdownContent.addClass(`animated ${animationIn}`).one('animationend', () => {
                    // Remove the animation in class from the dropdown content
                    $dropdownContent.removeClass(`animated ${animationIn}`);
                });
            }
        },

        /**
         * Hide a dropdown
         * @param  {element}  $dropdown  The dropdown element
         * @return {void}
         */
        hide($dropdown) {
            // Set the dropdown elements
            const $element = $dropdown.parents('.has-dropdown');
            const $dropdownContent = $('.dropdown__content', $dropdown);

            // Set the dropdown animation out
            const animationOut = $element.data('dropdown-animation-out') || this.settings.animationOut;

            // Check if the animation out is set
            if (animationOut && animationOut != 'none') {
                // Add the animation out class to the dropdown content and check when the animation has ended
                $dropdownContent.addClass(`animated ${animationOut}`).one('animationend', () => {
                    // Remove the animation out class from the dropdown content
                    $dropdownContent.removeClass(`animated ${animationOut}`);

                    // Remove the active state hook class on the dropdown
                    $dropdown.removeClass('is-active');
                });
            } else {
                // Remove the active state hook class on the dropdown
                $dropdown.removeClass('is-active');
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
