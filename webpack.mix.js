const mix = require('laravel-mix');

console.log(mix);

mix.js('src/assets/js/app.js', 'public/app').sass('src/assets/scss/app.scss','public/app');