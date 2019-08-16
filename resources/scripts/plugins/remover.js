/*  ========================================================================
    JUICE -> COMPONENTS -> REMOVER
    ========================================================================  */

;(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Remover';

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
        animationClass: 'has-animation',
        animationRemove: 'fade-out',
        slide: false,
        slideDuration: 200,

        callbackInitializeBefore: () => {
            console.log('Remover: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Remover: callbackInitializeAfter');
        },
        callbackRemoveBefore: () => {
            console.log('Remover: callbackRemoveBefore');
        },
        callbackRemoveAfter: () => {
            console.log('Remover: callbackRemoveAfter');
        },
        callbackRefreshBefore: () => {
            console.log('Remover: callbackRefreshBefore');
        },
        callbackRefreshAfter: () => {
            console.log('Remover: callbackRefreshAfter');
        },
        callbackDestroyBefore: () => {
            console.log('Remover: callbackDestroyBefore');
        },
        callbackDestroyAfter: () => {
            console.log('Remover: callbackDestroyAfter');
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
     * Event handler to remove a target when the trigger is clicked.
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickTriggerEventHandler = (event) => {
        // Prevent the default action
        event.preventDefault();

        // Set the trigger and targets
        const $trigger = event.currentTarget;
        const $targets = $trigger.data.targets;

        // Cycle through all of the targets
        $targets.forEach(($target) => {
            // Remove the target
            plugin.this.remove($target);
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

            // Set the triggers
            const $triggers = document.querySelectorAll(plugin.element);

            // Cycle through all of the triggers
            $triggers.forEach(($trigger) => {
                // Create an empty targets array
                let $targets = [];

                // Check if their are multiple targets
                if ($trigger.dataset.removerTargets.includes(', ')) {
                    // Set the targets
                    const targets = $trigger.dataset.removerTargets.split(', ');

                    // Cycle through all of the targets
                    targets.forEach((target) => {
                        // Set the target
                        const $target = document.querySelector(target);

                        // Add the target to the targets array
                        $targets.push($target);
                    });
                } else {
                    // Set the target
                    const $target = document.querySelector($trigger.dataset.removerTargets);

                    // Add the target to the targets array
                    $targets.push($target);
                }

                // Assign the targets to the trigger data object
                $trigger.data = {
                    targets: $targets
                };

                // Cycle through all of the targets
                $targets.forEach(($target) => {
                    // Assign the trigger to the target data object
                    $target.data = {
                        trigger: $trigger
                    };
                });

                // Add a click event handler to the trigger to remove the targets
                $trigger.addEventListener('click', clickTriggerEventHandler);
            });

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * Remove an element.
         * @param  {element}  $target  The target.
         * @param  {bool}     silent   Suppress callbacks.
         * @return {void}
         */
        remove: ($target, silent = false) => {
            // Check if the target exists and the target doesn't have the animating state hook
            if (document.body.contains($target) && !$target.classList.contains('is-animating')) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the remove before callback
                    plugin.settings.callbackRemoveBefore.call();
                }

                // Set the target css display value
                const target_display_style = ($target.currentStyle
                    ? $target.currentStyle.display
                    : getComputedStyle($target, null).display
                );

                // Check if the target is visible
                if (target_display_style != 'none') {
                    // Set the trigger
                    const $trigger = $target.data.trigger;

                    // Set the slide status
                    const slide =
                        $trigger.dataset.removerSlide ||
                        plugin.settings.slide;

                    // Check if a slide status exists
                    if (slide) {
                        // Add the animating state hook to the target
                        $target.classList.add('is-animating');

                        // Set the slide duration
                        const slide_duration =
                            $trigger.dataset.removerSlideDuration ||
                            plugin.settings.slideDuration;

                        // Slide the target up
                        Velocity($target, 'slideUp', {
                            complete: () => {
                                // Remove the target
                                $target.parentNode.removeChild($target);

                                // Check if the callbacks should not be suppressed
                                if (!silent) {
                                    // Call the remove after callback
                                    plugin.settings.callbackRemoveAfter.call();
                                }
                            },
                            duration: slide_duration
                        });
                    } else {
                        // Set the target remove animation
                        const remove_animation =
                            $trigger.dataset.removerAnimationRemove ||
                            plugin.settings.animationRemove;

                        // Check if the remove animation is set
                        if (remove_animation && remove_animation != 'none') {
                            // Add the animating state hook to the target
                            $target.classList.add('is-animating');

                            // Add the animation classes to the target
                            $target.classList.add(plugin.settings.animationClass);
                            $target.classList.add(remove_animation);

                            // Add an animation end event listener to the target
                            $target.addEventListener('animationend', (event) => {
                                // Remove the target
                                $target.parentNode.removeChild($target);

                                // Check if the callbacks should not be suppressed
                                if (!silent) {
                                    // Call the remove after callback
                                    plugin.settings.callbackRemoveAfter.call();
                                }
                            }, {
                                once: true
                            });
                        } else {
                            // Remove the target
                            $target.parentNode.removeChild($target);

                            // Check if the callbacks should not be suppressed
                            if (!silent) {
                                // Call the remove after callback
                                plugin.settings.callbackRemoveAfter.call();
                            }
                        }
                    }
                } else {
                    // Remove the target
                    $target.parentNode.removeChild($target);

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

            // Set the triggers
            const $triggers = document.querySelectorAll(plugin.element);

            // Cycle through all of the triggers
            $triggers.forEach(($trigger) => {
                // Remove the click event handler from the toggler trigger
                $trigger.removeEventListener('click', clickTriggerEventHandler);
            });

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy after callback
                plugin.settings.callbackDestroyAfter.call();
            }
        },

        /**
         * Call the remove method silently.
         * @param  {element}  $target  The target.
         * @return {void}
         */
        removeSilently: ($target) => {
            // Call the remove method silently
            plugin.this.remove($target, true);
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
