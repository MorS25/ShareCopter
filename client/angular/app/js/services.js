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
    var localSuccessCallBack = function(){};
    var localErrorCallBack = function() {};

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
                LogService.informUser('Moved ' + direction + ' with ' + speed);
            })
            .error(function (data) {
                LogService.informUser('Failed to move ' + direction);
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
