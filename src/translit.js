/**
 * A simple really small i18n library with a intuitive API.
 */
export default class Translit {

  /**
   * TranLit is the simpliest way I found to do I18n
   * @param {Object} Tranlation: An objet containing the tranlation, local, the current local used for tranlation
   */
  constructor({ locale, translation }) {
    this.translation = translation || {};
    this.locale = locale || 'en';
    // Registore for custom element
    if (typeof maybeObject != "undefined" && 'HTMLElement' in window) {
      HTMLElement.prototype.t = this.t.bind(this);
    }
  }

  /**
   * Dynamically change the local string
   * @param {String} lang The language string
   */
  setLocale(lang) {
    this.locale = lang;
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
   * @param {String} language The language for the translation
   */
  t(translation, data, language = false) {
    try {
      const message = translation.split('.').reduce((o, i) => o[i], this.translation[language || this.locale]);
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
