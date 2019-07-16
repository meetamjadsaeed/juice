/*  ========================================================================
    JUICE -> COMPONENTS -> TOGGLER
    ========================================================================  */

;(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Tooltip';

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
        animationIn: 'zoom-in',
        animationOut: 'zoom-out',
        color: null,
        delayIn: 0,
        delayOut: 0,
        duration: 2000,
        feedback: null,
        position: 'top',
        size: null,

        callbackInitializeBefore: () => {
            console.log('Tooltip: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Tooltip: callbackInitializeAfter');
        },
        callbackOpenBefore: () => {
            console.log('Tooltip: callbackOpenBefore');
        },
        callbackOpenAfter: () => {
            console.log('Tooltip: callbackOpenAfter');
        },
        callbackCloseBefore: () => {
            console.log('Tooltip: callbackCloseBefore');
        },
        callbackCloseAfter: () => {
            console.log('Tooltip: callbackCloseAfter');
        },
        callbackRefreshBefore: () => {
            console.log('Tooltip: callbackRefreshBefore');
        },
        callbackRefreshAfter: () => {
            console.log('Tooltip: callbackRefreshAfter');
        },
        callbackDestroyBefore: () => {
            console.log('Tooltip: callbackDestroyBefore');
        },
        callbackDestroyAfter: () => {
            console.log('Tooltip: callbackDestroyAfter');
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
        plugin.settings = extendDefaults(defaults, options);

        // Initialize the plugin
        plugin.this.initialize();
    }

    /**
     * Merge the default plugin settings with the user options.
     * @param  {object}  defaults  The default plugin settings.
     * @param  {object}  options   The user options.
     * @return {object}            The extended plugin settings.
     */
    const extendDefaults = (defaults, options) => {
        // Cycle through the user options
        for (let property in options) {
            // Check if the property exists in the user options
            if (options.hasOwnProperty(property)) {
                // Set the defaults property to the options property
                defaults[property] = options[property];
            }
        }

        // Return the extended plugin settings
        return defaults;
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
     * Build the tooltip.
     * @param  {element}  $trigger  The tooltip trigger.
     * @return {element}              The tooltip.
     */
    const buildTooltip = ($trigger) => {
        // Create the tooltip and content
        const $tooltip = document.createElement('div');
        const $content = document.createElement('div');

        // Add the tooltip and content classes
        $tooltip.classList.add('tooltip');
        $content.classList.add('tooltip__content');

        // Construct the tooltip
        $tooltip.append($content);
        $content.append($trigger.dataset.tooltip);

        // Set the tooltip modifiers
        const color = $trigger.dataset.tooltipColor || plugin.settings.color;
        const feedback = $trigger.dataset.tooltipFeedback || plugin.settings.feedback;
        const position = $trigger.dataset.tooltipPosition || plugin.settings.position;
        const size = $trigger.dataset.tooltipSize || plugin.settings.size;

        // Check if a color modifier exists
        if (color) {
            // Add the color modifier class to the tooltip
            $tooltip.classList.add(`is-${color}`);
        }

        // Check if a feedback modifier exists
        if (feedback) {
            // Add the feedback modifier class to the tooltip
            $tooltip.classList.add(`has-${feedback}`);
        }

        // Check if a position modifier exists
        if (position) {
            // Add the position modifier class to the tooltip
            $tooltip.classList.add(`tooltip--${position}`);
        }

        // Check if a size modifier exists
        if (size) {
            // Add the size modifier class to the tooltip
            $tooltip.classList.add(`is-${size}`);
        }

        // Return the tooltip
        return $tooltip;
    };

    /**
     * Set the tooltip position relative to the tooltip trigger.
     * @param  {element}  $trigger  The tooltip trigger.
     * @param  {element}  $tooltip    The tooltip.
     * @return {void}
     */
    const positionTooltip = ($trigger, $tooltip) => {
        // Set the tooltip trigger offset
        const trigger_offset = getElementOffset($trigger);

        // Set the tooltip trigger left and top positions
        const trigger_left = trigger_offset.left;
        const trigger_top = trigger_offset.top;

        // Set the tooltip trigger dimensions
        const trigger_width = $trigger.offsetWidth;
        const trigger_height = $trigger.offsetHeight;

        // Set the tooltip dimensions
        const tooltip_width = $tooltip.offsetWidth;
        const tooltip_height = $tooltip.offsetHeight;

        // Set the tooltip left and top positions
        let tooltip_left;
        let tooltip_top;

        // Set the tooltip position modifier
        const position =
            $trigger.dataset.tooltipPosition ||
            plugin.settings.position;

        // Start a switch statement for the tooltip position
        switch (position) {
            // Top (default)
            default:
                // Set the tooltip left and top positions
                tooltip_left =
                    trigger_left + ((trigger_width - tooltip_width) / 2);
                tooltip_top =
                    trigger_top - tooltip_height;
            break;

            // Right
            case 'right':
                // Set the tooltip left and top positions
                tooltip_left =
                    trigger_left + trigger_width;
                tooltip_top =
                    trigger_top + ((trigger_height - tooltip_height) / 2);
            break;

            // Bottom
            case 'bottom':
                // Set the tooltip left and top positions
                tooltip_left =
                    trigger_left + ((trigger_width - tooltip_width) / 2);
                tooltip_top =
                    trigger_top + trigger_height;
            break;

            // Left
            case 'left':
                // Set the tooltip left and top positions
                tooltip_left =
                    trigger_left - tooltip_width;
                tooltip_top =
                    trigger_top + ((trigger_height - tooltip_height) / 2);
            break;
        }

        // Set the inline top and left positions
        $tooltip.style.left = `${Math.round(tooltip_left)}px`;
        $tooltip.style.top = `${Math.round(tooltip_top)}px`;
    };

    /**
     * Event handler to open a tooltip relative to its tooltip trigger.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const openEventHandler = (event) => {
        // Set the tooltip trigger
        const $trigger = event.target;

        // Open the tooltip
        plugin.this.open($trigger);
    };

    /**
     * Event handler to close a tooltip.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const closeEventHandler = (event) => {
        // Set the trigger and tooltip
        const $trigger = event.target;
        const $tooltip = $trigger.data.tooltip;

        // Close the tooltip
        plugin.this.close($tooltip);
    };

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
                        // Add mouse enter and focus event handlers to the trigger to open the tooltip
                        $trigger.addEventListener('mouseenter', openEventHandler);
                        $trigger.addEventListener('focus', openEventHandler);

                        // Add mouse leave, click event and focus out event handlers to the trigger to remove the tooltip
                        $trigger.addEventListener('mouseleave', closeEventHandler);
                        $trigger.addEventListener('click', closeEventHandler);
                        $trigger.addEventListener('focusout', closeEventHandler);
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
         * Open a tooltip.
         * @param  {element}  $trigger  The trigger.
         * @return {void}
         */
        open: ($trigger, silent = false) => {
            // Check if the trigger exists
            if ($trigger) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the open before callback
                    plugin.settings.callbackOpenBefore.call(silent);
                }

                // Set the tooltips
                const $tooltips = document.querySelectorAll('.tooltip:not(.is-animating-out)');

                // Check if any tooltips exist
                if ($tooltips) {
                    // Cycle through all of the tooltips
                    $tooltips.forEach(($tooltip) => {
                        // Close the tooltip
                        plugin.this.close($tooltip);
                    });
                }

                // Set the tooltip
                const $tooltip = buildTooltip($trigger);

                // Start a timer
                setTimeout(() => {
                    // Append the tooltip to the body
                    document.body.appendChild($tooltip);

                    // Position the tooltip
                    positionTooltip($trigger, $tooltip);

                    // Assign the tooltip to the tooltip trigger data object
                    $trigger.data = {
                        tooltip: $tooltip
                    };

                    // Assign the tooltip trigger to the tooltip data object
                    $tooltip.data = {
                        trigger: $trigger
                    };

                    // Show the tooltip
                    $tooltip.style.display = 'block';

                    // Add the active state hook to the tooltip trigger
                    $trigger.classList.add('is-active');

                    // Check if the the tooltip is animated
                    if (plugin.settings.animation) {
                        // Set the tooltip animation in
                        const animation_in = $trigger.dataset.tooltipAnimationIn || plugin.settings.animationIn;

                        // Set the tooltip animation classes
                        $tooltip.classList.add('is-animating-in', plugin.settings.animationClass, animation_in);

                        // Add an animation end event listener to the tooltip
                        $tooltip.addEventListener('animationend', (event) => {
                            // Set the tooltip animation classes
                            $tooltip.classList.remove('is-animating-in', plugin.settings.animationClass, animation_in);
                            $tooltip.classList.add('has-animated');

                            // Check if the callbacks should not be suppressed
                            if (!silent) {
                                // Call the open after callback
                                plugin.settings.callbackOpenAfter.call();
                            }

                            // Set the duration
                            const duration = $trigger.dataset.tooltipDuration || plugin.settings.duration;

                            // Check if the tooltip has a display duration
                            if (duration > 0) {
                                // Start a timer
                                setTimeout(() => {
                                    // Check if a trigger data object exists
                                    if ($trigger.data) {
                                        // Check if the trigger data has an assigned tooltip
                                        if ('tooltip' in $trigger.data) {
                                            // Close the tooltip
                                            plugin.this.close($trigger.data.tooltip);
                                        }
                                    }
                                }, duration);
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

                        // Set the duration
                        const duration = $trigger.dataset.tooltipDuration || plugin.settings.duration;

                        // Check if the tooltip has a display duration
                        if (duration > 0) {
                            // Start a timer
                            setTimeout(() => {
                                // Check if a trigger data object exists
                                if ($trigger.data) {
                                    // Check if the trigger data has an assigned tooltip
                                    if ('tooltip' in $trigger.data) {
                                        // Close the tooltip
                                        plugin.this.close($trigger.data.tooltip);
                                    }
                                }
                            }, duration);
                        }
                    }

                }, $trigger.dataset.tooltipDelayIn || plugin.settings.delayIn);
            }
        },

        /**
         * Close a tooltip.
         * @param  {element}  $tooltip  The tooltip.
         * @param  {bool}     silent    Suppress callbacks.
         * @return {void}
         */
        close: ($tooltip, silent = false) => {
            // Check if the tooltip exists
            if ($tooltip && !$tooltip.classList.contains('is-animating-out')) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the remove before callback
                    plugin.settings.callbackCloseBefore.call();
                }

                // Set the trigger
                const $trigger = $tooltip.data.trigger;

                // Start a timer
                setTimeout(() => {
                    // Set the animation out
                    const animation_out = $trigger.dataset.tooltipAnimationOut || plugin.settings.animationOut;

                    // Set the tooltip animation classes
                    $tooltip.classList.remove('has-animated');
                    $tooltip.classList.add('is-animating-out', plugin.settings.animationClass, animation_out);

                    // Add an animation end event listener to the tooltip
                    $tooltip.addEventListener('animationend', (event) => {
                        // Check if the tooltip exists
                        if ($tooltip) {
                            // Remove the tooltip
                            $tooltip.remove();
                        }

                        // Remove the assigned tooltip from the trigger data
                        delete $trigger.data['tooltip'];

                        // Remove the active state hook from the trigger
                        $trigger.classList.remove('is-active');

                        // Check if the callbacks should not be suppressed
                        if (!silent) {
                            // Call the remove after callback
                            plugin.settings.callbackCloseAfter.call();
                        }
                    }, {
                        once: true
                    });
                }, $trigger.dataset.tooltipDelayOut || plugin.settings.delayOut);
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
                // Set the triggers and tooltips
                const $triggers = document.querySelectorAll(plugin.element);

                // Check if any triggers exist
                if ($triggers) {
                    // Cycle through all of the triggers
                    $triggers.forEach(($trigger) => {
                        // Remove the mouse enter and focus event handlers from the tooltip trigger
                        $trigger.removeEventListener('mouseenter', openEventHandler);
                        $trigger.removeEventListener('focus', openEventHandler);

                        // Remove the mouse leave, click and focus out event handlers from the tooltip trigger
                        $trigger.removeEventListener('mouseleave', closeEventHandler);
                        $trigger.removeEventListener('click', closeEventHandler);
                        $trigger.removeEventListener('focusout', closeEventHandler);
                    });
                }
            }

            // Check if the callbacks should not be suppressed.
            if (!silent) {
                // Call the destroy after callback
                plugin.settings.callbackDestroyAfter.call();
            }
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
