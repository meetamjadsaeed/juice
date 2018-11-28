/* =============================================================================================
   JUICE -> COMPONENTS -> TOOLTIP
   ============================================================================================= */

;(function (root, factory) {
    // Set the plugin name
    const pluginName = 'Tooltip';

    // Check if the plugin should be instantiated via AMD, CommonJS or the Browser
    if (typeof define === 'function' && define.amd) {
        define([], factory(pluginName));
    } else if (typeof exports === 'object') {
        module.exports = factory(pluginName);
    } else {
        root[pluginName] = factory(pluginName);
    }
}((window || module || {}), function(pluginName) {
    // Use strict mode
    'use strict';

    // Create an empty plugin object
    const plugin = {};

    // Set the plugin defaults
    const defaults = {
        animationIn: 'zoomIn',
        animationOut: 'zoomOut',
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
     * Constructor
     * @param  {element}  element  The initialized element
     * @param  {object}   options  The plugin options
     * @return {void}
     */
    function Plugin(element, options) {
        // Set the plugin instance, name, element, default settings, user options and extended settings
        plugin.this = this;
        plugin.name = pluginName;
        plugin.element = element;
        plugin.defaults = defaults;
        plugin.options = options;
        plugin.settings = extendDefaults(defaults, options);

        // Initialize the plugin
        plugin.this.initialize();
    }

    /**
     * Merge the default plugin settings with the user options
     * @param  {object}  defaults  The default plugin settings
     * @param  {object}  options   The user options
     * @return {object}            The extended plugin settings
     */
    const extendDefaults = (defaults, options) => {
        // Cycle through the user options
        for (let property in options) {
            // Check if the property exists in the user options
            if (options.hasOwnProperty(property)) {
                // Set the property key value in the defaults object with the options property key value
                defaults[property] = options[property];
            }
        }

        // Return the extended plugin settings
        return defaults;
    };

    /**
     * Get an elements offset
     * @param  {element}  $element  The element
     * @return {object}             The element offset
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
     * Build a tooltip
     * @param  {element}  $container  The tooltip container
     * @return {element}              The tooltip
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
        const color = $container.dataset.tooltipColor || plugin.settings.color;
        const feedback = $container.dataset.tooltipFeedback || plugin.settings.feedback;
        const position = $container.dataset.tooltipPosition || plugin.settings.position;
        const size = $container.dataset.tooltipSize || plugin.settings.size;

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
     * Set the tooltip position relative to the tooltip container
     * @param  {element}  $container  The tooltip container
     * @param  {element}  $tooltip    The tooltip
     * @return {void}
     */
    const positionTooltip = ($container, $tooltip) => {
        // Set the tooltip container offset
        const containerOffset = getElementOffset($container);

        // Set the tooltip container x and y positions
        const containerX = containerOffset.left;
        const containerY = containerOffset.top;

        // Set the tooltip container dimensions
        const containerWidth = $container.offsetWidth;
        const containerHeight = $container.offsetHeight;

        // Set the tooltip dimensions
        const tooltipWidth = $tooltip.offsetWidth;
        const tooltipHeight = $tooltip.offsetHeight;

        // Set the tooltip x and y positions
        let tooltipX, tooltipY;

        // Set the tooltip position modifier
        const position = $container.dataset.tooltipPosition || plugin.settings.position;

        // Start a switch statement for the tooltip position
        switch (position) {
            // Top (default)
            default:
                // Set the tooltip x and y positions
                tooltipX = containerX + ((containerWidth - tooltipWidth) / 2);
                tooltipY = containerY - tooltipHeight;
            break;

            // Right
            case 'right':
                // Set the tooltip x and y positions
                tooltipX = containerX + containerWidth;
                tooltipY = containerY + ((containerHeight - tooltipHeight) / 2);
            break;

            // Bottom
            case 'bottom':
                // Set the tooltip x and y positions
                tooltipX = containerX + ((containerWidth - tooltipWidth) / 2);
                tooltipY = containerY + containerHeight;
            break;

            // Left
            case 'left':
                // Set the tooltip x and y positions
                tooltipX = containerX - tooltipWidth;
                tooltipY = containerY + ((containerHeight - tooltipHeight) / 2);
            break;
        }

        // Set the inline top and left positions
        $tooltip.style.left = `${Math.round(tooltipX)}px`;
        $tooltip.style.top = `${Math.round(tooltipY)}px`;
    };

    /**
     * Insert a tooltip
     * @param  {element}  $container  The tooltip container
     * @param  {element}  $tooltip    The tooltip
     * @return {void}
     */
    const insertTooltip = ($container, $tooltip) => {
        // Call the insert before callback
        plugin.settings.callbackInsertBefore.call();

        // Set the tooltip delay in
        const delayIn = $container.dataset.tooltipDelayIn || plugin.settings.delayIn;

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
            const animationIn = $container.dataset.tooltipAnimationIn || plugin.settings.animationIn;

            // Check if the animation in is set
            if (animationIn && animationIn != 'none') {
                // Add the animating state hook to the tooltip
                $tooltip.classList.add('is-animating');

                // Add the animation classes to the tooltip
                $tooltip.classList.add('animated');
                $tooltip.classList.add(animationIn);

                // Add an animation end event listener to the tooltip
                $tooltip.addEventListener('animationend', (event) => {
                    // Remove the animating state hook from the tooltip
                    $tooltip.classList.remove('is-animating');

                    // Remove the animation classes from the tooltip
                    $tooltip.classList.remove('animated');
                    $tooltip.classList.remove(animationIn);

                    // Add the animated state hook to the tooltip
                    $tooltip.classList.add('has-animated');

                    // Call the insert after callback
                    plugin.settings.callbackInsertAfter.call();

                    // Set the tooltip duration
                    const duration = $container.dataset.tooltipDuration || plugin.settings.duration;

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
                const duration = $container.dataset.tooltipDuration || plugin.settings.duration;

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
        }, delayIn);
    };

    /**
     * Remove a tooltip
     * @param  {element}  $container  The tooltip container
     * @param  {element}  $tooltip    The tooltip
     * @param  {bool}     silent      Suppress callbacks
     * @return {void}
     */
    const removeTooltip = ($container, $tooltip, silent = false) => {
        // Check if the callbacks should not be suppressed
        if (!silent) {
            // Call the remove before callback
            plugin.settings.callbackRemoveBefore.call();
        }

        // Set the tooltip delay out
        const delayOut = $container.dataset.tooltipDelayOut || plugin.settings.delayOut;

        // Start a timer
        setTimeout(() => {
            // Set the tooltip animation out
            const animationOut = $container.dataset.tooltipAnimationOut || plugin.settings.animationOut;

            // Check if the animation out is set
            if (animationOut && animationOut != 'none') {
                // Remove the animated state hook from the tooltip
                $tooltip.classList.remove('has-animated');

                // Add the animating state hook to the tooltip
                $tooltip.classList.add('is-animating');

                // Add the animation classes to the tooltip
                $tooltip.classList.add('animated');
                $tooltip.classList.add(animationOut);

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
        }, delayOut);
    };

    /**
     * Event handler to insert a tooltip relative to its tooltip container
     * @param  {object}  event  The event object
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
     * Event handler to remove a tooltip
     * @param  {object}  event  The event object
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
     * Public variables and methods
     * @type {object}
     */
    Plugin.prototype = {
        /**
         * Initialize the plugin
         * @param  {bool}  silent  Suppress callbacks
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
            if (document.querySelector('html').classList.contains('has-no-touch')) {
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
         * Refresh the plugin by destroying an existing initialization and initializing again
         * @param  {bool}  silent  Suppress callbacks
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
         * Destroy an existing initialization
         * @param  {bool}  silent  Suppress callbacks
         * @return {void}
         */
        destroy: (silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy before callback
                plugin.settings.callbackDestroyBefore.call();
            }

            // Check if the html tag has the no touch detection class
            if (document.querySelector('html').classList.contains('has-no-touch')) {
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

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy after callback
                plugin.settings.callbackDestroyAfter.call();
            }
        },

        /**
         * Call the refresh method silently
         * @return {void}
         */
        refreshSilently: () => {
            // Call the refresh method silently
            plugin.this.refresh(true);
        },

        /**
         * Call the destroy method silently
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
