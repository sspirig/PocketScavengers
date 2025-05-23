/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.0.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "87eecf4de281eb63d23398b95d11af80"
  },
  {
    "url": "map.html",
    "revision": "51e4e5bb1475d193fc34b28e93929bb6"
  },
  {
    "url": "js/main.js",
    "revision": "11590f3687a8296098e0980d744383f1"
  },
  {
    "url": "css/main.css",
    "revision": "40a40e6967633a53e5c095675109aaeb"
  },
  {
    "url": "js/class/GameSave.js",
    "revision": "51e4e5bb1475d193fc34b28e93929bb6"
  },
  {
    "url": "js/class/Item.js",
    "revision": "3b1d479abe000b3ee42b1e12ff4e6003"
  },
  {
    "url": "js/class/User.js",
    "revision": "24cd311a529af88ad5879723732d7f30"
  },
  {
    "url": "js/mainMenu.js",
    "revision": "87eecf4de281eb63d23398b95d11af80"
  },
  {
    "url": "js/uiFunctions.js",
    "revision": "11590f3687a8296098e0980d744383f1"
  },
  {
    "url": "js/userManager.js",
    "revision": "40a40e6967633a53e5c095675109aaeb"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
