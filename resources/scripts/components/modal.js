/*  ========================================================================
    JUICE -> COMPONENTS -> MODAL
    ========================================================================  */

;(function (root, factory) {
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
        color: null,
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
        feedback: null,
        size: null,

        callbackInitializeBefore: () => {
            console.log('Modal: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Modal: callbackInitializeAfter');
        },
        callbackOpenBefore: () => {
            console.log('Modal: callbackOpenBefore');
        },
        callbackOpenAfter: () => {
            console.log('Modal: callbackOpenAfter');
        },
        callbackCloseBefore: () => {
            console.log('Modal: callbackCloseBefore');
        },
        callbackCloseAfter: () => {
            console.log('Modal: callbackCloseAfter');
        },
        callbackRefreshBefore: () => {
            console.log('Modal: callbackRefreshBefore');
        },
        callbackRefreshAfter: () => {
            console.log('Modal: callbackRefreshAfter');
        },
        callbackDestroyBefore: () => {
            console.log('Modal: callbackDestroyBefore');
        },
        callbackDestroyAfter: () => {
            console.log('Modal: callbackDestroyAfter')
        },

        callbackCancel: () => {
            console.log('Modal: callbackCancel');
        },
        callbackContinue: () => {
            console.log('Modal: callbackContinue');
        },
        callbackEsc: () => {
            console.log('Modal: callbackEsc');
        }
    };

    /**
     * Constructor.
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

        // Set the modal modifiers
        const color = $target.dataset.modalColor || plugin.settings.color;
        const feedback = $target.dataset.modalFeedback || plugin.settings.feedback;
        const size = $target.dataset.modalSize || plugin.settings.size;

        // Check if a color modifier exists
        if (color) {
            // Add the color modifier class to the modal
            $modal.classList.add(`is-${color}`);
        }

        // Check if a feedback modifier exists
        if (feedback) {
            // Add the feedback modifier class to the modal
            $modal.classList.add(`has-${feedback}`);
        }

        // Check if a size modifier exists
        if (size) {
            // Add the size modifier class to the modal
            $modal.classList.add(`is-${size}`);
        }

        // Append the modal to the document body
        document.body.insertAdjacentHTML('beforeend', $modal.outerHTML);
    };

    /**
     * Event handler to trigger the cancel callback when the cancel button is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickCancelEventHandler = (event) => {
        // Prevent the default action
        event.preventDefault();

        // Call the cancel callback
        plugin.settings.callbackCancel.call();
    };

    /**
     * Event handler to remove a modal when the close is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickCloseEventHandler = (event) => {
        // Prevent the default action
        event.preventDefault();

        // Set the close and modal
        const $close = event.currentTarget;
        const $modal = $close.closest('.modal');

        // Close the modal
        plugin.this.close($modal);
    };

    /**
     * Event handler to trigger the continue callback when the continue button is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickContinueEventHandler = (event) => {
        // Prevent the default action
        event.preventDefault();

        // Call the continue callback
        plugin.settings.callbackContinue.call();
    };

    /**
     * Event handler to open a modal when the trigger is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickTriggerEventHandler = (event) => {
        // Prevent the default action
        event.preventDefault();

        // Set the trigger and target
        const $trigger = event.currentTarget;
        const $target = document.querySelector($trigger.dataset.modalTarget);

        // Open the modal
        plugin.this.open($target);
    };

    /**
     * Trap focus to the modal.
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

        // Add a keydown event listener to the modal to trap focus
        $modal.addEventListener('keydown', function(event) {
            // Start a switch event for the keycode
            switch (event.keyCode) {
                // Tab
                case keycode_tab:
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

                // Esc
                case keycode_esc:
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
        });
    }

    /**
     * Public variables and methods
     * @type {object}
     */
    Plugin.prototype = {
        /**
         * Initialize the plugin.
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

            // Set the triggers
            const $triggers = document.querySelectorAll(plugin.element);

            // Check if any triggers exist
            if ($triggers) {
                // Cycle through all of the triggers
                $triggers.forEach(($trigger) => {
                    // Add a click event handler to the trigger to open the modal
                    $trigger.addEventListener('click', clickTriggerEventHandler);
                });
            }

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * Open a modal.
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
                const $closes = $modal.querySelectorAll('.js-modal-close');
                const $cancels = $modal.querySelectorAll('.js-modal-cancel');
                const $continues = $modal.querySelectorAll('.js-modal-continue');

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

                    // Add an animation end event listener to the modal
                    $modal.addEventListener('animationend', (event) => {
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

                    // Add an animation end event listener to the content
                    $content.addEventListener('animationend', (event) => {
                        // Set the the content animation classes
                        $content.classList.remove('is-animating-in', plugin.settings.contentAnimationClass, $modal.data.contentAnimationIn);
                        $content.classList.add('has-animated');
                    }, {
                        once: true
                    });
                }

                // Check if any closes exist
                if ($closes) {
                    // Cycle through all of the closes
                    $closes.forEach(($close) => {
                        // Add a click event handler to the close button to close the modal
                        $close.addEventListener('click', clickCloseEventHandler);
                    });
                }

                // Check if any cancels exist
                if ($cancels) {
                    // Cycle through all of the cancels
                    $cancels.forEach(($cancel) => {
                        // Add a click event handler to the cancel button to trigger the cancel callback
                        $cancel.addEventListener('click', clickCancelEventHandler);
                    });
                }

                // Check if any continues exist
                if ($continues) {
                    // Cycle through all of the continues
                    $continues.forEach(($continue) => {
                        // Add a click event handler to the cancel button to trigger the cancel callback
                        $continue.addEventListener('click', clickContinueEventHandler);
                    });
                }
            }
        },

        /**
         * Close a modal.
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

                    // Add an animation end event listener to the modal
                    $modal.addEventListener('animationend', (event) => {
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

                    // Add an animation end event listener to the content
                    $content.addEventListener('animationend', (event) => {
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
         * Refresh the plugins initialization.
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
         * Destroy an existing initialization.
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
            const $triggers = document.querySelectorAll(plugin.element);

            // Check if any modals exists
            if ($modals) {
                // Cycle through all of the modals
                $modals.forEach(($modal) => {
                    // Close the modal
                    plugin.this.close($modal);
                });
            }

            // Check if any triggers exist
            if ($triggers) {
                // Cycle through all of the triggers
                $triggers.forEach(($trigger) => {
                    // Remove the click event handler from the trigger
                    $trigger.removeEventListener('click', clickTriggerEventHandler);
                });
            }

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy after callback
                plugin.settings.callbackDestroyAfter.call();
            }
        },

        /**
         * Call the open method silently.
         * @param  {element}  $target  The target for the modal.
         * @return {void}
         */
        openSilently: ($target) => {
            // Call the open method silently
            plugin.this.open($target, true);
        },

        /**
         * Call the close method silently.
         * @param  {element}  $modal  The modal.
         * @return {void}
         */
        closeSilently: ($modal) => {
            // Call the close method silently
            plugin.this.close($modal, true);
        },

        /**
         * Call the refresh method silently.
         * @return {void}
         */
        refreshSilently: () => {
            // Call the refresh method silently
            plugin.this.refresh(true);
        },

        /**
         * Call the destroy method silently.
         * @return {void}
         */
        destroySilently: () => {
            // Call the destroy method silently
            plugin.this.destroy(true);
        }
    };

    // Return the plugin
    return Plugin;
}));
