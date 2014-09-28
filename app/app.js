'use strict';

// Declare app level module which depends on views, and components
var ergoApp = angular.module('ergo.app', [
  'ui.router',
  'ui.mask',
  'ergoServices',
  'ergoFilters',
  //'mainCtrl',
  'boatCtrl',
  'actionCtrl',
  'adminCtrl'
]);

ergoApp.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
        // partie publique
        .state('root', {
            templateUrl: 'views/layout.html'
        })
        .state('root.presentation', {
            url: '/',
            templateUrl: 'views/Static/presentation.html',
            controller: function($scope, $rootScope) {
                $rootScope.pageActive = 'presentation';
            }
        })
        .state('root.competition', {
            url: '/competition',
            templateUrl: 'views/Static/competition.html',
            controller: function($scope, $rootScope) {
                $rootScope.pageActive = 'competition';
            }
        })
        .state('root.infosPratiques', {
            url: '/infos-pratiques',
            templateUrl: 'views/Static/infosPratiques.html',
            controller: function($scope, $rootScope) {
                $rootScope.pageActive = 'infosPratiques';
            }
        })
        .state('root.inscription', {
            url: '/inscription',
            templateUrl: 'views/Action/inscription.html',
            controller: 'ActionCtrl'
        })
        .state('root.resultats', {
            url: '/resultats',
            templateUrl: 'views/Boat/boat-results.html',
            controller: 'BoatListCtrl'
        })
        // partie admin
        .state('admin', {
            templateUrl: 'views/admin.html',
            url: '/admin'
        })
        .state('admin.dashboard', {
            url: '/',
            templateUrl: 'views/Admin/dashboard.html',
            controller: 'AdminBaseCtrl'
        })
        .state('admin.boats', {
            url: '/boats',
            templateUrl: 'views/Boat/boat-list.html',
            controller: 'BoatListCtrl'
        })
        .state('admin.boat', {
            url: '/boats/:id',
            templateUrl: 'views/Boat/boat-detail.html',
            controller: 'BoatDetailCtrl'
        });
    }
]);
