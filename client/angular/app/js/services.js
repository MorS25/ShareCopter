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

    this.turnAround = function(direction, speed) {
        var url = 'turn/direction/{0}/speed/{1}'.format(direction, speed);
        executeAction(url, 'Turned ' + direction + ' with speed ' + speed, 'Failed to turn '+ direction);
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
            default         : LogService.informUser("Will not move because of invalid parameter: " + direction);
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
                LogService.informUser(successMessage);
            })
            .error(function (data) {
                LogService.informUser(errorMessage);
            });
    }
}]);

appServices.service('DroneImageService', ['$http', 'LogService', function ($http, LogService) {
    //var imageBaseAddress = "http://localhost:8080/";
    var imageBaseAddress = "http://localhost:8000/app/img/test-drone.png"; //test URL

    this.getNewImage = function (controllerCallback) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onloadend = function(e) {
                if (this.status == 200) {
                    var myBlob = this.response;
                    // myBlob is now the blob that the object URL pointed to.
                    // Only process image files.
                    if (!myBlob.type.match('image.*')) {
                        LogService.informUser('ERROR: angular did not receive an image');
                        return;
                    }

                    var reader = new FileReader();
                    // Closure to capture the file information.
                    reader.onloadend = function() {
                        controllerCallback(reader.result);
                    }

                    // Read in the image file as a data URL.
                    reader.readAsDataURL(myBlob);
                } else {
                    LogService.informUser("ERROR: URL requested did not return 200");
                    return;
                }
            };
            xhr.open('GET', imageBaseAddress, true);
            xhr.send();
    }
}]);

appServices.service('LocalStorageService', ['$window', 'LogService', function ($window, LogService) {

    var storage = (typeof $window.localStorage === 'undefined') ? undefined : $window.localStorage;
    var supported = typeof storage !== 'undefined';

    this.set = function (key, value) {
        if (!supported) {
            try {
                $cookieStore.put(key, value);
                return value;
            } catch(e) {
                LogService.informUser('Local Storage not supported');
                console.log('Local Storage not supported, make sure you have angular-cookies enabled.');
            }
        }
        var saver = angular.toJson(value);
        storage.setItem(key, saver);
        return parseValue(saver);
    };

    this.get = function (key) {
        if (!supported) {
            LogService.informUser('Local Storage not supported');
            return null;
        }
        var item = storage.getItem(key);
        return parseValue(item);
    };


    this.clearAll = function () {
        storage.clear();
    };

    function parseValue(res) {
        var val;
        try {
            val = angular.fromJson(res);
            if (typeof val === 'undefined') {
                val = res;
            }
            if (val === 'true') {
                val = true;
            }
            if (val === 'false') {
                val = false;
            }
            if ($window.parseFloat(val) === val && !angular.isObject(val)) {
                val = $window.parseFloat(val);
            }
        } catch (e) {
            val = res;
        }
        return val;
    }

}]);