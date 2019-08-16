/*  ========================================================================
    JUICE -> COMPONENTS -> POPOVER
    ========================================================================  */

;(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Popover';

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
        animation: true,
        animationClass: 'has-animation',
        animationIn: 'fade-in',
        animationOut: 'fade-out',
        close: '<button type="button" class="button--component is-small has-large-font-size js-close-popover"><i class="fas fa-times"></i></button>',
        color: null,
        delayIn: 0,
        delayOut: 0,
        feedback: null,
        next: '<button type="button" class="button--component is-small has-large-font-size js-next-popover"><i class="fas fa-chevron-right"></i></button>',
        position: 'top',
        prev: '<button type="button" class="button--component is-small has-large-font-size js-prev-popover"><i class="fas fa-chevron-left"></i></button>',
        size: null,

        callbackInitializeBefore: () => {
            console.log('Popover: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Popover: callbackInitializeAfter');
        },
        callbackOpenBefore: () => {
            console.log('Popover: callbackOpenBefore');
        },
        callbackOpenAfter: () => {
            console.log('Popover: callbackOpenAfter');
        },
        callbackCloseBefore: () => {
            console.log('Popover: callbackCloseBefore');
        },
        callbackCloseAfter: () => {
            console.log('Popover: callbackCloseAfter');
        },
        callbackRefreshBefore: () => {
            console.log('Popover: callbackRefreshBefore');
        },
        callbackRefreshAfter: () => {
            console.log('Popover: callbackRefreshAfter');
        },
        callbackDestroyBefore: () => {
            console.log('Popover: callbackDestroyBefore');
        },
        callbackDestroyAfter: () => {
            console.log('Popover: callbackDestroyAfter');
        },

        callbackPrev: () => {
            console.log('Popover: callbackPrev');
        },
        callbackNext: () => {
            console.log('Popover: callbackNext');
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
     * Build the popover.
     * @param  {element}  $trigger  The trigger.
     * @return {element}            The popover.
     */
    const buildPopover = ($trigger) => {
        // Create the popover elements
        const $popover = document.createElement('div');
        const $content = document.createElement('div');
        const $head = document.createElement('div');
        const $heading = document.createElement('div');
        const $actions = document.createElement('div');
        const $body = document.createElement('div');

        // Add the popover classes
        $popover.classList.add('popover');
        $content.classList.add('popover__content');
        $head.classList.add('popover__head');
        $heading.classList.add('popover__heading');
        $actions.classList.add('popover__actions');
        $body.classList.add('popover__body');

        // Construct the popover
        $popover.append($content);
        $content.append($head);
        $content.append($body);
        $head.append($heading);
        $head.append($actions);
        $heading.insertAdjacentHTML('beforeend', $trigger.dataset.popoverTitle);
        $actions.insertAdjacentHTML('beforeend', plugin.settings.close);
        $body.insertAdjacentHTML('beforeend', $trigger.dataset.popoverText);

        // Check if the popover is grouped
        if ($trigger.dataset.popoverGroup) {
            // Set the group
            const group = $trigger.dataset.popoverGroup;

            // Set the triggers
            const $triggers = document.querySelectorAll('.has-popover[data-popover-group="' + group + '"]');

            // Check if any triggers exist
            if ($triggers) {
                // Set the triggers total
                const triggers_total = $triggers.length;

                // Check if there is more than on trigger in the group
                if (triggers_total > 1) {
                    // Check if the current trigger is not the last trigger in the group
                    if ($trigger != $triggers[triggers_total - 1]) {
                        // Construct the group navigation
                        $actions.insertAdjacentHTML('afterbegin', plugin.settings.next);
                    }

                    // Check if the current trigger is not the first trigger in the group
                    if ($trigger != $triggers[0]) {
                        // Construct the group navigation
                        $actions.insertAdjacentHTML('afterbegin', plugin.settings.prev);
                    }
                }
            }
        }

        // Set the popover modifiers
        const color = $trigger.dataset.popoverColor || plugin.settings.color;
        const feedback = $trigger.dataset.popoverFeedback || plugin.settings.feedback;
        const position = $trigger.dataset.popoverPosition || plugin.settings.position;
        const size = $trigger.dataset.popoverSize || plugin.settings.size;

        // Check if a color modifier exists
        if (color) {
            // Add the color modifier class to the popover
            $popover.classList.add(`is-${color}`);
        }

        // Check if a feedback modifier exists
        if (feedback) {
            // Add the feedback modifier class to the popover
            $popover.classList.add(`has-${feedback}`);
        }

        // Check if a position modifier exists
        if (position) {
            // Add the position modifier class to the popover
            $popover.classList.add(`popover--${position}`);
        }

        // Check if a size modifier exists
        if (size) {
            // Add the size modifier class to the popover
            $popover.classList.add(`is-${size}`);
        }

        // Return the popover
        return $popover;
    };

    /**
     * Event handler to open the previous popover in a popover group when the
     * popover previous is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickPrevEventListener = (event) => {
        // Prevent the default action
        event.preventDefault();

        // Call the prev callback
        plugin.settings.callbackPrev.call();

        // Set the previous, popover and trigger
        const $prev = event.currentTarget;
        const $popover = $prev.closest('.popover');
        const $trigger = $popover.data.trigger;

        // Set the group properties
        const group = $trigger.dataset.popoverGroup;
        const current = parseInt($trigger.dataset.popoverGroupOrder);
        const prev = current - 1;

        // Set the previous trigger
        const $trigger_prev = document.querySelector('.has-popover[data-popover-group="' + group + '"][data-popover-group-order="' + prev + '"]');

        // Open the previous popover
        plugin.this.open($trigger_prev);
    };

    /**
     * Event handler to open the next popover in a popover group when the
     * popover next is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickNextEventListener = (event) => {
        // Prevent the default action
        event.preventDefault();

        // Call the next callback
        plugin.settings.callbackNext.call();

        // Set the next, popover and trigger
        const $next = event.currentTarget;
        const $popover = $next.closest('.popover');
        const $trigger = $popover.data.trigger;

        // Set the group properties
        const group = $trigger.dataset.popoverGroup;
        const current = parseInt($trigger.dataset.popoverGroupOrder);
        const next = current + 1;

        // Set the next trigger
        const $trigger_next = document.querySelector('.has-popover[data-popover-group="' + group + '"][data-popover-group-order="' + next + '"]');

        // Open the next popover
        plugin.this.open($trigger_next);
    };

    /**
     * Event handler to close a popover when the close is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickCloseEventListener = (event) => {
        // Prevent the default action
        event.preventDefault();

        // Set the close and popover
        const $close = event.currentTarget;
        const $popover = $close.closest('.popover');

        // Close the popover
        plugin.this.close($popover);
   };

    /**
     * Event handler to toggle a popover when the popover trigger is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickTriggerEventHandler = (event) => {
        // Prevent the default action
        event.preventDefault();

        // Set the trigger
        const $trigger = event.currentTarget;

        // Check if the trigger data doesn't have an assigned popover
        if (!$trigger.data || !('popover' in $trigger.data)) {
            // Open the popover
            plugin.this.open($trigger);
        } else {
            // Check if the trigger data doesn't have an assigned popover
            if (!('popover' in $trigger.data)) {
                // Open the popover
                plugin.this.open($trigger);
            } else {
                // Set the popover
                const $popover = $trigger.data.popover;

                // Close the popover
                plugin.this.close($popover);
            }
        }
    };

    /**
     * Get an elements offset.
     * @param  {element}  $element  The element.
     * @return {object}             The element offset.
     */
    const getElementOffset = ($element) => {
        // Set the top and left positions
        let left = 0;
        let top = 0;

        // Loop through the dom tree and calculate each parent offset
        do {
            // Set the top and left positions
            top += $element.offsetTop || 0;
            left += $element.offsetLeft || 0;

            // Set the element to the parent element
            $element = $element.offsetParent;
        } while ($element);

        // Return the top and left positions
        return {
            top,
            left
        };
    };

    /**
     * Set the popover position.
     * @param  {element}  $trigger  The trigger.
     * @param  {element}  $popover  The popover.
     * @return {void}
     */
    const positionPopover = ($trigger, $popover) => {
        // Set the popover trigger offset
        const trigger_offset = getElementOffset($trigger);

        // Set the popover trigger left and top positions
        const trigger_left = trigger_offset.left;
        const trigger_top = trigger_offset.top;

        // Set the popover trigger dimensions
        const trigger_width = $trigger.offsetWidth;
        const trigger_height = $trigger.offsetHeight;

        // Set the popover dimensions
        const popover_width = $popover.offsetWidth;
        const popover_height = $popover.offsetHeight;

        // Set the popover left and top positions
        let popover_left;
        let popover_top;

        // Set the popover position modifier
        const position = $trigger.dataset.popoverPosition || plugin.settings.position;

        // Start a switch statement for the popover position
        switch (position) {
            // Top (default)
            default:
                // Set the popover left and top positions and break the switch
                popover_left = trigger_left + ((trigger_width - popover_width) / 2);
                popover_top = trigger_top - popover_height;
                break;

            // Right
            case 'right':
                // Set the popover left and top positions and break the switch
                popover_left = trigger_left + trigger_width;
                popover_top = trigger_top + ((trigger_height - popover_height) / 2);
                break;

            // Bottom
            case 'bottom':
                // Set the popover left and top positions and break the switch
                popover_left = trigger_left + ((trigger_width - popover_width) / 2);
                popover_top = trigger_top + trigger_height;
                break;

            // Left
            case 'left':
                // Set the popover left and top positions and break the switch
                popover_left = trigger_left - popover_width;
                popover_top = trigger_top + ((trigger_height - popover_height) / 2);
                break;
        }

        // Set the inline top and left positions
        $popover.style.left = `${Math.round(popover_left)}px`;
        $popover.style.top = `${Math.round(popover_top)}px`;
    };

    /**
     * Trap focus to the popover.
     * @param  {element}  $popover  The popover.
     * @return {void}
     */
    const trapFocus = ($popover) => {
        // Set the focusable elements
        const $focusables = $popover.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href]:not([disabled]), [tabindex]:not([tabindex="-1"])');
        const $focusable_first = $focusables[0];
        const $focusable_last = $focusables[$focusables.length - 1];

        // Set the keycodes
        const keycode_tab = 9;
        const keycode_esc = 27;

        // Add a keydown event listener to the popover to trap focus
        $popover.addEventListener('keydown', function(event) {
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
            }
        });
    }

    /**
     * Public variables and methods.
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

            // Check if the device is not a touch device
            if (document.documentElement.classList.contains('has-no-touch')) {
                // Set the triggers
                const $triggers = document.querySelectorAll(plugin.element);

                // Check if any triggers exist
                if ($triggers) {
                    // Cycle through all of the triggers
                    $triggers.forEach(($trigger) => {
                        // Add a click event handler to the trigger to toggle the popover
                        $trigger.addEventListener('click', clickTriggerEventHandler);
                    });
                }
            }

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * Open a popover.
         * @param  {element}  $trigger  The trigger.
         * @return {void}
         */
        open: ($trigger, silent = false) => {
            // Check if the trigger data doesn't have an assigned popover
            if ($trigger && (!$trigger.data || !('popover' in $trigger.data))) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the open before callback
                    plugin.settings.callbackOpenBefore.call(silent);
                }

                // Set the popovers
                const $popovers = document.querySelectorAll('.popover');

                // Check if any popovers exist
                if ($popovers) {
                    // Cycle through all of the popovers
                    $popovers.forEach(($popover) => {
                        // Close the popover
                        plugin.this.close($popover);
                    });
                }

                // Set the popover
                const $popover = buildPopover($trigger);

                // Start a timer
                setTimeout(() => {
                    // Append the popover to the body
                    document.body.appendChild($popover);

                    // Set the popover tabindex and focus on the popover
                    $popover.setAttribute('tabindex', -1);
                    $popover.focus({
                        preventScroll: true
                    });

                    // Trap focus inside the popover
                    trapFocus($popover);

                    // Position the popover
                    positionPopover($trigger, $popover);

                    // Assign the popover to the trigger data object
                    $trigger.data = {
                        popover: $popover
                    };

                    // Assign the trigger to the popover data object
                    $popover.data = {
                        trigger: $trigger
                    };

                    // Show the popover
                    $popover.style.display = 'block';

                    // Add the active state hook to the trigger
                    $trigger.classList.add('is-active');

                    // Check if the popover is animated
                    if (plugin.settings.animation) {
                        // Set the animation in
                        const animation_in = $trigger.dataset.popoverAnimationIn || plugin.settings.animationIn;

                        // Set the popover animation classes
                        $popover.classList.add('is-animating-in', plugin.settings.animationClass, animation_in);

                        // Add an animation end event listener to the popover
                        $popover.addEventListener('animationend', (event) => {
                            // Set the popover animation classes
                            $popover.classList.remove('is-animating-in', plugin.settings.animationClass, animation_in);
                            $popover.classList.add('has-animated');

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

                    // Set the previous, next and close
                    const $prevs = $popover.querySelectorAll('.js-prev-popover');
                    const $nexts = $popover.querySelectorAll('.js-next-popover');
                    const $closes = $popover.querySelectorAll('.js-close-popover');

                    // Check if any previous's exist
                    if ($prevs) {
                        // Cycle through all of the previous's
                        $prevs.forEach(($prev) => {
                            // Add a click event handler to the previous to go to the previous popover
                            $prev.addEventListener('click', clickPrevEventListener);
                        });
                    }

                    // Check if any nexts exist
                    if ($nexts) {
                        // Cycle through all of the nexts
                        $nexts.forEach(($next) => {
                            // Add a click event handler to the next to go to the next popover
                            $next.addEventListener('click', clickNextEventListener);
                        });
                    }

                    // Check if a closes exist
                    if ($closes) {
                        // Cycle through all of the closes
                        $closes.forEach(($close) => {
                            // Add a click event handler to the close to go close the popover
                            $close.addEventListener('click', clickCloseEventListener);
                        });
                    }
                }, $trigger.dataset.popoverDelayIn || plugin.settings.delayIn);
            }
        },

        /**
         * Close a popover.
         * @param  {element}  $popover  The popover.
         * @param  {bool}     silent    Suppress callbacks.
         * @return {void}
         */
        close: ($popover, silent = false) => {
            // Check if the popover exists and isn't animating out
            if ($popover && !$popover.classList.contains('is-animating-out')) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the close before callback
                    plugin.settings.callbackCloseBefore.call();
                }

                // Set the trigger
                const $trigger = $popover.data.trigger;

                // Start a timer
                setTimeout(() => {
                    // Check if the popover is animated
                    if (plugin.settings.animation) {
                        // Set the animation out
                        const animation_out = $trigger.dataset.popoverAnimationOut || plugin.settings.animationOut;

                        // Set the popover animation classes
                        $popover.classList.remove('has-animated');
                        $popover.classList.add('is-animating-out', plugin.settings.animationClass, animation_out);

                        // Add an animation end event listener to the popover
                        $popover.addEventListener('animationend', (event) => {
                            // Remove the popover
                            $popover.remove();

                            // Remove the active state hook from the trigger
                            $trigger.classList.remove('is-active');

                            // Remove the assigned popover from the trigger data
                            delete $trigger.data['popover'];

                            // Check if the callbacks should not be suppressed
                            if (!silent) {
                                // Call the close after callback
                                plugin.settings.callbackCloseAfter.call();
                            }
                        }, {
                            once: true
                        });
                    } else {
                        // Remove the popover
                        $popover.remove();

                        // Remove the active state hook from the trigger
                        $trigger.classList.remove('is-active');

                        // Remove the assigned popover from the trigger data
                        delete $trigger.data['popover'];

                        // Check if the callbacks should not be suppressed
                        if (!silent) {
                            // Call the close after callback
                            plugin.settings.callbackCloseAfter.call();
                        }
                    }
                }, $trigger.dataset.popoverDelayOut || plugin.settings.delayOut);
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

            // Check if the device is not a touch device
            if (document.documentElement.classList.contains('has-no-touch')) {
                // Set the triggers and popovers
                const $triggers = document.querySelectorAll(plugin.element);
                const $popovers = document.querySelectorAll('.popover');

                // Check if any triggers exist
                if ($triggers) {
                    // Cycle through all of the triggers
                    $triggers.forEach(($trigger) => {
                        // Remove the click event handler from the trigger
                        $trigger.removeEventListener('click', clickTriggerEventHandler);
                    });
                }

                // Check if any popovers exist
                if ($popovers) {
                    // Cycle through all of the popovers
                    $popovers.forEach(($popover) => {
                        // Close the popover
                        plugin.this.close($popover);
                    });
                }
            }

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy after callback
                plugin.settings.callbackDestroyAfter.call();
            }
        },

        /**
         * Call the open method silently.
         * @param  {element}  $trigger  The trigger.
         * @return {void}
         */
        openSilently: ($trigger, silent = false) => {
            // Call the open method silently
            plugin.this.open(true);
        },

        /**
         * Call the close method silently.
         * @param  {element}  $trigger  The trigger.
         * @return {void}
         */
        closeSilently: ($trigger, silent = false) => {
            // Call the close method silently
            plugin.this.close(true);
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
