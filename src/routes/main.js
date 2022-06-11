const fs = require('fs');

const apiVersoin = '/apiV1';

module.exports.initRoutes = (app) => {
  /*fs.readdirSync(__dirname).forEach(f => {
    if(f !== 'main.js') {
      const filename = f.substring(0, f.indexOf('.'))
      require('./' + f).init(app, apiVersoin);
    }
  })*/

  require('./auth.route').init(app, apiVersoin);
  require('./comment.route').init(app, apiVersoin);
  require('./idea.route').init(app, apiVersoin);
  require('./ideaReactions.route').init(app, apiVersoin);
  require('./image.route').init(app, apiVersoin);
  require('./organization.route').init(app, apiVersoin);
  require('./token.route').init(app, apiVersoin);
}

