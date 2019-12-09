/*  ========================================================================
    JUICE -> COMPONENTS -> TOGGLER
    ========================================================================  */

;(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Toggler';

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
        animationIn: 'fade-in-up',
        animationOut: 'fade-out-down',
        slide: false,
        slideDuration: 200,

        callbackInitializeBefore: () => {
            console.log('Toggler: callbackInitializeBefore');
        },
        callbackInitializeAfter: () => {
            console.log('Toggler: callbackInitializeAfter');
        },
        callbackShowBefore: () => {
            console.log('Toggler: callbackShowBefore');
        },
        callbackShowAfter: () => {
            console.log('Toggler: callbackShowAfter');
        },
        callbackHideBefore: () => {
            console.log('Toggler: callbackHideBefore');
        },
        callbackHideAfter: () => {
            console.log('Toggler: callbackHideAfter');
        },
        callbackRefreshBefore: () => {
            console.log('Toggler: callbackRefreshBefore');
        },
        callbackRefreshAfter: () => {
            console.log('Toggler: callbackRefreshAfter');
        },
        callbackDestroyBefore: () => {
            console.log('Toggler: callbackDestroyBefore');
        },
        callbackDestroyAfter: () => {
            console.log('Toggler: callbackDestroyAfter');
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
     * Event handler to toggle a target when the trigger is clicked.
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
            // Set the target css display value
            const target_display_style = ($target.currentStyle
                ? $target.currentStyle.display
                : getComputedStyle($target, null).display
            );

            // Check if the target is visible
            if (target_display_style != 'none') {
                // Hide the target
                plugin.this.hide($target);
            } else {
                // Show the target
                plugin.this.show($target);
            }
        });
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

            // Set the triggers
            const $triggers = document.querySelectorAll(plugin.element);

            // Cycle through all of the triggers
            $triggers.forEach(($trigger) => {
                // Create an empty targets array
                let $targets = [];

                // Check if their are multiple targets
                if ($trigger.dataset.togglerTargets.includes(', ')) {
                    // Set the targets
                    const targets = $trigger.dataset.togglerTargets.split(', ');

                    // Cycle through all of the targets
                    targets.forEach((target) => {
                        // Set the target
                        const $target = document.querySelector(target);

                        // Add the target to the targets array
                        $targets.push($target);
                    });
                } else {
                    // Set the target
                    const $target = document.querySelector($trigger.dataset.togglerTargets);

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

                // Add a click event handler to the trigger to toggle the targets
                $trigger.addEventListener('click', clickTriggerEventHandler);
            });

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * Show an element.
         * @param  {element}  $target  The target.
         * @param  {bool}     silent   Suppress callbacks.
         * @return {void}
         */
        show: ($target, silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the show before callback
                plugin.settings.callbackShowBefore.call();
            }

            // Set the trigger
            const $trigger = $target.data.trigger;

            // Set the slide status
            const slide =
                $trigger.dataset.togglerSlide ||
                plugin.settings.slide;

            // Check if a slide status exists
            if (slide) {
                // Remove the animated state hook from the target
                $target.classList.remove('has-animated');

                // Add the animating state hook to the target
                $target.classList.add('is-animating');

                // Set the slide duration
                const slide_duration =
                    $trigger.dataset.togglerSlideDuration ||
                    plugin.settings.slideDuration;

                // Slide the target down
                Velocity($target, 'slideDown', {
                    complete: () => {
                        // Remove the animating state hook from the target
                        $target.classList.remove('is-animating');

                        // Add the animated state hook to the target
                        $target.classList.add('has-animated');

                        // Check if the callbacks should not be suppressed
                        if (!silent) {
                            // Call the show after callback
                            plugin.settings.callbackShowAfter.call();
                        }
                    },
                    duration: slide_duration
                });
            } else {
                // Set the target animation in
                const animation_in =
                    $trigger.dataset.togglerAnimationIn ||
                    plugin.settings.animationIn;

                // Show the target
                $target.style.display = '';

                // Check if the animation in is set
                if (animation_in && animation_in != 'none') {
                    // Remove the animated state hook from the target
                    $target.classList.remove('has-animated');

                    // Add the animating state hook to the target
                    $target.classList.add('is-animating');

                    // Add the animation classes to the target
                    $target.classList.add(plugin.settings.animationClass);
                    $target.classList.add(animation_in);

                    // Add an animation end event listener to the target
                    $target.addEventListener('animationend', (event) => {
                        // Remove the animating state hook from the target
                        $target.classList.remove('is-animating');

                        // Remove the animation classes from the target
                        $target.classList.remove(plugin.settings.animationClass);
                        $target.classList.remove(animation_in);

                        // Add the animated state hook to the target
                        $target.classList.add('has-animated');

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
         * Hide an element.
         * @param  {element}  $target  The target.
         * @param  {bool}     silent   Suppress callbacks.
         * @return {void}
         */
        hide: ($target, silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the hide before callback
                plugin.settings.callbackHideBefore.call();
            }

            // Set the trigger
            const $trigger = $target.data.trigger;

            // Set the slide status
            const slide =
                $trigger.dataset.togglerSlide ||
                plugin.settings.slide;

            // Check if a slide status exists
            if (slide) {
                // Remove the animated state hook from the target
                $target.classList.remove('has-animated');

                // Add the animating state hook to the target
                $target.classList.add('is-animating');

                // Set the slide duration
                const slide_duration =
                    $trigger.dataset.togglerSlideDuration ||
                    plugin.settings.slideDuration;

                // Slide the target up
                Velocity($target, 'slideUp', {
                    complete: () => {
                        // Remove the animating state hook from the target
                        $target.classList.remove('is-animating');

                        // Add the animated state hook to the target
                        $target.classList.add('has-animated');

                        // Check if the callbacks should not be suppressed
                        if (!silent) {
                            // Call the hide after callback
                            plugin.settings.callbackHideAfter.call();
                        }
                    },
                    duration: slide_duration
                });
            } else {
                // Set the target animation out
                const animation_out =
                    $trigger.dataset.togglerAnimationOut ||
                    plugin.settings.animationOut;

                // Check if the animation out is set
                if (animation_out && animation_out != 'none') {
                    // Remove the animated state hook from the target
                    $target.classList.remove('has-animated');

                    // Add the animating state hook to the target
                    $target.classList.add('is-animating');

                    // Add the animation classes to the target
                    $target.classList.add(plugin.settings.animationClass);
                    $target.classList.add(animation_out);

                    // Add an animation end event listener to the target
                    $target.addEventListener('animationend', (event) => {
                        // Remove the animating state hook from the target
                        $target.classList.remove('is-animating');

                        // Remove the animation classes from the target
                        $target.classList.remove(plugin.settings.animationClass);
                        $target.classList.remove(animation_out);

                        // Add the animated state hook to the target
                        $target.classList.add('has-animated');

                        // Hide the target
                        $target.style.display = 'none';

                        // Check if the callbacks should not be suppressed
                        if (!silent) {
                            // Call the hide after callback
                            plugin.settings.callbackHideAfter.call();
                        }
                    }, {
                        once: true
                    });
                } else {
                    // Hide the target
                    $target.style.display = 'none';

                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the hide after callback
                        plugin.settings.callbackHideAfter.call();
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
         * Call the show method silently.
         * @param  {element}  $target  The target.
         * @return {void}
         */
        showSilently: ($target) => {
            // Call the show method silently
            plugin.this.show($target, true);
        },

        /**
         * Call the hide method silently.
         * @param  {element}  $target  The target.
         * @return {void}
         */
        hideSilently: ($target) => {
            // Call the hide method silently
            plugin.this.hide($target, true);
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
