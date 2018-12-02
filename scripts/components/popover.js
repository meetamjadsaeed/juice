/*  ========================================================================
    JUICE -> COMPONENTS -> POPOVER
    ========================================================================  */

;(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Popover';

    // Check if instantiation should be via` amd, commonjs or the browser
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
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        callbackInitializeBefore: () => {
            console.log('Popover: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Popover: callbackInitializeAfter');
        },
        callbackInsertBefore: () => {
            console.log('Popover: callbackInsertBefore');
        },
        callbackInsertAfter: () => {
            console.log('Popover: callbackInsertAfter');
        },
        callbackRemoveBefore: () => {
            console.log('Popover: callbackRemoveBefore');
        },
        callbackRemoveAfter: () => {
            console.log('Popover: callbackRemoveAfter');
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
        color: null,
        delayIn: 0,
        delayOut: 0,
        feedback: null,
        position: 'top',
        size: null
    };

    /**
     * Constructor.
     * @param  {element}  element  The initialized element
     * @param  {object}   options  The plugin options
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
     * @param  {object}  defaults  The default plugin settings
     * @param  {object}  options   The user options
     * @return {object}            The extended plugin settings
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
     * Build a popover.
     * @param  {element}  $container  The popover container
     * @return {element}              The popover
     */
    const buildPopover = ($container) => {
        // Create the popover elements
        const $popover = document.createElement('div');
        const $content = document.createElement('div');
        const $head = document.createElement('div');
        const $body = document.createElement('div');

        // Add the popover classes
        $popover.classList.add('popover');
        $content.classList.add('popover__content');
        $head.classList.add('popover__head');
        $body.classList.add('popover__body');

        // Construct the popover
        $popover.append($content);
        $content.append($head);
        $content.append($body);
        $head.insertAdjacentHTML('beforeend', $container.dataset.popoverTitle);
        $body.insertAdjacentHTML('beforeend', $container.dataset.popoverText);

        // Set the popover modifiers
        const color =
            $container.dataset.popoverColor ||
            plugin.settings.color;
        const feedback =
            $container.dataset.popoverFeedback ||
            plugin.settings.feedback;
        const position =
            $container.dataset.popoverPosition ||
            plugin.settings.position;
        const size =
            $container.dataset.popoverSize ||
            plugin.settings.size;

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

        // Set the popover to have a focusable tabindex
        $popover.setAttribute('tabindex', -1);

        // Add a focus out event handler to the popover to remove the popover
        $popover.addEventListener('focusout', focusoutEventHandler);

        // Return the popover
        return $popover;
    };

    /**
     * Set the popover position relative to the popover container.
     * @param  {element}  $container  The popover container
     * @param  {element}  $popover    The popover
     * @return {void}
     */
    const positionPopover = ($container, $popover) => {
        // Set the popover container offset
        const container_offset = getElementOffset($container);

        // Set the popover container left and top positions
        const container_left = container_offset.left;
        const container_top = container_offset.top;

        // Set the popover container dimensions
        const container_width = $container.offsetWidth;
        const container_height = $container.offsetHeight;

        // Set the popover dimensions
        const popover_width = $popover.offsetWidth;
        const popover_height = $popover.offsetHeight;

        // Set the popover left and top positions
        let popover_left;
        let popover_top;

        // Set the popover position modifier
        const position =
            $container.dataset.popoverPosition ||
            plugin.settings.position;

        // Start a switch statement for the popover position
        switch (position) {
            // Top (default)
            default:
                // Set the popover left and top positions
                popover_left =
                    container_left + ((container_width - popover_width) / 2);
                popover_top =
                    container_top - popover_height;
            break;

            // Right
            case 'right':
                // Set the popover left and top positions
                popover_left =
                    container_left + container_width;
                popover_top =
                    container_top + ((container_height - popover_height) / 2);
            break;

            // Bottom
            case 'bottom':
                // Set the popover left and top positions
                popover_left =
                    container_left + ((container_width - popover_width) / 2);
                popover_top =
                    container_top + container_height;
            break;

            // Left
            case 'left':
                // Set the popover left and top positions
                popover_left =
                    container_left - popover_width;
                popover_top =
                    container_top + ((container_height - popover_height) / 2);
            break;
        }

        // Set the inline top and left positions
        $popover.style.left = `${Math.round(popover_left)}px`;
        $popover.style.top = `${Math.round(popover_top)}px`;
    };

    /**
     * Insert a popover.
     * @param  {element}  $container  The popover container
     * @param  {element}  $popover    The popover
     * @return {void}
     */
    const insertPopover = ($container, $popover) => {
        // Call the insert before callback
        plugin.settings.callbackInsertBefore.call();

        // Set the popover delay in
        const delay_in =
            $container.dataset.popoverDelayIn ||
            plugin.settings.delayIn;

        // Start a timer
        setTimeout(() => {
            // Set the body
            const $body = document.querySelector('body');

            // Append the popover to the body
            $body.appendChild($popover);

            // Position the popover
            positionPopover($container, $popover);

            // Assign the popover to the popover container data object
            $container.data = {
                popover: $popover
            };

            // Assign the popover container to the popover data object
            $popover.data = {
                container: $container
            };

            // Show the popover
            $popover.style.display = 'block';

            // Add the active state hook to the popover container
            $container.classList.add('is-active');

            // Set the popover animation in
            const animation_in =
                $container.dataset.popoverAnimationIn ||
                plugin.settings.animationIn;

            // Check if the animation in is set
            if (animation_in && animation_in != 'none') {
                // Add the animating state hook to the popover
                $popover.classList.add('is-animating');

                // Add the animation classes to the popover
                $popover.classList.add('animated');
                $popover.classList.add(animation_in);

                // Add an animation end event listener to the popover
                $popover.addEventListener('animationend', (event) => {
                    // Remove the animating state hook from the popover
                    $popover.classList.remove('is-animating');

                    // Remove the animation classes from the popover
                    $popover.classList.remove('animated');
                    $popover.classList.remove(animation_in);

                    // Add the animated state hook to the popover
                    $popover.classList.add('has-animated');

                    // Call the insert after callback
                    plugin.settings.callbackInsertAfter.call();
                }, {
                    once: true
                });
            }
        }, delay_in);
    };

    /**
     * Remove a popover.
     * @param  {element}  $container  The popover container
     * @param  {element}  $popover    The popover
     * @param  {bool}     silent      Suppress callbacks
     * @return {void}
     */
    const removePopover = ($container, $popover, silent = false) => {
        // Check if the callbacks should not be suppressed
        if (!silent) {
            // Call the remove before callback
            plugin.settings.callbackRemoveBefore.call();
        }

        // Set the popover delay out
        const delay_out =
            $container.dataset.popoverDelayOut ||
            plugin.settings.delayOut;

        // Start a timer
        setTimeout(() => {
            // Set the popover animation out
            const animation_out =
                $container.dataset.popoverAnimationOut ||
                plugin.settings.animationOut;

            // Check if the animation out is set
            if (animation_out && animation_out != 'none') {
                // Remove the animated state hook from the popover
                $popover.classList.remove('has-animated');

                // Add the animating state hook to the popover
                $popover.classList.add('is-animating');

                // Add the animation classes to the popover
                $popover.classList.add('animated');
                $popover.classList.add(animation_out);

                // Add an animation end event listener to the popover
                $popover.addEventListener('animationend', (event) => {
                    // Check if the popover exists in the dom
                    if (document.body.contains($popover)) {
                        // Remove the popover
                        $popover.parentNode.removeChild($popover);
                    }

                    // Remove the assigned popover from the popover container data
                    delete $container.data['popover'];

                    // Remove the active state hook from the popover container
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
                // Check if the popover exists in the dom
                if (document.body.contains($popover)) {
                    // Remove the popover
                    $popover.parentNode.removeChild($popover);
                }

                // Remove the assigned popover from the popover container data
                delete $container.data['popover'];

                // Remove the active state hook from the popover container
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
     * Event handler to toggle a popover when the popover container is clicked.
     * @param  {object}  event  The event object
     * @return {void}
     */
     const clickToggleEventHandler = (event) => {
        // Set the popover container
        const $container = event.currentTarget;

        // Check if a popover container data object doesn't exist
        if (!$container.data) {
            // Set the popover
            const $popover = buildPopover($container);

            // Insert the popover
            insertPopover($container, $popover);
        } else {
            // Check that the popover container data doesn't have an assigned popover
            if (!('popover' in $container.data)) {
                // Set the popover
                const $popover = buildPopover($container);

                // Insert the popover
                insertPopover($container, $popover);
            } else {
                // Set the popover
                const $popover = $container.data.popover;

                // Remove the popover
                removePopover($container, $popover);
            }
        }
    };

    /**
     * Event handler to remove a popover when the popover container or popover lose focus.
     * @param  {object}  event  The event object
     * @return {void}
     */
    const focusoutEventHandler = (event) => {
        // Set the popover container and popover
        let $container, $popover;

        // Set the current and related targets
        const $current = event.currentTarget;
        const $related = event.relatedTarget;

        // Start a switch statement for the following true values
        switch (true) {
            // Container
            case $current.classList.contains('has-popover'):
                // Set the popover container
                $container = $current;

                // Check if a popover container data object exists
                if ($container.data) {
                    // Check if the popover container data has an assigned popover
                    if ('popover' in $container.data) {
                        // Set the popover
                        $popover = $container.data.popover;

                        // Check if a related target exists
                        if ($related) {
                            // Check if the related target is not the popover
                            if ($related != $popover && !$popover.contains($related)) {
                                // Remove the popover
                                removePopover($container, $popover);
                            }
                        } else {
                            // Remove the popover
                            removePopover($container, $popover);
                        }
                    }
                }
            break;

            // Popover
            case $current.classList.contains('popover'):
                // Set the popover
                $popover = $current;

                // Set the popover container
                $container = $popover.data.container;

                // Check if a related target exists
                if ($related) {
                    // Check if the related target is not the popover
                    if ($related != $popover && !$popover.contains($related)) {
                        // Remove the popover
                        removePopover($container, $popover);
                    }
                } else {
                    // Remove the popover
                    removePopover($container, $popover);
                }
            break;
        }
    };

    /**
     * Public variables and methods.
     * @type {object}
     */
    Plugin.prototype = {
        /**
         * Initialize the plugin.
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
                // Set the popover containers
                const $containers = document.querySelectorAll(plugin.element);

                // Cycle through all of the popover containers
                $containers.forEach(($container) => {
                    // Add a click event handler to the popover container to toggle the popover
                    $container.addEventListener('click', clickToggleEventHandler);

                    // Add a focus out event handler to the popover container to remove the popover
                    $container.addEventListener('focusout', focusoutEventHandler);
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
         * Destroy an existing initialization.
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
                // Set the popover containers
                const $containers = document.querySelectorAll(plugin.element);

                // Cycle through all of the popover containers
                $containers.forEach(($container) => {
                    // Check if a popover container data object exists
                    if ($container.data) {
                        // Check if the popover container data has an assigned popover
                        if ('popover' in $container.data) {
                            // Set the popover
                            const $popover = $container.data.popover;

                            // Remove the popover
                            removePopover($container, $popover, silent);
                        }
                    }

                    // Remove the click event handler from the popover container
                    $container.removeEventListener('click', clickToggleEventHandler);

                    // Remove the focus out event handler from the popover container
                    $container.removeEventListener('focusout', focusoutEventHandler);
                });
            }

            // Check if the callbacks should not be suppressed
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
