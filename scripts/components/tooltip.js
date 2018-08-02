'use strict';

/* =============================================================================================
   JUICE -> COMPONENTS -> CARD
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'tooltip';

    // Set the plugin defaults
    const defaults = {
        animationIn: 'zoomIn',
        animationOut: 'zoomOut',
        color: null,
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
            // Set the target element
            const $element = $(this.element);

            // Add a mouseenter, mouseleave and click handler to show and hide the tooltip
            $element.on('mouseenter', (event) => {
                // Build the tooltip
                const $tooltip = this.build($element);

                // Append the tooltip to the body
                $('body').append($tooltip);

                // Position the position
                this.position($element, $tooltip);

                // Store the tooltip to the target element
                $element.data({
                    'tooltip-element': $tooltip
                });

                // Show the tooltip
                this.show($tooltip);

                // Check if the tooltip has a display duration
                if ($tooltip.data('duration') > 0) {
                    // Start a timer
                    setTimeout(() => {
                        // Remove the tooltip
                        this.remove($tooltip);
                    }, $tooltip.data('duration'));
                }
            }).on('mouseleave click', (event) => {
                // Set the tooltip
                const $tooltip = $element.data('tooltip-element');

                // Remove the tooltip
                this.remove($tooltip);
            });
        },

        /**
         * Build the tooltip and apply any classes and append to the body
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

            // Store the settings to the tooltip data
            $tooltip.data({
                'animation-in': $element.data('tooltip-animation-in') || this.settings.animationIn,
                'animation-out': $element.data('tooltip-animation-out') || this.settings.animationOut,
                'color': $element.data('tooltip-color') || this.settings.color,
                'duration': $element.data('tooltip-duration') || this.settings.duration,
                'feedback': $element.data('tooltip-feedback') || this.settings.feedback,
                'position': $element.data('tooltip-position') || this.settings.position,
                'size': $element.data('tooltip-size') || this.settings.size,
            });

            // Check if a color value exists
            if ($tooltip.data('color')) {
                // Add the color class modifier to the tooltip
                $tooltip.addClass(`is-${$tooltip.data('color')}`);
            }

            // Check if a feedback value exists
            if ($tooltip.data('feedback')) {
                // Add the feedback class modifier to the tooltip
                $tooltip.addClass(`with-${$tooltip.data('feedback')}`);
            }

            // Check if a position value exists
            if ($tooltip.data('position')) {
                // Add the position class modifier to the tooltip
                $tooltip.addClass(`tooltip--${$tooltip.data('position')}`);
            }

            // Check if a size value exists
            if ($tooltip.data('size')) {
                // Add the size class modifier to the tooltip
                $tooltip.addClass(`is-${$tooltip.data('size')}`);
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

            // Start a switch statement for the tooltip position
            switch ($tooltip.data('position')) {
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
         * Show a tooltip
         * @param  {element}  $tooltip  The tooltip element
         * @return {void}
         */
        show($tooltip) {
            // Add the animation in class to the tooltip and check when the animation has ended
            $tooltip.addClass($tooltip.data('animation-in')).one('animationend', () => {
                // Remove the animation in class
                $tooltip.removeClass($tooltip.data('animation-in'));
            });
        },

        /**
         * Remove a tooltip
         * @param  {element}  $tooltip  The tooltip element
         * @return {void}
         */
        remove($tooltip) {
            // Add the animation out class to the tooltip and check when the animation has ended
            $tooltip.addClass($tooltip.data('animation-out')).one('animationend', () => {
                // Remove the tooltip
                $tooltip.remove();
            });
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
