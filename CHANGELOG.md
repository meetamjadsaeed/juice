# Roadmap

### New
- Add accordion component to components directory
- Add tab component to components directory


-----


# v0.3.0-beta

### New
- Add pagination element
- Add tag component
- Add top element spacing helper classes
- Add no-offset modifier classes to grid item
- Add scroll to top click event handler
- Add color modifier classes to typography elements
- Add form pill modifier classes
- Add button and button-group pill modifier classes
- Add link visited pseudo class
- Add box-shadow variable
    - Update box-shadow variable for card, dropdown, notice and panel components
    - Update box-shadow variable for box and pagination elements
- Add pseudo class variation type variables
    - Add background and border pseudo class variation type variables
    - Update element and component pseudo class variable values from hard coded values to variables
- Add missing default flags
- Add stack index declarations
    - Add stack index map variable
    - Add get stack index function
    - Update hard coded z-index values to get-stack-index functions

### Updated
- Update elements directory location
    - Update elements directory from `/sass/framework` to `/sass` directory
- Update box component file location
    - Update box component file from `/sass/components` to `/sass/elements` directory
- Update navigation component file location
    - Update navigation component file from `/sass/components` to `/sass/elements` directory
- Update form scss import file and directory structure
    - Add form base.scss file with form and fieldset values
- Update feedback class naming conventions
    - Add `has-*` feedback classes
    - Remove `with-*` feedback classes
- Update various modifier naming conventions
    - Update table centered, bordered and striped modifiers to center border and stripe
    - Update media image circle modifier to round
- Update variable declaration location
    - Add variation type variables to settings colors
    - Add color palette difference variable to utilities color palettes
    - Remove color palette difference and variation type variables from settings variables
- Update body horizontal overflow to hidden to prevent scrolling
- Update dropdown component
    - Add focus and active background color variables
    - Add focus and active pseudo classes to dropdown item links
    - Add focus pseudo class to dropdown items
    - Add focusout event handler for dropdown container
    - Remove blur event handler for dropdown trigger
- Update dropdown, notice, panel, tag and tooltip component animation duration
    - Add animation-duration variables
    - Remove hard coded animation-duration values
- Update form elements display value
    - Update form elements display values from block and inline-block to flex and inline-flex
- Update media object badge size
    - Update flex basis to flex grow shrink and basis
- Update list style type modifier classes
    - Add armenian, circle, decimal, decimal-leading-zero, disc, georgian, lower-alpha, lower-greek, lower-latin, lower-roman, square, upper-alpha, upper-latin, upper-roman list style type modifier classes
- Update pseudo class declaration orders
- Update accessibility
    - Add focus variables to the foundation base
    - Add focus variables to inputs, selects and textareas
    - Update input, select and textarea property values to new focus variables
- Update demo pages
- Update various default variable values

### Removed
- Remove fixed height from labels
- Remove nested element and component size mixins (See: Release Notes 1)
- Remove all link-color variables and style declarations
    - Remove all component `$link-color` variables to replace with anchor color classes
- Remove transitions
    - Remove border and box shadow transitions from input, select and textarea elements
    - Remove border transition from blockquote elements
- Remove notice icons bottom margin
- Remove panel icons margin

### Bug Fixes
- Fix panel is-collapsed modifier class on load bug
- Fix single button margin in card component footers
- Fix panel accessibility markup bug
    - Add expanded and collapsed state hook classes to icon element
    - Remove expanded and collapsed state hook classes on button elements
- Fix tooltip feedback class names
    - Update tooltip feedback class names from with-* to has-*
- Fix various typos and comment naming conventions


### Release Notes
1. Previously nested element sizes were adjusted using size modifiers on the parent component.
For example adding the `is-huge` size modifier to a card component would apply the `button-size--huge()` mixin to buttons.
This has been removed so that the `is-huge` modifier now needs to be applied to each individual nested element/component, in this case each button.
The reason for this is due to bloated code being applied for any nested elements/components within a parent component.
It also makes it easier for code management of each component for future updates and keeps better consistency throughout and better size control for developers.
