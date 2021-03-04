(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Dropdown';

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
        animationIn: 'fade-in-up',
        animationOut: 'fade-out-down',

        callbackDestroyBefore: () => {},
        callbackDestroyAfter: () => {},
        callbackHideBefore: () => {},
        callbackHideAfter: () => {},
        callbackInitializeBefore: () => {},
        callbackInitializeAfter: () => {},
        callbackRefreshBefore: () => {},
        callbackRefreshAfter: () => {},
        callbackShowBefore: () => {},
        callbackShowAfter: () => {}
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
     * Event handler to toggle a dropdown when the dropdown trigger is clicked.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickTriggerEventHandler = (event) => {
        // Prevent the default action
        event.preventDefault();

        // Set the trigger
        const $trigger = event.target;

        // Set the container and dropdown
        const $container = $trigger.closest('.has-dropdown');
        const $dropdown = $container.querySelector('.dropdown');

        // Check if the container is active and show/hide the dropdown
        (!$container.classList.contains('is-active')
            ? plugin.this.show($dropdown)
            : plugin.this.hide($dropdown)
        );
    };

    /**
     * Event handler to hide a dropdown when the dropdown container or any
     * of the dropdown containers descendants lose focus.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const focusoutContainerEventHandler = (event) => {
        // Set the current target, related target and dropdown
        const $current = event.currentTarget;
        const $related = event.relatedTarget;
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
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const mouseenterContainerEventHandler = (event) => {
        // Set the container and dropdown
        const $container = event.currentTarget;
        const $dropdown = event.currentTarget.querySelector('.dropdown');

        // Check if the container isn't active
        if (!$container.classList.contains('is-active')) {
            // Show the dropdown
            plugin.this.show($dropdown);
        }
    };

    /**
     * Event handler to hide a dropdown when the mouse leaves the dropdown container.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const mouseleaveContainerEventHandler = (event) => {
        // Set the container and dropdown
        const $container = event.currentTarget;
        const $dropdown = event.currentTarget.querySelector('.dropdown');

        // Check if the container is active
        if ($container.classList.contains('is-active')) {
            // Hide the dropdown
            plugin.this.hide($dropdown);
        }
    };

    /**
     * Public variables and methods.
     *
     * @type {object}
     */
    Plugin.prototype = {
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

            // Set the containers
            const $containers = document.querySelectorAll(plugin.element);

            // Check if any contains exists
            if ($containers) {
                // Cycle through all of the containers
                $containers.forEach(($container) => {
                    // Set the trigger and dropdown
                    const $trigger = $container.querySelector('.js-dropdown-trigger');
                    const $dropdown = $container.querySelector('.dropdown');

                    // Check if the container is active
                    if ($container.classList.contains('is-active')) {
                        // Hide the dropdown
                        plugin.this.hide($dropdown, silent);
                    }

                    // Check if the trigger exists
                    if ($trigger) {
                        // Remove the click event handler from the trigger
                        $trigger.removeEventListener('click', clickTriggerEventHandler);
                    }

                    // Remove the focus out event handler from the container
                    $container.removeEventListener('focusout', focusoutContainerEventHandler);

                    // Check if the dropdown is hoverable
                    if ($dropdown.classList.contains('is-hoverable') && document.documentElement.classList.contains('has-no-touch')) {
                        // Remove the mouse enter and mouse leave event handlers from the container
                        $container.removeEventListener('mouseenter', mouseenterContainerEventHandler);
                        $container.addEventListener('mouseleave', mouseleaveContainerEventHandler);
                    }
                });
            }

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
         * Hide a dropdown.
         *
         * @param  {element}  $dropdown  The dropdown.
         * @param  {bool}     silent     Suppress callbacks.
         * @return {void}
         */
        hide: ($dropdown, silent = false) => {
            // Check if the dropdown exists and isn't animating in or out
            if ($dropdown && !$dropdown.classList.contains('is-animating-in') && !$dropdown.classList.contains('is-animating-out')) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the hide before callback
                    plugin.settings.callbackHideBefore.call();
                }

                // Set the container and content
                const $container = $dropdown.closest('.has-dropdown');
                const $content = $dropdown.querySelector('.dropdown__content');

                // Check if the dropdown is animated
                if (plugin.settings.animation) {
                    // Set the animation out
                    const animation_out = $container.dataset.dropdownAnimationOut || plugin.settings.animationOut;

                    // Set the dropdown animation classes
                    $dropdown.classList.remove('has-animated');
                    $dropdown.classList.add('is-animating-out');

                    // Set the content animation classes
                    $content.classList.add(plugin.settings.animationClass, animation_out);

                    // Add an animation end event handler to the content
                    $content.addEventListener('animationend', () => {
                        // Set the dropdown animation classes
                        $dropdown.classList.remove('is-animating-out');
                        $dropdown.classList.add('has-animated');

                        // Set the content animation classes
                        $content.classList.remove(plugin.settings.animationClass);
                        $content.classList.remove(animation_out);

                        // Remove the active state hook from the container
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
                    // Remove the active state hook from the container
                    $container.classList.remove('is-active');

                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the hide after callback
                        plugin.settings.callbackHideAfter.call();
                    }
                }
            }
        },

        /**
         * Call the hide method silently.
         *
         * @return {void}
         */
        hideSilently: ($dropdown) => {
            // Call the hide method silently
            plugin.this.hide($dropdown, true);
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

            // Set the containers
            const $containers = document.querySelectorAll(plugin.element);

            // Check if any containers exist
            if ($containers) {
                // Cycle through all of the containers
                $containers.forEach(($container) => {
                    // Set the trigger and dropdown
                    const $trigger = $container.querySelector('.js-dropdown-trigger');
                    const $dropdown = $container.querySelector('.dropdown');

                    // Check if the trigger exists
                    if ($trigger) {
                        // Add a click event handler to the trigger
                        $trigger.addEventListener('click', clickTriggerEventHandler);
                    }

                    // Add a focus out event handler to the container
                    $container.addEventListener('focusout', focusoutContainerEventHandler);

                    // Check if the dropdown is hoverable
                    if ($dropdown.classList.contains('is-hoverable') && document.documentElement.classList.contains('has-no-touch')) {
                        // Add the mouse enter and mouse leave event handlers to the container
                        $container.addEventListener('mouseenter', mouseenterContainerEventHandler);
                        $container.addEventListener('mouseleave', mouseleaveContainerEventHandler);
                    }
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
        },

        /**
         * Show a dropdown.
         *
         * @param  {element}  $dropdown  The dropdown.
         * @param  {bool}     silent     Suppress callbacks.
         * @return {void}
         */
        show: ($dropdown, silent = false) => {
            // Check if the dropdown exists and isn't animating in or out
            if ($dropdown && !$dropdown.classList.contains('is-animating-in') && !$dropdown.classList.contains('is-animating-out')) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the show before callback
                    plugin.settings.callbackShowBefore.call();
                }

                // Set the container and content
                const $container = $dropdown.closest('.has-dropdown');
                const $content = $dropdown.querySelector('.dropdown__content');

                // Add the active state hook to the container
                $container.classList.add('is-active');

                // Check if the dropdown is animated
                if (plugin.settings.animation) {
                    // Set the animation in
                    const animation_in = $container.dataset.dropdownAnimationIn || plugin.settings.animationIn;

                    // Set the dropdown animation classes
                    $dropdown.classList.remove('has-animated');
                    $dropdown.classList.add('is-animating-in');

                    // Set the content animation classes
                    $content.classList.add(plugin.settings.animationClass);
                    $content.classList.add(animation_in);

                    // Add an animation end event handler to the content
                    $content.addEventListener('animationend', () => {
                        // Set the dropdown animation classes
                        $dropdown.classList.remove('is-animating-in');
                        $dropdown.classList.add('has-animated');

                        // Set the content animation classes
                        $content.classList.remove(plugin.settings.animationClass, animation_in);

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
            }
        },

        /**
         * Call the show method silently.
         *
         * @return {void}
         */
        showSilently: ($dropdown) => {
            // Call the show method silently
            plugin.this.show($dropdown, true);
        },
    };

    // Return the plugin
    return Plugin;
}));
