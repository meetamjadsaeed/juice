/*  ========================================================================
    JUICE -> COMPONENTS -> ACCORDION
    ========================================================================  */

;(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Accordion';

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
        callbackInitializeBefore: () => {
            console.log('Accordion: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Accordion: callbackInitializeAfter');
        },
        callbackToggleBefore: () => {
            console.log('Accordion: callbackToggleBefore');
        },
        callbackToggleAfter: () => {
            console.log('Accordion: callbackToggleAfter');
        },
        callbackRefreshBefore: () => {
            console.log('Accordion: callbackRefreshBefore');
        },
        callbackRefreshAfter: () => {
            console.log('Accordion: callbackRefreshAfter');
        },
        callbackDestroyBefore: () => {
            console.log('Accordion: callbackDestroyBefore');
        },
        callbackDestroyAfter: () => {
            console.log('Accordion: callbackDestroyAfter');
        },
        openMultipleItems: false,
        toggleAnimation: 'slide',
        toggleAnimationDuration: 200
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
     * Event handler to toggle an accordion item when an accordion item
     * toggle is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickToggleEventHandler = (event) => {
        // Set the accordion item toggle
        const $toggle = event.currentTarget;

        // Set the accordion item and accordion
        const $item = $toggle.closest('.accordion__item');
        const $accordion = $item.closest('.accordion');

        // Set the accordion type
        const open_multiple_items =
            $accordion.dataset.accordionOpenMultipleItems ||
            plugin.settings.openMultipleItems;

        // Check if opening multiple items is not allowed
        if (!open_multiple_items) {
            // Create an empty siblings array
            const siblings = [];

            // Set the first accordion item sibling
            let $sibling = $item.parentNode.firstChild;

            // Start a while loop for the accordion item siblings existance
            while ($sibling) {
                // Check if the accordion item sibling is an element and not the current accordion item
                if ($sibling.nodeType === 1 && $sibling !== $item) {
                    // Add the accordion item sibling to the siblings array
                    siblings.push($sibling);
                }

                // Set the next accordion item sibling
                $sibling = $sibling.nextSibling
            }

            // Cycle through all of the accordion item siblings
            siblings.forEach(($sibling) => {
                // Check if the accordion item sibling has the is expanded state hook
                if ($sibling.classList.contains('is-expanded')) {
                    // Toggle the accordion item sibling
                    plugin.this.toggle($sibling);
                }
            });
        }

        // Toggle the accordion item
        plugin.this.toggle($item);
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

            // Set the accordions
            const $accordions = document.querySelectorAll(plugin.element);

            // Cycle through all of the accordions
            $accordions.forEach(($accordion) => {
                // Set the accordion items
                const $items = $accordion.querySelectorAll('.accordion__item');

                // Cycle through all of the accordion items
                $items.forEach(($item, index) => {
                    // Set the accordion item head, body and toggle
                    const $head = $item.querySelector('.accordion__head');
                    const $body = $item.querySelector('.accordion__body');
                    const $toggle = $item.querySelector('.js-accordion-toggle');

                    // Set the accordion type
                    const open_multiple_items =
                        $accordion.dataset.accordionOpenMultipleItems ||
                        plugin.settings.openMultipleItems;

                    // Check if the accordion item doesn't have the expanded or collapsed state hooks
                    if (!$item.classList.contains('is-expanded') && !$item.classList.contains('is-collapsed')) {
                        // Add the collapsed state hook to the accordion item
                        $item.classList.add('is-collapsed');
                    }

                    // Check if opening multiple items is not allowed
                    if (!open_multiple_items) {
                        // Check if the accordion item has the expanded state hook
                        if ($item.classList.contains('is-expanded')) {
                            // Check if this is the first iterated item in the loop
                            if (index === 0) {
                                // Toggle the expanded and collapsed state hooks on the accordion item
                                $item.classList.add('is-expanded');
                                $item.classList.remove('is-collapsed');
                            } else {
                                // Toggle the expanded and collapsed state hooks on the accordion item
                                $item.classList.add('is-collapsed');
                                $item.classList.remove('is-expanded');
                            }
                        }
                    }

                    // Add a click event handler to the accordion toggle to toggle the accordion item
                    $toggle.addEventListener('click', clickToggleEventHandler);
                });
            });

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * Toggle an accordion item.
         * @param  {element}  $item   The accordion item.
         * @param  {bool}     silent  Suppress callbacks.
         * @return {void}
         */
        toggle: ($item, silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the toggle before callback
                plugin.settings.callbackToggleBefore.call();
            }

            // Set the accordion and accordion body
            const $accordion = $item.closest('.accordion');
            const $body = $item.querySelector('.accordion__body');

            // Set the accordion toggle settings
            const toggle_animation =
                $accordion.dataset.accordionToggleAnimation ||
                plugin.settings.toggleAnimation;
            const toggle_animation_duration =
                $accordion.dataset.accordionToggleAnimationDuration ||
                plugin.settings.toggleAnimationDuration;

            // Start a switch statement for the toggle animation
            switch (toggle_animation) {
                // Default
                default:
                    // Toggle the expanded and collapsed state hooks on the accordion item
                    $item.classList.toggle('is-expanded');
                    $item.classList.toggle('is-collapsed');

                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the toggle after callback
                        plugin.settings.callbackToggleAfter.call();
                    }
                break;

                // Slide
                case 'slide':
                    // Remove the animated state hook from the accordion
                    $accordion.classList.remove('has-animated');

                    // Add the animating state hook to the accordion
                    $accordion.classList.add('is-animating');

                    // Check if the accordion item has the expanded state hook
                    if ($item.classList.contains('is-expanded')) {
                        // Slide the body up
                        Velocity($body, 'slideUp', {
                            complete: () => {
                                // Remove the animating state hook from the accordion
                                $accordion.classList.remove('is-animating');

                                // Toggle the expanded and collapsed state hooks on the accordion item
                                $item.classList.toggle('is-expanded');
                                $item.classList.toggle('is-collapsed');

                                // Add the animated state hook to the accordion
                                $accordion.classList.add('has-animated');

                                // Check if the callbacks should not be suppressed
                                if (!silent) {
                                    // Call the toggle after callback
                                    plugin.settings.callbackToggleAfter.call();
                                }
                            },
                            duration: toggle_animation_duration
                        });
                    }

                    // Check if the accordion item has the collapsed state hook
                    if ($item.classList.contains('is-collapsed')) {
                        // Toggle the expanded and collapsed state hooks on the accordion item
                        $item.classList.toggle('is-expanded');
                        $item.classList.toggle('is-collapsed');

                        // Slide the body down
                        Velocity($body, 'slideDown', {
                            complete: () => {
                                // Remove the animating state hook from the accordion
                                $accordion.classList.remove('is-animating');

                                // Add the animated state hook to the accordion
                                $accordion.classList.add('has-animated');

                                // Check if the callbacks should not be suppressed
                                if (!silent) {
                                    // Call the toggle after callback
                                    plugin.settings.callbackToggleAfter.call();
                                }
                            },
                            duration: toggle_animation_duration
                        });
                    }
                break;

                // Fade
                case 'fade':
                    // Remove the animated state hook from the accordion
                    $accordion.classList.remove('has-animated');

                    // Add the animating state hook to the accordion
                    $accordion.classList.add('is-animating');

                    // Check if the accordion item has the expanded state hook
                    if ($item.classList.contains('is-expanded')) {
                        // Fade the body out
                        Velocity($body, 'fadeOut', {
                            complete: () => {
                                // Remove the animating state hook from the accordion
                                $accordion.classList.remove('is-animating');

                                // Toggle the expanded and collapsed state hooks on the accordion item
                                $item.classList.toggle('is-expanded');
                                $item.classList.toggle('is-collapsed');

                                // Add the animated state hook to the accordion
                                $accordion.classList.add('has-animated');

                                // Check if the callbacks should not be suppressed
                                if (!silent) {
                                    // Call the toggle after callback
                                    plugin.settings.callbackToggleAfter.call();
                                }
                            },
                            duration: toggle_animation_duration
                        });
                    }

                    // Check if the accordion item has the collapsed state hook
                    if ($item.classList.contains('is-collapsed')) {
                        // Toggle the expanded and collapsed state hooks on the accordion item
                        $item.classList.toggle('is-expanded');
                        $item.classList.toggle('is-collapsed');

                        // Fade the body in
                        Velocity($body, 'fadeIn', {
                            complete: () => {
                                // Remove the animating state hook from the accordion
                                $accordion.classList.remove('is-animating');

                                // Add the animated state hook to the accordion
                                $accordion.classList.add('has-animated');

                                // Check if the callbacks should not be suppressed
                                if (!silent) {
                                    // Call the toggle after callback
                                    plugin.settings.callbackToggleAfter.call();
                                }
                            },
                            duration: toggle_animation_duration
                        });
                    }
                break;
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

            // Set the accordions
            const $accordions = document.querySelectorAll(plugin.element);

            // Cycle through all of the accordions
            $accordions.forEach(($accordion) => {
                // Set the accordion items
                const $items = $accordion.querySelectorAll('.accordion__item');

                // Cycle through all of the accordion items
                $items.forEach(($item, index) => {
                    // Set the accordion item toggle
                    const $toggle = $item.querySelector('.js-accordion-toggle');

                    // Remove the click event handler from the accordion item toggle
                    $toggle.removeEventListener('click', clickToggleEventHandler);
                });
            });

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy after callback
                plugin.settings.callbackDestroyAfter.call();
            }
        },

        /**
         * Call the toggle method silently.
         * @param  {element}  $item  The accordion item.
         * @return {void}
         */
        toggleSilently: ($item) => {
            // Call the toggle method silently
            plugin.this.toggle($item, true);
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
