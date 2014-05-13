'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope','DroneService', function($scope, DroneService) {
        $scope.commandProtocol = [{entry : "Nothing done yet."}];
        $scope.verticalSpeed = 50;

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
  }]);
