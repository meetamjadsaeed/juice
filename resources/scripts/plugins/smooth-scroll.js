(function (root, factory) {
    // Set the plugin name
    const plugin_name = 'SmoothScroll';

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
        onLoad: true,
        onLoadSilently: true,
        history: true,
        historyBottom: '#bottom',
        historyTop: '#top',
        targetHorizontal: 'center',
        targetVertical: 'center',

        callbackDestroyBefore: () => {},
        callbackDestroyAfter: () => {},
        callbackHistoryBefore: () => {},
        callbackHistoryAfter: () => {},
        callbackInitializeBefore: () => {},
        callbackInitializeAfter: () => {},
        callbackRefreshBefore: () => {},
        callbackRefreshAfter: () => {},
        callbackScrollBefore: () => {},
        callbackScrollAfter: () => {},
        callbackScrollBottomBefore: () => {},
        callbackScrollBottomAfter: () => {},
        callbackScrollTopBefore: () => {},
        callbackScrollTopAfter: () => {}
    };

    /**
     * Constructor.
     *
     * @param  {object}   options  The plugin options.
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
     * Event handler to smooth scroll to a specific anchor on click.
     *
     * @param  {object}  event  The event object.
     * @return {void}
     */
    const clickSmoothScrollEventHandler = (event) => {
        // Set the container
        let $container;

        // Set the clicked element
        const $clicked = event.target;

        // Start a switch statement for the following true values
        switch (true) {
            // Default
            default:
                // Check if the element is an anchor tag
                if ($clicked.nodeName == 'A') {
                    // Set the element href
                    const href = $clicked.getAttribute('href');

                    // Check if the href starts with a hash and isn't an empty hash
                    if (href.startsWith('#') && href != '#') {
                        // Prevent the default behaviour
                        event.preventDefault();

                        // Set the target element and positions
                        const $target = document.querySelector(href);
                        const positions = setTargetPositions($target);

                        // Smooth scroll to the target
                        plugin.this.scroll(href, $target, positions);
                    }
                }

                // Break the switch
                break;

            // Scroll to element
            case $clicked.classList.contains('js-smooth-scroll-element'): {
                // Prevent the default behaviour
                event.preventDefault();

                // Set the hash, target element and positions
                const hash = $clicked.dataset.smoothScrollTarget;
                const $target = document.querySelector(hash);
                const positions = setTargetPositions($target);

                // Smooth scroll to the target and break the switch
                plugin.this.scroll(hash, $target, positions);
                break;
            }

            // Scroll to top
            case $clicked.classList.contains('js-smooth-scroll-top'): {
                // Prevent the default behaviour
                event.preventDefault();

                // Set the container
                $container = document.querySelector($clicked.dataset.smoothScrollContainer) || window;

                // Smooth scroll to top and break the switch
                plugin.this.scrollTop(plugin.settings.historyTop, $container);
                break;
            }

            // Scroll to bottom
            case $clicked.classList.contains('js-smooth-scroll-bottom'): {
                // Prevent the default behaviour
                event.preventDefault();

                // Set the container
                $container = document.querySelector($clicked.dataset.smoothScrollContainer) ||  window;

                // Smooth scroll to bottom and break the switch
                plugin.this.scrollBottom(plugin.settings.historyBottom, $container);
                break;
            }
        }
    };

    /**
     * Set the target horizontal and vertical positions after scroll.
     *
     * @param  {element}  $target  The target.
     * @return {object}            The positions.
     */
    const setTargetPositions = ($target) => {
        // Set the target position properties
        let target_horizontal;
        let target_vertical;

        // Check if the target exists
        if (document.body.contains($target)) {
            // Set the target horizontal and vertical scroll positions
            target_horizontal = $target.dataset.smoothScrollTargetHorizontal || plugin.settings.targetHorizontal;
            target_vertical = $target.dataset.smoothScrollTargetVertical || plugin.settings.targetVertical;
        }

        // Return the positions
        return {
            target_horizontal,
            target_vertical
        };
    };

    /**
     * Smooth scroll to an anchor on page load.
     *
     * @return {void}
     */
    const smoothScrollToAnchorOnLoad = () => {
        // Check to see if a hash exists in the url
        if (location.hash) {
            // Start a timer
            setTimeout(() => {
                // Scroll to the top
                window.scrollTo({
                    behavior: 'auto',
                    left: 0,
                    top: 0
                });

                // Set the hash, target element and positions
                const hash = window.location.hash.split('#')[1];
                const $target = document.querySelector(`#${hash}`);
                const positions = setTargetPositions($target);

                // Smooth scroll to the target
                plugin.this.scroll(`#${hash}`, $target, positions, plugin.settings.onLoadSilently);
            }, 1);
        }
    };

    /**
     * Update the browser history.
     *
     * @param  {string}  hash  The hash.
     * @return {void}
     */
    const updateBrowserHistory = (hash) => {
        // Check if the browser history should be updated
        if (plugin.settings.history) {
            // Update the browser history
            history.pushState(null, null, hash);
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
         * @param  {bool}  silent  Suppress callbacks.
         * @return {void}
         */
        destroy: (silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the destroy before callback
                plugin.settings.callbackDestroyBefore.call();
            }

            // Remove the click event handler from the body
            document.body.addEventListener('click', clickSmoothScrollEventHandler);

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

            // Check if smooth scrolling should
            if (plugin.settings.onLoad) {
                // Smooth scroll to an anchor on page load
                smoothScrollToAnchorOnLoad();
            }

            // Add a click event handler to the body
            document.body.addEventListener('click', clickSmoothScrollEventHandler);

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
         * Smooth scroll to a target.
         *
         * @param  {string}   hash       The browser history hash.
         * @param  {element}  $target    The target.
         * @param  {object}   positions  The targets horizontal and vertical positions after scroll.
         * @param  {bool}     silent     Suppress callbacks.
         * @return {void}
         */
        scroll: (hash, $target, positions = {}, silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the scroll before callback
                plugin.settings.callbackScrollBefore.call();
            }

            // Check if the element exists
            if (document.body.contains($target)) {
                // Scroll the target into view
                $target.scrollIntoView({
                    behavior: 'smooth',
                    block: positions.target_vertical,
                    inline: positions.target_horizontal
                });

                // Update the browser history
                updateBrowserHistory(hash);
            }

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the scroll after callback
                plugin.settings.callbackScrollAfter.call();
            }
        },

        /**
         * Call the scroll method silently.
         *
         * @param  {string}   hash       The browser history hash.
         * @param  {element}  $target    The target.
         * @param  {object}   positions  The targets horizontal and vertical positions after scroll.
         * @return {void}
         */
        scrollSilently: (hash, $target, positions = {}) => {
            // Call the scroll method silently
            plugin.this.scroll(hash, $target, positions, true);
        },

        /**
         * Smooth scroll the window or container to the bottom.
         *
         * @param  {string}  hash        The browser history hash.
         * @param  {mixed}   $container  The container element or window.
         * @param  {bool}    silent      Suppress callbacks.
         * @return {void}
         */
        scrollBottom: (hash, $container = window, silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the scroll bottom before callback
                plugin.settings.callbackScrollBottomBefore.call();
            }

            // Start a switch statement for the container
            switch ($container) {
                // Default
                default: {
                    // Check if the container exists
                    if (document.body.contains($container)) {
                        // Create a heights array
                        const heights = [
                            $container.offsetHeight,
                            $container.scrollHeight
                        ];

                        // Set the bottom
                        const bottom = Math.max(...heights);

                        // Scroll the container to the bottom
                        $container.scrollTo({
                            behavior: 'smooth',
                            left: 0,
                            top: `${bottom}`
                        });
                    }

                    // Break the switch
                    break;
                }

                // Window
                case window: {
                    // Create a heights array
                    const heights = [
                        document.body.offsetHeight,
                        document.body.scrollHeight,
                        document.documentElement.clientHeight,
                        document.documentElement.offsetHeight,
                        document.documentElement.scrollHeight
                    ];

                    // Set the bottom
                    const bottom = Math.max(...heights);

                    // Scroll the window to the bottom
                    window.scrollTo({
                        behavior: 'smooth',
                        left: 0,
                        top: `${bottom}`
                    });

                    // Update the browser history and break the switch
                    updateBrowserHistory(hash);
                    break;
                }
            }

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the scroll bottom after callback
                plugin.settings.callbackScrollBottomAfter.call();
            }
        },

        /**
         * Call the scroll bottom method silently.
         * @param  {string}  hash        The browser history hash.
         * @param  {mixed}   $container  The container element or window.
         * @return {void}
         */
        scrollBottomSilently: (hash, $container = window) => {
            // Call the scroll top method silently
            plugin.this.scrollBottom(hash, $container, true);
        },

        /**
         * Smooth scroll the window or container to the top.
         * @param  {string}  hash        The browser history hash.
         * @param  {mixed}   $container  The container element or window.
         * @param  {bool}    silent      Suppress callbacks.
         * @return {void}
         */
        scrollTop: (hash, $container = window, silent = false) => {
            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the scroll top before callback
                plugin.settings.callbackScrollTopBefore.call();
            }

            // Start a switch statement for the container
            switch ($container) {
                // Default
                default: {
                    // Check if the container exists
                    if (document.body.contains($container)) {
                        // Scroll the container to the top
                        $container.scrollTo({
                            behavior: 'smooth',
                            left: 0,
                            top: 0
                        });
                    }

                    // Break the switch
                    break;
                }

                // Window
                case window: {
                    // Scroll the window to the top
                    window.scrollTo({
                        behavior: 'smooth',
                        left: 0,
                        top: 0
                    });

                    // Update the browser history and break the switch
                    updateBrowserHistory(hash);
                    break;
                }
            }

            // Check if the callbacks should not be suppressed
            if (!silent) {
                // Call the scroll top after callback
                plugin.settings.callbackScrollTopAfter.call();
            }
        },

        /**
         * Call the scroll top method silently.
         * @param  {string}  hash        The browser history hash.
         * @param  {mixed}   $container  The container element or window.
         * @return {void}
         */
        scrollTopSilently: (hash, $container = window) => {
            // Call the scroll top method silently
            plugin.this.scrollTop(hash, $container, true);
        }
    };

    // Return the plugin
    return Plugin;
}));
