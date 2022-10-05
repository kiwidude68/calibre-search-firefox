# Calibre Search FireFox
[![History][changelog-image]][changelog-url] 
[![License][license-image]][license-url]

## Introduction

This web extension allows you to perform a search against your local [calibre][calibre-url] library for the selected text or links on a web page. 

The search option is available via:
- a right-click context menu for your selected text or a hyperlink
- a toolbar button in the address bar area of your browser
- a keyboard shortcut `Ctrl + Q`

For more information, please refer to the [FAQ][wiki-url]

## web-ext command lines

Noting here for my development process:

https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/
```
web-ext lint

web-ext build --overwrite-dest

web-ext sign --channel=listed --api-key="%CALIBRE_SEARCH_FIREFOX_API_ISSUER%" --api-secret="%CALIBRE_SEARCH_FIREFOX_API_SECRET%"
```

## Donations

If you enjoy my calibre plugins or extensions, please feel free to show your appreciation!

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)][donate-url]

[paypal.me/kiwicalibre][donate-url]

[donate-url]: https://www.paypalme/kiwicalibre
[wiki-url]: https://github.com/kiwidude68/calibre-search-app/wiki/Calibre-Search-FAQ

[calibre-url]: https://calibre-ebook.com/
[calibre-search-chrome-url]: https://github.com/kiwidude68/calibre-search-chrome
[calibre-search-firefox-url]: https://github.com/kiwidude68/calibre-search-firefox

[changelog-image]: https://img.shields.io/badge/History-CHANGELOG-blue.svg
[changelog-url]: CHANGELOG.md

[license-image]: https://img.shields.io/badge/License-GPL-yellow.svg
[license-url]: ../LICENSE.md
