# Steamtor

Adds trusted torrent links to your favourite gaming websites.

## Installation

### Chrome
Download `steamtor.chrome.zip` from the [latest release](https://github.com/sClarkeDev/steamtor/releases/latest), unzip it, then open `chrome://extensions`, enable **Developer mode** and click **Load unpacked** on the unzipped folder.

### Firefox
Search for "SteamTOR" in Firefox's web store or head over to this [link](https://addons.mozilla.org/en-US/firefox/addon/steamtor/)

## Usage
Simply browse your games as normal, if a download is available it will be shown to you.

## Development

Built with [WXT](https://wxt.dev). Requires Node 22+ and npm.

```sh
npm install
npm run dev               # launches Chrome with the extension and hot reload
npm run dev:firefox       # same for Firefox

npm run build             # .output/chrome-mv3
npm run build:firefox     # .output/firefox-mv3
npm run zip               # store-ready zips in .output/

npm run lint
npm run compile           # type check
```
