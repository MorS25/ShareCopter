'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope','DroneService', function($scope, DroneService) {
        $scope.commandProtocol = [{entry : "Nothing done yet."}];

        $scope.takeOff = function(){
            addProtocolEntry("Taking off");
            DroneService.takeOff();
        };

        $scope.stop = function(){
            addProtocolEntry("Stopping");
        };

        $scope.land = function(){
            addProtocolEntry("Landing");
        };

        function addProtocolEntry(entryText){
            $scope.commandProtocol.splice(0,0, {entry: entryText});
        }
  }]);
