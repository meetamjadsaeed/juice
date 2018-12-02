'use strict';

/*  ========================================================================
    JUICE -> FEATURE DETECTION
    ========================================================================  */

// Replace the no js class
document.documentElement.className =
    document.documentElement.className.replace('has-no-js', 'has-js');

// Check if touch is supported
if ('ontouchstart' in document.documentElement) {
    // Replace the no touch class
    document.documentElement.className =
        document.documentElement.className.replace('has-no-touch', 'has-touch');
}


/*  ========================================================================
    JUICE -> CLICK EVENT HELPER HANDLERS
    ========================================================================  */

// Add a click event handler to the body
document.body.addEventListener('click', (event) => {
    // Set the clicked element
    const $element = event.target;

    // Start a switch statement for the following true values
    switch (true) {
        // Prevent default class name
        case $element.classList.contains('prevent-default'):
            // Prevent the default behaviour
            event.preventDefault();
        break;

        // Stop propagation class name
        case $element.classList.contains('stop-propagation'):
            // Stop propagation
            event.stopPropagation();
        break;

        // Stop immediate propagation class name
        case $element.classList.contains('stop-immediate-propagation'):
            // Stop immediate propagation
            event.stopImmediatePropagation();
        break;
    }
});
