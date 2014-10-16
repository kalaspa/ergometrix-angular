'use strict';

var adminCtrl = angular.module('adminCtrl', []);

adminCtrl
    .controller('AdminBaseCtrl', ['$scope', '$rootScope', 'API.Boats', 'API.Rowers', 'API.Leaders', '$location', 'AuthService',
        function($scope, $rootScope, Boats, Rowers, Leaders, $location, Auth) {
            if(!(Auth.isAuthenticated())) {
                $location.path('/login');
            }
            $rootScope.page = 'dashboard';
            $scope.nbBoats = Boats.count();
        }
    ])
;