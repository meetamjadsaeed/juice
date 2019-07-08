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
        animationIn: 'zoom-in',
        animationOut: 'zoom-out',
        callbackInitializeBefore: () => {
            console.log('Tooltip: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Tooltip: callbackInitializeAfter');
        },
        callbackInsertBefore: () => {
            console.log('Tooltip: callbackInsertBefore');
        },
        callbackInsertAfter: () => {
            console.log('Tooltip: callbackInsertAfter');
        },
        callbackRemoveBefore: () => {
            console.log('Tooltip: callbackRemoveBefore');
        },
        callbackRemoveAfter: () => {
            console.log('Tooltip: callbackRemoveAfter');
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
        },
        color: null,
        delayIn: 0,
        delayOut: 0,
        duration: 2000,
        feedback: null,
        position: 'top',
        size: null
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
     * Build a tooltip.
     * @param  {element}  $container  The tooltip container.
     * @return {element}              The tooltip.
     */
    const buildTooltip = ($container) => {
        // Create the tooltip and tooltip content
        const $tooltip = document.createElement('div');
        const $content = document.createElement('div');

        // Add the tooltip classes
        $tooltip.classList.add('tooltip');
        $content.classList.add('tooltip__content');

        // Construct the tooltip
        $tooltip.append($content);
        $content.append($container.dataset.tooltip);

        // Set the tooltip modifiers
        const color =
            $container.dataset.tooltipColor ||
            plugin.settings.color;
        const feedback =
            $container.dataset.tooltipFeedback ||
            plugin.settings.feedback;
        const position =
            $container.dataset.tooltipPosition ||
            plugin.settings.position;
        const size =
            $container.dataset.tooltipSize ||
            plugin.settings.size;

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
     * Set the tooltip position relative to the tooltip container.
     * @param  {element}  $container  The tooltip container.
     * @param  {element}  $tooltip    The tooltip.
     * @return {void}
     */
    const positionTooltip = ($container, $tooltip) => {
        // Set the tooltip container offset
        const container_offset = getElementOffset($container);

        // Set the tooltip container left and top positions
        const container_left = container_offset.left;
        const container_top = container_offset.top;

        // Set the tooltip container dimensions
        const container_width = $container.offsetWidth;
        const container_height = $container.offsetHeight;

        // Set the tooltip dimensions
        const tooltip_width = $tooltip.offsetWidth;
        const tooltip_height = $tooltip.offsetHeight;

        // Set the tooltip left and top positions
        let tooltip_left;
        let tooltip_top;

        // Set the tooltip position modifier
        const position =
            $container.dataset.tooltipPosition ||
            plugin.settings.position;

        // Start a switch statement for the tooltip position
        switch (position) {
            // Top (default)
            default:
                // Set the tooltip left and top positions
                tooltip_left =
                    container_left + ((container_width - tooltip_width) / 2);
                tooltip_top =
                    container_top - tooltip_height;
            break;

            // Right
            case 'right':
                // Set the tooltip left and top positions
                tooltip_left =
                    container_left + container_width;
                tooltip_top =
                    container_top + ((container_height - tooltip_height) / 2);
            break;

            // Bottom
            case 'bottom':
                // Set the tooltip left and top positions
                tooltip_left =
                    container_left + ((container_width - tooltip_width) / 2);
                tooltip_top =
                    container_top + container_height;
            break;

            // Left
            case 'left':
                // Set the tooltip left and top positions
                tooltip_left =
                    container_left - tooltip_width;
                tooltip_top =
                    container_top + ((container_height - tooltip_height) / 2);
            break;
        }

        // Set the inline top and left positions
        $tooltip.style.left = `${Math.round(tooltip_left)}px`;
        $tooltip.style.top = `${Math.round(tooltip_top)}px`;
    };

    /**
     * Insert a tooltip.
     * @param  {element}  $container  The tooltip container.
     * @param  {element}  $tooltip    The tooltip.
     * @return {void}
     */
    const insertTooltip = ($container, $tooltip) => {
        // Call the insert before callback
        plugin.settings.callbackInsertBefore.call();

        // Set the tooltip delay in
        const delay_in =
            $container.dataset.tooltipDelayIn ||
            plugin.settings.delayIn;

        // Start a timer
        setTimeout(() => {
            // Set the body
            const $body = document.querySelector('body');

            // Append the tooltip to the body
            $body.appendChild($tooltip);

            // Position the tooltip
            positionTooltip($container, $tooltip);

            // Assign the tooltip to the tooltip container data object
            $container.data = {
                tooltip: $tooltip
            };

            // Assign the tooltip container to the tooltip data object
            $tooltip.data = {
                container: $container
            };

            // Show the tooltip
            $tooltip.style.display = 'block';

            // Add the active state hook to the tooltip container
            $container.classList.add('is-active');

            // Set the tooltip animation in
            const animation_in =
                $container.dataset.tooltipAnimationIn ||
                plugin.settings.animationIn;

            // Check if the animation in is set
            if (animation_in && animation_in != 'none') {
                // Add the animating state hook to the tooltip
                $tooltip.classList.add('is-animating');

                // Add the animation classes to the tooltip
                $tooltip.classList.add('has-animation');
                $tooltip.classList.add(animation_in);

                // Add an animation end event listener to the tooltip
                $tooltip.addEventListener('animationend', (event) => {
                    // Remove the animating state hook from the tooltip
                    $tooltip.classList.remove('is-animating');

                    // Remove the animation classes from the tooltip
                    $tooltip.classList.remove('has-animation');
                    $tooltip.classList.remove(animation_in);

                    // Add the animated state hook to the tooltip
                    $tooltip.classList.add('has-animated');

                    // Call the insert after callback
                    plugin.settings.callbackInsertAfter.call();

                    // Set the tooltip duration
                    const duration =
                        $container.dataset.tooltipDuration ||
                        plugin.settings.duration;

                    // Check if the tooltip has a display duration
                    if (duration > 0) {
                        // Start a timer
                        setTimeout(() => {
                            // Check if a tooltip container data object exists
                            if ($container.data) {
                                // Check if the tooltip container data has an assigned tooltip
                                if ('tooltip' in $container.data) {
                                    // Remove the tooltip
                                    removeTooltip($container, $tooltip);
                                }
                            }
                        }, duration);
                    }
                }, {
                    once: true
                });
            } else {
                // Call the insert after callback
                plugin.settings.callbackInsertAfter.call();

                // Set the tooltip duration
                const duration =
                    $container.dataset.tooltipDuration ||
                    plugin.settings.duration;

                // Check if the tooltip has a display duration
                if (duration > 0) {
                    // Start a timer
                    setTimeout(() => {
                        // Check if a tooltip container data object exists
                        if ($container.data) {
                            // Check if the tooltip container data has an assigned tooltip
                            if ('tooltip' in $container.data) {
                                // Remove the tooltip
                                removeTooltip($container, $tooltip);
                            }
                        }
                    }, duration);
                }
            }
        }, delay_in);
    };

    /**
     * Remove a tooltip.
     * @param  {element}  $container  The tooltip container.
     * @param  {element}  $tooltip    The tooltip.
     * @param  {bool}     silent      Suppress callbacks.
     * @return {void}
     */
    const removeTooltip = ($container, $tooltip, silent = false) => {
        // Check if the callbacks should not be suppressed
        if (!silent) {
            // Call the remove before callback
            plugin.settings.callbackRemoveBefore.call();
        }

        // Set the tooltip delay out
        const delay_out =
            $container.dataset.tooltipDelayOut ||
            plugin.settings.delayOut;

        // Start a timer
        setTimeout(() => {
            // Set the tooltip animation out
            const animation_out =
                $container.dataset.tooltipAnimationOut ||
                plugin.settings.animationOut;

            // Check if the animation out is set
            if (animation_out && animation_out != 'none') {
                // Remove the animated state hook from the tooltip
                $tooltip.classList.remove('has-animated');

                // Add the animating state hook to the tooltip
                $tooltip.classList.add('is-animating');

                // Add the animation classes to the tooltip
                $tooltip.classList.add('has-animation');
                $tooltip.classList.add(animation_out);

                // Add an animation end event listener to the tooltip
                $tooltip.addEventListener('animationend', (event) => {
                    // Check if the tooltip exists in the dom
                    if (document.body.contains($tooltip)) {
                        // Remove the tooltip
                        $tooltip.parentNode.removeChild($tooltip);
                    }

                    // Remove the assigned tooltip from the tooltip container data
                    delete $container.data['tooltip'];

                    // Remove the active state hook from the tooltip container
                    $container.classList.remove('is-active');

                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the remove after callback
                        plugin.settings.callbackRemoveAfter.call();
                    }
                }, {
                    once: true
                });
            } else {
                // Check if the tooltip exists in the dom
                if (document.body.contains($tooltip)) {
                    // Remove the tooltip
                    $tooltip.parentNode.removeChild($tooltip);
                }

                // Remove the assigned tooltip from the tooltip container data
                delete $container.data['tooltip'];

                // Remove the active state hook from the tooltip container
                $container.classList.remove('is-active');

                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the remove after callback
                    plugin.settings.callbackRemoveAfter.call();
                }
            }
        }, delay_out);
    };

    /**
     * Event handler to insert a tooltip relative to its tooltip container.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const insertEventHandler = (event) => {
        // Set the tooltip container
        const $container = event.target;

        // Check if a tooltip container data object doesn't exist
        if (!$container.data) {
            // Set the tooltip
            const $tooltip = buildTooltip($container);

            // Insert the tooltip
            insertTooltip($container, $tooltip);
        } else {
            // Check that the tooltip container data doesn't have an assigned tooltip
            if (!('tooltip' in $container.data)) {
                // Set the tooltip
                const $tooltip = buildTooltip($container);

                // Insert the tooltip
                insertTooltip($container, $tooltip);
            }
        }
    };

    /**
     * Event handler to remove a tooltip.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const removeEventHandler = (event) => {
        // Set the tooltip container
        const $container = event.target;

        // Check if a tooltip container data object exists
        if ($container.data) {
            // Check if the tooltip container data has an assigned tooltip
            if ('tooltip' in $container.data) {
                // Set the tooltip
                const $tooltip = $container.data.tooltip;

                // Remove the tooltip
                removeTooltip($container, $tooltip);
            }
        }
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

            // Check if the html tag has the no touch detection class
            if (document.documentElement.classList.contains('has-no-touch')) {
                // Set the tooltip containers
                const $containers = document.querySelectorAll(plugin.element);

                // Cycle through all of the tooltip containers
                $containers.forEach(($container) => {
                    // Add a mouse enter event handler to the tooltip container to insert the tooltip
                    $container.addEventListener('mouseenter', insertEventHandler);

                    // Add a focus event handler to the tooltip container to insert the tooltip
                    $container.addEventListener('focus', insertEventHandler);

                    // Add a mouse leave event handler to the tooltip container to remove the tooltip
                    $container.addEventListener('mouseleave', removeEventHandler);

                    // Add a click event handler to the tooltip container to remove the tooltip
                    $container.addEventListener('click', removeEventHandler);

                    // Add a focusout event handler to the tooltip container to remove the tooltip
                    $container.addEventListener('focusout', removeEventHandler);
                });
            }

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
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

            // Check if the html tag has the no touch detection class
            if (document.documentElement.classList.contains('has-no-touch')) {
                // Set the tooltip containers
                const $containers = document.querySelectorAll(plugin.element);

                // Cycle through all of the tooltip containers
                $containers.forEach(($container) => {
                    // Check if a tooltip container data object exists
                    if ($container.data) {
                        // Check if the tooltip container data has an assigned tooltip
                        if ('tooltip' in $container.data) {
                            // Set the tooltip
                            const $tooltip = $container.data.tooltip;

                            // Remove the tooltip
                            removeTooltip($container, $tooltip, silent);
                        }
                    }

                    // Remove the mouse enter event handler from the tooltip container
                    $container.removeEventListener('mouseenter', insertEventHandler);

                    // Remove the focus event handler from the tooltip container
                    $container.removeEventListener('focus', insertEventHandler);

                    // Remove the mouse leave event handler from the tooltip container
                    $container.removeEventListener('mouseleave', removeEventHandler);

                    // Remove the click event handler from the tooltip container
                    $container.removeEventListener('click', removeEventHandler);

                    // Remove the focusout event handler from the tooltip container
                    $container.removeEventListener('focusout', removeEventHandler);
                });
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
