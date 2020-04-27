# Translit
A simple really small i18n library with a intuitive API.

## Features

* Dependency free
* Really small
* Compatible with Web Components and **LitElement**



## Install

```bash
$ npm i @syu93/translit
```



## Usage

```javascript
import Translit from '@syu93/translit';

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

console.log(i18n.t('hello.world'))
// => Hello world
```



### Locales

By default **Translit** define the locale as English `en` .

You can change the locale in the constructor

```javascript
import Translit from '@syu93/translit';

const i18n = new Translit({
  translation: {
      // ...
  },
  locale: 'en'
});
```

Or you can dynamically change the locale using the `setLocale` method

```javascript
i18n.setLocale('fr');
```

You can as well load another locale with the `addLocale` method

```javascript
i18n.addLocale({
  fr: {
    hello : {
      world: 'Bonjour à tous'
    }
  }
});
```



### Simple translation

Define a JSON of translation and use the path as a Sting to access the translation

```javascript
const i18n = new Translit({
  translation: {
    en: {
      hello: {
        world: 'Hello world'
      }
    }
  } 
});

console.log(i18n.t('hello.world'))
// => Hello world
```



## Pluralisation

If you need a more complex translation, with pluralisation for example, you can simple define a method that takes a param and return a string

```javascript
const i18n = new Translit({
  translation: {
    en: {
      itemInList: (count) => `This list contains ${count} item${count > 1 ? 's' : ''}.`
    }
  } 
});

console.log(i18n.t('itemInList', 1))
// => This list contains 1 item

console.log(i18n.t('itemInList', 2))
// => This list contains 2 items
```



### LitElement

To use **Translit** inside a **LitElement**, just call the `this.t` method inside your template

```javascript
render() {
	return html`
        <section>
            <p>${this.t('text.hi')}</p>
        </section>
	`;
}
```

