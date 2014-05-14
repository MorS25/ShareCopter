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

    this.turnAround = function(direction, speed) {
        $http.get(baseAddress + 'turnaround/direction/' + direction + '/speed/' + speed)
            .success(function () {
                localSuccessCallBack('Turned ' + direction + ' with ' + speed);
            })
            .error(function (data) {
                localErrorCallBack('Failed to turn '+ direction);
            });
    };

    this.move = function(direction, speed) {
        var url = baseAddress + '{0}/speed/{1}';
        switch(direction) {
            case "up"       : url = url.format("up", speed);
                              break;
            case "down"     : url = url.format("down", speed);
                              break;
            case "forward"  : url = url.format("front", speed);
                              break;
            case "backward" : url = url.format("back", speed);
                              break;
            case "left"     : url = url.format("left", speed);
                              break;
            case "right"    : url = url.format("right", speed);
                              break;
            default         : localErrorCallBack("Will not move because of invalid parameter: " + direction)
                              return;
        };

        $http.get(url)
            .success(function () {
                localSuccessCallBack('Moved ' + direction + ' with ' + speed);
            })
            .error(function (data) {
                localErrorCallBack('Failed to move ' + direction);
            });
    };

    this.doMovement = function(command, speed) {
        var url = baseAddress + 'animate/{0}/speed/{1}';
        url = url.format(command, speed);

        $http.get();
            console.log("URL: " )
            .success(function () {
                localSuccessCallBack('Succeeded animation ' + command+ ' with ' + speed);
            })
            .error(function (data) {
                localErrorCallBack('Failed animation '+ command);
            });
    }
}]);
