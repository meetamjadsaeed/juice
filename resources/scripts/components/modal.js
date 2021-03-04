(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Modal';

    // Check if instantiation should be via amd, commonjs or the browser
    if (typeof define === 'function' && define.amd) {
        define([], factory(plugin_name));
    } else if (typeof exports === 'object') {
        module.exports = factory(plugin_name);
    } else {
        root[plugin_name] = factory(plugin_name);
    }
}((window || module || {}), function(plugin_name) {
    // Use strict mode
    'use strict';

    // Create an empty plugin object
    const plugin = {};

    // Set the plugin defaults
    const defaults = {
        close: true,
        closeContent: '<button type="button" class="button--component is-huge js-modal-close"><i class="fas fa-times"></i></button>',
        closeEsc: true,
        contentAnimation: true,
        contentAnimationClass: 'has-animation',
        contentAnimationIn: 'fade-in-up',
        contentAnimationOut: 'fade-out-down',
        overlayAnimation: true,
        overlayAnimationClass: 'has-animation',
        overlayAnimationIn: 'fade-in',
        overlayAnimationOut: 'fade-out',

        callbackCloseBefore: () => {},
        callbackCloseAfter: () => {},
        callbackDestroyBefore: () => {},
        callbackDestroyAfter: () => {},
        callbackInitializeBefore: () => {},
        callbackInitializeAfter: () => {},
        callbackOpenBefore: () => {},
        callbackOpenAfter: () => {},
        callbackRefreshBefore: () => {},
        callbackRefreshAfter: () => {},

        callbackCancel: () => {},
        callbackContinue: () => {},
        callbackEsc: () => {}
    };

    /**
     * Constructor.
     *
     * @param  {element}  element  The initialized element.
     * @param  {object}   options  The plugin options.
     * @return {void}
     */
    function Plugin(element, options) {
        // Set the plugin object
        plugin.this = this;
        plugin.name = plugin_name;
        plugin.element = element;
        plugin.defaults = defaults;
        plugin.options = options;
        plugin.settings = Object.assign({}, defaults, options);

        // Initialize the plugin
        plugin.this.initialize();
    }

    /**
     * Build the modal.
     *
     * @param  {element}  $target  The modal target.
     * @return {void}
     */
    const buildModal = ($target) => {
        // Create the modal
        const $modal = document.createElement('div');

        // Add the modal classes
        $modal.classList.add('overlay', 'modal');

        // Set the modal modifiers
        const center = $target.dataset.modalCenter || plugin.settings.center;
        const close = $target.dataset.modalClose || plugin.settings.close;

        // Check if a center modifier exists
        if (center) {
            // Add the center modifier class to the modal
            $modal.classList.add('modal--center');
        }

        // Append the target to the modal
        $modal.insertAdjacentHTML('beforeend', $target.innerHTML);

        // Check if a close modifier exists
        if (close) {
            // Create the close
            const $close = document.createElement('span');

            // Add the close classes
            $close.classList.add('modal__close');

            // Set the close content
            $close.innerHTML = plugin.settings.closeContent;

            // Append the close to the modal
            $modal.append($close);
        }

        // Append the modal to the document body
        document.body.insertAdjacentHTML('beforeend', $modal.outerHTML);
    };

    /**
     * Click event handler to cancel a modal.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickModalCancelEventHandler = (event) => {
        // Check if the event target is the cancel or a descendant of the cancel
        if (isTargetSelector(event.target, 'class', 'js-modal-cancel')) {
            // Prevent the default action
            event.preventDefault();

            // Call the cancel callback
            plugin.settings.callbackCancel.call();
        }
    };

    /**
     * Click event handler to close a modal.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickModalCloseEventHandler = (event) => {
        // Check if the event target is the close or a descendant of the close
        if (isTargetSelector(event.target, 'class', 'js-modal-close')) {
            // Prevent the default action
            event.preventDefault();

            // Set the close and modal
            const $close = event.target;
            const $modal = $close.closest('.modal');

            // Close the modal
            plugin.this.close($modal);
        }
    };

    /**
     * Click event handler to continue a modal.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickModalContinueEventHandler = (event) => {
        // Check if the event target is the continue or a descendant of the continue
        if (isTargetSelector(event.target, 'class', 'js-modal-continue')) {
            // Prevent the default action
            event.preventDefault();

            // Call the continue callback
            plugin.settings.callbackContinue.call();
        }
    };

    /**
     * Click event handler to trigger a modal.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickModalTriggerEventHandler = (event) => {
        // Check if the event target is the trigger or a descendant of the trigger
        if (isTargetSelector(event.target, 'class', 'has-modal')) {
            // Prevent the default action
            event.preventDefault();

            // Set the trigger and target
            const $trigger = event.target;
            const $target = document.querySelector($trigger.dataset.modalTarget);

            // Open the modal
            plugin.this.open($target);
        }
    };

    /**
     * Check if an event target is a target selector or a descendant of a target selector.
     *
     * @param  {element}  target     The event target.
     * @param  {string}   attribute  The event target attribute to check.
     * @param  {string}   selector   The id/class selector.
     * @return {bool}                True if event target, false otherwise.
     */
    const isTargetSelector = (target, attribute, selector) => {
        // Check if the target is an element node
        if (target.nodeType !== Node.ELEMENT_NODE) {
            // Return false
            return false;
        }

        // Start a switch statement for the attribute
        switch (attribute) {
            // Default
            default:
                // Return false
                return false;

            // Class
            case 'class': {
                // Return true if event target, false otherwise
                return ((target.classList.contains(selector)) || target.closest(`.${selector}`));
            }

            // Id
            case 'id': {
                // Return true if event target, false otherwise
                return ((target.id == selector) || target.closest(`#${selector}`));
            }
        }
    };

    /**
     * Trap focus to the modal.
     *
     * @param  {element}  $modal  The modal.
     * @return {void}
     */
    const trapFocus = ($modal) => {
        // Set the focusable elements
        const $focusables = $modal.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href]:not([disabled]), [tabindex]:not([tabindex="-1"])');
        const $focusable_first = $focusables[0];
        const $focusable_last = $focusables[$focusables.length - 1];

        // Set the keycodes
        const keycode_tab = 9;
        const keycode_esc = 27;

        // Add a keydown event handler to the modal
        $modal.addEventListener('keydown', function(event) {
            // Start a switch event for the keycode
            switch (event.keyCode) {
                // Esc
                case keycode_esc: {
                    // Check if the modal can be closed with the esc key
                    if (plugin.settings.closeEsc) {
                        // Prevent the default action
                        event.preventDefault();

                        // Call the esc callback
                        plugin.settings.callbackEsc.call();

                        // Close the modal
                        plugin.this.close($modal);
                    }

                    // Break the switch
                    break;
                }

                // Tab
                case keycode_tab: {
                    // Check if the shift key was pressed
                    if (event.shiftKey) {
                        // Check if the active element is the first focusable element
                        if (document.activeElement === $focusable_first) {
                            // Prevent the default action
                            event.preventDefault();

                            // Focus on the last focusable element
                            $focusable_last.focus();
                        }
                    } else {
                        if (document.activeElement === $focusable_last) {
                            // Prevent the default action
                            event.preventDefault();

                            // Focus on the first focusable element
                            $focusable_first.focus();
                        }
                    }

                    // Break the switch
                    break;
                }
            }
        });
    };

    /**
     * Public variables and methods.
     *
     * @type {object}
     */
    Plugin.prototype = {
        /**
         * Close a modal.
         *
         * @param  {element}  $target  The target for the modal.
         * @param  {bool}     silent   Suppress callbacks.
         * @return {void}
         */
        close: ($modal, silent = false) => {
            // Check if the modal exists and an overlay modal is open
            if ($modal && (document.body.classList.contains('has-overlay') || document.querySelector('.overlay.modal'))) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the close before callback
                    plugin.settings.callbackCloseBefore.call();
                }

                // Set the content
                const $content = $modal.querySelector('.modal__content');

                // Check if the overlay is animated
                if (plugin.settings.overlayAnimation) {
                    // Set the modal animation classes
                    $modal.classList.add('is-animating-out', plugin.settings.overlayAnimationClass, $modal.data.overlayAnimationOut);

                    // Add an animation end event handler to the modal
                    $modal.addEventListener('animationend', () => {
                        // Remove the modal
                        $modal.remove();

                        // Remove the overlay state hook from the document body
                        document.body.classList.remove('has-overlay');

                        // Check if the callbacks should not be suppressed
                        if (!silent) {
                            // Call the close after callback
                            plugin.settings.callbackCloseAfter.call();
                        }
                    }, {
                        once: true
                    });
                } else {
                    // Remove the modal
                    $modal.remove();

                    // Remove the overlay state hook from the document body
                    document.body.classList.remove('has-overlay');

                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the close after callback
                        plugin.settings.callbackCloseAfter.call();
                    }
                }

                // Check if the content is animated
                if (plugin.settings.contentAnimation) {
                    // Set the content animation classes
                    $content.classList.add('is-animating', plugin.settings.contentAnimationClass, $modal.data.contentAnimationOut);

                    // Add an animation end event handler to the content
                    $content.addEventListener('animationend', () => {
                        // Set the the content animation classes
                        $content.classList.remove('is-animating', plugin.settings.contentAnimationClass, $modal.data.contentAnimationOut);
                        $content.classList.add('has-animated');
                    }, {
                        once: true
                    });
                }
            }
        },

        /**
         * Call the close method silently.
         *
         * @param  {element}  $modal  The modal.
         * @return {void}
         */
        closeSilently: ($modal) => {
            // Call the close method silently
            plugin.this.close($modal, true);
        },

        /**
         * Destroy an existing initialization.
         *
         * @param  {bool}  silent  Suppress callbacks.
         * @return {void}
         */
        destroy: (silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy before callback
                plugin.settings.callbackDestroyBefore.call();
            }

            // Set the modals and triggers
            const $modals = document.querySelectorAll('.modal');

            // Check if any modals exists
            if ($modals) {
                // Cycle through all of the modals
                $modals.forEach(($modal) => {
                    // Close the modal
                    plugin.this.close($modal);
                });
            }

            // Remove the click event handlers from the modal
            document.removeEventListener('click', clickModalTriggerEventHandler);
            document.removeEventListener('click', clickModalCloseEventHandler);
            document.removeEventListener('click', clickModalCancelEventHandler);
            document.removeEventListener('click', clickModalContinueEventHandler);

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy after callback
                plugin.settings.callbackDestroyAfter.call();
            }
        },

        /**
         * Call the destroy method silently.
         *
         * @return {void}
         */
        destroySilently: () => {
            // Call the destroy method silently
            plugin.this.destroy(true);
        },

        /**
         * Initialize the plugin.
         *
         * @param  {bool}  silent  Suppress callbacks.
         * @return {void}
         */
        initialize: (silent = false) => {
            // Destroy the existing initialization silently
            plugin.this.destroySilently();

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize before callback
                plugin.settings.callbackInitializeBefore.call();
            }

            // Add the click event handlers to the modal
            document.addEventListener('click', clickModalTriggerEventHandler);
            document.addEventListener('click', clickModalCloseEventHandler);
            document.addEventListener('click', clickModalCancelEventHandler);
            document.addEventListener('click', clickModalContinueEventHandler);

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * Open a modal.
         *
         * @param  {element}  $target  The target modal.
         * @param  {bool}     silent   Suppress callbacks.
         * @return {void}
         */
        open: ($target, silent = false) => {
            // Check if the target exists and an overlay isn't already open
            if ($target && (!document.body.classList.contains('has-overlay') || !document.querySelector('.overlay'))) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the open before callback
                    plugin.settings.callbackOpenBefore.call();
                }

                // Add the overlay state hook to the document body
                document.body.classList.add('has-overlay');

                // Build the modal
                buildModal($target);

                // Set the modal elements
                const $modal = document.querySelector('.modal');
                const $content = $modal.querySelector('.modal__content');

                // Set the modal data
                $modal.data = {
                    overlayAnimationIn: $target.dataset.overlayAnimationIn || plugin.settings.overlayAnimationIn,
                    overlayAnimationOut: $target.dataset.overlayAnimationOut || plugin.settings.overlayAnimationOut,
                    contentAnimationIn: $target.dataset.contentAnimationIn || plugin.settings.contentAnimationIn,
                    contentAnimationOut: $target.dataset.contentAnimationOut || plugin.settings.contentAnimationOut,
                };

                // Set the modal tabindex and focus on the modal
                $modal.setAttribute('tabindex', -1);
                $modal.focus();

                // Trap focus inside the modal
                trapFocus($modal);

                // Check if the overlay is animated
                if (plugin.settings.overlayAnimation) {
                    // Set the modal animation classes
                    $modal.classList.add('is-animating-in', plugin.settings.overlayAnimationClass, $modal.data.overlayAnimationIn);

                    // Add an animation end event handler to the modal
                    $modal.addEventListener('animationend', () => {
                        // Set the the modal animation classes
                        $modal.classList.remove('is-animating-in', plugin.settings.overlayAnimationClass, $modal.data.overlayAnimationIn);
                        $modal.classList.add('has-animated');

                        // Check if the callbacks should not be suppressed
                        if (!silent) {
                            // Call the open after callback
                            plugin.settings.callbackOpenAfter.call();
                        }
                    }, {
                        once: true
                    });
                } else {
                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the open after callback
                        plugin.settings.callbackOpenAfter.call();
                    }
                }

                // Check if the content is animated
                if (plugin.settings.contentAnimation) {
                    // Set the content animation classes
                    $content.classList.add('is-animating-in', plugin.settings.contentAnimationClass, $modal.data.contentAnimationIn);

                    // Add an animation end event handler to the content
                    $content.addEventListener('animationend', () => {
                        // Set the the content animation classes
                        $content.classList.remove('is-animating-in', plugin.settings.contentAnimationClass, $modal.data.contentAnimationIn);
                        $content.classList.add('has-animated');
                    }, {
                        once: true
                    });
                }
            }
        },

        /**
         * Call the open method silently.
         *
         * @param  {element}  $target  The target for the modal.
         * @return {void}
         */
        openSilently: ($target) => {
            // Call the open method silently
            plugin.this.open($target, true);
        },

        /**
         * Refresh the plugins initialization.
         *
         * @param  {bool}  silent  Suppress callbacks.
         * @return {void}
         */
        refresh: (silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the refresh before callback
                plugin.settings.callbackRefreshBefore.call();
            }

            // Destroy the existing initialization
            plugin.this.destroy(silent);

            // Initialize the plugin
            plugin.this.initialize(silent);

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the refresh after callback
                plugin.settings.callbackRefreshAfter.call();
            }
        },

        /**
         * Call the refresh method silently.
         *
         * @return {void}
         */
        refreshSilently: () => {
            // Call the refresh method silently
            plugin.this.refresh(true);
        }
    };

    // Return the plugin
    return Plugin;
}));
