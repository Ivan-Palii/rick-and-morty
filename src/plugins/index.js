/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import pinia from '../store';
import router from '../router';
import i18n from '@/i18n/index.js';
import { VueMaskDirective } from 'v-mask';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
	beforeMount: vMaskV2.bind,
	updated: vMaskV2.componentUpdated,
	unmounted: vMaskV2.unbind
};

export function registerPlugins(app) {
	loadFonts();
	app.directive('mask', vMaskV3);
	app.component('VueDatePicker', VueDatePicker);
	app.use(i18n).use(vuetify).use(router).use(pinia);
}
