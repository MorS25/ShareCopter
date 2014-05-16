'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }])
    .directive('basicCommandsBar', function () {
        return {
            restrict:   'E',
            template:   '<div class="btn-group">' +
                        '<label class="btn btn-success" ng-model="radioModel" btn-radio="\'takeOff\'" ng-click="takeOff()" uncheckable >Take off</label>' +
                        '<label class="btn btn-danger"  ng-model="radioModel" btn-radio="\'stop\'" ng-click="stop()" uncheckable>Stop</label>' +
                        '<label class="btn btn-success" ng-model="radioModel" btn-radio="\'land\'" ng-click="land()" uncheckable>Land</label>' +
                        '</div>',
            scope: {
                        onTakeOffClick: '&',
                        onStopClick: '&',
                        onLandClick: '&'
            },
            link: function (scope, elem, attrs) {
                scope.radioModel = "stop";

                scope.takeOff = function () {
                    console.log("Received take off command in directive.");
                    scope.onTakeOffClick();
                };

                scope.stop = function () {
                    console.log("Received stop command in directive.");
                    scope.onStopClick();
                }

                scope.land = function () {
                    console.log("Received land command in directive.");
                    scope.onLandClick();
                }
            }
        }

    });
