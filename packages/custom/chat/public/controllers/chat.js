'use strict';


angular.module('mean.chat').controller('ChatController', ['$scope', 'Global', 'Chat', '$state',
    function($scope, Global, Chat, $state) {
        
        if(typeof($scope.myvar) == 'undefined'){
            $scope.myvar = 'my var';
            console.log('initialisation');
        }else   
            console.log($scope.myvar + ' already initialized');
        $scope.isConnected = false;
        $scope.connectedUsers = [];
        $scope.historyMessages = [];
        $scope.global = Global;
        $scope.yop = 'wazaaa    z';
        $scope.package = {
            name: 'chat'
        };
        var i = 0;       
        if (!$scope.isConnected) {            
            $state.go('root.login');
        }
        
        var socket = io.connect('http://localhost:3000');
        jQuery(document).on('submit', '#loginForm', function(event) {
            event.preventDefault();
            socket.emit('login', {
                username: jQuery('#username').val(),
                password: jQuery('#password').val()
            });
        });
        
        socket.on('logged', function() {
            //  angular.element($('#loginFormController')).scope().goToChatRoom();
            $scope.isConnected = true;
            Global.auth.isLoggedIn = true;
            console.log('Etat de isConnected 2: ' + Global.auth.isLoggedIn);
            $state.go('root.room');
        });
        
        socket.on('newuser', function(user) {
            $scope.connectedUsers.push(user);
            $scope.$apply();
        });
        
        socket.on('newmsg', function(msg) {
            $scope.historyMessages.push(msg);
            $scope.$apply();
        });
        socket.on('disuser',function(user){ console.log('deconnexion de');console.log(user); });
        
        $scope.addPost = function(){
          emitMessage( 'New message ' + (i++)  + ' ' + new Date());
        };
        
        jQuery(document).on('click', '#sendMsgButton', function() {
             emitMessage (jQuery('#messageContent').val() );
            jQuery('#messageContent').val();
        });
        var emitMessage = function(message){
                socket.emit('newmsg', {
                message: message
            });
        }
    }
]);