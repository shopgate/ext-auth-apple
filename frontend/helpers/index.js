import appConfig from '@shopgate/pwa-common/helpers/config';
import { SUPPORTED_BUTTON_LOCALES, DEFAULT_BUTTON_LOCALE } from '../constants';

/**
 * Transforms the app config language to ISO format.
 * @returns {string}
 */
export function getLocale() {
  const [language, region] = appConfig.language.split('-');
  const locale = `${language}_${region.toUpperCase()}`;

  if (!SUPPORTED_BUTTON_LOCALES.includes(locale)) {
    return (
      SUPPORTED_BUTTON_LOCALES.find(entry => entry.startsWith(language)) ||
      DEFAULT_BUTTON_LOCALE
    );
  }

  return locale;
}
