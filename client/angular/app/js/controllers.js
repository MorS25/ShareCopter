'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', ['$scope', 'LogService', 'DroneService', 'DroneImageService', 'LocalStorageService', function($scope, LogService, DroneService, DroneImageService, LocalStorageService) {
        $scope.verticalSpeed = 100;
        $scope.horizontalSpeed = 100;
        $scope.radioModel = 'stop';
        $scope.savedImage = LocalStorageService.get('image');

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
            DroneService.turnAround("left", 0.6);
        };

        $scope.rightMouseDown = function () {
            LogService.informUser("Turn right command sent");
            DroneService.turnAround("right", 0.6);
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
                LogService.informUser("Choose a magic word to make me move!");
                return;
            }
            LogService.informUser("Do movement command '"+ $scope.selectedMovement.command +"' sent");
            DroneService.doPredefinedMovement($scope.selectedMovement.command, 10000);
            $scope.selectedMovement = $scope.movements[0];
        };

        $scope.getCommands = function() {
            return LogService.getCommands();
        };

        $scope.save = function() {
            LocalStorageService.set('image', $scope.currentImageBlob);
            $scope.savedImage = $scope.currentImageBlob;
            LogService.informUser('Image saved in local storage');
        }

        $scope.clear = function() {
            LocalStorageService.clearAll();
            $scope.currentImageBlob = 'img/current-init.png';
            $scope.$apply();
            LogService.informUser('Local storage cleared');
        }

        $scope.getCurrentPNGFromDrone = function() {
            DroneImageService.getNewImage(function(data) {
                LogService.informUser("Updated image received");
                $scope.currentImageBlob = data;
                $scope.$apply();
            });
            LogService.informUser("Update image command sent");
        };

        $scope.getVideoStream = function() {
            if (typeof $scope.droneStream === 'undefined') {
                LogService.informUser("Initializing video stream");
                var options = { hostname: 'localhost', port: 3000 };
                var droneDiv = document.getElementById("droneStream");
                $scope.droneStream = new NodecopterStream(droneDiv, options);
            }

            return $scope.droneStream;
        };

        $scope.setImageAsMain = function() {
            $scope.currentImageBlob = $scope.savedImage;
        }
  }]);
