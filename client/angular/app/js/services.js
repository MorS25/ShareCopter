'use strict';

/* Services */

var baseAdress = "http://localhost:3000/";

var droneServices = angular.module('myApp.services', []);

droneServices.service('DroneService',  ['$http', function ($http) {
    this.takeOff = function()
    {
        $http.get(baseAdress + 'takeoff')
            .success(function(data){
                console.log('successful take off');
                return "success suisse!";
    })
            .error(function(data){
                console.log('failed take off');
                return "failed take off :(";
            });
    };
}]);
