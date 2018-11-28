/* =============================================================================================
   JUICE -> COMPONENTS -> TOGGLER
   ============================================================================================= */

;(function (root, factory) {
    // Set the plugin name
    const pluginName = 'Toggler';

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
    	animationIn: 'fadeInUpTiny',
        animationOut: 'fadeOutDownTiny',
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
            console.log('Password: callbackRefreshAfter');
        },
        callbackDestroyBefore: () => {
            console.log('Toggler: callbackDestroyBefore');
        },
        callbackDestroyAfter: () => {
            console.log('Toggler: callbackDestroyAfter');
        },
        slide: false,
        slideDuration: 200
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
     * Event handler to toggle an element when the trigger is clicked
     * @param  {object}  event  The event object
     * @return {void}
     */
    const clickTriggerEventHandler = (event) => {
        // Set the trigger and target
        const $trigger = event.currentTarget;
        const $target = $trigger.data.target;

        // Check if the trigger has the active state and show or hide the target
        (!$trigger.classList.contains('is-active')
            ? plugin.this.show($target)
            : plugin.this.hide($target)
        );
    }

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

            // Set the triggers
            const $triggers = document.querySelectorAll(plugin.element);

            // Cycle through all of the triggers
            $triggers.forEach(($trigger) => {
                // Set the target
                const $target = document.querySelector($trigger.dataset.togglerTarget);

                // Assign the target to the trigger data object
                $trigger.data = {
                    target: $target
                };

                // Assign the trigger to the target data object
                $target.data = {
                    trigger: $trigger
                };

                // Set the target css display value
                const targetDisplay = ($target.currentStyle
                    ? $target.currentStyle.display
                    : getComputedStyle($target, null).display
                );

                // Check if the target is visible
                if (targetDisplay != 'none') {
                    // Add the active state to the trigger
                    $trigger.classList.add('is-active');
                }

                // Add a click event handler to the trigger to toggle the target
                $trigger.addEventListener('click', clickTriggerEventHandler);
            });

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }
        },

        /**
         * Show an element
         * @param  {element}  $target  The target
         * @param  {bool}     silent   Suppress callbacks
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

            // Add the active state to the trigger
            $trigger.classList.add('is-active');

            // Set the slide status
            const slide = $trigger.dataset.togglerSlide || plugin.settings.slide;

            // Check if a slide status exists
            if (slide) {
                // Remove the animated state hook from the target
                $target.classList.remove('has-animated');

                // Add the animating state hook to the target
                $target.classList.add('is-animating');

                // Set the slide duration
                const slideDuration = $trigger.dataset.togglerSlideDuration || plugin.settings.slideDuration;

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
                    duration: slideDuration
                });
            } else {
                // Set the target animation in
                const animationIn = $trigger.dataset.togglerAnimationIn || plugin.settings.animationIn;

                // Show the target
                $target.style.display = '';

                // Check if the animation in is set
                if (animationIn && animationIn != 'none') {
                    // Remove the animated state hook from the target
                    $target.classList.remove('has-animated');

                    // Add the animating state hook to the target
                    $target.classList.add('is-animating');

                    // Add the animation classes to the target
                    $target.classList.add('animated');
                    $target.classList.add(animationIn);

                    // Add an animation end event listener to the target
                    $target.addEventListener('animationend', (event) => {
                        // Remove the animating state hook from the target
                        $target.classList.remove('is-animating');

                        // Remove the animation classes from the target
                        $target.classList.remove('animated');
                        $target.classList.remove(animationIn);

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
         * Hide an element
         * @param  {element}  $target  The target
         * @param  {bool}     silent   Suppress callbacks
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

            // Remove the active state from the trigger
            $trigger.classList.remove('is-active');

            // Set the slide status
            const slide = $trigger.dataset.togglerSlide || plugin.settings.slide;

            // Check if a slide status exists
            if (slide) {
                // Remove the animated state hook from the target
                $target.classList.remove('has-animated');

                // Add the animating state hook to the target
                $target.classList.add('is-animating');

                // Set the slide duration
                const slideDuration = $trigger.dataset.togglerSlideDuration || plugin.settings.slideDuration;

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
                    duration: slideDuration
                });
            } else {
                // Set the target animation out
                const animationOut = $trigger.dataset.togglerAnimationOut || plugin.settings.animationOut;

                // Check if the animation out is set
                if (animationOut && animationOut != 'none') {
                    // Remove the animated state hook from the target
                    $target.classList.remove('has-animated');

                    // Add the animating state hook to the target
                    $target.classList.add('is-animating');

                    // Add the animation classes to the target
                    $target.classList.add('animated');
                    $target.classList.add(animationOut);

                    // Add an animation end event listener to the target
                    $target.addEventListener('animationend', (event) => {
                        // Remove the animating state hook from the target
                        $target.classList.remove('is-animating');

                        // Remove the animation classes from the target
                        $target.classList.remove('animated');
                        $target.classList.remove(animationOut);

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
         * Call the show method silently
         * @param  {element}  $target  The target
         * @return {void}
         */
        showSilently: ($target) => {
            // Call the show method silently
            plugin.this.show($target, true);
        },

        /**
         * Call the hide method silently
         * @param  {element}  $target  The target
         * @return {void}
         */
        hideSilently: ($target) => {
            // Call the hide method silently
            plugin.this.hide($target, true);
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
