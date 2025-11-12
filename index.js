const i18next = require('i18next');

i18next.init({
  lng: 'en',
}, (err, t) => {
  if (err) return console.error(err);
  console.log(t('translation:SomeKey', { fallback: 'fallback:' }));
});
