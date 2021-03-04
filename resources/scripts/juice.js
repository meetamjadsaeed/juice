'use strict';

// Replace the no js class
document.documentElement.className = document.documentElement.className.replace('has-no-js', 'has-js');

// Check if touch is supported
if ('ontouchstart' in document.documentElement) {
    // Replace the no touch class
    document.documentElement.className = document.documentElement.className.replace('has-no-touch', 'has-touch');
}

// Add a click event handler to the body
document.body.addEventListener('click', (event) => {
    // Set the clicked element
    const $element = event.target;

    // Start a switch statement for the following true values
    switch (true) {
        // Prevent default class name
        case $element.classList.contains('js-prevent-default'): {
            // Prevent the default behaviour and break the switch
            event.preventDefault();
            break;
        }

        // Stop propagation class name
        case $element.classList.contains('js-stop-propagation'): {
            // Stop propagation and break the switch
            event.stopPropagation();
            break;
        }

        // Stop immediate propagation class name
        case $element.classList.contains('js-stop-immediate-propagation'): {
            // Stop immediate propagation and break the switch
            event.stopImmediatePropagation();
            break;
        }
    }
});
