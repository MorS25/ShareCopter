'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', 'LogService', 'DroneService', function($scope, LogService, DroneService) {

        $scope.verticalSpeed = 100;
        $scope.horizontalSpeed = 100;

        $scope.takeOff = function(){
            LogService.informUser("Take off command sent");
            DroneService.takeOff();
        };

        $scope.land = function(){
            LogService.informUser("Take off command sent");
            DroneService.land();
        };

        $scope.stop = function(){
            LogService.informUser("Stop command sent");
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
        };

        $scope.getCommands = function() {
            return LogService.getCommands();
        };
  }]);