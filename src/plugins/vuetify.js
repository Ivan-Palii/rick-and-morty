/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
	components: {
		...components,
		...labsComponents,
	},
	theme: {
		themes: {
			light: {
				colors: {
					primary: '#667881',
					secondary: '#93a6b1',
					background: '#d7d7d7',
					// surface: '#d7d7d7', // footer (?)
				},
			},
		},
	},
})
