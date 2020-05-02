/**
 * A simple really small i18n library with a intuitive API.
 */
export default class Translit {

  /**
   * TransLit is the simpliest way I found to do I18n
   * @param {Object} Tranlation: An object containing the translation, local, the current local used for translations
   */
  constructor({ locale, translation }) {
    this.translation = translation || {};
    this.locale = locale || 'en';
    // Registore for custom element
    if (typeof window != "undefined" && 'HTMLElement' in window) {
      HTMLElement.prototype.t = this.t.bind(this);
    }
  }

  /**
   * Dynamically change the locale translation
   * @param {String} lang The language string
   */
  setLocale(lang) {
    this.locale = lang;
    if (this.requestUpdate) this.requestUpdate();
    if (typeof window != 'undefined' && 'CustomEvent' in window) {
      const event = new CustomEvent('translit-update-locale');
      document.dispatchEvent(event);
    }
  }

  /**
   * Dynamically add a new translation
   * @param {Oject} translation A translation object
   */
  addLocale(translation = {}) {
    this.translation = Object.assign(this.translation, translation);
  }

  /**
   * Translate a given string from the translation object
   * @param {String} translation A string representing the path for the translation
   * @param {*} data The data to be passed the translate function
   * @param {String} locale The locale of the translation (override the default locale)
   */
  t(translation, data, locale = false) {
    try {
      const message = translation.split('.').reduce((o, i) => o[i], this.translation[locale || this.locale]);
      if (!message) {
        console.warn(`[TransLit] No tranation found for ${translation}`);
        return translation;
      };
  
      if (typeof message === 'function') return message(data);
      return message;
    } catch (error) {
      console.warn(`[TransLit] No tranation found for ${translation}`);
      console.error('[Translit] ', error);
      return translation;
    }
  }
}
