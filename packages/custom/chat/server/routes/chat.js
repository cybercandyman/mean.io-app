'use strict';



// The Package is past automatically as first parameter
module.exports = function(Chat, app, auth, database) {

  
    
  app.get('/chat/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/chat/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/chat/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

     
 
 //   .get();
    /* var index = require('../controllers/index');
  app.get('/chat/room', function(req, res, next) {           
      index.render(req, res);

  });
    */
    
      app.get('/chat/room', function(req, res, next) {
          // Preparing angular modules list with dependencies        
          // Send some basic starting info to the view
          Chat.render('room', {                      
            package: 'Chat'
          }, 
            function(err, html) {
                //Rendering a view from the Package server/views
                res.send(html);
            });

      });
};
