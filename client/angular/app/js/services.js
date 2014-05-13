'use strict';

/* Services */

var droneServices = angular.module('myApp.services', []);

droneServices.service('DroneService', ['$http', function ($http) {
    var baseAddress = "http://localhost:3000/";
    var localSuccessCallBack = function(){};
    var localErrorCallBack = function() {};

    this.takeOff = function () {
        $http.get(baseAddress + 'takeoff')
            .success(function () {
                localSuccessCallBack('Took off');
            })
            .error(function (data) {
                localErrorCallBack('failed take off');
            });
    };

    this.land = function () {
        $http.get(baseAddress + 'land')
            .success(function () {
                localSuccessCallBack('Landed');
            })
            .error(function (data) {
                localErrorCallBack('failed to  land');
            });
    };

    this.stop = function () {
        $http.get(baseAddress + 'stop')
            .success(function () {
                localSuccessCallBack('Stopped');
            })
            .error(function (data) {
                localErrorCallBack('Failed to stop (boom)');
            });
    };

    this.up = function (speed) {
        $http.get(baseAddress + 'up/speed/' + speed)
            .success(function () {
                this.localSuccessCallBack('Gone up with ' + speed);
            })
            .error(function (data) {
                this.localErrorCallBack('Failed to go up');
            });
    };

    this.down = function (speed) {
        $http.get(baseAddress + 'down/speed/' + speed)
            .success(function () {
                localSuccessCallBack('Gone down with ' + speed);
            })
            .error(function (data) {
                localErrorCallBack('Failed to go down');
            });
    };

    this.left = function (speed) {
        $http.get(baseAddress + 'left/speed/' + speed)
            .success(function () {
                localSuccessCallBack('Gone left down with ' + speed);
            })
            .error(function (data) {
                localErrorCallBack('Failed to go left');
            });
    };

    this.right = function (speed) {
        $http.get(baseAddress + 'right/speed/' + speed)
            .success(function () {
                localSuccessCallBack('Gone right down with ' + speed);
            })
            .error(function (data) {
                localErrorCallBack('Failed to go right');
            });
    };

    /*this.initializeCallbacks = function (successCallBack, errorCallBack) {
        localSuccessCallBack = successCallBack;
        localErrorCallBack = errorCallBack;
    };*/

}]);
