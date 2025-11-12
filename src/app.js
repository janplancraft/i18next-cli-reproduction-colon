const i18next = require('i18next');

i18next.init({
  lng: 'en'
}, (err, t) => {
  if (err) return console.error(err);
  // Fallback string should be extracted (second parameter as string)
  console.log(t('translation:SomeKey', 'fallback:'));
  
  // Or using defaultValue in options object
  console.log(t('translation:AnotherKey','default fallback'));
});

