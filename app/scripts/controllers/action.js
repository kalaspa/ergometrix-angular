'use strict';

var actionCtrl = angular.module('actionCtrl', []);

actionCtrl
    .controller('ActionCtrl', ['$scope', '$rootScope', 'API.Boats', 'API.Rowers', 'API.Leaders', '$location', 
        function($scope, $rootScope, Boats, Rowers, Leaders, $location) {
            $rootScope.pageActive = 'inscription';
            // Variables pour les formulaires
            $scope.categories = $rootScope.categories;
            $scope.etape = 1;
            $scope.boatId = 0;
            $scope.rowers = []; // tableau des rameurs autres que le leader
            $scope.leaderRowerId = 0;
            $scope.boat = {
                id: 0,
                name: '',
                category: ''
            };
            $scope.rower = {
                lastname: '',
                firstname: '',
                boat: 0
            };
            $scope.leader = {
                lastname: '',
                firstname: '',
                rower: 0,
                boat: 0,
                email: '',
                phone: '',
                club: ''
            };
            // Méthodes pour les formulaires
            $scope.addBoat = function(boat) {
                Boats.add(boat).$promise.then(function(newboat) {
                    $scope.boatId = newboat.id;
                    $scope.leader.boat = newboat.id;
                    $scope.etape = 2;
                    $scope.rowers.length = parseInt(newboat.category.slice(0,1)) - 1; // préparation du tableaux des rameurs (taille correspondant à la catégorie)
                    for (var i = 0; i < $scope.rowers.length - 1; i++) {
                        $scope.rowers[i] = {lastname: '', firstname: '', boat: $scope.boatId};
                    }
                });
            };
            $scope.addLeader = function(leader) {
                var leaderRower = {
                    lastname: leader.lastname,
                    firstname: leader.firstname,
                    boat: leader.boat
                };
                Rowers.add(leaderRower).$promise.then(function(rower) {
                    $scope.leader.rower = rower.id;
                    //console.log($scope.leader);
                    Leaders.add($scope.leader).$promise.then(function () {
                        $scope.etape = 3;
                    });
                });
            };
           function addRowersAux(rwrs) {
                angular.forEach(rwrs, function(rower) {
                    Rowers.add(rower).$promise.then(function() { return true; });
                });
                return true;
            };
            $scope.addRowers = function(rowers) {
                addRowersAux(rowers);
                $scope.etape = 4;
                $scope.finalBoat = Boats.get({id: $scope.boatId});
            };
            $scope.sendEmail = function(boat) {
                $location.path('#/');
            }
            $scope.removeBoat = function(boatId) {
                Boats.remove({id: boatId}).$promise.then(function() {
                    $scope.etape = 1;
                });
            };
        }
    ])
;