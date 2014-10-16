'use strict';

var userCtrl = angular.module('userCtrl', []);

userCtrl
    .controller('UserCtrl', ['$scope', '$rootScope', '$stateParams', 'AuthService', 'API.Users', '$location', 
        function($scope, $rootScope, $stateParams, AuthService, Users, $location) {
            $rootScope.pageActive = 'login';

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
                        $scope.user.infos = user;
                        $scope.login = {login: '', password: ''};
                        $scope.inLogin = false;
                    }, function() {
                        $scope.loginError = true;
                        $scope.login.password = '';
                        $scope.inLogin = false;
                    }
                );
                $location.path('/admin/');
            };
        }
    ])
    .controller('UserActionCtrl', ['$scope', '$rootScope', '$stateParams', 'API.Users', '$location', 
        function($scope, $rootScope, $stateParams, Users, $location) {
            $rootScope.pageActive = 'users';

            $scope.addUser = function(user) {
                if (user.password === user.passwordBis) {
                    Users.add(user).$promise.then(function(u) {
                        console.log(u);
                        $location.path('admin/users');
                    });
                } else {
                    console.log('Erreur mdp différents');
                }
            };
        }
    ])
    .controller('UserListCtrl', ['$scope', '$rootScope', '$stateParams', 'API.Users', '$location', 
        function($scope, $rootScope, $stateParams, Users, $location) {
            $rootScope.pageActive = 'users';

            $scope.users = Users.query();
            $scope.remove = function(userId) {
                Users.remove({id: userId}).$promise.then(function() {
                    $scope.users = Users.query();
                });
            };
        }
    ])
    .controller('UserDetailCtrl', ['$scope', '$rootScope', '$stateParams', 'API.Users', '$location', 
        function($scope, $rootScope, $stateParams, Users, $location) {
            $rootScope.pageActive = 'users';

            $scope.user = Users.get({id: $stateParams.id});
            $scope.remove = function(userId) {
                Users.remove({id: userId}).$promise.then(function() {
                    $scope.users = Users.query();
                });
            };
        }
    ])
;
