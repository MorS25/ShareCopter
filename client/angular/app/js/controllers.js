'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope','DroneService', function($scope, DroneService) {
        $scope.commandProtocol = [{entry : "Nothing done yet."}];
        $scope.verticalSpeed = 100;
        $scope.horizontalSpeed = 100;


        /*DroneService.initializeCallback(
        function() {
            addProtocolEntry(data);
        },
        function() {
            addProtocolEntry(data);
        });*/


        $scope.takeOff = function(){
            addProtocolEntry("Take off command sent");
            DroneService.takeOff();
        };

        $scope.land = function(){
            addProtocolEntry("Take off command sent");
            DroneService.land();
        };

        $scope.stop = function(){
            addProtocolEntry("Stop command sent");
            DroneService.stop();
        };

        $scope.verticalChange = function(){
            if($scope.verticalSpeed > 105) {
                //up
                DroneService.up(($scope.verticalSpeed - 100) / 100);
            }else if($scope.verticalSpeed < 95) {
                //down
                DroneService.down((100 - $scope.verticalSpeed) / 100);
            }
            else {
                //stop
                DroneService.stop();
            }

           //$scope.commandProtocol.splice(0,1, {entry: $scope.verticalSpeed / 100});
        };

        $scope.horizontalChange = function(){
            if($scope.horizontalSpeed > 105) {
                //left
                DroneService.left(($scope.horizontalSpeed - 100) / 100);
            }else if($scope.horizontalSpeed < 95) {
                //right
                DroneService.right((100 - $scope.horizontalSpeed) / 100);
            }
            else {
                //stop
                DroneService.stop();
            }

           //$scope.commandProtocol.splice(0,1, {entry: $scope.verticalSpeed / 100});
        };



        function addProtocolEntry(entryText){
            $scope.commandProtocol.splice(0,1, {entry: entryText});
        }

        function successCallBack(data) {
            addProtocolEntry(data);
        }

        function errorCallBack(data) {
            addProtocolEntry(data);
        }
  }]);
