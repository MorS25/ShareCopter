'use strict';

/* Services */

var baseAddress = "http://localhost:3000/";

var droneServices = angular.module('myApp.services', []);

droneServices.service('DroneService', ['$http', function ($http) {
    this.takeOff = function (successCallBack, errorCallBack) {
        $http.get(baseAddress + 'takeoff')
            .success(function () {
                successCallBack('Took off');
            })
            .error(function (data) {
                errorCallBack('failed take off');
            });
    };

    this.stop = function (successCallBack, errorCallBack) {
        $http.get(baseAddress + 'stop')
            .success(function () {
                successCallBack('Stopped');
            })
            .error(function (data) {
                errorCallBack('Failed to stop (boom)');
            });
    };

    this.up = function (successCallBack, errorCallBack, speed) {
        $http.get(baseAddress + 'up/speed/' + speed)
            .success(function () {
                successCallBack('Got up with ' + speed);
            })
            .error(function (data) {
                errorCallBack('Failed to go up');
            });
    };

    this.down = function (successCallBack, errorCallBack, speed) {
        $http.get(baseAddress + 'down/speed/' + speed)
            .success(function () {
                successCallBack('Got down with ' + speed);
            })
            .error(function (data) {
                errorCallBack('Failed to go down');
            });
    };
}]);
