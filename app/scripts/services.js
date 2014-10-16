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
            deletedquery: {method: 'GET', url: API.route('boats/deleted'), static: true, isArray: true},
            add: {method: 'POST', url: API.route('boats/add'), static: true},
            remove: {method: 'DELETE'},
            valid: {method: 'POST', url: API.route('boats/valid/:id'), params: {id: '@id'}},
            pay: {method: 'POST', url: API.route('boats/pay/:id'), params: {id: '@id'}},
            record: {method: 'POST', url: API.route('boats/record/:id'), params: {id: '@id'}},
            softremove: {method: 'POST', url: API.route('boats/softremove/:id'), params: {id: '@id'}},
            count: {method: 'GET', url: API.route('boats/count')},
            sendmail: {method: 'POST', url: API.route('boats/email/:id'), params: {id: '@id'}}
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
])
.factory('API.Users', ['API', '$resource', 
    function (API, $resource) {
        return $resource(API.route('users/:id'), {}, {
            add: {method: 'POST', url: API.route('users/add'), static: true},
            remove: {method: 'DELETE'}
        });
    }
])
;