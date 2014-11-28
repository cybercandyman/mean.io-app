'use strict';

angular.module('mean.help').controller('HelpController', ['$scope', 'Global', 'Help',
  function($scope, Global, Help) {
    $scope.global = Global;
    $scope.package = {
      name: 'help'
    };
  }
]);
