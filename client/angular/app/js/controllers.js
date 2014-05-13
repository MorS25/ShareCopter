'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope','DroneService', function($scope, DroneService) {
        $scope.commandProtocol = [{entry : "Nothing done yet."}];

        $scope.takeOff = function(){
            addProtocolEntry("Take off command sent");
            DroneService.takeOff(successCallBack, errorCallBack);
        };

        $scope.stop = function(){
            addProtocolEntry("Stop command sent");
            DroneService.stop(successCallBack, errorCallBack);
        };

        $scope.up = function(speed){
            addProtocolEntry("Up command sent");
            DroneService.up(successCallBack, errorCallBack, speed);
        };

        $scope.down = function(speed){
            addProtocolEntry("Up command sent");
            DroneService.down(successCallBack, errorCallBack, speed);
        };

        function addProtocolEntry(entryText){
            $scope.commandProtocol.splice(0,0, {entry: entryText});
        }

        function successCallBack(data) {
            addProtocolEntry(data);
        }

        function errorCallBack(data) {
            addProtocolEntry(data);
        }
  }]);
