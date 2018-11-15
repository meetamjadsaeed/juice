'use strict';

/* =============================================================================================
   JUICE -> COMPONENTS -> TOOLTIP
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'tooltip';

    // Set the plugin defaults
    const defaults = {
        animationIn: 'zoomIn',
        animationOut: 'zoomOut',
        color: null,
        delay: 0,
        duration: 2000,
        feedback: null,
        position: 'top',
        size: null,
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
            // Check if the html tag has the no touch detection class
            if ($('html').hasClass('has-no-touch')) {
                // Add a mouse enter and focus event handler to show the tooltip
                $(document).on('mouseenter focus', '.has-tooltip', (event) => {
                    // Stop immediate propagation
                    event.stopImmediatePropagation();

                    // Set the target element
                    const $element = $(event.currentTarget);

                    // Check if the target element doesn't have an assigned tooltip element
                    if (!$element.data('tooltip-element')) {
                        // Set the tooltip
                        const $tooltip = this.build($element);

                        // Insert the tooltip
                        this.insert($element, $tooltip);
                    }
                });

                // Add a mouse leave, click and focusout event handler to hide the tooltip
                $(document).on('mouseleave click focusout', '.has-tooltip', (event) => {
                    // Stop immediate propagation
                    event.stopImmediatePropagation();

                    // Set the target element
                    const $element = $(event.currentTarget);

                    // Check if the target element has an assigned tooltip element
                    if ($element.data('tooltip-element')) {
                        // Set the tooltip element
                        const $tooltip = $($element.data('tooltip-element'))

                        // Remove the tooltip
                        this.remove($element, $tooltip);
                    }
                });
            }
        },

        /**
         * Build the tooltip
         * @param  {element}  $element  The target element
         * @return {element}            The tooltip element
         */
        build($element) {
            // Set the tooltip elements
            const $tooltip = $('<div>', { 'class': 'tooltip' });
            const $tooltipContent = $('<div>', { 'class': 'tooltip__content' });

            // Construct the tooltip
            $tooltip.append(
                $tooltipContent.text(
                    $element.data('tooltip')
                )
            );

            // Set the tooltip modifiers
            const color = $element.data('tooltip-color') || this.settings.color;
            const feedback = $element.data('tooltip-feedback') || this.settings.feedback;
            const position = $element.data('tooltip-position') || this.settings.position;
            const size = $element.data('tooltip-size') || this.settings.size;

            // Check if a color modifier exists
            if (color) {
                // Add the color class modifier to the tooltip
                $tooltip.addClass(`is-${color}`);
            }

            // Check if a modifier value exists
            if (feedback) {
                // Add the feedback class modifier to the tooltip
                $tooltip.addClass(`has-${feedback}`);
            }

            // Check if a position modifier exists
            if (position) {
                // Add the position class modifier to the tooltip
                $tooltip.addClass(`tooltip--${position}`);
            }

            // Check if a size modifier exists
            if (size) {
                // Add the size class modifier to the tooltip
                $tooltip.addClass(`is-${size}`);
            }

            // Return the tooltip
            return $tooltip;
        },

        /**
         * Set the tooltip position relative to the target element
         * @param  {element}  $element  The target element
         * @param  {element}  $tooltip  The tooltip element
         * @return {void}
         */
        position($element, $tooltip) {
            // Set the element properties
            const elementX = $element.offset().left;
            const elementY = $element.offset().top;
            const elementWidth = $element.outerWidth();
            const elementHeight = $element.outerHeight();

            // Set the tooltip properties
            const tooltipWidth = $tooltip.outerWidth();
            const tooltipHeight = $tooltip.outerHeight();

            // Set the position, tooltip x and y positions
            let tooltipX, tooltipY;

            // Set the tooltip position modifier
            const position = $element.data('tooltip-position') || this.settings.position;

            // Start a switch statement for the tooltip position
            switch (position) {
                // Top (default)
                default:
                    // Set the tooltip x and y positions
                    tooltipX = elementX + ((elementWidth - tooltipWidth) / 2);
                    tooltipY = elementY - tooltipHeight;
                break;

                // Right
                case 'right':
                    // Set the tooltip x and y positions
                    tooltipX = elementX + elementWidth;
                    tooltipY = elementY + ((elementHeight - tooltipHeight) / 2);
                break;

                // Bottom
                case 'bottom':
                    // Set the tooltip x and y positions
                    tooltipX = elementX + ((elementWidth - tooltipWidth) / 2);
                    tooltipY = elementY + elementHeight;
                break;

                // Left
                case 'left':
                    // Set the tooltip x and y positions
                    tooltipX = elementX - tooltipWidth;
                    tooltipY = elementY + ((elementHeight - tooltipHeight) / 2);
                break;
            }

            // Set the inline top and left positions
            $tooltip.css({
                'top': Math.round(tooltipY),
                'left': Math.round(tooltipX),
            });
        },

        /**
         * Insert a tooltip
         * @param  {element}  $element  The target element
         * @param  {element}  $tooltip  The tooltip element
         * @return {void}
         */
        insert($element, $tooltip) {
            // Set the tooltip delay
            const delay = $element.data('tooltip-delay') || this.settings.delay;

            // Start a timer
            setTimeout(() => {
                // Append the tooltip to the body
                $('body').append($tooltip);

                // Position the tooltip
                this.position($element, $tooltip);

                // Assign the tooltip to the target element
                $element.data({
                    'tooltip-element': $tooltip
                });

                // Set the tooltip animation in
                const animationIn = $element.data('tooltip-animation-in') || this.settings.animationIn;

                // Check if the animation in is set
                if (animationIn && animationIn != 'none') {
                    // Add the animation in class to the tooltip and check when the animation has ended
                    $tooltip.addClass(`animated ${animationIn}`).one('animationend', () => {
                        // Remove the animation in class
                        $tooltip.removeClass(`animated ${animationIn}`);

                        // Set the tooltip duration
                        const duration = $element.data('tooltip-duration') || this.settings.duration;

                        // Check if the tooltip has a display duration
                        if (duration > 0) {
                            // Start a timer
                            setTimeout(() => {
                                // Check if the target element has an assigned tooltip element
                                if ($element.data('tooltip-element')) {
                                    // Remove the tooltip
                                    this.remove($element, $tooltip);
                                }
                            }, duration);
                        }
                    });
                } else {
                    // Set the tooltip duration
                    const duration = $element.data('tooltip-duration') || this.settings.duration;

                    // Check if the tooltip has a display duration
                    if (duration > 0) {
                        // Start a timer
                        setTimeout(() => {
                            // Check if the target element has an assigned tooltip element
                            if ($element.data('tooltip-element')) {
                                // Remove the tooltip
                                this.remove($element, $tooltip);
                            }
                        }, duration);
                    }
                }
            }, delay);
        },

        /**
         * Remove a tooltip
         * @param  {element}  $element  The target element
         * @param  {element}  $tooltip  The tooltip element
         * @return {void}
         */
        remove($element, $tooltip) {
            // Set the tooltip animation out
            const animationOut = $element.data('tooltip-animation-out') || this.settings.animationOut;

            // Check if the animation out is set
            if (animationOut && animationOut != 'none') {
                // Add the animation out class to the tooltip and check when the animation has ended
                $tooltip.addClass(`animated ${animationOut}`).one('animationend', () => {
                    // Remove the tooltip
                    $tooltip.remove();

                    // Remove the assigned tooltip from the target element
                    $element.removeData('tooltip-element');
                });
            } else {
                // Remove the tooltip
                $tooltip.remove();

                // Remove the assigned tooltip from the target element
                $element.removeData('tooltip-element');
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
