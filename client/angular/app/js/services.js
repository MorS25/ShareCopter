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
        var url = 'takeoff';
        executeAction(url, 'Took off','Failed to take off');
    };

    this.land = function () {
        var url = 'land';
        executeAction(url, 'Landed','Failed to land');
    };

    this.stop = function () {
        var url = 'stop';
        executeAction(url, 'Stopped','Failed to stop (boom)');
    };

    this.turnAround = function(direction, angle) {
        var url = 'turn/direction/{0}/angle/{1}'.format(direction, angle);
        executeAction(url, 'Turned ' + direction + ' with ' + angle, 'Failed to turn '+ direction);
    };

    this.move = function(direction, speed) {
        var url = '{0}/speed/{1}';
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

        executeAction(url, 'Moved ' + direction + ' with ' + speed, 'Failed to move ' + direction);
    };

    this.doPredefinedMovement = function(command, duration) {
        var url = 'animate/{0}/duration/{1}'.format(command, duration);
        executeAction(url, 'Succeeded animation ' + command+ ' with ' + duration, 'Failed animation '+ command);
    };

    function executeAction(relativeUrl, successMessage, errorMessage) {
        var absoluteUrl = '{0}{1}'.format(baseAddress, relativeUrl);
        $http.get(absoluteUrl)
            .success(function () {
                localSuccessCallBack(successMessage);
            })
            .error(function (data) {
                localErrorCallBack(errorMessage);
            });
    }
}]);