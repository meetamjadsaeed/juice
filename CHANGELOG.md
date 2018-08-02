# v0.1.1-beta

## New
- Add juice component instantiation to demo pages

## Updated
- Update gulpfile.js browsersync hostname
- Update index.html
    - Remove redundant testing code

## Bug Fixes
- Fix overflow hidden bug
    - Remove overflow css property from box, card, notice and panel components
- Fix clearfix helper class
    - Add nested after pseudo element and include clearfix mixin
    - Remove clearfix mixin from class properties
- Fix component stopPropagation conflicts
    - Remove event.stopPropagation on dropdown and tooltip component event handlers
- Fix demo pages
    - Update juice script path file name on demo pages
