'use strict';

/* =============================================================================================
   JUICE -> COMPONENTS -> ACCORDION
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'accordion';

    // Set the plugin defaults
    const defaults = {
        openMultipleItems: false,
        toggleAnimation: 'slide',
        toggleAnimationDuration: 200,
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
            // Set the accordion elements
            const $accordion = $(this.element);
            const $items = $accordion.children('.accordion__item');

            // Cycle through all the accordion items
            $items.each((index, element) => {
                // Set the accordion item elements
                const $item = $(element);
                const $body = $item.children('.accordion__body');

                // Set the accordion type
                const openMultipleItems = $accordion.data('accordion-open-multiple-items') || this.settings.openMultipleItems;

                // Check if the accordion item doesn't have either the expanded or collapsed state hooks
                if (!$item.is('.is-expanded, .is-collapsed')) {
                    // Add the collapsed state hook class to the accordion item
                    $item.addClass('is-collapsed');
                }

                // Check if opening multiple items is not allowed
                if (!openMultipleItems) {
                    // Check if the accordion item has the expanded state hook class
                    if ($item.hasClass('is-expanded')) {
                        // Check if this is the first iterated item in the loop and set the correct state hook class
                        (index === 0
                            ? $item.addClass('is-expanded').removeClass('is-collapsed')
                            : $item.addClass('is-collapsed').removeClass('is-expanded')
                        );
                    }
                }

                // Check if the accordion item has the collapsed state hook class
                if ($item.hasClass('is-collapsed')) {
                    // Hide the accordion item body
                    $body.hide();
                }
            });

            // Add a click event handler to toggle the accordion items
            $(document).on('click', '.js-accordion-toggle', (event) => {
                // Set the accordion elements
                const $item = $(event.currentTarget).parents('.accordion__item');
                const $accordion = $item.parents('.accordion');

                // Toggle the accordion items
                this.toggle($accordion, $item);
            });
        },

        /**
         * Toggle the body of an accordion item
         * @param  {element}  $accordion  The accordion element
         * @param  {element}  $item       A single accordion item element
         * @return {void}
         */
        toggle($accordion, $item) {
            // Set the accordion items
            const $items = $accordion.children('.accordion__item');
            const $body = $item.children('.accordion__body');

            // Set the accordion type
            const openMultipleItems = $accordion.data('accordion-open-multiple-items') || this.settings.openMultipleItems;

            // Check if the accordion item body is not animating
            if (!$body.is(':animated')) {
                // Check if the accordion item has the expanded state hook class or not
                if ($item.hasClass('is-expanded')) {
                    // Check if opening multiple items is allowed
                    if (openMultipleItems) {
                        // Collapse the accordion item
                        this.collapse($item);
                    } else {
                        // Cycle through all the accordion items
                        $items.each((index, element) => {
                            // Check if this accordion item has the expanded state hook class
                            if ($(element).hasClass('is-expanded')) {
                                // Collapse the accordion item
                                this.collapse($(element));
                            }
                        });
                    }
                } else if ($item.hasClass('is-collapsed')) {
                    // Check if opening multiple items is allowed
                    if (openMultipleItems) {
                        // Expand the accordion item
                        this.expand($item);
                    } else {
                        // Cycle through all the accordion items
                        $items.each((index, element) => {
                            // Check if this accordion item has the expanded state hook class
                            if ($(element).hasClass('is-expanded')) {
                                // Collapse the accordion item
                                this.collapse($(element));
                            }
                        });

                        // Expand the accordion item
                        this.expand($item);
                    }
                }
            }
        },

        /**
         * Collapse an accordion item
         * @param  {element}  $item  The accordion item element
         * @return {void}
         */
        collapse($item) {
            // Set the accordion elements
            const $accordion = $item.parents('.accordion');
            const $body = $item.children('.accordion__body');

            // Set the accordion item toggle settings
            const toggleAnimation = $accordion.data('accordion-toggle-animation') || this.settings.toggleAnimation;
            const toggleAnimationDuration = $accordion.data('accordion-toggle-animation-duration') || this.settings.toggleAnimationDuration;

            // Start a switch statement for the toggle animation
            switch (toggleAnimation) {
                // Default
                default:
                    // Add the collapsed state hook class and remove the expanded state hook class from the accordion item
                    $item.addClass('is-collapsed').removeClass('is-expanded');

                    // Hide the accordion item body
                    $body.hide()
                break;

                // Slide
                case 'slide':
                    // Slide the accordion item body up and check when the animation has ended
                    $body.slideUp(toggleAnimationDuration, () => {
                        // Add the collapsed state hook class and remove the expanded state hook class from the accordion item
                        $item.addClass('is-collapsed').removeClass('is-expanded');

                        // Hide the accordion item body
                        $body.hide()
                    });
                break;
            }
        },

        /**
         * Expand an accordion item
         * @param  {element}  $item The accordion item element
         * @return {void}
         */
        expand($item) {
            // Set the accordion elements
            const $accordion = $item.parents('.accordion');
            const $body = $item.children('.accordion__body');

            // Set the accordion item toggle settings
            const toggleAnimation = $accordion.data('accordion-toggle-animation') || this.settings.toggleAnimation;
            const toggleAnimationDuration = $accordion.data('accordion-toggle-animation-duration') || this.settings.toggleAnimationDuration;

            // Start a switch statement for the toggle animation
            switch (toggleAnimation) {
                // Default
                default:
                    // Add the expanded state hook class and remove the collapsed state hook class from the accordion item
                    $item.addClass('is-expanded').removeClass('is-collapsed');

                    // Show the accordion item body
                    $body.show()
                break;

                // Slide
                case 'slide':
                    // Add the expanded state hook class and remove the collapsed state hook class from the accordion item
                    $item.addClass('is-expanded').removeClass('is-collapsed');

                    // Slide the accordion item body down
                    $body.slideDown(toggleAnimationDuration);
                break;
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
