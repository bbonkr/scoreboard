import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import ko from './locales/ko.json';

i18n.defaultLocale = 'en';
// i18n.locale = 'ko';
i18n.fallbacks = true;
i18n.translations = { en, ko };

const locales = RNLocalize.getLocales();

if (locales.length > 0) {
    const { languageCode } = locales[0];

    i18n.locale = languageCode;
} else {
    i18n.locale = 'en';
}

export default i18n;
