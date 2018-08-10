'use strict';

/* =============================================================================================
   JUICE -> COMPONENTS -> TAG
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'tag';

    // Set the plugin defaults
    const defaults = {
        removeAnimation: 'zoomOut'
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
            // Set the tag element
            const $tag = $(this.element);

            // Check if a tag belongs to a tag group
            if ($tag.parents('.tag-group').length) {
                // Set the tag group element
                const $tagGroup = $tag.parents('.tag-group');
            }

            // Add a click event handler to remove a tag
            $('.js-tag-remove', this.element).on('click', () => {
                // Set the remove settings
                const settings = {
                    'animation': $tag.data('tag-remove-animation') || this.settings.removeAnimation
                };

                // Remove the tag
                this.remove($tag, settings);
            });
        },

        /**
         * Remove a tag
         * @param  {element}  $tag      The tag element
         * @param  {object}   settings  The plugin/user settings
         * @return {void}
         */
        remove($tag, settings) {
            // Check if the animation is not set to none
            if (settings.animation != 'none') {
                // Add the animation classe to the tag and check when the animation has ended
                $tag.addClass(`animated ${settings.animation}`).on('animationend', () => {
                    // Check if a tag belongs to a tag group
                    if ($tag.parents('.tag-group').length) {
                        // Set the tag group
                        const $tagGroup = $tag.parents('.tag-group');

                        // Remove the tag
                        $tag.remove();

                        // Check if the tag group is empty
                        if (!$tagGroup.find('.tag').length) {
                            // Remove the tag group
                            $tagGroup.remove();
                        }
                    } else {
                        // Remove the tag
                        $tag.remove();
                    }
                });
            } else {
                // Check if a tag belongs to a tag group
                if ($tag.parents('.tag-group').length) {
                    // Set the tag group
                    const $tagGroup = $tag.parents('.tag-group');

                    // Remove the tag
                    $tag.remove();

                    // Check if the tag group is empty
                    if (!$tagGroup.find('.tag').length) {
                        // Remove the tag group
                        $tagGroup.remove();
                    }
                } else {
                    // Remove the tag
                    $tag.remove();
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
