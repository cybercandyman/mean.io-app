'use strict';

angular.module('mean.help').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('test page', {
      url: '/help/example2',
      templateUrl: 'help/views/test.html'
    });
  }
]);
