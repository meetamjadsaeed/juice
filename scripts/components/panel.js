'use strict';

/* =============================================================================================
   RUCKSACK -> COMPONENTS -> PANEL
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin defaults
    const pluginName = 'panel';
    const defaults = {
        toggleAnimation: 'slide',
        toggleAnimationDuration: 200,
        removeAnimation: 'fadeOut'
    };

    /**
     * Constructor
     * @param  {element}  element  The target element
     * @param  {array}    options  The plugin options
     * @return void
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
         * @return void
         */
        initialize() {
            // Set the panel elements
            const $panel = $(this.element);
            const $body = $('.panel__body', this.element);

            // Check if the panel doesn't have either the expanded or collapsed state hooks
            if (!$panel.is('.is-expanded, .is-collapsed')) {
                // Add the expanded state hook class to the panel
                $panel.addClass('is-expanded');
            }

            // Check if the panel toggle animation data attribute exists and set the toggle animation
            this.settings.toggleAnimation = ($panel.data('panel-toggle-animation')
                ? $panel.data('panel-toggle-animation')
                : this.settings.toggleAnimation
            );

            // Check if the panel toggle animation duration data attribute exists and set the toggle animation duration
            this.settings.toggleAnimationDuration = ($panel.data('panel-toggle-animation-duration')
                ? $panel.data('panel-toggle-animation-duration')
                : this.settings.toggleAnimationDuration
            );

            // Check if the panel remove animation data attribute exists and set the remove animation
            this.settings.removeAnimation = ($panel.data('panel-remove-animation')
                ? $panel.data('panel-remove-animation')
                : this.settings.removeAnimation
            );

            // Add a click event handler to toggle the panels body
            $('.js-panel-toggle', this.element).on('click', () => {
                // Check if the panel body is not animating
                if (!$body.is(':animated')) {
                    // Start a switch statement for the toggle animation
                    switch (this.settings.toggleAnimation) {
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
                                $body.slideToggle(this.settings.toggleAnimationDuration, () => {
                                    // Toggle the expanded and collapsed state hook classes on the panel
                                    $panel.toggleClass('is-expanded is-collapsed');
                                });
                            }

                            // Check if the panel has the collapse state hook class
                            if ($panel.hasClass('is-collapsed')) {
                                // Toggle the expanded and collapsed state hook classes on the panel
                                $panel.toggleClass('is-expanded is-collapsed');

                                // Toggle the panel body
                                $body.slideToggle(this.settings.toggleAnimationDuration);
                            }
                        break;

                        // Fade
                        case 'fade':
                            // Check if the panel has the expanded state hook class
                            if ($panel.hasClass('is-expanded')) {
                                // Toggle the panel body and check when the animation has ended
                                $body.fadeToggle(this.settings.toggleAnimationDuration, () => {
                                    // Toggle the expanded and collapsed state hook classes on the panel
                                    $panel.toggleClass('is-expanded is-collapsed');
                                });
                            }

                            // Check if the panel has the collapse state hook class
                            if ($panel.hasClass('is-collapsed')) {
                                // Toggle the expanded and collapsed state hook classes on the panel
                                $panel.toggleClass('is-expanded is-collapsed');

                                // Toggle the panel body
                                $body.fadeToggle(this.settings.toggleAnimationDuration);
                            }
                        break;
                    }
                }
            });

            // Add a click event handler to remove a panel
            $('.js-panel-remove', this.element).on('click', () => {
                // Check if the remove animation is not set to none
                if (this.settings.removeAnimation != 'none') {
                    // Add the remove animation class to the panel and check when the animation has ended
                    $panel.addClass(`animated ${this.settings.removeAnimation}`).one('animationend', () => {
                        // Remove the panel
                        $panel.remove();
                    });
                } else {
                    // Remove the panel
                    $panel.remove();
                }
            });
        }
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
