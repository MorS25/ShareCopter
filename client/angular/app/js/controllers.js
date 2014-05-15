'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope','LogService', 'DroneService', function($scope, LogService, DroneService) {
        $scope.verticalSpeed = 100;
        $scope.horizontalSpeed = 100;
        $scope.radioModel = 'stop';

        $scope.movements = [
            {name: '--> Select movement <--',   command: ''},
            {name: 'Wave',                      command: 'wave'},
            {name: 'PhiM 30 Deg',               command: 'phiM30Deg'},
            {name: 'Phi 30 Deg',                command: 'phi30Deg'},
            {name: 'Theta M 30 Deg',            command: 'thetaM30Deg'},
            {name: 'Theta 30 Deg',              command: 'theta30Deg'},
            {name: 'Theta 20 Deg Yaw 200 Deg',  command: 'theta20degYaw200deg'},
            {name: 'Turnaround',                command: 'turnaround'},
            {name: 'Turnaround Go Down',        command: 'turnaroundGodown'},
            {name: 'Yaw Shake',                 command: 'yawShake'},
            {name: 'Yaw Dance',                 command: 'yawDance'},
            {name: 'Phi Dance',                 command: 'phiDance'},
            {name: 'Theta Dance',               command: 'thetaDance'},
            {name: 'VZ Dance',                  command: 'vzDance'},
            {name: 'Phi Theta Mixed',           command: 'phiThetaMixed'},
            {name: 'Double Phi Theta Mixed',    command: 'doublePhiThetaMixed'},
            {name: 'Flip Ahead',                command: 'flipAhead'},
            {name: 'Flip Behind',               command: 'flipBehind'},
            {name: 'Flip Right',                command: 'flipRight'}
        ];
        $scope.selectedMovement = $scope.movements[0];

        $scope.takeOff = function(){
            LogService.informUser("Take off command sent");
            DroneService.takeOff();
        };

        $scope.land = function(){
            LogService.informUser("Land command sent");
            DroneService.land();
        };

        $scope.stop = function(){
            LogService.informUser("Stop command sent");
            DroneService.stop();
        };

        $scope.verticalChange = function(){
            if($scope.verticalSpeed > 105) {
                //up
                DroneService.move('up', ($scope.verticalSpeed - 100) / 100);
            }else if($scope.verticalSpeed < 95) {
                //down
                DroneService.move('down', (100 - $scope.verticalSpeed) / 100);
            }
            else {
                //stop
                DroneService.stop();
            }
        };

        $scope.horizontalChange = function(){
            if($scope.horizontalSpeed > 105) {
                DroneService.move('right', ($scope.horizontalSpeed - 100) / 100);
            }else if($scope.horizontalSpeed < 95) {
                DroneService.move('left', (100 - $scope.horizontalSpeed) / 100);
            }
            else {
                DroneService.stop();
            }
        };

        $scope.leftMouseDown = function () {
            LogService.informUser("Turn left command sent");
            DroneService.turnAround("left", 90);
        };

        $scope.rightMouseDown = function () {
            LogService.informUser("Turn right command sent");
            DroneService.turnAround("right", 90);
        };

        $scope.forwardMouseDown = function () {
            LogService.informUser("Move forward command sent");
            DroneService.move("forward", 0.5);
        };

        $scope.backwardMouseDown = function () {
            LogService.informUser("Move backward command sent");
            DroneService.move("backward", 0.5);
        };

        $scope.doMovement = function () {
            if($scope.selectedMovement.command === '') {
                return;
            }
            LogService.informUser("Do movement command '"+ $scope.selectedMovement.command +"' sent");
            DroneService.doPredefinedMovement($scope.selectedMovement.command, 10000);
            $scope.selectedMovement = $scope.movements[0];
        };

        $scope.getCommands = function() {
            return LogService.getCommands();
        };

        $scope.getLastPNG = function() {
            //simulate a new URL to avoid browser cache
            $scope.currentImageURL = "http://localhost:8080/" + "?rdm=" + Date.now();
            LogService.informUser("Update image command sent");
        };

        $scope.getCurrentImageURL = function() {
            return $scope.currentImageURL;
        }

  }]);
