(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'Prompt';

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
        cancelButtonClass: 'button--flat',
        cancelButtonText: 'Cancel',
        center: null,
        color: 'primary',
        contentAnimation: true,
        contentAnimationClass: 'has-animation',
        contentAnimationIn: 'fade-in-up',
        contentAnimationOut: 'fade-out-down',
        continueButtonClass: null,
        continueButtonText: 'Continue',
        feedback: null,
        heading: '<h4>Heading</h4>',
        inputClass: null,
        inputRegexPattern: /\w/g,
        overlayAnimation: true,
        overlayAnimationClass: 'has-animation',
        overlayAnimationIn: 'fade-in',
        overlayAnimationOut: 'fade-out',
        text: 'Lorem ipsum...',

        callbackCloseBefore: () => {},
        callbackCloseAfter: () => {},
        callbackDestroyBefore: () => {},
        callbackDestroyAfter: () => {},
        callbackInitializeBefore: () => {},
        callbackInitializeAfter: () => {},
        callbackOpenBefore: () => {},
        callbackOpenAfter: () => {},
        callbackRefreshBefore: () => {},
        callbackRefreshAfter: () => {},

        callbackCancel: () => {},
        callbackContinue: () => {}
    };

    /**
     * Constructor.
     *
     * @param  {object}  options  The plugin options.
     * @return {void}
     */
    function Plugin(options) {
        // Set the plugin object
        plugin.this = this;
        plugin.name = plugin_name;
        plugin.defaults = defaults;
        plugin.options = options;
        plugin.settings = Object.assign({}, defaults, options);

        // Initialize the plugin
        plugin.this.initialize();
    }

    /**
     * Build the prompt.
     *
     * @return {void}
     */
    const buildPrompt = () => {
        // Create the prompt
        const $prompt = document.createElement('div');
        const $content = document.createElement('div');
        const $card = document.createElement('div');
        const $head = document.createElement('div');
        const $headings = document.createElement('div');
        const $body = document.createElement('div');
        const $text = document.createElement('div');
        const $field = document.createElement('div');
        const $input = document.createElement('input');
        const $foot = document.createElement('div');
        const $buttons = document.createElement('div');
        const $cancel = document.createElement('button');
        const $continue = document.createElement('button');

        // Construct the prompt
        $prompt.append($content);
        $content.append($card);

        // Construct the card
        $card.append($head);
        $card.append($body);
        $card.append($foot);

        // Construct the head
        $head.append($headings);
        $headings.insertAdjacentHTML('beforeend', plugin.settings.heading);

        // Construct the body
        $body.append($text);
        $body.append($field);
        $field.append($input);
        $text.insertAdjacentHTML('beforeend', plugin.settings.text);

        // Construct the foot
        $foot.append($buttons);
        $buttons.append($cancel);
        $buttons.append($continue);
        $cancel.append(plugin.settings.cancelButtonText);
        $continue.append(plugin.settings.continueButtonText);

        // Add the prompt classes
        $prompt.classList.add('overlay', 'prompt');
        $content.classList.add('prompt__content');
        $card.classList.add('prompt__card');
        $head.classList.add('prompt__head');
        $headings.classList.add('prompt__headings');
        $body.classList.add('prompt__body');
        $text.classList.add('prompt__text');
        $field.classList.add('prompt__field');
        $input.classList.add('prompt__input', plugin.settings.inputClass);
        $foot.classList.add('prompt__foot');
        $buttons.classList.add('prompt__buttons');
        $cancel.classList.add(plugin.settings.cancelButtonClass, 'js-prompt-cancel');
        $continue.classList.add(plugin.settings.continueButtonClass, 'js-prompt-continue');

        // Check if a center modifier exists
        if (plugin.settings.center) {
            // Add the center modifier class to the prompt
            $prompt.classList.add('prompt--center');
        }

        // Check if a color modifier exists
        if (plugin.settings.color) {
            // Add the color modifier class to the prompt
            $prompt.classList.add(`is-${plugin.settings.color}`);
            $cancel.classList.add(`is-${plugin.settings.color}`);
            $continue.classList.add(`is-${plugin.settings.color}`);
        }

        // Check if a feedback modifier exists
        if (plugin.settings.feedback) {
            // Add the feedback modifier class to the prompt
            $prompt.classList.add(`has-${plugin.settings.feedback}`);
            $cancel.classList.add(`has-${plugin.settings.feedback}`);
            $continue.classList.add(`has-${plugin.settings.feedback}`);
        }

        // Append the prompt to the document body
        document.body.insertAdjacentHTML('beforeend', $prompt.outerHTML);
    };

    /**
     * Click event handler to cancel a prompt.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickPromptCancelEventHandler = (event) => {
        // Check if the event target is the cancel or a descendant of the cancel
        if (isTargetSelector(event.target, 'class', 'js-prompt-cancel')) {
            // Prevent the default action
            event.preventDefault();

            // Call the cancel callback
            plugin.settings.callbackCancel.call();
        }
    };

    /**
     * Click event handler to continue a prompt.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickPromptContinueEventHandler = (event) => {
        // Check if the event target is the continue or a descendant of the continue
        if (isTargetSelector(event.target, 'class', 'js-prompt-continue')) {
            // Prevent the default action
            event.preventDefault();

            // Set the prompt and input
            const $prompt = plugin.this.prompt;
            const $input = $prompt.querySelector('.prompt__input');

            // Set the result
            const result = plugin.settings.inputRegexPattern.test($input.value);

            // Call the continue callback
            plugin.settings.callbackContinue.call(this, $input, result);
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
     * Trap focus to the prompt.
     * @param  {element}  $prompt  The prompt.
     * @return {void}
     */
    const trapFocus = ($prompt) => {
        // Set the focusable elements
        const $focusables = $prompt.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href]:not([disabled]), [tabindex]:not([tabindex="-1"])');
        const $focusable_first = $focusables[0];
        const $focusable_last = $focusables[$focusables.length - 1];

        // Set the keycodes
        const keycode_tab = 9;

        // Add a keydown event handler to the prompt
        $prompt.addEventListener('keydown', function(event) {
            // Start a switch event for the keycode
            switch (event.keyCode) {
                // Tab
                case keycode_tab: {
                    // Check if the shift key was pressed
                    if (event.shiftKey) {
                        // Check if the active element is the first focusable element
                        if (document.activeElement === $focusable_first) {
                            // Prevent the default action
                            event.preventDefault();

                            // Focus on the last focusable element
                            $focusable_last.focus();
                        }
                    } else {
                        if (document.activeElement === $focusable_last) {
                            // Prevent the default action
                            event.preventDefault();

                            // Focus on the first focusable element
                            $focusable_first.focus();
                        }
                    }

                    // Break the switch
                    break;
                }
            }
        });
    };

    /**
     * Public variables and methods.
     *
     * @type {object}
     */
    Plugin.prototype = {
        /**
         * Close a prompt.
         *
         * @param  {bool}  silent   Suppress callbacks.
         * @return {void}
         */
        close: (silent = false) => {
            // Set the prompt
            const $prompt = plugin.this.prompt;

            // Check if the prompt exists and an overlay prompt is open
            if ($prompt && (document.body.classList.contains('has-overlay') || document.querySelector('.overlay.prompt'))) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the close before callback
                    plugin.settings.callbackCloseBefore.call();
                }

                // Set the content
                const $content = $prompt.querySelector('.prompt__content');

                // Check if the overlay is animated
                if (plugin.settings.overlayAnimation) {
                    // Set the prompt animation classes
                    $prompt.classList.add('is-animating-out', plugin.settings.overlayAnimationClass, plugin.settings.overlayAnimationOut);

                    // Add an animation end event handler to the prompt
                    $prompt.addEventListener('animationend', () => {
                        // Remove the prompt
                        $prompt.remove();

                        // Remove the overlay state hook from the document body
                        document.body.classList.remove('has-overlay');

                        // Check if the callbacks should not be suppressed
                        if (!silent) {
                            // Call the close after callback
                            plugin.settings.callbackCloseAfter.call();
                        }
                    }, {
                        once: true
                    });
                } else {
                    // Remove the prompt
                    $prompt.remove();

                    // Remove the overlay state hook from the document body
                    document.body.classList.remove('has-overlay');

                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the close after callback
                        plugin.settings.callbackCloseAfter.call();
                    }
                }

                // Check if the content is animated
                if (plugin.settings.contentAnimation) {
                    // Set the content animation classes
                    $content.classList.add('is-animating', plugin.settings.contentAnimationClass, plugin.settings.contentAnimationOut);

                    // Add an animation end event handler to the content
                    $content.addEventListener('animationend', () => {
                        // Set the the content animation classes
                        $content.classList.remove('is-animating', plugin.settings.contentAnimationClass, plugin.settings.contentAnimationOut);
                        $content.classList.add('has-animated');
                    }, {
                        once: true
                    });
                }
            }
        },

        /**
         * Call the close method silently.
         *
         * @return {void}
         */
        closeSilently: () => {
            // Call the close method silently
            plugin.this.close(true);
        },

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

            // Remove the click event handlers from the prompt
            document.removeEventListener('click', clickPromptCancelEventHandler);
            document.removeEventListener('click', clickPromptContinueEventHandler);

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

            // Add the click event handlers to the prompt
            document.addEventListener('click', clickPromptCancelEventHandler);
            document.addEventListener('click', clickPromptContinueEventHandler);

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the initialize after callback
                plugin.settings.callbackInitializeAfter.call();
            }

            // Open the prompt and break the switch
            plugin.this.open();
        },

        /**
         * Open the prompt.
         *
         * @param  {bool}  silent   Suppress callbacks.
         * @return {void}
         */
        open: (silent = false) => {
            // Check if an overlay isn't already open
            if (!document.body.classList.contains('has-overlay') || !document.querySelector('.overlay')) {
                // Check if the callbacks should not be suppressed
                if (!silent) {
                    // Call the open before callback
                    plugin.settings.callbackOpenBefore.call();
                }

                // Add the overlay state hook to the document body
                document.body.classList.add('has-overlay');

                // Build the prompt
                buildPrompt();

                // Set the prompt elements
                const $prompt = document.querySelector('.prompt');
                const $content = $prompt.querySelector('.prompt__content');

                // Set the plugin prompt
                plugin.this.prompt = $prompt;

                // Set the prompt tabindex and focus on the prompt
                $prompt.setAttribute('tabindex', -1);
                $prompt.focus();

                // Trap focus inside the prompt
                trapFocus($prompt);

                // Check if the overlay is animated
                if (plugin.settings.overlayAnimation) {
                    // Set the prompt animation classes
                    $prompt.classList.add('is-animating-in', plugin.settings.overlayAnimationClass, plugin.settings.overlayAnimationIn);

                    // Add an animation end event handler to the prompt
                    $prompt.addEventListener('animationend', () => {
                        // Set the the prompt animation classes
                        $prompt.classList.remove('is-animating-in', plugin.settings.overlayAnimationClass, plugin.settings.overlayAnimationIn);
                        $prompt.classList.add('has-animated');

                        // Check if the callbacks should not be suppressed
                        if (!silent) {
                            // Call the open after callback
                            plugin.settings.callbackOpenAfter.call();
                        }
                    }, {
                        once: true
                    });
                } else {
                    // Check if the callbacks should not be suppressed
                    if (!silent) {
                        // Call the open after callback
                        plugin.settings.callbackOpenAfter.call();
                    }
                }

                // Check if the content is animated
                if (plugin.settings.contentAnimation) {
                    // Set the content animation classes
                    $content.classList.add('is-animating-in', plugin.settings.contentAnimationClass, plugin.settings.contentAnimationIn);

                    // Add an animation end event handler to the content
                    $content.addEventListener('animationend', () => {
                        // Set the the content animation classes
                        $content.classList.remove('is-animating-in', plugin.settings.contentAnimationClass, plugin.settings.contentAnimationIn);
                        $content.classList.add('has-animated');
                    }, {
                        once: true
                    });
                }
            }
        },

        /**
         * Call the open method silently.
         *
         * @return {void}
         */
        openSilently: () => {
            // Call the open method silently
            plugin.this.open(true);
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
    };

    // Return the plugin
    return Plugin;
}));
