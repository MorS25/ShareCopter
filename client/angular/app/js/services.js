'use strict';

/* Services */


var appServices = angular.module('myApp.services', []);

appServices.service('LogService', [function () {

    var commandProtocol = [{
        entry : "Nothing done yet.",
        date: Date.now()
    }];

    this.informUser = function (entryText) {
        commandProtocol.splice(0,0, {entry: entryText, date: Date.now()});
        console.log(entryText);
    };

    this.getCommands = function () {
        return commandProtocol;
    };

}]);

appServices.service('DroneService', ['$http', 'LogService', function ($http, LogService) {

    var baseAddress = "http://localhost:3000/";

    this.takeOff = function () {
        $http.get(baseAddress + 'takeoff')
            .success(function () {
                LogService.informUser('Took off');
            })
            .error(function (data) {
                LogService.informUser('failed take off');
            });
    };

    this.land = function () {
        $http.get(baseAddress + 'land')
            .success(function () {
                LogService.informUser('Landed');
            })
            .error(function (data) {
                LogService.informUser('failed to  land');
            });
    };

    this.stop = function () {
        $http.get(baseAddress + 'stop')
            .success(function () {
                LogService.informUser('Stopped');
            })
            .error(function (data) {
                LogService.informUser('Failed to stop (boom)');
            });
    };

    this.up = function (speed) {
        $http.get(baseAddress + 'up/speed/' + speed)
            .success(function () {
                LogService.informUser('Gone up with ' + speed);
            })
            .error(function (data) {
                LogService.informUser('Failed to go up');
            });
    };

    this.down = function (speed) {
        $http.get(baseAddress + 'down/speed/' + speed)
            .success(function () {
                LogService.informUser('Gone down with ' + speed);
            })
            .error(function (data) {
                LogService.informUser('Failed to go down');
            });
    };

    this.left = function (speed) {
        $http.get(baseAddress + 'left/speed/' + speed)
            .success(function () {
                LogService.informUser('Gone left down with ' + speed);
            })
            .error(function (data) {
                LogService.informUser('Failed to go left');
            });
    };

    this.right = function (speed) {
        $http.get(baseAddress + 'right/speed/' + speed)
            .success(function () {
                LogService.informUser('Gone right down with ' + speed);
            })
            .error(function (data) {
                LogService.informUser('Failed to go right');
            });
    };

}]);
