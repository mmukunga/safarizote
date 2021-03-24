require("babel-register")({
  babelrc: false,  
  presets: ['env', 'react']
});

const router = require('./App').default;
const Sitemap = require('react-router-sitemap').default;

(
    new Sitemap(router)
        .build('https://safarizote.herokuapp.com')
        .save('./public/sitemap.xml')
);