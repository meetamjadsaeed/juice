'use strict'

/* =============================================================================================
   RUCKSACK -> FEATURE DETECTION
   ============================================================================================= */

// Javascript
document.documentElement.className.replace('no-js', 'js');


/* =============================================================================================
   RUCKSACK -> CLICK EVENT HELPER HANDLERS
   ============================================================================================= */

// Prevent default
document.querySelector(".prevent-default").addEventListener('click', (event) => {
    event.preventDefault();
});

// Stop propagation
document.querySelector('.stop-propagation').addEventListener('click', (event) => {
    event.stopPropagation();
});

// Stop immediate propagation
document.querySelector('.stop-immediate-propagation').addEventListener('click', (event) => {
    event.stopImmediatePropagation();
});
