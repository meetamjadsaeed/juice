'use strict';

/* =============================================================================================
   RUCKSACK -> COMPONENTS -> CARDS
   ============================================================================================= */

// Default settings
const cardDefaults = {
    'removeAnimation': 'fadeOut'
}

// Cycle through all the cards
$('.card').each((index, element) => {
    // Set the card element
    const $card = $(element);
    const $body = $('.card__body', $card);

    // Set the card attributes
    const cardAttributes = {
        'removeAnimation': $card.data('card-remove-animation')
    }

    // Set the remove animation
    const removeAnimation = (
        (typeof cardAttributes['removeAnimation'] !== typeof undefined)
        ? cardAttributes['removeAnimation']
        : cardDefaults['removeAnimation']
    );

    // Check if the card body doesn't have either the expanded or collapsed state hooks
    if (!$body.is('.is-expanded, .is-collapsed')) {
        // Add the expanded state hook class to the card body
        $body.addClass('is-expanded');
    }

    // Add a click event handler to remove a card
    $('.js-card-remove', element).on('click', () => {
        // Check if the remove animation is not set to none
        if (removeAnimation != 'none') {
            // Add the remove animation class to the card and check when the animation has ended
            $card.addClass(`animated ${removeAnimation}`).one('animationend', () => {
                // Remove the card
                $card.remove();
            });
        } else {
            // Remove the card
            $card.remove();
        }
    });

    // Add a click event handler to toggle the cards body
    $('.js-card-toggle', element).on('click', () => {
        // Toggle the expanded and collapsed state hook classes of the cards body
        $body.toggleClass('is-expanded is-collapsed');
    });
});
