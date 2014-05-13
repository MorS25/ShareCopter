'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope','DroneService', function($scope, DroneService) {
        $scope.commandProtocol = [{entry : "Nothing done yet."}];
        $scope.verticalSpeed = 50;

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

        $scope.verticalChange = function(){
            if($scope.verticalSpeed > 55) {
                //up
                DroneService.up($scope.verticalSpeed / 100);
            }else if($scope.verticalSpeed < 45) {
                //down
                DroneService.down($scope.verticalSpeed / 100);
            }
            else {
                //stop
                DroneService.stop();
            }

            $scope.commandProtocol.splice(0,1, {entry: $scope.verticalSpeed / 100});
        }

        function addProtocolEntry(entryText){
            //$scope.commandProtocol.splice(0,1, {entry: entryText});
        }

        function successCallBack(data) {
            addProtocolEntry(data);
        }

        function errorCallBack(data) {
            addProtocolEntry(data);
        }
  }]);
