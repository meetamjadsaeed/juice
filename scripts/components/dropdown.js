/*  ========================================================================
    JUICE -> COMPONENTS -> DROPDOWN
    ========================================================================  */

;(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Dropdown';

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
        animationIn: 'fadeInUpTiny',
        animationOut: 'fadeOutDownTiny',
        callbackInitializeBefore: () => {
            console.log('Dropdown: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Dropdown: callbackInitializeAfter');
        },
        callbackShowBefore: () => {
            console.log('Dropdown: callbackShowBefore');
        },
        callbackShowAfter: () => {
            console.log('Dropdown: callbackShowAfter');
        },
        callbackHideBefore: () => {
            console.log('Dropdown: callbackHideBefore');
        },
        callbackHideAfter: () => {
            console.log('Dropdown: callbackHideAfter');
        },
        callbackRefreshBefore: () => {
            console.log('Dropdown: callbackRefreshBefore');
        },
        callbackRefreshAfter: () => {
            console.log('Dropdown: callbackRefreshAfter');
        },
        callbackDestroyBefore: () => {
            console.log('Dropdown: callbackDestroyBefore');
        },
        callbackDestroyAfter: () => {
            console.log('Dropdown: callbackDestroyAfter');
        }
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
     * Event handler to toggle a dropdown when the dropdown trigger is clicked.
     * @param  {object}  event  The event object
     * @return {void}
     */
    const clickTriggerEventHandler = (event) => {
        // Set the dropdown trigger
        const $trigger = event.target;

        // Set the dropdown container and dropdown
        const $container = $trigger.closest('.has-dropdown');
        const $dropdown = $container.querySelector('.dropdown');

        // Check if the dropdown container has the active state hook
        (!$container.classList.contains('is-active')
            ? plugin.this.show($dropdown)
            : plugin.this.hide($dropdown)
        );
    };

    /**
     * Event handler to hide a dropdown when the dropdown container or any
     * of the dropdown containers descendants lose focus.
     * @param  {object}  event  The event object
     * @return {void}
     */
    const focusoutEventHandler = (event) => {
        // Set the current and related targets
        const $current = event.currentTarget;
        const $related = event.relatedTarget;

        // Set the dropdown
        const $dropdown = $current.querySelector('.dropdown');

        // Check if a related target exists
        if ($related) {
            // Check if the related target is not a descendant of the current target
            if (!$current.contains($related)) {
                // Hide the dropdown
                plugin.this.hide($dropdown);
            }
        } else {
            // Hide the dropdown
            plugin.this.hide($dropdown);
        }
    };

    /**
     * Event handler to show a dropdown when the mouse enters the dropdown container.
     * @param  {object}  event  The event object
     * @return {void}
     */
    const mouseenterEventHandler = (event) => {
        // Set the dropdown container
        const $container = event.currentTarget;

        // Set the dropdown
        const $dropdown = event.currentTarget.querySelector('.dropdown');

        // Check if the dropdown container doesn't have the active state hook
        if (!$container.classList.contains('is-active')) {
            // Show the dropdown
            plugin.this.show($dropdown);
        }
    }

    /**
     * Event handler to hide a dropdown when the mouse leaves the dropdown container.
     * @param  {object}  event  The event object
     * @return {void}
     */
    const mouseleaveEventHandler = (event) => {
        // Set the dropdown container
        const $container = event.currentTarget;

        // Set the dropdown
        const $dropdown = event.currentTarget.querySelector('.dropdown');

        // Check if the dropdown has the active state hook
        if ($container.classList.contains('is-active')) {
            // Hide the dropdown
            plugin.this.hide($dropdown);
        }
    }

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

            // Set the dropdown containers
            const $containers = document.querySelectorAll(plugin.element);

            // Cycle through all of the dropdown containers
            $containers.forEach(($container) => {
                // Set the html element
                const $html = document.querySelector('html');

                // Set the dropdown trigger and dropdown
                const $trigger = $container.querySelector('.js-dropdown-trigger');
                const $dropdown = $container.querySelector('.dropdown');

                // Set the container to have a focusable tabindex
                $container.setAttribute('tabindex', -1);

                // Add a click event handler to the dropdown trigger to toggle the dropdown
                $trigger.addEventListener('click', clickTriggerEventHandler);

                // Add a focus out event handler to the dropdown container to hide the dropdown
                $container.addEventListener('focusout', focusoutEventHandler);

                // Check if the dropdown has the hoverable state hook and check if the html tag has the no touch detection class
                if ($dropdown.classList.contains('is-hoverable') && $html.classList.contains('has-no-touch')) {
                    // Add a mouse enter event handler to the dropdown container to show the dropdown
                    $container.addEventListener('mouseenter', mouseenterEventHandler);

                    // Add a mouse leave event handler to the dropdown container the hide the dropdown
                    $container.addEventListener('mouseleave', mouseleaveEventHandler);
                }
            });

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * Show a dropdown.
         * @param  {element}  $dropdown  The dropdown
         * @param  {bool}     silent     Suppress callbacks
         * @return {void}
         */
        show: ($dropdown, silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the show before callback
                plugin.settings.callbackShowBefore.call();
            }

            // Set the dropdown container and content
            const $container = $dropdown.closest('.has-dropdown');
            const $content = $dropdown.querySelector('.dropdown__content');

            // Add the active state hook to the dropdown container
            $container.classList.add('is-active');

            // Set the dropdown animation in
            const animation_in =
                $container.dataset.dropdownAnimationIn ||
                plugin.settings.animationIn;

            // Check if the animation in is set
            if (animation_in && animation_in != 'none') {
                // Remove the animated state hook from the dropdown
                $dropdown.classList.remove('has-animated');

                // Add the animating state hook to the dropdown
                $dropdown.classList.add('is-animating');

                // Add the animation classes to the dropdown content
                $content.classList.add('animated');
                $content.classList.add(animation_in);

                // Add an animation end event listener to the dropdown content
                $content.addEventListener('animationend', (event) => {
                    // Remove the animating state hook from the dropdown
                    $dropdown.classList.remove('is-animating');

                    // Remove the animation classes from the dropdown content
                    $content.classList.remove('animated');
                    $content.classList.remove(animation_in);

                    // Add the animated state hook to the dropdown
                    $dropdown.classList.add('has-animated');

                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the show after callback
                        plugin.settings.callbackShowAfter.call();
                    }
                }, {
                    once: true
                });
            } else {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the show after callback
                    plugin.settings.callbackShowAfter.call();
                }
            }
        },

        /**
         * Hide a dropdown.
         * @param  {element}  $dropdown  The dropdown
         * @param  {bool}     silent     Suppress callbacks
         * @return {void}
         */
        hide: ($dropdown, silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the hide before callback
                plugin.settings.callbackHideBefore.call();
            }

            // Set the dropdown container and content
            const $container = $dropdown.closest('.has-dropdown');
            const $content = $dropdown.querySelector('.dropdown__content');

            // Set the dropdown animation out
            const animation_out =
                $container.dataset.dropdownAnimationOut ||
                plugin.settings.animationOut;

            // Check if the animation out is set
            if (animation_out && animation_out != 'none') {
                // Remove the animated state hook from the dropdown
                $dropdown.classList.remove('has-animated');

                // Add the animating state hook to the dropdown
                $dropdown.classList.add('is-animating');

                // Add the animation classes to the dropdown content
                $content.classList.add('animated');
                $content.classList.add(animation_out);

                // Add an animation end event listener to the dropdown content
                $content.addEventListener('animationend', (event) => {
                    // Remove the animating state hook from the dropdown
                    $dropdown.classList.remove('is-animating');

                    // Remove the animation classes from the dropdown content
                    $content.classList.remove('animated');
                    $content.classList.remove(animation_out);

                    // Add the animated state hook to the dropdown
                    $dropdown.classList.add('has-animated');

                    // Remove the active state hook from the dropdown container
                    $container.classList.remove('is-active');

                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the hide after callback
                        plugin.settings.callbackHideAfter.call();
                    }
                }, {
                    once: true
                });
            } else {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the hide after callback
                    plugin.settings.callbackHideAfter.call();
                }
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

            // Set the dropdown containers
            const $containers = document.querySelectorAll(plugin.element);

            // Cycle through all of the dropdown containers
            $containers.forEach(($container) => {
                // Set the html element
                const $html = document.querySelector('html');

                // Set the dropdown trigger and dropdown
                const $trigger = $container.querySelector('.js-dropdown-trigger');
                const $dropdown = $container.querySelector('.dropdown');

                // Check if the dropdown container has the active state hook
                if ($container.classList.contains('is-active')) {
                    // Hide the dropdown
                    plugin.this.hide($dropdown, silent);
                }

                // Remove the click event handler from the dropdown trigger
                $trigger.removeEventListener('click', clickTriggerEventHandler);

                // Remove the focus out event handler from the dropdown container
                $container.removeEventListener('focusout', focusoutEventHandler);

                // Check if the dropdown has the hoverable state hook and check if the html tag has the no touch detection class
                if ($dropdown.classList.contains('is-hoverable') && $html.classList.contains('has-no-touch')) {
                    // Remove the mouse enter event handler from the dropdown container
                    $container.removeEventListener('mouseenter', mouseenterEventHandler);

                    // Remove the mouse leave event handler from the dropdown container
                    $container.addEventListener('mouseleave', mouseleaveEventHandler);
                }
            });

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy after callback
                plugin.settings.callbackDestroyAfter.call();
            }
        },

        /**
         * Call the show method silently.
         * @return {void}
         */
        showSilently: ($dropdown) => {
            // Call the show method silently
            plugin.this.show($dropdown, true);
        },

        /**
         * Call the hide method silently.
         * @return {void}
         */
        hideSilently: ($dropdown) => {
            // Call the hide method silently
            plugin.this.hide($dropdown, true);
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
