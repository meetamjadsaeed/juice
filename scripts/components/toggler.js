'use strict';

/* =============================================================================================
   JUICE -> COMPONENTS -> TOGGLER
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'toggler';

    // Set the plugin defaults
    const defaults = {
    	animationIn: 'fadeInUpTiny',
        animationOut: 'fadeOutDownTiny',
        slide: false
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
            const $target = $($element.data('toggler-target'));

            // Check if the target element is visible
            if ($target.is(':visible')) {
                // Add the active state class to the element
                $element.addClass('is-active');
            }

            // Add a click event handler to toggle the target element
            $(document).on('click', '.has-toggable', (event) => {
                // Stop immediate propagation
                event.stopImmediatePropagation();

                // Set the elements
                const $element = $(event.currentTarget);
                const $target = $($element.data('toggler-target'));

                // Check if the element has the active state class and show or hide the target element
                (!$element.hasClass('is-active')
                	? this.show($element, $target)
                	: this.hide($element, $target)
                );
            });
        },

        /**
         * Show an element
         * @param  {element}  $element  The trigger element
         * @param  {element}  $target   The target element
         * @return {void}
         */
        show($element, $target) {
            // Add the active state class to the element
            $element.addClass('is-active');

            // Set the toggler slide status
            const slide = $element.data('toggler-slide') || this.settings.slide;

            // Check if the target element has the slide data attribute
            if (slide) {
                // Slide the target element down
                $target.slideDown();
            } else {
                // Set the toggler animation in and out
                const animationIn = $element.data('toggler-animation-in') || this.settings.animationIn;

                // Check if the animation in is set
                if (animationIn && animationIn != 'none') {
                    // Show the target element and add the animation in class to and check when the animation has ended
                    $target.show().addClass(`animated ${animationIn}`).one('animationend', () => {
                        // Remove the animation in class
                        $target.removeClass(`animated ${animationIn}`);
                    });
                } else {
                    // Show the target element
                    $target.show()
                }
            }
        },

        /**
         * Hide an element
         * @param  {element}  $element  The trigger element
         * @param  {element}  $target   The target element
         * @return {void}
         */
        hide($element, $target) {
            // Remove the active state class from the element
            $element.removeClass('is-active');

            // Set the toggler slide status
            const slide = $element.data('toggler-slide') || this.settings.slide;

            // Check if the target element has the slide data attribute
            if (slide) {
                // Slide the target element up
                $target.slideUp();
            } else {
                // Set the toggler animation in and out
                const animationOut = $element.data('toggler-animation-out') || this.settings.animationOut;

                // Check if the animation out is set
                if (animationOut && animationOut != 'none') {
                    // Add the animation out class to the target element and check when the animation has ended
                    $target.addClass(`animated ${animationOut}`).one('animationend', () => {
                        // Remove the animation in class
                        $target.removeClass(`animated ${animationOut}`);

                        // Hide the target element
                        $target.hide();
                    });
                } else {
                    // Hide the target element
                    $target.hide();
                }
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
