'use strict';

var ergoServices = angular.module('ergoServices', ['ngResource']);

ergoServices
.factory('API', [
    function () {
        return { 
            route: function (path) {
                return '/ergometrix-api/web/app_dev.php' + (path == '' ? '' : '/' + path);
            }
        };
    }
])
.factory('API.Auth', ['API', '$resource', 
    function (API, $resource) {
        return $resource(API.route('auth/login'));
    } 
])
.factory('API.Boats', ['API', '$resource', '$stateParams', 
    function (API, $resource, $stateParams) {
        return $resource(API.route('boats/:id'), {}, {
            add: {method: 'POST', url: API.route('boats/add'), static: true},
            remove: {method: 'DELETE'},
            valid: {method: 'POST', url: API.route('boats/valid/:id'), params: {id: $stateParams.id}},
            pay: {method: 'POST', url: API.route('boats/pay/:id'), params: {id: $stateParams.id}},
            record: {method: 'POST', url: API.route('boats/record/:id'), params: {id: $stateParams.id}},
            softremove: {method: 'POST', url: API.route('boats/softremove/:id')},
            count: {method: 'GET', url: API.route('boats/count')}
        });
    }
])
.factory('API.Rowers', ['API', '$resource',
    function (API, $resource) {
        return $resource(API.route('rowers/:id'), {}, {
            add: {method: 'POST', url: API.route('rowers/add'), static: true},
            remove: {method: 'DELETE'}
        });
    }
])
.factory('API.Leaders', ['API', '$resource', 
    function (API, $resource) {
        return $resource(API.route('leaders/:id'), {}, {
            add: {method: 'POST', url: API.route('leaders/add'), static: true}
        });
    }
]);