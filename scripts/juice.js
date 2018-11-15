'use strict';

/* =============================================================================================
   JUICE -> FEATURE DETECTION
   ============================================================================================= */

// Replace the no js class
document.documentElement.className = document.documentElement.className.replace('has-no-js', 'has-js');

// Check if touch is supported
if ('ontouchstart' in document.documentElement) {
    // Replace the no touch class
    document.documentElement.className = document.documentElement.className.replace('has-no-touch', 'has-touch');
}


/* =============================================================================================
   JUICE -> CLICK EVENT HELPER HANDLERS
   ============================================================================================= */

// Add a click event handler to the body
document.body.addEventListener('click', (event) => {
    // Set the element
    const element = event.target;

    // Start a switch statement for the following true values
    switch (true) {
        // Prevent default class name
        case element.classList.contains('prevent-default'):
            // Prevent the default behaviour
            event.preventDefault();
        break;

        // Stop propagation class name
        case element.classList.contains('stop-propagation'):
            // Stop propagation
            event.stopPropagation();
        break;

        // Stop immediate propagation class name
        case element.classList.contains('stop-immediate-propagation'):
            // Stop immediate propagation
            event.stopImmediatePropagation();
        break;
    }
});


/* =============================================================================================
   JUICE -> SCROLLLING
   ============================================================================================= */

// Start a timer
setTimeout(() => {
    // Check if the html tag has the smooth scroll class
    if (document.documentElement.classList.contains('has-smooth-scroll')) {
        // Check to see if a hash exists in the url
        if (location.hash) {
            // Scroll the document to the top
            window.scrollTo({
                behavior: 'auto',
                left: 0,
                top: 0
            });

            // Set the hash
            const hash = window.location.hash.split('#')[1];

            // Set the target element
            const target = document.querySelector(`#${hash}`);

            // Scroll the target element into view
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
}, 1);

// Add a click event handler to the body
document.body.addEventListener('click', (event) => {
    // Set the element
    const element = event.target;

    // Start a switch statement for the following true values
    switch (true) {
        // Default
        default:
            // Check if the element is an anchor tag
            if (element.nodeName == 'A') {
                // Check if the html tag has the smooth scroll class
                if (document.documentElement.classList.contains('has-smooth-scroll')) {
                    // Set the element href
                    const href = element.getAttribute('href');

                    // Check if the href starts with a hash and isn't an empty hash
                    if (href.startsWith('#') && href != '#') {
                        // Prevent the default behaviour
                        event.preventDefault();

                        // Set the url hash and add the click to the browser history
                        history.pushState(null, null, href);

                        // Set the target element
                        const target = document.querySelector(href);

                        // Scroll the target element into view
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            }
        break;

        // Scroll to element
        case element.classList.contains('scroll-to-element'):
            // Prevent the default behaviour
            event.preventDefault();

            // Set the target element
            const target = document.querySelector(element.dataset.scrollTarget);

            // Remove the url hash and add the click to the browser history
            history.pushState(null, null, element.dataset.scrollTarget);

            // Scroll the target element into view
            target.scrollIntoView({
                behavior: (document.documentElement.classList.contains('has-smooth-scroll')
                    ? 'smooth'
                    : 'auto'
                )
            });
        break;

        // Scroll to top
        case element.classList.contains('scroll-to-top'):
            // Prevent the default behaviour
            event.preventDefault();

            // Remove the url hash and add the click to the browser history
            history.pushState(null, null, ' ');

            // Scroll the document to the top
            window.scrollTo({
                behavior: (document.documentElement.classList.contains('has-smooth-scroll')
                    ? 'smooth'
                    : 'auto'
                ),
                left: 0,
                top: 0
            });
        break;
    }
});
