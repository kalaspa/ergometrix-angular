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
        var categories = [
            {code: '8-m-U', label: 'Huit masculin universitaire'},
            {code: '8-f-U', label: 'Huit féminin universitaire'},
            {code: '4-m-U', label: 'Quatre masculin universitaire'},
            {code: '4-f-U', label: 'Quatre féminin universitaire'},
            {code: '4-mix-U', label: 'Quatre mixte universitaire'},
            {code: '2-m-U', label: 'Double masculin universitaire'},
            {code: '2-f-U', label: 'Double féminin universitaire'},
            {code: '1-m-U', label: 'Individuel masculin universitaire'},
            {code: '1-f-U', label: 'Individuel féminin universitaire'},
            {code: '8-m-S', label: 'Huit masculin senior'},
            {code: '8-f-S', label: 'Huit féminin senior'},
            {code: '4-m-S', label: 'Quatre masculin senior'},
            {code: '4-f-S', label: 'Quatre féminin senior'},
            {code: '4-mix-S', label: 'Quatre mixte senior'},
            {code: '2-m-S', label: 'Double masculin senior'},
            {code: '2-f-S', label: 'Double féminin senior'},
            {code: '1-m-S', label: 'Individuel masculin senior'},
            {code: '1-f-S', label: 'Individuel féminin senior'}
        ];
        
        $stateProvider
        // partie publique
        .state('root', {
            templateUrl: 'views/layout.html',
            controller: function($rootScope) {
                $rootScope.categories = categories;
            }
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
            controller: 'BoatResultCtrl'
        })
        // partie admin
        .state('admin', {
            templateUrl: 'views/admin.html',
            url: '/admin',
            controller: function($rootScope) {
                $rootScope.categories = categories;
            }
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
