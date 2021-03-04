(function (root, factory) {
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
        openMultipleItems: false,
        toggle: 'slide',
        toggleDuration: 200,

        callbackDestroyBefore: () => {},
        callbackDestroyAfter: () => {},
        callbackInitializeBefore: () => {},
        callbackInitializeAfter: () => {},
        callbackRefreshBefore: () => {},
        callbackRefreshAfter: () => {},
        callbackToggleBefore: () => {},
        callbackToggleAfter: () => {}
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
     * Click event handler to toggle an accordion item.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickAccordionToggleEventHandler = (event) => {
        // Check if the event target is the toggle or a descendant of the toggle
        if (isTargetSelector(event.target, 'class', 'js-accordion-toggle')) {
            // Prevent the default action
            event.preventDefault();

            // Set the toggle
            const $toggle = event.target;

            // Set the item and accordion
            const $item = $toggle.closest('.accordion__item');
            const $accordion = $item.closest('.accordion');

            // Set the accordion type
            const open_multiple_items = $accordion.dataset.accordionOpenMultipleItems || plugin.settings.openMultipleItems;

            // Check if opening multiple items is not allowed
            if (!open_multiple_items) {
                // Create an empty item siblings array
                const $siblings = [];

                // Set the first item sibling
                let $sibling = $item.parentNode.firstChild;

                // Start a while loop for the item siblings existance
                while ($sibling) {
                    // Check if the item sibling is an element and not the current item
                    if ($sibling.nodeType === 1 && $sibling !== $item) {
                        // Add the item sibling to the siblings array
                        $siblings.push($sibling);
                    }

                    // Set the next item sibling
                    $sibling = $sibling.nextSibling;
                }

                // Cycle through all of the item siblings
                $siblings.forEach(($sibling) => {
                    // Check if the item sibling has the is expanded state hook
                    if ($sibling.classList.contains('is-expanded')) {
                        // Toggle the item sibling
                        plugin.this.toggle($sibling);
                    }
                });
            }

            // Toggle the accordion item
            plugin.this.toggle($item);
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

            // Remove the click event handler from the accordion
            document.removeEventListener('click', clickAccordionToggleEventHandler);

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

            // Set the accordions
            const $accordions = document.querySelectorAll(plugin.element);

            // Check if any accordions exist
            if ($accordions) {
                // Cycle through all of the accordions
                $accordions.forEach(($accordion) => {
                    // Set the items
                    const $items = $accordion.querySelectorAll('.accordion__item');

                    // Check if any items exist
                    if ($items) {
                        // Cycle through all of the items
                        $items.forEach(($item, index) => {
                            // Set the open multiple items
                            const open_multiple_items = $accordion.dataset.accordionOpenMultipleItems || plugin.settings.openMultipleItems;

                            // Check if the item doesn't have the expanded or collapsed state hooks
                            if (!$item.classList.contains('is-expanded') && !$item.classList.contains('is-collapsed')) {
                                // Set the item expanded/collapsed state hooks
                                $item.classList.add('is-collapsed');
                            }

                            // Check if opening multiple items is not allowed
                            if (!open_multiple_items) {
                                // Check if the item has the expanded state hook
                                if ($item.classList.contains('is-expanded')) {
                                    // Check if this is the first iterated item in the loop
                                    if (index === 0) {
                                        // Set the item expanded/collapsed state hooks
                                        $item.classList.add('is-expanded');
                                        $item.classList.remove('is-collapsed');
                                    } else {
                                        // Set the item expanded/collapsed state hooks
                                        $item.classList.add('is-collapsed');
                                        $item.classList.remove('is-expanded');
                                    }
                                }
                            }
                        });
                    }
                });
            }

            // Add a click event handler to the accordion
            document.addEventListener('click', clickAccordionToggleEventHandler);

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
         * Toggle an accordion item.
         *
         * @param  {element}  $item   The accordion item.
         * @param  {bool}     silent  Suppress callbacks.
         * @return {void}
         */
        toggle: ($item, silent = false) => {
            // Check if the item exists and isn't animating
            if ($item && !$item.classList.contains('is-animating')) {
                // Set the accordion and body
                const $accordion = $item.closest('.accordion');
                const $body = $item.querySelector('.accordion__body');

                // Check if the item exists and isn't animating
                if (!$accordion.classList.contains('is-animating')) {
                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the toggle before callback
                        plugin.settings.callbackToggleBefore.call();
                    }

                    // Set the toggle settings
                    const toggle = $accordion.dataset.accordionToggle || plugin.settings.toggle;
                    const toggle_duration = $accordion.dataset.accordionToggleDuration || plugin.settings.toggleDuration;

                    // Start a switch statement for the toggle animation
                    switch (toggle) {
                        // Default
                        default:
                            // Set the item expanded/collapsed state hooks
                            $item.classList.toggle('is-expanded');
                            $item.classList.toggle('is-collapsed');

                            // Check if the callbacks should not be suppressed
                            if (!silent) {
                                // Call the toggle after callback
                                plugin.settings.callbackToggleAfter.call();
                            }

                            // Break the switch
                            break;

                        // Slide
                        case 'slide': {
                            // Set the accordion animation classes
                            $accordion.classList.remove('has-animated');
                            $accordion.classList.add('is-animating');

                            // Set the item animation classes
                            $item.classList.remove('has-animated');
                            $item.classList.add('is-animating');

                            // Check if the accordion item has the expanded state hook
                            if ($item.classList.contains('is-expanded')) {
                                // Slide the body up
                                Velocity($body, 'slideUp', {
                                    complete: () => {
                                        // Set the accordion animation classes
                                        $accordion.classList.remove('is-animating');
                                        $accordion.classList.add('has-animated');

                                        // Set the item animation classes
                                        $item.classList.remove('is-animating');
                                        $item.classList.add('has-animated');

                                        // Set the item expanded/collapsed state hooks
                                        $item.classList.toggle('is-expanded');
                                        $item.classList.toggle('is-collapsed');

                                        // Check if the callbacks should not be suppressed
                                        if (!silent) {
                                            // Call the toggle after callback
                                            plugin.settings.callbackToggleAfter.call();
                                        }
                                    },
                                    duration: toggle_duration
                                });
                            }

                            // Check if the item has the collapsed state hook
                            if ($item.classList.contains('is-collapsed')) {
                                // Set the item expanded/collapsed state hooks
                                $item.classList.toggle('is-expanded');
                                $item.classList.toggle('is-collapsed');

                                // Slide the body down
                                Velocity($body, 'slideDown', {
                                    complete: () => {
                                        // Set the accordion animation classes
                                        $accordion.classList.remove('is-animating');
                                        $accordion.classList.add('has-animated');

                                        // Set the item animation classes
                                        $item.classList.remove('is-animating');
                                        $item.classList.add('has-animated');

                                        // Check if the callbacks should not be suppressed
                                        if (!silent) {
                                            // Call the toggle after callback
                                            plugin.settings.callbackToggleAfter.call();
                                        }
                                    },
                                    duration: toggle_duration
                                });
                            }

                            // Break the switch
                            break;
                        }

                        // Fade
                        case 'fade': {
                            // Set the accordion animation classes
                            $accordion.classList.remove('has-animated');
                            $accordion.classList.add('is-animating');

                            // Set the item animation classes
                            $item.classList.remove('has-animated');
                            $item.classList.add('is-animating');

                            // Check if the item has the expanded state hook
                            if ($item.classList.contains('is-expanded')) {
                                // Fade the body out
                                Velocity($body, 'fadeOut', {
                                    complete: () => {
                                        // Set the accordion animation classes
                                        $accordion.classList.remove('is-animating');
                                        $accordion.classList.add('has-animated');

                                        // Set the item animation classes
                                        $item.classList.remove('is-animating');
                                        $item.classList.add('has-animated');

                                        // Set the item expanded/collapsed state hooks
                                        $item.classList.toggle('is-expanded');
                                        $item.classList.toggle('is-collapsed');

                                        // Check if the callbacks should not be suppressed
                                        if (!silent) {
                                            // Call the toggle after callback
                                            plugin.settings.callbackToggleAfter.call();
                                        }
                                    },
                                    duration: toggle_duration
                                });
                            }

                            // Check if the item has the collapsed state hook
                            if ($item.classList.contains('is-collapsed')) {
                                // Set the item expanded/collapsed state hooks
                                $item.classList.toggle('is-expanded');
                                $item.classList.toggle('is-collapsed');

                                // Fade the body in
                                Velocity($body, 'fadeIn', {
                                    complete: () => {
                                        // Set the accordion animation classes
                                        $accordion.classList.remove('is-animating');
                                        $accordion.classList.add('has-animated');

                                        // Set the item animation classes
                                        $item.classList.remove('is-animating');
                                        $item.classList.add('has-animated');

                                        // Check if the callbacks should not be suppressed
                                        if (!silent) {
                                            // Call the toggle after callback
                                            plugin.settings.callbackToggleAfter.call();
                                        }
                                    },
                                    duration: toggle_duration
                                });
                            }

                            // Break the switch
                            break;
                        }
                    }
                }
            }
        },

        /**
         * Call the toggle method silently.
         *
         * @param  {element}  $item  The accordion item.
         * @return {void}
         */
        toggleSilently: ($item) => {
            // Call the toggle method silently
            plugin.this.toggle($item, true);
        },
    };

    // Return the plugin
    return Plugin;
}));
