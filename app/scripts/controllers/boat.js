'use strict';

var boatCtrl = angular.module('boatCtrl', []);

boatCtrl
    .controller('BoatListCtrl', ['$scope', '$rootScope', 'API.Boats', 
        function($scope, $rootScope, Boats) {
            $rootScope.pageActive = 'boats';
            $scope.boats = Boats.query();
            $scope.boatsView = 'allBoats';
            $scope.categories = $rootScope.categories;
            $scope.remove = function(boatId) {
                Boats.remove({id: boatId}).$promise.then(function() {
                    $scope.boats = Boats.query();
                });
            };
            $scope.isNul = function(n) {
                return n == 0;
            }
        }
    ])
    .controller('BoatResultCtrl', ['$scope', '$rootScope', 'API.Boats',
        function($scope, $rootScope, Boats) {
            $rootScope.pageActive = 'resultats';
            $scope.boats = Boats.query();
            $scope.categories = $rootScope.categories;
        }
    ])
    .controller('BoatDetailCtrl', ['$scope', '$rootScope', '$stateParams', 'API.Boats',
        function($scope, $rootScope, $stateParams, Boats) {
            $rootScope.pageActive = '';
            $scope.boat = Boats.get({id: $stateParams.id});
            $scope.record = "";
            $scope.validBoat = function() {
                Boats.valid().$promise.then(function(boat) {
                    $scope.boat = boat;
                });
            };
            $scope.payBoat = function() {
                Boats.pay().$promise.then(function(boat) {
                    $scope.boat = boat;
                });
            };
            $scope.recordBoat = function(record) {
                record = parseInt(record);
                var min = Math.floor(record / 100000);
                var sec = Math.floor((record - 100000 * min) / 1000);
                var milli = Math.floor((record - 100000 * min) - 1000 * sec);
                var recordNum = milli + 1000 * sec + 60000 * min;
                Boats.record({temps: recordNum}).$promise.then(function(boat) {
                    $scope.boat = boat;
                    $scope.record = "";
                });
            };
        }
    ])
;