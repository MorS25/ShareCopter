'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope','DroneService', function($scope, DroneService) {
        $scope.commandProtocol = [{entry : "Nothing done yet."}];
        $scope.verticalSpeed = 100;
        $scope.horizontalSpeed = 100;

        $scope.selectedMovement = {};
        $scope.movements = [
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
            {name: 'Flip Right',                command: 'flipRight'},
        ];

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
            addProtocolEntry("Turn left command sent");
            DroneService.turnAround("left", 0.5);
        };

        $scope.rightMouseDown = function () {
            addProtocolEntry("Turn right command sent");
            DroneService.turnAround("right", 0.5);
        };

        $scope.forwardMouseDown = function () {
            addProtocolEntry("Move forward command sent");
            DroneService.move("forward", 0.5);
        };

        $scope.backwardMouseDown = function () {
            addProtocolEntry("Move backward command sent");
            DroneService.move("backward", 0.5);
        };

        $scope.doMovement = function () {
            addProtocolEntry("Do movement command '"+ $scope.selectedMovement.command +"' sent");
            DroneService.doMovement($scope.selectedMovement.command, 5);
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
