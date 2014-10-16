'use strict';

var boatCtrl = angular.module('boatCtrl', []);

boatCtrl
    .controller('BoatListCtrl', ['$scope', '$rootScope', 'API.Boats', 
        function($scope, $rootScope, Boats) {
            $rootScope.pageActive = 'boats';
            $scope.boats = Boats.query();
            $scope.deletedBoats = Boats.deletedquery();
            $scope.boatsView = 'allBoats';
            $scope.categories = $rootScope.categories;
            $scope.remove = function(boatId) {
                Boats.remove({id: boatId}).$promise.then(function() {
                    $scope.boats = Boats.query();
                });
            };
        }
    ])
    .controller('BoatResultCtrl', ['$scope', '$rootScope', 'API.Boats',
        function($scope, $rootScope, Boats) {
            $rootScope.pageActive = 'resultats';
            $scope.boats = Boats.query();
            $scope.categories = $rootScope.categories;
        }
    ])
    .controller('BoatDetailCtrl', ['$scope', '$rootScope', '$stateParams', 'API.Boats', '$location',
        function($scope, $rootScope, $stateParams, Boats, $location) {
            $rootScope.pageActive = '';
            $scope.boat = Boats.get({id: $stateParams.id});
            $scope.record = "";
            $scope.validBoat = function() {
                Boats.valid({id: $scope.boat.id}).$promise.then(function(boat) {
                    $scope.boat = boat;
                });
            };
            $scope.payBoat = function() {
                Boats.pay({id: $scope.boat.id}).$promise.then(function(boat) {
                    $scope.boat = boat;
                });
            };
            $scope.recordBoat = function(record) {
                record = parseInt(record);
                var min = Math.floor(record / 100000);
                var sec = Math.floor((record - 100000 * min) / 1000);
                var milli = Math.floor((record - 100000 * min) - 1000 * sec);
                var recordNum = milli + 1000 * sec + 60000 * min;
                Boats.record({id: $scope.boat.id, temps: recordNum}).$promise.then(function(boat) {
                    $scope.boat = boat;
                    $scope.record = "";
                });
            };
            $scope.removeBoat = function() {
                if (confirm('Voulez-vous vraiment supprimer ce bateau ?')) {
                    Boats.remove({id: $scope.boat.id}).$promise.then(function() {
                        $location.path('admin/boats');
                    });
                }
            };
        }
    ])
;