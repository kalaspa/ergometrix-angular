'use strict';

angular.module('ergo.directives', [])
.directive('boats-list', function() {
    return {
        restrict: 'E',
        $scope: {
            boatsView: '=boatsView'
        },
        templateUrl: 'scripts/directives/views/boats-list.html',
        controller: ['$scope', 
            function($scope) {
                //$scope.boats = 'allBoats';
            }
        ]
    }
})