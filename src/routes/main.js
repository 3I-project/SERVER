const fs = require('fs');

const apiVersoin = '/apiV1';

module.exports.initRoutes = (app) => {
  fs.readdirSync(__dirname).forEach(f => {
    if(f !== 'main.js') {
      const filename = f.substring(0, f.indexOf('.'))
      require('./' + f).init(app, apiVersoin);
    }
  })
}
