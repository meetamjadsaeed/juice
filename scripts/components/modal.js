'use strict';

/* =============================================================================================
   JUICE -> COMPONENTS -> MODAL
   ============================================================================================= */

;((($, window, document, undefined) => {
    // Set the plugin name
    const pluginName = 'modal';

    // Set the plugin defaults
    const defaults = {
        animationIn: 'fadeInDownTiny',
        animationOut: 'fadeOutUpTiny',
        clickOverlayClose: true,
        closeContent: '<i class="fas fa-times"></i>',
        escKeyClose: true,
        overlayFade: true
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
            // Add a click event handler to insert the modal
            $(document).on('click', '.has-modal', (event) => {
                // Stop immediate propagation
                event.stopImmediatePropagation();

                // Set the elements
                const $element = $(event.currentTarget);
                const $target = $($element.data('modal-target'));

                // Force blur on the element
                $element.blur();

                // Set the modal
                const $modal = this.build($target);

                // Insert the modal
                this.insert($modal);

                // Set the modal to have a focusable tabindex and set the focus to the modal
                $modal.attr('tabindex', -1).focus();

                // Set all the visible tabbable elements in the modal
                const $tabbables = $modal.find('input, select, textarea, button, a').filter(':visible');

                // Set the first and last tabbable elements
                var $firstTabbable = $tabbables.first();
                var $lastTabbable = $tabbables.last();

                // Add a click event handler to force focus to the first tabbable element
                $lastTabbable.on('keydown', function (event) {
                    // Check if the key pressed was the tab key
                    if ((event.which === 9 && !event.shiftKey)) {
                        // Prevent the default action
                        event.preventDefault();

                        // Set the focus to the first tabbable element
                        $firstTabbable.focus();
                    }
                });

                // Add a click event handler to force focus to the last tabbable element
                $firstTabbable.on('keydown', function (event) {
                    // Check if the key pressed was the shift+tab keys
                    if ((event.which === 9 && event.shiftKey)) {
                        // Prevent the default action
                        event.preventDefault();

                        // Set the focus to the last tabbable element
                        $lastTabbable.focus();
                    }
                });
            });

            // Add a click event handler to remove the modal
            $(document).on('click', '.js-modal-close', (event) => {
                // Set the modal
                const $modal = $('.modal');

                // See if the modal exists
                if ($modal.length) {
                    // Remove the modal
                    this.remove($modal);
                }
            });

            // Check if the modal can be closed with the escape key
            if (this.settings.escKeyClose) {
                // Add a keyup event handler to remove the modal
                $(document).on('keyup', (event) => {
                    // Set the modal
                    const $modal = $('.modal');

                    // See if the modal exists
                    if ($modal.length) {
                        // Check if the key pressed was the escape key
                        if (event.keyCode == 27) {
                            // Remove the modal
                            this.remove($modal);
                        }
                    }
                });
            }

            // Check if the modal can be closed by clicking the overlay
            if (this.settings.clickOverlayClose) {
                // Add a click event handler to remove the modal
                $(document).on('click', '.overlay.modal', (event) => {
                    // Check to see if the click event target was the overlay
                    if ($(event.target).is('.overlay.modal')) {
                        // Set the modal
                        const $modal = $('.modal');

                        // See if the modal exists
                        if ($modal.length) {
                            // Remove the modal
                            this.remove($modal);
                        }
                    }
                });
            }
        },

        /**
         * Build the modal
         * @param  {element}  $target  The target element
         * @return {element}           The modal element
         */
        build($target) {
            // Set the modal elements
            const $modal = $('<div>', { 'class': 'overlay modal' });
            const $modalClose = $('<button>', { 'class': 'modal__close js-modal-close' });

            // Construct the modal
            $modal.append(
                $modalClose.append(
                    this.settings.closeContent
                ),
                $target.html()
            );

            // Set the modal modifiers
            const center = $target.data('modal-center') || this.settings.center;

            // Check if a color modifier exists
            if (center) {
                // Add the center class modifier to the modal
                $modal.addClass('modal--center');
            }

            // Return the modal
            return $modal;
        },

        /**
         * Insert a modal
         * @param  {element}  $modal  The modal element
         * @return {void}
         */
        insert($modal) {
            // Add the emulated scrollbar state class and assign the emulated scrollbar width to the html tag
            $('html').addClass('has-emulated-scrollbar').css({
                'padding-right': window.innerWidth - document.documentElement.clientWidth
            });

            // Add the overlay state class and append the modal to the body
            $('body').addClass('has-overlay').append($modal);

            // Check if the animation in is set
            if (this.settings.animationIn && this.settings.animationIn != 'none') {
                // Set the modal item
                const $modalItem = $modal.find('.modal__item');

                // Add the animation in classes to the modal item and check when the animation has ended
                $modalItem.addClass(`animated ${this.settings.animationIn}`).one('animationend', () => {
                    // Remove the animation in classes
                    $modalItem.removeClass(`animated ${this.settings.animationIn}`);
                });
            }

            // Check if the overlay should fade in
            if (this.settings.overlayFade) {
                // Add the animation in classes to the modal and check when the animation has ended
                $modal.addClass('animated fadeIn').one('animationend', () => {
                    // Remove the animation in classes
                    $modal.removeClass('animated fadeIn');
                });
            }
        },

        /**
         * Remove a modal
         * @param  {element}  $modal  The modal element
         * @return {void}
         */
        remove($modal) {
            // Check if the animation out is set
            if (this.settings.animationOut && this.settings.animationOut != 'none') {
                // Set the modal item
                const $modalItem = $modal.find('.modal__item');

                // Add the animation out classes to the modal item and check when the animation has ended
                $modalItem.addClass(`animated ${this.settings.animationOut}`).one('animationend', () => {
                    // Remove the animation out classes
                    $modalItem.removeClass(`animated ${this.settings.animationOut}`);
                });
            }

            // Check if the overlay should fade out
            if (this.settings.overlayFade) {
                // Add the animation out classes to the modal and check when the animation has ended
                $modal.addClass('animated fadeOut').one('animationend', () => {
                    // Remove the animation out classes
                    $modal.removeClass('animated fadeOut');

                    // Remove the modal
                    $modal.remove();

                    // Remove the overlay state class from the body
                    $('body').removeClass('has-overlay');

                    // Remove the emulated scrollbar state class and remove the emulated scrollbar width to the html tag
                    $('html').removeClass('has-emulated-scrollbar').css({
                        'padding-right': 0
                    });
                });
            } else {
                // Remove the modal
                $modal.remove();

                // Remove the emulated scrollbar state class and remove the emulated scrollbar width to the html tag
                $('html').removeClass('has-emulated-scrollbar').css({
                    'padding-right': 0
                });
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
