'use strict';

/* =============================================================================================
   JUICE -> COMPONENTS -> PANEL
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'panel';

    // Set the plugin defaults
    const defaults = {
        toggleAnimation: 'slide',
        toggleAnimationDuration: 200,
        removeAnimation: 'fadeOut'
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
            // Set the panel element
            const $panel = $(this.element);

            // Check if the panel doesn't have either the expanded or collapsed state hooks
            if (!$panel.is('.is-expanded, .is-collapsed')) {
                // Add the expanded state hook class to the panel
                $panel.addClass('is-expanded');
            }

            // Add a click event handler to toggle the panels body
            $(document).on('click', '.js-panel-toggle', (event) => {
                // Set the panel element
                const $panel = $(event.currentTarget).parents('.panel');

                // Toggle the panel
                this.toggle($panel);
            });

            // Add a click event handler to remove a panel
            $(document).on('click', '.js-panel-remove', (event) => {
                // Set the panel element
                const $panel = $(event.currentTarget).parents('.panel');

                // Remove the panel
                this.remove($panel);
            });
        },

        /**
         * Toggle the body of a panel
         * @param  {element}  $panel  The panel element
         * @return {void}
         */
        toggle($panel) {
            // Set the panel body element
            const $body = $panel.find('.panel__body');

            // Set the panel toggle settings
            const toggleAnimation = $panel.data('panel-toggle-animation') || this.settings.toggleAnimation;
            const toggleAnimationDuration = $panel.data('panel-toggle-animation-duration') || this.settings.toggleAnimationDuration;

            // Check if the panel body is not animating
            if (!$body.is(':animated')) {
                // Start a switch statement for the toggle animation
                switch (toggleAnimation) {
                    // Default
                    default:
                        // Toggle the expanded and collapsed state hook classes on the panel
                        $panel.toggleClass('is-expanded is-collapsed');
                    break;

                    // Slide
                    case 'slide':
                        // Check if the panel has the expanded state hook class
                        if ($panel.hasClass('is-expanded')) {
                            // Toggle the panel body and check when the animation has ended
                            $body.slideToggle(toggleAnimationDuration, () => {
                                // Toggle the expanded and collapsed state hook classes on the panel
                                $panel.toggleClass('is-expanded is-collapsed');
                            });
                        }

                        // Check if the panel has the collapsed state hook class
                        if ($panel.hasClass('is-collapsed')) {
                            // Toggle the expanded and collapsed state hook classes on the panel
                            $panel.toggleClass('is-expanded is-collapsed');

                            // Toggle the panel body
                            $body.slideToggle(toggleAnimationDuration);
                        }
                    break;

                    // Fade
                    case 'fade':
                        // Check if the panel has the expanded state hook class
                        if ($panel.hasClass('is-expanded')) {
                            // Toggle the panel body and check when the animation has ended
                            $body.fadeToggle(toggleAnimationDuration, () => {
                                // Toggle the expanded and collapsed state hook classes on the panel
                                $panel.toggleClass('is-expanded is-collapsed');
                            });
                        }

                        // Check if the panel has the collapsed state hook class
                        if ($panel.hasClass('is-collapsed')) {
                            // Toggle the expanded and collapsed state hook classes on the panel
                            $panel.toggleClass('is-expanded is-collapsed');

                            // Toggle the panel body
                            $body.fadeToggle(toggleAnimationDuration);
                        }
                    break;
                }
            }
        },

        /**
         * Remove a panel
         * @param  {element}  $panel  The panel element
         * @return {void}
         */
        remove($panel) {
            // Set the panel remove animation
            const removeAnimation = $panel.data('panel-remove-animation') || this.settings.removeAnimation;

            // Check if the remove animation is set
            if (removeAnimation && removeAnimation != 'none') {
                // Add the animation classe to the panel and check when the animation has ended
                $panel.addClass(`animated ${removeAnimation}`).one('animationend', () => {
                    // Remove the panel
                    $panel.remove();
                });
            } else {
                // Remove the panel
                $panel.remove();
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
