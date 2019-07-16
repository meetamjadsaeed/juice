/*  ========================================================================
    JUICE -> COMPONENTS -> PANEL
    ========================================================================  */

;(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Panel';

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
        animationRemove: 'fade-out',
        toggle: 'slide',
        toggleDuration: 200,

        callbackInitializeBefore: () => {
            console.log('Panel: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Panel: callbackInitializeAfter');
        },
        callbackToggleBefore: () => {
            console.log('Panel: callbackToggleBefore');
        },
        callbackToggleAfter: () => {
            console.log('Panel: callbackToggleAfter');
        },
        callbackRemoveBefore: () => {
            console.log('Panel: callbackRemoveBefore');
        },
        callbackRemoveAfter: () => {
            console.log('Panel: callbackRemoveAfter');
        },
        callbackRefreshBefore: () => {
            console.log('Panel: callbackRefreshBefore');
        },
        callbackRefreshAfter: () => {
            console.log('Panel: callbackRefreshAfter');
        },
        callbackDestroyBefore: () => {
            console.log('Panel: callbackDestroyBefore');
        },
        callbackDestroyAfter: () => {
            console.log('Panel: callbackDestroyAfter');
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
     * Event handler to remove a panel when the panel remove is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickRemoveEventHandler = (event) => {
        // Set the remove and panel
        const $remove = event.currentTarget;
        const $panel = $remove.closest('.panel');

        // Remove the panel
        plugin.this.remove($panel);
    };

    /**
     * Event handler to toggle a panel when the panel toggle is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickToggleEventHandler = (event) => {
        // Set the remove and panel
        const $remove = event.currentTarget;
        const $panel = $remove.closest('.panel');

        // Toggle the panel
        plugin.this.toggle($panel);
    };

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

            // Set the panels
            const $panels = document.querySelectorAll(plugin.element);

            // Check if any panels exist
            if ($panels) {
                // Cycle through all of the panels
                $panels.forEach(($panel) => {
                    // Set the toggle and remove
                    const $toggle = $panel.querySelector('.js-panel-toggle');
                    const $remove = $panel.querySelector('.js-panel-remove');

                    // Check if the panel doesn't have either the expanded or collapsed state hooks
                    if (!$panel.classList.contains('is-expanded') && !$panel.classList.contains('is-collapsed')) {
                        // Add the expanded state hook to the panel
                        $panel.classList.add('is-expanded');
                    }

                    // Check if the toggle exists
                    if ($toggle) {
                        // Add a click event handler to the toggle to toggle the panel
                        $toggle.addEventListener('click', clickToggleEventHandler);
                    }

                    // Check if the remove exists
                    if ($remove) {
                        // Add a click event handler to the remove to remove the panel
                        $remove.addEventListener('click', clickRemoveEventHandler);
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
         * Toggle a panel.
         * @param  {element}  $panel  The panel.
         * @param  {bool}     silent  Suppress callbacks.
         * @return {void}
         */
        toggle: ($panel, silent = false) => {
            // Check if the panel exists and isn't animating
            if ($panel && !$panel.classList.contains('is-animating')) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the toggle before callback
                    plugin.settings.callbackToggleBefore.call();
                }

                // Set the body
                const $body = $panel.querySelector('.panel__body');

                // Set the toggle settings
                const toggle = $panel.dataset.panelToggle || plugin.settings.toggle;
                const toggle_duration = $panel.dataset.panelToggleDuration || plugin.settings.toggleDuration;

                // Start a switch statement for the toggle animation
                switch (toggle) {
                    // Default
                    default:
                        // Set the panel expanded/collapsed state hooks
                        $panel.classList.toggle('is-expanded');
                        $panel.classList.toggle('is-collapsed');

                        // Check if the callbacks should not be suppressed
                        if (!silent) {
                            // Call the toggle after callback
                            plugin.settings.callbackToggleAfter.call();
                        }

                        // Break the switch
                        break;

                    // Slide
                    case 'slide':
                        // Set the panel animation classes
                        $panel.classList.remove('has-animated');
                        $panel.classList.add('is-animating');

                        // Check if the panel has the expanded state hook
                        if ($panel.classList.contains('is-expanded')) {
                            // Slide the body up
                            Velocity($body, 'slideUp', {
                                complete: () => {
                                    // Set the panel animation classes
                                    $panel.classList.remove('is-animating');
                                    $panel.classList.add('has-animated');

                                    // Set the panel expanded/collapsed state hooks
                                    $panel.classList.toggle('is-expanded');
                                    $panel.classList.toggle('is-collapsed');

                                    // Check if the callbacks should not be suppressed
                                    if (!silent) {
                                        // Call the toggle after callback
                                        plugin.settings.callbackToggleAfter.call();
                                    }
                                },
                                duration: toggle_duration
                            });
                        }

                        // Check if the panel has the collapsed state hook
                        if ($panel.classList.contains('is-collapsed')) {
                            // Set the panel expanded/collapsed state hooks
                            $panel.classList.toggle('is-expanded');
                            $panel.classList.toggle('is-collapsed');

                            // Slide the body down
                            Velocity($body, 'slideDown', {
                                complete: () => {
                                    // Set the panel animation classes
                                    $panel.classList.remove('is-animating');
                                    $panel.classList.add('has-animated');

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

                    // Fade
                    case 'fade':
                        // Set the panel animation classes
                        $panel.classList.remove('has-animated');
                        $panel.classList.add('is-animating');

                        // Check if the panel has the expanded state hook
                        if ($panel.classList.contains('is-expanded')) {
                            // Fade the body out
                            Velocity($body, 'fadeOut', {
                                complete: () => {
                                    // Set the panel animation calsses
                                    $panel.classList.remove('is-animating');
                                    $panel.classList.add('has-animated');

                                    // Set the panel expanded/collapsed state hooks
                                    $panel.classList.toggle('is-expanded');
                                    $panel.classList.toggle('is-collapsed');

                                    // Check if the callbacks should not be suppressed
                                    if (!silent) {
                                        // Call the toggle after callback
                                        plugin.settings.callbackToggleAfter.call();
                                    }
                                },
                                duration: toggle_duration
                            });
                        }

                        // Check if the panel has the collapsed state hook
                        if ($panel.classList.contains('is-collapsed')) {
                            // Set the panel expanded/collapsed state hooks
                            $panel.classList.toggle('is-expanded');
                            $panel.classList.toggle('is-collapsed');

                            // Fade the body in
                            Velocity($body, 'fadeIn', {
                                complete: () => {
                                    // Set the panel animation classes
                                    $panel.classList.remove('is-animating');
                                    $panel.classList.add('has-animated');

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
        },

        /**
         * Remove a panel.
         * @param  {element}  $panel  The panel.
         * @param  {bool}     silent  Suppress callbacks.
         * @return {void}
         */
        remove: ($panel, silent = false) => {
            // Check if the panel exists and isn't animating out
            if ($panel && !$panel.classList.contains('is-animating-out')) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the remove before callback
                    plugin.settings.callbackRemoveBefore.call();
                }

                // Check if the panel is animated
                if (plugin.settings.animation) {
                    // Set the remove animation
                    const remove_animation = $panel.dataset.panelAnimationRemove || plugin.settings.animationRemove;

                    // Set the panel animation classes
                    $panel.classList.add('is-animating-out', plugin.settings.animationClass, remove_animation);

                    // Add an animation end event listener to the panel
                    $panel.addEventListener('animationend', () => {
                        // Remove the panel
                        $panel.remove();

                        // Check if the callbacks should not be suppressed
                        if (!silent) {
                            // Call the remove after callback
                            plugin.settings.callbackRemoveAfter.call();
                        }
                    }, {
                        once: true
                    });
                } else {
                    // Remove the panel
                    $panel.remove();

                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the remove after callback
                        plugin.settings.callbackRemoveAfter.call();
                    }
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

            // Set the panels
            const $panels = document.querySelectorAll(plugin.element);

            // Check if any panels exist
            if ($panels) {
                // Cycle through all of the panels
                $panels.forEach(($panel) => {
                    // Set the toggle and remove
                    const $toggle = $panel.querySelector('.js-panel-toggle');
                    const $remove = $panel.querySelector('.js-panel-remove');

                    // Check if the toggle exists
                    if ($toggle) {
                        // Remove the click event handler from the toggle
                        $toggle.removeEventListener('click', clickToggleEventHandler);
                    }

                    // Check if the remove exists
                    if ($remove) {
                        // Remove the click event handler from the remove
                        $remove.removeEventListener('click', clickRemoveEventHandler);
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
         * Call the toggle method silently.
         * @param  {element}  $panel  The panel.
         * @return {void}
         */
        toggleSilently: ($panel) => {
            // Call the remove method silently
            plugin.this.toggle($panel, true);
        },

        /**
         * Call the remove method silently.
         * @param  {element}  $panel  The panel.
         * @return {void}
         */
        removeSilently: ($panel) => {
            // Call the remove method silently
            plugin.this.remove($panel, true);
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
