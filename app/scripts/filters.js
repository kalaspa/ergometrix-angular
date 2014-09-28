'use strict';

angular.module('ergoFilters', [])
    .filter('phoneDisp', function() {
        return function(num) {
            if (angular.isNumber(num)) {
                var mun = num.toString();
                return formatLocal("FR", mun);
            } else {
                return '';
            }
        };
    })
    .filter('catDisp', function() {
        return function(catCode) {
            var cats = new Array();
            cats['8m'] = 'Huit masculin';
            cats['4mix'] = 'Quatre mixte';
            
            return cats[catCode];
        }
    })
    .filter('recordDisp', function() {
        return function(rec) {
            var min = Math.floor(rec / 60000);
            var sec = Math.floor((rec - 60000 * min) / 1000);
            var milli = (rec - 60000 * min) - 1000 * sec;
            var minS = min.toString();
            var secS = sec < 10 ? "0" + sec.toString() : sec.toString();
            var milliS = "";
            if (milli < 10) {
                milliS = "00" + milli.toString();
            } else if (milli < 100) {
                milliS = "0" + milli.toString();
            } else {
                milliS = milli.toString();
            }
            return minS + ':' + secS + '.' + milliS;
        }
    })
    .filter('positif', function() {
        return function(n) {
            return n > 0;
        }
    })
    .filter('nul', function() {
        return function(n) {
            return n == 0;
        }
    })
;