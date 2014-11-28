'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;
var md5 = require('MD5');
var Chat = new Module('chat');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Chat.register(function(app, auth, database,http) {

  //We enable routing. By default the Package Object is passed to the routes
  Chat.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Chat.menus.add({
    title: 'chat example page',
    link: 'chat room',
    menu: 'main'
  });
  
  Chat.aggregateAsset('css', 'chat.css');
  Chat.aggregateAsset('js','logic.js');
  app.set('views', __dirname + '/server/views');
 
  var io = require('socket.io').listen(http)    ;
  var history = [];
  var users = {};
    
  var currentUser = false;
  io.sockets.on('connection',function(socket){
    console.log('Nouveau utilisateur');
    
       for (var k in  users){
           console.log('emit new user from history');
           console.log(k);
           socket.emit('newuser',users[k]);
        }
       
    socket.on('login',function(user){
        console.log('Nouvelle connexion');
        console.log(user);
        currentUser = user;
        currentUser.id = user.username;
        currentUser.avatar = 'https://gravatar.com/avatar/' + md5(currentUser.id) + '?s=50';
        users[currentUser.id] = user;
        socket.emit('logged');
        socket.emit('newuser',user);
        socket.broadcast.emit('newuser',user);
        console.log('history:');
        console.log(history);
        for (var k in  history){
            console.log('emit new mesg from history');
            console.log(k);
            socket.emit('newmsg',history[k]);
        }
    });
    socket.on('newmsg',function(msg){
        console.log('Nouveau message');
        msg.user = currentUser;
        history.push(msg);
        io.sockets.emit('newmsg',msg);
    });
    socket.on('disconnect',function(){
        if(!currentUser)return false;
        delete users[currentUser.id];
        io.sockets.emit('disuser',currentUser);
    });
 });    
//    app.use(express.static(config.root + '/client'));


  return Chat;
});
