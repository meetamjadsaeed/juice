# Roadmap

### New
- Add dialog component
- Add lightbox component
- Add modal component
- Add notification component
- Add off canvas navigation component
- Add tabs component
- Add toast component

### Update
- Update form elements
    - Add custom date picker inputs
    - Add custom select
- Update table element
    - Add table--hover modifiers
    - Add tfoot styling


-----


# v0.19.2-beta

- Update package
    - Update version 0.19.1-beta to 0.19.2-beta
    - Fix package files
        - Add public directory
        - Add resources directory
        - Remove dist directory
        - Remove sass directory
        - Remove scripts directory


-----


# v0.19.1-beta

- Updated sass settings
    - Added default flag to variation_amount variable
    - Added default flag to variations map
- Updated sass framework core settings variable name
    - Updated base-selection-pseudo-elements variable name to selection-pseudo-elements


-----


# v0.19.0-beta

### New
- Added restructured file and directory names and locations
    - Updated sass
        - Added helpers directory
            - Added clearfix.scss (previously in /framework/helpers.scss)
            - Added content-spacing.scss (previously in /framework/helpers.scss)
            - Added display.scss (previously in /framework/helpers.scss)
            - Added element-spacing.scss (previously in /framework/helpers.scss)
            - Added floats.scss (previously in /framework/helpers.scss)
            - Added typography.scss (previously in /framework/helpers.scss)
            - Added visibility.scss (previously in /framework/helpers.scss)
        - Added variables directory
            - Added css directory
                - Added colors.scss (previously in /initialize/variables.scss)
                - Added defaults.scss (previously in /initialize/variables.scss)
            - Added sass directory
                - Added maps.scss (previously in /initialize/variables.scss)
                - Added settings.scss (previously in /initialize/variables.scss)
                - Added shortcodes.scss (previously in /initialize/variables.scss)
        - Updated elements directory
            - Added button directory
                - Added button.scss (previously in /elements/button.scss)
                - Added button-group.scss (previously in /elements/button.scss)
            - Added icon directory
                - Added sheild.scss (previously in /elements/shield.scss)
            - Added layout directory
                - Added box.scss (previously in /elements/box.scss)
                - Added container.scss (previously in /framework/layout/container.scss)
                - Added grid.scss (previously in /framework/layout/grid.scss)
                - Added hero.scss (previously in /elements/hero.scss)
                - Added media-object.scss (previously in /elements/media.scss)
            - Added media directory
                - Added image.scss (previously in /elements/media.scss)
            - Added navigation directory
                - Added breadcrumb.scss (previously in /elements/breadcrumb.scss)
                - Added navbar.scss (previously in /elements/navigation.scss)
                - Added pagination.scss (previously in /elements/pagination.scss)
            - Added spinner directory
                - Added core.scss (previously in /elements/spinner.scss)
                - Added dial.scss (previously in /elements/spinner.scss)
                - Added ring.scss (previously in /elements/spinner.scss)
                - Added spiral.scss (previously in /elements/spinner.scss)
                - Added swoosh.scss (previously in /elements/spinner.scss)
                - Added target.scss (previously in /elements/spinner.scss)
            - Added typography directory
                - Added abbr.scss (previously in /elements/typography.scss)
                - Added blockquote.scss (previously in /elements/typography.scss)
                - Added body.scss (previously in /elements/typography.scss)
                - Added heading.scss (previously in /elements/typography.scss)
                - Added horizontal-rule.scss (previously in /elements/typography.scss)
                - Added link.scss (previously in /elements/typography.scss)
                - Added list.scss (previously in /elements/list.scss)
                - Added mark.scss (previously in /elements/typography.scss)
                - Added paragraph.scss (previously in /elements/typography.scss)
                - Added preformated.scss (previously in /elements/typography.scss)
            - Updated form directory
                - Updated base.scss to core.scss
        - Updated framework directory
            - Added core.scss (previously /framework/foundation/base.scss)
            - Removed foundation directory
            - Removed layout directory (Refer to 'Update elements directory')
        - Updated imports
    - Updated scripts
        - Added plugins directory
            - Updated /components/password-reveal.js to /plugins/password-reveal.js
            - Updated /components/remover.js to /plugins/remover.js
            - Updated /components/smooth-scroll.js to /plugins/smooth-scroll.js
            - Updated /components/toggler.js to /plugins/toggler.js
- Added element and component settings
    - Added framework core settings
    - Added box element settings
    - Added breadcrumb element settings
    - Added button element settings
    - Added form element settings
    - Added hero element settings
    - Added list element settings
    - Added media element settings
    - Added pagination element settings
    - Added shield element settings
    - Added spinner element settings
    - Added table element settings
    - Added typography element settings
    - Added accordion component settings
    - Added card component settings
    - Added chip component settings
    - Added dropdown component settings
    - Added notice component settings
    - Added panel component settings
    - Added popover component settings
    - Added tooltip component settings
- Added sass animations
    - Added sass animations directory
        - Added attractor animations
            - Added flash animation
            - Added pulse animation
            - Added shake animation
            - Added vibrate animation
        - Added bounce entrance and exit animations
            - Added bounce in animation
            - Added bounce in down animation
            - Added bounce in left animation
            - Added bounce in right animation
            - Added bounce in up animation
            - Added bounce out animation
            - Added bounce out down animation
            - Added bounce out left animation
            - Added bounce out right animation
            - Added bounce out up animation
        - Added fade entrance and exit animations
            - Added fade in animation
            - Added fade in down animation
            - Added fade in left animation
            - Added fade in right animation
            - Added fade in up animation
            - Added fade out animation
            - Added fade out down animation
            - Added fade out left animation
            - Added fade out right animation
            - Added fade out up animation
        - Added flip entrance and exit animations
            - Added flip in down animation
            - Added flip in left animation
            - Added flip in right animation
            - Added flip in up animation
            - Added flip out down animation
            - Added flip out left animation
            - Added flip out right animation
            - Added flip out up animation
        - Added slide entrance and exit animations
            - Added slide in down animation
            - Added slide in left animation
            - Added slide in right animation
            - Added slide in up animation
            - Added slide out down animation
            - Added slide out left animation
            - Added slide out right animation
            - Added slide out up animation
        - Added zoom entrance and exit animations
            - Added zoom in animation
            - Added zoom in down animation
            - Added zoom in left animation
            - Added zoom in right animation
            - Added zoom in up animation
            - Added zoom out animation
            - Added zoom out down animation
            - Added zoom out left animation
            - Added zoom out right animation
            - Added zoom out up animation
    - Added sass easings map to /variables/sass/maps.scss
    - Added default css animation variables
    - Added animations demo page
    - Updated card component
        - Updated animation classes
    - Updated chip component
        - Updated animation classes
    - Updated dropdown component
        - Updated animation classes
    - Updated notice component
        - Updated animation classes
    - Updated panel component
        - Updated animation classes
    - Updated popover component
        - Updated animation classes
    - Updated remover component
        - Updated animation classes
    - Updated toggler component
        - Updated animation classes
    - Updated tooltip component
        - Updated animation classes
    - Removed animate.css
- Added custom form elements
    - Added custom checkbox
    - Added custom radio
    - Added custom file input
        - Updated input file type default styling

### Updated
- Updated functions
    - Updated get-stack-index if/else return markup
- Updated reset
    - Added default font weight for b and strong tags
- Updated accordion component
    - Added breakpoint based size modifiers
- Updated card component
    - Added breakpoint based size modifiers
- Updated chip component
    - Added breakpoint based size modifiers
- Updated dropdown component
    - Added breakpoint based size modifiers
- Updated notice component
    - Added breakpoint based size modifiers
- Updated panel component
    - Added breakpoint based size modifiers
- Updated popover component
    - Added breakpoint based size modifiers
- Updated tooltip component
    - Added breakpoint based size modifiers
- Updated box element
    - Added breakpoint based size modifiers
- Updated button element
    - Added font-color variables to pseudo classes
    - Added breakpoint based size modifiers
- Updated list element
    - Added breakpoint based size modifiers
- Updated form elements
    - Updated label element
        - Added font-color variable
        - Added breakpoint based size modifiers
        - Removed color style
    - Updated input element
        - Added border-color variable
        - Added breakpoint based size modifiers
        - Removed border-color style
    - Updated select element
        - Added feedback modifier border-color variable
        - Added breakpoint based size modifiers
        - Removed feedback modifier border-color style
        - Removed size modifiers multiple modifier prop declaration
    - Updated textarea element
        - Added feedback modifier border-color variable
        - Added breakpoint based size modifiers
        - Removed feedback modifier border-color style
    - Updated form control element
        - Added spotlight feedback modifier border-color variable
        - Added breakpoint based size modifiers to form control input, select, textarea and button elements
        - Removed spotlight feedback modifier border-color style
- Updated media elements
    - Added breakpoint based size modifiers to images
    - Added breakpoint based size modifiers to media objects
- Updated navigation element
    - Updated navigation name to navbar
- Updated pagination element
    - Added breakpoint based size modifiers
- Updated shield element
    - Added breakpoint based size modifiers
- Updated table element
    - Added breakpoint based size modifiers
    - Added table--stripe modifier and settings
    - Updated table background color and font color declaration location
- Updated typography
    - Added blockquote hyperlink focus pseudo class font-color variable
    - Added breakpoint based size modifiers to p, mark, code, kbd, pre, samp, var and blockquote elements
- Updated gulpfile
    - Updated variable names
- Updated build directory
- Updated comments
- Updated demo pages


-----


# v0.18.0-beta

### Updated
- Updated base variables
    - Added css custom properties to all elements and components
    - Added css custom properties based color palette generator via sass
    - Updated breakpoints
        - Updated tablet breakpoint values
        - Removed touch breakpoint
        - Removed laptop breakpoint
        - Removed ultrawide breakpoint
        - Removed until-* breakpoints
    - Removed sass variables from all elements and components
    - Removed sass based color palette generator
- Updated functions
    - Removed color based functions
    - Removed focus box shadow function (use css custom properties)
- Updated mixins
    - Updated breakpoint mixin warning message
- Updated reset
    - Removed list (ul, ol) padding
- Updated helpers
    - Added font size helper classes
    - Added p, a and h1-h6 color and feedback color helpers
    - Added has-no-last-child-element-spacing (with breakpoints)
- Updated size modifiers
    - Added foreach loop to generate size modifier classes for all elements/components
    - Removed explicit size modifier declarations for all elements/components
    - Removed element spacing variables from size modifiers
- Updated container element
    - Updated container--no-gutter to container--seamless
- Updated grid element
    - Updated grid--no-gutter to grid--seamless
    - Fixed grid-top modifier to grid--top
    - Fixed grid__item-top modifier to grid__item--top
    - Fixed grid__item-bottom modifier to grid__item--bottom
- Updated breadcrumb element
    - Removed size modifiers (use font size helpers)
- Updated button element
    - Updated button--block modifier to is-fullwidth
    - Removed input button/reset/submit from button shorthand variable (use button class)
    - Removed button mixins
    - Removed is-disabled modifier (use disabled prop)
    - Removed button--component element spacing
- Updated hero element
    - Added link variables and style properties
    - Updated is-viewport-* modifiers to hero--vh
    - Removed hero--center and hero--right modifiers (use typography helpers)
- Updated list element
    - Removed list--rtl, list--block, list--inline-block, list--stack and list--inline-stack modifiers
- Updated media elements
    - Updated image--block modifier to is-fullwidth
    - Updated image modifier margins/element spacing
    - Fixed image-left modifier to image--left
    - Fixed image-right modifier to image--right
- Updated navigation element
    - Updated breakpoint from tablet-up to desktop-up (tablet-up deprecated)
- Updated pagination element
    - Updated default flex justification from space-between to center
    - Removed pagination--center modifier
    - Removed pagination__pager and pagination__list (use li element)
    - Removed pagination__ellipsis (use span element)
    - Removed breakpoints
- Updated table element
    - Removed table--center modifier
    - Removed table--hover and table--stripe modifiers (roadmapped)
    - Removed tfoot declarations (roadmapped)
- Updated typography elements
    - Updated link element
        - Added underline text-decoration to focus pseudo element
    - Updated mark element
        - Added font size variable to mark element size modifiers
- Updated form elemnets
    - Updated label element
        - Removed is-disabled modifier (use disabled prop)
    - Updated input element
        - Removed input shorthand variable (use input element)
        - Removed input mixins
        - Removed is-disabled modifier (use disabled prop)
        - Removed browser specific pseudo elements (except for file, color and password reveals)
        - Removed input type specific styles
    - Updated select element
        - Added svg data image as background image
        - Updated multiple prop option styling
        - Removed is-disabled modifier (use disabled prop)
    - Updated textarea element
        - Added textarea--scrollbar modifier
        - Removed overflow-y styling
        - Removed textarea--no-scrollbar modifier
        - Removed is-disabled modifier (use disabled prop)
    - Updated form control element
        - Added size modifiers
        - Added feedback modifiers (applies styling to form-control__spotlight input, select and textarea elements)
        - Removed has-addons modifier (not required)
- Updated accordion component
    - Added accordion--spaced modifier (reverts to old default accordion item element spacing)
    - Updated default accordion item element spacing (now seamless)
    - Fixed missing functionality with openMultipleItems plugin option
- Updated card component
    - Added support for video and iframe media elements
    - Added card__media--iframe modifier
- Updated dropdown component
    - Updated has-dropdown--static modifier to has-dropdown--megamenu
- Updated package
    - Added CHANGELOG.md to package files
    - Added gulp notify
    - Updated dependencies
    - Removed gulp notifier
    - Removed babel loader
- Updated gulpfile
    - Added custom notifications
    - Updated tasks inline with gulp 4 syntax
    - Updated tasks with gulp series and parallel functions
    - Updated task names
        - Added watch task
        - Updated build:css task to css
        - Updated build:scripts task to scripts
        - Updated dev task to serve
    - Updated variable names
- Updated demo pages

### Release Notes
This update brings a much more customizable approach to manipulating variables
by using CSS custom properties over SASS variables.

It was also the start of reducing the minified file size without taking away
any core features or functionality, this release has cut that file size down
by almost 50% (~260kb).

When using build tools you can currently import the required elements/components
but are forced to also import all size/color modifiers. In the future, adding
more modularity to size/color modifiers and styles will be included.


-----


# v0.17.1-beta

### Updated
- Updated animate.css dependency
    - Added hardcoded animate.css import via unpkg
    - Removed animate.css dependency


-----


# v0.17.0-beta

### New
- Added custom reset.css

### Updated
- Update build directory
- Update demo pages
- Updated initialize variables file structure
- Updated package
    - Added animate.css to dependencies
    - Added velocity-animate to dependencies
    - Updated foundation animations animate.css import

### Removed
- Removed normalize.css

### Fixed
- Fixed grid bottom modifier class
    - Updated grid-bottom typo to grid--bottom


-----


# v0.16.3-beta

### Updated
- Updated sass functions
    - Added shopify and shopify_asset functions


-----


# v0.16.2-beta

### Updated
- Updated animate.css version
- Updated normalize.css version


-----


# v0.16.1-beta

### Updated
- Updated build directory
- Updated package

### Fixed
- Fixed form control element
    - Added 100% width to spotlight elements
- Fixed notice component
    - Updated notice__text element display to flex


-----


# v0.16.0-beta

### Updated
- Updated click event helper handlers
    - Added js prefix
- Updated demo pages
- Updated package

### Fixed
- Fixed input honeypot
    - Added !important flag to display (force hide)


-----


# v0.15.0-beta

### Updated
- Updated button element
    - Added component modifier
    - Added component variables
    - Removed icon variables
    - Removed box shadow none from button icons
- Updated form control element
    - Updated spotlight width to flex-basis
- Updated input element
    - Added honeypot modifier
- Updated remover component
    - Added ability to remove multiple elements from a single trigger
    - Updated data-remover-target to data-remover-targets
- Updated toggler component
    - Added ability to toggle multiple elements from a single trigger
    - Updated data-toggler-target to data-toggler-targets
- Updated build directory
- Updated demo pages


-----


# v0.14.0-beta

### Updated
- Updated form label element
    - Updated default element spacing variable values
    - Updated display from flex to block
    - Removed height variables
    - Removed line-height declarations
- Updated form input element
    - Added z-index hover stack index
- Updated media object element
    - Added seamless modifier class
    - Updated badge variable names
    - Removed media badge flex basis values
- Updated base color and feedback color modifiers
    - Fixed button anchors with is-* and has-* color modifiers bug
- Updated build directory
- Updated demo pages


-----


# v0.13.0-beta

### New
- Added remover component

### Updated
- Updated accordion component
    - Updated class naming conventions
    - Removed element spacing from action buttons
- Updated card component
    - Updated class naming conventions
    - Removed element spacing from action buttons
- Updated chip component
    - Updated class naming conventions
Updated notice component
    - Updated variable names
    - Updated class naming conventions
- Updated panel component
    - Updated class naming conventions
    - Removed element spacing from action buttons
- Updated popover component
    - Updated width variables to max width
- Updated tooltip component
    - Added max width variables
- Updated html element query selectors

### Fixed
- Fixed event listener on null errors for optional component elements


-----


# v0.12.0-beta

### New
- Added smooth scroll component

### Updated
- Updated blockquote typography element
    - Added link color variables and styling
- Updated form input element
    - Updated placeholder color variable name from 'input-font-color-placeholder' to 'input-placeholder-color'
- Updated form select element
    - Updated placeholder color variable name from 'select-font-color-placeholder' to 'select-placeholder-color'
- Updated form textarea element
    - Updated placeholder color variable name from 'select-font-color-placeholder' to 'select-placeholder-color'
- Updated box component
    - Added link color variables and styling
- Updated color palette variation type variable naming conventions
- Updated scripts
    - Updated variable naming conventions
- Updated gulpfile.js
    - Updated hostname
- Updated demo pages


### Fixed
- Fixed breadcrumb element
    - Fixed right modifier class name


-----


# v0.11.0-beta

### New
- Added requirement for Velocity.js (Release Notes)

### Updated
- Updated accordion component
    - Added the animating state hook when the accordion is animating
    - Added the animated state hook when the accordion has finished animating
    - Added initialize before and after callback options
    - Added toggle before and after callback options
    - Added refresh before and after callback options
    - Added destroy before and after callback options
    - Added toggleSilently public method
    - Added refresh public method
    - Added refreshSilently public method
    - Added destroy public method
    - Added destroySilently public method
    - Updated initialize arguments
        - Added boolean silent argument to suppress initialize callbacks
    - Updated toggle arguments
        - Added boolean silent argument to suppress toggle callbacks
    - Updated demo page
    - Removed jQuery requirement
        - Added vanilla JavaScript
        - Added requirement for Velocity.js (Release Notes)
    - Fixed is-collapsed body styling
- Updated card component
    - Added the animating state hook when the card is animating
    - Added initialize before and after callback options
    - Added remove before and after callback options
    - Added refresh before and after callback options
    - Added destroy before and after callback options
    - Added removeSilently public method
    - Added refresh public method
    - Added refreshSilently public method
    - Added destroy public method
    - Added destroySilently public method
    - Updated initialize arguments
        - Added boolean silent argument to suppress initialize callbacks
    - Updated remove arguments
        - Added boolean silent argument to suppress remove callbacks
    - Updated demo page
    - Removed jQuery requirement
        - Added vanilla JavaScript
- Updated chip component
    - Added the animating state hook when the chip is animating
    - Added initialize before and after callback options
    - Added remove before and after callback options
    - Added refresh before and after callback options
    - Added destroy before and after callback options
    - Added removeSilently public method
    - Added refresh public method
    - Added refreshSilently public method
    - Added destroy public method
    - Added destroySilently public method
    - Updated initialize arguments
        - Added boolean silent argument to suppress initialize callbacks
    - Updated remove arguments
        - Added boolean silent argument to suppress remove callbacks
    - Updated demo page
    - Removed jQuery requirement
        - Added vanilla JavaScript
- Updated dropdown component
    - Added the animating state hook when the dropdown is animating
    - Added the animated state hook when the dropdown has finished animating
    - Added active state hook to dropdown container
        - Removed active state hook from dropdown
    - Added initialize before and after callback options
    - Added show before and after callback options
    - Added hide before and after callback options
    - Added refresh before and after callback options
    - Added destroy before and after callback options
    - Added showSilently public method
    - Added hideSilently public method
    - Added refresh public methods
    - Added refreshSilently public method
    - Added destroy public methods
    - Added destroySilently public method
    - Updated initialize arguments
        - Added boolean silent argument to suppress initialize callbacks
    - Updated show arguments
        - Added boolean silent argument to show callbacks
    - Updated hide arguments
        - Added boolean silent argument to hide callbacks
    - Updated demo page
    - Removed jQuery requirement
        - Added vanilla JavaScript
- Updated notice component
    - Added the animating state hook when the notice is animating
    - Added initialize before and after callback options
    - Added remove before and after callback options
    - Added refresh before and after callback options
    - Added destroy before and after callback options
    - Added removeSilently public method
    - Added refresh public method
    - Added refreshSilently public method
    - Added destroy public method
    - Added destroySilently public method
    - Updated initialize arguments
        - Added boolean silent argument to suppress initialize callbacks
    - Updated remove arguments
        - Added boolean silent argument to suppress remove callbacks
    - Updated demo page
    - Removed jQuery requirement
        - Added vanilla JavaScript
- Updated panel component
    - Added the animating state hook when the panel is animating
    - Added initialize before and after callback options
    - Added toggle before and after callback options
    - Added remove before and after callback options
    - Added refresh before and after callback options
    - Added destroy before and after callback options
    - Added toggleSilently public method
    - Added removeSilently public method
    - Added refresh public method
    - Added refreshSilently public method
    - Added destroy public method
    - Added destroySilently public method
    - Updated initialize arguments
        - Added boolean silent argument to suppress initialize callbacks
    - Updated toggle arguments
        - Added boolean silent argument to suppress toggle callbacks
    - Updated remove arguments
        - Added boolean silent argument to suppress remove callbacks
    - Updated demo page
    - Removed jQuery requirement
        - Added vanilla JavaScript
        - Added requirement for Velocity.js (Release Notes)
    - Fixed is-collapsed body styling
- Updated password reveal component
    - Added initialize before and after callback options
    - Added show before and after callback options
    - Added hide before and after callback options
    - Added refresh before and after callback options
    - Added destroy before and after callback options
    - Added showSilently public method
    - Added hideSilently public method
    - Added refresh public method
    - Added refreshSilently public method
    - Added destroy public method
    - Added destroySilently public method
    - Updated initialize arguments
        - Added boolean silent argument to suppress initialize callbacks
    - Updated show arguments
        - Added boolean silent argument to suppress show callbacks
    - Updated hide arguments
        - Added boolean silent argument to suppress hide callbacks
    - Updated demo page
    - Removed jQuery requirement
        - Added vanilla JavaScript
- Updated popover component
    - Added outline none to popover
    - Added delayIn and delayOut options
    - Added injected focusable tabindex
    - Added ability to focus in popovers without removing popover
    - Added ability to insert html to popover
    - Added the animating state hook when the popover is animating
    - Added the animated state hook when the popover has finished animating
    - Added the active state hook when the popover is active
    - Added initialize before and after callback options
    - Added insert before and after callback options
    - Added remove before and after callback options
    - Added refresh before and after callback options
    - Added destroy before and after callback options
    - Added refresh public methods
    - Added refreshSilently public method
    - Added destroy public methods
    - Added destroySilently public method
    - Updated initialize arguments
        - Added boolean silent argument to suppress initialize callbacks
    - Updated insertPopoverEventHandler method name to togglePopoverEventHandler
    - Updated demo page
    - Removed jQuery requirement
        - Added vanilla JavaScript
- Updated toggler component
    - Added the animating state hook when the target is animating
    - Added the animated state hook when the target has finished animating
    - Added initialize before and after callback options
    - Added show before and after callback options
    - Added hide before and after callback options
    - Added refresh before and after callback options
    - Added destroy before and after callback options
    - Added showSilently public method
    - Added hideSilently public method
    - Added refresh public method
    - Added refreshSilently public method
    - Added destroy public method
    - Added destroySilently public method
    - Updated initialize arguments
        - Added boolean silent argument to suppress initialize callbacks
    - Updated show arguments
        - Added boolean silent argument to suppress show callbacks
    - Updated hide arguments
        - Added boolean silent argument to suppress hide callbacks
    - Updated demo page
    - Removed jQuery requirement
        - Added vanilla JavaScript
        - Added requirement for Velocity.js (Release Notes)
- Updated tooltip component
    - Added delayIn and delayOut options
        - Removed delay option
    - Added initialize before and after callback options
    - Added insert before and after callback options
    - Added remove before and after callback options
    - Added refresh before and after callback options
    - Added destroy before and after callback options
    - Added refresh public method
    - Added refreshSilently public method
    - Added destroy public method
    - Added destroySilently public method
    - Updated initialize arguments
        - Added boolean silent argument to suppress initialize callbacks
    - Updated demo page
    - Removed jQuery requirement
        - Added vanilla JavaScript
- Removed modal component (Release Notes)

### Release Notes
Plugins no longer require jQuery to work, however, since removing jQuery we now require
[Velocity.js](http://velocityjs.org/) for some of the plugins and their features. Previously we
used jQuery's `slideUp/Down` and `fadeIn/Out` methods, but now we use Velocitys alternatives.
Velocity has a much smaller file size and it creates smoother animations than jQuery. All
future plugins will be written in vanilla JavaScript and will use Velocity where needed.

Here is a list of the plugins that currently require Velocity:

- Accordions: Sliding/fading accordion item body
- Panels: Sliding/fading panel body
- Toggler: Sliding target elements

If you are only using the animate.css animations for Panels and Toggler, Velocity is not required.

The modal component has only temporarily been removed while it is converted to vanilla JavaScript.
If you require this component in your current project, do not update to v0.11.0-beta.


-----


# v0.10.0-beta

### New
- Added shield element
- Added chip component
- Added modal component
- Added password reveal component
- Added popover component
    - Added a popover z-index value to the stack index variable map
- Added toggler component
- Added helper classes
    - Added color modifier classes to p, a and h1-h6 elements
    - Added feedback modifier classes to p, a and h1-h6 elements
    - Removed typography color and feedback modifier classes from p, a and h1-h6 elements


### Updated
- Updated feature detection script
    - Updated 'no-js' to 'has-no-js' and 'js' to 'has-js'
    - Updated 'no-touch' to 'has-no-touch' and 'touch' to 'has-touch'
    - Updated references to all detection classes in all components
- Updated click event helper handlers
    - Updated event handlers for dynamically added components
    - Removed array based looping for attaching event handers
- Updated sass file and directory structure
- Updated mixins
    - Added disabled mixin
- Updated grid framework
    - Added grid column variable (default to 12)
    - Added grid--stretch modifier class
    - Added grid__item--stretch modifier class
    - Updated scss declaration order
- Updated breadrcrumb element
    - Updated scss declaration order
- Updated button element
    - Added white space nowrap
    - Added is static variables and modifier class
    - Added disabled styling
    - Updated scss declaration order
    - Removed line height
- Updated form elements
    - Added get-stack-index values to input, select and textarea elements
    - Added form control classes
    - Added label, inpout, select and textarea elements disabled styling
    - Added textarea no scrollbar modifier class
    - Updated textarea default scrollbar styling
    - Updated label, input, select and textarea elements scss declaration order
- Updated hero element
    - Added three quarter viewport modifier class
    - Added head, body and foot elements
    - Updated half viewport font size
    - Updated viewport modifier naming convention
    - Updated scss declaration order
- Updated list element
    - Updated scss declaration order
- Updated media element
    - Updated media image scss declaration order
    - Updated media object scss declaration order
- Updated navigation element
    - Added revealer element
    - Updated class naming conventions
    - Updated breakpoints (mobile first)
    - Removed search element
    - Updated scss declaration order
- Updated overlay element
    - Added animation duration variable and property
    - Added outline none (focus trapping for dialogs/modals etc)
- Updated pagination element
    - Added focus box shadow none to disabled elements
    - Added missing disabled modifier classes
    - Updated disabled styling
    - Updated box shadow focus to use set-focus-box-shadow()
    - Updated scss declaration order
- Updated table element
    - Updated scss declaration order
- Updated typography elements
    - Updated scss declaration order
    - Removed p, a and h1-h6 color modifiers
- Updated accordion component
    - Added link color variables
    - Added accordion__heading class for use instead of h1-h6 elements for headings
    - Updated event handlers for dynamically added components
    - Updated scss declaration order
- Updated card component
    - Added animation duration variable
    - Added link color variables
    - Added card__heading class for use instead of h1-h6 elements for headings
    - Updated event handlers for dynamically added components
    - Updated remove animation if statement
    - Updated button styling
    - Updated scss declaration order
    - Removed redundant styling
- Updated dropdown component
    - Added injected focusable tabindex
    - Added static modifier class for megamenus
    - Added animation in and animation out if statements
    - Updated position modifier class calculations
    - Updated event handlers for dynamically added components
    - Updated variable declaration order
    - Updated scss declaration order
- Updated notice component
    - Added link color variables
    - Updated event handlers for dynamically added components
    - Updated remove animation if statement
    - Updated scss declaration order
- Updated panel component
    - Added link color variables
    - Added panel__heading class for use instead of h1-h6 elements for headings
    - Updated event handlers for dynamically added components
    - Updated remove animation if statement
    - Updated scss declaration order
- Updated tooltip component
    - Added focus event handlers
    - Updated event handlers for dynamically added components
    - Updated event handlers to only work on non touch devices
    - Updated method naming convention (show -> insert)
    - Updated scss declaration order
    - Removed styling breakpoint mixin


### Removed
- Removed tag component


### Bug Fixes
- Fixed spinner element
    - Fixed target is-color modifier class border colors
- Fixed card component
    - Fixed scss variable names


-----


# v0.9.0-beta

### Updated
- Updated dropdown component
    - Added is hoverable modifier class
    - Added megamenu modifier class
    - Added container element for offsets
    - Added width values
    - Updated default animation duration
    - Updated default offset amount
    - Removed injected tabindex attribute
    - Removed min width values
- Updated navigation element
    - Removed megamenu variables and styles
    - Removed sub nav variables and styles


-----


# v0.8.0-beta

### Updated
- Updated navigation element
    - Added sub-nav dropdown
    - Added megamenu dropdown
    - Removed size modifier classes
    - Fixed logo anchor link full width bug


-----


# v0.7.0-beta

### New
- Added spinner element


-----


# v0.6.0-beta

### New
- Added breadcrumb element
- Added hero element
- Added overlay element


-----


# v0.5.3-beta

### Updated
- Updated container gutter default size


-----


# v0.5.2-beta

### Updated
- Updated navigation element
    - Added navigation link variables
    - Removed navigation__link class from nested anchor links


-----


# v0.5.1-beta

### Bug Fixes
- Fixed gulpfile dev task ending on compile error
    - Added gulp-plumber to devDependencies
    - Added gulp-notifier to devDependencies
    - Updated build:css task
        - Added gulp-plumber with gulp-notifier error handler
    - Updated build:scripts task
        - Added gulp-plumber with gulp-notifier error handler


-----


# v0.5.0-beta

### New
- Added accordion component


-----


# v0.4.1-beta

### Updated
- Updated dropdown component
    - Updated anchor dropdown items focus box shadow to set-focus-box-shadow function call
- Updated panel component
    - Updated default toggle animation from fade to slide

### Bug Fixes
- Fixed gulpfile dev task
    - Added sass and script values to watch object
    - Updated gulp watch callbacks


-----


# v0.4.0-beta

### New
- Added anchor link pseudo class variation type variables
    - Added variables to settings colors
    - Updated default variables with variation type variables
    - Updated color modifier pseudo classes
- Added get-stack-index docblock
- Added scroll to top anchor to demo pages
- Added touch detection script
    - Added no-touch class to demo pages html tag
- Added icon and button center item alignment to card and panel components


### Updated
- Updated dropdown component
    - Added tabindex attribute to the dropdown container
    - Added focus event handler to force focus from the dropdown container to the dropdown trigger
    - Added link color variables
    - Added link color modifier classes
    - Added item link background and color variables
    - Added margin 0 to dropdown divider class for use with horizontal rules
    - Updated event handler selectors
    - Updated demo page
    - Removed background pseudo color variables
- Updated pagination element
    - Updated font color variable names
- Updated default hr border color variable value
- Updated anchor focus accessibility visuals
    - Added underline text decoration to focus pseudo class
    - Removed box shadow on focus pseudo class
- Updated focus pseudo classes outline and box shadow
    - Added outline none to input, select, textarea and button elements
    - Added focus box shadow to input, select, textarea and button elements
    - Updated base focus variable names and default values
    - Updated button variable default values
    - Removed global focus pseudo class values
    - Removed button focus variables
- Updated button element
    - Added button icon variables
    - Updated button icon modifier values
- Updated default custom focus box shadow variable values
- Updated scss declaration order
- Updated terminology
    - Updated all occurrences of 'separator' to 'divider'
- Updated button element
    - Added focus outline box shadow function
    - Updated style
    - Updated default variables
    - Updated button--text modifier to button--flat
    - Updated focus box shadow to set-focus-box-shadow function calls
    - Updated demo page
- Updated input file element
    - Removed input file upload/browse border divider
- Updated tag component
    - Added feedback class modifiers
    - Updated button focus box shadow to set-focus-box-shadow function calls
- Updated notice component
    - Updated border width variables
    - Updated notice icon padding size
- Updated panel component
    - Updated border width variables
    - Updated expanded/collapsed state hook class toggling

### Removed
- Removed anchor link visited pseudo properties
    - Removed visited variable
    - Removed visited pseudo class
- Removed dropdown divider margin bottom
- Removed components button values

### Bug Fixes
- Fixed dropdown focusout bug
    - Added if statement to check if the related target element is a the has-dropdown container or a descendant of the has-dropdown container
- Fixed dropdown border radius
    - Added border radius values to dropdown item first and last child pseudo classes
- Fixed anchor link pseudo classes
    - Added active pseudo class
    - Removed duplicate hover pseudo class
- Fixed no-js class


-----


# v0.3.0-beta

### New
- Added pagination element
- Added tag component
- Added top element spacing helper classes
- Added no-offset modifier classes to grid item
- Added scroll to top click event handler
- Added color modifier classes to typography elements
- Added form pill modifier classes
- Added button and button-group pill modifier classes
- Added link visited pseudo class
- Added box-shadow variable
    - Updated box-shadow variable for card, dropdown, notice and panel components
    - Updated box-shadow variable for box and pagination elements
- Added pseudo class variation type variables
    - Added background and border pseudo class variation type variables
    - Updated element and component pseudo class variable values from hard coded values to variables
- Added missing default flags
- Added stack index declarations
    - Added stack index map variable
    - Added get stack index function
    - Updated hard coded z-index values to get-stack-index functions

### Updated
- Updated elements directory location
    - Updated elements directory from `/sass/framework` to `/sass` directory
- Updated box component file location
    - Updated box component file from `/sass/components` to `/sass/elements` directory
- Updated navigation component file location
    - Updated navigation component file from `/sass/components` to `/sass/elements` directory
- Updated form scss import file and directory structure
    - Added form base.scss file with form and fieldset values
- Updated feedback class naming conventions
    - Added `has-*` feedback classes
    - Removed `with-*` feedback classes
- Updated various modifier naming conventions
    - Updated table centered, bordered and striped modifiers to center border and stripe
    - Updated media image circle modifier to round
- Updated variable declaration location
    - Added variation type variables to settings colors
    - Added color palette difference variable to utilities color palettes
    - Removed color palette difference and variation type variables from settings variables
- Updated body horizontal overflow to hidden to prevent scrolling
- Updated dropdown component
    - Added focus and active background color variables
    - Added focus and active pseudo classes to dropdown item links
    - Added focus pseudo class to dropdown items
    - Added focusout event handler for dropdown container
    - Removed blur event handler for dropdown trigger
- Updated dropdown, notice, panel, tag and tooltip component animation duration
    - Added animation-duration variables
    - Removed hard coded animation-duration values
- Updated form elements display value
    - Updated form elements display values from block and inline-block to flex and inline-flex
- Updated media object badge size
    - Updated flex basis to flex grow shrink and basis
- Updated list style type modifier classes
    - Added armenian, circle, decimal, decimal-leading-zero, disc, georgian, lower-alpha, lower-greek, lower-latin, lower-roman, square, upper-alpha, upper-latin, upper-roman list style type modifier classes
- Updated pseudo class declaration orders
- Updated accessibility
    - Added focus variables to the foundation base
    - Added focus variables to inputs, selects and textareas
    - Updated input, select and textarea property values to new focus variables
- Updated demo pages
- Updated various default variable values

### Removed
- Removed fixed height from labels
- Removed nested element and component size mixins (See: Release Notes 1)
- Removed all link-color variables and style declarations
    - Removed all component `$link-color` variables to replace with anchor color classes
- Removed transitions
    - Removed border and box shadow transitions from input, select and textarea elements
    - Removed border transition from blockquote elements
- Removed notice icons bottom margin
- Removed panel icons margin

### Bug Fixes
- Fixed panel is-collapsed modifier class on load bug
- Fixed single button margin in card component footers
- Fixed panel accessibility markup bug
    - Added expanded and collapsed state hook classes to icon element
    - Removed expanded and collapsed state hook classes on button elements
- Fixed tooltip feedback class names
    - Updated tooltip feedback class names from with-* to has-*
- Fixed various typos and comment naming conventions


### Release Notes
1. Previously nested element sizes were adjusted using size modifiers on the parent component.
For example adding the `is-huge` size modifier to a card component would apply the `button-size--huge()` mixin to buttons.
This has been removed so that the `is-huge` modifier now needs to be applied to each individual nested element/component, in this case each button.
The reason for this is due to bloated code being applied for any nested elements/components within a parent component.
It also makes it easier for code management of each component for future updates and keeps better consistency throughout and better size control for developers.


-----


# v0.2.0-beta

### Updated
- Updated dropdown component
    - Fixed and add dropdown element z-index hierarchy
 - Updated navigation component
    - Updated flex wrap to wrap flex items
    - Updated navigation__search and navigation__links breakpoints display values
    - Updated navigation search
        - Added flex order to push navigation__search flex item to the end on touch breakpoint
        - Removed display none in mobile
    - Updated navigation demo
        - Added navigation__link class to top tier links
    - Removed flex flow column from mobile breakpoint
    - Fixed nested navigation links styling
        - Added navigation__link classes to all a tags


-----


# v0.1.1-beta

### New
- Added juice component instantiation to demo pages

### Updated
- Updated gulpfile.js browsersync hostname
- Updated index.html
    - Removed redundant testing code

### Bug Fixes
- Fixed overflow hidden bug
    - Removed overflow css property from box, card, notice and panel components
- Fixed clearfix helper class
    - Added nested after pseudo element and include clearfix mixin
    - Removed clearfix mixin from class properties
- Fixed component stopPropagation conflicts
    - Removed event.stopPropagation on dropdown and tooltip component event handlers
- Fixed demo pages
    - Updated juice script path file name on demo pages
