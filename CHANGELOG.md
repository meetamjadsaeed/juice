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
