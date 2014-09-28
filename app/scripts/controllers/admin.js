'use strict';

var amdinCtrl = angular.module('adminCtrl', []);

amdinCtrl
    .controller('AdminBaseCtrl', ['$scope', '$rootScope', 'API.Boats', 'API.Rowers', 'API.Leaders', '$location', 
        function($scope, $rootScope, Boats, Rowers, Leaders, $location) {
            $rootScope.page = 'dashboard';
            $scope.nbBoats = Boats.count();
        }
    ])
;