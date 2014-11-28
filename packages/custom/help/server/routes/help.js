'use strict';

// The Package is past automatically as first parameter
module.exports = function(Help, app, auth, database) {

  app.get('/help/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/help/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/help/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/help/example/render', function(req, res, next) {
    Help.render('index', {
      package: 'help'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
