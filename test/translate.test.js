import { expect } from 'chai';

import Translit from '../src/index.js';

const i18n = new Translit({
  translation: {
    en: {
      hello: {
        world: 'Hello world'
      },
      itemInList: (count) => `This list contains ${count} item${count > 1 ? 's' : ''}.`
    }
  } 
});


describe('Translation', function() {
  it('should return the translated string : Hello world', function() {
    expect(i18n.t('hello.world')).to.equal('Hello world');
  });

  it('should return the translated string with pluralisation', function() {
    expect(i18n.t('itemInList', 1)).to.equal('This list contains 1 item.');
    expect(i18n.t('itemInList', 2)).to.equal('This list contains 2 items.');
  });

  it('should return the translation in a other language language', function() {
i18n.addLocale({
  fr: {
    hello : {
      world: 'Bonjour à tous'
    }
  }
});
    i18n.setLocale('fr');
    expect(i18n.t('hello.world')).to.equal('Bonjour à tous');
  });
});
