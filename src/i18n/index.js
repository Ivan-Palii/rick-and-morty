import en from './locales/en.json'
import uk from './locales/uk.json'

import {createI18n} from 'vue-i18n'

const i18n = createI18n({
  locale: 'uk',
  legacy: false,
  messages: {
    en,
    uk,
  }
})

export default i18n
