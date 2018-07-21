'use strict';

/* =============================================================================================
   RUCKSACK -> COMPONENTS -> CARD
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'tooltip';

    // Set the plugin defaults
    const defaults = {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        color: null,
        feedback: null,
        position: 'top',
        size: null,
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
            // Set the element
            const $element = $(this.element);

            // Set the tooltip settings
            this.setTooltipSettings($element);

            // Add a mouseenter, focus, mouseleave and blur handler to show and hide the tooltip
            $element.on('mouseenter focus', (event) => {
                // Stop propagation
                event.stopPropagation();

                // Build the tooltip
                const $tooltip = this.buildTooltip($element);

                // Set the animation out class to the tooltip
                $tooltip.data({
                    'animation-out': this.settings.animationOut
                });

                // Add the animation in class to the tooltip and check when the animation has ended
                $tooltip.addClass(this.settings.animationIn).one('animationend', () => {
                    // Remove the animation in class
                    $tooltip.removeClass(this.settings.animationIn);
                });
            }).on('mouseleave blur', (event) => {
                // Stop propagation
                event.stopPropagation();

                // Remove all the tooltips
                this.removeTooltips();
            });

            // Add a click handler to remove all the tooltips
            $('body').off().on('click', (event) => {
                // Stop propagation
                event.stopPropagation();

                // Set the tooltip
                const $tooltip = $('.tooltip');

                // Remove all the tooltips
                this.removeTooltips();
            });
        },

        /**
         * Set the tooltip settings from the plugin default plugin settings or the target element data attribute overrides
         * @param  {element}  $element  The target element
         * @return {void}
         */
        setTooltipSettings($element) {
            // Check if the tooltip animation in data attribute exists and set the tooltip animation in
            this.settings.animationIn =
                $element.data('tooltip-animation-in') || this.settings.animationIn;

            // Check if the tooltip animation out data attribute exists and set the tooltip animation out
            this.settings.animationOut =
                $element.data('tooltip-animation-out') || this.settings.animationOut;

            // Check if the tooltip color data attribute exists and set the tooltip color
            this.settings.color =
                $element.data('tooltip-color') || this.settings.color;

            // Check if the tooltip feedback data attribute exists and set the tooltip feedback
            this.settings.feedback =
                $element.data('tooltip-feedback') || this.settings.feedback;

            // Check if the tooltip position data attribute exists and set the tooltip position
            this.settings.position =
                $element.data('tooltip-position') || this.settings.position;

            // Check if the tooltip size data attribute exists and set the tooltip size
            this.settings.size =
                $element.data('tooltip-size') || this.settings.size;
        },

        /**
         * Build the tooltip and apply any classes and append to the body
         * @param  {element}  $element  The target element
         * @return {element}            The tooltip element
         */
        buildTooltip($element) {
            // Set the tooltip elements
            const $tooltip = $('<div>', { 'class': 'tooltip' });
            const $tooltipContent = $('<div>', { 'class': 'tooltip__content' });

            // Construct the tooltip
            $tooltip.append(
                $tooltipContent.text(
                    $element.data('tooltip')
                )
            );

            // Check if a tooltip size value exists
            if (this.settings.size) {
                // Set the tooltip size
                $tooltip.addClass(`is-${this.settings.size}`);
            }

            // Check if a tooltip color value exists
            if (this.settings.color) {
                // Set the tooltip color
                $tooltip.addClass(`is-${this.settings.color}`);
            }

            // Check if a tooltip feedback value exists
            if (this.settings.feedback) {
                // Set the tooltip feedback
                $tooltip.addClass(`with-${this.settings.feedback}`);
            }

            // Append the tooltip to the body
            $('body').append($tooltip);

            // Set the tooltip position
            this.setTooltipPosition($element, $tooltip);

            // Return the tooltip
            return $tooltip;
        },

        /**
         * Set the tooltip position relative to the target element
         * @param  {element}  $element  The target element
         * @param  {element}  $tooltip  The tooltip element
         * @return {void}
         */
        setTooltipPosition($element, $tooltip) {
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
            switch (this.settings.position) {
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

            // Add the tooltip position modifier class and set the inline top and left positions
            $tooltip.addClass(`tooltip--${this.settings.position}`).css({
                'top': Math.round(tooltipY),
                'left': Math.round(tooltipX),
            });
        },

        /**
         * Remove the tooltip
         * @return {void}
         */
        removeTooltips() {
            // Cycle through the tooltips
            $('.tooltip').each(function() {
                // Set the tooltip
                const $tooltip = $(this);

                // Add the animation out class to the tooltip and check when the animation has ended
                $tooltip.addClass($tooltip.data('animation-out')).one('animationend', () => {
                    // Remove the animation out class
                    $tooltip.removeClass($tooltip.data('animation-out'));

                    // Remove the tooltip
                    $tooltip.remove();
                });
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
