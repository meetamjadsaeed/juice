'use strict';

/* =============================================================================================
   JUICE -> COMPONENTS -> POPOVER
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'popover';

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
            // Add a click event handler to show the popover
            $(document).on('click', '.has-popover', (event) => {
                // Stop immediate propagation
                event.stopImmediatePropagation();

                // Set the target element
                const $element = $(event.currentTarget);

                if (!$element.hasClass('is-active')) {
                    // Set the popover
                    const $popover = this.build($element);

                    // Insert the popover
                    this.insert($element, $popover);
                } else {
                    // Set the popover
                    const $popover = $($element.data('popover-element'));

                    // Remove the popover
                    this.remove($element, $popover);
                }
            });

            // Add a focus out event handler to hide the popover
            $(document).on('focusout', '.has-popover', (event) => {
                // Stop immediate propagation
                event.stopImmediatePropagation();

                // Set the target element
                const $element = $(event.currentTarget);

                // Set the popover element
                const $popover = $($element.data('popover-element'))

                // Remove the popover
                this.remove($element, $popover);
            });
        },

        /**
         * Build the popover
         * @param  {element}  $element  The target element
         * @return {element}            The popover element
         */
        build($element) {
            // Set the popover elements
            const $popover = $('<div>', { 'class': 'popover' });
            const $popoverContent = $('<div>', { 'class': 'popover__content' });
            const $popoverHead = $('<div>', { 'class': 'popover__head' });
            const $popoverBody = $('<div>', { 'class': 'popover__body' });

            // Construct the popover
            $popover.append(
                $popoverContent.append(
                    $popoverHead.append(
                        $element.data('popover-title')
                    ),
                    $popoverBody.append(
                        $element.data('popover-text')
                    )
                )
            );

            // Set the popover modifiers
            const color = $element.data('popover-color') || this.settings.color;
            const feedback = $element.data('popover-feedback') || this.settings.feedback;
            const position = $element.data('popover-position') || this.settings.position;
            const size = $element.data('popover-size') || this.settings.size;

            // Check if a color modifier exists
            if (color) {
                // Add the color class modifier to the popover
                $popover.addClass(`is-${color}`);
            }

            // Check if a modifier value exists
            if (feedback) {
                // Add the feedback class modifier to the popover
                $popover.addClass(`has-${feedback}`);
            }

            // Check if a position modifier exists
            if (position) {
                // Add the position class modifier to the popover
                $popover.addClass(`popover--${position}`);
            }

            // Check if a size modifier exists
            if (size) {
                // Add the size class modifier to the popover
                $popover.addClass(`is-${size}`);
            }

            // Return the popover
            return $popover;
        },

        /**
         * Set the popover position relative to the target element
         * @param  {element}  $element  The target element
         * @param  {element}  $popover  The popover element
         * @return {void}
         */
        position($element, $popover) {
            // Set the element properties
            const elementX = $element.offset().left;
            const elementY = $element.offset().top;
            const elementWidth = $element.outerWidth();
            const elementHeight = $element.outerHeight();

            // Set the popover properties
            const popoverWidth = $popover.outerWidth();
            const popoverHeight = $popover.outerHeight();

            // Set the position, popover x and y positions
            let popoverX, popoverY;

            // Set the popover position modifier
            const position = $element.data('popover-position') || this.settings.position;

            // Start a switch statement for the popover position
            switch (position) {
                // Top (default)
                default:
                    // Set the popover x and y positions
                    popoverX = elementX + ((elementWidth - popoverWidth) / 2);
                    popoverY = elementY - popoverHeight;
                break;

                // Right
                case 'right':
                    // Set the popover x and y positions
                    popoverX = elementX + elementWidth;
                    popoverY = elementY + ((elementHeight - popoverHeight) / 2);
                break;

                // Bottom
                case 'bottom':
                    // Set the popover x and y positions
                    popoverX = elementX + ((elementWidth - popoverWidth) / 2);
                    popoverY = elementY + elementHeight;
                break;

                // Left
                case 'left':
                    // Set the popover x and y positions
                    popoverX = elementX - popoverWidth;
                    popoverY = elementY + ((elementHeight - popoverHeight) / 2);
                break;
            }

            // Set the inline top and left positions
            $popover.css({
                'top': Math.round(popoverY),
                'left': Math.round(popoverX),
            });
        },

        /**
         * Insert a popover
         * @param  {element}  $element  The target element
         * @param  {element}  $popover  The popover element
         * @return {void}
         */
        insert($element, $popover) {
            // Append the popover to the body
            $('body').append($popover);

            // Position the popover
            this.position($element, $popover);

            // Assign the popover to the target element
            $element.data({
                'popover-element': $popover
            });

            // Add the active state class to the target element
            $element.addClass('is-active');

            // Set the popover animation in
            const animationIn = $element.data('popover-animation-in') || this.settings.animationIn;

            // Check if the animation in is set
            if (animationIn && animationIn != 'none') {
                // Add the animation in class to the popover and check when the animation has ended
                $popover.addClass(`animated ${animationIn}`).one('animationend', () => {
                    // Remove the animation in class
                    $popover.removeClass(`animated ${animationIn}`);
                });
            }
        },

        /**
         * Remove a popover
         * @param  {element}  $element  The target element
         * @param  {element}  $popover  The popover element
         * @return {void}
         */
        remove($element, $popover) {
            // Set the popover animation out
            const animationOut = $element.data('popover-animation-out') || this.settings.animationOut;

            // Check if the animation out is set
            if (animationOut && animationOut != 'none') {
                // Add the animation out class to the popover and check when the animation has ended
                $popover.addClass(`animated ${animationOut}`).one('animationend', () => {
                    // Remove the popover
                    $popover.remove();

                    // Remove the active state class to the target element
                    $element.removeClass('is-active');
                });
            } else {
                // Remove the popover
                $popover.remove();

                // Remove the active state class to the target element
                $element.removeClass('is-active');
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
