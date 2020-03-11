const withPlugins = require("next-compose-plugins");
const withSass = require("@zeit/next-sass")
module.exports = withPlugins([
  {env: {
    URL: 'https://api.turicsaba.eu',
  }},
  {
    target: "serverless",
    distDir: ".next",
    ...withSass({async exportPathMap() {
    return {
        "/": { page: "/" },
      }
    },})
  }
]);
