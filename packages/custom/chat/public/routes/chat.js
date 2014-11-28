'use strict';


angular.module('mean.chat').config(['$meanStateProvider', '$urlRouterProvider',
    function($meanStateProvider, $urlRouterProvider) {

        // For unmatched routes:
        $urlRouterProvider.when('','/chat');
        $urlRouterProvider.when('/','/chat');
        $urlRouterProvider.when('#!/','/chat');
            
        // states for my app
        $meanStateProvider
            .state('root', {
                abstract: true,
                template: '<div ui-view=""></div>',
                url: '/chat',
                //templateUrl: 'chat/views/index.html'
            //template: '<ui-view/>'
            });

        // states for my app
        $meanStateProvider
            .state('root.room', {
                 url: 'room',
                 controller: 'LogonCtrl',
                 templateUrl: 'chat/views/room.html'
            });

        $meanStateProvider
            .state('root.login', {
                url: 'login',
                 controller: 'LogonCtrl',
                templateUrl: 'chat/views/loginform.html'
        });




    }
]).
run(['$rootScope', '$state', 'AuthSvc', 
 function($rootScope, $state, AuthSvc) {
      
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        
    // logged out is logged out
    var doRedirectChatRoom = AuthSvc.isLoggedIn 
              && toState.name === "root.login";
    
    if (doRedirectChatRoom) {
        event.preventDefault();
        $state.go("root.room");
    }

    // logged in is logged in
    var doRedirectToLoggedIn = !AuthSvc.isLoggedIn 
              && toState.name === "root.room";
              
    if (doRedirectToLoggedIn) {
        event.preventDefault();
        $state.go("root.login");
    }
  });
}])
.factory('AuthSvc', function(Global) { return {isLoggedIn:false} ;})
.controller('LogonCtrl', function($scope, AuthSvc,Global) {  Global.auth = AuthSvc;});
