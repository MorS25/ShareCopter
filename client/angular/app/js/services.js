'use strict';

/* Services */

var baseAddress = "http://localhost:3000/";

var droneServices = angular.module('myApp.services', []);

droneServices.service('DroneService', ['$http', function ($http) {
    this.takeOff = function () {
        $http.get(baseAddress + 'takeoff')
            .success(function (data) {
                console.log('successful take off');
                return "success suisse!";
            })
            .error(function (data) {
                console.log('failed take off');
                return "failed take off :(";
            });
    };
}]);
