/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import {loadFonts} from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import i18n from "@/i18n/index.js";

export function registerPlugins(app) {
  loadFonts()
  app
    .use(i18n)
    .use(vuetify)
    .use(router)
    .use(pinia)
}
