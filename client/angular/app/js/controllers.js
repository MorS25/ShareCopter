'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope','DroneService', function($scope, DroneService) {
        $scope.takeOff = function(){
            DroneService.takeOff();
        };

        $scope.stop = function(){

        };

        $scope.land = function(){

        };
  }]);
