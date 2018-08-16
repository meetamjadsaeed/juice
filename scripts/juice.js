'use strict';

/* =============================================================================================
   JUICE -> FEATURE DETECTION
   ============================================================================================= */

// Replace the no js class
document.documentElement.className = document.documentElement.className.replace('no-js', 'js');

// Check if touch is supported
if ('ontouchstart' in document.documentElement) {
    // Replace the no touch class
    document.documentElement.className = document.documentElement.className.replace('no-touch', 'touch');
}


/* =============================================================================================
   JUICE -> CLICK EVENT HELPER HANDLERS
   ============================================================================================= */

// Set prevent defeaul, immediate propagation and stop immediate propagation elements
const preventDefaultElements = document.querySelectorAll('.prevent-default');
const stopPropagationElements = document.querySelectorAll('.stop-propagation');
const stopImmediatePropagationElements = document.querySelectorAll('.stop-immediate-propagation');

// Loop through all the prevent default elements
Array.from(preventDefaultElements).forEach(element => {
    // Add a click event handler to the element
    element.addEventListener('click', (event) => {
        // Prevent default behaviour
        event.preventDefault();
    });
});

// Loop through all the stop propagation elements
Array.from(stopPropagationElements).forEach(element => {
    // Add a click event handler to the element
    element.addEventListener('click', (event) => {
        // Stop propagation
        event.stopPropagation();
    });
});

// Loop through all the stop immediate propagation elements
Array.from(stopImmediatePropagationElements).forEach(element => {
    // Add a click event handler to the element
    element.addEventListener('click', (event) => {
        // Stop immediate propagation
        event.stopImmediatePropagation();
    });
});

// Add a click event handler to scroll to top elements
$('.scroll-to-top').on('click', (event) => {
    // Prevent default behaviour
    event.preventDefault();

    // Scroll to top
    window.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: 0
    });
});
