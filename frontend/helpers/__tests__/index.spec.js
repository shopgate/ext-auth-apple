import { DEFAULT_BUTTON_LOCALE } from '../../constants';
import { getLocale } from '../index';

const mockAppConfig = {
  language: null,
};

jest.mock('@shopgate/pwa-common/helpers/config', () => ({
  get language() { return mockAppConfig.language; },
}));

describe('Helpers', () => {
  describe('getLocale', () => {
    beforeEach(() => {
      mockAppConfig.language = 'en-us';
    });

    it('should return the correct locale for en-us', () => {
      expect(getLocale()).toBe('en_US');
    });

    it('should return the a fallback locale for de-ch', () => {
      mockAppConfig.language = 'de-ch';
      expect(getLocale()).toBe('de_DE');
    });

    it('should return the default button locale when no locale can be determined via the supported locales', () => {
      mockAppConfig.language = 'sw-ke';
      expect(getLocale()).toBe(DEFAULT_BUTTON_LOCALE);
    });
  });
});
