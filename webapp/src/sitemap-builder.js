
  require("@babel/register")({
    presets: ["@babel/env", "@babel/react"]
  });

  const router = require('./routes').default;
  const Sitemap = require("react-router-sitemap").default; 

  function generateSitemap() {
    return (
      new Sitemap(router)
          .build("https://safarizote.herokuapp.com/")
          .save("./public/sitemap.xml")
    );
  }
  generateSitemap();