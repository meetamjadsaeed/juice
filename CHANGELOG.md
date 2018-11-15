# Roadmap

### New
- Add dialog component
- Add lightbox component
- Add notification component
- Add off canvas navigation component
- Add tabs component
- Add toast component

### Update
- Update form elements
    - Add custom elements
        - Add custom checkbox and radio
        - Add custom color picker
        - Add custom file
        - Add custom date picker


-----


# v0.10.0-beta

### New
- Add shield element
- Add chip component
- Add modal component
- Add password reveal component
- Add popover component
    - Add a popover z-index value to the stack index variable map
- Add toggler component
- Add helper classes
    - Add color modifier classes to p, a and h1-h6 elements
    - Add feedback modifier classes to p, a and h1-h6 elements
    - Remove typography color and feedback modifier classes from p, a and h1-h6 elements


### Updated
- Update feature detection script
    - Update 'no-js' to 'has-no-js' and 'js' to 'has-js'
    - Update 'no-touch' to 'has-no-touch' and 'touch' to 'has-touch'
    - Update references to all detection classes in all components

- Update click event helper handlers
    - Update event handlers for dynamically added components
    - Remove array based looping for attaching event handers

- Update sass file and directory structure

- Update mixins
    - Add disabled mixin

- Update grid framework
    - Add grid column variable (default to 12)
    - Add grid--stretch modifier class
    - Add grid__item--stretch modifier class
    - Update scss declaration order

- Update breadrcrumb element
    - Update scss declaration order

- Update button element
    - Add white space nowrap
    - Add is static variables and modifier class
    - Add disabled styling
    - Update scss declaration order
    - Remove line height

- Update form elements
    - Add get-stack-index values to input, select and textarea elements
    - Add form control classes
    - Add label, inpout, select and textarea elements disabled styling
    - Add textarea no scrollbar modifier class
    - Update textarea default scrollbar styling
    - Update label, input, select and textarea elements scss declaration order

- Update hero element
    - Add three quarter viewport modifier class
    - Add head, body and foot elements
    - Update half viewport font size
    - Update viewport modifier naming convention
    - Update scss declaration order

- Update list element
    - Update scss declaration order

- Update media element
    - Update media image scss declaration order
    - Update media object scss declaration order

- Update navigation element
    - Add revealer element
    - Update class naming conventions
    - Update breakpoints (mobile first)
    - Remove search element
    - Update scss declaration order

- Update overlay element
    - Add animation duration variable and property
    - Add outline none (focus trapping for dialogs/modals etc)

- Update pagination element
    - Add focus box shadow none to disabled elements
    - Add missing disabled modifier classes
    - Update disabled styling
    - Update box shadow focus to use set-focus-box-shadow()
    - Update scss declaration order

- Update table element
    - Update scss declaration order

- Update typography elements
    - Update scss declaration order
    - Remove p, a and h1-h6 color modifiers

- Update accordion component
    - Add link color variables
    - Add accordion__heading class for use instead of h1-h6 elements for headings
    - Update event handlers for dynamically added components
    - Update scss declaration order

- Update card component
    - Add animation duration variable
    - Add link color variables
    - Add card__heading class for use instead of h1-h6 elements for headings
    - Update event handlers for dynamically added components
    - Update remove animation if statement
    - Update button styling
    - Update scss declaration order
    - Remove redundant styling

- Update dropdown component
    - Add injected focusable tabindex
    - Add static modifier class for megamenus
    - Add animation in and animation out if statements
    - Update position modifier class calculations
    - Update event handlers for dynamically added components
    - Update variable declaration order
    - Update scss declaration order

- Update notice component
    - Add link color variables
    - Update event handlers for dynamically added components
    - Update remove animation if statement
    - Update scss declaration order

- Update panel component
    - Add link color variables
    - Add panel__heading class for use instead of h1-h6 elements for headings
    - Update event handlers for dynamically added components
    - Update remove animation if statement
    - Update scss declaration order

- Update tooltip component
    - Add focus event handlers
    - Update event handlers for dynamically added components
    - Update event handlers to only work on non touch devices
    - Update method naming convention (show -> insert)
    - Update scss declaration order
    - Remove styling breakpoint mixin


### Removed
- Remove tag component


### Bug Fixes
- Fix spinner element
    - Fix target is-color modifier class border colors

- Fix card component
    - Fix scss variable names


-----


# v0.9.0-beta

### Updated
- Update dropdown component
    - Add is hoverable modifier class
    - Add megamenu modifier class
    - Add container element for offsets
    - Add width values
    - Update default animation duration
    - Update default offset amount
    - Remove injected tabindex attribute
    - Remove min width values

- Update navigation element
    - Remove megamenu variables and styles
    - Remove sub nav variables and styles


-----


# v0.8.0-beta

### Updated
- Update navigation element
    - Add sub-nav dropdown
    - Add megamenu dropdown
    - Remove size modifier classes
    - Fix logo anchor link full width bug


-----


# v0.7.0-beta

### New
- Add spinner element


-----


# v0.6.0-beta

### New
- Add breadcrumb element
- Add hero element
- Add overlay element


-----


# v0.5.3-beta

### Updated
- Update container gutter default size


-----


# v0.5.2-beta

### Updated
- Update navigation element
    - Add navigation link variables
    - Remove navigation__link class from nested anchor links


-----


# v0.5.1-beta

### Bug Fixes
- Fix gulpfile dev task ending on compile error
    - Add gulp-plumber to devDependencies
    - Add gulp-notifier to devDependencies
    - Update build:css task
        - Add gulp-plumber with gulp-notifier error handler
    - Update build:scripts task
        - Add gulp-plumber with gulp-notifier error handler


-----


# v0.5.0-beta

### New
- Add accordion component


-----


# v0.4.1-beta

### Updated
- Update dropdown component
    - Update anchor dropdown items focus box shadow to set-focus-box-shadow function call
- Update panel component
    - Update default toggle animation from fade to slide

### Bug Fixes
- Fix gulpfile dev task
    - Add sass and script values to watch object
    - Update gulp watch callbacks


-----


# v0.4.0-beta

### New
- Add anchor link pseudo class variation type variables
    - Add variables to settings colors
    - Update default variables with variation type variables
    - Update color modifier pseudo classes
- Add get-stack-index docblock
- Add scroll to top anchor to demo pages
- Add touch detection script
    - Add no-touch class to demo pages html tag
- Add icon and button center item alignment to card and panel components


### Updated
- Update dropdown component
    - Add tabindex attribute to the dropdown container
    - Add focus event handler to force focus from the dropdown container to the dropdown trigger
    - Add link color variables
    - Add link color modifier classes
    - Add item link background and color variables
    - Add margin 0 to dropdown divider class for use with horizontal rules
    - Update event handler selectors
    - Update demo page
    - Remove background pseudo color variables
- Update pagination element
    - Update font color variable names
- Update default hr border color variable value
- Update anchor focus accessibility visuals
    - Add underline text decoration to focus pseudo class
    - Remove box shadow on focus pseudo class
- Update focus pseudo classes outline and box shadow
    - Add outline none to input, select, textarea and button elements
    - Add focus box shadow to input, select, textarea and button elements
    - Update base focus variable names and default values
    - Update button variable default values
    - Remove global focus pseudo class values
    - Remove button focus variables
- Update button element
    - Add button icon variables
    - Update button icon modifier values
- Update default custom focus box shadow variable values
- Update scss declaration order
- Update terminology
    - Update all occurrences of 'separator' to 'divider'
- Update button element
    - Add focus outline box shadow function
    - Update style
    - Update default variables
    - Update button--text modifier to button--flat
    - Update focus box shadow to set-focus-box-shadow function calls
    - Update demo page
- Update input file element
    - Remove input file upload/browse border divider
- Update tag component
    - Add feedback class modifiers
    - Update button focus box shadow to set-focus-box-shadow function calls
- Update notice component
    - Update border width variables
    - Update notice icon padding size
- Update panel component
    - Update border width variables
    - Update expanded/collapsed state hook class toggling

### Removed
- Remove anchor link visited pseudo properties
    - Remove visited variable
    - Remove visited pseudo class
- Remove dropdown divider margin bottom
- Remove components button values

### Bug Fixes
- Fix dropdown focusout bug
    - Add if statement to check if the related target element is a the has-dropdown container or a descendant of the has-dropdown container
- Fix dropdown border radius
    - Add border radius values to dropdown item first and last child pseudo classes
- Fix anchor link pseudo classes
    - Add active pseudo class
    - Remove duplicate hover pseudo class
- Fix no-js class


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


-----


# v0.2.0-beta

### Updated
- Update dropdown component
    - Fix and add dropdown element z-index hierarchy
 - Update navigation component
    - Update flex wrap to wrap flex items
    - Update navigation__search and navigation__links breakpoints display values
    - Update navigation search
        - Add flex order to push navigation__search flex item to the end on touch breakpoint
        - Remove display none in mobile
    - Update navigation demo
        - Add navigation__link class to top tier links
    - Remove flex flow column from mobile breakpoint
    - Fix nested navigation links styling
        - Add navigation__link classes to all a tags


-----


# v0.1.1-beta

### New
- Add juice component instantiation to demo pages

### Updated
- Update gulpfile.js browsersync hostname
- Update index.html
    - Remove redundant testing code

### Bug Fixes
- Fix overflow hidden bug
    - Remove overflow css property from box, card, notice and panel components
- Fix clearfix helper class
    - Add nested after pseudo element and include clearfix mixin
    - Remove clearfix mixin from class properties
- Fix component stopPropagation conflicts
    - Remove event.stopPropagation on dropdown and tooltip component event handlers
- Fix demo pages
    - Update juice script path file name on demo pages
