'use strict';

angular.module('mean.system').config(['$meanStateProvider', '$urlRouterProvider',
function($meanStateProvider, $urlRouterProvider) {

}
]);

angular.module('mean.help').config(['$stateProvider','$meanStateProvider', '$urlRouterProvider',
  function($stateProvider,$meanStateProvider,$urlRouterProvider) {

    // states for my app
    $meanStateProvider
    .state('help example page', {
      url: '/exemple',
      templateUrl: 'help/views/index.html'
    });

  }
]);
