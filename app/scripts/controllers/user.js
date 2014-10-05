'use strict';

var userCtrl = angular.module('userCtrl', []);

userCtrl
    .controller('UserCtrl', ['$scope', '$stateParams', 'AuthService', 
        function($scope, $stateParams, AuthService) {
            $scope.pageActive = 'login';

            $scope.user = {
                infos: {},
                isAuthenticated: AuthService.isAuthenticated,
                logout: AuthService.logout
            };
            $scope.login = {
                login: '',
                password: ''
            };

            $scope.connexion = function (login) {
                $scope.loginError = false;
                $scope.inLogin = true;
                AuthService.login(login).then(
                    function(user) {
                        $scope.user = user;
                        $scope.login = {login: '', password: ''};
                        $scope.inLogin = false;
                    }, function() {
                        $scope.loginError = true;
                        $scope.login.password = '';
                        $scope.inLogin = false;
                    }
                );
            };
        }
    ])
;
